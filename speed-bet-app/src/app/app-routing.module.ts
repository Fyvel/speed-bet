import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'matches' },
  {
    path: 'matches',
    loadChildren: () => import('./matches/matches.module').then(m => m.MatchesModule)
  },
  {
    path: 'match/:id',
    loadChildren: () => import('./match-details/match-details.module').then(m => m.MatchDetailsModule)
  },
  { path: '**', redirectTo: 'matches' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
