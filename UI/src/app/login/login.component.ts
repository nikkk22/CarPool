import { Component, OnInit } from '@angular/core';
import { UserService} from '../../services/user.service';
import { Router,NavigationEnd } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user : any = {};
  rForm : FormGroup;

  constructor(private router: Router, private userService: UserService,private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.validate();
  }

  doLogin() : void {
    console.log(this.user);
    this.userService.doLogin(this.user)
    .then(response => {
      console.log(response);
    });
  }

  validate() {
    this.rForm = this.formBuilder.group({
        'email': [null, Validators.compose([Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,6}$')])],
        'password': [null, Validators.required]
      });
  }
}
