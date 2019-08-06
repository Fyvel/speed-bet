using SpeedBet.Models.Model;
using System.Threading.Tasks;

namespace SpeedBet.Core
{
    public interface IBetsService
    {
        Task<BetModel> PlaceBet(BetModel newBet);
    }
}
