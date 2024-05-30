import { GameState } from "../logic";
import type { PlayerId } from "rune-games-sdk/multiplayer";

export function nextPlayer(game: GameState, playerId: PlayerId) {
  return (
    (game.players.findIndex((p) => p.id === playerId) + 1) % game.players.length
  );
}
