import { Component, OnInit } from '@angular/core';
import { UserService} from '../../services/user.service';
import { Router,NavigationEnd } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  user : any = {};
  vehicle : any = {};
  passwordForm : FormGroup;
  vehicleForm : FormGroup;
  constructor(private router: Router, private userService: UserService,private formBuilder: FormBuilder) { }

  ngOnInit() {
    if (sessionStorage.getItem('email') == null) {
      this.router.navigate(["/login"]);
    }
    this.validate();
  }

  
  changePassword() : void {
    var changePasswordDetailsJSON = {
      "email" : sessionStorage.getItem("email"),
      "password" : this.user.password,
      "cpassword" : this.user.cpassword
    }

    this.userService.changePassword(changePasswordDetailsJSON)
    .then(response => {
      console.log(response);
    });
  }

  changeVehicle() : void {
    var changeVehicleDetailsJSON = {
      "email" : sessionStorage.getItem("email"),
      "vehicle" : this.vehicle.vehicle,
      "vehicleNo" : this.vehicle.vehicleNo
    }
    
    this.userService.changeVehicle(changeVehicleDetailsJSON)
    .then(response => {
      console.log(response);
    });
  }

  validate() {
    this.passwordForm = this.formBuilder.group({
        'password': [null, Validators.required],
        'cpassword': [null, Validators.required],
      });

    this.vehicleForm = this.formBuilder.group({
      'vehicleNo' : [null, Validators.required],
      'vehicle' : [null, Validators.required]
    })
  }
}
