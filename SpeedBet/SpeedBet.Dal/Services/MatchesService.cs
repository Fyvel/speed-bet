using Microsoft.EntityFrameworkCore;
using SpeedBet.Core;
using SpeedBet.Dal.Context;
using SpeedBet.Models.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SpeedBet.Dal.Services
{
    public class MatchesService : IMatchesService
    {
        public Task<MatchModel> GetMatchById(int id)
        {
            using (var db = new SpeedBetContext())
            {
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
                    : null)).FirstOrDefault();

                return Task.FromResult(result);
            }
        }

        public Task<IReadOnlyList<MatchModel>> GetMatches()
        {
            using (var db = new SpeedBetContext())
            {
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
                        : null)).ToList();
                return Task.FromResult(matches);
            }
        }
    }
}
