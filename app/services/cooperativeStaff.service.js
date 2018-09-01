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
var CooperativeStaffService = /** @class */ (function () {
    function CooperativeStaffService(http) {
        this.http = http;
        this.apiUrl = config_1.Config.apiUrl;
    }
    CooperativeStaffService.prototype.getCooperativeStaff = function (staffId, cooperativeId) {
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
    CooperativeStaffService.prototype.verifyAuthToCreatLater = function (verifyAuth) {
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
    CooperativeStaffService.prototype.extractData = function (res) {
        var body = res.json();
        return body;
    };
    CooperativeStaffService.prototype.handleError = function (error) {
        console.error(error.message || error);
        return Observable_1.Observable.throw(error.status);
    };
    CooperativeStaffService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], CooperativeStaffService);
    return CooperativeStaffService;
}());
exports.CooperativeStaffService = CooperativeStaffService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29vcGVyYXRpdmVTdGFmZi5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY29vcGVyYXRpdmVTdGFmZi5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTJDO0FBQzNDLDBFQUEwRTtBQUMxRSwwQ0FBMEM7QUFDMUMsNkNBQTRIO0FBQzVILG9DQUFvQztBQUNwQyw4Q0FBNkM7QUFDN0MsaUNBQStCO0FBSS9CLDJDQUEwQztBQUsxQztJQUdJLGlDQUFvQixJQUFnQjtRQUFoQixTQUFJLEdBQUosSUFBSSxDQUFZO1FBRm5DLFdBQU0sR0FBWSxlQUFNLENBQUMsTUFBTSxDQUFDO0lBRU8sQ0FBQztJQUl6QyxxREFBbUIsR0FBbkIsVUFBb0IsT0FBZSxFQUFDLGFBQXFCO1FBQ3JELHdDQUF3QztRQUN4QyxvREFBb0Q7UUFDcEQsc0RBQXNEO1FBQ3RELCtEQUErRDtRQUMvRCxzREFBc0Q7UUFDdkQsc0ZBQXNGO1FBRTdGLDJDQUEyQztRQUMzQyx1TUFBdU07UUFDdk0sZ0VBQWdFO1FBRWhFLElBQUksT0FBTyxHQUFHLElBQUksa0JBQVcsRUFBRSxDQUFDO1FBQ2hDLE9BQU8sR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLGNBQWMsRUFBRSxrQkFBa0IsQ0FBQyxDQUFDO1FBS3JELG1FQUFtRTtRQUNuRSxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQU0sSUFBSSxDQUFDLE1BQU0sR0FBRyxvQkFBb0IsR0FBRyxPQUFPLEdBQUcsR0FBRyxHQUFFLGFBQWEsRUFBRSxFQUFDLFlBQVksRUFBRSxNQUFNLEVBQUMsT0FBTyxTQUFBLEVBQUMsQ0FBQyxDQUFDO0lBQ2pJLENBQUM7SUFLRCx3REFBc0IsR0FBdEIsVUFBdUIsVUFBNEI7UUFDL0Msd0NBQXdDO1FBQ3hDLG9EQUFvRDtRQUNwRCxzREFBc0Q7UUFDdEQsK0RBQStEO1FBQy9ELHNEQUFzRDtRQUN2RCxzRkFBc0Y7UUFFN0YsMkNBQTJDO1FBQzNDLHVNQUF1TTtRQUN2TSxnRUFBZ0U7UUFFaEUsSUFBSSxPQUFPLEdBQUcsSUFBSSxrQkFBVyxFQUFFLENBQUM7UUFDaEMsT0FBTyxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsY0FBYyxFQUFFLGtCQUFrQixDQUFDLENBQUM7UUFJckQsbUVBQW1FO1FBQ25FLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBTSxJQUFJLENBQUMsTUFBTSxHQUFHLGFBQWEsRUFBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUMsT0FBTyxFQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQUUsYUFBYSxFQUFDLFVBQVUsQ0FBQyxhQUFhLEVBQUMsS0FBSyxFQUFFLFVBQVUsQ0FBQyxLQUFLLEVBQUUsV0FBVyxFQUFFLFVBQVUsQ0FBQyxLQUFLLEVBQUUsUUFBUSxFQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUMsU0FBUyxFQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUMsUUFBUSxFQUFDLEtBQUssRUFBQyxDQUFDLEVBQUUsRUFBQyxZQUFZLEVBQUUsTUFBTSxFQUFDLE9BQU8sU0FBQSxFQUFDLENBQUMsQ0FBQztJQUMzUyxDQUFDO0lBU00sNkNBQVcsR0FBbkIsVUFBb0IsR0FBYTtRQUNuQyxJQUFJLElBQUksR0FBRyxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDZixNQUFNLENBQUMsSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFDTyw2Q0FBVyxHQUFuQixVQUFxQixLQUFxQjtRQUM3QyxPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxPQUFPLElBQUksS0FBSyxDQUFDLENBQUM7UUFDdEMsTUFBTSxDQUFDLHVCQUFVLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNuQyxDQUFDO0lBbkVRLHVCQUF1QjtRQURuQyxpQkFBVSxFQUFFO3lDQUlpQixpQkFBVTtPQUgzQix1QkFBdUIsQ0F1RW5DO0lBQUQsOEJBQUM7Q0FBQSxBQXZFRCxJQXVFQztBQXZFWSwwREFBdUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbi8vaW1wb3J0IHsgSHR0cCwgSGVhZGVycywgUmVxdWVzdE9wdGlvbnMsIFJlc3BvbnNlIH0gZnJvbSAnQGFuZ3VsYXIvaHR0cCc7XHJcbi8vIGNvbnN0IGNhY2hlZEV4dGVuZHMgPSBnbG9iYWwuX19leHRlbmRzO1xyXG5pbXBvcnQge0h0dHBDbGllbnQsSHR0cEV2ZW50LCBIdHRwSGFuZGxlciwgSHR0cEludGVyY2VwdG9yLCBIdHRwUmVxdWVzdCxIdHRwSGVhZGVycyxIdHRwUGFyYW1zfSBmcm9tIFwiQGFuZ3VsYXIvY29tbW9uL2h0dHBcIjtcclxuLy8gZ2xvYmFsLl9fZXh0ZW5kcyA9IGNhY2hlZEV4dGVuZHM7XHJcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xyXG5pbXBvcnQgJ3J4anMvYWRkL29wZXJhdG9yL21hcCc7XHJcblxyXG5pbXBvcnQgeyBDb29wZXJhdGl2ZSxWZXJpZnlBdXRoLENvb3BlcmF0aXZlU3RhZmYgfSBmcm9tICcuLi9tb2RlbHMvaW5kZXgnO1xyXG5cclxuaW1wb3J0IHsgQ29uZmlnIH0gZnJvbSBcIi4uL3NoYXJlZC9jb25maWdcIjtcclxuXHJcblxyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgQ29vcGVyYXRpdmVTdGFmZlNlcnZpY2Uge1xyXG4gICAgIGFwaVVybDogc3RyaW5nICA9IENvbmZpZy5hcGlVcmw7XHJcbiAgICBcclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgaHR0cDogSHR0cENsaWVudCkgeyB9XHJcblxyXG4gICBcclxuICAgIFxyXG4gICAgZ2V0Q29vcGVyYXRpdmVTdGFmZihzdGFmZklkOiBTdHJpbmcsY29vcGVyYXRpdmVJZDogU3RyaW5nKTogT2JzZXJ2YWJsZTxhbnk+IHtcclxuICAgICAgICAvL3RoaXMuYXBpVXJsID0gdGhpcy5hcGlVcmwgKyAnc3R1ZGVudCc7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCIgUmV0dXJuIFN0dWRlbnQgSWQgMiBcIiArIHN0dWRlbnRJZCk7XHJcbiAgICAgICAgLy9sZXQgcGFyYW1zID0gbmV3IEh0dHBQYXJhbXMoKS5zZXQoJ19pZCcsIHN0dWRlbnRJZCk7XHJcbiAgICAgICAgLy8gdmFyIGN1cnJlbnRVc2VyIDogYW55ID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2N1cnJlbnRVc2VyJyk7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJDdXJyZW50IFVzZXIgMSBcIiArIGN1cnJlbnRVc2VyLnRva2VuKTtcclxuICAgICAgIC8vIGNvbnN0IGhlYWRlcnMgPSBuZXcgSHR0cEhlYWRlcnMoKS5zZXQoXCJBdXRob3JpemF0aW9uXCIsIFwiSldUIFwiICsgY3VycmVudFVzZXIudG9rZW4pO1xyXG5cclxuLy8gICAgICAgICBsZXQgaGVhZGVycyA9IG5ldyBIdHRwSGVhZGVycygpO1xyXG4vLyBoZWFkZXJzID0gaGVhZGVycy5hcHBlbmQoXCJBdXRob3JpemF0aW9uXCIsIFwiSldUIFwiICsgXCJleUowZVhBaU9pSktWMVFpTENKaGJHY2lPaUpJVXpJMU5pSjkuZXlKcFpDSTZJamcyTURsa1l6a3hMVEEzWkRNdE5EQTNOQzFpTUdReExXVmtOalF5WmpNd1lUWTVaQ0o5LmtwV3h3TlBiUXZHMWwzVmI4VmI2UlF3Q2t5MVNxeWRoRlB0SUNvaHlEMUFcIik7XHJcbi8vIGhlYWRlcnMgPSBoZWFkZXJzLmFwcGVuZChcIkNvbnRlbnQtVHlwZVwiLCBcImFwcGxpY2F0aW9uL2pzb25cIik7XHJcblxyXG5sZXQgaGVhZGVycyA9IG5ldyBIdHRwSGVhZGVycygpO1xyXG5oZWFkZXJzID0gaGVhZGVycy5hcHBlbmQoXCJDb250ZW50LVR5cGVcIiwgXCJhcHBsaWNhdGlvbi9qc29uXCIpO1xyXG5cclxuXHJcblxyXG5cclxuICAgICAgICAvL0F1dGhvcml6YXRpb246IFwiSldUIFwiICsgbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2N1cnJlbnRVc2VyJykudG9rZW5cclxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldDxhbnk+KHRoaXMuYXBpVXJsICsgJ2Nvb3BlcmF0aXZlc3RhZmZzLycgKyBzdGFmZklkICsgXCIvXCIrIGNvb3BlcmF0aXZlSWQsIHtyZXNwb25zZVR5cGU6ICdqc29uJyxoZWFkZXJzfSk7XHJcbiAgICB9IFxyXG5cclxuXHJcblxyXG4gICAgICAgIFxyXG4gICAgdmVyaWZ5QXV0aFRvQ3JlYXRMYXRlcih2ZXJpZnlBdXRoOiBDb29wZXJhdGl2ZVN0YWZmKTogT2JzZXJ2YWJsZTxhbnk+IHtcclxuICAgICAgICAvL3RoaXMuYXBpVXJsID0gdGhpcy5hcGlVcmwgKyAnc3R1ZGVudCc7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCIgUmV0dXJuIFN0dWRlbnQgSWQgMiBcIiArIHN0dWRlbnRJZCk7XHJcbiAgICAgICAgLy9sZXQgcGFyYW1zID0gbmV3IEh0dHBQYXJhbXMoKS5zZXQoJ19pZCcsIHN0dWRlbnRJZCk7XHJcbiAgICAgICAgLy8gdmFyIGN1cnJlbnRVc2VyIDogYW55ID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2N1cnJlbnRVc2VyJyk7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJDdXJyZW50IFVzZXIgMSBcIiArIGN1cnJlbnRVc2VyLnRva2VuKTtcclxuICAgICAgIC8vIGNvbnN0IGhlYWRlcnMgPSBuZXcgSHR0cEhlYWRlcnMoKS5zZXQoXCJBdXRob3JpemF0aW9uXCIsIFwiSldUIFwiICsgY3VycmVudFVzZXIudG9rZW4pO1xyXG5cclxuLy8gICAgICAgICBsZXQgaGVhZGVycyA9IG5ldyBIdHRwSGVhZGVycygpO1xyXG4vLyBoZWFkZXJzID0gaGVhZGVycy5hcHBlbmQoXCJBdXRob3JpemF0aW9uXCIsIFwiSldUIFwiICsgXCJleUowZVhBaU9pSktWMVFpTENKaGJHY2lPaUpJVXpJMU5pSjkuZXlKcFpDSTZJamcyTURsa1l6a3hMVEEzWkRNdE5EQTNOQzFpTUdReExXVmtOalF5WmpNd1lUWTVaQ0o5LmtwV3h3TlBiUXZHMWwzVmI4VmI2UlF3Q2t5MVNxeWRoRlB0SUNvaHlEMUFcIik7XHJcbi8vIGhlYWRlcnMgPSBoZWFkZXJzLmFwcGVuZChcIkNvbnRlbnQtVHlwZVwiLCBcImFwcGxpY2F0aW9uL2pzb25cIik7XHJcblxyXG5sZXQgaGVhZGVycyA9IG5ldyBIdHRwSGVhZGVycygpO1xyXG5oZWFkZXJzID0gaGVhZGVycy5hcHBlbmQoXCJDb250ZW50LVR5cGVcIiwgXCJhcHBsaWNhdGlvbi9qc29uXCIpO1xyXG5cclxuXHJcblxyXG4gICAgICAgIC8vQXV0aG9yaXphdGlvbjogXCJKV1QgXCIgKyBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnY3VycmVudFVzZXInKS50b2tlblxyXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAucG9zdDxhbnk+KHRoaXMuYXBpVXJsICsgJ3ZlcmlmeWF1dGhzJyxKU09OLnN0cmluZ2lmeSh7c3RhZmZJZDp2ZXJpZnlBdXRoLnN0YWZmSWQsIGNvb3BlcmF0aXZlSWQ6dmVyaWZ5QXV0aC5jb29wZXJhdGl2ZUlkLGVtYWlsOiB2ZXJpZnlBdXRoLmVtYWlsLCBwaG9uZU51bWJlcjogdmVyaWZ5QXV0aC5waG9uZSwgbGFzdE5hbWU6dmVyaWZ5QXV0aC5uYW1lLGZpcnN0TmFtZTp2ZXJpZnlBdXRoLm5hbWUsYXV0aFR5cGU6XCJOZXdcIn0pLCB7cmVzcG9uc2VUeXBlOiAnanNvbicsaGVhZGVyc30pO1xyXG4gICAgfSBcclxuXHJcblxyXG4gIFxyXG5cclxuICAgIFxyXG5cclxuICAgXHJcblxyXG4gICBwcml2YXRlIGV4dHJhY3REYXRhKHJlczogUmVzcG9uc2UpIHtcclxuXHRsZXQgYm9keSA9IHJlcy5qc29uKCk7XHJcbiAgICAgICAgcmV0dXJuIGJvZHk7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIGhhbmRsZUVycm9yIChlcnJvcjogUmVzcG9uc2UgfCBhbnkpIHtcclxuXHRjb25zb2xlLmVycm9yKGVycm9yLm1lc3NhZ2UgfHwgZXJyb3IpO1xyXG5cdHJldHVybiBPYnNlcnZhYmxlLnRocm93KGVycm9yLnN0YXR1cyk7XHJcbiAgICB9XHJcblxyXG4gIFxyXG5cclxufVxyXG5cclxuXHJcblxyXG4iXX0=