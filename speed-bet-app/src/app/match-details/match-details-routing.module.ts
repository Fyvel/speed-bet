import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MatchDetailsComponent } from './match-details.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', component: MatchDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MatchDetailsRoutingModule { }
