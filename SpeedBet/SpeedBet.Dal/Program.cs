using SpeedBet.Dal.Context;
using SpeedBet.Dal.Dtos;
using SpeedBet.Models.Enum;
using System;
using System.Collections.Generic;

namespace SpeedBet.Dal
{
    class Program
    {
        static void Main(string[] args)
        {
            AlwaysCreateNewDatabase();

            using (var db = new SpeedBetContext())
            {
                InitTeams(db);
                InitMatchTypes(db);
                InitMatches(db);
                InitTeamsMatchType(db);
            }
        }

        static void AlwaysCreateNewDatabase()
        {
            using (var db = new SpeedBetContext())
            {
                db.Database.EnsureDeleted();
                db.Database.EnsureCreated();
            }
        }

        private static void InitTeams(SpeedBetContext db)
        {
            var teams = new List<TeamDto>
                {
                    new TeamDto {
                        Name = "Sangoku",
                        Odds = 4.2
                    },
                    new TeamDto {
                        Name = "Chuck Norris",
                        Odds = 6.7
                    },
                    new TeamDto {
                        Name = "John Wick",
                        Odds = 8.2
                    },
                    new TeamDto {
                        Name = "Superman",
                        Odds = 5.1
                    },
                    new TeamDto {
                        Name = "Deadpool",
                        Odds = 7.3
                    },
                    new TeamDto {
                        Name = "Darth Maul",
                        Odds = 8.2
                    }
                };
            db.Teams.AddRange(teams);
            var count = db.SaveChanges();
            Console.WriteLine();
            Console.WriteLine("Teams added:");
            Console.WriteLine("{0} records saved to database", count);
        }

        private static void InitMatchTypes(SpeedBetContext db)
        {
            var matchTypes = new List<MatchTypeDto>
                {
                    new MatchTypeDto
                    {
                        Name = "Duel",
                        NumberOfTeam = 2
                    },
                    new MatchTypeDto
                    {
                        Name = "Trio",
                        NumberOfTeam = 3
                    },
                    new MatchTypeDto
                    {
                        Name = "Battle4",
                        NumberOfTeam = 4
                    }
                };
            db.MatchTypes.AddRange(matchTypes);
            var count = db.SaveChanges();
            Console.WriteLine();
            Console.WriteLine("MatchTypes added:");
            Console.WriteLine("{0} records saved to database", count);
        }

        private static void InitMatches(SpeedBetContext db)
        {
            var type1 = db.MatchTypes.Find(1);
            var type2 = db.MatchTypes.Find(2);
            var type3 = db.MatchTypes.Find(3);

            var matches = new List<MatchDto> {
                    new MatchDto {
                        Sport = "🥋",
                        MatchType = type1,
                        Status = StatusEnum.UPCOMING,
                        Winner = null
                    },
                    new MatchDto {
                        Sport = "🥊",
                        MatchType = type1,
                        Status = StatusEnum.UPCOMING,
                        Winner = null
                    },
                    new MatchDto {
                        Sport = "🥌",
                        MatchType = type1,
                        Status = StatusEnum.UPCOMING,
                        Winner = null
                    },
                    new MatchDto {
                        Sport = "🥋",
                        MatchType = type1,
                        Status = StatusEnum.UPCOMING,
                        Winner = null
                    },
                    new MatchDto {
                        Sport = "🥋",
                        MatchType = type2,
                        Status = StatusEnum.UPCOMING,
                        Winner = null
                    },
                    new MatchDto {
                        Sport = "🥊",
                        MatchType = type2,
                        Status = StatusEnum.UPCOMING,
                        Winner = null
                    },
                    new MatchDto {
                        Sport = "🥌",
                        MatchType = type3,
                        Status = StatusEnum.UPCOMING,
                        Winner = null
                    },
                    new MatchDto {
                        Sport = "🥋",
                        MatchType = type3,
                        Status = StatusEnum.UPCOMING,
                        Winner = null
                    }
            };

            db.Matches.AddRange(matches);
            var count = db.SaveChanges();
            Console.WriteLine();
            Console.WriteLine("Matches added:");
            Console.WriteLine("{0} records saved to database", count);
        }

