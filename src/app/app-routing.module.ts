import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MoviesSectionComponent } from './movies-section/movies-section.component';
import { AccountManagementComponent } from './account-management/account-management.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';

const routes: Routes = [{path: '', redirectTo: 'movies', pathMatch: 'full'},
  {path: 'movies/:id', component: MovieDetailsComponent},
  {path: 'movies/:genre', component: MoviesSectionComponent},
  {path: 'movies', component: MoviesSectionComponent},
  {path: 'account', component: AccountManagementComponent},
  {path: '**', redirectTo: 'movies'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
