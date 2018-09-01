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
var AdvertService = /** @class */ (function () {
    function AdvertService(http) {
        this.http = http;
        this.apiUrl = config_1.Config.apiUrl;
    }
    AdvertService.prototype.getallAdverts = function () {
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
        return this.http.get(this.apiUrl + 'adverts', { responseType: 'json', headers: headers });
    };
    AdvertService.prototype.extractData = function (res) {
        var body = res.json();
        return body;
    };
    AdvertService.prototype.handleError = function (error) {
        console.error(error.message || error);
        return Observable_1.Observable.throw(error.status);
    };
    AdvertService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], AdvertService);
    return AdvertService;
}());
exports.AdvertService = AdvertService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWR2ZXJ0LnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhZHZlcnQuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUEyQztBQUMzQywwRUFBMEU7QUFDMUUsMENBQTBDO0FBQzFDLDZDQUE0SDtBQUM1SCxvQ0FBb0M7QUFDcEMsOENBQTZDO0FBQzdDLGlDQUErQjtBQUkvQiwyQ0FBMEM7QUFNMUM7SUFHSSx1QkFBb0IsSUFBZ0I7UUFBaEIsU0FBSSxHQUFKLElBQUksQ0FBWTtRQUZuQyxXQUFNLEdBQVksZUFBTSxDQUFDLE1BQU0sQ0FBQztJQUVPLENBQUM7SUFNekMscUNBQWEsR0FBYjtRQUNJLHdDQUF3QztRQUN4QyxvREFBb0Q7UUFDcEQsc0RBQXNEO1FBQ3RELElBQUksV0FBVyxHQUFTLFlBQVksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDNUQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsR0FBRyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDcEQsc0ZBQXNGO1FBRXJGLDJDQUEyQztRQUMzQyx1TUFBdU07UUFDdk0sZ0VBQWdFO1FBRWhFLElBQUksT0FBTyxHQUFHLElBQUksa0JBQVcsRUFBRSxDQUFDO1FBQ2hDLE9BQU8sR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLGNBQWMsRUFBRSxrQkFBa0IsQ0FBQyxDQUFDO1FBSzdELG1FQUFtRTtRQUNuRSxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQU0sSUFBSSxDQUFDLE1BQU0sR0FBRyxTQUFTLEVBQUUsRUFBQyxZQUFZLEVBQUUsTUFBTSxFQUFDLE9BQU8sU0FBQSxFQUFDLENBQUMsQ0FBQztJQUN2RixDQUFDO0lBa0JNLG1DQUFXLEdBQW5CLFVBQW9CLEdBQWE7UUFDbkMsSUFBSSxJQUFJLEdBQUcsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ2YsTUFBTSxDQUFDLElBQUksQ0FBQztJQUNoQixDQUFDO0lBQ08sbUNBQVcsR0FBbkIsVUFBcUIsS0FBcUI7UUFDN0MsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsT0FBTyxJQUFJLEtBQUssQ0FBQyxDQUFDO1FBQ3RDLE1BQU0sQ0FBQyx1QkFBVSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDbkMsQ0FBQztJQXREUSxhQUFhO1FBRHpCLGlCQUFVLEVBQUU7eUNBSWlCLGlCQUFVO09BSDNCLGFBQWEsQ0EwRHpCO0lBQUQsb0JBQUM7Q0FBQSxBQTFERCxJQTBEQztBQTFEWSxzQ0FBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuLy9pbXBvcnQgeyBIdHRwLCBIZWFkZXJzLCBSZXF1ZXN0T3B0aW9ucywgUmVzcG9uc2UgfSBmcm9tICdAYW5ndWxhci9odHRwJztcclxuLy8gY29uc3QgY2FjaGVkRXh0ZW5kcyA9IGdsb2JhbC5fX2V4dGVuZHM7XHJcbmltcG9ydCB7SHR0cENsaWVudCxIdHRwRXZlbnQsIEh0dHBIYW5kbGVyLCBIdHRwSW50ZXJjZXB0b3IsIEh0dHBSZXF1ZXN0LEh0dHBIZWFkZXJzLEh0dHBQYXJhbXN9IGZyb20gXCJAYW5ndWxhci9jb21tb24vaHR0cFwiO1xyXG4vLyBnbG9iYWwuX19leHRlbmRzID0gY2FjaGVkRXh0ZW5kcztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XHJcbmltcG9ydCAncnhqcy9hZGQvb3BlcmF0b3IvbWFwJztcclxuXHJcbmltcG9ydCB7IFVzZXIsIFByb2R1Y3QgfSBmcm9tICcuLi9tb2RlbHMvaW5kZXgnO1xyXG5cclxuaW1wb3J0IHsgQ29uZmlnIH0gZnJvbSBcIi4uL3NoYXJlZC9jb25maWdcIjtcclxuXHJcblxyXG5cclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIEFkdmVydFNlcnZpY2Uge1xyXG4gICAgIGFwaVVybDogc3RyaW5nICA9IENvbmZpZy5hcGlVcmw7XHJcbiAgICBcclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgaHR0cDogSHR0cENsaWVudCkgeyB9XHJcblxyXG4gICBcclxuICAgIFxyXG4gICBcclxuXHJcbiAgICBnZXRhbGxBZHZlcnRzKCk6IE9ic2VydmFibGU8YW55PiB7XHJcbiAgICAgICAgLy90aGlzLmFwaVVybCA9IHRoaXMuYXBpVXJsICsgJ3N0dWRlbnQnO1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwiIFJldHVybiBTdHVkZW50IElkIDIgXCIgKyBzdHVkZW50SWQpO1xyXG4gICAgICAgIC8vbGV0IHBhcmFtcyA9IG5ldyBIdHRwUGFyYW1zKCkuc2V0KCdfaWQnLCBzdHVkZW50SWQpO1xyXG4gICAgICAgIHZhciBjdXJyZW50VXNlciA6IGFueSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdjdXJyZW50VXNlcicpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiQ3VycmVudCBVc2VyIDEgXCIgKyBjdXJyZW50VXNlci50b2tlbik7XHJcbiAgICAgICAvLyBjb25zdCBoZWFkZXJzID0gbmV3IEh0dHBIZWFkZXJzKCkuc2V0KFwiQXV0aG9yaXphdGlvblwiLCBcIkpXVCBcIiArIGN1cnJlbnRVc2VyLnRva2VuKTtcclxuXHJcbiAgICAgICAgLy8gICAgICAgICBsZXQgaGVhZGVycyA9IG5ldyBIdHRwSGVhZGVycygpO1xyXG4gICAgICAgIC8vIGhlYWRlcnMgPSBoZWFkZXJzLmFwcGVuZChcIkF1dGhvcml6YXRpb25cIiwgXCJKV1QgXCIgKyBcImV5SjBlWEFpT2lKS1YxUWlMQ0poYkdjaU9pSklVekkxTmlKOS5leUpwWkNJNklqZzJNRGxrWXpreExUQTNaRE10TkRBM05DMWlNR1F4TFdWa05qUXlaak13WVRZNVpDSjkua3BXeHdOUGJRdkcxbDNWYjhWYjZSUXdDa3kxU3F5ZGhGUHRJQ29oeUQxQVwiKTtcclxuICAgICAgICAvLyBoZWFkZXJzID0gaGVhZGVycy5hcHBlbmQoXCJDb250ZW50LVR5cGVcIiwgXCJhcHBsaWNhdGlvbi9qc29uXCIpO1xyXG5cclxuICAgICAgICBsZXQgaGVhZGVycyA9IG5ldyBIdHRwSGVhZGVycygpO1xyXG4gICAgICAgIGhlYWRlcnMgPSBoZWFkZXJzLmFwcGVuZChcIkNvbnRlbnQtVHlwZVwiLCBcImFwcGxpY2F0aW9uL2pzb25cIik7XHJcblxyXG5cclxuXHJcblxyXG4gICAgICAgIC8vQXV0aG9yaXphdGlvbjogXCJKV1QgXCIgKyBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnY3VycmVudFVzZXInKS50b2tlblxyXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0PGFueT4odGhpcy5hcGlVcmwgKyAnYWR2ZXJ0cycsIHtyZXNwb25zZVR5cGU6ICdqc29uJyxoZWFkZXJzfSk7XHJcbiAgICB9IFxyXG5cclxuICBcclxuXHJcbiAgIFxyXG5cclxuICAgIFxyXG5cclxuICBcclxuICAgXHJcblxyXG5cclxuICBcclxuXHJcbiAgICBcclxuXHJcbiAgIFxyXG5cclxuICAgcHJpdmF0ZSBleHRyYWN0RGF0YShyZXM6IFJlc3BvbnNlKSB7XHJcblx0bGV0IGJvZHkgPSByZXMuanNvbigpO1xyXG4gICAgICAgIHJldHVybiBib2R5O1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBoYW5kbGVFcnJvciAoZXJyb3I6IFJlc3BvbnNlIHwgYW55KSB7XHJcblx0Y29uc29sZS5lcnJvcihlcnJvci5tZXNzYWdlIHx8IGVycm9yKTtcclxuXHRyZXR1cm4gT2JzZXJ2YWJsZS50aHJvdyhlcnJvci5zdGF0dXMpO1xyXG4gICAgfVxyXG5cclxuICBcclxuXHJcbn1cclxuXHJcblxyXG5cclxuIl19