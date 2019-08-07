using SpeedBet.Models.Model;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SpeedBet.Core
{
    public interface IBetsService
    {
        Task<BetModel> PlaceBet(BetModel newBet);
        Task<IReadOnlyList<BetModel>> GetBetsByUserId(int userId);
    }
}
