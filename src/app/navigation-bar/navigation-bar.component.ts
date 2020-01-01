import { moviesService } from './../movies-section/movies.service';
import { Component, OnInit } from '@angular/core';

import { genre } from './genre.interface';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.styl']
})
export class NavigationBarComponent implements OnInit {
  genres: genre[] = [];
  query: string = '';

  constructor(private moviesService: moviesService) { }

  ngOnInit() {
    this.moviesService.getCategories().subscribe(response => {
      this.genres = response.genres;
      console.log(this.genres);
    }, error => alert(error));
  }

}
