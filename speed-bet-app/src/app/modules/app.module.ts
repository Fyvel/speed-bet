import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from '../app-routing.module';
import { AppComponent } from '../app.component';
import { AngularMaterialModule } from './angular-material.module';
import { MatchesService } from '../services/matches.service';
import { HttpClientModule } from '@angular/common/http';
import { MatchesComponent } from '../components/matches/matches.component';
import { MatchTileComponent } from '../components/match-tile/match-tile.component';
import { MatchDetailsComponent } from '../components/match-details/match-details.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    MatchesComponent,
    MatchTileComponent,
    MatchDetailsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    AngularMaterialModule,
    HttpClientModule
  ],
  providers: [MatchesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
