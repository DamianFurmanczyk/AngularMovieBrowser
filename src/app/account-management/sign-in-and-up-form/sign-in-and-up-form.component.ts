import { Router } from '@angular/router';
import { authService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-sign-in-and-up-form',
  templateUrl: './sign-in-and-up-form.component.html',
  styleUrls: ['./sign-in-and-up-form.component.styl']
})

export class SignInAndUpFormComponent implements OnInit {
  loginFlag: boolean = true;
  errorMsg: string = '';
  timeout;

  constructor(private authService: authService, private router: Router) { }

  ngOnInit() {
  }

  submitForm(form: NgForm) {
    console.log(form);
    this.authService[this.loginFlag ?  'signInUser' : 'signUpUser'](form.value.email, form.value.password).subscribe(
      () => {
        this.router.navigate(['/account']);
      },
      error => {
        switch(error.error.error.message){
          case 'TOO_MANY_ATTEMPTS_TRY_LATER : Too many unsuccessful login attempts. Please try again later.': this.errorMsg = 'Too many unsuccessful login attempts. Please try again later.'; break;
          case 'EMAIL_EXISTS' : this.errorMsg = 'Email already in use'; break;
          case 'EMAIL_NOT_FOUND' : this.errorMsg = 'No user found with given email.'; break;
          case 'INVALID_PASSWORD': this.errorMsg = 'Invalid password.'; break;
          default: this.errorMsg = 'An unknown error occured.'
        }

        this.timeout = setTimeout(() => this.errorMsg = '', 7000);
      }
    );
  }

}
