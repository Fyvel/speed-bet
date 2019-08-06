using SpeedBet.Models.Model;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SpeedBet.Core
{
    public interface IMatchesService
    {
        Task<IReadOnlyList<MatchModel>> GetMatches();
        Task<MatchModel> GetMatchById(int id);
    }
}
