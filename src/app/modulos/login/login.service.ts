import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
//import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';


declare var CognosApi : any;

//irá conter todas as chamadas para a api do Cognos Dashboard
@Injectable()
export class LogimnService {
    constructor(private http : HttpClient){}
    

    RequestNewSession(credentials) : Observable<any>{
        return this.http
        .post(
            "http://localhost:51053/api/session",
            credentials,
            {
                headers: new HttpHeaders()
                .set('Accept', 'application/json')
                .set('Content-Type', 'application/json')
            }
        );
    }
}