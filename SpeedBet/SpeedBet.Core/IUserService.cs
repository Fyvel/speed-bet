using SpeedBet.Models.Model;
using System.Threading.Tasks;

namespace SpeedBet.Core
{
    public interface IUserService
    {
        Task<BalanceModel> GetBalance();
    }
}
