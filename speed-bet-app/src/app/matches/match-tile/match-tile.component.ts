import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { MatchModel } from 'src/app/models/interfaces';

@Component({
  selector: 'app-match-tile',
  templateUrl: './match-tile.component.html',
  styleUrls: ['./match-tile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MatchTileComponent implements OnInit {
  @Input() match: MatchModel;

  matchRoute: string;

  constructor() { }

  ngOnInit() {
    this.matchRoute = `/match/${this.match.matchId}`;
  }

}
