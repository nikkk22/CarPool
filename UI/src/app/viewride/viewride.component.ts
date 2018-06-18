import { Component, OnInit } from '@angular/core';
import { UserService} from '../../services/user.service';
import { Router,NavigationEnd } from '@angular/router';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { MapGeoCodeService} from '../../services/map.geocode.service';

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

  constructor(private router: Router, private userService: UserService,private route: ActivatedRoute, private mapGeoCodeService : MapGeoCodeService) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.rideId = +params['id'];
   });

   this.getRideById();
   this.getCordinates();
  }

  getRideById() : void {
    this.userService.getRideById(this.rideId)
    .then(response => {
      this.ride = response;
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
}
