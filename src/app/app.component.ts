import { Component, OnInit } from '@angular/core';
import {moviesService} from './movies-section/movies.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.styl']
})

export class AppComponent implements OnInit  {
  title = 'movieBrowser';

  constructor(private movieService: moviesService) {

  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    console.log(this.movieService.apiKey + ' dope')
  }
}
