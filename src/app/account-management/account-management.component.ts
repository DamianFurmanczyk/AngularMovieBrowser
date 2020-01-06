import { User } from './User.model';
import { authService } from './auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-account-management',
  templateUrl: './account-management.component.html',
  styleUrls: ['./account-management.component.styl']
})
export class AccountManagementComponent implements OnInit, OnDestroy {
  user: User | null;
  private userSub: Subscription;
  lists = {};

  constructor(private authService: authService) { }

  ngOnInit() {
    this.authService.getUsersLists().subscribe(resp => {
      this.lists = {};
      resp.forEach(movie => {
        console.log(movie);
        this.lists[movie.listType] = this.lists[movie.listType] ? [...this.lists[movie.listType], movie] : [movie];
        console.log(this.lists);
      });
    });

    this.userSub = this.authService.user.subscribe(user => this.user = user);
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
