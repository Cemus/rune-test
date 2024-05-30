import { Item } from "./items";
import type { PlayerId } from "rune-games-sdk/multiplayer";

export interface GameState {
  players: Player[];
  currentPlayerId: PlayerId;
  currentEventId: string;
  affectedPlayersId: PlayerId[];
  gameOver: boolean;
  timer: number | null;
  currentTimedEvent: string | null;
  goldModifier: number | null;
}
export interface Player {
  id: PlayerId;
  name: string;
  hp: number;
  strength: number;
  constitution: number;
  charisma: number;
  knowledge: number;
  dexterity: number;
  perception: number;
  gold: Item;
  weapon: Item | null;
  items: Item[];
}
