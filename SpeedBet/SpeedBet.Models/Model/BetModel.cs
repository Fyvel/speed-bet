using System;

namespace SpeedBet.Models.Model
{
    public class BetModel
    {
        public Guid Id { get; }
        public int MatchId { get; }
        public int TeamId { get; }
        public int Amount { get; }
        public double Odds { get; }

        public BetModel(Guid id, int matchId, int teamId, int amount, double odds)
        {
            Id = id;
            MatchId = matchId;
            TeamId = teamId;
            Amount = amount;
            Odds = odds;
        }
    }
}
