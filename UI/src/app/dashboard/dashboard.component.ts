import { Component, OnInit } from '@angular/core';
import { UserService} from '../../services/user.service';
import { Router,NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{

  public lat: Number = 24.799448;
  public lng: Number = 120.979021;
  public zoom: Number = 14;
  rideList : any[] ;
  public dir = undefined;
  order: string = 'time';
  reverse: boolean = false;
  surveyFilter: any = {surveyName : '', id : ''};
  showOrderIcon : boolean = false;

  constructor(private router: Router, private userService: UserService) { }
  
  ngOnInit() {
    if (sessionStorage.getItem("email") == null) {
      this.router.navigate(["/login"]);
    }
    this.getRideList();
  }

  
  getDirection() {
    this.dir = {
      origin: { lat: 24.799448, lng: 120.979021 },
      destination: { lat: 24.799524, lng: 120.975017 }
    }
  }

  getRideList() : void {
    this.userService.getRideList()
    .then(response => {
      this.rideList = response;
    });
  }

  setOrder(value: string) {
    if (this.order === value) {
      this.reverse = !this.reverse;
    }

    this.order = value;
  }
}
