import { Component } from '@angular/core';
import { Router,NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  static isLogin;
  title = 'app';

  constructor(private router: Router) {
      if (sessionStorage.getItem("email") != null) {
        AppComponent.isLogin = true;
      } else {
        AppComponent.isLogin = false;
      }
  }

  doLogout() : void {
    sessionStorage.removeItem("email");
    this.router.navigate(["/login"]);
    AppComponent.isLogin = false;
  }

  getDetails() : boolean {
    return AppComponent.isLogin;
  }
}