        private static void InitTeamsMatchType(SpeedBetContext db)
        {
            var lookups = new List<TeamsMatchTypeDto>
                {
                    new TeamsMatchTypeDto
                    {
                        Id = 1,
                        Match = db.Matches.Find(1),
                        Team = db.Teams.Find(1)
                    },
                    new TeamsMatchTypeDto
                    {
                        Id = 2,
                        Match = db.Matches.Find(1),
                        Team = db.Teams.Find(2)
                    },
                    new TeamsMatchTypeDto
                    {
                        Id = 3,
                        Match = db.Matches.Find(2),
                        Team = db.Teams.Find(3)
                    },
                    new TeamsMatchTypeDto
                    {
                        Id = 4,
                        Match = db.Matches.Find(2),
                        Team = db.Teams.Find(4)
                    },
                    new TeamsMatchTypeDto
                    {
                        Id = 5,
                        Match = db.Matches.Find(3),
                        Team = db.Teams.Find(5)
                    },
                    new TeamsMatchTypeDto
                    {
                        Id = 6,
                        Match = db.Matches.Find(3),
                        Team = db.Teams.Find(6)
                    },
                    new TeamsMatchTypeDto
                    {
                        Id = 7,
                        Match = db.Matches.Find(4),
                        Team = db.Teams.Find(1)
                    },
                    new TeamsMatchTypeDto
                    {
                        Id = 8,
                        Match = db.Matches.Find(4),
                        Team = db.Teams.Find(4)
                    },
                    new TeamsMatchTypeDto
                    {
                        Id = 9,
                        Match = db.Matches.Find(5),
                        Team = db.Teams.Find(2)
                    },
                    new TeamsMatchTypeDto
                    {
                        Id = 10,
                        Match = db.Matches.Find(5),
                        Team = db.Teams.Find(5)
                    },
                    new TeamsMatchTypeDto
                    {
                        Id = 11,
                        Match = db.Matches.Find(5),
                        Team = db.Teams.Find(3)
                    },
                    new TeamsMatchTypeDto
                    {
                        Id = 12,
                        Match = db.Matches.Find(6),
                        Team = db.Teams.Find(1)
                    },
                    new TeamsMatchTypeDto
                    {
                        Id = 13,
                        Match = db.Matches.Find(6),
                        Team = db.Teams.Find(4)
                    },
                    new TeamsMatchTypeDto
                    {
                        Id = 14,
                        Match = db.Matches.Find(6),
                        Team = db.Teams.Find(6)
                    },
                    new TeamsMatchTypeDto
                    {
                        Id = 15,
                        Match = db.Matches.Find(7),
                        Team = db.Teams.Find(2)
                    },
                    new TeamsMatchTypeDto
                    {
                        Id = 16,
                        Match = db.Matches.Find(7),
                        Team = db.Teams.Find(1)
                    },
                    new TeamsMatchTypeDto
                    {
                        Id = 17,
                        Match = db.Matches.Find(7),
                        Team = db.Teams.Find(5)
                    },
                    new TeamsMatchTypeDto
                    {
                        Id = 18,
                        Match = db.Matches.Find(7),
                        Team = db.Teams.Find(6)
                    },
                    new TeamsMatchTypeDto
                    {
                        Id = 19,
                        Match = db.Matches.Find(8),
                        Team = db.Teams.Find(1)
                    },
                    new TeamsMatchTypeDto
                    {
                        Id = 20,
                        Match = db.Matches.Find(8),
                        Team = db.Teams.Find(3)
                    },
                    new TeamsMatchTypeDto
                    {
                        Id = 21,
                        Match = db.Matches.Find(8),
                        Team = db.Teams.Find(4)
                    },
                    new TeamsMatchTypeDto
                    {
                        Id = 22,
                        Match = db.Matches.Find(8),
                        Team = db.Teams.Find(6)
                    },
                };

            db.TeamsMatchTypes.AddRange(lookups);
            var count = db.SaveChanges();
            Console.WriteLine();
            Console.WriteLine("Lookups added:");
            Console.WriteLine("{0} records saved to database", count);
        }
    }
}
