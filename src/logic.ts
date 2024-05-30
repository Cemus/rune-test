import type { PlayerId, RuneClient } from "rune-games-sdk/multiplayer";
import { events } from "./utils/events";
import { Item, items } from "./utils/items";
import { applyActionEffects } from "./utils/effects";
import { GameState } from "./utils/interfaces";

const initialState = (playerIds: PlayerId[]): GameState => ({
  players: playerIds.map((id) => ({
    id,
    name: "name",
    hp: 3,
    strength: rollDie(100),
    constitution: rollDie(100),
    charisma: rollDie(100),
    knowledge: rollDie(100),
    dexterity: rollDie(100),
    perception: rollDie(100),
    gold: items.find((item) => item.type === "gold") as Item,
    weapon: null,
    items: [],
  })),
  currentPlayerId: playerIds[0],
  currentEventId: "firstRoom",
  gameOver: false,
  timer: null,
  affectedPlayersId: [],
  currentTimedEvent: null,
  goldModifier: null,
});

const checkGameOver = (game: GameState) => {
  game.players.forEach((player) => {
    if (player.hp <= 0) {
      game.gameOver = true;
    }
  });
};

type GameActions = {
  performAction: (action: string) => void;
  resetGame: () => void;
};

declare global {
  const Rune: RuneClient<GameState, GameActions>;
}

function rollDie(sides: number): number {
  return Math.floor(Math.random() * sides) + 1;
}

function nextPlayerTurn(game: GameState, playerId: PlayerId) {
  const nextPlayerIndex =
    (game.players.findIndex((p) => p.id === playerId) + 1) %
    game.players.length;
  game.currentPlayerId = game.players[nextPlayerIndex].id;
}

Rune.initLogic({
  minPlayers: 2,
  maxPlayers: 3,

  setup: (playerIds) => initialState(playerIds),

  actions: {
    performAction: (actionName, { game, playerId }) => {
      if (game.currentPlayerId !== playerId) {
        throw Rune.invalidAction();
      }

      const currentEvent = events[game.currentEventId];
      const action = currentEvent.actions[actionName];
      if (!action) {
        throw Rune.invalidAction();
      }

      if (action.test) {
        const player = game.players.find((p) => p.id === playerId);
        const attributeValue = player![action.test.attribute];
        const roll = rollDie(100);
        const success = roll < attributeValue + action.test.bonus;

        game.currentEventId = success
          ? action.successEventId!
          : action.failureEventId!;
      } else {
        game.currentEventId = action.nextEventId!;
      }

      applyActionEffects(action, game);

      checkGameOver(game);
      if (action.changeTurn) {
        nextPlayerTurn(game, playerId);
      }
    },
    resetGame: (_, { game }) => {
      const playerIds = game.players.map((player) => player.id);
      Object.assign(game, initialState(playerIds));
    },
  },
});
