import { moviesService } from './../movies-section/movies.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.styl']
})
export class NavigationBarComponent implements OnInit {
  genres: String[] = [];

  constructor(private moviesService: moviesService) { }

  ngOnInit() {
    this.moviesService.getCategories().subscribe(response => {
      this.genres = response;
    }, error => alert(error));
  }

}
