import { Action } from "./events";
import { GameState, Player } from "./interfaces";

const checkTimedEvent = (timedEvent: string, game: GameState) => {
  switch (timedEvent) {
    case "checkDrinkCriticalFailure":
      if (game.timer === 0) {
        game.currentEventId = "drinkCriticalFailure";

        game.currentTimedEvent = null;
        game.timer = null;
      }
      break;
    case "checkTimedCriticalFailure":
      if (game.timer === 0) {
        game.currentEventId = "trapCriticalFailure";

        game.currentTimedEvent = null;
        game.timer = null;
      }
      break;
  }
};
export const applyActionEffects = (action: Action, game: GameState) => {
  if (action.effects) {
    action.effects.forEach((effect) => {
      applyEffects(effect, game);
    });
  }
};

export const applyEffects = (effect: string, game: GameState) => {
  switch (effect) {
    case "affectCurrentPlayer":
      game.affectedPlayersId = [];
      game.affectedPlayersId?.push(game.currentPlayerId);
      break;
    case "goldReduce":
      if (game.affectedPlayersId.length > 0) {
        game.players.forEach((player: Player) => {
          if (game.affectedPlayersId.includes(player.id) && game.goldModifier) {
            const goldItem = player.gold;
            if (goldItem && goldItem.amount) {
              goldItem.amount -= game.goldModifier;
            }
          }
        });
        game.affectedPlayersId = [];
      }
      break;
    case "goldIncrease":
      if (game.affectedPlayersId.length > 0) {
        game.players.forEach((player: Player) => {
          if (game.affectedPlayersId.includes(player.id) && game.goldModifier) {
            const goldItem = player.gold;
            if (goldItem && goldItem.amount) {
              goldItem.amount += game.goldModifier;
            }
          }
        });
        game.affectedPlayersId = [];
      }
      break;
    case "loseHealth":
      if (game.affectedPlayersId.length > 0) {
        game.players.forEach((player: Player) => {
          if (game.affectedPlayersId.includes(player.id)) {
            player.hp -= 1;
          }
        });
        game.affectedPlayersId = [];
      }
      break;
    case "gainHealth":
      if (game.affectedPlayersId.length > 0) {
        game.players.forEach((player: Player) => {
          if (game.affectedPlayersId.includes(player.id) && player.hp < 3) {
            player.hp += 1;
          }
        });
        game.affectedPlayersId = [];
      }
      break;
    case "constReduce":
      if (game.affectedPlayersId.length > 0) {
        game.players.forEach((player: Player) => {
          if (game.affectedPlayersId.includes(player.id)) {
            player.constitution -= 1;
          }
        });
        game.affectedPlayersId = [];
      }
      break;
    case "constIncrease":
      if (game.affectedPlayersId.length > 0) {
        game.players.forEach((player: Player) => {
          if (game.affectedPlayersId.includes(player.id)) {
            player.constitution += 1;
          }
        });
        game.affectedPlayersId = [];
      }
      break;
    case "timedDrinkFailure":
      game.currentTimedEvent = "checkDrinkCriticalFailure";
      break;
    case "timedTrapFailure":
      game.currentTimedEvent = "checkTimedCriticalFailure";
      break;
    case "timerStart":
      if (game.timer === null) {
        game.timer = 2;
      }

      break;
    case "timerReduce":
      if (game.timer) {
        if (game.timer > 0) {
          game.timer--;
        }
      }

      break;
    case "timerNull":
      if (game.timer) {
        game.timer = null;
      }
      break;
    case "checkDrinkCriticalFailure":
      checkTimedEvent("checkDrinkCriticalFailure", game);
      break;
    case "checkTimedCriticalFailure":
      checkTimedEvent("checkTimedCriticalFailure", game);
      break;
  }
};
