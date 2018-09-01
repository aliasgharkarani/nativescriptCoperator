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
var CooperativeService = /** @class */ (function () {
    function CooperativeService(http) {
        this.http = http;
        this.apiUrl = config_1.Config.apiUrl;
    }
    CooperativeService.prototype.getAllCooperative = function () {
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
    CooperativeService.prototype.extractData = function (res) {
        var body = res.json();
        return body;
    };
    CooperativeService.prototype.handleError = function (error) {
        console.error(error.message || error);
        return Observable_1.Observable.throw(error.status);
    };
    CooperativeService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], CooperativeService);
    return CooperativeService;
}());
exports.CooperativeService = CooperativeService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29vcGVyYXRpdmUuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNvb3BlcmF0aXZlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMkM7QUFDM0MsMEVBQTBFO0FBQzFFLDBDQUEwQztBQUMxQyw2Q0FBNEg7QUFDNUgsb0NBQW9DO0FBQ3BDLDhDQUE2QztBQUM3QyxpQ0FBK0I7QUFJL0IsMkNBQTBDO0FBSzFDO0lBR0ksNEJBQW9CLElBQWdCO1FBQWhCLFNBQUksR0FBSixJQUFJLENBQVk7UUFGbkMsV0FBTSxHQUFZLGVBQU0sQ0FBQyxNQUFNLENBQUM7SUFFTyxDQUFDO0lBSXpDLDhDQUFpQixHQUFqQjtRQUNJLHdDQUF3QztRQUN4QyxvREFBb0Q7UUFDcEQsc0RBQXNEO1FBQ3RELCtEQUErRDtRQUMvRCxzREFBc0Q7UUFDdkQsc0ZBQXNGO1FBRTdGLDJDQUEyQztRQUMzQyx1TUFBdU07UUFDdk0sZ0VBQWdFO1FBRWhFLElBQUksT0FBTyxHQUFHLElBQUksa0JBQVcsRUFBRSxDQUFDO1FBQ2hDLE9BQU8sR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLGNBQWMsRUFBRSxrQkFBa0IsQ0FBQyxDQUFDO1FBS3JELG1FQUFtRTtRQUNuRSxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQU0sSUFBSSxDQUFDLE1BQU0sR0FBRyxjQUFjLEVBQUUsRUFBQyxZQUFZLEVBQUUsTUFBTSxFQUFDLE9BQU8sU0FBQSxFQUFDLENBQUMsQ0FBQztJQUM1RixDQUFDO0lBUU0sd0NBQVcsR0FBbkIsVUFBb0IsR0FBYTtRQUNuQyxJQUFJLElBQUksR0FBRyxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDZixNQUFNLENBQUMsSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFDTyx3Q0FBVyxHQUFuQixVQUFxQixLQUFxQjtRQUM3QyxPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxPQUFPLElBQUksS0FBSyxDQUFDLENBQUM7UUFDdEMsTUFBTSxDQUFDLHVCQUFVLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNuQyxDQUFDO0lBMUNRLGtCQUFrQjtRQUQ5QixpQkFBVSxFQUFFO3lDQUlpQixpQkFBVTtPQUgzQixrQkFBa0IsQ0E4QzlCO0lBQUQseUJBQUM7Q0FBQSxBQTlDRCxJQThDQztBQTlDWSxnREFBa0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbi8vaW1wb3J0IHsgSHR0cCwgSGVhZGVycywgUmVxdWVzdE9wdGlvbnMsIFJlc3BvbnNlIH0gZnJvbSAnQGFuZ3VsYXIvaHR0cCc7XHJcbi8vIGNvbnN0IGNhY2hlZEV4dGVuZHMgPSBnbG9iYWwuX19leHRlbmRzO1xyXG5pbXBvcnQge0h0dHBDbGllbnQsSHR0cEV2ZW50LCBIdHRwSGFuZGxlciwgSHR0cEludGVyY2VwdG9yLCBIdHRwUmVxdWVzdCxIdHRwSGVhZGVycyxIdHRwUGFyYW1zfSBmcm9tIFwiQGFuZ3VsYXIvY29tbW9uL2h0dHBcIjtcclxuLy8gZ2xvYmFsLl9fZXh0ZW5kcyA9IGNhY2hlZEV4dGVuZHM7XHJcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xyXG5pbXBvcnQgJ3J4anMvYWRkL29wZXJhdG9yL21hcCc7XHJcblxyXG5pbXBvcnQgeyBDb29wZXJhdGl2ZSB9IGZyb20gJy4uL21vZGVscy9pbmRleCc7XHJcblxyXG5pbXBvcnQgeyBDb25maWcgfSBmcm9tIFwiLi4vc2hhcmVkL2NvbmZpZ1wiO1xyXG5cclxuXHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBDb29wZXJhdGl2ZVNlcnZpY2Uge1xyXG4gICAgIGFwaVVybDogc3RyaW5nICA9IENvbmZpZy5hcGlVcmw7XHJcbiAgICBcclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgaHR0cDogSHR0cENsaWVudCkgeyB9XHJcblxyXG4gICBcclxuICAgIFxyXG4gICAgZ2V0QWxsQ29vcGVyYXRpdmUoKTogT2JzZXJ2YWJsZTxhbnk+IHtcclxuICAgICAgICAvL3RoaXMuYXBpVXJsID0gdGhpcy5hcGlVcmwgKyAnc3R1ZGVudCc7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCIgUmV0dXJuIFN0dWRlbnQgSWQgMiBcIiArIHN0dWRlbnRJZCk7XHJcbiAgICAgICAgLy9sZXQgcGFyYW1zID0gbmV3IEh0dHBQYXJhbXMoKS5zZXQoJ19pZCcsIHN0dWRlbnRJZCk7XHJcbiAgICAgICAgLy8gdmFyIGN1cnJlbnRVc2VyIDogYW55ID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2N1cnJlbnRVc2VyJyk7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJDdXJyZW50IFVzZXIgMSBcIiArIGN1cnJlbnRVc2VyLnRva2VuKTtcclxuICAgICAgIC8vIGNvbnN0IGhlYWRlcnMgPSBuZXcgSHR0cEhlYWRlcnMoKS5zZXQoXCJBdXRob3JpemF0aW9uXCIsIFwiSldUIFwiICsgY3VycmVudFVzZXIudG9rZW4pO1xyXG5cclxuLy8gICAgICAgICBsZXQgaGVhZGVycyA9IG5ldyBIdHRwSGVhZGVycygpO1xyXG4vLyBoZWFkZXJzID0gaGVhZGVycy5hcHBlbmQoXCJBdXRob3JpemF0aW9uXCIsIFwiSldUIFwiICsgXCJleUowZVhBaU9pSktWMVFpTENKaGJHY2lPaUpJVXpJMU5pSjkuZXlKcFpDSTZJamcyTURsa1l6a3hMVEEzWkRNdE5EQTNOQzFpTUdReExXVmtOalF5WmpNd1lUWTVaQ0o5LmtwV3h3TlBiUXZHMWwzVmI4VmI2UlF3Q2t5MVNxeWRoRlB0SUNvaHlEMUFcIik7XHJcbi8vIGhlYWRlcnMgPSBoZWFkZXJzLmFwcGVuZChcIkNvbnRlbnQtVHlwZVwiLCBcImFwcGxpY2F0aW9uL2pzb25cIik7XHJcblxyXG5sZXQgaGVhZGVycyA9IG5ldyBIdHRwSGVhZGVycygpO1xyXG5oZWFkZXJzID0gaGVhZGVycy5hcHBlbmQoXCJDb250ZW50LVR5cGVcIiwgXCJhcHBsaWNhdGlvbi9qc29uXCIpO1xyXG5cclxuXHJcblxyXG5cclxuICAgICAgICAvL0F1dGhvcml6YXRpb246IFwiSldUIFwiICsgbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2N1cnJlbnRVc2VyJykudG9rZW5cclxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldDxhbnk+KHRoaXMuYXBpVXJsICsgJ2Nvb3BlcmF0aXZlcycsIHtyZXNwb25zZVR5cGU6ICdqc29uJyxoZWFkZXJzfSk7XHJcbiAgICB9IFxyXG5cclxuICBcclxuXHJcbiAgICBcclxuXHJcbiAgIFxyXG5cclxuICAgcHJpdmF0ZSBleHRyYWN0RGF0YShyZXM6IFJlc3BvbnNlKSB7XHJcblx0bGV0IGJvZHkgPSByZXMuanNvbigpO1xyXG4gICAgICAgIHJldHVybiBib2R5O1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBoYW5kbGVFcnJvciAoZXJyb3I6IFJlc3BvbnNlIHwgYW55KSB7XHJcblx0Y29uc29sZS5lcnJvcihlcnJvci5tZXNzYWdlIHx8IGVycm9yKTtcclxuXHRyZXR1cm4gT2JzZXJ2YWJsZS50aHJvdyhlcnJvci5zdGF0dXMpO1xyXG4gICAgfVxyXG5cclxuICBcclxuXHJcbn1cclxuXHJcblxyXG5cclxuIl19