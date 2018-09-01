"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
//import { Http, Headers, RequestOptions, Response } from '@angular/http';
// const cachedExtends = global.__extends;
var http_1 = require("@angular/common/http");
// global.__extends = cachedExtends;
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/operator/map");
var config_1 = require("../shared/config");
Promise.resolve().then(function () { return require("nativescript-localstorage"); });
var AuthService = /** @class */ (function () {
    function AuthService(http, router) {
        this.http = http;
        this.router = router;
        this.apiUrl = config_1.Config.apiUrl;
    }
    AuthService.prototype.authenticateUser = function (username, password) {
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
        return this.http.post(this.apiUrl + 'auth', JSON.stringify({ username: username, password: password }), { responseType: 'json', headers: headers });
    };
    AuthService.prototype.login = function (email, password) {
        //  console.log("API Login" + Config.apiUrlLogin );
        return this.http.post(this.apiUrl + "auth", JSON.stringify({ cooperId: email, password: password }), {
            headers: new http_1.HttpHeaders().set('Content-Type', 'application/json'),
        }).map(function (response) {
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
            var token = response && val;
            if (token) {
                // console.log("Response from Auth new "+ JSON.stringify(response) );
                localStorage.setItem('currentUser', JSON.stringify(response["data"]["user"]));
                localStorage.setItem('currentUserToken', JSON.stringify(response["data"]["token"]));
                // return true to indicate successful login
                // return true;
            }
            else {
                // return false to indicate failed login
                // return false;
            }
        });
    };
    AuthService.prototype.logout = function () {
        // clear token remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        localStorage.removeItem('currentUserToken');
        this.router.navigate(['/login']);
    };
    AuthService.prototype.forgetPassword = function (email) {
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
            var headers = new http_1.HttpHeaders();
            headers = headers.append("Content-Type", "application/json");
            //Authorization: "JWT " + localStorage.getItem('currentUser').token
            return this.http.post(this.apiUrl + 'users/forgot', JSON.stringify({ email: email }), { responseType: 'json', headers: headers });
        }
    };
    AuthService.prototype.resetPassword = function (userId, oldPassword, newPassword, verifyPassword, userMode) {
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
            var headers = new http_1.HttpHeaders();
            headers = headers.append("Content-Type", "application/json");
            //Authorization: "JWT " + localStorage.getItem('currentUser').token
            return this.http.post(this.apiUrl + 'users/resetpassword/' + userId, JSON.stringify({ oldPassword: oldPassword, newPassword: newPassword, verifyPassword: verifyPassword, userMode: userMode }), { responseType: 'json', headers: headers });
        }
    };
    AuthService.prototype.getuserResetToken = function (Id) {
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
        return this.http.get(this.apiUrl + 'users/token/' + Id, { responseType: 'json', headers: headers });
    };
    AuthService.prototype.sendToken = function (userId) {
        //         let headers = new HttpHeaders();
        // headers = headers.append("Authorization", "JWT " + "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6Ijg2MDlkYzkxLTA3ZDMtNDA3NC1iMGQxLWVkNjQyZjMwYTY5ZCJ9.kpWxwNPbQvG1l3Vb8Vb6RQwCky1SqydhFPtICohyD1A");
        // headers = headers.append("Content-Type", "application/json");
        var headers = new http_1.HttpHeaders();
        headers = headers.append("Content-Type", "application/json");
        //Authorization: "JWT " + localStorage.getItem('currentUser').token
        return this.http.get(this.apiUrl + 'verifyauths/sendotp/' + userId, { responseType: 'json', headers: headers });
    };
    AuthService.prototype.getToken = function (token, userId) {
        //         let headers = new HttpHeaders();
        // headers = headers.append("Authorization", "JWT " + "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6Ijg2MDlkYzkxLTA3ZDMtNDA3NC1iMGQxLWVkNjQyZjMwYTY5ZCJ9.kpWxwNPbQvG1l3Vb8Vb6RQwCky1SqydhFPtICohyD1A");
        // headers = headers.append("Content-Type", "application/json");
        var headers = new http_1.HttpHeaders();
        headers = headers.append("Content-Type", "application/json");
        //Authorization: "JWT " + localStorage.getItem('currentUser').token
        return this.http.get(this.apiUrl + 'verifyauths/' + token + "/" + userId, { responseType: 'json', headers: headers });
    };
    AuthService.prototype.checkTransPin = function (Id, pin) {
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
        return this.http.post(this.apiUrl + 'users/checkpin', JSON.stringify({ userId: Id, pin: pin }), { responseType: 'json', headers: headers });
    };
    AuthService.prototype.systemconfig = function () {
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
            var headers = new http_1.HttpHeaders();
            headers = headers.append("Content-Type", "application/json");
            //Authorization: "JWT " + localStorage.getItem('currentUser').token
            return this.http.get(this.apiUrl + 'systemconfigurations/firstsystemconfig', { responseType: 'json', headers: headers });
        }
    };
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
    AuthService.prototype.extractData = function (res) {
        var body = res.json();
        return body;
    };
    AuthService.prototype.handleError = function (error) {
        console.error(error.message || error);
        return Observable_1.Observable.throw(error.status);
    };
    AuthService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient, router_1.Router])
    ], AuthService);
    return AuthService;
}());
exports.AuthService = AuthService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXV0aC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTJDO0FBQzNDLDBDQUFtRztBQUNuRywwRUFBMEU7QUFDMUUsMENBQTBDO0FBQzFDLDZDQUE0SDtBQUM1SCxvQ0FBb0M7QUFDcEMsOENBQTZDO0FBQzdDLGlDQUErQjtBQUkvQiwyQ0FBMEM7QUFFMUMsb0RBQVMsMkJBQTJCLE1BQUc7QUFHdkM7SUFHSSxxQkFBb0IsSUFBZ0IsRUFBUyxNQUFjO1FBQXZDLFNBQUksR0FBSixJQUFJLENBQVk7UUFBUyxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBRjFELFdBQU0sR0FBWSxlQUFNLENBQUMsTUFBTSxDQUFDO0lBRThCLENBQUM7SUFTaEUsc0NBQWdCLEdBQWhCLFVBQWlCLFFBQWdCLEVBQUUsUUFBZTtRQUM5Qyx3Q0FBd0M7UUFDeEMsb0RBQW9EO1FBQ3BELHNEQUFzRDtRQUN0RCwrREFBK0Q7UUFDL0Qsc0RBQXNEO1FBQ3ZELHNGQUFzRjtRQUU3RiwyQ0FBMkM7UUFDM0MsdU1BQXVNO1FBQ3ZNLGdFQUFnRTtRQUVoRSxJQUFJLE9BQU8sR0FBRyxJQUFJLGtCQUFXLEVBQUUsQ0FBQztRQUNoQyxPQUFPLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxjQUFjLEVBQUUsa0JBQWtCLENBQUMsQ0FBQztRQUlyRCxtRUFBbUU7UUFDbkUsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFNLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxFQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBQyxRQUFRLEVBQUMsUUFBUSxFQUFFLFFBQVEsRUFBQyxRQUFRLEVBQUMsQ0FBQyxFQUFFLEVBQUMsWUFBWSxFQUFFLE1BQU0sRUFBQyxPQUFPLFNBQUEsRUFBQyxDQUFDLENBQUM7SUFDNUksQ0FBQztJQUVELDJCQUFLLEdBQUwsVUFBTSxLQUFhLEVBQUUs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QXFCO1FBQzdDLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLE9BQU8sSUFBSSxLQUFLLENBQUMsQ0FBQztRQUN0QyxNQUFNLENBQUMsdUJBQVUsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ25DLENBQUM7SUFwUlEsV0FBVztRQUR2QixpQkFBVSxFQUFFO3lDQUlpQixpQkFBVSxFQUFpQixlQUFNO09BSGxELFdBQVcsQ0F3UnZCO0lBQUQsa0JBQUM7Q0FBQSxBQXhSRCxJQXdSQztBQXhSWSxrQ0FBVyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgUm91dGVyLCBDYW5BY3RpdmF0ZSwgQWN0aXZhdGVkUm91dGVTbmFwc2hvdCwgUm91dGVyU3RhdGVTbmFwc2hvdCB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcbi8vaW1wb3J0IHsgSHR0cCwgSGVhZGVycywgUmVxdWVzdE9wdGlvbnMsIFJlc3BvbnNlIH0gZnJvbSAnQGFuZ3VsYXIvaHR0cCc7XHJcbi8vIGNvbnN0IGNhY2hlZEV4dGVuZHMgPSBnbG9iYWwuX19leHRlbmRzO1xyXG5pbXBvcnQge0h0dHBDbGllbnQsSHR0cEV2ZW50LCBIdHRwSGFuZGxlciwgSHR0cEludGVyY2VwdG9yLCBIdHRwUmVxdWVzdCxIdHRwSGVhZGVycyxIdHRwUGFyYW1zfSBmcm9tIFwiQGFuZ3VsYXIvY29tbW9uL2h0dHBcIjtcclxuLy8gZ2xvYmFsLl9fZXh0ZW5kcyA9IGNhY2hlZEV4dGVuZHM7XHJcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xyXG5pbXBvcnQgJ3J4anMvYWRkL29wZXJhdG9yL21hcCc7XHJcblxyXG5pbXBvcnQgeyBDb29wZXJhdGl2ZSxWZXJpZnlBdXRoIH0gZnJvbSAnLi4vbW9kZWxzL2luZGV4JztcclxuXHJcbmltcG9ydCB7IENvbmZpZyB9IGZyb20gXCIuLi9zaGFyZWQvY29uZmlnXCI7XHJcblxyXG5pbXBvcnQgKCBcIm5hdGl2ZXNjcmlwdC1sb2NhbHN0b3JhZ2VcIiApO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgQXV0aFNlcnZpY2Uge1xyXG4gICAgIGFwaVVybDogc3RyaW5nICA9IENvbmZpZy5hcGlVcmw7XHJcbiAgICBcclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgaHR0cDogSHR0cENsaWVudCxwcml2YXRlIHJvdXRlcjogUm91dGVyKSB7IH1cclxuXHJcbiAgIFxyXG4gICAgXHJcbiAgIFxyXG5cclxuXHJcblxyXG4gICAgICAgIFxyXG4gICAgYXV0aGVudGljYXRlVXNlcih1c2VybmFtZTogc3RyaW5nLCBwYXNzd29yZDpzdHJpbmcpOiBPYnNlcnZhYmxlPGFueT4ge1xyXG4gICAgICAgIC8vdGhpcy5hcGlVcmwgPSB0aGlzLmFwaVVybCArICdzdHVkZW50JztcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIiBSZXR1cm4gU3R1ZGVudCBJZCAyIFwiICsgc3R1ZGVudElkKTtcclxuICAgICAgICAvL2xldCBwYXJhbXMgPSBuZXcgSHR0cFBhcmFtcygpLnNldCgnX2lkJywgc3R1ZGVudElkKTtcclxuICAgICAgICAvLyB2YXIgY3VycmVudFVzZXIgOiBhbnkgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnY3VycmVudFVzZXInKTtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIkN1cnJlbnQgVXNlciAxIFwiICsgY3VycmVudFVzZXIudG9rZW4pO1xyXG4gICAgICAgLy8gY29uc3QgaGVhZGVycyA9IG5ldyBIdHRwSGVhZGVycygpLnNldChcIkF1dGhvcml6YXRpb25cIiwgXCJKV1QgXCIgKyBjdXJyZW50VXNlci50b2tlbik7XHJcblxyXG4vLyAgICAgICAgIGxldCBoZWFkZXJzID0gbmV3IEh0dHBIZWFkZXJzKCk7XHJcbi8vIGhlYWRlcnMgPSBoZWFkZXJzLmFwcGVuZChcIkF1dGhvcml6YXRpb25cIiwgXCJKV1QgXCIgKyBcImV5SjBlWEFpT2lKS1YxUWlMQ0poYkdjaU9pSklVekkxTmlKOS5leUpwWkNJNklqZzJNRGxrWXpreExUQTNaRE10TkRBM05DMWlNR1F4TFdWa05qUXlaak13WVRZNVpDSjkua3BXeHdOUGJRdkcxbDNWYjhWYjZSUXdDa3kxU3F5ZGhGUHRJQ29oeUQxQVwiKTtcclxuLy8gaGVhZGVycyA9IGhlYWRlcnMuYXBwZW5kKFwiQ29udGVudC1UeXBlXCIsIFwiYXBwbGljYXRpb24vanNvblwiKTtcclxuXHJcbmxldCBoZWFkZXJzID0gbmV3IEh0dHBIZWFkZXJzKCk7XHJcbmhlYWRlcnMgPSBoZWFkZXJzLmFwcGVuZChcIkNvbnRlbnQtVHlwZVwiLCBcImFwcGxpY2F0aW9uL2pzb25cIik7XHJcblxyXG5cclxuXHJcbiAgICAgICAgLy9BdXRob3JpemF0aW9uOiBcIkpXVCBcIiArIGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdjdXJyZW50VXNlcicpLnRva2VuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0PGFueT4odGhpcy5hcGlVcmwgKyAnYXV0aCcsSlNPTi5zdHJpbmdpZnkoe3VzZXJuYW1lOnVzZXJuYW1lLCBwYXNzd29yZDpwYXNzd29yZH0pLCB7cmVzcG9uc2VUeXBlOiAnanNvbicsaGVhZGVyc30pO1xyXG4gICAgfSBcclxuXHJcbiAgICBsb2dpbihlbWFpbDogc3RyaW5nLCBwYXNzd29yZDogc3RyaW5nKXtcclxuXHJcbiAgICAgIC8vICBjb25zb2xlLmxvZyhcIkFQSSBMb2dpblwiICsgQ29uZmlnLmFwaVVybExvZ2luICk7XHJcblxyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLnBvc3QodGhpcy5hcGlVcmwgKyBcImF1dGhcIiwgSlNPTi5zdHJpbmdpZnkoe2Nvb3BlcklkOmVtYWlsLCBwYXNzd29yZDpwYXNzd29yZH0pLCB7XHJcbiAgICAgICAgICBoZWFkZXJzOiBuZXcgSHR0cEhlYWRlcnMoKS5zZXQoJ0NvbnRlbnQtVHlwZScsICdhcHBsaWNhdGlvbi9qc29uJyksXHJcbiAgICAgICAgfSkubWFwKChyZXNwb25zZTogUmVzcG9uc2UpID0+IHtcclxuXHJcbiAgICAgICAgICBcclxuICAgICAgICAgICAgdmFyIHZhbCA9IHJlc3BvbnNlW1wiZGF0YVwiXVtcInRva2VuXCJdO1xyXG4gICAgICAgICAgICAvLyB2YXIgbmFtZSA9IHJlc3BvbnNlW1wibmFtZVwiXTtcclxuICAgICAgICAgICAgLy8gdmFyIGlkID0gcmVzcG9uc2VbXCJpZFwiXTtcclxuICAgICAgICAgICAgLy8gdmFyIHVzZXJUeXBlID0gcmVzcG9uc2VbXCJ1c2VyVHlwZVwiXTtcclxuICAgICAgICAgICAgLy8gdmFyIHVzZXJuYW1lID0gcmVzcG9uc2VbXCJVc2VyTmFtZVwiXTtcclxuICAgICAgICAgICAgLy8gdmFyIHN0YWZmUm9sZXMgPSByZXNwb25zZVtcIlN0YWZmUm9sZXNcIl07XHJcbiAgICAgICAgICAgIC8vIHZhciBpbWFnZVN0dWRlbnQgPSByZXNwb25zZVtcIlN0dWRlbnRJbWFnZVwiXTtcclxuICAgICAgICAgICAgLy8gdmFyIG1hdE1haW5ObyA9IHJlc3BvbnNlW1wiTWF0Tm9cIl07XHJcbiAgICAgICAgICAgIC8vIHZhciBkZXB0ID0gcmVzcG9uc2VbXCJEZXBhcnRtZW50TmFtZVwiXTtcclxuICAgICAgICAgICAgLy8gdmFyIHN0dWRlbnRSZWdObyA9IHJlc3BvbnNlW1wiU3R1ZGVudFJlZ05vXCJdO1xyXG4gICAgICAgICAgICAvLyB2YXIgdXNlckRhdGEgPSByZXNwb25zZVtcIlVzZXJPYmplY3RcIl07IFxyXG4gICAgICBcclxuXHJcbiAgICAgICAgICBjb25zdCB0b2tlbiA9IHJlc3BvbnNlICYmIHZhbDtcclxuICAgICAgICAgIFxyXG4gICAgICAgICAgaWYgKHRva2VuKSB7XHJcbiAgICAgICAgICAgICBcclxuICAgIFxyXG4gICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiUmVzcG9uc2UgZnJvbSBBdXRoIG5ldyBcIisgSlNPTi5zdHJpbmdpZnkocmVzcG9uc2UpICk7XHJcblxyXG4gICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2N1cnJlbnRVc2VyJywgSlNPTi5zdHJpbmdpZnkocmVzcG9uc2VbXCJkYXRhXCJdW1widXNlclwiXSkpO1xyXG4gICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2N1cnJlbnRVc2VyVG9rZW4nLCBKU09OLnN0cmluZ2lmeShyZXNwb25zZVtcImRhdGFcIl1bXCJ0b2tlblwiXSkpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgIC8vIHJldHVybiB0cnVlIHRvIGluZGljYXRlIHN1Y2Nlc3NmdWwgbG9naW5cclxuICAgICAgICAgICAgIC8vIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAvLyByZXR1cm4gZmFsc2UgdG8gaW5kaWNhdGUgZmFpbGVkIGxvZ2luXHJcbiAgICAgICAgICAgICAvLyByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgbG9nb3V0KCk6IHZvaWQge1xyXG4gICAgICAgIC8vIGNsZWFyIHRva2VuIHJlbW92ZSB1c2VyIGZyb20gbG9jYWwgc3RvcmFnZSB0byBsb2cgdXNlciBvdXRcclxuICAgICAgICBcclxuICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnY3VycmVudFVzZXInKTtcclxuICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnY3VycmVudFVzZXJUb2tlbicpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnL2xvZ2luJ10pO1xyXG4gICAgXHJcbiAgICB9XHJcbiAgICBcclxuXHJcbiAgICBmb3JnZXRQYXNzd29yZChlbWFpbDogc3RyaW5nKTogT2JzZXJ2YWJsZTxhbnk+IHtcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8vdGhpcy5hcGlVcmwgPSB0aGlzLmFwaVVybCArICdzdHVkZW50JztcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCIgUmV0dXJuIFN0dWRlbnQgSWQgMiBcIiArIHN0dWRlbnRJZCk7XHJcbiAgICAgICAgICAgIC8vbGV0IHBhcmFtcyA9IG5ldyBIdHRwUGFyYW1zKCkuc2V0KCdfaWQnLCBzdHVkZW50SWQpO1xyXG4gICAgICAgICAgICAvLyB2YXIgY3VycmVudFVzZXIgOiBhbnkgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnY3VycmVudFVzZXInKTtcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJDdXJyZW50IFVzZXIgMSBcIiArIGN1cnJlbnRVc2VyLnRva2VuKTtcclxuICAgICAgICAgICAvLyBjb25zdCBoZWFkZXJzID0gbmV3IEh0dHBIZWFkZXJzKCkuc2V0KFwiQXV0aG9yaXphdGlvblwiLCBcIkpXVCBcIiArIGN1cnJlbnRVc2VyLnRva2VuKTtcclxuICAgIFxyXG4gICAgLy8gICAgICAgICBsZXQgaGVhZGVycyA9IG5ldyBIdHRwSGVhZGVycygpO1xyXG4gICAgLy8gaGVhZGVycyA9IGhlYWRlcnMuYXBwZW5kKFwiQXV0aG9yaXphdGlvblwiLCBcIkpXVCBcIiArIFwiZXlKMGVYQWlPaUpLVjFRaUxDSmhiR2NpT2lKSVV6STFOaUo5LmV5SnBaQ0k2SWpnMk1EbGtZemt4TFRBM1pETXROREEzTkMxaU1HUXhMV1ZrTmpReVpqTXdZVFk1WkNKOS5rcFd4d05QYlF2RzFsM1ZiOFZiNlJRd0NreTFTcXlkaEZQdElDb2h5RDFBXCIpO1xyXG4gICAgLy8gaGVhZGVycyA9IGhlYWRlcnMuYXBwZW5kKFwiQ29udGVudC1UeXBlXCIsIFwiYXBwbGljYXRpb24vanNvblwiKTtcclxuICAgIFxyXG4gICAgbGV0IGhlYWRlcnMgPSBuZXcgSHR0cEhlYWRlcnMoKTtcclxuICAgIGhlYWRlcnMgPSBoZWFkZXJzLmFwcGVuZChcIkNvbnRlbnQtVHlwZVwiLCBcImFwcGxpY2F0aW9uL2pzb25cIik7XHJcbiAgICBcclxuICAgIFxyXG4gICAgXHJcbiAgICAgICAgICAgIC8vQXV0aG9yaXphdGlvbjogXCJKV1QgXCIgKyBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnY3VycmVudFVzZXInKS50b2tlblxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5odHRwLnBvc3Q8YW55Pih0aGlzLmFwaVVybCArICd1c2Vycy9mb3Jnb3QnLEpTT04uc3RyaW5naWZ5KHtlbWFpbDplbWFpbH0pLCB7cmVzcG9uc2VUeXBlOiAnanNvbicsaGVhZGVyc30pO1xyXG4gICAgICAgIH0gXHJcbiAgICB9XHJcbiAgICBcclxuICAgIHJlc2V0UGFzc3dvcmQodXNlcklkOiBTdHJpbmcsb2xkUGFzc3dvcmQ6IFN0cmluZywgbmV3UGFzc3dvcmQ6U3RyaW5nLHZlcmlmeVBhc3N3b3JkOlN0cmluZyx1c2VyTW9kZTpTdHJpbmcpOiBPYnNlcnZhYmxlPGFueT4ge1xyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy90aGlzLmFwaVVybCA9IHRoaXMuYXBpVXJsICsgJ3N0dWRlbnQnO1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIiBSZXR1cm4gU3R1ZGVudCBJZCAyIFwiICsgc3R1ZGVudElkKTtcclxuICAgICAgICAgICAgLy9sZXQgcGFyYW1zID0gbmV3IEh0dHBQYXJhbXMoKS5zZXQoJ19pZCcsIHN0dWRlbnRJZCk7XHJcbiAgICAgICAgICAgIC8vIHZhciBjdXJyZW50VXNlciA6IGFueSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdjdXJyZW50VXNlcicpO1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIkN1cnJlbnQgVXNlciAxIFwiICsgY3VycmVudFVzZXIudG9rZW4pO1xyXG4gICAgICAgICAgIC8vIGNvbnN0IGhlYWRlcnMgPSBuZXcgSHR0cEhlYWRlcnMoKS5zZXQoXCJBdXRob3JpemF0aW9uXCIsIFwiSldUIFwiICsgY3VycmVudFVzZXIudG9rZW4pO1xyXG4gICAgXHJcbiAgICAvLyAgICAgICAgIGxldCBoZWFkZXJzID0gbmV3IEh0dHBIZWFkZXJzKCk7XHJcbiAgICAvLyBoZWFkZXJzID0gaGVhZGVycy5hcHBlbmQoXCJBdXRob3JpemF0aW9uXCIsIFwiSldUIFwiICsgXCJleUowZVhBaU9pSktWMVFpTENKaGJHY2lPaUpJVXpJMU5pSjkuZXlKcFpDSTZJamcyTURsa1l6a3hMVEEzWkRNdE5EQTNOQzFpTUdReExXVmtOalF5WmpNd1lUWTVaQ0o5LmtwV3h3TlBiUXZHMWwzVmI4VmI2UlF3Q2t5MVNxeWRoRlB0SUNvaHlEMUFcIik7XHJcbiAgICAvLyBoZWFkZXJzID0gaGVhZGVycy5hcHBlbmQoXCJDb250ZW50LVR5cGVcIiwgXCJhcHBsaWNhdGlvbi9qc29uXCIpO1xyXG4gICAgXHJcbiAgICBsZXQgaGVhZGVycyA9IG5ldyBIdHRwSGVhZGVycygpO1xyXG4gICAgaGVhZGVycyA9IGhlYWRlcnMuYXBwZW5kKFwiQ29udGVudC1UeXBlXCIsIFwiYXBwbGljYXRpb24vanNvblwiKTtcclxuICAgIFxyXG4gICAgXHJcbiAgICBcclxuICAgICAgICAgICAgLy9BdXRob3JpemF0aW9uOiBcIkpXVCBcIiArIGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdjdXJyZW50VXNlcicpLnRva2VuXHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmh0dHAucG9zdDxhbnk+KHRoaXMuYXBpVXJsICsgJ3VzZXJzL3Jlc2V0cGFzc3dvcmQvJyArIHVzZXJJZCxKU09OLnN0cmluZ2lmeSh7b2xkUGFzc3dvcmQ6b2xkUGFzc3dvcmQsIG5ld1Bhc3N3b3JkOm5ld1Bhc3N3b3JkLHZlcmlmeVBhc3N3b3JkOnZlcmlmeVBhc3N3b3JkLHVzZXJNb2RlOnVzZXJNb2RlfSksIHtyZXNwb25zZVR5cGU6ICdqc29uJyxoZWFkZXJzfSk7XHJcbiAgICAgICAgfSBcclxuICAgIH0gIFxyXG4gICAgXHJcbiAgICAgICAgXHJcbiAgICBnZXR1c2VyUmVzZXRUb2tlbihJZDogc3RyaW5nKTogT2JzZXJ2YWJsZTxhbnk+IHtcclxuICAgICAgICAvL3RoaXMuYXBpVXJsID0gdGhpcy5hcGlVcmwgKyAnc3R1ZGVudCc7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCIgUmV0dXJuIFN0dWRlbnQgSWQgMiBcIiArIHN0dWRlbnRJZCk7XHJcbiAgICAgICAgLy9sZXQgcGFyYW1zID0gbmV3IEh0dHBQYXJhbXMoKS5zZXQoJ19pZCcsIHN0dWRlbnRJZCk7XHJcbiAgICAgICAgLy8gdmFyIGN1cnJlbnRVc2VyIDogYW55ID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2N1cnJlbnRVc2VyJyk7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJDdXJyZW50IFVzZXIgMSBcIiArIGN1cnJlbnRVc2VyLnRva2VuKTtcclxuICAgICAgIC8vIGNvbnN0IGhlYWRlcnMgPSBuZXcgSHR0cEhlYWRlcnMoKS5zZXQoXCJBdXRob3JpemF0aW9uXCIsIFwiSldUIFwiICsgY3VycmVudFVzZXIudG9rZW4pO1xyXG5cclxuLy8gICAgICAgICBsZXQgaGVhZGVycyA9IG5ldyBIdHRwSGVhZGVycygpO1xyXG4vLyBoZWFkZXJzID0gaGVhZGVycy5hcHBlbmQoXCJBdXRob3JpemF0aW9uXCIsIFwiSldUIFwiICsgXCJleUowZVhBaU9pSktWMVFpTENKaGJHY2lPaUpJVXpJMU5pSjkuZXlKcFpDSTZJamcyTURsa1l6a3hMVEEzWkRNdE5EQTNOQzFpTUdReExXVmtOalF5WmpNd1lUWTVaQ0o5LmtwV3h3TlBiUXZHMWwzVmI4VmI2UlF3Q2t5MVNxeWRoRlB0SUNvaHlEMUFcIik7XHJcbi8vIGhlYWRlcnMgPSBoZWFkZXJzLmFwcGVuZChcIkNvbnRlbnQtVHlwZVwiLCBcImFwcGxpY2F0aW9uL2pzb25cIik7XHJcblxyXG5sZXQgaGVhZGVycyA9IG5ldyBIdHRwSGVhZGVycygpO1xyXG5oZWFkZXJzID0gaGVhZGVycy5hcHBlbmQoXCJDb250ZW50LVR5cGVcIiwgXCJhcHBsaWNhdGlvbi9qc29uXCIpO1xyXG5cclxuXHJcblxyXG5cclxuICAgICAgICAvL0F1dGhvcml6YXRpb246IFwiSldUIFwiICsgbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2N1cnJlbnRVc2VyJykudG9rZW5cclxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldDxhbnk+KHRoaXMuYXBpVXJsICsgJ3VzZXJzL3Rva2VuLycgKyBJZCwge3Jlc3BvbnNlVHlwZTogJ2pzb24nLGhlYWRlcnN9KTtcclxuICAgIH0gXHJcbiAgICBcclxuXHJcbiAgICBzZW5kVG9rZW4odXNlcklkOiBTdHJpbmcpOiBPYnNlcnZhYmxlPGFueT4ge1xyXG4gICAgXHJcblxyXG4vLyAgICAgICAgIGxldCBoZWFkZXJzID0gbmV3IEh0dHBIZWFkZXJzKCk7XHJcbi8vIGhlYWRlcnMgPSBoZWFkZXJzLmFwcGVuZChcIkF1dGhvcml6YXRpb25cIiwgXCJKV1QgXCIgKyBcImV5SjBlWEFpT2lKS1YxUWlMQ0poYkdjaU9pSklVekkxTmlKOS5leUpwWkNJNklqZzJNRGxrWXpreExUQTNaRE10TkRBM05DMWlNR1F4TFdWa05qUXlaak13WVRZNVpDSjkua3BXeHdOUGJRdkcxbDNWYjhWYjZSUXdDa3kxU3F5ZGhGUHRJQ29oeUQxQVwiKTtcclxuLy8gaGVhZGVycyA9IGhlYWRlcnMuYXBwZW5kKFwiQ29udGVudC1UeXBlXCIsIFwiYXBwbGljYXRpb24vanNvblwiKTtcclxuXHJcbmxldCBoZWFkZXJzID0gbmV3IEh0dHBIZWFkZXJzKCk7XHJcbmhlYWRlcnMgPSBoZWFkZXJzLmFwcGVuZChcIkNvbnRlbnQtVHlwZVwiLCBcImFwcGxpY2F0aW9uL2pzb25cIik7XHJcblxyXG4gICAgICAgIC8vQXV0aG9yaXphdGlvbjogXCJKV1QgXCIgKyBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnY3VycmVudFVzZXInKS50b2tlblxyXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0PGFueT4odGhpcy5hcGlVcmwgKyAndmVyaWZ5YXV0aHMvc2VuZG90cC8nICsgdXNlcklkLCB7cmVzcG9uc2VUeXBlOiAnanNvbicsaGVhZGVyc30pO1xyXG4gICAgfSBcclxuXHJcblxyXG5cclxuICAgIGdldFRva2VuKHRva2VuOiBTdHJpbmcsdXNlcklkOiBTdHJpbmcpOiBPYnNlcnZhYmxlPGFueT4ge1xyXG4gICAgXHJcblxyXG4gICAgICAgIC8vICAgICAgICAgbGV0IGhlYWRlcnMgPSBuZXcgSHR0cEhlYWRlcnMoKTtcclxuICAgICAgICAvLyBoZWFkZXJzID0gaGVhZGVycy5hcHBlbmQoXCJBdXRob3JpemF0aW9uXCIsIFwiSldUIFwiICsgXCJleUowZVhBaU9pSktWMVFpTENKaGJHY2lPaUpJVXpJMU5pSjkuZXlKcFpDSTZJamcyTURsa1l6a3hMVEEzWkRNdE5EQTNOQzFpTUdReExXVmtOalF5WmpNd1lUWTVaQ0o5LmtwV3h3TlBiUXZHMWwzVmI4VmI2UlF3Q2t5MVNxeWRoRlB0SUNvaHlEMUFcIik7XHJcbiAgICAgICAgLy8gaGVhZGVycyA9IGhlYWRlcnMuYXBwZW5kKFwiQ29udGVudC1UeXBlXCIsIFwiYXBwbGljYXRpb24vanNvblwiKTtcclxuICAgICAgICBcclxuICAgICAgICBsZXQgaGVhZGVycyA9IG5ldyBIdHRwSGVhZGVycygpO1xyXG4gICAgICAgIGhlYWRlcnMgPSBoZWFkZXJzLmFwcGVuZChcIkNvbnRlbnQtVHlwZVwiLCBcImFwcGxpY2F0aW9uL2pzb25cIik7XHJcbiAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAvL0F1dGhvcml6YXRpb246IFwiSldUIFwiICsgbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2N1cnJlbnRVc2VyJykudG9rZW5cclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0PGFueT4odGhpcy5hcGlVcmwgKyAndmVyaWZ5YXV0aHMvJyArIHRva2VuICsgXCIvXCIgK3VzZXJJZCwge3Jlc3BvbnNlVHlwZTogJ2pzb24nLGhlYWRlcnN9KTtcclxuICAgIH0gXHJcblxyXG5cclxuXHJcblxyXG4gICAgY2hlY2tUcmFuc1BpbihJZDogU3RyaW5nLCBwaW46IFN0cmluZyk6IE9ic2VydmFibGU8YW55PiB7XHJcbiAgICAgICAgLy90aGlzLmFwaVVybCA9IHRoaXMuYXBpVXJsICsgJ3N0dWRlbnQnO1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwiIFJldHVybiBTdHVkZW50IElkIDIgXCIgKyBzdHVkZW50SWQpO1xyXG4gICAgICAgIC8vbGV0IHBhcmFtcyA9IG5ldyBIdHRwUGFyYW1zKCkuc2V0KCdfaWQnLCBzdHVkZW50SWQpO1xyXG4gICAgICAgIC8vIHZhciBjdXJyZW50VXNlciA6IGFueSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdjdXJyZW50VXNlcicpO1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwiQ3VycmVudCBVc2VyIDEgXCIgKyBjdXJyZW50VXNlci50b2tlbik7XHJcbiAgICAgICAvLyBjb25zdCBoZWFkZXJzID0gbmV3IEh0dHBIZWFkZXJzKCkuc2V0KFwiQXV0aG9yaXphdGlvblwiLCBcIkpXVCBcIiArIGN1cnJlbnRVc2VyLnRva2VuKTtcclxuXHJcbi8vICAgICAgICAgbGV0IGhlYWRlcnMgPSBuZXcgSHR0cEhlYWRlcnMoKTtcclxuLy8gaGVhZGVycyA9IGhlYWRlcnMuYXBwZW5kKFwiQXV0aG9yaXphdGlvblwiLCBcIkpXVCBcIiArIFwiZXlKMGVYQWlPaUpLVjFRaUxDSmhiR2NpT2lKSVV6STFOaUo5LmV5SnBaQ0k2SWpnMk1EbGtZemt4TFRBM1pETXROREEzTkMxaU1HUXhMV1ZrTmpReVpqTXdZVFk1WkNKOS5rcFd4d05QYlF2RzFsM1ZiOFZiNlJRd0NreTFTcXlkaEZQdElDb2h5RDFBXCIpO1xyXG4vLyBoZWFkZXJzID0gaGVhZGVycy5hcHBlbmQoXCJDb250ZW50LVR5cGVcIiwgXCJhcHBsaWNhdGlvbi9qc29uXCIpO1xyXG5cclxubGV0IGhlYWRlcnMgPSBuZXcgSHR0cEhlYWRlcnMoKTtcclxuaGVhZGVycyA9IGhlYWRlcnMuYXBwZW5kKFwiQ29udGVudC1UeXBlXCIsIFwiYXBwbGljYXRpb24vanNvblwiKTtcclxuXHJcblxyXG5cclxuXHJcbiAgICAgICAgLy9BdXRob3JpemF0aW9uOiBcIkpXVCBcIiArIGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdjdXJyZW50VXNlcicpLnRva2VuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0PGFueT4odGhpcy5hcGlVcmwgKyAndXNlcnMvY2hlY2twaW4nLCBKU09OLnN0cmluZ2lmeSh7dXNlcklkOklkLHBpbjpwaW59KSwge3Jlc3BvbnNlVHlwZTogJ2pzb24nLGhlYWRlcnN9KTtcclxuICAgIH0gXHJcblxyXG5cclxuICAgIHN5c3RlbWNvbmZpZygpOiBPYnNlcnZhYmxlPGFueT4ge1xyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy90aGlzLmFwaVVybCA9IHRoaXMuYXBpVXJsICsgJ3N0dWRlbnQnO1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIiBSZXR1cm4gU3R1ZGVudCBJZCAyIFwiICsgc3R1ZGVudElkKTtcclxuICAgICAgICAgICAgLy9sZXQgcGFyYW1zID0gbmV3IEh0dHBQYXJhbXMoKS5zZXQoJ19pZCcsIHN0dWRlbnRJZCk7XHJcbiAgICAgICAgICAgIC8vIHZhciBjdXJyZW50VXNlciA6IGFueSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdjdXJyZW50VXNlcicpO1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIkN1cnJlbnQgVXNlciAxIFwiICsgY3VycmVudFVzZXIudG9rZW4pO1xyXG4gICAgICAgICAgIC8vIGNvbnN0IGhlYWRlcnMgPSBuZXcgSHR0cEhlYWRlcnMoKS5zZXQoXCJBdXRob3JpemF0aW9uXCIsIFwiSldUIFwiICsgY3VycmVudFVzZXIudG9rZW4pO1xyXG4gICAgXHJcbiAgICAvLyAgICAgICAgIGxldCBoZWFkZXJzID0gbmV3IEh0dHBIZWFkZXJzKCk7XHJcbiAgICAvLyBoZWFkZXJzID0gaGVhZGVycy5hcHBlbmQoXCJBdXRob3JpemF0aW9uXCIsIFwiSldUIFwiICsgXCJleUowZVhBaU9pSktWMVFpTENKaGJHY2lPaUpJVXpJMU5pSjkuZXlKcFpDSTZJamcyTURsa1l6a3hMVEEzWkRNdE5EQTNOQzFpTUdReExXVmtOalF5WmpNd1lUWTVaQ0o5LmtwV3h3TlBiUXZHMWwzVmI4VmI2UlF3Q2t5MVNxeWRoRlB0SUNvaHlEMUFcIik7XHJcbiAgICAvLyBoZWFkZXJzID0gaGVhZGVycy5hcHBlbmQoXCJDb250ZW50LVR5cGVcIiwgXCJhcHBsaWNhdGlvbi9qc29uXCIpO1xyXG4gICAgXHJcbiAgICBsZXQgaGVhZGVycyA9IG5ldyBIdHRwSGVhZGVycygpO1xyXG4gICAgaGVhZGVycyA9IGhlYWRlcnMuYXBwZW5kKFwiQ29udGVudC1UeXBlXCIsIFwiYXBwbGljYXRpb24vanNvblwiKTtcclxuICAgIFxyXG4gICAgXHJcbiAgICBcclxuICAgICAgICAgICAgLy9BdXRob3JpemF0aW9uOiBcIkpXVCBcIiArIGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdjdXJyZW50VXNlcicpLnRva2VuXHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0PGFueT4odGhpcy5hcGlVcmwgKyAnc3lzdGVtY29uZmlndXJhdGlvbnMvZmlyc3RzeXN0ZW1jb25maWcnLCB7cmVzcG9uc2VUeXBlOiAnanNvbicsaGVhZGVyc30pO1xyXG4gICAgICAgIH0gXHJcbiAgICB9ICBcclxuXHJcbiAgICAvLyBjaGVja1JlZ2lzdHJhdGlvbigpe1xyXG4gICAgLy8gICAgIHZhciBkYXRhT2JqZWN0ID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnY3VycmVudFVzZXInKSk7XHJcblxyXG5cclxuICAgIC8vICAgICAgICAgaWYoZGF0YU9iamVjdC51c2VyTW9kZSA9PSBcIk5ld1wiKVxyXG4gICAgLy8gICAgICAgICB7XHJcbiAgICAvLyAgICAgICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy9jaGFuZ2VwYXNzd29yZCddKTtcclxuICAgIC8vICAgICAgICAgfVxyXG5cclxuICAgIC8vICAgICAgICAgaWYoZGF0YU9iamVjdC51c2VyTW9kZSA9PSBcIlBob25lVmVyaWZ5XCIpXHJcbiAgICAvLyAgICAgICAgIHtcclxuICAgIC8vICAgICAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnL3ZlcmlmeXBob25lJ10pO1xyXG4gICAgLy8gICAgICAgICB9XHJcblxyXG4gICAgLy8gICAgICAgICBpZihkYXRhT2JqZWN0LnVzZXJNb2RlID09IFwiT1RQVmVyaWZ5XCIpXHJcbiAgICAvLyAgICAgICAgIHtcclxuICAgIC8vICAgICAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnL290cCddKTtcclxuICAgIC8vICAgICAgICAgfVxyXG4gICAgLy8gICAgICAgICBpZihkYXRhT2JqZWN0LnVzZXJNb2RlID09IFwiVHJhbnNQaW5cIilcclxuICAgIC8vICAgICAgICAge1xyXG4gICAgLy8gICAgICAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvdHJhbnNwaW4nXSk7XHJcbiAgICAvLyAgICAgICAgIH1cclxuICAgIC8vIH1cclxuXHJcbiAgICBcclxuXHJcblxyXG4gIFxyXG5cclxuICAgIFxyXG5cclxuICAgXHJcblxyXG4gICBwcml2YXRlIGV4dHJhY3REYXRhKHJlczogUmVzcG9uc2UpIHtcclxuXHRsZXQgYm9keSA9IHJlcy5qc29uKCk7XHJcbiAgICAgICAgcmV0dXJuIGJvZHk7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIGhhbmRsZUVycm9yIChlcnJvcjogUmVzcG9uc2UgfCBhbnkpIHtcclxuXHRjb25zb2xlLmVycm9yKGVycm9yLm1lc3NhZ2UgfHwgZXJyb3IpO1xyXG5cdHJldHVybiBPYnNlcnZhYmxlLnRocm93KGVycm9yLnN0YXR1cyk7XHJcbiAgICB9XHJcblxyXG4gIFxyXG5cclxufVxyXG5cclxuXHJcblxyXG4iXX0=