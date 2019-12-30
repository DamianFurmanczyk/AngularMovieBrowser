import { ActivatedRoute } from '@angular/router';
import { moviesService } from './../movies-section/movies.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.styl']
})
export class MovieDetailsComponent implements OnInit {
  movieDetails;
  movieReviews;
  movieCredits;

  constructor(private moviesService: moviesService, private ActivatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.ActivatedRoute.params.subscribe(
      params  => {

        this.moviesService.getMovieDetails(params.id).subscribe(resp => this.movieDetails = resp)
        this.moviesService.getMovieReviews(params.id).subscribe(resp => this.movieReviews = resp)
        this.moviesService.getMovieCredits(params.id).subscribe(resp => this.movieCredits = resp)

        setTimeout(
          () => console.log(this), 1000)

      }
    );
  }

  completeImagePath(path) {
    return this.moviesService.completeImagePath(path);
  }

}
