import { movies } from './movies.interface';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'

import { moviesService } from './movies.service';

@Component({
  selector: 'app-movies-section',
  templateUrl: './movies-section.component.html',
  styleUrls: ['./movies-section.component.styl']
})
export class MoviesSectionComponent implements OnInit{
  mediaTypes: String[] = ['All', 'Movie', 'Tv'];
  currentMediaType: String = 'All';
  movies: movies[] = [];
  genre: String = '';
  trending: boolean = true;
  currentPage: number = 1;
  totalPages: number = 1;
  currentRange: number[] = [];
  query: string = '';
  queryNoResults: boolean = false;

  windowScroll() {
    window.scrollTo({top:0});
  }

  setMoviesFromNgService = () => this.moviesService.getTrending(this.currentMediaType)
  .subscribe(resp => this.movies = resp.results);

  constructor(private moviesService: moviesService, private route: ActivatedRoute) { }

  ngOnInit() {

    this.route.queryParams.subscribe(
      queryParams => {

        if(queryParams.genre == undefined) {
          this.trending = true;
          return this.setMoviesFromNgService();
        }
        this.genre = queryParams.genre;
        this.trending = false;
        this.currentPage = queryParams.page;
  
        this.moviesService.getByGenre(this.genre, this.currentPage).subscribe(
          result => {
            this.addPaginationFunctionality(result['total_pages'], result['page'], result.results);

            console.log(this);
          },
          error => alert(JSON.stringify(error))
        );
        
      }
    );  

    this.route.params.subscribe(params => {
      console.log(params);
      if(params.query) {
        this.query = params.query;

        console.log(this.query);
  
        this.moviesService.getMoviesIncludingQuery(params.query, params.page || 1).subscribe(
          resp => {
            console.log(resp);

            if(resp.total_results == 0) {
              this.trending = false;
              return this.queryNoResults = true;
            }

            this.queryNoResults = false;
            this.movies = resp['results'];
            this.trending = false;
            this.addPaginationFunctionality(resp['total_pages'], resp['page'], resp.results);
            return;
          }
        );
      }

    });



    
  }

  addPaginationFunctionality(totalPages: number, currentPage: number, movies: movies[]) {
    this.movies = movies;
    this.currentRange = [];
    this.totalPages = totalPages;
    this.currentPage = currentPage;
    for(let i = Math.max(this.currentPage - 3, 1); i < this.currentPage + 4 && i < this.totalPages + 1; i++) {
      this.currentRange.push(i);
  }
  }
  
  getMoviePoster(path) {
    return this.moviesService.completeImagePath(path);
  }

  getNewTrendingList(mediaType) {
    this.currentMediaType = mediaType;
    this.setMoviesFromNgService();
  }

}
