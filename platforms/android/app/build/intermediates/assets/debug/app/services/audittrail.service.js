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
var AuditTrailService = /** @class */ (function () {
    function AuditTrailService(http) {
        this.http = http;
        this.apiUrl = config_1.Config.apiUrl;
    }
    AuditTrailService.prototype.createAuditTrail = function (auditTrail) {
        console.log("Reaching Audit Trail Service " + JSON.stringify(auditTrail));
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
        return this.http.post(this.apiUrl + 'auditTrail', JSON.stringify(auditTrail), { responseType: 'json', headers: headers });
    };
    AuditTrailService.prototype.extractData = function (res) {
        var body = res.json();
        return body;
    };
    AuditTrailService.prototype.handleError = function (error) {
        console.error(error.message || error);
        return Observable_1.Observable.throw(error.status);
    };
    AuditTrailService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], AuditTrailService);
    return AuditTrailService;
}());
exports.AuditTrailService = AuditTrailService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXVkaXR0cmFpbC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXVkaXR0cmFpbC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTJDO0FBQzNDLDBFQUEwRTtBQUMxRSwwQ0FBMEM7QUFDMUMsNkNBQTRIO0FBQzVILG9DQUFvQztBQUNwQyw4Q0FBNkM7QUFDN0MsaUNBQStCO0FBSS9CLDJDQUEwQztBQUsxQztJQUdJLDJCQUFvQixJQUFnQjtRQUFoQixTQUFJLEdBQUosSUFBSSxDQUFZO1FBRm5DLFdBQU0sR0FBWSxlQUFNLENBQUMsTUFBTSxDQUFDO0lBRU8sQ0FBQztJQUl6Qyw0Q0FBZ0IsR0FBaEIsVUFBaUIsVUFBcUI7UUFDbEMsT0FBTyxDQUFDLEdBQUcsQ0FBQywrQkFBK0IsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7UUFDMUUsd0NBQXdDO1FBQ3hDLG9EQUFvRDtRQUNwRCxzREFBc0Q7UUFDdEQsK0RBQStEO1FBQy9ELHNEQUFzRDtRQUN2RCxzRkFBc0Y7UUFFN0YsMkNBQTJDO1FBQzNDLHVNQUF1TTtRQUN2TSxnRUFBZ0U7UUFFaEUsSUFBSSxPQUFPLEdBQUcsSUFBSSxrQkFBVyxFQUFFLENBQUM7UUFDaEMsT0FBTyxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsY0FBYyxFQUFFLGtCQUFrQixDQUFDLENBQUM7UUFLckQsbUVBQW1FO1FBQ25FLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBTSxJQUFJLENBQUMsTUFBTSxHQUFHLFlBQVksRUFBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxFQUFFLEVBQUMsWUFBWSxFQUFFLE1BQU0sRUFBQyxPQUFPLFNBQUEsRUFBQyxDQUFDLENBQUM7SUFDdEgsQ0FBQztJQVFNLHVDQUFXLEdBQW5CLFVBQW9CLEdBQWE7UUFDbkMsSUFBSSxJQUFJLEdBQUcsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ2YsTUFBTSxDQUFDLElBQUksQ0FBQztJQUNoQixDQUFDO0lBQ08sdUNBQVcsR0FBbkIsVUFBcUIsS0FBcUI7UUFDN0MsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsT0FBTyxJQUFJLEtBQUssQ0FBQyxDQUFDO1FBQ3RDLE1BQU0sQ0FBQyx1QkFBVSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDbkMsQ0FBQztJQTNDUSxpQkFBaUI7UUFEN0IsaUJBQVUsRUFBRTt5Q0FJaUIsaUJBQVU7T0FIM0IsaUJBQWlCLENBK0M3QjtJQUFELHdCQUFDO0NBQUEsQUEvQ0QsSUErQ0M7QUEvQ1ksOENBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG4vL2ltcG9ydCB7IEh0dHAsIEhlYWRlcnMsIFJlcXVlc3RPcHRpb25zLCBSZXNwb25zZSB9IGZyb20gJ0Bhbmd1bGFyL2h0dHAnO1xyXG4vLyBjb25zdCBjYWNoZWRFeHRlbmRzID0gZ2xvYmFsLl9fZXh0ZW5kcztcclxuaW1wb3J0IHtIdHRwQ2xpZW50LEh0dHBFdmVudCwgSHR0cEhhbmRsZXIsIEh0dHBJbnRlcmNlcHRvciwgSHR0cFJlcXVlc3QsSHR0cEhlYWRlcnMsSHR0cFBhcmFtc30gZnJvbSBcIkBhbmd1bGFyL2NvbW1vbi9odHRwXCI7XHJcbi8vIGdsb2JhbC5fX2V4dGVuZHMgPSBjYWNoZWRFeHRlbmRzO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcclxuaW1wb3J0ICdyeGpzL2FkZC9vcGVyYXRvci9tYXAnO1xyXG5cclxuaW1wb3J0IHsgQXVkaXRUcmFpbCwgQ29vcGVyYXRpdmUgfSBmcm9tICcuLi9tb2RlbHMvaW5kZXgnO1xyXG5cclxuaW1wb3J0IHsgQ29uZmlnIH0gZnJvbSBcIi4uL3NoYXJlZC9jb25maWdcIjtcclxuXHJcblxyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgQXVkaXRUcmFpbFNlcnZpY2Uge1xyXG4gICAgIGFwaVVybDogc3RyaW5nICA9IENvbmZpZy5hcGlVcmw7XHJcbiAgICBcclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgaHR0cDogSHR0cENsaWVudCkgeyB9XHJcblxyXG4gICBcclxuICAgIFxyXG4gICAgY3JlYXRlQXVkaXRUcmFpbChhdWRpdFRyYWlsOkF1ZGl0VHJhaWwgKTogT2JzZXJ2YWJsZTxhbnk+IHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIlJlYWNoaW5nIEF1ZGl0IFRyYWlsIFNlcnZpY2UgXCIgKyBKU09OLnN0cmluZ2lmeShhdWRpdFRyYWlsKSk7XHJcbiAgICAgICAgLy90aGlzLmFwaVVybCA9IHRoaXMuYXBpVXJsICsgJ3N0dWRlbnQnO1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwiIFJldHVybiBTdHVkZW50IElkIDIgXCIgKyBzdHVkZW50SWQpO1xyXG4gICAgICAgIC8vbGV0IHBhcmFtcyA9IG5ldyBIdHRwUGFyYW1zKCkuc2V0KCdfaWQnLCBzdHVkZW50SWQpO1xyXG4gICAgICAgIC8vIHZhciBjdXJyZW50VXNlciA6IGFueSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdjdXJyZW50VXNlcicpO1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwiQ3VycmVudCBVc2VyIDEgXCIgKyBjdXJyZW50VXNlci50b2tlbik7XHJcbiAgICAgICAvLyBjb25zdCBoZWFkZXJzID0gbmV3IEh0dHBIZWFkZXJzKCkuc2V0KFwiQXV0aG9yaXphdGlvblwiLCBcIkpXVCBcIiArIGN1cnJlbnRVc2VyLnRva2VuKTtcclxuXHJcbi8vICAgICAgICAgbGV0IGhlYWRlcnMgPSBuZXcgSHR0cEhlYWRlcnMoKTtcclxuLy8gaGVhZGVycyA9IGhlYWRlcnMuYXBwZW5kKFwiQXV0aG9yaXphdGlvblwiLCBcIkpXVCBcIiArIFwiZXlKMGVYQWlPaUpLVjFRaUxDSmhiR2NpT2lKSVV6STFOaUo5LmV5SnBaQ0k2SWpnMk1EbGtZemt4TFRBM1pETXROREEzTkMxaU1HUXhMV1ZrTmpReVpqTXdZVFk1WkNKOS5rcFd4d05QYlF2RzFsM1ZiOFZiNlJRd0NreTFTcXlkaEZQdElDb2h5RDFBXCIpO1xyXG4vLyBoZWFkZXJzID0gaGVhZGVycy5hcHBlbmQoXCJDb250ZW50LVR5cGVcIiwgXCJhcHBsaWNhdGlvbi9qc29uXCIpO1xyXG5cclxubGV0IGhlYWRlcnMgPSBuZXcgSHR0cEhlYWRlcnMoKTtcclxuaGVhZGVycyA9IGhlYWRlcnMuYXBwZW5kKFwiQ29udGVudC1UeXBlXCIsIFwiYXBwbGljYXRpb24vanNvblwiKTtcclxuXHJcblxyXG5cclxuXHJcbiAgICAgICAgLy9BdXRob3JpemF0aW9uOiBcIkpXVCBcIiArIGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdjdXJyZW50VXNlcicpLnRva2VuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0PGFueT4odGhpcy5hcGlVcmwgKyAnYXVkaXRUcmFpbCcsSlNPTi5zdHJpbmdpZnkoYXVkaXRUcmFpbCksIHtyZXNwb25zZVR5cGU6ICdqc29uJyxoZWFkZXJzfSk7XHJcbiAgICB9IFxyXG5cclxuICBcclxuXHJcbiAgICBcclxuXHJcbiAgIFxyXG5cclxuICAgcHJpdmF0ZSBleHRyYWN0RGF0YShyZXM6IFJlc3BvbnNlKSB7XHJcblx0bGV0IGJvZHkgPSByZXMuanNvbigpO1xyXG4gICAgICAgIHJldHVybiBib2R5O1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBoYW5kbGVFcnJvciAoZXJyb3I6IFJlc3BvbnNlIHwgYW55KSB7XHJcblx0Y29uc29sZS5lcnJvcihlcnJvci5tZXNzYWdlIHx8IGVycm9yKTtcclxuXHRyZXR1cm4gT2JzZXJ2YWJsZS50aHJvdyhlcnJvci5zdGF0dXMpO1xyXG4gICAgfVxyXG5cclxuICBcclxuXHJcbn1cclxuXHJcblxyXG5cclxuIl19