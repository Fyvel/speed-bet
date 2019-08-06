﻿using SpeedBet.Models.Enum;
using System.Collections.Generic;

namespace SpeedBet.Models.Model
{
    public class MatchModel
    {
        public int Id { get; }
        public string Sport { get; }
        public StatusEnum Status { get; }
        public IReadOnlyList<TeamModel> Teams { get; }
        public TeamModel Winner { get; }

        public MatchModel(
            int id,
            string sport,
            StatusEnum status,
            List<TeamModel> teams,
            TeamModel winner)
        {
            Id = id;
            Sport = sport;
            Status = status;
            Teams = teams;
            Winner = winner;
        }
    }
}
