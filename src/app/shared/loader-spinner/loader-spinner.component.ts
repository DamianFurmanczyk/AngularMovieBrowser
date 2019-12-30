import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loader-spinner',
  template: `<div class="my-5 d-flex justify-content-center">
              <div class="spinner-border" role="status">
                  <span class="sr-only">Loading...</span>
              </div>
            </div>`
})
export class LoaderSpinnerComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
