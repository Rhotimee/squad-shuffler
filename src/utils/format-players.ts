import { Player } from "../types";

export function formatPlayers(
  players: string,
  playerType: Player["type"]
): Player[] {
  return players
    .split(/[\s,]+/)
    .filter(Boolean)
    .map((player) => ({
      name: player,
      type: playerType,
    }));
}
