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

        public BetsController(IBetsService betSrv)
        {
            _betsService = betSrv;
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