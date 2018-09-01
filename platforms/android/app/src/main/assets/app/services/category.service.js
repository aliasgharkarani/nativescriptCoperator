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
var CategoryService = /** @class */ (function () {
    function CategoryService(http) {
        this.http = http;
        this.apiUrl = config_1.Config.apiUrl;
    }
    CategoryService.prototype.getAllCategory = function () {
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
        return this.http.get(this.apiUrl + 'category', { responseType: 'json', headers: headers });
    };
    CategoryService.prototype.extractData = function (res) {
        var body = res.json();
        return body;
    };
    CategoryService.prototype.handleError = function (error) {
        console.error(error.message || error);
        return Observable_1.Observable.throw(error.status);
    };
    CategoryService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], CategoryService);
    return CategoryService;
}());
exports.CategoryService = CategoryService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2F0ZWdvcnkuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNhdGVnb3J5LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMkM7QUFDM0MsMEVBQTBFO0FBQzFFLDBDQUEwQztBQUMxQyw2Q0FBNEg7QUFDNUgsb0NBQW9DO0FBQ3BDLDhDQUE2QztBQUM3QyxpQ0FBK0I7QUFJL0IsMkNBQTBDO0FBSzFDO0lBR0kseUJBQW9CLElBQWdCO1FBQWhCLFNBQUksR0FBSixJQUFJLENBQVk7UUFGbkMsV0FBTSxHQUFZLGVBQU0sQ0FBQyxNQUFNLENBQUM7SUFFTyxDQUFDO0lBSXpDLHdDQUFjLEdBQWQ7UUFDSSx3Q0FBd0M7UUFDeEMsb0RBQW9EO1FBQ3BELHNEQUFzRDtRQUN0RCwrREFBK0Q7UUFDL0Qsc0RBQXNEO1FBQ3ZELHNGQUFzRjtRQUU3RiwyQ0FBMkM7UUFDM0MsdU1BQXVNO1FBQ3ZNLGdFQUFnRTtRQUVoRSxJQUFJLE9BQU8sR0FBRyxJQUFJLGtCQUFXLEVBQUUsQ0FBQztRQUNoQyxPQUFPLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxjQUFjLEVBQUUsa0JBQWtCLENBQUMsQ0FBQztRQUtyRCxtRUFBbUU7UUFDbkUsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFNLElBQUksQ0FBQyxNQUFNLEdBQUcsVUFBVSxFQUFFLEVBQUMsWUFBWSxFQUFFLE1BQU0sRUFBQyxPQUFPLFNBQUEsRUFBQyxDQUFDLENBQUM7SUFDeEYsQ0FBQztJQVFNLHFDQUFXLEdBQW5CLFVBQW9CLEdBQWE7UUFDbkMsSUFBSSxJQUFJLEdBQUcsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ2YsTUFBTSxDQUFDLElBQUksQ0FBQztJQUNoQixDQUFDO0lBQ08scUNBQVcsR0FBbkIsVUFBcUIsS0FBcUI7UUFDN0MsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsT0FBTyxJQUFJLEtBQUssQ0FBQyxDQUFDO1FBQ3RDLE1BQU0sQ0FBQyx1QkFBVSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDbkMsQ0FBQztJQTFDUSxlQUFlO1FBRDNCLGlCQUFVLEVBQUU7eUNBSWlCLGlCQUFVO09BSDNCLGVBQWUsQ0E4QzNCO0lBQUQsc0JBQUM7Q0FBQSxBQTlDRCxJQThDQztBQTlDWSwwQ0FBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuLy9pbXBvcnQgeyBIdHRwLCBIZWFkZXJzLCBSZXF1ZXN0T3B0aW9ucywgUmVzcG9uc2UgfSBmcm9tICdAYW5ndWxhci9odHRwJztcclxuLy8gY29uc3QgY2FjaGVkRXh0ZW5kcyA9IGdsb2JhbC5fX2V4dGVuZHM7XHJcbmltcG9ydCB7SHR0cENsaWVudCxIdHRwRXZlbnQsIEh0dHBIYW5kbGVyLCBIdHRwSW50ZXJjZXB0b3IsIEh0dHBSZXF1ZXN0LEh0dHBIZWFkZXJzLEh0dHBQYXJhbXN9IGZyb20gXCJAYW5ndWxhci9jb21tb24vaHR0cFwiO1xyXG4vLyBnbG9iYWwuX19leHRlbmRzID0gY2FjaGVkRXh0ZW5kcztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XHJcbmltcG9ydCAncnhqcy9hZGQvb3BlcmF0b3IvbWFwJztcclxuXHJcbmltcG9ydCB7IENvb3BlcmF0aXZlIH0gZnJvbSAnLi4vbW9kZWxzL2luZGV4JztcclxuXHJcbmltcG9ydCB7IENvbmZpZyB9IGZyb20gXCIuLi9zaGFyZWQvY29uZmlnXCI7XHJcblxyXG5cclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIENhdGVnb3J5U2VydmljZSB7XHJcbiAgICAgYXBpVXJsOiBzdHJpbmcgID0gQ29uZmlnLmFwaVVybDtcclxuICAgIFxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50KSB7IH1cclxuXHJcbiAgIFxyXG4gICAgXHJcbiAgICBnZXRBbGxDYXRlZ29yeSgpOiBPYnNlcnZhYmxlPGFueT4ge1xyXG4gICAgICAgIC8vdGhpcy5hcGlVcmwgPSB0aGlzLmFwaVVybCArICdzdHVkZW50JztcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIiBSZXR1cm4gU3R1ZGVudCBJZCAyIFwiICsgc3R1ZGVudElkKTtcclxuICAgICAgICAvL2xldCBwYXJhbXMgPSBuZXcgSHR0cFBhcmFtcygpLnNldCgnX2lkJywgc3R1ZGVudElkKTtcclxuICAgICAgICAvLyB2YXIgY3VycmVudFVzZXIgOiBhbnkgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnY3VycmVudFVzZXInKTtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIkN1cnJlbnQgVXNlciAxIFwiICsgY3VycmVudFVzZXIudG9rZW4pO1xyXG4gICAgICAgLy8gY29uc3QgaGVhZGVycyA9IG5ldyBIdHRwSGVhZGVycygpLnNldChcIkF1dGhvcml6YXRpb25cIiwgXCJKV1QgXCIgKyBjdXJyZW50VXNlci50b2tlbik7XHJcblxyXG4vLyAgICAgICAgIGxldCBoZWFkZXJzID0gbmV3IEh0dHBIZWFkZXJzKCk7XHJcbi8vIGhlYWRlcnMgPSBoZWFkZXJzLmFwcGVuZChcIkF1dGhvcml6YXRpb25cIiwgXCJKV1QgXCIgKyBcImV5SjBlWEFpT2lKS1YxUWlMQ0poYkdjaU9pSklVekkxTmlKOS5leUpwWkNJNklqZzJNRGxrWXpreExUQTNaRE10TkRBM05DMWlNR1F4TFdWa05qUXlaak13WVRZNVpDSjkua3BXeHdOUGJRdkcxbDNWYjhWYjZSUXdDa3kxU3F5ZGhGUHRJQ29oeUQxQVwiKTtcclxuLy8gaGVhZGVycyA9IGhlYWRlcnMuYXBwZW5kKFwiQ29udGVudC1UeXBlXCIsIFwiYXBwbGljYXRpb24vanNvblwiKTtcclxuXHJcbmxldCBoZWFkZXJzID0gbmV3IEh0dHBIZWFkZXJzKCk7XHJcbmhlYWRlcnMgPSBoZWFkZXJzLmFwcGVuZChcIkNvbnRlbnQtVHlwZVwiLCBcImFwcGxpY2F0aW9uL2pzb25cIik7XHJcblxyXG5cclxuXHJcblxyXG4gICAgICAgIC8vQXV0aG9yaXphdGlvbjogXCJKV1QgXCIgKyBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnY3VycmVudFVzZXInKS50b2tlblxyXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0PGFueT4odGhpcy5hcGlVcmwgKyAnY2F0ZWdvcnknLCB7cmVzcG9uc2VUeXBlOiAnanNvbicsaGVhZGVyc30pO1xyXG4gICAgfSBcclxuXHJcbiAgXHJcblxyXG4gICAgXHJcblxyXG4gICBcclxuXHJcbiAgIHByaXZhdGUgZXh0cmFjdERhdGEocmVzOiBSZXNwb25zZSkge1xyXG5cdGxldCBib2R5ID0gcmVzLmpzb24oKTtcclxuICAgICAgICByZXR1cm4gYm9keTtcclxuICAgIH1cclxuICAgIHByaXZhdGUgaGFuZGxlRXJyb3IgKGVycm9yOiBSZXNwb25zZSB8IGFueSkge1xyXG5cdGNvbnNvbGUuZXJyb3IoZXJyb3IubWVzc2FnZSB8fCBlcnJvcik7XHJcblx0cmV0dXJuIE9ic2VydmFibGUudGhyb3coZXJyb3Iuc3RhdHVzKTtcclxuICAgIH1cclxuXHJcbiAgXHJcblxyXG59XHJcblxyXG5cclxuXHJcbiJdfQ==