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
var CooperativeStaffAccountService = /** @class */ (function () {
    function CooperativeStaffAccountService(http) {
        this.http = http;
        this.apiUrl = config_1.Config.apiUrl;
    }
    CooperativeStaffAccountService.prototype.deductCooperativeAccount = function (cooperativeId, staffId, amount, accountType) {
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
        return this.http.post(this.apiUrl + 'cooperativeStaffAccounts/deduct', JSON.stringify({ cooperativeId: cooperativeId, staffId: staffId, amount: amount, accountType: accountType }), { responseType: 'json', headers: headers });
    };
    CooperativeStaffAccountService.prototype.getCooperativeStaff = function (staffId, cooperativeId) {
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
        return this.http.get(this.apiUrl + 'cooperativestaffs/' + staffId + "/" + cooperativeId, { responseType: 'json', headers: headers });
    };
    CooperativeStaffAccountService.prototype.verifyAuthToCreatLater = function (verifyAuth) {
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
        return this.http.post(this.apiUrl + 'verifyauths', JSON.stringify({ staffId: verifyAuth.staffId, cooperativeId: verifyAuth.cooperativeId, email: verifyAuth.email, phoneNumber: verifyAuth.phone, lastName: verifyAuth.name, firstName: verifyAuth.name, authType: "New" }), { responseType: 'json', headers: headers });
    };
    CooperativeStaffAccountService.prototype.extractData = function (res) {
        var body = res.json();
        return body;
    };
    CooperativeStaffAccountService.prototype.handleError = function (error) {
        console.error(error.message || error);
        return Observable_1.Observable.throw(error.status);
    };
    CooperativeStaffAccountService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], CooperativeStaffAccountService);
    return CooperativeStaffAccountService;
}());
exports.CooperativeStaffAccountService = CooperativeStaffAccountService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29vcGVyYXRpdmVzdGFmZmFjY291bnQuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNvb3BlcmF0aXZlc3RhZmZhY2NvdW50LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMkM7QUFDM0MsMEVBQTBFO0FBQzFFLDBDQUEwQztBQUMxQyw2Q0FBNEg7QUFDNUgsb0NBQW9DO0FBQ3BDLDhDQUE2QztBQUM3QyxpQ0FBK0I7QUFJL0IsMkNBQTBDO0FBSzFDO0lBR0ksd0NBQW9CLElBQWdCO1FBQWhCLFNBQUksR0FBSixJQUFJLENBQVk7UUFGbkMsV0FBTSxHQUFZLGVBQU0sQ0FBQyxNQUFNLENBQUM7SUFFTyxDQUFDO0lBR3pDLGlFQUF3QixHQUF4QixVQUF5QixhQUFxQixFQUFDLE9BQWdCLEVBQUMsTUFBYyxFQUFFLFdBQW1CO1FBQy9GLHdDQUF3QztRQUN4QyxvREFBb0Q7UUFDcEQsc0RBQXNEO1FBQ3RELCtEQUErRDtRQUMvRCxzREFBc0Q7UUFDdkQsc0ZBQXNGO1FBRTdGLDJDQUEyQztRQUMzQyx1TUFBdU07UUFDdk0sZ0VBQWdFO1FBRWhFLElBQUksT0FBTyxHQUFHLElBQUksa0JBQVcsRUFBRSxDQUFDO1FBQ2hDLE9BQU8sR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLGNBQWMsRUFBRSxrQkFBa0IsQ0FBQyxDQUFDO1FBSXJELG1FQUFtRTtRQUNuRSxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQU0sSUFBSSxDQUFDLE1BQU0sR0FBRyxpQ0FBaUMsRUFBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUMsYUFBYSxFQUFDLGFBQWEsRUFBQyxPQUFPLEVBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFLFdBQVcsRUFBQyxDQUFDLEVBQUUsRUFBQyxZQUFZLEVBQUUsTUFBTSxFQUFDLE9BQU8sU0FBQSxFQUFDLENBQUMsQ0FBQztJQUN4TixDQUFDO0lBS0QsNERBQW1CLEdBQW5CLFVBQW9CLE9BQWUsRUFBQyxhQUFxQjtRQUNyRCx3Q0FBd0M7UUFDeEMsb0RBQW9EO1FBQ3BELHNEQUFzRDtRQUN0RCwrREFBK0Q7UUFDL0Qsc0RBQXNEO1FBQ3ZELHNGQUFzRjtRQUU3RiwyQ0FBMkM7UUFDM0MsdU1BQXVNO1FBQ3ZNLGdFQUFnRTtRQUVoRSxJQUFJLE9BQU8sR0FBRyxJQUFJLGtCQUFXLEVBQUUsQ0FBQztRQUNoQyxPQUFPLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxjQUFjLEVBQUUsa0JBQWtCLENBQUMsQ0FBQztRQUtyRCxtRUFBbUU7UUFDbkUsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFNLElBQUksQ0FBQyxNQUFNLEdBQUcsb0JBQW9CLEdBQUcsT0FBTyxHQUFHLEdBQUcsR0FBRSxhQUFhLEVBQUUsRUFBQyxZQUFZLEVBQUUsTUFBTSxFQUFDLE9BQU8sU0FBQSxFQUFDLENBQUMsQ0FBQztJQUNqSSxDQUFDO0lBS0QsK0RBQXNCLEdBQXRCLFVBQXVCLFVBQTRCO1FBQy9DLHdDQUF3QztRQUN4QyxvREFBb0Q7UUFDcEQsc0RBQXNEO1FBQ3RELCtEQUErRDtRQUMvRCxzREFBc0Q7UUFDdkQsc0ZBQXNGO1FBRTdGLDJDQUEyQztRQUMzQyx1TUFBdU07UUFDdk0sZ0VBQWdFO1FBRWhFLElBQUksT0FBTyxHQUFHLElBQUksa0JBQVcsRUFBRSxDQUFDO1FBQ2hDLE9BQU8sR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLGNBQWMsRUFBRSxrQkFBa0IsQ0FBQyxDQUFDO1FBSXJELG1FQUFtRTtRQUNuRSxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQU0sSUFBSSxDQUFDLE1BQU0sR0FBRyxhQUFhLEVBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFDLE9BQU8sRUFBQyxVQUFVLENBQUMsT0FBTyxFQUFFLGFBQWEsRUFBQyxVQUFVLENBQUMsYUFBYSxFQUFDLEtBQUssRUFBRSxVQUFVLENBQUMsS0FBSyxFQUFFLFdBQVcsRUFBRSxVQUFVLENBQUMsS0FBSyxFQUFFLFFBQVEsRUFBQyxVQUFVLENBQUMsSUFBSSxFQUFDLFNBQVMsRUFBQyxVQUFVLENBQUMsSUFBSSxFQUFDLFFBQVEsRUFBQyxLQUFLLEVBQUMsQ0FBQyxFQUFFLEVBQUMsWUFBWSxFQUFFLE1BQU0sRUFBQyxPQUFPLFNBQUEsRUFBQyxDQUFDLENBQUM7SUFDM1MsQ0FBQztJQVNNLG9EQUFXLEdBQW5CLFVBQW9CLEdBQWE7UUFDbkMsSUFBSSxJQUFJLEdBQUcsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ2YsTUFBTSxDQUFDLElBQUksQ0FBQztJQUNoQixDQUFDO0lBQ08sb0RBQVcsR0FBbkIsVUFBcUIsS0FBcUI7UUFDN0MsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsT0FBTyxJQUFJLEtBQUssQ0FBQyxDQUFDO1FBQ3RDLE1BQU0sQ0FBQyx1QkFBVSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDbkMsQ0FBQztJQTFGUSw4QkFBOEI7UUFEMUMsaUJBQVUsRUFBRTt5Q0FJaUIsaUJBQVU7T0FIM0IsOEJBQThCLENBOEYxQztJQUFELHFDQUFDO0NBQUEsQUE5RkQsSUE4RkM7QUE5Rlksd0VBQThCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG4vL2ltcG9ydCB7IEh0dHAsIEhlYWRlcnMsIFJlcXVlc3RPcHRpb25zLCBSZXNwb25zZSB9IGZyb20gJ0Bhbmd1bGFyL2h0dHAnO1xyXG4vLyBjb25zdCBjYWNoZWRFeHRlbmRzID0gZ2xvYmFsLl9fZXh0ZW5kcztcclxuaW1wb3J0IHtIdHRwQ2xpZW50LEh0dHBFdmVudCwgSHR0cEhhbmRsZXIsIEh0dHBJbnRlcmNlcHRvciwgSHR0cFJlcXVlc3QsSHR0cEhlYWRlcnMsSHR0cFBhcmFtc30gZnJvbSBcIkBhbmd1bGFyL2NvbW1vbi9odHRwXCI7XHJcbi8vIGdsb2JhbC5fX2V4dGVuZHMgPSBjYWNoZWRFeHRlbmRzO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcclxuaW1wb3J0ICdyeGpzL2FkZC9vcGVyYXRvci9tYXAnO1xyXG5cclxuaW1wb3J0IHsgQ29vcGVyYXRpdmUsVmVyaWZ5QXV0aCxDb29wZXJhdGl2ZVN0YWZmIH0gZnJvbSAnLi4vbW9kZWxzL2luZGV4JztcclxuXHJcbmltcG9ydCB7IENvbmZpZyB9IGZyb20gXCIuLi9zaGFyZWQvY29uZmlnXCI7XHJcblxyXG5cclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIENvb3BlcmF0aXZlU3RhZmZBY2NvdW50U2VydmljZSB7XHJcbiAgICAgYXBpVXJsOiBzdHJpbmcgID0gQ29uZmlnLmFwaVVybDtcclxuICAgIFxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50KSB7IH1cclxuXHJcblxyXG4gICAgZGVkdWN0Q29vcGVyYXRpdmVBY2NvdW50KGNvb3BlcmF0aXZlSWQ6IFN0cmluZyxzdGFmZklkIDogU3RyaW5nLGFtb3VudDogU3RyaW5nLCBhY2NvdW50VHlwZTogU3RyaW5nKTogT2JzZXJ2YWJsZTxhbnk+IHtcclxuICAgICAgICAvL3RoaXMuYXBpVXJsID0gdGhpcy5hcGlVcmwgKyAnc3R1ZGVudCc7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCIgUmV0dXJuIFN0dWRlbnQgSWQgMiBcIiArIHN0dWRlbnRJZCk7XHJcbiAgICAgICAgLy9sZXQgcGFyYW1zID0gbmV3IEh0dHBQYXJhbXMoKS5zZXQoJ19pZCcsIHN0dWRlbnRJZCk7XHJcbiAgICAgICAgLy8gdmFyIGN1cnJlbnRVc2VyIDogYW55ID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2N1cnJlbnRVc2VyJyk7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJDdXJyZW50IFVzZXIgMSBcIiArIGN1cnJlbnRVc2VyLnRva2VuKTtcclxuICAgICAgIC8vIGNvbnN0IGhlYWRlcnMgPSBuZXcgSHR0cEhlYWRlcnMoKS5zZXQoXCJBdXRob3JpemF0aW9uXCIsIFwiSldUIFwiICsgY3VycmVudFVzZXIudG9rZW4pO1xyXG5cclxuLy8gICAgICAgICBsZXQgaGVhZGVycyA9IG5ldyBIdHRwSGVhZGVycygpO1xyXG4vLyBoZWFkZXJzID0gaGVhZGVycy5hcHBlbmQoXCJBdXRob3JpemF0aW9uXCIsIFwiSldUIFwiICsgXCJleUowZVhBaU9pSktWMVFpTENKaGJHY2lPaUpJVXpJMU5pSjkuZXlKcFpDSTZJamcyTURsa1l6a3hMVEEzWkRNdE5EQTNOQzFpTUdReExXVmtOalF5WmpNd1lUWTVaQ0o5LmtwV3h3TlBiUXZHMWwzVmI4VmI2UlF3Q2t5MVNxeWRoRlB0SUNvaHlEMUFcIik7XHJcbi8vIGhlYWRlcnMgPSBoZWFkZXJzLmFwcGVuZChcIkNvbnRlbnQtVHlwZVwiLCBcImFwcGxpY2F0aW9uL2pzb25cIik7XHJcblxyXG5sZXQgaGVhZGVycyA9IG5ldyBIdHRwSGVhZGVycygpO1xyXG5oZWFkZXJzID0gaGVhZGVycy5hcHBlbmQoXCJDb250ZW50LVR5cGVcIiwgXCJhcHBsaWNhdGlvbi9qc29uXCIpO1xyXG5cclxuXHJcblxyXG4gICAgICAgIC8vQXV0aG9yaXphdGlvbjogXCJKV1QgXCIgKyBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnY3VycmVudFVzZXInKS50b2tlblxyXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAucG9zdDxhbnk+KHRoaXMuYXBpVXJsICsgJ2Nvb3BlcmF0aXZlU3RhZmZBY2NvdW50cy9kZWR1Y3QnLEpTT04uc3RyaW5naWZ5KHtjb29wZXJhdGl2ZUlkOmNvb3BlcmF0aXZlSWQsc3RhZmZJZDpzdGFmZklkLCBhbW91bnQ6IGFtb3VudCwgYWNjb3VudFR5cGU6IGFjY291bnRUeXBlfSksIHtyZXNwb25zZVR5cGU6ICdqc29uJyxoZWFkZXJzfSk7XHJcbiAgICB9IFxyXG5cclxuXHJcbiAgIFxyXG4gICAgXHJcbiAgICBnZXRDb29wZXJhdGl2ZVN0YWZmKHN0YWZmSWQ6IFN0cmluZyxjb29wZXJhdGl2ZUlkOiBTdHJpbmcpOiBPYnNlcnZhYmxlPGFueT4ge1xyXG4gICAgICAgIC8vdGhpcy5hcGlVcmwgPSB0aGlzLmFwaVVybCArICdzdHVkZW50JztcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIiBSZXR1cm4gU3R1ZGVudCBJZCAyIFwiICsgc3R1ZGVudElkKTtcclxuICAgICAgICAvL2xldCBwYXJhbXMgPSBuZXcgSHR0cFBhcmFtcygpLnNldCgnX2lkJywgc3R1ZGVudElkKTtcclxuICAgICAgICAvLyB2YXIgY3VycmVudFVzZXIgOiBhbnkgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnY3VycmVudFVzZXInKTtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIkN1cnJlbnQgVXNlciAxIFwiICsgY3VycmVudFVzZXIudG9rZW4pO1xyXG4gICAgICAgLy8gY29uc3QgaGVhZGVycyA9IG5ldyBIdHRwSGVhZGVycygpLnNldChcIkF1dGhvcml6YXRpb25cIiwgXCJKV1QgXCIgKyBjdXJyZW50VXNlci50b2tlbik7XHJcblxyXG4vLyAgICAgICAgIGxldCBoZWFkZXJzID0gbmV3IEh0dHBIZWFkZXJzKCk7XHJcbi8vIGhlYWRlcnMgPSBoZWFkZXJzLmFwcGVuZChcIkF1dGhvcml6YXRpb25cIiwgXCJKV1QgXCIgKyBcImV5SjBlWEFpT2lKS1YxUWlMQ0poYkdjaU9pSklVekkxTmlKOS5leUpwWkNJNklqZzJNRGxrWXpreExUQTNaRE10TkRBM05DMWlNR1F4TFdWa05qUXlaak13WVRZNVpDSjkua3BXeHdOUGJRdkcxbDNWYjhWYjZSUXdDa3kxU3F5ZGhGUHRJQ29oeUQxQVwiKTtcclxuLy8gaGVhZGVycyA9IGhlYWRlcnMuYXBwZW5kKFwiQ29udGVudC1UeXBlXCIsIFwiYXBwbGljYXRpb24vanNvblwiKTtcclxuXHJcbmxldCBoZWFkZXJzID0gbmV3IEh0dHBIZWFkZXJzKCk7XHJcbmhlYWRlcnMgPSBoZWFkZXJzLmFwcGVuZChcIkNvbnRlbnQtVHlwZVwiLCBcImFwcGxpY2F0aW9uL2pzb25cIik7XHJcblxyXG5cclxuXHJcblxyXG4gICAgICAgIC8vQXV0aG9yaXphdGlvbjogXCJKV1QgXCIgKyBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnY3VycmVudFVzZXInKS50b2tlblxyXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0PGFueT4odGhpcy5hcGlVcmwgKyAnY29vcGVyYXRpdmVzdGFmZnMvJyArIHN0YWZmSWQgKyBcIi9cIisgY29vcGVyYXRpdmVJZCwge3Jlc3BvbnNlVHlwZTogJ2pzb24nLGhlYWRlcnN9KTtcclxuICAgIH0gXHJcblxyXG5cclxuXHJcbiAgICAgICAgXHJcbiAgICB2ZXJpZnlBdXRoVG9DcmVhdExhdGVyKHZlcmlmeUF1dGg6IENvb3BlcmF0aXZlU3RhZmYpOiBPYnNlcnZhYmxlPGFueT4ge1xyXG4gICAgICAgIC8vdGhpcy5hcGlVcmwgPSB0aGlzLmFwaVVybCArICdzdHVkZW50JztcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIiBSZXR1cm4gU3R1ZGVudCBJZCAyIFwiICsgc3R1ZGVudElkKTtcclxuICAgICAgICAvL2xldCBwYXJhbXMgPSBuZXcgSHR0cFBhcmFtcygpLnNldCgnX2lkJywgc3R1ZGVudElkKTtcclxuICAgICAgICAvLyB2YXIgY3VycmVudFVzZXIgOiBhbnkgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnY3VycmVudFVzZXInKTtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIkN1cnJlbnQgVXNlciAxIFwiICsgY3VycmVudFVzZXIudG9rZW4pO1xyXG4gICAgICAgLy8gY29uc3QgaGVhZGVycyA9IG5ldyBIdHRwSGVhZGVycygpLnNldChcIkF1dGhvcml6YXRpb25cIiwgXCJKV1QgXCIgKyBjdXJyZW50VXNlci50b2tlbik7XHJcblxyXG4vLyAgICAgICAgIGxldCBoZWFkZXJzID0gbmV3IEh0dHBIZWFkZXJzKCk7XHJcbi8vIGhlYWRlcnMgPSBoZWFkZXJzLmFwcGVuZChcIkF1dGhvcml6YXRpb25cIiwgXCJKV1QgXCIgKyBcImV5SjBlWEFpT2lKS1YxUWlMQ0poYkdjaU9pSklVekkxTmlKOS5leUpwWkNJNklqZzJNRGxrWXpreExUQTNaRE10TkRBM05DMWlNR1F4TFdWa05qUXlaak13WVRZNVpDSjkua3BXeHdOUGJRdkcxbDNWYjhWYjZSUXdDa3kxU3F5ZGhGUHRJQ29oeUQxQVwiKTtcclxuLy8gaGVhZGVycyA9IGhlYWRlcnMuYXBwZW5kKFwiQ29udGVudC1UeXBlXCIsIFwiYXBwbGljYXRpb24vanNvblwiKTtcclxuXHJcbmxldCBoZWFkZXJzID0gbmV3IEh0dHBIZWFkZXJzKCk7XHJcbmhlYWRlcnMgPSBoZWFkZXJzLmFwcGVuZChcIkNvbnRlbnQtVHlwZVwiLCBcImFwcGxpY2F0aW9uL2pzb25cIik7XHJcblxyXG5cclxuXHJcbiAgICAgICAgLy9BdXRob3JpemF0aW9uOiBcIkpXVCBcIiArIGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdjdXJyZW50VXNlcicpLnRva2VuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0PGFueT4odGhpcy5hcGlVcmwgKyAndmVyaWZ5YXV0aHMnLEpTT04uc3RyaW5naWZ5KHtzdGFmZklkOnZlcmlmeUF1dGguc3RhZmZJZCwgY29vcGVyYXRpdmVJZDp2ZXJpZnlBdXRoLmNvb3BlcmF0aXZlSWQsZW1haWw6IHZlcmlmeUF1dGguZW1haWwsIHBob25lTnVtYmVyOiB2ZXJpZnlBdXRoLnBob25lLCBsYXN0TmFtZTp2ZXJpZnlBdXRoLm5hbWUsZmlyc3ROYW1lOnZlcmlmeUF1dGgubmFtZSxhdXRoVHlwZTpcIk5ld1wifSksIHtyZXNwb25zZVR5cGU6ICdqc29uJyxoZWFkZXJzfSk7XHJcbiAgICB9IFxyXG5cclxuXHJcbiAgXHJcblxyXG4gICAgXHJcblxyXG4gICBcclxuXHJcbiAgIHByaXZhdGUgZXh0cmFjdERhdGEocmVzOiBSZXNwb25zZSkge1xyXG5cdGxldCBib2R5ID0gcmVzLmpzb24oKTtcclxuICAgICAgICByZXR1cm4gYm9keTtcclxuICAgIH1cclxuICAgIHByaXZhdGUgaGFuZGxlRXJyb3IgKGVycm9yOiBSZXNwb25zZSB8IGFueSkge1xyXG5cdGNvbnNvbGUuZXJyb3IoZXJyb3IubWVzc2FnZSB8fCBlcnJvcik7XHJcblx0cmV0dXJuIE9ic2VydmFibGUudGhyb3coZXJyb3Iuc3RhdHVzKTtcclxuICAgIH1cclxuXHJcbiAgXHJcblxyXG59XHJcblxyXG5cclxuXHJcbiJdfQ==