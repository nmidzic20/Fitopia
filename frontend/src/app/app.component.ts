import { Component } from '@angular/core';
import { UsersService } from './shared/services/users.service';
import { IUser } from './shared/models/IUser';
import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  user: SocialUser | null = null;
  isLoggedIn = false;

  constructor(private authService: SocialAuthService, private router: Router) {}

  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.isLoggedIn = user != null;
    });
  }

  signOut(): void {
    console.log('logout');

    this.authService.signOut();
  }

  login(): void {
    console.log('login');
    this.authService.authState.subscribe((user) => {
      this.user = user;

      console.log(this.user);
      this.router.navigate(['home']);
    });
  }
}
