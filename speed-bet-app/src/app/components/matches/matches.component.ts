import { Component, OnInit } from '@angular/core';
import { MatchesService } from 'src/app/services/matches.service';
import { Observable } from 'rxjs';
import { MatchModel } from 'src/app/models/interfaces';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.scss']
})
export class MatchesComponent implements OnInit {
  matches$: Observable<MatchModel[]>;

  constructor(private matchesSrv: MatchesService) { }

  ngOnInit() {
    this.matches$ = this.matchesSrv.getLatestMatches(1);
  }

}
