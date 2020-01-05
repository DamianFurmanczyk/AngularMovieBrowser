import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.styl']
})

export class AppComponent implements OnInit  {
  errorMessage: string = ''

  constructor() {
  }

  displayError(message: string) {
    this.errorMessage = message;
  }

  ngOnInit(): void {
  }
}
