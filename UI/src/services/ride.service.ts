import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable()
export class RideService {

    private headers = new Headers({'Content-Type': 'application/json'});
    //private userServiceUrl = 'http://172.16.9.118:9999/';  // URL to web api
     private rideServiceUrl = 'http://localhost:3000/';
    constructor(private http: Http) { }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }

    getRideList() : Promise<any> {
        return this.http
        .get(this.rideServiceUrl+"ridelist", {headers: this.headers})
        .toPromise()
        .then(res => res.json() as any)
        .catch(this.handleError);
    }

    getOfferedRideList(email : string) : Promise<any> {
        return this.http
        .get(this.rideServiceUrl+"offeredRidelist?ownerEmail="+ email, {headers: this.headers})
        .toPromise()
        .then(res => res.json() as any)
        .catch(this.handleError);
    }

    getRideById(id : number) : Promise<any> {
        return this.http
        .get(this.rideServiceUrl+"ridelist/"+id, {headers: this.headers})
        .toPromise()
        .then(res => res.json() as any)
        .catch(this.handleError);
    }

    getAvailableSeatsByRideId(id : number) : Promise<any> {
        return this.http
        //.get(this.rideServiceUrl+"getAvailableSeatsByRideId/"+id, {headers: this.headers})
        .get(this.rideServiceUrl+"ridelist/"+id, {headers: this.headers})
        .toPromise()
        .then(res => res.json() as any)
        .catch(this.handleError);
    }

    getRidersList(rideId : number) : Promise<any> {
        return this.http
        .get(this.rideServiceUrl+"riderslist?rideId="+rideId, {headers: this.headers})
        .toPromise()
        .then(res => res.json() as any)
        .catch(this.handleError);
    }
}