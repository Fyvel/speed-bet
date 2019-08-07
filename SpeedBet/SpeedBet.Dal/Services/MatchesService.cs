using Microsoft.EntityFrameworkCore;
using SpeedBet.Core;
using SpeedBet.Dal.Context;
using SpeedBet.Models.Enum;
using SpeedBet.Models.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SpeedBet.Dal.Services
{
    public class MatchesService : IMatchesService
    {
        private Random Random => new Random();

        public Task<TeamModel> EndMatch(int matchId)
        {
            using (var db = new SpeedBetContext())
            {
                // get match & teams
                var currentMatch = db.Matches.Find(matchId);
                if (currentMatch.Status == StatusEnum.ENDED || currentMatch.Winner != null)
                {
                    throw new Exception("Match already ended");
                }

                var lookup = db.TeamsMatchTypes
                    .Include(l => l.Team)
                    .Where(l => l.Match.Id == matchId)
                    .GroupBy(l => l.Match)
                    .Select(g => new
                    {
                        match = g.Key,
                        teams = g.Select(m => m.Team).ToList()
                    }).FirstOrDefault();

                // pick random winner
                var rand = Random.Next(lookup.teams.Count);
                var winner = lookup.teams[rand];

                // update winner & status
                currentMatch.Winner = winner;
                currentMatch.Status = StatusEnum.ENDED;
                db.Matches.Update(currentMatch);

                // get related bet
                var bet = db.Bets
                    .Include(b => b.Team)
                    .Include(b => b.User)
                    .FirstOrDefault(b => b.Match.Id == matchId);

                if (bet != null && bet.Team == winner)
                {
                    // get current user
                    var currentUser = db.Users.Find(1);
                    // update balance
                    currentUser.AmountWon += (bet.Amount * bet.Odds);
                }

                db.SaveChanges();

                // map result
                var result = new TeamModel(
                    winner.Id,
                    winner.Name,
                    winner.Odds);

                return Task.FromResult(result);
            }
        }

        public Task<MatchModel> GetMatchById(int id)
        {
            using (var db = new SpeedBetContext())
            {
                // get lookup 
                var lookup = db.TeamsMatchTypes
                    .Include(l => l.Team)
                    .Include(l => l.Match.MatchType)
                    .Include(l => l.Match.Winner)
                    .Where(l => l.Match.Id == id)
                    .GroupBy(l => l.Match)
                    .Select(g => new
                    {
                        match = g.Key,
                        teams = g.Select(m => m.Team).ToList()
                    })
                    .ToList();

                // get bet
                var bet = db.Bets
                    .Include(b => b.Match)
                    .Include(b => b.Team)
                    .FirstOrDefault(b => b.Match.Id == id);

                // map result
                var result = lookup.Select(g => new MatchModel(
                    g.match.Id,
                    g.match.Sport,
                    g.match.MatchType.Name,
                    g.match.Status,
                    g.teams.Select(t => new TeamModel(
                        t.Id,
                        t.Name,
                        t.Odds
                        )).ToList(),
                    g.match.Winner != null
                    ? new TeamModel(
                        g.match.Winner.Id,
                        g.match.Winner.Name,
                        g.match.Winner.Odds)
                    : null,
                    bet != null
                    ? new BetModel(
                       bet.Id,
                       bet.Match.Id,
                       bet.Team.Id,
                       bet.Amount,
                       bet.Odds)
                    : null
                    )).FirstOrDefault();

                return Task.FromResult(result);
            }
        }

        public Task<IReadOnlyList<MatchModel>> GetMatches()
        {
            using (var db = new SpeedBetContext())
            {
                // get lookups
                var lookups = db.TeamsMatchTypes
                    .Include(l => l.Team)
                    .Include(l => l.Match.MatchType)
                    .Include(l => l.Match.Winner)
                    .GroupBy(l => l.Match)
                    .Select(g => new
                    {
                        match = g.Key,
                        teams = g.Select(m => m.Team).ToList()
                    })
                    .ToList();

                // get bets
                var matchIds = lookups.Select(l => l.match.Id).ToList();
                var bets = db.Bets
                    .Include(b => b.Match)
                    .Include(b => b.Team)
                    .Where(b => matchIds.Contains(b.Match.Id))
                    .ToList();

                // map results
                IReadOnlyList<MatchModel> matches = lookups
                    .Select(g => new MatchModel(
                        g.match.Id,
                        g.match.Sport,
                        g.match.MatchType.Name,
                        g.match.Status,
                        g.teams.Select(t => new TeamModel(
                            t.Id,
                            t.Name,
                            t.Odds
                            )).ToList(),
                        g.match.Winner != null
                        ? new TeamModel(
                            g.match.Winner.Id,
                            g.match.Winner.Name,
                            g.match.Winner.Odds)
                        : null,
                        bets.Select(b => (b.Match.Id == g.match.Id)
                        ? new BetModel(b.Id, b.Match.Id, b.Team.Id, b.Amount, b.Odds)
                        : null).FirstOrDefault()
                        ))
                    .ToList();

                return Task.FromResult(matches);
            }
        }
    }
}
