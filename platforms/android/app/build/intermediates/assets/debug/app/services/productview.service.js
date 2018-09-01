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
var ProductViewService = /** @class */ (function () {
    function ProductViewService(http) {
        this.http = http;
        this.apiUrl = config_1.Config.apiUrl;
    }
    ProductViewService.prototype.getallViewedProducts = function (userId) {
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
        return this.http.get(this.apiUrl + 'productview/' + userId, { responseType: 'json', headers: headers });
    };
    ProductViewService.prototype.extractData = function (res) {
        var body = res.json();
        return body;
    };
    ProductViewService.prototype.handleError = function (error) {
        console.error(error.message || error);
        return Observable_1.Observable.throw(error.status);
    };
    ProductViewService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], ProductViewService);
    return ProductViewService;
}());
exports.ProductViewService = ProductViewService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZHVjdHZpZXcuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInByb2R1Y3R2aWV3LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMkM7QUFDM0MsMEVBQTBFO0FBQzFFLDBDQUEwQztBQUMxQyw2Q0FBNEg7QUFDNUgsb0NBQW9DO0FBQ3BDLDhDQUE2QztBQUM3QyxpQ0FBK0I7QUFJL0IsMkNBQTBDO0FBSzFDO0lBR0ksNEJBQW9CLElBQWdCO1FBQWhCLFNBQUksR0FBSixJQUFJLENBQVk7UUFGbkMsV0FBTSxHQUFZLGVBQU0sQ0FBQyxNQUFNLENBQUM7SUFFTyxDQUFDO0lBTXpDLGlEQUFvQixHQUFwQixVQUFxQixNQUFjO1FBQy9CLHdDQUF3QztRQUN4QyxvREFBb0Q7UUFDcEQsc0RBQXNEO1FBQ3RELElBQUksV0FBVyxHQUFTLFlBQVksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDNUQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsR0FBRyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDcEQsc0ZBQXNGO1FBRXJGLDJDQUEyQztRQUMzQyx1TUFBdU07UUFDdk0sZ0VBQWdFO1FBRWhFLElBQUksT0FBTyxHQUFHLElBQUksa0JBQVcsRUFBRSxDQUFDO1FBQ2hDLE9BQU8sR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLGNBQWMsRUFBRSxrQkFBa0IsQ0FBQyxDQUFDO1FBSzdELG1FQUFtRTtRQUNuRSxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQU0sSUFBSSxDQUFDLE1BQU0sR0FBRyxjQUFjLEdBQUcsTUFBTSxFQUFHLEVBQUMsWUFBWSxFQUFFLE1BQU0sRUFBQyxPQUFPLFNBQUEsRUFBQyxDQUFDLENBQUM7SUFDdEcsQ0FBQztJQWlCTSx3Q0FBVyxHQUFuQixVQUFvQixHQUFhO1FBQ25DLElBQUksSUFBSSxHQUFHLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNmLE1BQU0sQ0FBQyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUNPLHdDQUFXLEdBQW5CLFVBQXFCLEtBQXFCO1FBQzdDLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLE9BQU8sSUFBSSxLQUFLLENBQUMsQ0FBQztRQUN0QyxNQUFNLENBQUMsdUJBQVUsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ25DLENBQUM7SUFyRFEsa0JBQWtCO1FBRDlCLGlCQUFVLEVBQUU7eUNBSWlCLGlCQUFVO09BSDNCLGtCQUFrQixDQXlEOUI7SUFBRCx5QkFBQztDQUFBLEFBekRELElBeURDO0FBekRZLGdEQUFrQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuLy9pbXBvcnQgeyBIdHRwLCBIZWFkZXJzLCBSZXF1ZXN0T3B0aW9ucywgUmVzcG9uc2UgfSBmcm9tICdAYW5ndWxhci9odHRwJztcclxuLy8gY29uc3QgY2FjaGVkRXh0ZW5kcyA9IGdsb2JhbC5fX2V4dGVuZHM7XHJcbmltcG9ydCB7SHR0cENsaWVudCxIdHRwRXZlbnQsIEh0dHBIYW5kbGVyLCBIdHRwSW50ZXJjZXB0b3IsIEh0dHBSZXF1ZXN0LEh0dHBIZWFkZXJzLEh0dHBQYXJhbXN9IGZyb20gXCJAYW5ndWxhci9jb21tb24vaHR0cFwiO1xyXG4vLyBnbG9iYWwuX19leHRlbmRzID0gY2FjaGVkRXh0ZW5kcztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XHJcbmltcG9ydCAncnhqcy9hZGQvb3BlcmF0b3IvbWFwJztcclxuXHJcbmltcG9ydCB7IFVzZXIsIFByb2R1Y3QgfSBmcm9tICcuLi9tb2RlbHMvaW5kZXgnO1xyXG5cclxuaW1wb3J0IHsgQ29uZmlnIH0gZnJvbSBcIi4uL3NoYXJlZC9jb25maWdcIjtcclxuXHJcblxyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgUHJvZHVjdFZpZXdTZXJ2aWNlIHtcclxuICAgICBhcGlVcmw6IHN0cmluZyAgPSBDb25maWcuYXBpVXJsO1xyXG4gICAgXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGh0dHA6IEh0dHBDbGllbnQpIHsgfVxyXG5cclxuICAgXHJcbiAgICBcclxuICAgXHJcblxyXG4gICAgZ2V0YWxsVmlld2VkUHJvZHVjdHModXNlcklkOiBTdHJpbmcpOiBPYnNlcnZhYmxlPGFueT4ge1xyXG4gICAgICAgIC8vdGhpcy5hcGlVcmwgPSB0aGlzLmFwaVVybCArICdzdHVkZW50JztcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIiBSZXR1cm4gU3R1ZGVudCBJZCAyIFwiICsgc3R1ZGVudElkKTtcclxuICAgICAgICAvL2xldCBwYXJhbXMgPSBuZXcgSHR0cFBhcmFtcygpLnNldCgnX2lkJywgc3R1ZGVudElkKTtcclxuICAgICAgICB2YXIgY3VycmVudFVzZXIgOiBhbnkgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnY3VycmVudFVzZXInKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIkN1cnJlbnQgVXNlciAxIFwiICsgY3VycmVudFVzZXIudG9rZW4pO1xyXG4gICAgICAgLy8gY29uc3QgaGVhZGVycyA9IG5ldyBIdHRwSGVhZGVycygpLnNldChcIkF1dGhvcml6YXRpb25cIiwgXCJKV1QgXCIgKyBjdXJyZW50VXNlci50b2tlbik7XHJcblxyXG4gICAgICAgIC8vICAgICAgICAgbGV0IGhlYWRlcnMgPSBuZXcgSHR0cEhlYWRlcnMoKTtcclxuICAgICAgICAvLyBoZWFkZXJzID0gaGVhZGVycy5hcHBlbmQoXCJBdXRob3JpemF0aW9uXCIsIFwiSldUIFwiICsgXCJleUowZVhBaU9pSktWMVFpTENKaGJHY2lPaUpJVXpJMU5pSjkuZXlKcFpDSTZJamcyTURsa1l6a3hMVEEzWkRNdE5EQTNOQzFpTUdReExXVmtOalF5WmpNd1lUWTVaQ0o5LmtwV3h3TlBiUXZHMWwzVmI4VmI2UlF3Q2t5MVNxeWRoRlB0SUNvaHlEMUFcIik7XHJcbiAgICAgICAgLy8gaGVhZGVycyA9IGhlYWRlcnMuYXBwZW5kKFwiQ29udGVudC1UeXBlXCIsIFwiYXBwbGljYXRpb24vanNvblwiKTtcclxuXHJcbiAgICAgICAgbGV0IGhlYWRlcnMgPSBuZXcgSHR0cEhlYWRlcnMoKTtcclxuICAgICAgICBoZWFkZXJzID0gaGVhZGVycy5hcHBlbmQoXCJDb250ZW50LVR5cGVcIiwgXCJhcHBsaWNhdGlvbi9qc29uXCIpO1xyXG5cclxuXHJcblxyXG5cclxuICAgICAgICAvL0F1dGhvcml6YXRpb246IFwiSldUIFwiICsgbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2N1cnJlbnRVc2VyJykudG9rZW5cclxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldDxhbnk+KHRoaXMuYXBpVXJsICsgJ3Byb2R1Y3R2aWV3LycgKyB1c2VySWQgLCB7cmVzcG9uc2VUeXBlOiAnanNvbicsaGVhZGVyc30pO1xyXG4gICAgfSBcclxuXHJcblxyXG4gICBcclxuXHJcbiAgICBcclxuXHJcbiAgXHJcbiAgIFxyXG5cclxuXHJcbiAgXHJcblxyXG4gICAgXHJcblxyXG4gICBcclxuXHJcbiAgIHByaXZhdGUgZXh0cmFjdERhdGEocmVzOiBSZXNwb25zZSkge1xyXG5cdGxldCBib2R5ID0gcmVzLmpzb24oKTtcclxuICAgICAgICByZXR1cm4gYm9keTtcclxuICAgIH1cclxuICAgIHByaXZhdGUgaGFuZGxlRXJyb3IgKGVycm9yOiBSZXNwb25zZSB8IGFueSkge1xyXG5cdGNvbnNvbGUuZXJyb3IoZXJyb3IubWVzc2FnZSB8fCBlcnJvcik7XHJcblx0cmV0dXJuIE9ic2VydmFibGUudGhyb3coZXJyb3Iuc3RhdHVzKTtcclxuICAgIH1cclxuXHJcbiAgXHJcblxyXG59XHJcblxyXG5cclxuXHJcbiJdfQ==