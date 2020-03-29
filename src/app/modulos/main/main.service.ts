import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
//import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class MainService {
	constructor(private http : HttpClient){}
}
