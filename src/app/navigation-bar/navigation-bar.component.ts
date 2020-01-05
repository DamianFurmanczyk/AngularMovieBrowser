import { User } from './../account-management/User.model';
import { authService } from './../account-management/auth.service';
import { Router } from '@angular/router';
import { moviesService } from './../movies-section/movies.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { genre } from './genre.interface';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.styl']
})
export class NavigationBarComponent implements OnInit {
  @Output('onError') onError = new EventEmitter<string>();
  genres: genre[] = [];
  query: string = '';
  user: User | null;

  constructor(private authService: authService, private moviesService: moviesService, private router: Router) { }

  ngOnInit() {
    this.authService.user.subscribe(
      user => this.user = user
    );

    this.moviesService.getCategories().subscribe(response => {
      this.genres = response.genres;
      console.log(this.genres);
    }, error => alert(error));
  }

  logOut() {
    this.authService.logOut();
    this.router.url.endsWith('/account') && this.router.navigate(['/movies']);
  }

  proceedToSearch() {
    if(!this.query) {
      return this.onError.emit('Title field must not be empty!')
    }

    this.router.navigate(['/search', this.query]);
  }
}
