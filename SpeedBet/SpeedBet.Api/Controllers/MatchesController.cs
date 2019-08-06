using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using SpeedBet.Core;
using SpeedBet.Models.Model;

namespace SpeedBet.Api.Controllers
{
    [Route("api")]
    [ApiController]
    public class MatchesController : Controller
    {
        private IMatchesService _matchesService;

        public MatchesController(IMatchesService matchSrv)
        {
            _matchesService = matchSrv;
        }

        [HttpGet]
        [Route("matches")]
        public async Task<ActionResult<IReadOnlyList<MatchModel>>> GetMatches()
        {
            try
            {
                var result = await _matchesService.GetMatches();
                return new OkObjectResult(result);
            }
            catch (Exception ex)
            {
                Console.Write(ex); // Todo: log exception
                return StatusCode(500);
            }
        }

        [HttpGet]
        [Route("match/{id}")]
        public async Task<ActionResult<MatchModel>> GetMatch(int id)
        {
            try
            {
                var result = await _matchesService.GetMatchById(id);
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