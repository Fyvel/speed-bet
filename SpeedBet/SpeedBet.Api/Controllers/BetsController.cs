using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using SpeedBet.Core;
using SpeedBet.Models.Model;

namespace SpeedBet.Api.Controllers
{
    [Route("api")]
    [ApiController]
    public class BetsController : Controller
    {
        private IBetsService _betsService;
        private IUserService _userService;

        public BetsController(IBetsService betSrv, IUserService usrSrv)
        {
            _betsService = betSrv;
            _userService = usrSrv;
        }

        [HttpGet]
        [Route("balance")]
        public async Task<ActionResult<BalanceModel>> GetBalance()
        {
            try
            {
                var result = await _userService.GetBalance();
                return new OkObjectResult(result);
            }
            catch (Exception ex)
            {
                Console.Write(ex); // Todo: log exception
                return StatusCode(500);
            }
        }

        [HttpPost]
        [Route("bet")]
        public async Task<IActionResult> PlaceBet([FromBody] BetModel newBet)
        {
            try
            {
                var result = await _betsService.PlaceBet(newBet);
                return new OkObjectResult(result);
            }
            catch (Exception ex)
            {
                Console.Write(ex); // Todo: log exception
                return StatusCode(500);
            }
        }

    }
}