import { Component, OnInit } from '@angular/core';
import { MatchesService } from 'src/app/services/matches.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.scss']
})
export class MatchesComponent implements OnInit {
  matches$: Observable<any>;

  constructor(private matchesSrv: MatchesService) { }

  ngOnInit() {
    this.matches$ = this.matchesSrv.getLatestMatches(1);
  }

}
