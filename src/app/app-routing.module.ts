import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MoviesSectionComponent } from './movies-section/movies-section.component';
import { AccountManagementComponent } from './account-management/account-management.component';
import { MovieDetailsComponent } from './movies-section/movie-details/movie-details.component';
import { SignInAndUpFormComponent } from './account-management/sign-in-and-up-form/sign-in-and-up-form.component';

const routes: Routes = [{path: '', redirectTo: 'movies', pathMatch: 'full'},
  {path: 'search/:query/:page', component: MoviesSectionComponent},
  {path: 'search/:query', component: MoviesSectionComponent},
  {path: 'movies/:id', component: MovieDetailsComponent},
  {path: 'movies/:genre', component: MoviesSectionComponent},
  {path: 'movies', component: MoviesSectionComponent},
  {path: 'signIn', component: SignInAndUpFormComponent},
  {path: 'account', component: AccountManagementComponent},
  {path: '**', redirectTo: 'movies'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
