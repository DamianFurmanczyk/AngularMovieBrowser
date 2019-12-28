import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MoviesSectionComponent } from './movies-section/movies-section.component';
import { AccountManagementComponent } from './account-management/account-management.component';

const routes: Routes = [{path: '', redirectTo: 'movies', pathMatch: 'full'},
  {path: 'movie/:id', component: MoviesSectionComponent},
  {path: 'movies', component: MoviesSectionComponent, children : [
    {path:':genre', component: MoviesSectionComponent}
  ]},
  {path: 'account', component: AccountManagementComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
