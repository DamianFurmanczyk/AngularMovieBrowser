import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from'@angular/common/http';
import {FormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { MoviesSectionComponent } from './movies-section/movies-section.component';
import { AccountManagementComponent } from './account-management/account-management.component';
import { MovieDetailsComponent } from './movies-section/movie-details/movie-details.component';
import { LoaderSpinnerComponent } from './shared/loader-spinner/loader-spinner.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationBarComponent,
    MoviesSectionComponent,
    AccountManagementComponent,
    MovieDetailsComponent,
    LoaderSpinnerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
