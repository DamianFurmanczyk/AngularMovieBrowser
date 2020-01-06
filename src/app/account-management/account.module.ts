import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './../app-routing.module';
import { NgModule } from '@angular/core';

import { AccountManagementComponent } from './account-management.component';
import { SignInAndUpFormComponent } from './sign-in-and-up-form/sign-in-and-up-form.component';
import { ListTableComponent } from './list-table/list-table.component'
import { authRouteProtection } from './authRouteProtection.service';

const routes: Routes = [
  {path: 'signIn', component: SignInAndUpFormComponent},
  {path: 'account', canActivate: [authRouteProtection], component: AccountManagementComponent}
]

@NgModule({
    declarations: [
    AccountManagementComponent,
    SignInAndUpFormComponent,
    ListTableComponent
    ],
    imports: [
        AppRoutingModule,
        BrowserModule,
        FormsModule,
        RouterModule.forChild(routes)
    ]
})

export class AccountModule {};