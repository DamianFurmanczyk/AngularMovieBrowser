import { Injectable } from "@angular/core";
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({providedIn: 'root'})

export class moviesService {
    apiKey = '4533a0a19dacd875dcab55eff92c5060';
    query = 'shrek';
    apiUrl = 'https://api.themoviedb.org/3';
    genresMap = <any>[];

    mappingGenresIdsToNames = response => {
        response['results'].map(
            movie => {
                movie['genres'] = [];
                movie['genre_ids'].map(genreId => {
        
                  this.genresMap.find(genre => {
                    if (genre.id == genreId) movie['genres'].push(genre.name);
                  });
        
                });
                return movie;
              }
        )
        return response;
    }

    constructor(private http: HttpClient) {}

    get getRequestUrl(): String {
        return `${this.apiUrl}/search/movie?api_key=${this.apiKey}&query=${this.query}`;
    }

    getTrending(mediaType: String) {
        return this.http.get(`${this.apiUrl}/trending/${mediaType}/week?api_key=${this.apiKey}`).pipe(
            map(this.mappingGenresIdsToNames)
        )
    }

    getCategories() {
        return this.http.get(`${this.apiUrl}/genre/movie/list?api_key=${this.apiKey}`)
        .pipe(
            map(response => {
                this.genresMap = response['genres'];
                console.log(this.genresMap);
                let arr = [];
                for (let genre of response['genres']) {
                    arr.push(genre.name);
                }
                return arr;
            })
            );
    }
}