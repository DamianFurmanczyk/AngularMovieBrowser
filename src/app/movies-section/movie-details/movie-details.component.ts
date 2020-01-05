import { authService } from './../../account-management/auth.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { moviesService } from '../movies.service';
import { User } from './../../account-management/User.model';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.styl']
})
export class MovieDetailsComponent implements OnInit {
  movieDetails;
  movieReviews;
  movieCredits;
  user: User | null = null;

  constructor(private authService: authService, private moviesService: moviesService, private ActivatedRoute: ActivatedRoute) { }

  ngOnInit() {

    this.authService.user.subscribe(
      user => this.user = user 
    );

    this.ActivatedRoute.params.subscribe(
      params  => {

        this.moviesService.getMovieDetails(params.id).subscribe(resp => this.movieDetails = resp)
        this.moviesService.getMovieReviews(params.id).subscribe(resp => this.movieReviews = resp)
        this.moviesService.getMovieCredits(params.id).subscribe(resp => this.movieCredits = resp)

        setTimeout(() => 
        console.log(this.movieDetails), 1000)
      }
    );
  }

  addToList(listType: string) {
    this.authService.addToList(listType, this.movieDetails);
  }

  completeImagePath(path) {
    return this.moviesService.completeImagePath(path);
  }

}
