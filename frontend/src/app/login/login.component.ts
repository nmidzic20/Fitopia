import { Component, OnInit } from '@angular/core';
import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  user: SocialUser | null = null;
  loggedIn: boolean = false;

  constructor(private authService: SocialAuthService, private router: Router) {}

  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = user != null;
      console.log(this.user);
      this.router.navigate(['home']);
    });
  }

  onLoginClick(): void {
    // Navigate to the 'home' route
    this.router.navigate(['/home']);
    this.user = {
      id: '123',
      email: '',
      name: '',
      photoUrl: '',
      firstName: '',
      lastName: '',
      authToken: '',
      idToken: '',
      provider: '',
      authorizationCode: '',
      response: '',
    };
    this.loggedIn = true;
  }
}
