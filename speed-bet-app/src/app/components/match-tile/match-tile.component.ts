import { Component, OnInit, Input } from '@angular/core';
import { MatchModel } from 'src/app/models/interfaces';

@Component({
  selector: 'app-match-tile',
  templateUrl: './match-tile.component.html',
  styleUrls: ['./match-tile.component.scss']
})
export class MatchTileComponent implements OnInit {
  @Input() match: MatchModel;

  matchRoute: string;

  constructor() { }

  ngOnInit() {
    this.matchRoute = `/match/${this.match.matchId}`;
  }

}
