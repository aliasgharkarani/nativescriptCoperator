import { Injectable } from '@angular/core';
//import { Http, Headers, RequestOptions, Response } from '@angular/http';
// const cachedExtends = global.__extends;
import {HttpClient,HttpEvent, HttpHandler, HttpInterceptor, HttpRequest,HttpHeaders,HttpParams} from "@angular/common/http";
// global.__extends = cachedExtends;
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Cooperative } from '../models/index';

import { Config } from "../shared/config";



@Injectable()
export class CooperCooperativeService {
     apiUrl: string  = Config.apiUrl;
    
    constructor(private http: HttpClient) { }

   
    
    addCooperCooperative(cooperativeId: String,staffId:String,cooperId: String ): Observable<any> {
       

//         let headers = new HttpHeaders();
// headers = headers.append("Authorization", "JWT " + "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6Ijg2MDlkYzkxLTA3ZDMtNDA3NC1iMGQxLWVkNjQyZjMwYTY5ZCJ9.kpWxwNPbQvG1l3Vb8Vb6RQwCky1SqydhFPtICohyD1A");
// headers = headers.append("Content-Type", "application/json");

let headers = new HttpHeaders();
headers = headers.append("Content-Type", "application/json");




        //Authorization: "JWT " + localStorage.getItem('currentUser').token
        return this.http.post<any>(this.apiUrl + 'coopercooperative',JSON.stringify({cooperativeId:cooperativeId,staffId:staffId,cooperId:cooperId}), {responseType: 'json',headers});
    } 

    getCooperCooporatorBalances(cooperId: String): Observable<any> {


        //         let headers = new HttpHeaders();
        // headers = headers.append("Authorization", "JWT " + "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6Ijg2MDlkYzkxLTA3ZDMtNDA3NC1iMGQxLWVkNjQyZjMwYTY5ZCJ9.kpWxwNPbQvG1l3Vb8Vb6RQwCky1SqydhFPtICohyD1A");
        // headers = headers.append("Content-Type", "application/json");

        let headers = new HttpHeaders();
        headers = headers.append("Content-Type", "application/json");


        //Authorization: "JWT " + localStorage.getItem('currentUser').token
        return this.http.get<any>(this.apiUrl + 'coopercooperative/' + cooperId, {responseType: 'json',headers});
    } 

    getAllCooperativesCooper(cooperId: String): Observable<any> {


        //         let headers = new HttpHeaders();
        // headers = headers.append("Authorization", "JWT " + "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6Ijg2MDlkYzkxLTA3ZDMtNDA3NC1iMGQxLWVkNjQyZjMwYTY5ZCJ9.kpWxwNPbQvG1l3Vb8Vb6RQwCky1SqydhFPtICohyD1A");
        // headers = headers.append("Content-Type", "application/json");

        let headers = new HttpHeaders();
        headers = headers.append("Content-Type", "application/json");


        //Authorization: "JWT " + localStorage.getItem('currentUser').token
        return this.http.get<any>(this.apiUrl + 'coopercooperative/allcooperatives/' + cooperId, {responseType: 'json',headers});
    } 



    getCooperativeStaff(staffId: String,cooperativeId: String, mode: String): Observable<any> {


        //         let headers = new HttpHeaders();
        // headers = headers.append("Authorization", "JWT " + "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6Ijg2MDlkYzkxLTA3ZDMtNDA3NC1iMGQxLWVkNjQyZjMwYTY5ZCJ9.kpWxwNPbQvG1l3Vb8Vb6RQwCky1SqydhFPtICohyD1A");
        // headers = headers.append("Content-Type", "application/json");

        let headers = new HttpHeaders();
        headers = headers.append("Content-Type", "application/json");


        //Authorization: "JWT " + localStorage.getItem('currentUser').token
        return this.http.get<any>(this.apiUrl + 'users/cooperativestaff/' + staffId + "/"+ cooperativeId + "/"+ mode, {responseType: 'json',headers});
    } 

    editPhoneNumber(userId: String, phoneNo: String): Observable<any> {


        //         let headers = new HttpHeaders();
        // headers = headers.append("Authorization", "JWT " + "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6Ijg2MDlkYzkxLTA3ZDMtNDA3NC1iMGQxLWVkNjQyZjMwYTY5ZCJ9.kpWxwNPbQvG1l3Vb8Vb6RQwCky1SqydhFPtICohyD1A");
        // headers = headers.append("Content-Type", "application/json");

        let headers = new HttpHeaders();
        headers = headers.append("Content-Type", "application/json");


        //Authorization: "JWT " + localStorage.getItem('currentUser').token
        return this.http.post<any>(this.apiUrl + 'users/editphonenumber/' + userId,JSON.stringify({phoneNo:phoneNo}) , {responseType: 'json',headers});
    } 

    changePin(userId: String,pin:String,confirmpin: String): Observable<any> {
        console.log("User Id in service "+  userId);

        //         let headers = new HttpHeaders();
        // headers = headers.append("Authorization", "JWT " + "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6Ijg2MDlkYzkxLTA3ZDMtNDA3NC1iMGQxLWVkNjQyZjMwYTY5ZCJ9.kpWxwNPbQvG1l3Vb8Vb6RQwCky1SqydhFPtICohyD1A");
        // headers = headers.append("Content-Type", "application/json");

        let headers = new HttpHeaders();
        headers = headers.append("Content-Type", "application/json");


        //Authorization: "JWT " + localStorage.getItem('currentUser').token
        return this.http.post<any>(this.apiUrl + 'users/changepin/' + userId ,JSON.stringify({pin:pin,confirmpin:confirmpin}), {responseType: 'json',headers});
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



