import { Component, OnInit } from '@angular/core';
import { UserService} from '../../services/user.service';
import { Router,NavigationEnd } from '@angular/router';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { MapGeoCodeService} from '../../services/map.geocode.service';
import { RideService} from '../../services/ride.service';
import 'rxjs/add/observable/interval';
import {Observable} from 'rxjs/Rx';

@Component({
  selector: 'app-viewride',
  templateUrl: './viewride.component.html',
  styleUrls: ['./viewride.component.scss']
})
export class ViewrideComponent implements OnInit {

  public lat: Number = 24.799448;
  public lng: Number = 120.979021;
  public zoom: Number = 14;
  sub : any;
  rideId : number;
  ride : any = null;
  public dir : any = undefined;
  noOfSeatsAvailable : number;
  isSeatAvailable : boolean = false;
  sub2 : any;
  isLoading : boolean = false;
  userEmail : string = sessionStorage.getItem("email");
  rideOwnerEmail : string;
  ridersList : any[];

  constructor(private router: Router, private userService: UserService,private route: ActivatedRoute, private mapGeoCodeService : MapGeoCodeService,private rideService: RideService) { 
    
    this.sub2 = Observable.interval(3000)
    .subscribe((val) => { this.seatAvailable() })
    
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.rideId = +params['id'];
   });

   this.seatAvailable();
   this.getRideById();
   this.getCordinates();
   this.getRidersList();
  }

  getRideById() : void {
    this.rideService.getRideById(this.rideId)
    .then(response => {
      this.ride = response;
      this.rideOwnerEmail = JSON.stringify(this.ride.ownerEmail);
      this.dir = {
        origin: { lat: this.ride.sourceCordinateX, lng: this.ride.sourceCordinateY },
        destination: { lat: this.ride.destCordinateX, lng: this.ride.destCordinateY}
      }
    });
  }

  getCordinates() : void {
    this.mapGeoCodeService.getCordinates("Metacube")
    .then(response => {
      console.log(response);
    });
  }

  autoCompleteCallback1(selectedData:any) {
      console.log(selectedData); // it give the obect .... same as getCordinates method
  }

  seatAvailable() : void {
    this.rideService.getAvailableSeatsByRideId(this.rideId)
      .then(response => {
        this.noOfSeatsAvailable =  response.Seats;
        if (this.noOfSeatsAvailable > 0) { this.isSeatAvailable = true } else { this.isSeatAvailable = false }
      });
  }

  bookRide() : void {
    this.isLoading = true;
  }

  getRidersList() : void {
    this.rideService.getRidersList(this.rideId)
      .then(response => {
        this.ridersList =  response;
      });
  }
}
