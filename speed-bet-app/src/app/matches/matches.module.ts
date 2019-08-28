import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatchTileComponent } from './match-tile/match-tile.component';
import { MatchesComponent } from './matches.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatchesRoutingModule } from './matches-routing.module';

@NgModule({
  declarations: [
    MatchesComponent,
    MatchTileComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatchesRoutingModule
  ]
})
export class MatchesModule { }
