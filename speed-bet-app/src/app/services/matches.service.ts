import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { STATUS } from '../enums/enums';
import { MatchModel, BetModel } from '../models/interfaces';

const matches = [
  {
    matchId: 1,
    sport: '🥋',
    teams: [
      { teamId: 1, name: 'Chuck Norris', odds: 9.7 },
      { teamId: 2, name: 'Sangoku', odds: 4.2 }],
    status: STATUS.upcoming,
    winner: null
  },
  {
    matchId: 2,
    sport: '🥊',
    teams: [
      { teamId: 3, name: 'John Wick', odds: 3.1 },
      { teamId: 4, name: 'Superman', odds: 1.1 }
    ],
    status: STATUS.upcoming,
    winner: null
  },
  {
    matchId: 3,
    sport: '🥌',
    teams: [
      { teamId: 5, name: 'Deadpool', odds: 3.4 },
      { teamId: 6, name: 'Darth Maul', odds: 5 }],
    status: STATUS.upcoming,
    winner: null
  }
];

@Injectable({
  providedIn: 'root'
})
export class MatchesService {

  constructor(private http: HttpClient) {
  }

  getLatestMatches(page: number = 1) {
    return of(matches);
    // return this.http.get(`${BASE_URL}/matches?page=${page}`);
  }

  getMatch(matchId: number): Observable<MatchModel> {
    return of(matches.find(x => x.matchId === matchId));
  }

  placeBet(bet: BetModel): Observable<any> {
    console.log(bet);
    throw new Error('not implemented yet');
  }
}
