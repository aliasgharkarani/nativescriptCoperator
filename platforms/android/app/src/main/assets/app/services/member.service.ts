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
export class MemberService {
     apiUrl: string  = Config.apiUrl;
    
    constructor(private http: HttpClient) { }

   
    
    getAllCooperative(): Observable<any> {
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
        return this.http.get<any>(this.apiUrl + 'cooperatives', {responseType: 'json',headers});
    } 


    getCooperativeStaff(staffId: String,cooperativeId: String, mode: String, name: String, userType: String): Observable<any> {


        //         let headers = new HttpHeaders();
        // headers = headers.append("Authorization", "JWT " + "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6Ijg2MDlkYzkxLTA3ZDMtNDA3NC1iMGQxLWVkNjQyZjMwYTY5ZCJ9.kpWxwNPbQvG1l3Vb8Vb6RQwCky1SqydhFPtICohyD1A");
        // headers = headers.append("Content-Type", "application/json");

        let headers = new HttpHeaders();
        headers = headers.append("Content-Type", "application/json");


        //Authorization: "JWT " + localStorage.getItem('currentUser').token
        console.log("Name UserType" + name + " "+ userType);
        return this.http.post<any>(this.apiUrl + 'users/cooperativestaff' ,JSON.stringify({id:staffId,cooperativeId:cooperativeId,mode:mode,name:name,usertype:userType}), {responseType: 'json',headers});
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

    editProfile(userId: String, phoneNo: String, firstName: String,lastName: String,email: String,profilePixURL: String, address: Array<any> ): Observable<any> {


      
        //         let headers = new HttpHeaders();
        // headers = headers.append("Authorization", "JWT " + "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6Ijg2MDlkYzkxLTA3ZDMtNDA3NC1iMGQxLWVkNjQyZjMwYTY5ZCJ9.kpWxwNPbQvG1l3Vb8Vb6RQwCky1SqydhFPtICohyD1A");
        // headers = headers.append("Content-Type", "application/json");

        let headers = new HttpHeaders();
        headers = headers.append("Content-Type", "application/json");


        //Authorization: "JWT " + localStorage.getItem('currentUser').token
        return this.http.post<any>(this.apiUrl + 'users/editprofile/' + userId,JSON.stringify({phoneNo:phoneNo,firstName:firstName,lastName:lastName,email:email,profilePixURL:profilePixURL,address:address}) , {responseType: 'json',headers});
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

    setAccountDetails(userId: String,accountname:String,accountnumber: String, bankId: String): Observable<any> {
        console.log("User Id in service "+  userId);

        //         let headers = new HttpHeaders();
        // headers = headers.append("Authorization", "JWT " + "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6Ijg2MDlkYzkxLTA3ZDMtNDA3NC1iMGQxLWVkNjQyZjMwYTY5ZCJ9.kpWxwNPbQvG1l3Vb8Vb6RQwCky1SqydhFPtICohyD1A");
        // headers = headers.append("Content-Type", "application/json");

        let headers = new HttpHeaders();
        headers = headers.append("Content-Type", "application/json");


        //Authorization: "JWT " + localStorage.getItem('currentUser').token
        return this.http.post<any>(this.apiUrl + 'users/setaccountdetails/' + userId ,JSON.stringify({accountnumber:accountnumber,accountname:accountname, bankId:bankId}), {responseType: 'json',headers});
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



