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
var MemberService = /** @class */ (function () {
    function MemberService(http) {
        this.http = http;
        this.apiUrl = config_1.Config.apiUrl;
    }
    MemberService.prototype.getAllCooperative = function () {
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
        return this.http.get(this.apiUrl + 'cooperatives', { responseType: 'json', headers: headers });
    };
    MemberService.prototype.getCooperativeStaff = function (staffId, cooperativeId, mode, name, userType) {
        //         let headers = new HttpHeaders();
        // headers = headers.append("Authorization", "JWT " + "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6Ijg2MDlkYzkxLTA3ZDMtNDA3NC1iMGQxLWVkNjQyZjMwYTY5ZCJ9.kpWxwNPbQvG1l3Vb8Vb6RQwCky1SqydhFPtICohyD1A");
        // headers = headers.append("Content-Type", "application/json");
        var headers = new http_1.HttpHeaders();
        headers = headers.append("Content-Type", "application/json");
        //Authorization: "JWT " + localStorage.getItem('currentUser').token
        console.log("Name UserType" + name + " " + userType);
        return this.http.post(this.apiUrl + 'users/cooperativestaff', JSON.stringify({ id: staffId, cooperativeId: cooperativeId, mode: mode, name: name, usertype: userType }), { responseType: 'json', headers: headers });
    };
    MemberService.prototype.editPhoneNumber = function (userId, phoneNo) {
        //         let headers = new HttpHeaders();
        // headers = headers.append("Authorization", "JWT " + "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6Ijg2MDlkYzkxLTA3ZDMtNDA3NC1iMGQxLWVkNjQyZjMwYTY5ZCJ9.kpWxwNPbQvG1l3Vb8Vb6RQwCky1SqydhFPtICohyD1A");
        // headers = headers.append("Content-Type", "application/json");
        var headers = new http_1.HttpHeaders();
        headers = headers.append("Content-Type", "application/json");
        //Authorization: "JWT " + localStorage.getItem('currentUser').token
        return this.http.post(this.apiUrl + 'users/editphonenumber/' + userId, JSON.stringify({ phoneNo: phoneNo }), { responseType: 'json', headers: headers });
    };
    MemberService.prototype.editProfile = function (userId, phoneNo, firstName, lastName, email, profilePixURL, address) {
        //         let headers = new HttpHeaders();
        // headers = headers.append("Authorization", "JWT " + "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6Ijg2MDlkYzkxLTA3ZDMtNDA3NC1iMGQxLWVkNjQyZjMwYTY5ZCJ9.kpWxwNPbQvG1l3Vb8Vb6RQwCky1SqydhFPtICohyD1A");
        // headers = headers.append("Content-Type", "application/json");
        var headers = new http_1.HttpHeaders();
        headers = headers.append("Content-Type", "application/json");
        //Authorization: "JWT " + localStorage.getItem('currentUser').token
        return this.http.post(this.apiUrl + 'users/editprofile/' + userId, JSON.stringify({ phoneNo: phoneNo, firstName: firstName, lastName: lastName, email: email, profilePixURL: profilePixURL, address: address }), { responseType: 'json', headers: headers });
    };
    MemberService.prototype.changePin = function (userId, pin, confirmpin) {
        console.log("User Id in service " + userId);
        //         let headers = new HttpHeaders();
        // headers = headers.append("Authorization", "JWT " + "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6Ijg2MDlkYzkxLTA3ZDMtNDA3NC1iMGQxLWVkNjQyZjMwYTY5ZCJ9.kpWxwNPbQvG1l3Vb8Vb6RQwCky1SqydhFPtICohyD1A");
        // headers = headers.append("Content-Type", "application/json");
        var headers = new http_1.HttpHeaders();
        headers = headers.append("Content-Type", "application/json");
        //Authorization: "JWT " + localStorage.getItem('currentUser').token
        return this.http.post(this.apiUrl + 'users/changepin/' + userId, JSON.stringify({ pin: pin, confirmpin: confirmpin }), { responseType: 'json', headers: headers });
    };
    MemberService.prototype.setAccountDetails = function (userId, accountname, accountnumber, bankId) {
        console.log("User Id in service " + userId);
        //         let headers = new HttpHeaders();
        // headers = headers.append("Authorization", "JWT " + "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6Ijg2MDlkYzkxLTA3ZDMtNDA3NC1iMGQxLWVkNjQyZjMwYTY5ZCJ9.kpWxwNPbQvG1l3Vb8Vb6RQwCky1SqydhFPtICohyD1A");
        // headers = headers.append("Content-Type", "application/json");
        var headers = new http_1.HttpHeaders();
        headers = headers.append("Content-Type", "application/json");
        //Authorization: "JWT " + localStorage.getItem('currentUser').token
        return this.http.post(this.apiUrl + 'users/setaccountdetails/' + userId, JSON.stringify({ accountnumber: accountnumber, accountname: accountname, bankId: bankId }), { responseType: 'json', headers: headers });
    };
    MemberService.prototype.extractData = function (res) {
        var body = res.json();
        return body;
    };
    MemberService.prototype.handleError = function (error) {
        console.error(error.message || error);
        return Observable_1.Observable.throw(error.status);
    };
    MemberService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], MemberService);
    return MemberService;
}());
exports.MemberService = MemberService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVtYmVyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJtZW1iZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUEyQztBQUMzQywwRUFBMEU7QUFDMUUsMENBQTBDO0FBQzFDLDZDQUE0SDtBQUM1SCxvQ0FBb0M7QUFDcEMsOENBQTZDO0FBQzdDLGlDQUErQjtBQUkvQiwyQ0FBMEM7QUFLMUM7SUFHSSx1QkFBb0IsSUFBZ0I7UUFBaEIsU0FBSSxHQUFKLElBQUksQ0FBWTtRQUZuQyxXQUFNLEdBQVksZUFBTSxDQUFDLE1BQU0sQ0FBQztJQUVPLENBQUM7SUFJekMseUNBQWlCLEdBQWpCO1FBQ0ksd0NBQXdDO1FBQ3hDLG9EQUFvRDtRQUNwRCxzREFBc0Q7UUFDdEQsK0RBQStEO1FBQy9ELHNEQUFzRDtRQUN2RCxzRkFBc0Y7UUFFN0YsMkNBQTJDO1FBQzNDLHVNQUF1TTtRQUN2TSxnRUFBZ0U7UUFFaEUsSUFBSSxPQUFPLEdBQUcsSUFBSSxrQkFBVyxFQUFFLENBQUM7UUFDaEMsT0FBTyxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsY0FBYyxFQUFFLGtCQUFrQixDQUFDLENBQUM7UUFLckQsbUVBQW1FO1FBQ25FLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBTSxJQUFJLENBQUMsTUFBTSxHQUFHLGNBQWMsRUFBRSxFQUFDLFlBQVksRUFBRSxNQUFNLEVBQUMsT0FBTyxTQUFBLEVBQUMsQ0FBQyxDQUFDO0lBQzVGLENBQUM7SUFHRCwyQ0FBbUIsR0FBbkIsVUFBb0IsT0FBZSxFQUFDLGFBQXFCLEVBQUUsSUFBWSxFQUFFLElBQVksRUFBRSxRQUFnQjtRQUduRywyQ0FBMkM7UUFDM0MsdU1BQXVNO1FBQ3ZNLGdFQUFnRTtRQUVoRSxJQUFJLE9BQU8sR0FBRyxJQUFJLGtCQUFXLEVBQUUsQ0FBQztRQUNoQyxPQUFPLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxjQUFjLEVBQUUs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c0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG4vL2ltcG9ydCB7IEh0dHAsIEhlYWRlcnMsIFJlcXVlc3RPcHRpb25zLCBSZXNwb25zZSB9IGZyb20gJ0Bhbmd1bGFyL2h0dHAnO1xyXG4vLyBjb25zdCBjYWNoZWRFeHRlbmRzID0gZ2xvYmFsLl9fZXh0ZW5kcztcclxuaW1wb3J0IHtIdHRwQ2xpZW50LEh0dHBFdmVudCwgSHR0cEhhbmRsZXIsIEh0dHBJbnRlcmNlcHRvciwgSHR0cFJlcXVlc3QsSHR0cEhlYWRlcnMsSHR0cFBhcmFtc30gZnJvbSBcIkBhbmd1bGFyL2NvbW1vbi9odHRwXCI7XHJcbi8vIGdsb2JhbC5fX2V4dGVuZHMgPSBjYWNoZWRFeHRlbmRzO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcclxuaW1wb3J0ICdyeGpzL2FkZC9vcGVyYXRvci9tYXAnO1xyXG5cclxuaW1wb3J0IHsgQ29vcGVyYXRpdmUgfSBmcm9tICcuLi9tb2RlbHMvaW5kZXgnO1xyXG5cclxuaW1wb3J0IHsgQ29uZmlnIH0gZnJvbSBcIi4uL3NoYXJlZC9jb25maWdcIjtcclxuXHJcblxyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgTWVtYmVyU2VydmljZSB7XHJcbiAgICAgYXBpVXJsOiBzdHJpbmcgID0gQ29uZmlnLmFwaVVybDtcclxuICAgIFxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50KSB7IH1cclxuXHJcbiAgIFxyXG4gICAgXHJcbiAgICBnZXRBbGxDb29wZXJhdGl2ZSgpOiBPYnNlcnZhYmxlPGFueT4ge1xyXG4gICAgICAgIC8vdGhpcy5hcGlVcmwgPSB0aGlzLmFwaVVybCArICdzdHVkZW50JztcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIiBSZXR1cm4gU3R1ZGVudCBJZCAyIFwiICsgc3R1ZGVudElkKTtcclxuICAgICAgICAvL2xldCBwYXJhbXMgPSBuZXcgSHR0cFBhcmFtcygpLnNldCgnX2lkJywgc3R1ZGVudElkKTtcclxuICAgICAgICAvLyB2YXIgY3VycmVudFVzZXIgOiBhbnkgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnY3VycmVudFVzZXInKTtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIkN1cnJlbnQgVXNlciAxIFwiICsgY3VycmVudFVzZXIudG9rZW4pO1xyXG4gICAgICAgLy8gY29uc3QgaGVhZGVycyA9IG5ldyBIdHRwSGVhZGVycygpLnNldChcIkF1dGhvcml6YXRpb25cIiwgXCJKV1QgXCIgKyBjdXJyZW50VXNlci50b2tlbik7XHJcblxyXG4vLyAgICAgICAgIGxldCBoZWFkZXJzID0gbmV3IEh0dHBIZWFkZXJzKCk7XHJcbi8vIGhlYWRlcnMgPSBoZWFkZXJzLmFwcGVuZChcIkF1dGhvcml6YXRpb25cIiwgXCJKV1QgXCIgKyBcImV5SjBlWEFpT2lKS1YxUWlMQ0poYkdjaU9pSklVekkxTmlKOS5leUpwWkNJNklqZzJNRGxrWXpreExUQTNaRE10TkRBM05DMWlNR1F4TFdWa05qUXlaak13WVRZNVpDSjkua3BXeHdOUGJRdkcxbDNWYjhWYjZSUXdDa3kxU3F5ZGhGUHRJQ29oeUQxQVwiKTtcclxuLy8gaGVhZGVycyA9IGhlYWRlcnMuYXBwZW5kKFwiQ29udGVudC1UeXBlXCIsIFwiYXBwbGljYXRpb24vanNvblwiKTtcclxuXHJcbmxldCBoZWFkZXJzID0gbmV3IEh0dHBIZWFkZXJzKCk7XHJcbmhlYWRlcnMgPSBoZWFkZXJzLmFwcGVuZChcIkNvbnRlbnQtVHlwZVwiLCBcImFwcGxpY2F0aW9uL2pzb25cIik7XHJcblxyXG5cclxuXHJcblxyXG4gICAgICAgIC8vQXV0aG9yaXphdGlvbjogXCJKV1QgXCIgKyBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnY3VycmVudFVzZXInKS50b2tlblxyXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0PGFueT4odGhpcy5hcGlVcmwgKyAnY29vcGVyYXRpdmVzJywge3Jlc3BvbnNlVHlwZTogJ2pzb24nLGhlYWRlcnN9KTtcclxuICAgIH0gXHJcblxyXG5cclxuICAgIGdldENvb3BlcmF0aXZlU3RhZmYoc3RhZmZJZDogU3RyaW5nLGNvb3BlcmF0aXZlSWQ6IFN0cmluZywgbW9kZTogU3RyaW5nLCBuYW1lOiBTdHJpbmcsIHVzZXJUeXBlOiBTdHJpbmcpOiBPYnNlcnZhYmxlPGFueT4ge1xyXG5cclxuXHJcbiAgICAgICAgLy8gICAgICAgICBsZXQgaGVhZGVycyA9IG5ldyBIdHRwSGVhZGVycygpO1xyXG4gICAgICAgIC8vIGhlYWRlcnMgPSBoZWFkZXJzLmFwcGVuZChcIkF1dGhvcml6YXRpb25cIiwgXCJKV1QgXCIgKyBcImV5SjBlWEFpT2lKS1YxUWlMQ0poYkdjaU9pSklVekkxTmlKOS5leUpwWkNJNklqZzJNRGxrWXpreExUQTNaRE10TkRBM05DMWlNR1F4TFdWa05qUXlaak13WVRZNVpDSjkua3BXeHdOUGJRdkcxbDNWYjhWYjZSUXdDa3kxU3F5ZGhGUHRJQ29oeUQxQVwiKTtcclxuICAgICAgICAvLyBoZWFkZXJzID0gaGVhZGVycy5hcHBlbmQoXCJDb250ZW50LVR5cGVcIiwgXCJhcHBsaWNhdGlvbi9qc29uXCIpO1xyXG5cclxuICAgICAgICBsZXQgaGVhZGVycyA9IG5ldyBIdHRwSGVhZGVycygpO1xyXG4gICAgICAgIGhlYWRlcnMgPSBoZWFkZXJzLmFwcGVuZChcIkNvbnRlbnQtVHlwZVwiLCBcImFwcGxpY2F0aW9uL2pzb25cIik7XHJcblxyXG5cclxuICAgICAgICAvL0F1dGhvcml6YXRpb246IFwiSldUIFwiICsgbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2N1cnJlbnRVc2VyJykudG9rZW5cclxuICAgICAgICBjb25zb2xlLmxvZyhcIk5hbWUgVXNlclR5cGVcIiArIG5hbWUgKyBcIiBcIisgdXNlclR5cGUpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAucG9zdDxhbnk+KHRoaXMuYXBpVXJsICsgJ3VzZXJzL2Nvb3BlcmF0aXZlc3RhZmYnICxKU09OLnN0cmluZ2lmeSh7aWQ6c3RhZmZJZCxjb29wZXJhdGl2ZUlkOmNvb3BlcmF0aXZlSWQsbW9kZTptb2RlLG5hbWU6bmFtZSx1c2VydHlwZTp1c2VyVHlwZX0pLCB7cmVzcG9uc2VUeXBlOiAnanNvbicsaGVhZGVyc30pO1xyXG4gICAgfSBcclxuXHJcbiAgICBlZGl0UGhvbmVOdW1iZXIodXNlcklkOiBTdHJpbmcsIHBob25lTm86IFN0cmluZyk6IE9ic2VydmFibGU8YW55PiB7XHJcblxyXG5cclxuICAgICAgICAvLyAgICAgICAgIGxldCBoZWFkZXJzID0gbmV3IEh0dHBIZWFkZXJzKCk7XHJcbiAgICAgICAgLy8gaGVhZGVycyA9IGhlYWRlcnMuYXBwZW5kKFwiQXV0aG9yaXphdGlvblwiLCBcIkpXVCBcIiArIFwiZXlKMGVYQWlPaUpLVjFRaUxDSmhiR2NpT2lKSVV6STFOaUo5LmV5SnBaQ0k2SWpnMk1EbGtZemt4TFRBM1pETXROREEzTkMxaU1HUXhMV1ZrTmpReVpqTXdZVFk1WkNKOS5rcFd4d05QYlF2RzFsM1ZiOFZiNlJRd0NreTFTcXlkaEZQdElDb2h5RDFBXCIpO1xyXG4gICAgICAgIC8vIGhlYWRlcnMgPSBoZWFkZXJzLmFwcGVuZChcIkNvbnRlbnQtVHlwZVwiLCBcImFwcGxpY2F0aW9uL2pzb25cIik7XHJcblxyXG4gICAgICAgIGxldCBoZWFkZXJzID0gbmV3IEh0dHBIZWFkZXJzKCk7XHJcbiAgICAgICAgaGVhZGVycyA9IGhlYWRlcnMuYXBwZW5kKFwiQ29udGVudC1UeXBlXCIsIFwiYXBwbGljYXRpb24vanNvblwiKTtcclxuXHJcblxyXG4gICAgICAgIC8vQXV0aG9yaXphdGlvbjogXCJKV1QgXCIgKyBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnY3VycmVudFVzZXInKS50b2tlblxyXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAucG9zdDxhbnk+KHRoaXMuYXBpVXJsICsgJ3VzZXJzL2VkaXRwaG9uZW51bWJlci8nICsgdXNlcklkLEpTT04uc3RyaW5naWZ5KHtwaG9uZU5vOnBob25lTm99KSAsIHtyZXNwb25zZVR5cGU6ICdqc29uJyxoZWFkZXJzfSk7XHJcbiAgICB9IFxyXG5cclxuICAgIGVkaXRQcm9maWxlKHVzZXJJZDogU3RyaW5nLCBwaG9uZU5vOiBTdHJpbmcsIGZpcnN0TmFtZTogU3RyaW5nLGxhc3ROYW1lOiBTdHJpbmcsZW1haWw6IFN0cmluZyxwcm9maWxlUGl4VVJMOiBTdHJpbmcsIGFkZHJlc3M6IEFycmF5PGFueT4gKTogT2JzZXJ2YWJsZTxhbnk+IHtcclxuXHJcblxyXG4gICAgICBcclxuICAgICAgICAvLyAgICAgICAgIGxldCBoZWFkZXJzID0gbmV3IEh0dHBIZWFkZXJzKCk7XHJcbiAgICAgICAgLy8gaGVhZGVycyA9IGhlYWRlcnMuYXBwZW5kKFwiQXV0aG9yaXphdGlvblwiLCBcIkpXVCBcIiArIFwiZXlKMGVYQWlPaUpLVjFRaUxDSmhiR2NpT2lKSVV6STFOaUo5LmV5SnBaQ0k2SWpnMk1EbGtZemt4TFRBM1pETXROREEzTkMxaU1HUXhMV1ZrTmpReVpqTXdZVFk1WkNKOS5rcFd4d05QYlF2RzFsM1ZiOFZiNlJRd0NreTFTcXlkaEZQdElDb2h5RDFBXCIpO1xyXG4gICAgICAgIC8vIGhlYWRlcnMgPSBoZWFkZXJzLmFwcGVuZChcIkNvbnRlbnQtVHlwZVwiLCBcImFwcGxpY2F0aW9uL2pzb25cIik7XHJcblxyXG4gICAgICAgIGxldCBoZWFkZXJzID0gbmV3IEh0dHBIZWFkZXJzKCk7XHJcbiAgICAgICAgaGVhZGVycyA9IGhlYWRlcnMuYXBwZW5kKFwiQ29udGVudC1UeXBlXCIsIFwiYXBwbGljYXRpb24vanNvblwiKTtcclxuXHJcblxyXG4gICAgICAgIC8vQXV0aG9yaXphdGlvbjogXCJKV1QgXCIgKyBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnY3VycmVudFVzZXInKS50b2tlblxyXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAucG9zdDxhbnk+KHRoaXMuYXBpVXJsICsgJ3VzZXJzL2VkaXRwcm9maWxlLycgKyB1c2VySWQsSlNPTi5zdHJpbmdpZnkoe3Bob25lTm86cGhvbmVObyxmaXJzdE5hbWU6Zmlyc3ROYW1lLGxhc3ROYW1lOmxhc3ROYW1lLGVtYWlsOmVtYWlsLHByb2ZpbGVQaXhVUkw6cHJvZmlsZVBpeFVSTCxhZGRyZXNzOmFkZHJlc3N9KSAsIHtyZXNwb25zZVR5cGU6ICdqc29uJyxoZWFkZXJzfSk7XHJcbiAgICB9IFxyXG5cclxuICAgIGNoYW5nZVBpbih1c2VySWQ6IFN0cmluZyxwaW46U3RyaW5nLGNvbmZpcm1waW46IFN0cmluZyk6IE9ic2VydmFibGU8YW55PiB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJVc2VyIElkIGluIHNlcnZpY2UgXCIrICB1c2VySWQpO1xyXG5cclxuICAgICAgICAvLyAgICAgICAgIGxldCBoZWFkZXJzID0gbmV3IEh0dHBIZWFkZXJzKCk7XHJcbiAgICAgICAgLy8gaGVhZGVycyA9IGhlYWRlcnMuYXBwZW5kKFwiQXV0aG9yaXphdGlvblwiLCBcIkpXVCBcIiArIFwiZXlKMGVYQWlPaUpLVjFRaUxDSmhiR2NpT2lKSVV6STFOaUo5LmV5SnBaQ0k2SWpnMk1EbGtZemt4TFRBM1pETXROREEzTkMxaU1HUXhMV1ZrTmpReVpqTXdZVFk1WkNKOS5rcFd4d05QYlF2RzFsM1ZiOFZiNlJRd0NreTFTcXlkaEZQdElDb2h5RDFBXCIpO1xyXG4gICAgICAgIC8vIGhlYWRlcnMgPSBoZWFkZXJzLmFwcGVuZChcIkNvbnRlbnQtVHlwZVwiLCBcImFwcGxpY2F0aW9uL2pzb25cIik7XHJcblxyXG4gICAgICAgIGxldCBoZWFkZXJzID0gbmV3IEh0dHBIZWFkZXJzKCk7XHJcbiAgICAgICAgaGVhZGVycyA9IGhlYWRlcnMuYXBwZW5kKFwiQ29udGVudC1UeXBlXCIsIFwiYXBwbGljYXRpb24vanNvblwiKTtcclxuXHJcblxyXG4gICAgICAgIC8vQXV0aG9yaXphdGlvbjogXCJKV1QgXCIgKyBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnY3VycmVudFVzZXInKS50b2tlblxyXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAucG9zdDxhbnk+KHRoaXMuYXBpVXJsICsgJ3VzZXJzL2NoYW5nZXBpbi8nICsgdXNlcklkICxKU09OLnN0cmluZ2lmeSh7cGluOnBpbixjb25maXJtcGluOmNvbmZpcm1waW59KSwge3Jlc3BvbnNlVHlwZTogJ2pzb24nLGhlYWRlcnN9KTtcclxuICAgIH0gXHJcblxyXG4gICAgc2V0QWNjb3VudERldGFpbHModXNlcklkOiBTdHJpbmcsYWNjb3VudG5hbWU6U3RyaW5nLGFjY291bnRudW1iZXI6IFN0cmluZywgYmFua0lkOiBTdHJpbmcpOiBPYnNlcnZhYmxlPGFueT4ge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiVXNlciBJZCBpbiBzZXJ2aWNlIFwiKyAgdXNlcklkKTtcclxuXHJcbiAgICAgICAgLy8gICAgICAgICBsZXQgaGVhZGVycyA9IG5ldyBIdHRwSGVhZGVycygpO1xyXG4gICAgICAgIC8vIGhlYWRlcnMgPSBoZWFkZXJzLmFwcGVuZChcIkF1dGhvcml6YXRpb25cIiwgXCJKV1QgXCIgKyBcImV5SjBlWEFpT2lKS1YxUWlMQ0poYkdjaU9pSklVekkxTmlKOS5leUpwWkNJNklqZzJNRGxrWXpreExUQTNaRE10TkRBM05DMWlNR1F4TFdWa05qUXlaak13WVRZNVpDSjkua3BXeHdOUGJRdkcxbDNWYjhWYjZSUXdDa3kxU3F5ZGhGUHRJQ29oeUQxQVwiKTtcclxuICAgICAgICAvLyBoZWFkZXJzID0gaGVhZGVycy5hcHBlbmQoXCJDb250ZW50LVR5cGVcIiwgXCJhcHBsaWNhdGlvbi9qc29uXCIpO1xyXG5cclxuICAgICAgICBsZXQgaGVhZGVycyA9IG5ldyBIdHRwSGVhZGVycygpO1xyXG4gICAgICAgIGhlYWRlcnMgPSBoZWFkZXJzLmFwcGVuZChcIkNvbnRlbnQtVHlwZVwiLCBcImFwcGxpY2F0aW9uL2pzb25cIik7XHJcblxyXG5cclxuICAgICAgICAvL0F1dGhvcml6YXRpb246IFwiSldUIFwiICsgbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2N1cnJlbnRVc2VyJykudG9rZW5cclxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLnBvc3Q8YW55Pih0aGlzLmFwaVVybCArICd1c2Vycy9zZXRhY2NvdW50ZGV0YWlscy8nICsgdXNlcklkICxKU09OLnN0cmluZ2lmeSh7YWNjb3VudG51bWJlcjphY2NvdW50bnVtYmVyLGFjY291bnRuYW1lOmFjY291bnRuYW1lLCBiYW5rSWQ6YmFua0lkfSksIHtyZXNwb25zZVR5cGU6ICdqc29uJyxoZWFkZXJzfSk7XHJcbiAgICB9IFxyXG5cclxuXHJcblxyXG5cclxuICBcclxuXHJcbiAgICBcclxuXHJcbiAgIFxyXG5cclxuICAgcHJpdmF0ZSBleHRyYWN0RGF0YShyZXM6IFJlc3BvbnNlKSB7XHJcblx0bGV0IGJvZHkgPSByZXMuanNvbigpO1xyXG4gICAgICAgIHJldHVybiBib2R5O1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBoYW5kbGVFcnJvciAoZXJyb3I6IFJlc3BvbnNlIHwgYW55KSB7XHJcblx0Y29uc29sZS5lcnJvcihlcnJvci5tZXNzYWdlIHx8IGVycm9yKTtcclxuXHRyZXR1cm4gT2JzZXJ2YWJsZS50aHJvdyhlcnJvci5zdGF0dXMpO1xyXG4gICAgfVxyXG5cclxuICBcclxuXHJcbn1cclxuXHJcblxyXG5cclxuIl19