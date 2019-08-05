import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MatchesComponent } from './components/matches/matches.component';
import { MatchDetailsComponent } from './components/match-details/match-details.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'matches' },
  { path: 'matches', component: MatchesComponent },
  { path: 'match/:id', component: MatchDetailsComponent },
  { path: '**', redirectTo: 'matches' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
