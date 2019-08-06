using System;
using System.Collections.Generic;
using System.Text;

namespace SpeedBet.Dal.Dtos
{
    public class TeamDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public double Odds { get; set; }
    }
}
