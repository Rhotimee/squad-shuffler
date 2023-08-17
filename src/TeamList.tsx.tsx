import { Player } from "./types";

type TeamListProps = {
  teams: Player[][];
};

function getTeamBg(n: number) {
  const tailwindColors = [
    "bg-red-500",
    "bg-yellow-500",
    "bg-green-500",
    "bg-blue-500",
    "bg-indigo-500",
    "bg-purple-500",
    "bg-pink-500",
  ];

  const index = n % tailwindColors.length;

  return tailwindColors[index];
}

const TeamList = ({ teams }: TeamListProps) => {
  return (
    <div className="mt-6 flex justify-center">
      <div className="">
        <h2 className="text-lg font-semibold leading-7 text-gray-900 text-center mb-2">
          Generated Teams
        </h2>
        <div className="space-x-4 flex flex-wrap justify-center">
          {teams.map((team, i) => {
            const teamBg = getTeamBg(i);
            return (
              <div className={`mb-2 ${teamBg} py-2 px-4 rounded-md`} key={i}>
                <h2 className="text-base font-semibold leading-7 text-gray-900 text-center">
                  Team {i + 1}
                </h2>
                <div className="space-y-2">
                  {team.map(({ name, type }) => (
                    <div key={name} className="flex space-x-2 items-center">
                      <p className="capitalize bg-gray-200 py-1 px-2 rounded-md">
                        {type[0]}
                      </p>
                      <p>{name}</p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TeamList;
