using System;

namespace SpeedBet.Dal.Dtos
{
    public class BetDto
    {
        public Guid Id { get; set; }
        public MatchDto Match { get; set; }
        public TeamDto Team { get; set; }
        public UserDto User { get; set; }
        public int Amount { get; set; }
        public double Odds { get; set; }
    }
}
