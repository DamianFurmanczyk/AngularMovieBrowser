import { movies } from './movies.interface';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router'

import { moviesService } from './movies.service';

@Component({
  selector: 'app-movies-section',
  templateUrl: './movies-section.component.html',
  styleUrls: ['./movies-section.component.styl']
})
export class MoviesSectionComponent implements OnInit {
  mediaTypes: String[] = ['All', 'Movie', 'Tv'];
  currentMediaType: String = 'All';
  sub: Subscription;
  movies: movies[] = [];
  genre: String = '';
  trending: boolean = true;
  currentPage: number = 1;
  totalPages: number = 1;
  currentRange: number[] = [];

  windowScroll() {
    window.scrollTo({top:0});
  }

  setMoviesFromNgService = () => this.moviesService.getTrending(this.currentMediaType)
  .subscribe(resp => this.movies = resp.results);

  constructor(private moviesService: moviesService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe(
      queryParams => {
        console.log(queryParams.genre);
        if(queryParams.genre == undefined) {
          this.trending = true;
          return this.setMoviesFromNgService();
        }
        this.genre = queryParams.genre;
        this.trending = false;
        this.currentPage = queryParams.page;
  
        this.moviesService.getByGenre(this.genre, this.currentPage).subscribe(
          result => {
            console.log(result)
            this.currentRange = [];
            this.movies = result.results;
            this.totalPages = result['total_pages'];
            this.currentPage = result['page'];
            for(let i = Math.max(this.currentPage - 3, 1); i < this.currentPage + 4 && i < this.totalPages + 1; i++) {
                this.currentRange.push(i);
            }
            console.log(this);
          },
          error => alert(JSON.stringify(error))
        );
      }
    );
    
  }

  getNewTrendingList(mediaType) {
    this.currentMediaType = mediaType;
    this.setMoviesFromNgService();
  }

  getMoviePoster(path) {
    return this.moviesService.completeImagePath(path);
  }

}
