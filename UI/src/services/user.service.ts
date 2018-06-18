import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable()
export class UserService {

    private headers = new Headers({'Content-Type': 'application/json'});
    //private userServiceUrl = 'http://172.16.9.118:9999/';  // URL to web api
     private userServiceUrl = 'http://localhost:3000/';
    constructor(private http: Http) { }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }

    doLogin(user : any) : Promise<any> {
        // user = {
        //     "email" : "rahul@gmail.com",
        //     "password" : "12345"
        // }
        return this.http
        .get(this.userServiceUrl+"users/?email="+user.email+"&password="+user.password, {headers: this.headers})
        //.post(this.userServiceUrl+"login", user, {headers: this.headers})
        .toPromise()
        .then(res => res.json() as any)
        .catch(this.handleError);
    }

    doRegister(user : any) : Promise<any> {
        return this.http
        .post(this.userServiceUrl+"register", user, {headers: this.headers})
        .toPromise()
        .then(res => res.json() as any)
        .catch(this.handleError);
    }

    getRideList() : Promise<any> {
        return this.http
        .get(this.userServiceUrl+"ridelist", {headers: this.headers})
        .toPromise()
        .then(res => res.json() as any)
        .catch(this.handleError);
    }

    getRideById(id : number) : Promise<any> {
        return this.http
        .get(this.userServiceUrl+"ridelist/"+id, {headers: this.headers})
        .toPromise()
        .then(res => res.json() as any)
        .catch(this.handleError);
    }

    changePassword(user : any) : Promise<any> {
        return this.http
        .post(this.userServiceUrl+"changePassword", user, {headers: this.headers})
        .toPromise()
        .then(res => res.json() as any)
        .catch(this.handleError);
    }

    changeVehicle(vehicle : any) : Promise<any> {
        return this.http
        .post(this.userServiceUrl+"changeVehicle", vehicle, {headers: this.headers})
        .toPromise()
        .then(res => res.json() as any)
        .catch(this.handleError);
    }
}