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
var BankService = /** @class */ (function () {
    function BankService(http) {
        this.http = http;
        this.apiUrl = config_1.Config.apiUrl;
    }
    BankService.prototype.getAllBanks = function () {
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
        return this.http.get(this.apiUrl + 'banks', { responseType: 'json', headers: headers });
    };
    BankService.prototype.extractData = function (res) {
        var body = res.json();
        return body;
    };
    BankService.prototype.handleError = function (error) {
        console.error(error.message || error);
        return Observable_1.Observable.throw(error.status);
    };
    BankService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], BankService);
    return BankService;
}());
exports.BankService = BankService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFuay5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYmFuay5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTJDO0FBQzNDLDBFQUEwRTtBQUMxRSwwQ0FBMEM7QUFDMUMsNkNBQTRIO0FBQzVILG9DQUFvQztBQUNwQyw4Q0FBNkM7QUFDN0MsaUNBQStCO0FBSS9CLDJDQUEwQztBQUsxQztJQUdJLHFCQUFvQixJQUFnQjtRQUFoQixTQUFJLEdBQUosSUFBSSxDQUFZO1FBRm5DLFdBQU0sR0FBWSxlQUFNLENBQUMsTUFBTSxDQUFDO0lBRU8sQ0FBQztJQUl6QyxpQ0FBVyxHQUFYO1FBQ0ksd0NBQXdDO1FBQ3hDLG9EQUFvRDtRQUNwRCxzREFBc0Q7UUFDdEQsK0RBQStEO1FBQy9ELHNEQUFzRDtRQUN2RCxzRkFBc0Y7UUFFN0YsMkNBQTJDO1FBQzNDLHVNQUF1TTtRQUN2TSxnRUFBZ0U7UUFFaEUsSUFBSSxPQUFPLEdBQUcsSUFBSSxrQkFBVyxFQUFFLENBQUM7UUFDaEMsT0FBTyxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsY0FBYyxFQUFFLGtCQUFrQixDQUFDLENBQUM7UUFLckQsbUVBQW1FO1FBQ25FLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBTSxJQUFJLENBQUMsTUFBTSxHQUFHLE9BQU8sRUFBRSxFQUFDLFlBQVksRUFBRSxNQUFNLEVBQUMsT0FBTyxTQUFBLEVBQUMsQ0FBQyxDQUFDO0lBQ3JGLENBQUM7SUFRTSxpQ0FBVyxHQUFuQixVQUFvQixHQUFhO1FBQ25DLElBQUksSUFBSSxHQUFHLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNmLE1BQU0sQ0FBQyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUNPLGlDQUFXLEdBQW5CLFVBQXFCLEtBQXFCO1FBQzdDLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLE9BQU8sSUFBSSxLQUFLLENBQUMsQ0FBQztRQUN0QyxNQUFNLENBQUMsdUJBQVUsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ25DLENBQUM7SUExQ1EsV0FBVztRQUR2QixpQkFBVSxFQUFFO3lDQUlpQixpQkFBVTtPQUgzQixXQUFXLENBOEN2QjtJQUFELGtCQUFDO0NBQUEsQUE5Q0QsSUE4Q0M7QUE5Q1ksa0NBQVciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbi8vaW1wb3J0IHsgSHR0cCwgSGVhZGVycywgUmVxdWVzdE9wdGlvbnMsIFJlc3BvbnNlIH0gZnJvbSAnQGFuZ3VsYXIvaHR0cCc7XHJcbi8vIGNvbnN0IGNhY2hlZEV4dGVuZHMgPSBnbG9iYWwuX19leHRlbmRzO1xyXG5pbXBvcnQge0h0dHBDbGllbnQsSHR0cEV2ZW50LCBIdHRwSGFuZGxlciwgSHR0cEludGVyY2VwdG9yLCBIdHRwUmVxdWVzdCxIdHRwSGVhZGVycyxIdHRwUGFyYW1zfSBmcm9tIFwiQGFuZ3VsYXIvY29tbW9uL2h0dHBcIjtcclxuLy8gZ2xvYmFsLl9fZXh0ZW5kcyA9IGNhY2hlZEV4dGVuZHM7XHJcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xyXG5pbXBvcnQgJ3J4anMvYWRkL29wZXJhdG9yL21hcCc7XHJcblxyXG5pbXBvcnQgeyBDb29wZXJhdGl2ZSB9IGZyb20gJy4uL21vZGVscy9pbmRleCc7XHJcblxyXG5pbXBvcnQgeyBDb25maWcgfSBmcm9tIFwiLi4vc2hhcmVkL2NvbmZpZ1wiO1xyXG5cclxuXHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBCYW5rU2VydmljZSB7XHJcbiAgICAgYXBpVXJsOiBzdHJpbmcgID0gQ29uZmlnLmFwaVVybDtcclxuICAgIFxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50KSB7IH1cclxuXHJcbiAgIFxyXG4gICAgXHJcbiAgICBnZXRBbGxCYW5rcygpOiBPYnNlcnZhYmxlPGFueT4ge1xyXG4gICAgICAgIC8vdGhpcy5hcGlVcmwgPSB0aGlzLmFwaVVybCArICdzdHVkZW50JztcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIiBSZXR1cm4gU3R1ZGVudCBJZCAyIFwiICsgc3R1ZGVudElkKTtcclxuICAgICAgICAvL2xldCBwYXJhbXMgPSBuZXcgSHR0cFBhcmFtcygpLnNldCgnX2lkJywgc3R1ZGVudElkKTtcclxuICAgICAgICAvLyB2YXIgY3VycmVudFVzZXIgOiBhbnkgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnY3VycmVudFVzZXInKTtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIkN1cnJlbnQgVXNlciAxIFwiICsgY3VycmVudFVzZXIudG9rZW4pO1xyXG4gICAgICAgLy8gY29uc3QgaGVhZGVycyA9IG5ldyBIdHRwSGVhZGVycygpLnNldChcIkF1dGhvcml6YXRpb25cIiwgXCJKV1QgXCIgKyBjdXJyZW50VXNlci50b2tlbik7XHJcblxyXG4vLyAgICAgICAgIGxldCBoZWFkZXJzID0gbmV3IEh0dHBIZWFkZXJzKCk7XHJcbi8vIGhlYWRlcnMgPSBoZWFkZXJzLmFwcGVuZChcIkF1dGhvcml6YXRpb25cIiwgXCJKV1QgXCIgKyBcImV5SjBlWEFpT2lKS1YxUWlMQ0poYkdjaU9pSklVekkxTmlKOS5leUpwWkNJNklqZzJNRGxrWXpreExUQTNaRE10TkRBM05DMWlNR1F4TFdWa05qUXlaak13WVRZNVpDSjkua3BXeHdOUGJRdkcxbDNWYjhWYjZSUXdDa3kxU3F5ZGhGUHRJQ29oeUQxQVwiKTtcclxuLy8gaGVhZGVycyA9IGhlYWRlcnMuYXBwZW5kKFwiQ29udGVudC1UeXBlXCIsIFwiYXBwbGljYXRpb24vanNvblwiKTtcclxuXHJcbmxldCBoZWFkZXJzID0gbmV3IEh0dHBIZWFkZXJzKCk7XHJcbmhlYWRlcnMgPSBoZWFkZXJzLmFwcGVuZChcIkNvbnRlbnQtVHlwZVwiLCBcImFwcGxpY2F0aW9uL2pzb25cIik7XHJcblxyXG5cclxuXHJcblxyXG4gICAgICAgIC8vQXV0aG9yaXphdGlvbjogXCJKV1QgXCIgKyBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnY3VycmVudFVzZXInKS50b2tlblxyXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0PGFueT4odGhpcy5hcGlVcmwgKyAnYmFua3MnLCB7cmVzcG9uc2VUeXBlOiAnanNvbicsaGVhZGVyc30pO1xyXG4gICAgfSBcclxuXHJcbiAgXHJcblxyXG4gICAgXHJcblxyXG4gICBcclxuXHJcbiAgIHByaXZhdGUgZXh0cmFjdERhdGEocmVzOiBSZXNwb25zZSkge1xyXG5cdGxldCBib2R5ID0gcmVzLmpzb24oKTtcclxuICAgICAgICByZXR1cm4gYm9keTtcclxuICAgIH1cclxuICAgIHByaXZhdGUgaGFuZGxlRXJyb3IgKGVycm9yOiBSZXNwb25zZSB8IGFueSkge1xyXG5cdGNvbnNvbGUuZXJyb3IoZXJyb3IubWVzc2FnZSB8fCBlcnJvcik7XHJcblx0cmV0dXJuIE9ic2VydmFibGUudGhyb3coZXJyb3Iuc3RhdHVzKTtcclxuICAgIH1cclxuXHJcbiAgXHJcblxyXG59XHJcblxyXG5cclxuXHJcbiJdfQ==