import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './../app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { MoviesSectionComponent } from './movies-section.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { LoaderSpinnerComponent } from '../shared/loader-spinner/loader-spinner.component';

const routes: Routes = [{path: '', redirectTo: 'movies', pathMatch: 'full'},
{path: 'search/:query/:page', component: MoviesSectionComponent},
{path: 'search/:query', component: MoviesSectionComponent},
{path: 'movies/:id', component: MovieDetailsComponent},
{path: 'movies/:genre', component: MoviesSectionComponent},
{path: 'movies', component: MoviesSectionComponent},
{path: '**', redirectTo: 'movies'}
]

@NgModule({
    declarations: [
        MovieDetailsComponent,
        MoviesSectionComponent,
        LoaderSpinnerComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        RouterModule.forChild(routes)
    ]
})

export class MoviesModule {}