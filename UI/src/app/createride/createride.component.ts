import { Component, OnInit } from '@angular/core';
import { Router,NavigationEnd } from '@angular/router';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { RideService} from '../../services/ride.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-createride',
  templateUrl: './createride.component.html',
  styleUrls: ['./createride.component.scss']
})
export class CreaterideComponent implements OnInit {
   rForm : FormGroup;
   ride : any = {};
   userSettings = {showSearchButton:false}
   CurrentDate : number = Date.now();


  constructor(private router: Router, private route: ActivatedRoute, private rideService: RideService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    if (sessionStorage.getItem('email') == null) {
      this.router.navigate(["/login"]);
    }
    this.validate();
  }

  autoCompleteCallback1(selectedData:any) {
    console.log(selectedData); // it give the obect .... same as getCordinates method
  }

  validate() {
    this.rForm = this.formBuilder.group({
        'password': [null, Validators.required],
      });
    }
}
