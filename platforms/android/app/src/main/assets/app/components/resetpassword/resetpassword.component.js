"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("nativescript-angular/router");
var router_2 = require("@angular/router");
var page_1 = require("ui/page");
var cooperative_service_1 = require("../../services/cooperative.service");
var auth_service_1 = require("../../services/auth.service");
var ResetPasswordComponent = /** @class */ (function () {
    function ResetPasswordComponent(router, page, cooperativeService, authService, route) {
        this.router = router;
        this.page = page;
        this.cooperativeService = cooperativeService;
        this.authService = authService;
        this.route = route;
        this.input = {
            "email": "",
            "password": ""
        };
    }
    ResetPasswordComponent.prototype.ngOnInit = function () {
        this.page.actionBarHidden = true;
        // if(ApplicationSettings.getBoolean("authenticated", false)) {
        //     this.router.navigate(["/secure"], { clearHistory: true });
        // }
        // this.getCooperative();
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    };
    ResetPasswordComponent.prototype.resetPassword = function () {
        this.forgetPassword(this.username);
    };
    ResetPasswordComponent.prototype.forgetPassword = function (username) {
        var _this = this;
        console.log("User Email " + username);
        this.authService.forgetPassword(username).subscribe(function (data) {
            console.log("User name " + JSON.stringify(data["data"]));
            // Redirect to OTP
            _this.router.navigate(["/otp"]);
        }, function (err) {
            console.log(err);
        });
    };
    ResetPasswordComponent.prototype.startBackgroundAnimation = function (background) {
        background.animate({
            scale: { x: 1.0, y: 1.0 },
            duration: 10000
        });
    };
    ResetPasswordComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: "app-resetpassword",
            templateUrl: "./resetpassword.component.html",
            styleUrls: ["./resetpassword-common.css", "./resetpassword.component.css"],
        }),
        __metadata("design:paramtypes", [router_1.RouterExtensions, page_1.Page, cooperative_service_1.CooperativeService, auth_service_1.AuthService,
            router_2.ActivatedRoute])
    ], ResetPasswordComponent);
    return ResetPasswordComponent;
}());
exports.ResetPasswordComponent = ResetPasswordComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzZXRwYXNzd29yZC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJyZXNldHBhc3N3b3JkLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFrRDtBQUNsRCxzREFBK0Q7QUFJL0QsMENBQXlEO0FBT3pELGdDQUErQjtBQU8vQiwwRUFBc0U7QUFDdEUsNERBQXdEO0FBV3hEO0lBUUksZ0NBQTJCLE1BQXdCLEVBQVMsSUFBVSxFQUFVLGtCQUFzQyxFQUFVLFdBQXVCLEVBQzNJLEtBQXFCO1FBRE4sV0FBTSxHQUFOLE1BQU0sQ0FBa0I7UUFBUyxTQUFJLEdBQUosSUFBSSxDQUFNO1FBQVUsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFvQjtRQUFVLGdCQUFXLEdBQVgsV0FBVyxDQUFZO1FBQzNJLFVBQUssR0FBTCxLQUFLLENBQWdCO1FBRzdCLElBQUksQ0FBQyxLQUFLLEdBQUc7WUFDVCxPQUFPLEVBQUUsRUFBRTtZQUNYLFVBQVUsRUFBRSxFQUFFO1NBQ2pCLENBQUE7SUFDTCxDQUFDO0lBR00seUNBQVEsR0FBZjtRQUNJLElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQztRQUNqQywrREFBK0Q7UUFDL0QsaUVBQWlFO1FBQ2pFLElBQUk7UUFFSix5QkFBeUI7UUFDekIsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLElBQUksR0FBRyxDQUFDO0lBR3pFLENBQUM7SUFFRCw4Q0FBYSxHQUFiO1FBQ0ksSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDdkMsQ0FBQztJQUVELCtDQUFjLEdBQWQsVUFBZSxRQUFnQjtRQUEvQixpQkFnQkM7UUFmRyxPQUFPLENBQUMsR0FBRyxDQUFDLGFBQWEsR0FBRyxRQUFRLENBQUMsQ0FBQztRQUd0QyxJQUFJLENBQUMsV0FBVyxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxTQUFTLENBQy9DLFVBQUEsSUFBSTtZQUNILE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBWSxHQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUUsQ0FBQztZQUV4RCxrQkFBa0I7WUFDbEIsS0FBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1FBQy9CLENBQUMsRUFDRCxVQUFBLEdBQUc7WUFDRixPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRWYsQ0FBQyxDQUNMLENBQUM7SUFDVixDQUFDO0lBRUEseURBQXdCLEdBQXhCLFVBQXlCLFVBQVU7UUFDaEMsVUFBVSxDQUFDLE9BQU8sQ0FBQztZQUNqQixLQUFLLEVBQUUsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUU7WUFDekIsUUFBUSxFQUFFLEtBQUs7U0FDaEIsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQTFETSxzQkFBc0I7UUFSbEMsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixRQUFRLEVBQUUsbUJBQW1CO1lBQzdCLFdBQVcsRUFBRSxnQ0FBZ0M7WUFDN0MsU0FBUyxFQUFFLENBQUMsNEJBQTRCLEVBQUUsK0JBQStCLENBQUM7U0FDN0UsQ0FBQzt5Q0FXcUMseUJBQWdCLEVBQWUsV0FBSSxFQUE4Qix3Q0FBa0IsRUFBc0IsMEJBQVc7WUFDcEksdUJBQWM7T0FUeEIsc0JBQXNCLENBNERsQztJQUFELDZCQUFDO0NBQUEsQUE1REQsSUE0REM7QUE1RFksd0RBQXNCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBSb3V0ZXJFeHRlbnNpb25zIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlclwiO1xyXG5pbXBvcnQgeyBTbmFja0JhciB9IGZyb20gXCJuYXRpdmVzY3JpcHQtc25hY2tiYXJcIjtcclxuaW1wb3J0ICogYXMgQXBwbGljYXRpb25TZXR0aW5ncyBmcm9tIFwiYXBwbGljYXRpb24tc2V0dGluZ3NcIjtcclxuXHJcbmltcG9ydCB7IFJvdXRlciwgQWN0aXZhdGVkUm91dGUgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XHJcbmltcG9ydCB7IENvbG9yIH0gZnJvbSBcImNvbG9yXCI7XHJcblxyXG5pbXBvcnQgeyBjb25uZWN0aW9uVHlwZSwgZ2V0Q29ubmVjdGlvblR5cGUgfSBmcm9tIFwiY29ubmVjdGl2aXR5XCI7XHJcbmltcG9ydCB7IEFuaW1hdGlvbiB9IGZyb20gXCJ1aS9hbmltYXRpb25cIjtcclxuaW1wb3J0IHsgVmlldyB9IGZyb20gXCJ1aS9jb3JlL3ZpZXdcIjtcclxuaW1wb3J0IHsgcHJvbXB0IH0gZnJvbSBcInVpL2RpYWxvZ3NcIjtcclxuaW1wb3J0IHsgUGFnZSB9IGZyb20gXCJ1aS9wYWdlXCI7XHJcbmltcG9ydCB7IFRleHRGaWVsZCB9IGZyb20gXCJ1aS90ZXh0LWZpZWxkXCI7XHJcblxyXG5cclxuaW1wb3J0IHsgYWxlcnQgfSBmcm9tIFwiLi4vLi4vc2hhcmVkXCI7XHJcblxyXG5pbXBvcnQgeyBDb29wZXJhdGl2ZSB9IGZyb20gJy4uLy4uL21vZGVscy9pbmRleCc7XHJcbmltcG9ydCB7Q29vcGVyYXRpdmVTZXJ2aWNlfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvY29vcGVyYXRpdmUuc2VydmljZVwiO1xyXG5pbXBvcnQge0F1dGhTZXJ2aWNlfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvYXV0aC5zZXJ2aWNlXCI7XHJcblxyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxyXG4gICAgc2VsZWN0b3I6IFwiYXBwLXJlc2V0cGFzc3dvcmRcIixcclxuICAgIHRlbXBsYXRlVXJsOiBcIi4vcmVzZXRwYXNzd29yZC5jb21wb25lbnQuaHRtbFwiLFxyXG4gICAgc3R5bGVVcmxzOiBbXCIuL3Jlc2V0cGFzc3dvcmQtY29tbW9uLmNzc1wiLCBcIi4vcmVzZXRwYXNzd29yZC5jb21wb25lbnQuY3NzXCJdLFxyXG59KVxyXG5cclxuXHJcbmV4cG9ydCBjbGFzcyBSZXNldFBhc3N3b3JkQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuXHJcbiAgICBwdWJsaWMgaW5wdXQ6IGFueTtcclxuICAgIHJldHVyblVybDogc3RyaW5nO1xyXG4gICAgdXNlcm5hbWU6IHN0cmluZztcclxuICAgIHBhc3N3b3JkOiBzdHJpbmc7XHJcbiAgICBjb25maXJtOiBzdHJpbmc7XHJcblxyXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKHByaXZhdGUgcm91dGVyOiBSb3V0ZXJFeHRlbnNpb25zLHByaXZhdGUgcGFnZTogUGFnZSwgcHJpdmF0ZSBjb29wZXJhdGl2ZVNlcnZpY2U6IENvb3BlcmF0aXZlU2VydmljZSwgcHJpdmF0ZSBhdXRoU2VydmljZTpBdXRoU2VydmljZSxcclxuICAgICAgICBwcml2YXRlIHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSxcclxuICAgICAgICBcclxuICAgICAgICkge1xyXG4gICAgICAgIHRoaXMuaW5wdXQgPSB7XHJcbiAgICAgICAgICAgIFwiZW1haWxcIjogXCJcIixcclxuICAgICAgICAgICAgXCJwYXNzd29yZFwiOiBcIlwiXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwdWJsaWMgbmdPbkluaXQoKSB7XHJcbiAgICAgICAgdGhpcy5wYWdlLmFjdGlvbkJhckhpZGRlbiA9IHRydWU7XHJcbiAgICAgICAgLy8gaWYoQXBwbGljYXRpb25TZXR0aW5ncy5nZXRCb29sZWFuKFwiYXV0aGVudGljYXRlZFwiLCBmYWxzZSkpIHtcclxuICAgICAgICAvLyAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW1wiL3NlY3VyZVwiXSwgeyBjbGVhckhpc3Rvcnk6IHRydWUgfSk7XHJcbiAgICAgICAgLy8gfVxyXG5cclxuICAgICAgICAvLyB0aGlzLmdldENvb3BlcmF0aXZlKCk7XHJcbiAgICAgICAgdGhpcy5yZXR1cm5VcmwgPSB0aGlzLnJvdXRlLnNuYXBzaG90LnF1ZXJ5UGFyYW1zWydyZXR1cm5VcmwnXSB8fCAnLyc7XHJcblxyXG5cclxuICAgIH1cclxuXHJcbiAgICByZXNldFBhc3N3b3JkKCl7XHJcbiAgICAgICAgdGhpcy5mb3JnZXRQYXNzd29yZCh0aGlzLnVzZXJuYW1lKTtcclxuICAgIH1cclxuXHJcbiAgICBmb3JnZXRQYXNzd29yZCh1c2VybmFtZTogc3RyaW5nKXtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIlVzZXIgRW1haWwgXCIrICB1c2VybmFtZSk7XHJcbiAgICAgICBcclxuXHJcbiAgICAgICAgdGhpcy5hdXRoU2VydmljZS5mb3JnZXRQYXNzd29yZCh1c2VybmFtZSkuc3Vic2NyaWJlKFxyXG4gICAgICAgICAgICBkYXRhID0+IHsgXHJcbiAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlVzZXIgbmFtZSBcIisgSlNPTi5zdHJpbmdpZnkoZGF0YVtcImRhdGFcIl0pICk7XHJcbiAgICAgICBcclxuICAgICAgICAgICAgICAvLyBSZWRpcmVjdCB0byBPVFBcclxuICAgICAgICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbXCIvb3RwXCJdKTtcclxuICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgIGVyciA9PiB7XHJcbiAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XHJcbiAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICApO1x0ICBcclxuICAgIH1cclxuXHJcbiAgICAgc3RhcnRCYWNrZ3JvdW5kQW5pbWF0aW9uKGJhY2tncm91bmQpIHtcclxuICAgICAgICBiYWNrZ3JvdW5kLmFuaW1hdGUoe1xyXG4gICAgICAgICAgc2NhbGU6IHsgeDogMS4wLCB5OiAxLjAgfSxcclxuICAgICAgICAgIGR1cmF0aW9uOiAxMDAwMFxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcblxyXG59XHJcblxyXG4iXX0=