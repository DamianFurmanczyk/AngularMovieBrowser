import { Router } from '@angular/router';
import { Component, Input } from '@angular/core';

import { authService } from './../auth.service';

@Component({
  selector: 'app-list-table',
  templateUrl: './list-table.component.html',
  styleUrls: ['./list-table.component.styl']
})
export class ListTableComponent {
  @Input() list;

  constructor(private authService: authService, private router: Router) { }

  deleteItemDb(title) {
    this.authService.removeFromList(title);
  }

  goToPosDetails(id, e) {
    !e.target.classList.contains('fa-times-circle-o') && this.router.navigate(['/movies', id]);
  }

}
