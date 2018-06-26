import { Component, OnInit } from '@angular/core';
import { Router,NavigationEnd } from '@angular/router';
import { RideService} from '../../services/ride.service';

@Component({
  selector: 'app-offered-rides',
  templateUrl: './offered-rides.component.html',
  styleUrls: ['./offered-rides.component.scss']
})
export class OfferedRidesComponent implements OnInit {
  offeredRideList : any[] ;
  order: string = 'time';
  reverse: boolean = false;
  surveyFilter: any = {surveyName : '', id : ''};
  showOrderIcon : boolean = false;

  constructor(private router: Router, private rideService: RideService) { }

  ngOnInit() {
    if (sessionStorage.getItem("email") == null) {
      this.router.navigate(["/login"]);
    }
    this.getOfferedRideList();
  }

  getOfferedRideList() : void {
    this.rideService.getOfferedRideList(sessionStorage.getItem("email").replace('\"',"").replace('\"',""))
    .then(response => {
      this.offeredRideList = response;
    });
  }

  setOrder(value: string) {
    if (this.order === value) {
      this.reverse = !this.reverse;
    }

    this.order = value;
  }
}
