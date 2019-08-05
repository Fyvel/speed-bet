import { Component, OnInit, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { Observable, Subject } from 'rxjs';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { MatchesService } from 'src/app/services/matches.service';
import { switchMap, takeUntil, tap } from 'rxjs/operators';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatchModel, TeamModel, BetModel } from 'src/app/models/interfaces';

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
      tap(match => this.match = match)
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
          console.log('success', val);
        },
        err => {
          throw new Error(err);
        });
  }

  onBackToListClick() {
    this.router.navigateByUrl('/matches');
  }
}
