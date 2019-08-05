export interface TeamModel {
  teamId: number;
  name: string;
  odds: number;
}

export interface MatchModel {
  matchId: number;
  sport: string;
  teams: TeamModel[];
  status: string;
  winner?: TeamModel;
}

export interface BetModel {
  betId?: number;
  matchId: number;
  teamId: number;
  amount: number;
  odds: number;
}
