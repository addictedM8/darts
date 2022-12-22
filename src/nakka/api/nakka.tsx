import { MatchStage, NakkaTournament, Tournament } from "./nakka.t";
import { cachedData } from "./test-data";

export async function getTournamentData(
  tournament: string
): Promise<NakkaTournament> {
  let data = {};

  return (await (
    await fetch(
      "https://tk2-228-23746.vs.sakura.ne.jp/n01/tournament/n01_tournament.php?cmd=get_data",
      {
        method: "POST",
        headers: {},
        body: `{"tdid":"${tournament}"}`,
      }
    )
  ).json()) as NakkaTournament;
  // .then(async (resp) => {
  //   data = (await resp.json()) as Tournament;
  // })
  // .catch(() => {});

  // return data;
}

export function processNakkaData(tournament: NakkaTournament): Tournament {
  const playersNames: { [id: string]: string } = {};
  tournament.entry_list.forEach(
    (entry) => (playersNames[entry.tpid] = entry.name)
  );

  return {
    id: tournament.tdid,
    title: tournament.title,
    date: new Date(tournament.s_date),
    players: playersNames,
    matches: tournament.rr_result
      .map((group) => {
        const playedMatches = new Set<string>();
        return Object.entries(group).map((player1) => {
          return Object.entries(player1[1])
            .map((match) => {
              const player2 = Object.entries(group).find(
                (player2matches) => player2matches[0] === match[0]
              );
              if (playedMatches.has(player2![0] + player1[0])) return null;

              playedMatches.add(player1[0] + player2![0]);

              return {
                matchStage: MatchStage.Group,
                player1: {
                  id: player1[0],
                  name: playersNames[player1[0]],
                  avg: match[1].a,
                  score: match[1].r,
                },
                player2: {
                  id: player2![0],
                  name: playersNames[player2![0]],
                  avg: player2![1][player1[0]].a,
                  score: player2![1][player1[0]].r,
                },
              };
            })
            .filter((match) => match != null || match != undefined);
        });
      })
      .concat(
        tournament.t_result.map((KO) => {
          const playedMatches = new Set<string>();
          return Object.entries(KO)
            .map((player1) => {
              const player1stats = Object.values(
                Object.values(player1)[1]
              )[0] as { a: number; r: number };

              const player2 = Object.entries(KO).find(
                (player2) => player2[0] === Object.keys(player1[1])[0]
              );

              if (playedMatches.has(player2![0] + player1[0])) return null;

              playedMatches.add(player1[0] + player2![0]);

              const player2stats = Object.values(player2![1])[0] as {
                a: number;
                r: number;
              };

              return {
                matchStage: Object.keys(KO).length,
                player1: {
                  id: player1[0],
                  name: playersNames[player1[0]],
                  avg: player1stats!.a,
                  score: player1stats!.r,
                },
                player2: {
                  id: player2![0],
                  name: playersNames[player2![0]],
                  avg: player2stats!.a,
                  score: player2stats!.r,
                },
              };
            })
            .filter((match) => match != null || match != undefined);
        }) ?? []
      )
      .filter((match) => match)
      .flat(2),
    stats: Object.keys(cachedData.stats).map((e, index) => ({
      //@ts-ignore
      ...cachedData.stats[e],
      name: playersNames[e],
      avg:
        //@ts-ignore
        Math.round((cachedData.stats[e].score / cachedData.stats[e].darts) * 3),
      id: index,
    })),
    // groupBO: tournament.rr_setting.limit_leg_count,
    // last32BO: tournament.t_setting.limit_leg_count,
  };
}
