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
var TransactionService = /** @class */ (function () {
    function TransactionService(http) {
        this.http = http;
        this.apiUrl = config_1.Config.apiUrl;
    }
    TransactionService.prototype.getAllTransactions = function (cooperId) {
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
        return this.http.get(this.apiUrl + 'transaction/bycooper/' + cooperId, { responseType: 'json', headers: headers });
    };
    TransactionService.prototype.extractData = function (res) {
        var body = res.json();
        return body;
    };
    TransactionService.prototype.handleError = function (error) {
        console.error(error.message || error);
        return Observable_1.Observable.throw(error.status);
    };
    TransactionService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], TransactionService);
    return TransactionService;
}());
exports.TransactionService = TransactionService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNhY3Rpb24uc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInRyYW5zYWN0aW9uLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMkM7QUFDM0MsMEVBQTBFO0FBQzFFLDBDQUEwQztBQUMxQyw2Q0FBNEg7QUFDNUgsb0NBQW9DO0FBQ3BDLDhDQUE2QztBQUM3QyxpQ0FBK0I7QUFJL0IsMkNBQTBDO0FBSzFDO0lBR0ksNEJBQW9CLElBQWdCO1FBQWhCLFNBQUksR0FBSixJQUFJLENBQVk7UUFGbkMsV0FBTSxHQUFZLGVBQU0sQ0FBQyxNQUFNLENBQUM7SUFFTyxDQUFDO0lBSXpDLCtDQUFrQixHQUFsQixVQUFtQixRQUFnQjtRQUMvQix3Q0FBd0M7UUFDeEMsb0RBQW9EO1FBQ3BELHNEQUFzRDtRQUN0RCwrREFBK0Q7UUFDL0Qsc0RBQXNEO1FBQ3ZELHNGQUFzRjtRQUU3RiwyQ0FBMkM7UUFDM0MsdU1BQXVNO1FBQ3ZNLGdFQUFnRTtRQUVoRSxJQUFJLE9BQU8sR0FBRyxJQUFJLGtCQUFXLEVBQUUsQ0FBQztRQUNoQyxPQUFPLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxjQUFjLEVBQUUsa0JBQWtCLENBQUMsQ0FBQztRQUtyRCxtRUFBbUU7UUFDbkUsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFNLElBQUksQ0FBQyxNQUFNLEdBQUcsdUJBQXVCLEdBQUcsUUFBUSxFQUFFLEVBQUMsWUFBWSxFQUFFLE1BQU0sRUFBQyxPQUFPLFNBQUEsRUFBQyxDQUFDLENBQUM7SUFDaEgsQ0FBQztJQVFNLHdDQUFXLEdBQW5CLFVBQW9CLEdBQWE7UUFDbkMsSUFBSSxJQUFJLEdBQUcsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ2YsTUFBTSxDQUFDLElBQUksQ0FBQztJQUNoQixDQUFDO0lBQ08sd0NBQVcsR0FBbkIsVUFBcUIsS0FBcUI7UUFDN0MsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsT0FBTyxJQUFJLEtBQUssQ0FBQyxDQUFDO1FBQ3RDLE1BQU0sQ0FBQyx1QkFBVSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDbkMsQ0FBQztJQTFDUSxrQkFBa0I7UUFEOUIsaUJBQVUsRUFBRTt5Q0FJaUIsaUJBQVU7T0FIM0Isa0JBQWtCLENBOEM5QjtJQUFELHlCQUFDO0NBQUEsQUE5Q0QsSUE4Q0M7QUE5Q1ksZ0RBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG4vL2ltcG9ydCB7IEh0dHAsIEhlYWRlcnMsIFJlcXVlc3RPcHRpb25zLCBSZXNwb25zZSB9IGZyb20gJ0Bhbmd1bGFyL2h0dHAnO1xyXG4vLyBjb25zdCBjYWNoZWRFeHRlbmRzID0gZ2xvYmFsLl9fZXh0ZW5kcztcclxuaW1wb3J0IHtIdHRwQ2xpZW50LEh0dHBFdmVudCwgSHR0cEhhbmRsZXIsIEh0dHBJbnRlcmNlcHRvciwgSHR0cFJlcXVlc3QsSHR0cEhlYWRlcnMsSHR0cFBhcmFtc30gZnJvbSBcIkBhbmd1bGFyL2NvbW1vbi9odHRwXCI7XHJcbi8vIGdsb2JhbC5fX2V4dGVuZHMgPSBjYWNoZWRFeHRlbmRzO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcclxuaW1wb3J0ICdyeGpzL2FkZC9vcGVyYXRvci9tYXAnO1xyXG5cclxuaW1wb3J0IHsgQ29vcGVyYXRpdmUgfSBmcm9tICcuLi9tb2RlbHMvaW5kZXgnO1xyXG5cclxuaW1wb3J0IHsgQ29uZmlnIH0gZnJvbSBcIi4uL3NoYXJlZC9jb25maWdcIjtcclxuXHJcblxyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgVHJhbnNhY3Rpb25TZXJ2aWNlIHtcclxuICAgICBhcGlVcmw6IHN0cmluZyAgPSBDb25maWcuYXBpVXJsO1xyXG4gICAgXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGh0dHA6IEh0dHBDbGllbnQpIHsgfVxyXG5cclxuICAgXHJcbiAgICBcclxuICAgIGdldEFsbFRyYW5zYWN0aW9ucyhjb29wZXJJZDogU3RyaW5nKTogT2JzZXJ2YWJsZTxhbnk+IHtcclxuICAgICAgICAvL3RoaXMuYXBpVXJsID0gdGhpcy5hcGlVcmwgKyAnc3R1ZGVudCc7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCIgUmV0dXJuIFN0dWRlbnQgSWQgMiBcIiArIHN0dWRlbnRJZCk7XHJcbiAgICAgICAgLy9sZXQgcGFyYW1zID0gbmV3IEh0dHBQYXJhbXMoKS5zZXQoJ19pZCcsIHN0dWRlbnRJZCk7XHJcbiAgICAgICAgLy8gdmFyIGN1cnJlbnRVc2VyIDogYW55ID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2N1cnJlbnRVc2VyJyk7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJDdXJyZW50IFVzZXIgMSBcIiArIGN1cnJlbnRVc2VyLnRva2VuKTtcclxuICAgICAgIC8vIGNvbnN0IGhlYWRlcnMgPSBuZXcgSHR0cEhlYWRlcnMoKS5zZXQoXCJBdXRob3JpemF0aW9uXCIsIFwiSldUIFwiICsgY3VycmVudFVzZXIudG9rZW4pO1xyXG5cclxuLy8gICAgICAgICBsZXQgaGVhZGVycyA9IG5ldyBIdHRwSGVhZGVycygpO1xyXG4vLyBoZWFkZXJzID0gaGVhZGVycy5hcHBlbmQoXCJBdXRob3JpemF0aW9uXCIsIFwiSldUIFwiICsgXCJleUowZVhBaU9pSktWMVFpTENKaGJHY2lPaUpJVXpJMU5pSjkuZXlKcFpDSTZJamcyTURsa1l6a3hMVEEzWkRNdE5EQTNOQzFpTUdReExXVmtOalF5WmpNd1lUWTVaQ0o5LmtwV3h3TlBiUXZHMWwzVmI4VmI2UlF3Q2t5MVNxeWRoRlB0SUNvaHlEMUFcIik7XHJcbi8vIGhlYWRlcnMgPSBoZWFkZXJzLmFwcGVuZChcIkNvbnRlbnQtVHlwZVwiLCBcImFwcGxpY2F0aW9uL2pzb25cIik7XHJcblxyXG5sZXQgaGVhZGVycyA9IG5ldyBIdHRwSGVhZGVycygpO1xyXG5oZWFkZXJzID0gaGVhZGVycy5hcHBlbmQoXCJDb250ZW50LVR5cGVcIiwgXCJhcHBsaWNhdGlvbi9qc29uXCIpO1xyXG5cclxuXHJcblxyXG5cclxuICAgICAgICAvL0F1dGhvcml6YXRpb246IFwiSldUIFwiICsgbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2N1cnJlbnRVc2VyJykudG9rZW5cclxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldDxhbnk+KHRoaXMuYXBpVXJsICsgJ3RyYW5zYWN0aW9uL2J5Y29vcGVyLycgKyBjb29wZXJJZCwge3Jlc3BvbnNlVHlwZTogJ2pzb24nLGhlYWRlcnN9KTtcclxuICAgIH0gXHJcblxyXG4gIFxyXG5cclxuICAgIFxyXG5cclxuICAgXHJcblxyXG4gICBwcml2YXRlIGV4dHJhY3REYXRhKHJlczogUmVzcG9uc2UpIHtcclxuXHRsZXQgYm9keSA9IHJlcy5qc29uKCk7XHJcbiAgICAgICAgcmV0dXJuIGJvZHk7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIGhhbmRsZUVycm9yIChlcnJvcjogUmVzcG9uc2UgfCBhbnkpIHtcclxuXHRjb25zb2xlLmVycm9yKGVycm9yLm1lc3NhZ2UgfHwgZXJyb3IpO1xyXG5cdHJldHVybiBPYnNlcnZhYmxlLnRocm93KGVycm9yLnN0YXR1cyk7XHJcbiAgICB9XHJcblxyXG4gIFxyXG5cclxufVxyXG5cclxuXHJcblxyXG4iXX0=