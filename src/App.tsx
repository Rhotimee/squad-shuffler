import { useState, FormEvent } from "react";
import { generateShuffledTeams } from "./utils/squad-generator";
import TeamList from "./TeamList.tsx";
import { formatPlayers } from "./utils/format-players";
import { Player } from "./types";

function App() {
  const [defenders, setDefenders] = useState("");
  const [attackers, setAttackers] = useState("");
  const [keepers, setKeepers] = useState("");
  const [numPlayersPerTeam, setNumPlayersPerTeam] = useState("6");

  const [teams, setTeams] = useState<Player[][]>();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    setTeams(
      generateShuffledTeams({
        attackers: formatPlayers(attackers, "attacker"),
        defenders: formatPlayers(defenders, "defender"),
        keepers: formatPlayers(keepers, "keeper"),
        numPlayersPerTeam: parseInt(numPlayersPerTeam),
      })
    );
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <div className="mx-auto max-w-3xl">
        <div className="mb-4">
          <h1 className="text-xl font-semibold leading-7 text-gray-900 text-center">
            Squad Shuffler
          </h1>
          <p className="mt-1 text-sm leading-6 text-gray-600 text-center">
            The names of the players should be sperated by a space or comma.
          </p>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="">
            <label
              htmlFor="defenders"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Players per team
            </label>
            <input
              id="defenders"
              type="number"
              className="block rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              onChange={(e) => setNumPlayersPerTeam(e.target.value)}
              value={numPlayersPerTeam}
            />
          </div>

          <div className="">
            <label
              htmlFor="defenders"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Defenders
            </label>
            <textarea
              id="defenders"
              rows={3}
              className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              onChange={(e) => setDefenders(e.target.value)}
              value={defenders}
            />
          </div>
          <div>
            <label
              htmlFor="attackers"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Attackers
            </label>
            <textarea
              id="attackers"
              rows={3}
              className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              onChange={(e) => setAttackers(e.target.value)}
              value={attackers}
            />
          </div>
          <div>
            <label
              htmlFor="keepers"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Keepers
            </label>
            <textarea
              id="keepers"
              rows={3}
              className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              onChange={(e) => setKeepers(e.target.value)}
              value={keepers}
            />
          </div>
          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Shuffle
            </button>
          </div>
        </form>

        {teams && teams.length > 0 && <TeamList teams={teams} />}
      </div>
    </div>
  );
}

export default App;
