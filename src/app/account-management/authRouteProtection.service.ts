import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';

import { authService } from './auth.service';

@Injectable({providedIn: 'root'})

export class authRouteProtection implements CanActivate {
    
  constructor(public authService: authService, public router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {

      return this.authService.user.pipe(
          take(1),
          map(user => {
            if(user) {
                return true;
            }
            this.router.navigate(['/signIn']);
            return false;
          })
      )

  }
}