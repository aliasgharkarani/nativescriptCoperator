"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var page_1 = require("ui/page");
var auth_service_1 = require("../../services/auth.service");
var LS = require("nativescript-localstorage");
var nativescript_fancyalert_1 = require("nativescript-fancyalert");
var router_1 = require("@angular/router");
var router_2 = require("nativescript-angular/router");
var OtpComponent = /** @class */ (function () {
    function OtpComponent(page, location, authService, router, activatedRoute, routerExtensions) {
        this.page = page;
        this.location = location;
        this.authService = authService;
        this.router = router;
        this.activatedRoute = activatedRoute;
        this.routerExtensions = routerExtensions;
        this.cooperative = [];
        this.hint = "Select Cooperative";
        this.cssClass = "default";
    }
    OtpComponent.prototype.ngAfterViewInit = function () {
    };
    OtpComponent.prototype.ngOnInit = function () {
        this.page.actionBarHidden = true;
        var dataObject = JSON.parse(LS.getItem('currentUser'));
        console.log("User ID " + dataObject._id);
        if (dataObject._id) {
            this.userId = dataObject._id;
            this.userMode = dataObject.userMode;
        }
        if (dataObject.phoneNo) {
            this.phoneNumber = dataObject.phoneNo;
        }
    };
    OtpComponent.prototype.register = function () {
        // if(this.input.firstname && this.input.lastname && this.input.email && this.input.password) {
        //     ApplicationSettings.setString("account", JSON.stringify(this.input));
        //     this.location.back();
        // } else {
        //     (new SnackBar()).simple("All Fields Required!");
        // }
        console.log("Reaching Register ");
    };
    OtpComponent.prototype.onNavBtnTap = function () {
        // This code will be called only in Android.
        console.log("Navigation button tapped!");
    };
    OtpComponent.prototype.goBack = function () {
        this.location.back();
    };
    OtpComponent.prototype.startBackgroundAnimation = function (background) {
        background.animate({
            scale: { x: 1.0, y: 1.0 },
            duration: 10000
        });
    };
    OtpComponent.prototype.oncooperativechange = function (args) {
        // console.log(`Drop Down selected index changed  ${args.oldIndex} to ${args.newIndex}. New value is "${this.sessionitems.getValue(
        //     args.newIndex)}"`);
        console.log("Selected ID " + args.newIndex);
        this.selectedCooperative = this.cooperativeList.getValue(args.newIndex);
        console.log("Selected Id Value  " + this.selectedCooperative);
    };
    OtpComponent.prototype.genarateNewToken = function () {
        this.sendOTP(this.userId);
    };
    OtpComponent.prototype.verifyOTP = function () {
        this.getOTP(this.tpass, this.userId);
    };
    OtpComponent.prototype.sendOTP = function (userId) {
        console.log("Edit Phone Number " + userId);
        this.authService.sendToken(userId).subscribe(function (data) {
            console.log("OTP Send" + JSON.stringify(data["data"]));
            //send OTP
            nativescript_fancyalert_1.TNSFancyAlert.showSuccess("Success!", "OTP sent", "Ok")
                .then(function () {
            });
        }, function (err) {
            console.log(err);
            nativescript_fancyalert_1.TNSFancyAlert.showError("Error!", err.error.message, "Ok").then(function () {
            });
        });
    };
    OtpComponent.prototype.getOTP = function (token, userId) {
        var _this = this;
        console.log("Edit Phone Number " + userId);
        this.authService.getToken(token, userId).subscribe(function (data) {
            console.log("Get OTP Ok " + JSON.stringify(data["data"]));
            //    TNSFancyAlert.showSuccess("Success!", "Token Verified", "Ok")
            //  .then( () => { /* user pressed the button */ 
            // });
            //send OTP
            // Redirect to Change Pin
            var dataObject = JSON.parse(LS.getItem('currentUser'));
            console.log("User ID " + dataObject._id);
            if (dataObject.userTypeId === "Vendor") {
                if (_this.userMode == "OTPVerify") {
                    LS.removeItem('currentUser');
                    LS.setItem('currentUser', JSON.stringify(data["data"]));
                    _this.router.navigate(['/accountdetails']);
                }
            }
            else {
                if (_this.userMode == "OTPVerify") {
                    LS.removeItem('currentUser');
                    LS.setItem('currentUser', JSON.stringify(data["data"]));
                    _this.router.navigate(['/phoneverify']);
                    // this.router.navigate(['/transpin']);
                }
                if (_this.userMode == "TransPin") {
                    LS.removeItem('currentUser');
                    LS.setItem('currentUser', JSON.stringify(data["data"]));
                    _this.router.navigate(['/']);
                }
            }
            if (_this.userMode == "Confirm") {
                //  LS.removeItem('currentUser');
                //  LS.setItem('currentUser', JSON.stringify(data["data"]));
                _this.router.navigate(['/']);
            }
        }, function (err) {
            console.log(err);
            nativescript_fancyalert_1.TNSFancyAlert.showError("Error!", err.error.message, "Ok").then(function () {
            });
        });
    };
    OtpComponent.prototype.navigateBack = function () {
        console.log("Go Back Button Clicked");
        this.routerExtensions.backToPreviousPage();
        //this.router.navigate(["/"]);
    };
    OtpComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: "ns-otp",
            templateUrl: "otp.component.html",
            styleUrls: ["./otp-common.css", "./otp.component.css"],
        }),
        __metadata("design:paramtypes", [page_1.Page, common_1.Location, auth_service_1.AuthService, router_1.Router, router_1.ActivatedRoute,
            router_2.RouterExtensions])
    ], OtpComponent);
    return OtpComponent;
}());
exports.OtpComponent = OtpComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3RwLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm90cC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBK0Q7QUFDL0QsMENBQTJDO0FBTzNDLGdDQUErQjtBQU8vQiw0REFBd0Q7QUFJeEQsSUFBSSxFQUFFLEdBQUcsT0FBTyxDQUFFLDJCQUEyQixDQUFFLENBQUM7QUFFaEQsbUVBQXdEO0FBRXhELDBDQUF5RDtBQUN6RCxzREFBK0Q7QUFTL0Q7SUFpQkksc0JBQTJCLElBQVUsRUFBUyxRQUFrQixFQUFVLFdBQXdCLEVBQVMsTUFBYyxFQUFVLGNBQThCLEVBQ3JKLGdCQUFrQztRQURuQixTQUFJLEdBQUosSUFBSSxDQUFNO1FBQVMsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQUFVLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQVMsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUFVLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUNySixxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBWjlDLGdCQUFXLEdBQXVCLEVBQUUsQ0FBQztRQUNyQyxTQUFJLEdBQVcsb0JBQW9CLENBQUM7UUFFN0IsYUFBUSxHQUFnQixTQUFTLENBQUM7SUFXekMsQ0FBQztJQUVELHNDQUFlLEdBQWY7SUFFRCxDQUFDO0lBRVEsK0JBQVEsR0FBZjtRQUVHLElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQztRQUVqQyxJQUFJLFVBQVUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztRQUl2RCxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDdkMsRUFBRSxDQUFBLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUNsQixDQUFDO1lBQ0csSUFBSSxDQUFDLE1BQU0sR0FBRyxVQUFVLENBQUMs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QixRQUFRLEVBQUUsUUFBUTtZQUNsQixXQUFXLEVBQUUsb0JBQW9CO1lBQ2pDLFNBQVMsRUFBRSxDQUFDLGtCQUFrQixFQUFFLHFCQUFxQixDQUFDO1NBQ3pELENBQUM7eUNBbUJtQyxXQUFJLEVBQW1CLGlCQUFRLEVBQXVCLDBCQUFXLEVBQWlCLGVBQU0sRUFBMEIsdUJBQWM7WUFDbkkseUJBQWdCO09BbEJyQyxZQUFZLENBd054QjtJQUFELG1CQUFDO0NBQUEsQUF4TkQsSUF3TkM7QUF4Tlksb0NBQVkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsT25Jbml0LEFmdGVyVmlld0luaXQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBMb2NhdGlvbiB9IGZyb20gXCJAYW5ndWxhci9jb21tb25cIjtcclxuaW1wb3J0IHsgU25hY2tCYXIgfSBmcm9tIFwibmF0aXZlc2NyaXB0LXNuYWNrYmFyXCI7XHJcbmltcG9ydCAqIGFzIEFwcGxpY2F0aW9uU2V0dGluZ3MgZnJvbSBcImFwcGxpY2F0aW9uLXNldHRpbmdzXCI7XHJcbmltcG9ydCB7IGNvbm5lY3Rpb25UeXBlLCBnZXRDb25uZWN0aW9uVHlwZSB9IGZyb20gXCJjb25uZWN0aXZpdHlcIjtcclxuaW1wb3J0IHsgQW5pbWF0aW9uIH0gZnJvbSBcInVpL2FuaW1hdGlvblwiO1xyXG5pbXBvcnQgeyBWaWV3IH0gZnJvbSBcInVpL2NvcmUvdmlld1wiO1xyXG5pbXBvcnQgeyBwcm9tcHQgfSBmcm9tIFwidWkvZGlhbG9nc1wiO1xyXG5pbXBvcnQgeyBQYWdlIH0gZnJvbSBcInVpL3BhZ2VcIjtcclxuaW1wb3J0IHsgVGV4dEZpZWxkIH0gZnJvbSBcInVpL3RleHQtZmllbGRcIjtcclxuXHJcbmltcG9ydCB7IFZhbHVlTGlzdCwgRHJvcERvd24gfSBmcm9tIFwibmF0aXZlc2NyaXB0LWRyb3AtZG93blwiO1xyXG5pbXBvcnQgeyBTZWxlY3RlZEluZGV4Q2hhbmdlZEV2ZW50RGF0YSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtZHJvcC1kb3duXCI7XHJcbmltcG9ydCB7IENvb3BlcmF0aXZlIH0gZnJvbSAnLi4vLi4vbW9kZWxzL2luZGV4JztcclxuXHJcbmltcG9ydCB7QXV0aFNlcnZpY2V9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9hdXRoLnNlcnZpY2VcIjtcclxuXHJcblxyXG5pbXBvcnQge0Nvb3BlcmF0aXZlU3RhZmYsVmVyaWZ5QXV0aH0gZnJvbSBcIi4uLy4uL21vZGVscy9pbmRleFwiO1xyXG5sZXQgTFMgPSByZXF1aXJlKCBcIm5hdGl2ZXNjcmlwdC1sb2NhbHN0b3JhZ2VcIiApO1xyXG5cclxuaW1wb3J0IHsgVE5TRmFuY3lBbGVydCB9IGZyb20gXCJuYXRpdmVzY3JpcHQtZmFuY3lhbGVydFwiO1xyXG5cclxuaW1wb3J0IHsgUm91dGVyLCBBY3RpdmF0ZWRSb3V0ZSB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcclxuaW1wb3J0IHsgUm91dGVyRXh0ZW5zaW9ucyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXJcIjtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcclxuICAgIHNlbGVjdG9yOiBcIm5zLW90cFwiLFxyXG4gICAgdGVtcGxhdGVVcmw6IFwib3RwLmNvbXBvbmVudC5odG1sXCIsXHJcbiAgICBzdHlsZVVybHM6IFtcIi4vb3RwLWNvbW1vbi5jc3NcIiwgXCIuL290cC5jb21wb25lbnQuY3NzXCJdLFxyXG59KVxyXG5cclxuZXhwb3J0IGNsYXNzIE90cENvbXBvbmVudCB7XHJcblxyXG4gICAgcHVibGljIGlucHV0OiBhbnk7XHJcbiAgICBzZWxlY3RlZENvb3BlcmF0aXZlSW5kZXg6IG51bWJlciA7XHJcbiAgICBzZWxlY3RlZENvb3BlcmF0aXZlIDogc3RyaW5nO1xyXG4gICAgc3RhZmZJZDogU3RyaW5nO1xyXG4gICAgY29vcGVyYXRpdmU6IEFycmF5PENvb3BlcmF0aXZlPiA9IFtdO1xyXG4gICAgaGludDogc3RyaW5nID0gXCJTZWxlY3QgQ29vcGVyYXRpdmVcIjtcclxuICAgIHB1YmxpYyBjb29wZXJhdGl2ZUxpc3Q6IFZhbHVlTGlzdDxzdHJpbmc+O1xyXG4gICAgcHVibGljIGNzc0NsYXNzOiBzdHJpbmcgICAgICA9IFwiZGVmYXVsdFwiO1xyXG4gICAgY29vcGVyYXRpdmVTdGFmZjogQ29vcGVyYXRpdmVTdGFmZjtcclxuICAgIHZlcmlmeUF1dGg6IFZlcmlmeUF1dGg7XHJcbiAgICB1c2VySWQ6IFN0cmluZztcclxuICAgIHVzZXJNb2RlOiBTdHJpbmc7XHJcbiAgICB0cGFzczogU3RyaW5nO1xyXG4gICAgcGhvbmVOdW1iZXI6IFN0cmluZztcclxuXHJcbiAgICBwdWJsaWMgY29uc3RydWN0b3IocHJpdmF0ZSBwYWdlOiBQYWdlLHByaXZhdGUgbG9jYXRpb246IExvY2F0aW9uLCBwcml2YXRlIGF1dGhTZXJ2aWNlOiBBdXRoU2VydmljZSxwcml2YXRlIHJvdXRlcjogUm91dGVyLCBwcml2YXRlIGFjdGl2YXRlZFJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSxcclxuICAgICAgICBwcml2YXRlIHJvdXRlckV4dGVuc2lvbnM6IFJvdXRlckV4dGVuc2lvbnMpIHtcclxuICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcclxuICAgICAgIFxyXG4gICB9XHJcbiAgIFxyXG4gICAgIHB1YmxpYyBuZ09uSW5pdCgpIHtcclxuXHJcbiAgICAgICAgdGhpcy5wYWdlLmFjdGlvbkJhckhpZGRlbiA9IHRydWU7XHJcblxyXG4gICAgICAgIHZhciBkYXRhT2JqZWN0ID0gSlNPTi5wYXJzZShMUy5nZXRJdGVtKCdjdXJyZW50VXNlcicpKTtcclxuXHJcbiAgICAgICBcclxuXHJcbiAgICAgICAgY29uc29sZS5sb2coXCJVc2VyIElEIFwiICsgZGF0YU9iamVjdC5faWQpO1xyXG4gICAgICAgICAgaWYoZGF0YU9iamVjdC5faWQpXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgdGhpcy51c2VySWQgPSBkYXRhT2JqZWN0Ll9pZDtcclxuICAgICAgICAgICAgICB0aGlzLnVzZXJNb2RlID0gZGF0YU9iamVjdC51c2VyTW9kZTtcclxuICAgICAgICAgICAgIFxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGlmKGRhdGFPYmplY3QucGhvbmVObylcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgICB0aGlzLnBob25lTnVtYmVyID0gZGF0YU9iamVjdC5waG9uZU5vO1xyXG4gICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgfVxyXG4gICAgcHVibGljIHJlZ2lzdGVyKCkge1xyXG4gICAgICAgIC8vIGlmKHRoaXMuaW5wdXQuZmlyc3RuYW1lICYmIHRoaXMuaW5wdXQubGFzdG5hbWUgJiYgdGhpcy5pbnB1dC5lbWFpbCAmJiB0aGlzLmlucHV0LnBhc3N3b3JkKSB7XHJcbiAgICAgICAgLy8gICAgIEFwcGxpY2F0aW9uU2V0dGluZ3Muc2V0U3RyaW5nKFwiYWNjb3VudFwiLCBKU09OLnN0cmluZ2lmeSh0aGlzLmlucHV0KSk7XHJcbiAgICAgICAgLy8gICAgIHRoaXMubG9jYXRpb24uYmFjaygpO1xyXG4gICAgICAgIC8vIH0gZWxzZSB7XHJcbiAgICAgICAgLy8gICAgIChuZXcgU25hY2tCYXIoKSkuc2ltcGxlKFwiQWxsIEZpZWxkcyBSZXF1aXJlZCFcIik7XHJcbiAgICAgICAgLy8gfVxyXG5cclxuICAgICAgICBjb25zb2xlLmxvZyhcIlJlYWNoaW5nIFJlZ2lzdGVyIFwiICk7XHJcblxyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIG9uTmF2QnRuVGFwKCl7XHJcbiAgICAgICAgLy8gVGhpcyBjb2RlIHdpbGwgYmUgY2FsbGVkIG9ubHkgaW4gQW5kcm9pZC5cclxuICAgICAgICBjb25zb2xlLmxvZyhcIk5hdmlnYXRpb24gYnV0dG9uIHRhcHBlZCFcIik7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdvQmFjaygpIHtcclxuICAgICAgICB0aGlzLmxvY2F0aW9uLmJhY2soKTtcclxuICAgIH1cclxuICAgIHN0YXJ0QmFja2dyb3VuZEFuaW1hdGlvbihiYWNrZ3JvdW5kKSB7XHJcbiAgICAgICAgYmFja2dyb3VuZC5hbmltYXRlKHtcclxuICAgICAgICAgIHNjYWxlOiB7IHg6IDEuMCwgeTogMS4wIH0sXHJcbiAgICAgICAgICBkdXJhdGlvbjogMTAwMDBcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG5cclxuICAgICAgcHVibGljIG9uY29vcGVyYXRpdmVjaGFuZ2UoYXJnczogU2VsZWN0ZWRJbmRleENoYW5nZWRFdmVudERhdGEpIHtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhgRHJvcCBEb3duIHNlbGVjdGVkIGluZGV4IGNoYW5nZWQgICR7YXJncy5vbGRJbmRleH0gdG8gJHthcmdzLm5ld0luZGV4fS4gTmV3IHZhbHVlIGlzIFwiJHt0aGlzLnNlc3Npb25pdGVtcy5nZXRWYWx1ZShcclxuICAgICAgICAvLyAgICAgYXJncy5uZXdJbmRleCl9XCJgKTtcclxuICAgICAgXHJcbiAgICAgICAgY29uc29sZS5sb2coXCJTZWxlY3RlZCBJRCBcIiArIGFyZ3MubmV3SW5kZXggKTtcclxuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZENvb3BlcmF0aXZlID0gdGhpcy5jb29wZXJhdGl2ZUxpc3QuZ2V0VmFsdWUoYXJncy5uZXdJbmRleCk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiU2VsZWN0ZWQgSWQgVmFsdWUgIFwiICsgIHRoaXMuc2VsZWN0ZWRDb29wZXJhdGl2ZSApO1xyXG4gICAgICAgICAgIFxyXG4gICAgICB9XHJcblxyXG4gICAgICBnZW5hcmF0ZU5ld1Rva2VuKCl7XHJcbiAgICAgICAgICB0aGlzLnNlbmRPVFAodGhpcy51c2VySWQpO1xyXG4gICAgICB9XHJcblxyXG5cclxuICAgICAgdmVyaWZ5T1RQKCl7XHJcbiAgICAgICAgICB0aGlzLmdldE9UUCh0aGlzLnRwYXNzLCB0aGlzLnVzZXJJZCk7XHJcbiAgICAgIH1cclxuICAgICBcclxuICAgICAgc2VuZE9UUCh1c2VySWQ6U3RyaW5nKXtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIkVkaXQgUGhvbmUgTnVtYmVyIFwiKyAgdXNlcklkKTtcclxuICAgICAgIFxyXG5cclxuICAgICAgICB0aGlzLmF1dGhTZXJ2aWNlLnNlbmRUb2tlbih1c2VySWQpLnN1YnNjcmliZShcclxuICAgICAgICAgICAgZGF0YSA9PiB7IFxyXG4gICAgICAgICAgICAgY29uc29sZS5sb2coXCJPVFAgU2VuZFwiKyBKU09OLnN0cmluZ2lmeShkYXRhW1wiZGF0YVwiXSkgKTtcclxuXHJcbiAgICAgICAgICAgICAvL3NlbmQgT1RQXHJcblxyXG4gICAgICAgICAgICAgVE5TRmFuY3lBbGVydC5zaG93U3VjY2VzcyhcIlN1Y2Nlc3MhXCIsIFwiT1RQIHNlbnRcIiwgXCJPa1wiKVxyXG4gICAgICAgICAgICAgLnRoZW4oICgpID0+IHsgLyogdXNlciBwcmVzc2VkIHRoZSBidXR0b24gKi9cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICBcclxuICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgIGVyciA9PiB7XHJcbiAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XHJcblxyXG4gICAgICAgICAgICAgICBUTlNGYW5jeUFsZXJ0LnNob3dFcnJvcihcIkVycm9yIVwiLCBlcnIuZXJyb3IubWVzc2FnZSwgXCJPa1wiKSAudGhlbiggKCkgPT4geyAvKiB1c2VyIHByZXNzZWQgdGhlIGJ1dHRvbiAqL1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICApO1x0ICBcclxuICAgIH1cclxuXHJcbiAgICBnZXRPVFAodG9rZW46U3RyaW5nLHVzZXJJZDpTdHJpbmcpe1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiRWRpdCBQaG9uZSBOdW1iZXIgXCIrICB1c2VySWQpO1xyXG4gICAgICAgXHJcblxyXG4gICAgICAgIHRoaXMuYXV0aFNlcnZpY2UuZ2V0VG9rZW4odG9rZW4sdXNlcklkKS5zdWJzY3JpYmUoXHJcbiAgICAgICAgICAgIGRhdGEgPT4geyBcclxuICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiR2V0IE9UUCBPayBcIisgSlNPTi5zdHJpbmdpZnkoZGF0YVtcImRhdGFcIl0pICk7XHJcbiAgICAgICAgICAgIC8vICAgIFROU0ZhbmN5QWxlcnQuc2hvd1N1Y2Nlc3MoXCJTdWNjZXNzIVwiLCBcIlRva2VuIFZlcmlmaWVkXCIsIFwiT2tcIilcclxuICAgICAgICAgICAgLy8gIC50aGVuKCAoKSA9PiB7IC8qIHVzZXIgcHJlc3NlZCB0aGUgYnV0dG9uICovIFxyXG4gICAgICAgICAgICAvLyB9KTtcclxuICAgICAgICAgICAgIC8vc2VuZCBPVFBcclxuXHJcbiAgICAgICAgICAgICAvLyBSZWRpcmVjdCB0byBDaGFuZ2UgUGluXHJcblxyXG4gICAgICAgICAgICAgdmFyIGRhdGFPYmplY3QgPSBKU09OLnBhcnNlKExTLmdldEl0ZW0oJ2N1cnJlbnRVc2VyJykpO1xyXG5cclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiVXNlciBJRCBcIiArIGRhdGFPYmplY3QuX2lkKTtcclxuICAgICAgICAgICAgaWYoZGF0YU9iamVjdC51c2VyVHlwZUlkID09PSBcIlZlbmRvclwiKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLnVzZXJNb2RlID09IFwiT1RQVmVyaWZ5XCIpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgTFMucmVtb3ZlSXRlbSgnY3VycmVudFVzZXInKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgTFMuc2V0SXRlbSgnY3VycmVudFVzZXInLCBKU09OLnN0cmluZ2lmeShkYXRhW1wiZGF0YVwiXSkpO1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvYWNjb3VudGRldGFpbHMnXSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH1lbHNlXHJcbiAgICAgICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgXHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICBpZih0aGlzLnVzZXJNb2RlID09IFwiT1RQVmVyaWZ5XCIpXHJcbiAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgTFMucmVtb3ZlSXRlbSgnY3VycmVudFVzZXInKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgTFMuc2V0SXRlbSgnY3VycmVudFVzZXInLCBKU09OLnN0cmluZ2lmeShkYXRhW1wiZGF0YVwiXSkpO1xyXG5cclxuICAgICAgICAgICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy9waG9uZXZlcmlmeSddKTtcclxuICAgICAgICAgICAgICAgIC8vIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnL3RyYW5zcGluJ10pO1xyXG4gICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgIGlmKHRoaXMudXNlck1vZGUgPT0gXCJUcmFuc1BpblwiKVxyXG4gICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgIExTLnJlbW92ZUl0ZW0oJ2N1cnJlbnRVc2VyJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgIExTLnNldEl0ZW0oJ2N1cnJlbnRVc2VyJywgSlNPTi5zdHJpbmdpZnkoZGF0YVtcImRhdGFcIl0pKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvJ10pO1xyXG4gICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgIGlmKHRoaXMudXNlck1vZGUgPT0gXCJDb25maXJtXCIpXHJcbiAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAvLyAgTFMucmVtb3ZlSXRlbSgnY3VycmVudFVzZXInKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyAgTFMuc2V0SXRlbSgnY3VycmVudFVzZXInLCBKU09OLnN0cmluZ2lmeShkYXRhW1wiZGF0YVwiXSkpO1xyXG5cclxuICAgICAgICAgICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy8nXSk7XHJcbiAgICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAgICBcclxuICAgICAgIFxyXG4gICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgZXJyID0+IHtcclxuICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcclxuXHJcbiAgICAgICAgICAgICAgIFROU0ZhbmN5QWxlcnQuc2hvd0Vycm9yKFwiRXJyb3IhXCIsIGVyci5lcnJvci5tZXNzYWdlLCBcIk9rXCIpIC50aGVuKCAoKSA9PiB7IC8qIHVzZXIgcHJlc3NlZCB0aGUgYnV0dG9uICovXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICk7XHQgIFxyXG4gICAgfVxyXG5cclxuICAgIG5hdmlnYXRlQmFjaygpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIkdvIEJhY2sgQnV0dG9uIENsaWNrZWRcIiApO1xyXG4gICAgICAgIHRoaXMucm91dGVyRXh0ZW5zaW9ucy5iYWNrVG9QcmV2aW91c1BhZ2UoKTtcclxuICAgICAgICAvL3RoaXMucm91dGVyLm5hdmlnYXRlKFtcIi9cIl0pO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAgIFxyXG5cclxufSJdfQ==