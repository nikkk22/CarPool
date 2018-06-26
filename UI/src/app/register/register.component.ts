import { Component, OnInit } from '@angular/core';
import { UserService} from '../../services/user.service';
import { Router,NavigationEnd } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  user : any = {};
  rForm : FormGroup;
  isLoading : boolean = false;
  constructor(private router: Router, private userService: UserService,private formBuilder: FormBuilder) { }

  ngOnInit() {
    if (sessionStorage.getItem('email') != null) {
      this.router.navigate(["/dashboard"]);
    }
    this.validate();
  }

  doRegister() : void {
    this.isLoading = true;
    this.userService.doRegister(this.user)
    .then(response => {
     // if (response)
     console.log(response);
      this.isLoading = false;
      this.router.navigate(["\login"]);
    });
  }

  validate() {
    this.rForm = this.formBuilder.group({
        'email': [null, Validators.compose([Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,6}$')])],
        'password': [null, Validators.required],
        'name': [null, Validators.compose([Validators.required])],
        'phone': [null, Validators.compose([Validators.required])],
        'vehicle': [null],
        'gender': [null, Validators.required],
        'vehicleNo' : [null, Validators.required]
      });
  }
}
