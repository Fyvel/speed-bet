import { Component, OnInit } from '@angular/core';
import { MatchesService } from './services/matches.service';
import { BalanceModel } from './models/interfaces';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  balance$: Observable<BalanceModel>;

  constructor(private matchService: MatchesService) {
    this.matchService.initBalance().subscribe();
    this.balance$ = this.matchService.balance$;
  }
}
