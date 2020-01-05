import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from'@angular/common/http';
import {FormsModule} from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { MoviesSectionComponent } from './movies-section/movies-section.component';
import { AccountManagementComponent } from './account-management/account-management.component';
import { MovieDetailsComponent } from './movies-section/movie-details/movie-details.component';
import { LoaderSpinnerComponent } from './shared/loader-spinner/loader-spinner.component';
import { SignInAndUpFormComponent } from './account-management/sign-in-and-up-form/sign-in-and-up-form.component';
import { environment } from './firebase.config'

@NgModule({
  declarations: [
    AppComponent,
    NavigationBarComponent,
    MoviesSectionComponent,
    AccountManagementComponent,
    MovieDetailsComponent,
    LoaderSpinnerComponent,
    SignInAndUpFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
