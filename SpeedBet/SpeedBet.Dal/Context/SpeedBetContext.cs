using Microsoft.EntityFrameworkCore;
using SpeedBet.Dal.Dtos;

namespace SpeedBet.Dal.Context
{
    public class SpeedBetContext : DbContext
    {
        public DbSet<MatchDto> Matches { get; set; }
        public DbSet<TeamDto> Teams { get; set; }
        public DbSet<MatchTypeDto> MatchTypes { get; set; }
        public DbSet<TeamsMatchTypeDto> TeamsMatchTypes { get; set; }
        public DbSet<BetDto> Bets { get; set; }
        public DbSet<UserDto> Users { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlite("Data Source=../speedbet.db");
        }
    }
}
