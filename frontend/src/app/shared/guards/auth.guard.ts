import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, catchError, map, of, take } from 'rxjs';
import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private router: Router, private authService: SocialAuthService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    console.log('guard');
    return this.authService.authState.pipe(
      take(1),
      map((socialUser: SocialUser) => {
        console.log('map');
        return !!socialUser;
      }),
      catchError((error) => {
        console.log(error);
        return of(false);
      })
    );
  }
}
