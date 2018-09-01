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
export class ProductService {
     apiUrl: string  = Config.apiUrl;
    
    constructor(private http: HttpClient) { }

   
    deductProduct(productId: String,quantity : String, batchNo: String,cooperId:String,cooperativeId:String,staffId: String,transAmount: String ): Observable<any> {
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
        return this.http.post<any>(this.apiUrl + 'products/deduct',JSON.stringify({productId:productId,quantity:quantity,batchId:batchNo,cooperId:cooperId,cooperativeId:cooperativeId,staffId:staffId,transAmount:transAmount}), {responseType: 'json',headers});
    } 

    
    getproduct(Id: String, userId:String): Observable<any> {
        //this.apiUrl = this.apiUrl + 'student';
        // console.log(" Return Student Id 2 " + studentId);
        //let params = new HttpParams().set('_id', studentId);
        var currentUser : any = localStorage.getItem('currentUser');
        //console.log("Current User 1 " + currentUser.token);
       // const headers = new HttpHeaders().set("Authorization", "JWT " + currentUser.token);

        //         let headers = new HttpHeaders();
        // headers = headers.append("Authorization", "JWT " + "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6Ijg2MDlkYzkxLTA3ZDMtNDA3NC1iMGQxLWVkNjQyZjMwYTY5ZCJ9.kpWxwNPbQvG1l3Vb8Vb6RQwCky1SqydhFPtICohyD1A");
        // headers = headers.append("Content-Type", "application/json");

        let headers = new HttpHeaders();
        headers = headers.append("Content-Type", "application/json");




        //Authorization: "JWT " + localStorage.getItem('currentUser').token
        return this.http.get<any>(this.apiUrl + 'products/' + Id + "/" + userId, {responseType: 'json',headers});
    } 

    getallproduct(): Observable<any> {
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
        return this.http.get<any>(this.apiUrl + 'products', {responseType: 'json',headers});
    } 


    getallproductByCategory(categoryId: String): Observable<any> {
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
        return this.http.get<any>(this.apiUrl + 'productcategory/category/' + categoryId, {responseType: 'json',headers});
    } 


    

    addproducts(product:Product): Observable<any> {


        //         let headers = new HttpHeaders();
        // headers = headers.append("Authorization", "JWT " + "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6Ijg2MDlkYzkxLTA3ZDMtNDA3NC1iMGQxLWVkNjQyZjMwYTY5ZCJ9.kpWxwNPbQvG1l3Vb8Vb6RQwCky1SqydhFPtICohyD1A");
        // headers = headers.append("Content-Type", "application/json");

        let headers = new HttpHeaders();
        headers = headers.append("Content-Type", "application/json");


        //Authorization: "JWT " + localStorage.getItem('currentUser').token
        return this.http.post<any>(this.apiUrl + 'products/',JSON.stringify({vendorId:product.vendorId,productName:product.productName,productImage:product.productImage,brand:product.brand,location:product.location,quantity:product.quantity, price:product.price}), {responseType: 'json',headers});
    } 

    updateProducts(_id: string,product:Product): Observable<any> {


        // let headers = new HttpHeaders();
        // headers = headers.append("Authorization", "JWT " + "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6Ijg2MDlkYzkxLTA3ZDMtNDA3NC1iMGQxLWVkNjQyZjMwYTY5ZCJ9.kpWxwNPbQvG1l3Vb8Vb6RQwCky1SqydhFPtICohyD1A");
        // headers = headers.append("Content-Type", "application/json");

        let headers = new HttpHeaders();
        headers = headers.append("Content-Type", "application/json");


        //Authorization: "JWT " + localStorage.getItem('currentUser').token
        return this.http.put<any>(this.apiUrl + 'products/' + _id,JSON.stringify({vendorId:product.vendorId,productName:product.productName,productImage:product.productImage,brand:product.brand,location:product.location,quantity:product.quantity, price:product.price}), {responseType: 'json',headers});
    } 

    editPhoneNumber(userId: String): Observable<any> {


        //         let headers = new HttpHeaders();
        // headers = headers.append("Authorization", "JWT " + "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6Ijg2MDlkYzkxLTA3ZDMtNDA3NC1iMGQxLWVkNjQyZjMwYTY5ZCJ9.kpWxwNPbQvG1l3Vb8Vb6RQwCky1SqydhFPtICohyD1A");
        // headers = headers.append("Content-Type", "application/json");

        let headers = new HttpHeaders();
        headers = headers.append("Content-Type", "application/json");


        //Authorization: "JWT " + localStorage.getItem('currentUser').token
        return this.http.get<any>(this.apiUrl + 'users/editphonenumber/' + userId , {responseType: 'json',headers});
    } 

    changePin(userId: String): Observable<any> {


        //         let headers = new HttpHeaders();
        // headers = headers.append("Authorization", "JWT " + "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6Ijg2MDlkYzkxLTA3ZDMtNDA3NC1iMGQxLWVkNjQyZjMwYTY5ZCJ9.kpWxwNPbQvG1l3Vb8Vb6RQwCky1SqydhFPtICohyD1A");
        // headers = headers.append("Content-Type", "application/json");

        let headers = new HttpHeaders();
        headers = headers.append("Content-Type", "application/json");


        //Authorization: "JWT " + localStorage.getItem('currentUser').token
        return this.http.get<any>(this.apiUrl + 'users/changepin/' + userId , {responseType: 'json',headers});
    } 



    searchProducts(searchValue:String, skipValue: number, limitValue: number): Observable<any> {


        //         let headers = new HttpHeaders();
        // headers = headers.append("Authorization", "JWT " + "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6Ijg2MDlkYzkxLTA3ZDMtNDA3NC1iMGQxLWVkNjQyZjMwYTY5ZCJ9.kpWxwNPbQvG1l3Vb8Vb6RQwCky1SqydhFPtICohyD1A");
        // headers = headers.append("Content-Type", "application/json");

        let headers = new HttpHeaders();
        headers = headers.append("Content-Type", "application/json");


        //Authorization: "JWT " + localStorage.getItem('currentUser').token
        return this.http.post<any>(this.apiUrl + 'products/search',JSON.stringify({searchValue:searchValue,skipValue:skipValue,limitValue:limitValue}), {responseType: 'json',headers});
    } 

    likeProducts(_id:String, productId: String,likes: Array<any>): Observable<any> {
        console.log("_id in Product service like " + _id + " Product ID "+ productId )
      
        //         let headers = new HttpHeaders();
        // headers = headers.append("Authorization", "JWT " + "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6Ijg2MDlkYzkxLTA3ZDMtNDA3NC1iMGQxLWVkNjQyZjMwYTY5ZCJ9.kpWxwNPbQvG1l3Vb8Vb6RQwCky1SqydhFPtICohyD1A");
        // headers = headers.append("Content-Type", "application/json");

        let headers = new HttpHeaders();
        headers = headers.append("Content-Type", "application/json");


        //Authorization: "JWT " + localStorage.getItem('currentUser').token
        return this.http.post<any>(this.apiUrl + 'products/like/' + _id,JSON.stringify({productId:productId,likes:likes}), {responseType: 'json',headers});
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



