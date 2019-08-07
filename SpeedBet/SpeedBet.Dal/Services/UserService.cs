using System.Threading.Tasks;
using SpeedBet.Core;
using SpeedBet.Dal.Context;
using SpeedBet.Models.Model;

namespace SpeedBet.Dal.Services
{
    public class UserService : IUserService
    {
        public Task<BalanceModel> GetBalance()
        {
            using (var db = new SpeedBetContext())
            {
                // get current user 
                var currentUser = db.Users.Find(1);

                // map result
                var balance = new BalanceModel(
                    currentUser.AmountBet,
                    currentUser.AmountWon);

                return Task.FromResult(balance);
            }
        }
    }
}
