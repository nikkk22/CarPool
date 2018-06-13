import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable()
export class UserService {

    private headers = new Headers({'Content-Type': 'application/json'});
    private userServiceUrl = 'https://reqres.in/api/';  // URL to web api
    constructor(private http: Http) { }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }

    doLogin(user : any) : Promise<any> {
        
        return this.http
        .post(this.userServiceUrl+"login", user, {headers: this.headers})
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
}