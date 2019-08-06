using SpeedBet.Models.Enum;

namespace SpeedBet.Dal.Dtos
{
    public class MatchDto
    {
        public int Id { get; set; }
        public string Sport { get; set; }
        public StatusEnum Status { get; set; }
        public TeamDto Winner { get; set; }
        public MatchTypeDto MatchType { get; set; }
    }
}
