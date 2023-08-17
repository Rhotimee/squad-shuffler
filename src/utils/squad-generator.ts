import { Player } from "../types";

// Fisher-Yates Shuffle
// https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
function shufflePlayers(players: Player[]) {
  const shuffled = players.slice();
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Conditions to consider.
// 1. All players should belong to a team.
// 2. All teams should have same number of players except the last team which is allowed to be incomplete.
// 3. Make sure the player groups are well distributed between all the teams.

type GenerateShuffledTeamsArgs = {
  attackers: Player[];
  defenders: Player[];
  keepers: Player[];
  numPlayersPerTeam: number;
};

export function generateShuffledTeams({
  attackers,
  defenders,
  keepers,
  numPlayersPerTeam,
}: GenerateShuffledTeamsArgs): Player[][] {
  const shuffledAttackers = shufflePlayers(attackers);
  const shuffledDefenders = shufflePlayers(defenders);
  const shuffledKeepers = shufflePlayers(keepers);

  const totalPlayers = attackers.length + defenders.length + keepers.length;
  const totalTeams = Math.floor(totalPlayers / numPlayersPerTeam);

  const idealDefendersPerTeam = Math.floor(defenders.length / totalTeams);
  const idealAttackersPerTeam = Math.floor(attackers.length / totalTeams);

  const teams: Player[][] = Array.from({ length: totalTeams }, () => []);

  // Distribute the ideal group (attackers / defenders / keepers) per team in all teams first
  teams.forEach((team) => {
    let tempIdealDefendersPerTeam = idealDefendersPerTeam;
    let tempIdealAttackersPerTeam = idealAttackersPerTeam;

    // Only one keeper per team.
    if (shuffledKeepers.length > 0) {
      team.push(shuffledKeepers.pop() as Player);
    }

    while (tempIdealDefendersPerTeam && team.length < numPlayersPerTeam) {
      team.push(shuffledDefenders.pop() as Player);
      tempIdealDefendersPerTeam -= 1;
    }
    while (tempIdealAttackersPerTeam && team.length < numPlayersPerTeam) {
      team.push(shuffledAttackers.pop() as Player);
      tempIdealAttackersPerTeam -= 1;
    }
  });

  // Distribute any remaining players
  let remaningPlayers = shufflePlayers([
    ...shuffledAttackers,
    ...shuffledDefenders,
  ]);

  teams.forEach((team) => {
    while (team.length < numPlayersPerTeam && remaningPlayers.length) {
      team.push(remaningPlayers.pop() as Player);
    }

    // If the teams are incomplete, include the keepers
    while (team.length < numPlayersPerTeam && shuffledKeepers.length) {
      team.push(shuffledKeepers.pop() as Player);
    }
  });

  remaningPlayers = [...remaningPlayers, ...shuffledKeepers];
  // If there are still players left, add them to a new team
  if (remaningPlayers.length) {
    teams.push(remaningPlayers);
  }

  return teams;
}
