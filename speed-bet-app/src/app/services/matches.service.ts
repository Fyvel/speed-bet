import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { STATUS } from '../enums/enums';
import { MatchModel, BetModel, TeamModel } from '../models/interfaces';
import { map } from 'rxjs/operators';

const BASE_URL = `https://localhost:5001/api`;

@Injectable({
  providedIn: 'root'
})
export class MatchesService {

  constructor(private http: HttpClient) {
  }

  getLatestMatches(page: number = 1): Observable<MatchModel[]> {
    // Todo: lazy load
    return this.http.get(`${BASE_URL}/matches`).pipe(
      map((res: any) => {
        try {
          const results = (res || []).map(r => r && ({
            matchId: r.id,
            type: r.type,
            sport: r.sport,
            status: r.status,
            teams: (r.teams || []).map(t => t && ({
              teamId: t.id,
              name: t.name,
              odds: t.odds
            })),
            winner: r.winner && ({
              teamId: r.winner.id,
              name: r.winner.name,
              odds: r.winner.odds
            })
          }));
          return results;
        } catch (e) {
          const err = new Error('Mapping failed');
          err.stack = e;
          throw err;
        }
      })
    );
  }

  getMatch(matchId: number): Observable<MatchModel> {
    return this.http.get(`${BASE_URL}/match/${matchId}`).pipe(
      map((res: any) => {
        try {
          const result = {
            matchId: res.id,
            type: res.type,
            sport: res.sport,
            status: res.status,
            teams: (res.teams || []).map(t => t && ({
              teamId: t.id,
              name: t.name,
              odds: t.odds
            })),
            winner: res.winner && ({
              teamId: res.winner.id,
              name: res.winner.name,
              odds: res.winner.odds
            })
          };
          return result;
        } catch (e) {
          const err = new Error('Mapping failed');
          err.stack = e;
          throw err;
        }
      })
    )
  }

  placeBet(bet: BetModel): Observable<any> {
    console.log(bet);
    throw new Error('not implemented yet');
  }
}
