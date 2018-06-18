import { Component, OnInit } from '@angular/core';
import { UserService} from '../../services/user.service';
import { Router,NavigationEnd } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { empty } from 'rxjs/observable/empty';
import { Session } from 'protractor';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user : any = {};
  rForm : FormGroup;

  constructor(private router: Router, private userService: UserService,private formBuilder: FormBuilder) {

   }

  ngOnInit() {
    if (sessionStorage.getItem("email") != null) {
      this.router.navigate(["/dashboard"]);
    }

    this.validate();
  }

  doLogin() : void {
    console.log(this.user);
    this.userService.doLogin(this.user)
    .then(response => {
      if (response != "") {
        AppComponent.isLogin = true;
        sessionStorage.setItem("email",JSON.stringify(response[0].email).toString());
        this.router.navigate(['/dashboard']);
        //location.reload();
      }
    });
  }

  validate() {
    this.rForm = this.formBuilder.group({
        'email': [null, Validators.compose([Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,6}$')])],
        'password': [null, Validators.required]
      });
  }
  
}
