import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';


@Injectable()
export class MapGeoCodeService {

    private headers = new Headers();
    private contentType = "{'Content-Type': 'application/json'}";
    private api_key = "AIzaSyD-vPzHf3NIhZw6AiPZHPm9ysRxueryaSc";
    private mapGeoCodingServiceUrl1 = 'https://maps.googleapis.com/maps/api/geocode/json?address=';
    private mapGeoCodingServiceUrl2 = '&key='+ this.api_key;
    constructor(private http: Http) { }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }

    getCordinates(location : string) {
        return this.http
        .get(this.mapGeoCodingServiceUrl1+location+this.mapGeoCodingServiceUrl2, {headers: this.headers})
        .toPromise()
        .then(res => res.json() as any)
        .catch(this.handleError);
    }
}
