import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { MatchModel, BetModel, TeamModel, BalanceModel } from '../models/interfaces';
import { map } from 'rxjs/operators';
import { STATUS } from '../enums/enums';

const BASE_URL = `https://localhost:5001/api`;

@Injectable({
  providedIn: 'root'
})
export class MatchesService {
  balance$ = new BehaviorSubject<BalanceModel>({
    amountBet: 0,
    amountWon: 0
  });

  constructor(private http: HttpClient) { }

  initBalance() {
    return this.http.get(`${BASE_URL}/balance`).pipe(
      map((res: any) => {
        try {
          const balance: BalanceModel = {
            amountBet: res.amountBet,
            amountWon: res.amountWon
          };
          this.balance$.next(balance);
        } catch (e) {
          const err = new Error('Mapping failed');
          err.stack = e;
          throw err;
        }
      })
    );
  }

  setBalance(update: BalanceModel) {
    const currentBal = this.balance$.value;
    this.balance$.next({
      amountBet: update.amountBet + currentBal.amountBet,
      amountWon: update.amountWon + currentBal.amountWon
    });
  }

  endMatch(matchId: number): Observable<TeamModel> {
    return this.http.post(`${BASE_URL}/match/${matchId}/finish`, {}).pipe(
      map((res: any) => {
        try {
          const winner: TeamModel = {
            teamId: res.id,
            name: res.name,
            odds: res.odds
          };
          return winner;
        } catch (e) {
          const err = new Error('Mapping failed');
          err.stack = e;
          throw err;
        }
      })
    );
  }

  getLatestMatches(page: number = 1): Observable<MatchModel[]> {
    // Todo: lazy load
    return this.http.get(`${BASE_URL}/matches`).pipe(
      map((res: any) => {
        try {
          const results: Array<MatchModel> = (res || []).map(r => r && ({
            matchId: r.id,
            type: r.type,
            sport: r.sport,
            status: STATUS.convert(r.status),
            teams: (r.teams || []).map(t => t && ({
              teamId: t.id,
              name: t.name,
              odds: t.odds
            })),
            winner: r.winner && ({
              teamId: r.winner.id,
              name: r.winner.name,
              odds: r.winner.odds
            }),
            currentBet: r.currentBet
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
            status: STATUS.convert(res.status),
            teams: (res.teams || []).map(t => t && ({
              teamId: t.id,
              name: t.name,
              odds: t.odds
            })),
            winner: res.winner && ({
              teamId: res.winner.id,
              name: res.winner.name,
              odds: res.winner.odds
            }),
            currentBet: res.currentBet
          };
          return result;
        } catch (e) {
          const err = new Error('Mapping failed');
          err.stack = e;
          throw err;
        }
      })
    );
  }

  placeBet(bet: BetModel): Observable<BetModel> {
    return this.http.post(`${BASE_URL}/bet`, bet).pipe(
      map((res: any) => {
        try {
          const result: BetModel = {
            betId: res.id,
            matchId: res.matchId,
            teamId: res.teamId,
            amount: res.amount,
            odds: res.odds
          };
          return result;
        } catch (e) {
          const err = new Error('Mapping failed');
          err.stack = e;
          throw err;
        }
      })
    );
  }


}
