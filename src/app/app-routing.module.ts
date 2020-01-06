import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MoviesSectionComponent } from './movies-section/movies-section.component';
import { AccountManagementComponent } from './account-management/account-management.component';
import { MovieDetailsComponent } from './movies-section/movie-details/movie-details.component';
import { SignInAndUpFormComponent } from './account-management/sign-in-and-up-form/sign-in-and-up-form.component';
import { authRouteProtection } from './account-management/authRouteProtection.service';

const routes: Routes = [
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
