import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-match-tile',
  templateUrl: './match-tile.component.html',
  styleUrls: ['./match-tile.component.scss']
})
export class MatchTileComponent implements OnInit {
  @Input() match: any;

  constructor() { }

  ngOnInit() {
  }

}
