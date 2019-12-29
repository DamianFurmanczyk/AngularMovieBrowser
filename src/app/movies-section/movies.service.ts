import { Injectable } from "@angular/core";
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import {map,tap} from 'rxjs/operators';

import { movies } from './movies.interface';
import { genre } from './../navigation-bar/genre.interface';

@Injectable({providedIn: 'root'})

export class moviesService {
    apiKey = '4533a0a19dacd875dcab55eff92c5060';
    query = 'shrek';
    apiUrl = 'https://api.themoviedb.org/3';
    genresMap: genre[] = [];

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

    constructor(private http: HttpClient) {}

    getTrending(mediaType: String) {
        return this.http.get<movies>(`${this.apiUrl}/trending/${mediaType}/week?api_key=${this.apiKey}`).pipe(
            map(this.mappingGenresIdsToNames)
        )
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