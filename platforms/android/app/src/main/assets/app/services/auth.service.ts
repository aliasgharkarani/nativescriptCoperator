import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
//import { Http, Headers, RequestOptions, Response } from '@angular/http';
// const cachedExtends = global.__extends;
import {HttpClient,HttpEvent, HttpHandler, HttpInterceptor, HttpRequest,HttpHeaders,HttpParams} from "@angular/common/http";
// global.__extends = cachedExtends;
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Cooperative,VerifyAuth } from '../models/index';

import { Config } from "../shared/config";

import ( "nativescript-localstorage" );

@Injectable()
export class AuthService {
     apiUrl: string  = Config.apiUrl;
    
    constructor(private http: HttpClient,private router: Router) { }

   
    
   



        
    authenticateUser(username: string, password:string): Observable<any> {
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
        return this.http.post<any>(this.apiUrl + 'auth',JSON.stringify({username:username, password:password}), {responseType: 'json',headers});
    } 

    login(email: string, password: string){

      //  console.log("API Login" + Config.apiUrlLogin );


        return this.http.post(this.apiUrl + "auth", JSON.stringify({cooperId:email, password:password}), {
          headers: new HttpHeaders().set('Content-Type', 'application/json'),
        }).map((response: Response) => {

          
            var val = response["data"]["token"];
            // var name = response["name"];
            // var id = response["id"];
            // var userType = response["userType"];
            // var username = response["UserName"];
            // var staffRoles = response["StaffRoles"];
            // var imageStudent = response["StudentImage"];
            // var matMainNo = response["MatNo"];
            // var dept = response["DepartmentName"];
            // var studentRegNo = response["StudentRegNo"];
            // var userData = response["UserObject"]; 
      

          const token = response && val;
          
          if (token) {
             
    
           // console.log("Response from Auth new "+ JSON.stringify(response) );

             localStorage.setItem('currentUser', JSON.stringify(response["data"]["user"]));
             localStorage.setItem('currentUserToken', JSON.stringify(response["data"]["token"]));
            
             
              // return true to indicate successful login
             // return true;
          } else {
              // return false to indicate failed login
             // return false;
          }
        });
    }

    logout(): void {
        // clear token remove user from local storage to log user out
        
        localStorage.removeItem('currentUser');
        localStorage.removeItem('currentUserToken');
        
        this.router.navigate(['/login']);
    
    }
    

    forgetPassword(email: string): Observable<any> {
        {
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
            return this.http.post<any>(this.apiUrl + 'users/forgot',JSON.stringify({email:email}), {responseType: 'json',headers});
        } 
    }
    
    resetPassword(userId: String,oldPassword: String, newPassword:String,verifyPassword:String,userMode:String): Observable<any> {
        {
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
            return this.http.post<any>(this.apiUrl + 'users/resetpassword/' + userId,JSON.stringify({oldPassword:oldPassword, newPassword:newPassword,verifyPassword:verifyPassword,userMode:userMode}), {responseType: 'json',headers});
        } 
    }  
    
        
    getuserResetToken(Id: string): Observable<any> {
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
        return this.http.get<any>(this.apiUrl + 'users/token/' + Id, {responseType: 'json',headers});
    } 
    

    sendToken(userId: String): Observable<any> {
    

//         let headers = new HttpHeaders();
// headers = headers.append("Authorization", "JWT " + "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6Ijg2MDlkYzkxLTA3ZDMtNDA3NC1iMGQxLWVkNjQyZjMwYTY5ZCJ9.kpWxwNPbQvG1l3Vb8Vb6RQwCky1SqydhFPtICohyD1A");
// headers = headers.append("Content-Type", "application/json");

let headers = new HttpHeaders();
headers = headers.append("Content-Type", "application/json");

        //Authorization: "JWT " + localStorage.getItem('currentUser').token
        return this.http.get<any>(this.apiUrl + 'verifyauths/sendotp/' + userId, {responseType: 'json',headers});
    } 



    getToken(token: String,userId: String): Observable<any> {
    

        //         let headers = new HttpHeaders();
        // headers = headers.append("Authorization", "JWT " + "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6Ijg2MDlkYzkxLTA3ZDMtNDA3NC1iMGQxLWVkNjQyZjMwYTY5ZCJ9.kpWxwNPbQvG1l3Vb8Vb6RQwCky1SqydhFPtICohyD1A");
        // headers = headers.append("Content-Type", "application/json");
        
        let headers = new HttpHeaders();
        headers = headers.append("Content-Type", "application/json");
        
                //Authorization: "JWT " + localStorage.getItem('currentUser').token
                return this.http.get<any>(this.apiUrl + 'verifyauths/' + token + "/" +userId, {responseType: 'json',headers});
    } 




    checkTransPin(Id: String, pin: String): Observable<any> {
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
        return this.http.post<any>(this.apiUrl + 'users/checkpin', JSON.stringify({userId:Id,pin:pin}), {responseType: 'json',headers});
    } 


    systemconfig(): Observable<any> {
        {
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
            return this.http.get<any>(this.apiUrl + 'systemconfigurations/firstsystemconfig', {responseType: 'json',headers});
        } 
    }  

    // checkRegistration(){
    //     var dataObject = JSON.parse(localStorage.getItem('currentUser'));


    //         if(dataObject.userMode == "New")
    //         {
    //             this.router.navigate(['/changepassword']);
    //         }

    //         if(dataObject.userMode == "PhoneVerify")
    //         {
    //             this.router.navigate(['/verifyphone']);
    //         }

    //         if(dataObject.userMode == "OTPVerify")
    //         {
    //             this.router.navigate(['/otp']);
    //         }
    //         if(dataObject.userMode == "TransPin")
    //         {
    //             this.router.navigate(['/transpin']);
    //         }
    // }

    


  

    

   

   private extractData(res: Response) {
	let body = res.json();
        return body;
    }
    private handleError (error: Response | any) {
	console.error(error.message || error);
	return Observable.throw(error.status);
    }

  

}



