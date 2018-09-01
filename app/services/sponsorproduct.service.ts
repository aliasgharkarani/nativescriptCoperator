import { Injectable } from '@angular/core';
//import { Http, Headers, RequestOptions, Response } from '@angular/http';
// const cachedExtends = global.__extends;
import {HttpClient,HttpEvent, HttpHandler, HttpInterceptor, HttpRequest,HttpHeaders,HttpParams} from "@angular/common/http";
// global.__extends = cachedExtends;
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { User, Product } from '../models/index';

import { Config } from "../shared/config";



@Injectable()
export class SponsorProductService {
     apiUrl: string  = Config.apiUrl;
    
    constructor(private http: HttpClient) { }

   
    
   

    getallSponsorProducts(): Observable<any> {
        //this.apiUrl = this.apiUrl + 'student';
        // console.log(" Return Student Id 2 " + studentId);
        //let params = new HttpParams().set('_id', studentId);
        var currentUser : any = localStorage.getItem('currentUser');
        console.log("Current User 1 " + currentUser.token);
       // const headers = new HttpHeaders().set("Authorization", "JWT " + currentUser.token);

        //         let headers = new HttpHeaders();
        // headers = headers.append("Authorization", "JWT " + "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6Ijg2MDlkYzkxLTA3ZDMtNDA3NC1iMGQxLWVkNjQyZjMwYTY5ZCJ9.kpWxwNPbQvG1l3Vb8Vb6RQwCky1SqydhFPtICohyD1A");
        // headers = headers.append("Content-Type", "application/json");

        let headers = new HttpHeaders();
        headers = headers.append("Content-Type", "application/json");




        //Authorization: "JWT " + localStorage.getItem('currentUser').token
        return this.http.get<any>(this.apiUrl + 'sponsorproducts', {responseType: 'json',headers});
    } 


   

    

  
   


  

    

   

   private extractData(res: Response) {
	let body = res.json();
        return body;
    }
    private handleError (error: Response | any) {
	console.error(error.message || error);
	return Observable.throw(error.status);
    }

  

}



