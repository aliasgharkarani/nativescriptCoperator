"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
//import { Http, Headers, RequestOptions, Response } from '@angular/http';
// const cachedExtends = global.__extends;
var http_1 = require("@angular/common/http");
// global.__extends = cachedExtends;
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/operator/map");
var config_1 = require("../shared/config");
var ProductService = /** @class */ (function () {
    function ProductService(http) {
        this.http = http;
        this.apiUrl = config_1.Config.apiUrl;
    }
    ProductService.prototype.deductProduct = function (productId, quantity, batchNo, cooperId, cooperativeId, staffId, transAmount) {
        //this.apiUrl = this.apiUrl + 'student';
        // console.log(" Return Student Id 2 " + studentId);
        //let params = new HttpParams().set('_id', studentId);
        // var currentUser : any = localStorage.getItem('currentUser');
        // console.log("Current User 1 " + currentUser.token);
        // const headers = new HttpHeaders().set("Authorization", "JWT " + currentUser.token);
        //         let headers = new HttpHeaders();
        // headers = headers.append("Authorization", "JWT " + "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6Ijg2MDlkYzkxLTA3ZDMtNDA3NC1iMGQxLWVkNjQyZjMwYTY5ZCJ9.kpWxwNPbQvG1l3Vb8Vb6RQwCky1SqydhFPtICohyD1A");
        // headers = headers.append("Content-Type", "application/json");
        var headers = new http_1.HttpHeaders();
        headers = headers.append("Content-Type", "application/json");
        //Authorization: "JWT " + localStorage.getItem('currentUser').token
        return this.http.post(this.apiUrl + 'products/deduct', JSON.stringify({ productId: productId, quantity: quantity, batchId: batchNo, cooperId: cooperId, cooperativeId: cooperativeId, staffId: staffId, transAmount: transAmount }), { responseType: 'json', headers: headers });
    };
    ProductService.prototype.getproduct = function (Id, userId) {
        //this.apiUrl = this.apiUrl + 'student';
        // console.log(" Return Student Id 2 " + studentId);
        //let params = new HttpParams().set('_id', studentId);
        var currentUser = localStorage.getItem('currentUser');
        //console.log("Current User 1 " + currentUser.token);
        // const headers = new HttpHeaders().set("Authorization", "JWT " + currentUser.token);
        //         let headers = new HttpHeaders();
        // headers = headers.append("Authorization", "JWT " + "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6Ijg2MDlkYzkxLTA3ZDMtNDA3NC1iMGQxLWVkNjQyZjMwYTY5ZCJ9.kpWxwNPbQvG1l3Vb8Vb6RQwCky1SqydhFPtICohyD1A");
        // headers = headers.append("Content-Type", "application/json");
        var headers = new http_1.HttpHeaders();
        headers = headers.append("Content-Type", "application/json");
        //Authorization: "JWT " + localStorage.getItem('currentUser').token
        return this.http.get(this.apiUrl + 'products/' + Id + "/" + userId, { responseType: 'json', headers: headers });
    };
    ProductService.prototype.getallproduct = function () {
        //this.apiUrl = this.apiUrl + 'student';
        // console.log(" Return Student Id 2 " + studentId);
        //let params = new HttpParams().set('_id', studentId);
        var currentUser = localStorage.getItem('currentUser');
        console.log("Current User 1 " + currentUser.token);
        // const headers = new HttpHeaders().set("Authorization", "JWT " + currentUser.token);
        //         let headers = new HttpHeaders();
        // headers = headers.append("Authorization", "JWT " + "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6Ijg2MDlkYzkxLTA3ZDMtNDA3NC1iMGQxLWVkNjQyZjMwYTY5ZCJ9.kpWxwNPbQvG1l3Vb8Vb6RQwCky1SqydhFPtICohyD1A");
        // headers = headers.append("Content-Type", "application/json");
        var headers = new http_1.HttpHeaders();
        headers = headers.append("Content-Type", "application/json");
        //Authorization: "JWT " + localStorage.getItem('currentUser').token
        return this.http.get(this.apiUrl + 'products', { responseType: 'json', headers: headers });
    };
    ProductService.prototype.getallproductByCategory = function (categoryId) {
        //this.apiUrl = this.apiUrl + 'student';
        // console.log(" Return Student Id 2 " + studentId);
        //let params = new HttpParams().set('_id', studentId);
        var currentUser = localStorage.getItem('currentUser');
        console.log("Current User 1 " + currentUser.token);
        // const headers = new HttpHeaders().set("Authorization", "JWT " + currentUser.token);
        //         let headers = new HttpHeaders();
        // headers = headers.append("Authorization", "JWT " + "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6Ijg2MDlkYzkxLTA3ZDMtNDA3NC1iMGQxLWVkNjQyZjMwYTY5ZCJ9.kpWxwNPbQvG1l3Vb8Vb6RQwCky1SqydhFPtICohyD1A");
        // headers = headers.append("Content-Type", "application/json");
        var headers = new http_1.HttpHeaders();
        headers = headers.append("Content-Type", "application/json");
        //Authorization: "JWT " + localStorage.getItem('currentUser').token
        return this.http.get(this.apiUrl + 'productcategory/category/' + categoryId, { responseType: 'json', headers: headers });
    };
    ProductService.prototype.addproducts = function (product) {
        //         let headers = new HttpHeaders();
        // headers = headers.append("Authorization", "JWT " + "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6Ijg2MDlkYzkxLTA3ZDMtNDA3NC1iMGQxLWVkNjQyZjMwYTY5ZCJ9.kpWxwNPbQvG1l3Vb8Vb6RQwCky1SqydhFPtICohyD1A");
        // headers = headers.append("Content-Type", "application/json");
        var headers = new http_1.HttpHeaders();
        headers = headers.append("Content-Type", "application/json");
        //Authorization: "JWT " + localStorage.getItem('currentUser').token
        return this.http.post(this.apiUrl + 'products/', JSON.stringify({ vendorId: product.vendorId, productName: product.productName, productImage: product.productImage, brand: product.brand, location: product.location, quantity: product.quantity, price: product.price }), { responseType: 'json', headers: headers });
    };
    ProductService.prototype.updateProducts = function (_id, product) {
        // let headers = new HttpHeaders();
        // headers = headers.append("Authorization", "JWT " + "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6Ijg2MDlkYzkxLTA3ZDMtNDA3NC1iMGQxLWVkNjQyZjMwYTY5ZCJ9.kpWxwNPbQvG1l3Vb8Vb6RQwCky1SqydhFPtICohyD1A");
        // headers = headers.append("Content-Type", "application/json");
        var headers = new http_1.HttpHeaders();
        headers = headers.append("Content-Type", "application/json");
        //Authorization: "JWT " + localStorage.getItem('currentUser').token
        return this.http.put(this.apiUrl + 'products/' + _id, JSON.stringify({ vendorId: product.vendorId, productName: product.productName, productImage: product.productImage, brand: product.brand, location: product.location, quantity: product.quantity, price: product.price }), { responseType: 'json', headers: headers });
    };
    ProductService.prototype.editPhoneNumber = function (userId) {
        //         let headers = new HttpHeaders();
        // headers = headers.append("Authorization", "JWT " + "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6Ijg2MDlkYzkxLTA3ZDMtNDA3NC1iMGQxLWVkNjQyZjMwYTY5ZCJ9.kpWxwNPbQvG1l3Vb8Vb6RQwCky1SqydhFPtICohyD1A");
        // headers = headers.append("Content-Type", "application/json");
        var headers = new http_1.HttpHeaders();
        headers = headers.append("Content-Type", "application/json");
        //Authorization: "JWT " + localStorage.getItem('currentUser').token
        return this.http.get(this.apiUrl + 'users/editphonenumber/' + userId, { responseType: 'json', headers: headers });
    };
    ProductService.prototype.changePin = function (userId) {
        //         let headers = new HttpHeaders();
        // headers = headers.append("Authorization", "JWT " + "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6Ijg2MDlkYzkxLTA3ZDMtNDA3NC1iMGQxLWVkNjQyZjMwYTY5ZCJ9.kpWxwNPbQvG1l3Vb8Vb6RQwCky1SqydhFPtICohyD1A");
        // headers = headers.append("Content-Type", "application/json");
        var headers = new http_1.HttpHeaders();
        headers = headers.append("Content-Type", "application/json");
        //Authorization: "JWT " + localStorage.getItem('currentUser').token
        return this.http.get(this.apiUrl + 'users/changepin/' + userId, { responseType: 'json', headers: headers });
    };
    ProductService.prototype.searchProducts = function (searchValue, skipValue, limitValue) {
        //         let headers = new HttpHeaders();
        // headers = headers.append("Authorization", "JWT " + "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6Ijg2MDlkYzkxLTA3ZDMtNDA3NC1iMGQxLWVkNjQyZjMwYTY5ZCJ9.kpWxwNPbQvG1l3Vb8Vb6RQwCky1SqydhFPtICohyD1A");
        // headers = headers.append("Content-Type", "application/json");
        var headers = new http_1.HttpHeaders();
        headers = headers.append("Content-Type", "application/json");
        //Authorization: "JWT " + localStorage.getItem('currentUser').token
        return this.http.post(this.apiUrl + 'products/search', JSON.stringify({ searchValue: searchValue, skipValue: skipValue, limitValue: limitValue }), { responseType: 'json', headers: headers });
    };
    ProductService.prototype.likeProducts = function (_id, productId, likes) {
        console.log("_id in Product service like " + _id + " Product ID " + productId);
        //         let headers = new HttpHeaders();
        // headers = headers.append("Authorization", "JWT " + "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6Ijg2MDlkYzkxLTA3ZDMtNDA3NC1iMGQxLWVkNjQyZjMwYTY5ZCJ9.kpWxwNPbQvG1l3Vb8Vb6RQwCky1SqydhFPtICohyD1A");
        // headers = headers.append("Content-Type", "application/json");
        var headers = new http_1.HttpHeaders();
        headers = headers.append("Content-Type", "application/json");
        //Authorization: "JWT " + localStorage.getItem('currentUser').token
        return this.http.post(this.apiUrl + 'products/like/' + _id, JSON.stringify({ productId: productId, likes: likes }), { responseType: 'json', headers: headers });
    };
    ProductService.prototype.extractData = function (res) {
        var body = res.json();
        return body;
    };
    ProductService.prototype.handleError = function (error) {
        console.error(error.message || error);
        return Observable_1.Observable.throw(error.status);
    };
    ProductService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], ProductService);
    return ProductService;
}());
exports.ProductService = ProductService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZHVjdC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicHJvZHVjdC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTJDO0FBQzNDLDBFQUEwRTtBQUMxRSwwQ0FBMEM7QUFDMUMsNkNBQTRIO0FBQzVILG9DQUFvQztBQUNwQyw4Q0FBNkM7QUFDN0MsaUNBQStCO0FBSS9CLDJDQUEwQztBQUsxQztJQUdJLHdCQUFvQixJQUFnQjtRQUFoQixTQUFJLEdBQUosSUFBSSxDQUFZO1FBRm5DLFdBQU0sR0FBWSxlQUFNLENBQUMsTUFBTSxDQUFDO0lBRU8sQ0FBQztJQUd6QyxzQ0FBYSxHQUFiLFVBQWMsU0FBaUIsRUFBQyxRQUFpQixFQUFFLE9BQWUsRUFBQyxRQUFlLEVBQUMsYUFBb0IsRUFBQyxPQUFlLEVBQUMsV0FBbUI7UUFDdkksd0NBQXdDO1FBQ3hDLG9EQUFvRDtRQUNwRCxzREFBc0Q7UUFDdEQsK0RBQStEO1FBQy9ELHNEQUFzRDtRQUN2RCxzRkFBc0Y7UUFFN0YsMkNBQTJDO1FBQzNDLHVNQUF1TTtRQUN2TSxnRUFBZ0U7UUFFaEUsSUFBSSxPQUFPLEdBQUcsSUFBSSxrQkFBVyxFQUFFLENBQUM7UUFDaEMsT0FBTyxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsY0FBYyxFQUFFLGtCQUFrQixDQUFDLENBQUM7UUFJckQsbUVBQW1FO1FBQ25FLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBTSxJQUFJLENBQUMsTUFBTSxHQUFHLGlCQUFpQixFQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBQyxTQUFTLEVBQUMsU0FBUyxFQUFDLFFBQVEsRUFBQyxRQUFRLEVBQUMsT0FBTyxFQUFDLE9BQU8sRUFBQyxRQUFRLEVBQUMsUUFBUSxFQUFDLGFBQWEsRUFBQyxhQUFhLEVBQUMsT0FBTyxFQUFDLE9BQU8sRUFBQyxXQUFXLEVBQUMsV0FBVyxFQUFDLENBQUMsRUFBRSxFQUFDLFlB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LENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNuQyxDQUFDO0lBOU1RLGNBQWM7UUFEMUIsaUJBQVUsRUFBRTt5Q0FJaUIsaUJBQVU7T0FIM0IsY0FBYyxDQWtOMUI7SUFBRCxxQkFBQztDQUFBLEFBbE5ELElBa05DO0FBbE5ZLHdDQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG4vL2ltcG9ydCB7IEh0dHAsIEhlYWRlcnMsIFJlcXVlc3RPcHRpb25zLCBSZXNwb25zZSB9IGZyb20gJ0Bhbmd1bGFyL2h0dHAnO1xyXG4vLyBjb25zdCBjYWNoZWRFeHRlbmRzID0gZ2xvYmFsLl9fZXh0ZW5kcztcclxuaW1wb3J0IHtIdHRwQ2xpZW50LEh0dHBFdmVudCwgSHR0cEhhbmRsZXIsIEh0dHBJbnRlcmNlcHRvciwgSHR0cFJlcXVlc3QsSHR0cEhlYWRlcnMsSHR0cFBhcmFtc30gZnJvbSBcIkBhbmd1bGFyL2NvbW1vbi9odHRwXCI7XHJcbi8vIGdsb2JhbC5fX2V4dGVuZHMgPSBjYWNoZWRFeHRlbmRzO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcclxuaW1wb3J0ICdyeGpzL2FkZC9vcGVyYXRvci9tYXAnO1xyXG5cclxuaW1wb3J0IHsgVXNlciwgUHJvZHVjdCB9IGZyb20gJy4uL21vZGVscy9pbmRleCc7XHJcblxyXG5pbXBvcnQgeyBDb25maWcgfSBmcm9tIFwiLi4vc2hhcmVkL2NvbmZpZ1wiO1xyXG5cclxuXHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBQcm9kdWN0U2VydmljZSB7XHJcbiAgICAgYXBpVXJsOiBzdHJpbmcgID0gQ29uZmlnLmFwaVVybDtcclxuICAgIFxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50KSB7IH1cclxuXHJcbiAgIFxyXG4gICAgZGVkdWN0UHJvZHVjdChwcm9kdWN0SWQ6IFN0cmluZyxxdWFudGl0eSA6IFN0cmluZywgYmF0Y2hObzogU3RyaW5nLGNvb3BlcklkOlN0cmluZyxjb29wZXJhdGl2ZUlkOlN0cmluZyxzdGFmZklkOiBTdHJpbmcsdHJhbnNBbW91bnQ6IFN0cmluZyApOiBPYnNlcnZhYmxlPGFueT4ge1xyXG4gICAgICAgIC8vdGhpcy5hcGlVcmwgPSB0aGlzLmFwaVVybCArICdzdHVkZW50JztcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIiBSZXR1cm4gU3R1ZGVudCBJZCAyIFwiICsgc3R1ZGVudElkKTtcclxuICAgICAgICAvL2xldCBwYXJhbXMgPSBuZXcgSHR0cFBhcmFtcygpLnNldCgnX2lkJywgc3R1ZGVudElkKTtcclxuICAgICAgICAvLyB2YXIgY3VycmVudFVzZXIgOiBhbnkgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnY3VycmVudFVzZXInKTtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIkN1cnJlbnQgVXNlciAxIFwiICsgY3VycmVudFVzZXIudG9rZW4pO1xyXG4gICAgICAgLy8gY29uc3QgaGVhZGVycyA9IG5ldyBIdHRwSGVhZGVycygpLnNldChcIkF1dGhvcml6YXRpb25cIiwgXCJKV1QgXCIgKyBjdXJyZW50VXNlci50b2tlbik7XHJcblxyXG4vLyAgICAgICAgIGxldCBoZWFkZXJzID0gbmV3IEh0dHBIZWFkZXJzKCk7XHJcbi8vIGhlYWRlcnMgPSBoZWFkZXJzLmFwcGVuZChcIkF1dGhvcml6YXRpb25cIiwgXCJKV1QgXCIgKyBcImV5SjBlWEFpT2lKS1YxUWlMQ0poYkdjaU9pSklVekkxTmlKOS5leUpwWkNJNklqZzJNRGxrWXpreExUQTNaRE10TkRBM05DMWlNR1F4TFdWa05qUXlaak13WVRZNVpDSjkua3BXeHdOUGJRdkcxbDNWYjhWYjZSUXdDa3kxU3F5ZGhGUHRJQ29oeUQxQVwiKTtcclxuLy8gaGVhZGVycyA9IGhlYWRlcnMuYXBwZW5kKFwiQ29udGVudC1UeXBlXCIsIFwiYXBwbGljYXRpb24vanNvblwiKTtcclxuXHJcbmxldCBoZWFkZXJzID0gbmV3IEh0dHBIZWFkZXJzKCk7XHJcbmhlYWRlcnMgPSBoZWFkZXJzLmFwcGVuZChcIkNvbnRlbnQtVHlwZVwiLCBcImFwcGxpY2F0aW9uL2pzb25cIik7XHJcblxyXG5cclxuXHJcbiAgICAgICAgLy9BdXRob3JpemF0aW9uOiBcIkpXVCBcIiArIGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdjdXJyZW50VXNlcicpLnRva2VuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0PGFueT4odGhpcy5hcGlVcmwgKyAncHJvZHVjdHMvZGVkdWN0JyxKU09OLnN0cmluZ2lmeSh7cHJvZHVjdElkOnByb2R1Y3RJZCxxdWFudGl0eTpxdWFudGl0eSxiYXRjaElkOmJhdGNoTm8sY29vcGVySWQ6Y29vcGVySWQsY29vcGVyYXRpdmVJZDpjb29wZXJhdGl2ZUlkLHN0YWZmSWQ6c3RhZmZJZCx0cmFuc0Ftb3VudDp0cmFuc0Ftb3VudH0pLCB7cmVzcG9uc2VUeXBlOiAnanNvbicsaGVhZGVyc30pO1xyXG4gICAgfSBcclxuXHJcbiAgICBcclxuICAgIGdldHByb2R1Y3QoSWQ6IFN0cmluZywgdXNlcklkOlN0cmluZyk6IE9ic2VydmFibGU8YW55PiB7XHJcbiAgICAgICAgLy90aGlzLmFwaVVybCA9IHRoaXMuYXBpVXJsICsgJ3N0dWRlbnQnO1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwiIFJldHVybiBTdHVkZW50IElkIDIgXCIgKyBzdHVkZW50SWQpO1xyXG4gICAgICAgIC8vbGV0IHBhcmFtcyA9IG5ldyBIdHRwUGFyYW1zKCkuc2V0KCdfaWQnLCBzdHVkZW50SWQpO1xyXG4gICAgICAgIHZhciBjdXJyZW50VXNlciA6IGFueSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdjdXJyZW50VXNlcicpO1xyXG4gICAgICAgIC8vY29uc29sZS5sb2coXCJDdXJyZW50IFVzZXIgMSBcIiArIGN1cnJlbnRVc2VyLnRva2VuKTtcclxuICAgICAgIC8vIGNvbnN0IGhlYWRlcnMgPSBuZXcgSHR0cEhlYWRlcnMoKS5zZXQoXCJBdXRob3JpemF0aW9uXCIsIFwiSldUIFwiICsgY3VycmVudFVzZXIudG9rZW4pO1xyXG5cclxuICAgICAgICAvLyAgICAgICAgIGxldCBoZWFkZXJzID0gbmV3IEh0dHBIZWFkZXJzKCk7XHJcbiAgICAgICAgLy8gaGVhZGVycyA9IGhlYWRlcnMuYXBwZW5kKFwiQXV0aG9yaXphdGlvblwiLCBcIkpXVCBcIiArIFwiZXlKMGVYQWlPaUpLVjFRaUxDSmhiR2NpT2lKSVV6STFOaUo5LmV5SnBaQ0k2SWpnMk1EbGtZemt4TFRBM1pETXROREEzTkMxaU1HUXhMV1ZrTmpReVpqTXdZVFk1WkNKOS5rcFd4d05QYlF2RzFsM1ZiOFZiNlJRd0NreTFTcXlkaEZQdElDb2h5RDFBXCIpO1xyXG4gICAgICAgIC8vIGhlYWRlcnMgPSBoZWFkZXJzLmFwcGVuZChcIkNvbnRlbnQtVHlwZVwiLCBcImFwcGxpY2F0aW9uL2pzb25cIik7XHJcblxyXG4gICAgICAgIGxldCBoZWFkZXJzID0gbmV3IEh0dHBIZWFkZXJzKCk7XHJcbiAgICAgICAgaGVhZGVycyA9IGhlYWRlcnMuYXBwZW5kKFwiQ29udGVudC1UeXBlXCIsIFwiYXBwbGljYXRpb24vanNvblwiKTtcclxuXHJcblxyXG5cclxuXHJcbiAgICAgICAgLy9BdXRob3JpemF0aW9uOiBcIkpXVCBcIiArIGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdjdXJyZW50VXNlcicpLnRva2VuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQ8YW55Pih0aGlzLmFwaVVybCArICdwcm9kdWN0cy8nICsgSWQgKyBcIi9cIiArIHVzZXJJZCwge3Jlc3BvbnNlVHlwZTogJ2pzb24nLGhlYWRlcnN9KTtcclxuICAgIH0gXHJcblxyXG4gICAgZ2V0YWxscHJvZHVjdCgpOiBPYnNlcnZhYmxlPGFueT4ge1xyXG4gICAgICAgIC8vdGhpcy5hcGlVcmwgPSB0aGlzLmFwaVVybCArICdzdHVkZW50JztcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIiBSZXR1cm4gU3R1ZGVudCBJZCAyIFwiICsgc3R1ZGVudElkKTtcclxuICAgICAgICAvL2xldCBwYXJhbXMgPSBuZXcgSHR0cFBhcmFtcygpLnNldCgnX2lkJywgc3R1ZGVudElkKTtcclxuICAgICAgICB2YXIgY3VycmVudFVzZXIgOiBhbnkgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnY3VycmVudFVzZXInKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIkN1cnJlbnQgVXNlciAxIFwiICsgY3VycmVudFVzZXIudG9rZW4pO1xyXG4gICAgICAgLy8gY29uc3QgaGVhZGVycyA9IG5ldyBIdHRwSGVhZGVycygpLnNldChcIkF1dGhvcml6YXRpb25cIiwgXCJKV1QgXCIgKyBjdXJyZW50VXNlci50b2tlbik7XHJcblxyXG4gICAgICAgIC8vICAgICAgICAgbGV0IGhlYWRlcnMgPSBuZXcgSHR0cEhlYWRlcnMoKTtcclxuICAgICAgICAvLyBoZWFkZXJzID0gaGVhZGVycy5hcHBlbmQoXCJBdXRob3JpemF0aW9uXCIsIFwiSldUIFwiICsgXCJleUowZVhBaU9pSktWMVFpTENKaGJHY2lPaUpJVXpJMU5pSjkuZXlKcFpDSTZJamcyTURsa1l6a3hMVEEzWkRNdE5EQTNOQzFpTUdReExXVmtOalF5WmpNd1lUWTVaQ0o5LmtwV3h3TlBiUXZHMWwzVmI4VmI2UlF3Q2t5MVNxeWRoRlB0SUNvaHlEMUFcIik7XHJcbiAgICAgICAgLy8gaGVhZGVycyA9IGhlYWRlcnMuYXBwZW5kKFwiQ29udGVudC1UeXBlXCIsIFwiYXBwbGljYXRpb24vanNvblwiKTtcclxuXHJcbiAgICAgICAgbGV0IGhlYWRlcnMgPSBuZXcgSHR0cEhlYWRlcnMoKTtcclxuICAgICAgICBoZWFkZXJzID0gaGVhZGVycy5hcHBlbmQoXCJDb250ZW50LVR5cGVcIiwgXCJhcHBsaWNhdGlvbi9qc29uXCIpO1xyXG5cclxuXHJcblxyXG5cclxuICAgICAgICAvL0F1dGhvcml6YXRpb246IFwiSldUIFwiICsgbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2N1cnJlbnRVc2VyJykudG9rZW5cclxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldDxhbnk+KHRoaXMuYXBpVXJsICsgJ3Byb2R1Y3RzJywge3Jlc3BvbnNlVHlwZTogJ2pzb24nLGhlYWRlcnN9KTtcclxuICAgIH0gXHJcblxyXG5cclxuICAgIGdldGFsbHByb2R1Y3RCeUNhdGVnb3J5KGNhdGVnb3J5SWQ6IFN0cmluZyk6IE9ic2VydmFibGU8YW55PiB7XHJcbiAgICAgICAgLy90aGlzLmFwaVVybCA9IHRoaXMuYXBpVXJsICsgJ3N0dWRlbnQnO1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwiIFJldHVybiBTdHVkZW50IElkIDIgXCIgKyBzdHVkZW50SWQpO1xyXG4gICAgICAgIC8vbGV0IHBhcmFtcyA9IG5ldyBIdHRwUGFyYW1zKCkuc2V0KCdfaWQnLCBzdHVkZW50SWQpO1xyXG4gICAgICAgIHZhciBjdXJyZW50VXNlciA6IGFueSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdjdXJyZW50VXNlcicpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiQ3VycmVudCBVc2VyIDEgXCIgKyBjdXJyZW50VXNlci50b2tlbik7XHJcbiAgICAgICAvLyBjb25zdCBoZWFkZXJzID0gbmV3IEh0dHBIZWFkZXJzKCkuc2V0KFwiQXV0aG9yaXphdGlvblwiLCBcIkpXVCBcIiArIGN1cnJlbnRVc2VyLnRva2VuKTtcclxuXHJcbiAgICAgICAgLy8gICAgICAgICBsZXQgaGVhZGVycyA9IG5ldyBIdHRwSGVhZGVycygpO1xyXG4gICAgICAgIC8vIGhlYWRlcnMgPSBoZWFkZXJzLmFwcGVuZChcIkF1dGhvcml6YXRpb25cIiwgXCJKV1QgXCIgKyBcImV5SjBlWEFpT2lKS1YxUWlMQ0poYkdjaU9pSklVekkxTmlKOS5leUpwWkNJNklqZzJNRGxrWXpreExUQTNaRE10TkRBM05DMWlNR1F4TFdWa05qUXlaak13WVRZNVpDSjkua3BXeHdOUGJRdkcxbDNWYjhWYjZSUXdDa3kxU3F5ZGhGUHRJQ29oeUQxQVwiKTtcclxuICAgICAgICAvLyBoZWFkZXJzID0gaGVhZGVycy5hcHBlbmQoXCJDb250ZW50LVR5cGVcIiwgXCJhcHBsaWNhdGlvbi9qc29uXCIpO1xyXG5cclxuICAgICAgICBsZXQgaGVhZGVycyA9IG5ldyBIdHRwSGVhZGVycygpO1xyXG4gICAgICAgIGhlYWRlcnMgPSBoZWFkZXJzLmFwcGVuZChcIkNvbnRlbnQtVHlwZVwiLCBcImFwcGxpY2F0aW9uL2pzb25cIik7XHJcblxyXG5cclxuXHJcblxyXG4gICAgICAgIC8vQXV0aG9yaXphdGlvbjogXCJKV1QgXCIgKyBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnY3VycmVudFVzZXInKS50b2tlblxyXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0PGFueT4odGhpcy5hcGlVcmwgKyAncHJvZHVjdGNhdGVnb3J5L2NhdGVnb3J5LycgKyBjYXRlZ29yeUlkLCB7cmVzcG9uc2VUeXBlOiAnanNvbicsaGVhZGVyc30pO1xyXG4gICAgfSBcclxuXHJcblxyXG4gICAgXHJcblxyXG4gICAgYWRkcHJvZHVjdHMocHJvZHVjdDpQcm9kdWN0KTogT2JzZXJ2YWJsZTxhbnk+IHtcclxuXHJcblxyXG4gICAgICAgIC8vICAgICAgICAgbGV0IGhlYWRlcnMgPSBuZXcgSHR0cEhlYWRlcnMoKTtcclxuICAgICAgICAvLyBoZWFkZXJzID0gaGVhZGVycy5hcHBlbmQoXCJBdXRob3JpemF0aW9uXCIsIFwiSldUIFwiICsgXCJleUowZVhBaU9pSktWMVFpTENKaGJHY2lPaUpJVXpJMU5pSjkuZXlKcFpDSTZJamcyTURsa1l6a3hMVEEzWkRNdE5EQTNOQzFpTUdReExXVmtOalF5WmpNd1lUWTVaQ0o5LmtwV3h3TlBiUXZHMWwzVmI4VmI2UlF3Q2t5MVNxeWRoRlB0SUNvaHlEMUFcIik7XHJcbiAgICAgICAgLy8gaGVhZGVycyA9IGhlYWRlcnMuYXBwZW5kKFwiQ29udGVudC1UeXBlXCIsIFwiYXBwbGljYXRpb24vanNvblwiKTtcclxuXHJcbiAgICAgICAgbGV0IGhlYWRlcnMgPSBuZXcgSHR0cEhlYWRlcnMoKTtcclxuICAgICAgICBoZWFkZXJzID0gaGVhZGVycy5hcHBlbmQoXCJDb250ZW50LVR5cGVcIiwgXCJhcHBsaWNhdGlvbi9qc29uXCIpO1xyXG5cclxuXHJcbiAgICAgICAgLy9BdXRob3JpemF0aW9uOiBcIkpXVCBcIiArIGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdjdXJyZW50VXNlcicpLnRva2VuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0PGFueT4odGhpcy5hcGlVcmwgKyAncHJvZHVjdHMvJyxKU09OLnN0cmluZ2lmeSh7dmVuZG9ySWQ6cHJvZHVjdC52ZW5kb3JJZCxwcm9kdWN0TmFtZTpwcm9kdWN0LnByb2R1Y3ROYW1lLHByb2R1Y3RJbWFnZTpwcm9kdWN0LnByb2R1Y3RJbWFnZSxicmFuZDpwcm9kdWN0LmJyYW5kLGxvY2F0aW9uOnByb2R1Y3QubG9jYXRpb24scXVhbnRpdHk6cHJvZHVjdC5xdWFudGl0eSwgcHJpY2U6cHJvZHVjdC5wcmljZX0pLCB7cmVzcG9uc2VUeXBlOiAnanNvbicsaGVhZGVyc30pO1xyXG4gICAgfSBcclxuXHJcbiAgICB1cGRhdGVQcm9kdWN0cyhfaWQ6IHN0cmluZyxwcm9kdWN0OlByb2R1Y3QpOiBPYnNlcnZhYmxlPGFueT4ge1xyXG5cclxuXHJcbiAgICAgICAgLy8gbGV0IGhlYWRlcnMgPSBuZXcgSHR0cEhlYWRlcnMoKTtcclxuICAgICAgICAvLyBoZWFkZXJzID0gaGVhZGVycy5hcHBlbmQoXCJBdXRob3JpemF0aW9uXCIsIFwiSldUIFwiICsgXCJleUowZVhBaU9pSktWMVFpTENKaGJHY2lPaUpJVXpJMU5pSjkuZXlKcFpDSTZJamcyTURsa1l6a3hMVEEzWkRNdE5EQTNOQzFpTUdReExXVmtOalF5WmpNd1lUWTVaQ0o5LmtwV3h3TlBiUXZHMWwzVmI4VmI2UlF3Q2t5MVNxeWRoRlB0SUNvaHlEMUFcIik7XHJcbiAgICAgICAgLy8gaGVhZGVycyA9IGhlYWRlcnMuYXBwZW5kKFwiQ29udGVudC1UeXBlXCIsIFwiYXBwbGljYXRpb24vanNvblwiKTtcclxuXHJcbiAgICAgICAgbGV0IGhlYWRlcnMgPSBuZXcgSHR0cEhlYWRlcnMoKTtcclxuICAgICAgICBoZWFkZXJzID0gaGVhZGVycy5hcHBlbmQoXCJDb250ZW50LVR5cGVcIiwgXCJhcHBsaWNhdGlvbi9qc29uXCIpO1xyXG5cclxuXHJcbiAgICAgICAgLy9BdXRob3JpemF0aW9uOiBcIkpXVCBcIiArIGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdjdXJyZW50VXNlcicpLnRva2VuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5wdXQ8YW55Pih0aGlzLmFwaVVybCArICdwcm9kdWN0cy8nICsgX2lkLEpTT04uc3RyaW5naWZ5KHt2ZW5kb3JJZDpwcm9kdWN0LnZlbmRvcklkLHByb2R1Y3ROYW1lOnByb2R1Y3QucHJvZHVjdE5hbWUscHJvZHVjdEltYWdlOnByb2R1Y3QucHJvZHVjdEltYWdlLGJyYW5kOnByb2R1Y3QuYnJhbmQsbG9jYXRpb246cHJvZHVjdC5sb2NhdGlvbixxdWFudGl0eTpwcm9kdWN0LnF1YW50aXR5LCBwcmljZTpwcm9kdWN0LnByaWNlfSksIHtyZXNwb25zZVR5cGU6ICdqc29uJyxoZWFkZXJzfSk7XHJcbiAgICB9IFxyXG5cclxuICAgIGVkaXRQaG9uZU51bWJlcih1c2VySWQ6IFN0cmluZyk6IE9ic2VydmFibGU8YW55PiB7XHJcblxyXG5cclxuICAgICAgICAvLyAgICAgICAgIGxldCBoZWFkZXJzID0gbmV3IEh0dHBIZWFkZXJzKCk7XHJcbiAgICAgICAgLy8gaGVhZGVycyA9IGhlYWRlcnMuYXBwZW5kKFwiQXV0aG9yaXphdGlvblwiLCBcIkpXVCBcIiArIFwiZXlKMGVYQWlPaUpLVjFRaUxDSmhiR2NpT2lKSVV6STFOaUo5LmV5SnBaQ0k2SWpnMk1EbGtZemt4TFRBM1pETXROREEzTkMxaU1HUXhMV1ZrTmpReVpqTXdZVFk1WkNKOS5rcFd4d05QYlF2RzFsM1ZiOFZiNlJRd0NreTFTcXlkaEZQdElDb2h5RDFBXCIpO1xyXG4gICAgICAgIC8vIGhlYWRlcnMgPSBoZWFkZXJzLmFwcGVuZChcIkNvbnRlbnQtVHlwZVwiLCBcImFwcGxpY2F0aW9uL2pzb25cIik7XHJcblxyXG4gICAgICAgIGxldCBoZWFkZXJzID0gbmV3IEh0dHBIZWFkZXJzKCk7XHJcbiAgICAgICAgaGVhZGVycyA9IGhlYWRlcnMuYXBwZW5kKFwiQ29udGVudC1UeXBlXCIsIFwiYXBwbGljYXRpb24vanNvblwiKTtcclxuXHJcblxyXG4gICAgICAgIC8vQXV0aG9yaXphdGlvbjogXCJKV1QgXCIgKyBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnY3VycmVudFVzZXInKS50b2tlblxyXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0PGFueT4odGhpcy5hcGlVcmwgKyAndXNlcnMvZWRpdHBob25lbnVtYmVyLycgKyB1c2VySWQgLCB7cmVzcG9uc2VUeXBlOiAnanNvbicsaGVhZGVyc30pO1xyXG4gICAgfSBcclxuXHJcbiAgICBjaGFuZ2VQaW4odXNlcklkOiBTdHJpbmcpOiBPYnNlcnZhYmxlPGFueT4ge1xyXG5cclxuXHJcbiAgICAgICAgLy8gICAgICAgICBsZXQgaGVhZGVycyA9IG5ldyBIdHRwSGVhZGVycygpO1xyXG4gICAgICAgIC8vIGhlYWRlcnMgPSBoZWFkZXJzLmFwcGVuZChcIkF1dGhvcml6YXRpb25cIiwgXCJKV1QgXCIgKyBcImV5SjBlWEFpT2lKS1YxUWlMQ0poYkdjaU9pSklVekkxTmlKOS5leUpwWkNJNklqZzJNRGxrWXpreExUQTNaRE10TkRBM05DMWlNR1F4TFdWa05qUXlaak13WVRZNVpDSjkua3BXeHdOUGJRdkcxbDNWYjhWYjZSUXdDa3kxU3F5ZGhGUHRJQ29oeUQxQVwiKTtcclxuICAgICAgICAvLyBoZWFkZXJzID0gaGVhZGVycy5hcHBlbmQoXCJDb250ZW50LVR5cGVcIiwgXCJhcHBsaWNhdGlvbi9qc29uXCIpO1xyXG5cclxuICAgICAgICBsZXQgaGVhZGVycyA9IG5ldyBIdHRwSGVhZGVycygpO1xyXG4gICAgICAgIGhlYWRlcnMgPSBoZWFkZXJzLmFwcGVuZChcIkNvbnRlbnQtVHlwZVwiLCBcImFwcGxpY2F0aW9uL2pzb25cIik7XHJcblxyXG5cclxuICAgICAgICAvL0F1dGhvcml6YXRpb246IFwiSldUIFwiICsgbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2N1cnJlbnRVc2VyJykudG9rZW5cclxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldDxhbnk+KHRoaXMuYXBpVXJsICsgJ3VzZXJzL2NoYW5nZXBpbi8nICsgdXNlcklkICwge3Jlc3BvbnNlVHlwZTogJ2pzb24nLGhlYWRlcnN9KTtcclxuICAgIH0gXHJcblxyXG5cclxuXHJcbiAgICBzZWFyY2hQcm9kdWN0cyhzZWFyY2hWYWx1ZTpTdHJpbmcsIHNraXBWYWx1ZTogbnVtYmVyLCBsaW1pdFZhbHVlOiBudW1iZXIpOiBPYnNlcnZhYmxlPGFueT4ge1xyXG5cclxuXHJcbiAgICAgICAgLy8gICAgICAgICBsZXQgaGVhZGVycyA9IG5ldyBIdHRwSGVhZGVycygpO1xyXG4gICAgICAgIC8vIGhlYWRlcnMgPSBoZWFkZXJzLmFwcGVuZChcIkF1dGhvcml6YXRpb25cIiwgXCJKV1QgXCIgKyBcImV5SjBlWEFpT2lKS1YxUWlMQ0poYkdjaU9pSklVekkxTmlKOS5leUpwWkNJNklqZzJNRGxrWXpreExUQTNaRE10TkRBM05DMWlNR1F4TFdWa05qUXlaak13WVRZNVpDSjkua3BXeHdOUGJRdkcxbDNWYjhWYjZSUXdDa3kxU3F5ZGhGUHRJQ29oeUQxQVwiKTtcclxuICAgICAgICAvLyBoZWFkZXJzID0gaGVhZGVycy5hcHBlbmQoXCJDb250ZW50LVR5cGVcIiwgXCJhcHBsaWNhdGlvbi9qc29uXCIpO1xyXG5cclxuICAgICAgICBsZXQgaGVhZGVycyA9IG5ldyBIdHRwSGVhZGVycygpO1xyXG4gICAgICAgIGhlYWRlcnMgPSBoZWFkZXJzLmFwcGVuZChcIkNvbnRlbnQtVHlwZVwiLCBcImFwcGxpY2F0aW9uL2pzb25cIik7XHJcblxyXG5cclxuICAgICAgICAvL0F1dGhvcml6YXRpb246IFwiSldUIFwiICsgbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2N1cnJlbnRVc2VyJykudG9rZW5cclxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLnBvc3Q8YW55Pih0aGlzLmFwaVVybCArICdwcm9kdWN0cy9zZWFyY2gnLEpTT04uc3RyaW5naWZ5KHtzZWFyY2hWYWx1ZTpzZWFyY2hWYWx1ZSxza2lwVmFsdWU6c2tpcFZhbHVlLGxpbWl0VmFsdWU6bGltaXRWYWx1ZX0pLCB7cmVzcG9uc2VUeXBlOiAnanNvbicsaGVhZGVyc30pO1xyXG4gICAgfSBcclxuXHJcbiAgICBsaWtlUHJvZHVjdHMoX2lkOlN0cmluZywgcHJvZHVjdElkOiBTdHJpbmcsbGlrZXM6IEFycmF5PGFueT4pOiBPYnNlcnZhYmxlPGFueT4ge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiX2lkIGluIFByb2R1Y3Qgc2VydmljZSBsaWtlIFwiICsgX2lkICsgXCIgUHJvZHVjdCBJRCBcIisgcHJvZHVjdElkIClcclxuICAgICAgXHJcbiAgICAgICAgLy8gICAgICAgICBsZXQgaGVhZGVycyA9IG5ldyBIdHRwSGVhZGVycygpO1xyXG4gICAgICAgIC8vIGhlYWRlcnMgPSBoZWFkZXJzLmFwcGVuZChcIkF1dGhvcml6YXRpb25cIiwgXCJKV1QgXCIgKyBcImV5SjBlWEFpT2lKS1YxUWlMQ0poYkdjaU9pSklVekkxTmlKOS5leUpwWkNJNklqZzJNRGxrWXpreExUQTNaRE10TkRBM05DMWlNR1F4TFdWa05qUXlaak13WVRZNVpDSjkua3BXeHdOUGJRdkcxbDNWYjhWYjZSUXdDa3kxU3F5ZGhGUHRJQ29oeUQxQVwiKTtcclxuICAgICAgICAvLyBoZWFkZXJzID0gaGVhZGVycy5hcHBlbmQoXCJDb250ZW50LVR5cGVcIiwgXCJhcHBsaWNhdGlvbi9qc29uXCIpO1xyXG5cclxuICAgICAgICBsZXQgaGVhZGVycyA9IG5ldyBIdHRwSGVhZGVycygpO1xyXG4gICAgICAgIGhlYWRlcnMgPSBoZWFkZXJzLmFwcGVuZChcIkNvbnRlbnQtVHlwZVwiLCBcImFwcGxpY2F0aW9uL2pzb25cIik7XHJcblxyXG5cclxuICAgICAgICAvL0F1dGhvcml6YXRpb246IFwiSldUIFwiICsgbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2N1cnJlbnRVc2VyJykudG9rZW5cclxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLnBvc3Q8YW55Pih0aGlzLmFwaVVybCArICdwcm9kdWN0cy9saWtlLycgKyBfaWQsSlNPTi5zdHJpbmdpZnkoe3Byb2R1Y3RJZDpwcm9kdWN0SWQsbGlrZXM6bGlrZXN9KSwge3Jlc3BvbnNlVHlwZTogJ2pzb24nLGhlYWRlcnN9KTtcclxuICAgIH0gXHJcblxyXG5cclxuXHJcblxyXG4gIFxyXG5cclxuICAgIFxyXG5cclxuICAgXHJcblxyXG4gICBwcml2YXRlIGV4dHJhY3REYXRhKHJlczogUmVzcG9uc2UpIHtcclxuXHRsZXQgYm9keSA9IHJlcy5qc29uKCk7XHJcbiAgICAgICAgcmV0dXJuIGJvZHk7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIGhhbmRsZUVycm9yIChlcnJvcjogUmVzcG9uc2UgfCBhbnkpIHtcclxuXHRjb25zb2xlLmVycm9yKGVycm9yLm1lc3NhZ2UgfHwgZXJyb3IpO1xyXG5cdHJldHVybiBPYnNlcnZhYmxlLnRocm93KGVycm9yLnN0YXR1cyk7XHJcbiAgICB9XHJcblxyXG4gIFxyXG5cclxufVxyXG5cclxuXHJcblxyXG4iXX0=