import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

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
  movies = [];
  setMoviesFromNgService = () => this.moviesService.getTrending(this.currentMediaType)
  .subscribe(resp => {
    this.movies = resp['results'];
  });

  constructor(private moviesService: moviesService) { }

  ngOnInit() {
    this.setMoviesFromNgService();
  }

  getNewTrendingList(mediaType) {
    console.log('asd');
    this.currentMediaType = mediaType;
    this.setMoviesFromNgService();
  }

  getMoviePoster(path) {
    return `https://image.tmdb.org/t/p/w600_and_h900_bestv2/${path}`;
  }

}
