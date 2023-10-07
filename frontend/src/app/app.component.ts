import { Component } from '@angular/core';
import { UsersService } from './shared/services/users.service';
import { IUser } from './shared/models/IUser';
import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  user: SocialUser | null = null;
  isLoggedIn = false;

  constructor(private authService: SocialAuthService) {}

  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.isLoggedIn = user != null;
    });
  }

  signOut(): void {
    this.authService.signOut();
  }
}
