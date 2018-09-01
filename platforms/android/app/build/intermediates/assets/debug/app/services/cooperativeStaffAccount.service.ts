import { Injectable } from '@angular/core';
//import { Http, Headers, RequestOptions, Response } from '@angular/http';
// const cachedExtends = global.__extends;
import {HttpClient,HttpEvent, HttpHandler, HttpInterceptor, HttpRequest,HttpHeaders,HttpParams} from "@angular/common/http";
// global.__extends = cachedExtends;
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Cooperative,VerifyAuth,CooperativeStaff } from '../models/index';

import { Config } from "../shared/config";



@Injectable()
export class CooperativeStaffAccountService {
     apiUrl: string  = Config.apiUrl;
    
    constructor(private http: HttpClient) { }


    deductCooperativeAccount(cooperativeId: String,staffId : String,amount: String, accountType: String): Observable<any> {
        //this.apiUrl = this.apiUrl + 'student';
        // console.log(" Return Student Id 2 " + studentId);
        //let params = new HttpParams().set('_id', studentId);
        // var currentUser : any = localStorage.getItem('currentUser');
        // console.log("Current User 1 " + currentUser.token);
       // const headers = new HttpHeaders().set("Authorization", "JWT " + currentUser.token);

//         let headers = new HttpHeaders();
// headers = headers.append("Authorization", "JWT " + "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6Ijg2MDlkYzkxLTA3ZDMtNDA3NC1iMGQxLWVkNjQyZjMwYTY5ZCJ9.kpWxwNPbQvG1l3Vb8Vb6RQwCky1SqydhFPtICohyD1A");
// headers = headers.append("Content-Type", "application/json");

let headers = new HttpHeaders();
headers = headers.append("Content-Type", "application/json");



        //Authorization: "JWT " + localStorage.getItem('currentUser').token
        return this.http.post<any>(this.apiUrl + 'cooperativeStaffAccounts/deduct',JSON.stringify({cooperativeId:cooperativeId,staffId:staffId, amount: amount, accountType: accountType}), {responseType: 'json',headers});
    } 


   
    
    getCooperativeStaff(staffId: String,cooperativeId: String): Observable<any> {
        //this.apiUrl = this.apiUrl + 'student';
        // console.log(" Return Student Id 2 " + studentId);
        //let params = new HttpParams().set('_id', studentId);
        // var currentUser : any = localStorage.getItem('currentUser');
        // console.log("Current User 1 " + currentUser.token);
       // const headers = new HttpHeaders().set("Authorization", "JWT " + currentUser.token);

//         let headers = new HttpHeaders();
// headers = headers.append("Authorization", "JWT " + "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6Ijg2MDlkYzkxLTA3ZDMtNDA3NC1iMGQxLWVkNjQyZjMwYTY5ZCJ9.kpWxwNPbQvG1l3Vb8Vb6RQwCky1SqydhFPtICohyD1A");
// headers = headers.append("Content-Type", "application/json");

let headers = new HttpHeaders();
headers = headers.append("Content-Type", "application/json");




        //Authorization: "JWT " + localStorage.getItem('currentUser').token
        return this.http.get<any>(this.apiUrl + 'cooperativestaffs/' + staffId + "/"+ cooperativeId, {responseType: 'json',headers});
    } 



        
    verifyAuthToCreatLater(verifyAuth: CooperativeStaff): Observable<any> {
        //this.apiUrl = this.apiUrl + 'student';
        // console.log(" Return Student Id 2 " + studentId);
        //let params = new HttpParams().set('_id', studentId);
        // var currentUser : any = localStorage.getItem('currentUser');
        // console.log("Current User 1 " + currentUser.token);
       // const headers = new HttpHeaders().set("Authorization", "JWT " + currentUser.token);

//         let headers = new HttpHeaders();
// headers = headers.append("Authorization", "JWT " + "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6Ijg2MDlkYzkxLTA3ZDMtNDA3NC1iMGQxLWVkNjQyZjMwYTY5ZCJ9.kpWxwNPbQvG1l3Vb8Vb6RQwCky1SqydhFPtICohyD1A");
// headers = headers.append("Content-Type", "application/json");

let headers = new HttpHeaders();
headers = headers.append("Content-Type", "application/json");



        //Authorization: "JWT " + localStorage.getItem('currentUser').token
        return this.http.post<any>(this.apiUrl + 'verifyauths',JSON.stringify({staffId:verifyAuth.staffId, cooperativeId:verifyAuth.cooperativeId,email: verifyAuth.email, phoneNumber: verifyAuth.phone, lastName:verifyAuth.name,firstName:verifyAuth.name,authType:"New"}), {responseType: 'json',headers});
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



