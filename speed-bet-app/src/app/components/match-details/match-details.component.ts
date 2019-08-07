import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Location } from '@angular/common';
import { Observable, Subject } from 'rxjs';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { MatchesService } from 'src/app/services/matches.service';
import { switchMap, takeUntil, tap } from 'rxjs/operators';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatchModel, TeamModel, BetModel, BalanceModel } from 'src/app/models/interfaces';

interface BetFormValue {
  team: {
    teamId: number;
    name: string;
    odds: number;
  };
  amount: number;
}

@Component({
  selector: 'app-match-details',
  templateUrl: './match-details.component.html',
  styleUrls: ['./match-details.component.scss']
})
export class MatchDetailsComponent implements OnInit, OnDestroy {
  private destroyed$ = new Subject();
  private match: MatchModel;

  match$: Observable<MatchModel>;
  toWin: string = Number(0).toFixed(2);
  cashout: string = Number(0).toFixed(2);

  formGroup: FormGroup;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private matchSrv: MatchesService,
    private fb: FormBuilder) { }

  private createForm() {
    this.formGroup = this.fb.group({
      team: ['', Validators.required],
      amount: ['', [Validators.required, Validators.min(1)]]
    });
  }

  private updateForm(bet: BetModel) {
    const selectedTeam = this.match.teams.find(x => x.teamId === bet.teamId);
    this.formGroup.patchValue({
      team: selectedTeam,
      amount: bet.amount
    }, { emitEvent: true });
    this.formGroup.disable();
  }

  private onFormValueChange(bet: BetFormValue) {
    const odds = this.match.teams.find(x => x.teamId === bet.team.teamId).odds;
    this.cashout = this.oddsCalc(bet.amount, odds).toFixed(2);
    this.toWin = this.oddsCalc(bet.amount, (odds - 1)).toFixed(2);
  }

  private oddsCalc(amount: number, odds: number) {
    const result = amount * odds;
    return result;
  }

  private prepareRequest(formValue: { team: TeamModel, amount: number }, match: MatchModel) {
    const bet: BetModel = {
      betId: 0,
      matchId: match.matchId,
      teamId: formValue.team.teamId,
      odds: formValue.team.odds,
      amount: formValue.amount
    };
    return bet;
  }

  ngOnInit() {
    this.match$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.matchSrv.getMatch(+params.get('id'))),
      tap(match => {
        this.match = match;
        if (match.currentBet) {
          this.updateForm(match.currentBet);
        }
      })
    );

    this.createForm();

    this.formGroup.valueChanges
      .pipe(takeUntil(this.destroyed$))
      .subscribe(
        val => val && val.team && this.onFormValueChange(val),
        err => {
          throw err;
        }
      );
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  onFormSubmit() {
    const request = this.prepareRequest(this.formGroup.value, this.match);
    this.matchSrv.placeBet(request)
      .subscribe(
        val => {
          this.formGroup.disable();
          this.match.currentBet = val;
          this.matchSrv.setBalance({
            amountBet: request.amount,
            amountWon: 0
          });
        },
        err => {
          throw new Error(err);
        });
  }

  endMatch(matchId: number) {
    this.matchSrv.endMatch(matchId)
      .subscribe(val => {
        this.match.winner = val;
        const currentBet = this.match && this.match.currentBet;
        const amount = currentBet && currentBet.amount;
        const team = currentBet && this.match.currentBet.teamId;
        if (team && val.teamId === team) {
          const won = +(amount * val.odds).toFixed(2);
          this.matchSrv.setBalance({
            amountBet: 0,
            amountWon: won
          });
        }
      });
  }

  onBackToListClick() {
    this.router.navigateByUrl('/matches');
  }
}
