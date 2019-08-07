using Microsoft.EntityFrameworkCore;
using SpeedBet.Core;
using SpeedBet.Dal.Context;
using SpeedBet.Dal.Dtos;
using SpeedBet.Models.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SpeedBet.Dal.Services
{
    public class BetsService : IBetsService
    {
        public Task<IReadOnlyList<BetModel>> GetBetsByUserId(int userId)
        {
            using (var db = new SpeedBetContext())
            {
                IReadOnlyList<BetModel> bets = db.Bets
                    .Include(b => b.Match)
                    .Include(b => b.Team)
                    .Include(b => b.User)
                    .Where(b => b.User.Id == userId)
                    .Select(b => new BetModel(
                        b.Id,
                        b.Match.Id,
                        b.Team.Id,
                        b.Amount,
                        b.Odds))
                    .ToList();
                return Task.FromResult(bets);
            }
        }

        public Task<BetModel> PlaceBet(BetModel bet)
        {
            using (var db = new SpeedBetContext())
            {
                // get current user
                var currentUser = db.Users.Find(1);

                // add new bet
                var newBet = new BetDto
                {
                    Id = Guid.NewGuid(),
                    Match = db.Matches.Find(bet.MatchId),
                    Team = db.Teams.Find(bet.TeamId),
                    Amount = bet.Amount,
                    Odds = bet.Odds,
                    User = currentUser
                };
                db.Bets.Add(newBet);

                // update user account
                currentUser.AmountBet += newBet.Amount;
                db.Users.Update(currentUser);

                // save all changes
                db.SaveChanges();

                var result = new BetModel(
                    newBet.Id,
                    newBet.Match.Id,
                    newBet.Team.Id,
                    newBet.Amount,
                    newBet.Odds);
                return Task.FromResult(result);
            }

        }
    }
}
