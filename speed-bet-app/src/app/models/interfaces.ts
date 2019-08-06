export interface TeamModel {
  teamId: number;
  name: string;
  odds: number;
}

export interface MatchModel {
  matchId: number;
  type: string;
  sport: string;
  status: string;
  teams: TeamModel[];
  winner?: TeamModel;
}

export interface BetModel {
  betId?: number;
  matchId: number;
  teamId: number;
  amount: number;
  odds: number;
}
