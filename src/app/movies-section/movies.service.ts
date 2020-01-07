import { Router } from '@angular/router';
import { Injectable } from "@angular/core";
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import {map,tap} from 'rxjs/operators';

import { movieGottenFromApi } from './movie.interface';
import { genre } from './../navigation-bar/genre.interface';

export interface moviesResponse {
    page: number,
    total_results: number,
    total_pages: number,
    results: movieGottenFromApi[]
}

@Injectable({providedIn: 'root'})

export class moviesService {
    apiKey = '4533a0a19dacd875dcab55eff92c5060';
    apiUrl = 'https://api.themoviedb.org/3';
    genresMap: genre[] = [];
    
    constructor(private http: HttpClient, private router: Router) {}
    
    mappingGenresIdsToNames = response => {
        response.results.map(
            movie => {
                movie.genres = [];
                movie.genre_ids.map(genreId => {
                  this.genresMap.find(genre => {
                    if (genre.id == genreId) movie.genres.push(genre.name);
                  });
                });
                return movie;
              }
        )
        return response;
    }


    getTrending(mediaType: String):Observable<moviesResponse> {
        return this.http.get(`${this.apiUrl}/trending/${mediaType}/week?api_key=${this.apiKey}`).pipe(
            map(this.mappingGenresIdsToNames)
        )
    }

    getMovieDetails(id: number):Observable<movieGottenFromApi> {
        return this.http.get<movieGottenFromApi>(`${this.apiUrl}/movie/${id}?api_key=${this.apiKey}&language=en-US`);
    }

    getMovieReviews(id: number):Observable<movieGottenFromApi> {
        return this.http.get<movieGottenFromApi>(`${this.apiUrl}/movie/${id}/reviews?api_key=${this.apiKey}&language=en-US&page=1`);
    }

    getMoviesIncludingQuery(query: String, page: Number = 1):Observable<moviesResponse>|undefined {
        if(!query) this.router.navigate(['/movies']);
        return this.http.get<moviesResponse>(`${this.apiUrl}/search/movie?api_key=${this.apiKey}&query=${query}&page=${page}`).pipe(
            map(this.mappingGenresIdsToNames)
        );
    }

    completeImagePath(path):string {
        return `https://image.tmdb.org/t/p/w600_and_h900_bestv2/${path}`;
      }
    
    getMovieCredits(id: number) {
        return this.http.get(`${this.apiUrl}/movie/${id}/credits?api_key=${this.apiKey}`);
    }

    getCategories() {
        return this.http.get<{genres: genre[]}>(`${this.apiUrl}/genre/movie/list?api_key=${this.apiKey}`).pipe(
            tap(result => this.genresMap = result.genres)
        )
    }

    getByGenre(genre: String, page: number) {
        return this.http.get(`${this.apiUrl}/discover/movie?api_key=${this.apiKey}&sort_by=popularity.desc&include_video=false&page=${page}&with_genres=${genre}`).pipe(
            map(this.mappingGenresIdsToNames)
        )
    }
}
