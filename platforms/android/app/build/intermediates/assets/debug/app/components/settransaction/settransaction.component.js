"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var common_1 = require("@angular/common");
var page_1 = require("ui/page");
var auth_service_1 = require("../../services/auth.service");
var member_service_1 = require("../../services/member.service");
var LS = require("nativescript-localstorage");
var nativescript_fancyalert_1 = require("nativescript-fancyalert");
var router_2 = require("nativescript-angular/router");
var SetTransactionComponent = /** @class */ (function () {
    function SetTransactionComponent(page, location, authService, memberService, router, activatedRoute, routerExtensions) {
        this.page = page;
        this.location = location;
        this.authService = authService;
        this.memberService = memberService;
        this.router = router;
        this.activatedRoute = activatedRoute;
        this.routerExtensions = routerExtensions;
        this.cooperative = [];
        this.hint = "Select Cooperative";
        this.cssClass = "default";
        this.input = {
            "firstname": "",
            "lastname": "",
            "email": "",
            "password": ""
        };
    }
    SetTransactionComponent.prototype.ngAfterViewInit = function () {
    };
    SetTransactionComponent.prototype.ngOnInit = function () {
        this.page.actionBarHidden = true;
        var dataObject = JSON.parse(LS.getItem('currentUser'));
        console.log("User ID  on TransPIN " + dataObject._id);
        if (dataObject._id) {
            this.userId = dataObject._id;
            this.userMode = dataObject.userMode;
        }
    };
    SetTransactionComponent.prototype.register = function () {
        console.log("Reaching Register ");
    };
    SetTransactionComponent.prototype.onNavBtnTap = function () {
        // This code will be called only in Android.
        console.log("Navigation button tapped!");
    };
    SetTransactionComponent.prototype.next = function () {
        if (this.pin.length < 4) {
            nativescript_fancyalert_1.TNSFancyAlert.showError("Error!", "The minimum length of Trans Pin is 4 digit", "Ok");
            return;
        }
        console.log("User Id for setPin " + this.userId);
        this.setPin(this.userId, this.pin, this.pin);
    };
    SetTransactionComponent.prototype.nextpre = function () {
        if (this.pin.length < 4 || this.cpin.length < 4) {
            nativescript_fancyalert_1.TNSFancyAlert.showError("Error!", "The minimum length of Trans Pin is 4 digit", "Ok");
            return;
        }
        if (this.pin != this.cpin) {
            nativescript_fancyalert_1.TNSFancyAlert.showError("Error!", "Your transaction did not match", "Ok");
            return;
        }
        console.log("User Id for setPin " + this.userId);
        this.setPin(this.userId, this.pin, this.cpin);
    };
    SetTransactionComponent.prototype.goBack = function () {
        this.location.back();
    };
    SetTransactionComponent.prototype.startBackgroundAnimation = function (background) {
        background.animate({
            scale: { x: 1.0, y: 1.0 },
            duration: 10000
        });
    };
    SetTransactionComponent.prototype.oncooperativechange = function (args) {
        // console.log(`Drop Down selected index changed  ${args.oldIndex} to ${args.newIndex}. New value is "${this.sessionitems.getValue(
        //     args.newIndex)}"`);
        console.log("Selected ID " + args.newIndex);
        this.selectedCooperative = this.cooperativeList.getValue(args.newIndex);
        console.log("Selected Id Value  " + this.selectedCooperative);
    };
    SetTransactionComponent.prototype.setPin = function (userId, pin, confirmPin) {
        var _this = this;
        console.log("Set Pin Id " + userId);
        this.memberService.changePin(userId, pin, confirmPin).subscribe(function (data) {
            console.log("Change Pin " + JSON.stringify(data["data"]));
            //send OTP
            _this.sendOTP(userId);
            console.log("Set Pin User Mode " + _this.userMode);
            if (_this.userMode == "TransPin") {
                LS.removeItem('currentUser');
                LS.setItem('currentUser', JSON.stringify(data["data"]));
                _this.router.navigate(['/otp']);
            }
            if (_this.userMode == "Confirm") {
                LS.removeItem('currentUser');
                LS.setItem('currentUser', JSON.stringify(data["data"]));
                _this.router.navigate(['/otp']);
            }
        }, function (err) {
            console.log(err);
            nativescript_fancyalert_1.TNSFancyAlert.showError("Error!", err.error.message, "Ok").then(function () {
            });
        });
    };
    SetTransactionComponent.prototype.sendOTP = function (userId) {
        console.log("Sent Trans Pin OTp " + userId);
        this.authService.sendToken(userId).subscribe(function (data) {
            console.log("OTP Send" + JSON.stringify(data["data"]));
            //send OTP
        }, function (err) {
            console.log(err);
            nativescript_fancyalert_1.TNSFancyAlert.showError("Error!", err.error.message, "Ok").then(function () {
            });
        });
    };
    SetTransactionComponent.prototype.navigateBack = function () {
        console.log("Go Back Button Clicked");
        this.routerExtensions.backToPreviousPage();
        //this.router.navigate(["/"]);
    };
    SetTransactionComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: "ns-settransaction",
            templateUrl: "./settransaction.component.html",
            styleUrls: ["./settransaction-common.css", "./settransaction.component.css"],
        }),
        __metadata("design:paramtypes", [page_1.Page, common_1.Location, auth_service_1.AuthService, member_service_1.MemberService, router_1.Router, router_1.ActivatedRoute,
            router_2.RouterExtensions])
    ], SetTransactionComponent);
    return SetTransactionComponent;
}());
exports.SetTransactionComponent = SetTransactionComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2V0dHJhbnNhY3Rpb24uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2V0dHJhbnNhY3Rpb24uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWlFO0FBQ2pFLDBDQUF5RDtBQUN6RCwwQ0FBMkM7QUFPM0MsZ0NBQStCO0FBUS9CLDREQUEwRDtBQUMxRCxnRUFBOEQ7QUFHOUQsSUFBSSxFQUFFLEdBQUcsT0FBTyxDQUFFLDJCQUEyQixDQUFFLENBQUM7QUFFaEQsbUVBQXdEO0FBRXhELHNEQUErRDtBQVUvRDtJQWlCSSxpQ0FBMkIsSUFBUyxFQUFTLFFBQWtCLEVBQVUsV0FBdUIsRUFBVSxhQUEyQixFQUFTLE1BQWMsRUFBVSxjQUE4QixFQUN4TCxnQkFBa0M7UUFEbkIsU0FBSSxHQUFKLElBQUksQ0FBSztRQUFTLGFBQVEsR0FBUixRQUFRLENBQVU7UUFBVSxnQkFBVyxHQUFYLFdBQVcsQ0FBWTtRQUFVLGtCQUFhLEdBQWIsYUFBYSxDQUFjO1FBQVMsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUFVLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUN4TCxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBWjlDLGdCQUFXLEdBQXVCLEVBQUUsQ0FBQztRQUNyQyxTQUFJLEdBQVcsb0JBQW9CLENBQUM7UUFFN0IsYUFBUSxHQUFXLFNBQVMsQ0FBQztRQVVoQyxJQUFJLENBQUMsS0FBSyxHQUFHO1lBQ1QsV0FBVyxFQUFFLEVBQUU7WUFDZixVQUFVLEVBQUUsRUFBRTtZQUNkLE9BQU8sRUFBRSxFQUFFO1lBQ1gsVUFBVSxFQUFFLEVBQUU7U0FDakIsQ0FBQTtJQUNMLENBQUM7SUFFRCxpREFBZSxHQUFmO0lBRUEsQ0FBQztJQUVNLDBDQUFRLEdBQWY7UUFDSSxJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUM7UUFDakMsSUFBSSxVQUFVLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxF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QUNuQixRQUFRLEVBQUUsbUJBQW1CO1lBQzdCLFdBQVcsRUFBRSxpQ0FBaUM7WUFDOUMsU0FBUyxFQUFFLENBQUMsNkJBQTZCLEVBQUUsZ0NBQWdDLENBQUM7U0FDL0UsQ0FBQzt5Q0FvQmtDLFdBQUksRUFBbUIsaUJBQVEsRUFBc0IsMEJBQVcsRUFBd0IsOEJBQWEsRUFBaUIsZUFBTSxFQUEwQix1QkFBYztZQUN0Syx5QkFBZ0I7T0FsQnJDLHVCQUF1QixDQXVMbkM7SUFBRCw4QkFBQztDQUFBLEFBdkxELElBdUxDO0FBdkxZLDBEQUF1QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBBZnRlclZpZXdJbml0IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgUm91dGVyLCBBY3RpdmF0ZWRSb3V0ZSB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcclxuaW1wb3J0IHsgTG9jYXRpb24gfSBmcm9tIFwiQGFuZ3VsYXIvY29tbW9uXCI7XHJcbmltcG9ydCB7IFNuYWNrQmFyIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1zbmFja2JhclwiO1xyXG5pbXBvcnQgKiBhcyBBcHBsaWNhdGlvblNldHRpbmdzIGZyb20gXCJhcHBsaWNhdGlvbi1zZXR0aW5nc1wiO1xyXG5pbXBvcnQgeyBjb25uZWN0aW9uVHlwZSwgZ2V0Q29ubmVjdGlvblR5cGUgfSBmcm9tIFwiY29ubmVjdGl2aXR5XCI7XHJcbmltcG9ydCB7IEFuaW1hdGlvbiB9IGZyb20gXCJ1aS9hbmltYXRpb25cIjtcclxuaW1wb3J0IHsgVmlldyB9IGZyb20gXCJ1aS9jb3JlL3ZpZXdcIjtcclxuaW1wb3J0IHsgcHJvbXB0IH0gZnJvbSBcInVpL2RpYWxvZ3NcIjtcclxuaW1wb3J0IHsgUGFnZSB9IGZyb20gXCJ1aS9wYWdlXCI7XHJcbmltcG9ydCB7IFRleHRGaWVsZCB9IGZyb20gXCJ1aS90ZXh0LWZpZWxkXCI7XHJcblxyXG5pbXBvcnQgeyBWYWx1ZUxpc3QsIERyb3BEb3duIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1kcm9wLWRvd25cIjtcclxuaW1wb3J0IHsgU2VsZWN0ZWRJbmRleENoYW5nZWRFdmVudERhdGEgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWRyb3AtZG93blwiO1xyXG5pbXBvcnQgeyBDb29wZXJhdGl2ZSB9IGZyb20gJy4uLy4uL21vZGVscy9pbmRleCc7XHJcblxyXG5cclxuaW1wb3J0IHsgQXV0aFNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvYXV0aC5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IE1lbWJlclNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvbWVtYmVyLnNlcnZpY2VcIjtcclxuXHJcbmltcG9ydCB7IENvb3BlcmF0aXZlU3RhZmYsIFZlcmlmeUF1dGggfSBmcm9tIFwiLi4vLi4vbW9kZWxzL2luZGV4XCI7XHJcbmxldCBMUyA9IHJlcXVpcmUoIFwibmF0aXZlc2NyaXB0LWxvY2Fsc3RvcmFnZVwiICk7XHJcblxyXG5pbXBvcnQgeyBUTlNGYW5jeUFsZXJ0IH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1mYW5jeWFsZXJ0XCI7XHJcblxyXG5pbXBvcnQgeyBSb3V0ZXJFeHRlbnNpb25zIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlclwiO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxyXG4gICAgc2VsZWN0b3I6IFwibnMtc2V0dHJhbnNhY3Rpb25cIixcclxuICAgIHRlbXBsYXRlVXJsOiBcIi4vc2V0dHJhbnNhY3Rpb24uY29tcG9uZW50Lmh0bWxcIixcclxuICAgIHN0eWxlVXJsczogW1wiLi9zZXR0cmFuc2FjdGlvbi1jb21tb24uY3NzXCIsIFwiLi9zZXR0cmFuc2FjdGlvbi5jb21wb25lbnQuY3NzXCJdLFxyXG59KVxyXG5cclxuXHJcbmV4cG9ydCBjbGFzcyBTZXRUcmFuc2FjdGlvbkNvbXBvbmVudCB7XHJcblxyXG4gICAgcHVibGljIGlucHV0OiBhbnk7XHJcbiAgICBzZWxlY3RlZENvb3BlcmF0aXZlSW5kZXg6IG51bWJlcjtcclxuICAgIHNlbGVjdGVkQ29vcGVyYXRpdmU6IHN0cmluZztcclxuICAgIHN0YWZmSWQ6IFN0cmluZztcclxuICAgIGNvb3BlcmF0aXZlOiBBcnJheTxDb29wZXJhdGl2ZT4gPSBbXTtcclxuICAgIGhpbnQ6IHN0cmluZyA9IFwiU2VsZWN0IENvb3BlcmF0aXZlXCI7XHJcbiAgICBwdWJsaWMgY29vcGVyYXRpdmVMaXN0OiBWYWx1ZUxpc3Q8c3RyaW5nPjtcclxuICAgIHB1YmxpYyBjc3NDbGFzczogc3RyaW5nID0gXCJkZWZhdWx0XCI7XHJcbiAgICBjb29wZXJhdGl2ZVN0YWZmOiBDb29wZXJhdGl2ZVN0YWZmO1xyXG4gICAgdmVyaWZ5QXV0aDogVmVyaWZ5QXV0aDtcclxuICAgIHBpbjogU3RyaW5nO1xyXG4gICAgY3BpbjogU3RyaW5nO1xyXG4gICAgdXNlcklkOiBTdHJpbmc7XHJcbiAgICB1c2VyTW9kZTogU3RyaW5nO1xyXG5cclxuICAgIHB1YmxpYyBjb25zdHJ1Y3Rvcihwcml2YXRlIHBhZ2U6UGFnZSxwcml2YXRlIGxvY2F0aW9uOiBMb2NhdGlvbiwgcHJpdmF0ZSBhdXRoU2VydmljZTpBdXRoU2VydmljZSwgcHJpdmF0ZSBtZW1iZXJTZXJ2aWNlOk1lbWJlclNlcnZpY2UscHJpdmF0ZSByb3V0ZXI6IFJvdXRlciwgcHJpdmF0ZSBhY3RpdmF0ZWRSb3V0ZTogQWN0aXZhdGVkUm91dGUsXHJcbiAgICAgICAgcHJpdmF0ZSByb3V0ZXJFeHRlbnNpb25zOiBSb3V0ZXJFeHRlbnNpb25zKSB7XHJcbiAgICAgICAgdGhpcy5pbnB1dCA9IHtcclxuICAgICAgICAgICAgXCJmaXJzdG5hbWVcIjogXCJcIixcclxuICAgICAgICAgICAgXCJsYXN0bmFtZVwiOiBcIlwiLFxyXG4gICAgICAgICAgICBcImVtYWlsXCI6IFwiXCIsXHJcbiAgICAgICAgICAgIFwicGFzc3dvcmRcIjogXCJcIlxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBuZ0FmdGVyVmlld0luaXQoKSB7XHJcbiAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgbmdPbkluaXQoKSB7XHJcbiAgICAgICAgdGhpcy5wYWdlLmFjdGlvbkJhckhpZGRlbiA9IHRydWU7XHJcbiAgICAgICAgdmFyIGRhdGFPYmplY3QgPSBKU09OLnBhcnNlKExTLmdldEl0ZW0oJ2N1cnJlbnRVc2VyJykpO1xyXG5cclxuICAgICAgICBjb25zb2xlLmxvZyhcIlVzZXIgSUQgIG9uIFRyYW5zUElOIFwiICsgZGF0YU9iamVjdC5faWQpO1xyXG4gICAgICAgICAgaWYoZGF0YU9iamVjdC5faWQpXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgdGhpcy51c2VySWQgPSBkYXRhT2JqZWN0Ll9pZDtcclxuICAgICAgICAgICAgICB0aGlzLnVzZXJNb2RlID0gZGF0YU9iamVjdC51c2VyTW9kZTtcclxuICAgICAgICAgICAgIFxyXG4gICAgICAgICAgfVxyXG5cclxuXHJcbiAgICB9XHJcbiAgICBwdWJsaWMgcmVnaXN0ZXIoKSB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgY29uc29sZS5sb2coXCJSZWFjaGluZyBSZWdpc3RlciBcIik7XHJcblxyXG4gICAgICBcclxuICAgIH1cclxuXHJcbiAgICBvbk5hdkJ0blRhcCgpIHtcclxuICAgICAgICAvLyBUaGlzIGNvZGUgd2lsbCBiZSBjYWxsZWQgb25seSBpbiBBbmRyb2lkLlxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiTmF2aWdhdGlvbiBidXR0b24gdGFwcGVkIVwiKTtcclxuICAgIH1cclxuXHJcbiAgICBuZXh0KCl7XHJcblxyXG4gICAgICAgIGlmKHRoaXMucGluLmxlbmd0aCA8IDQgKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgVE5TRmFuY3lBbGVydC5zaG93RXJyb3IoXCJFcnJvciFcIiwgXCJUaGUgbWluaW11bSBsZW5ndGggb2YgVHJhbnMgUGluIGlzIDQgZGlnaXRcIiwgXCJPa1wiKSA7XHJcbiAgICAgICAgICAgcmV0dXJuOyBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgXHJcblxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiVXNlciBJZCBmb3Igc2V0UGluIFwiICsgdGhpcy51c2VySWQpXHJcbiAgICAgICAgdGhpcy5zZXRQaW4odGhpcy51c2VySWQsdGhpcy5waW4sdGhpcy5waW4pO1xyXG4gICAgfVxyXG5cclxuICAgIG5leHRwcmUoKXtcclxuXHJcbiAgICAgICAgaWYodGhpcy5waW4ubGVuZ3RoIDwgNCB8fCB0aGlzLmNwaW4ubGVuZ3RoIDwgNCApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBUTlNGYW5jeUFsZXJ0LnNob3dFcnJvcihcIkVycm9yIVwiLCBcIlRoZSBtaW5pbXVtIGxlbmd0aCBvZiBUcmFucyBQaW4gaXMgNCBkaWdpdFwiLCBcIk9rXCIpIDtcclxuICAgICAgICAgICByZXR1cm47IFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYodGhpcy5waW4gIT0gdGhpcy5jcGluKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgVE5TRmFuY3lBbGVydC5zaG93RXJyb3IoXCJFcnJvciFcIiwgXCJZb3VyIHRyYW5zYWN0aW9uIGRpZCBub3QgbWF0Y2hcIiwgXCJPa1wiKSA7XHJcbiAgICAgICAgICAgcmV0dXJuOyBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiVXNlciBJZCBmb3Igc2V0UGluIFwiICsgdGhpcy51c2VySWQpXHJcbiAgICAgICAgdGhpcy5zZXRQaW4odGhpcy51c2VySWQsdGhpcy5waW4sdGhpcy5jcGluKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgcHVibGljIGdvQmFjaygpIHtcclxuICAgICAgICB0aGlzLmxvY2F0aW9uLmJhY2soKTtcclxuICAgIH1cclxuICAgIHN0YXJ0QmFja2dyb3VuZEFuaW1hdGlvbihiYWNrZ3JvdW5kKSB7XHJcbiAgICAgICAgYmFja2dyb3VuZC5hbmltYXRlKHtcclxuICAgICAgICAgICAgc2NhbGU6IHsgeDogMS4wLCB5OiAxLjAgfSxcclxuICAgICAgICAgICAgZHVyYXRpb246IDEwMDAwXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG9uY29vcGVyYXRpdmVjaGFuZ2UoYXJnczogU2VsZWN0ZWRJbmRleENoYW5nZWRFdmVudERhdGEpIHtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhgRHJvcCBEb3duIHNlbGVjdGVkIGluZGV4IGNoYW5nZWQgICR7YXJncy5vbGRJbmRleH0gdG8gJHthcmdzLm5ld0luZGV4fS4gTmV3IHZhbHVlIGlzIFwiJHt0aGlzLnNlc3Npb25pdGVtcy5nZXRWYWx1ZShcclxuICAgICAgICAvLyAgICAgYXJncy5uZXdJbmRleCl9XCJgKTtcclxuXHJcbiAgICAgICAgY29uc29sZS5sb2coXCJTZWxlY3RlZCBJRCBcIiArIGFyZ3MubmV3SW5kZXgpO1xyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRDb29wZXJhdGl2ZSA9IHRoaXMuY29vcGVyYXRpdmVMaXN0LmdldFZhbHVlKGFyZ3MubmV3SW5kZXgpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiU2VsZWN0ZWQgSWQgVmFsdWUgIFwiICsgdGhpcy5zZWxlY3RlZENvb3BlcmF0aXZlKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgc2V0UGluKHVzZXJJZDpTdHJpbmcsIHBpbjogU3RyaW5nLCBjb25maXJtUGluOlN0cmluZyl7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJTZXQgUGluIElkIFwiKyAgdXNlcklkKTtcclxuICAgICAgIFxyXG5cclxuICAgICAgICB0aGlzLm1lbWJlclNlcnZpY2UuY2hhbmdlUGluKHVzZXJJZCxwaW4sY29uZmlybVBpbikuc3Vic2NyaWJlKFxyXG4gICAgICAgICAgICBkYXRhID0+IHsgXHJcbiAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkNoYW5nZSBQaW4gXCIrIEpTT04uc3RyaW5naWZ5KGRhdGFbXCJkYXRhXCJdKSApO1xyXG5cclxuICAgICAgICAgICAgIC8vc2VuZCBPVFBcclxuICAgICAgICAgICAgICB0aGlzLnNlbmRPVFAodXNlcklkKTtcclxuXHJcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJTZXQgUGluIFVzZXIgTW9kZSBcIisgdGhpcy51c2VyTW9kZSk7XHJcbiAgICAgICAgICAgICBpZih0aGlzLnVzZXJNb2RlID09IFwiVHJhbnNQaW5cIilcclxuICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICBMUy5yZW1vdmVJdGVtKCdjdXJyZW50VXNlcicpO1xyXG5cclxuICAgICAgICAgICAgICAgICBMUy5zZXRJdGVtKCdjdXJyZW50VXNlcicsIEpTT04uc3RyaW5naWZ5KGRhdGFbXCJkYXRhXCJdKSk7XHJcblxyXG4gICAgICAgICAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnL290cCddKTtcclxuICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICBpZih0aGlzLnVzZXJNb2RlID09IFwiQ29uZmlybVwiKVxyXG4gICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgIExTLnJlbW92ZUl0ZW0oJ2N1cnJlbnRVc2VyJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgIExTLnNldEl0ZW0oJ2N1cnJlbnRVc2VyJywgSlNPTi5zdHJpbmdpZnkoZGF0YVtcImRhdGFcIl0pKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvb3RwJ10pO1xyXG4gICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgIGVyciA9PiB7XHJcbiAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XHJcblxyXG4gICAgICAgICAgICAgICBUTlNGYW5jeUFsZXJ0LnNob3dFcnJvcihcIkVycm9yIVwiLCBlcnIuZXJyb3IubWVzc2FnZSwgXCJPa1wiKSAudGhlbiggKCkgPT4geyAvKiB1c2VyIHByZXNzZWQgdGhlIGJ1dHRvbiAqL1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICk7XHQgIFxyXG4gICAgfVxyXG4gICAgXHJcblxyXG4gICAgc2VuZE9UUCh1c2VySWQ6U3RyaW5nKXtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIlNlbnQgVHJhbnMgUGluIE9UcCBcIisgIHVzZXJJZCk7XHJcbiAgICAgICBcclxuXHJcbiAgICAgICAgdGhpcy5hdXRoU2VydmljZS5zZW5kVG9rZW4odXNlcklkKS5zdWJzY3JpYmUoXHJcbiAgICAgICAgICAgIGRhdGEgPT4geyBcclxuICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiT1RQIFNlbmRcIisgSlNPTi5zdHJpbmdpZnkoZGF0YVtcImRhdGFcIl0pICk7XHJcblxyXG4gICAgICAgICAgICAgLy9zZW5kIE9UUFxyXG4gICAgICAgXHJcbiAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICBlcnIgPT4ge1xyXG4gICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xyXG4gICAgICAgICAgICAgICBUTlNGYW5jeUFsZXJ0LnNob3dFcnJvcihcIkVycm9yIVwiLCBlcnIuZXJyb3IubWVzc2FnZSwgXCJPa1wiKSAudGhlbiggKCkgPT4geyAvKiB1c2VyIHByZXNzZWQgdGhlIGJ1dHRvbiAqL1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICk7XHQgIFxyXG4gICAgfVxyXG5cclxuICAgIG5hdmlnYXRlQmFjaygpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIkdvIEJhY2sgQnV0dG9uIENsaWNrZWRcIiApO1xyXG4gICAgICAgIHRoaXMucm91dGVyRXh0ZW5zaW9ucy5iYWNrVG9QcmV2aW91c1BhZ2UoKTtcclxuICAgICAgICAvL3RoaXMucm91dGVyLm5hdmlnYXRlKFtcIi9cIl0pO1xyXG4gICAgfVxyXG4gICAgXHJcblxyXG5cclxufSJdfQ==