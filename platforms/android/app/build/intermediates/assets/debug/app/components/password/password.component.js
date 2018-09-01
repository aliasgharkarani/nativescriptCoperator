"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var common_1 = require("@angular/common");
var connectivity_1 = require("connectivity");
var cooperative_service_1 = require("../../services/cooperative.service");
var cooperativeStaff_service_1 = require("../../services/cooperativeStaff.service");
var auth_service_1 = require("../../services/auth.service");
var nativescript_fancyalert_1 = require("nativescript-fancyalert");
var LS = require("nativescript-localstorage");
var router_2 = require("nativescript-angular/router");
var PasswordComponent = /** @class */ (function () {
    function PasswordComponent(location, cooperativeService, cooperativeStaffService, router, routerExtensions, activatedRoute, authService) {
        this.location = location;
        this.cooperativeService = cooperativeService;
        this.cooperativeStaffService = cooperativeStaffService;
        this.router = router;
        this.routerExtensions = routerExtensions;
        this.activatedRoute = activatedRoute;
        this.authService = authService;
        this.cooperative = [];
        this.hint = "Select Cooperative";
        this.cssClass = "default";
        this.PasswordLabel = "";
        this.isNew = false;
        this.headerCooperatorStyle = "";
        this.headerVendorStyle = "";
    }
    PasswordComponent.prototype.ngAfterViewInit = function () {
    };
    PasswordComponent.prototype.ngOnInit = function () {
        var dataObject = JSON.parse(LS.getItem('currentUser'));
        console.log("User ID " + dataObject._id);
        if (dataObject._id) {
            this.userId = dataObject._id;
            this.userMode = dataObject.userMode;
            if (dataObject.userMode == "New") {
                this.oldpasswordhint = "Temporary Password";
                this.PasswordLabel = "Set Password";
                this.isNew = true;
            }
            else {
                this.oldpasswordhint = "Old Password";
                this.PasswordLabel = "Change Password";
                this.isNew = false;
            }
            if (dataObject.userTypeId == "Cooperator") {
                this.headerCooperatorStyle = "color: #ff9000; font-size: 15;";
                this.headerVendorStyle = "color: white; font-size: 15;";
            }
            else {
                this.headerCooperatorStyle = "color:white ; font-size: 15;";
                this.headerVendorStyle = "color: #ff9000; font-size: 15;";
            }
        }
        // this.userId = this.activatedRoute.snapshot.params["userId"];
        // this.userMode = this.activatedRoute.snapshot.params["userMode"];
    };
    PasswordComponent.prototype.register = function () {
        // if(this.input.firstname && this.input.lastname && this.input.email && this.input.password) {
        //     ApplicationSettings.setString("account", JSON.stringify(this.input));
        //     this.location.back();
        // } else {
        //     (new SnackBar()).simple("All Fields Required!");
        // }
        console.log("Reaching Register ");
    };
    PasswordComponent.prototype.onNavBtnTap = function () {
        // This code will be called only in Android.
        console.log("Navigation button tapped!");
    };
    PasswordComponent.prototype.cancel = function () {
    };
    PasswordComponent.prototype.goBack = function () {
        this.location.back();
    };
    PasswordComponent.prototype.startBackgroundAnimation = function (background) {
        background.animate({
            scale: { x: 1.0, y: 1.0 },
            duration: 10000
        });
    };
    PasswordComponent.prototype.sendVerifyAuth = function (verifyAuth) {
        console.log("Verify " + verifyAuth.staffId);
        this.cooperativeStaffService.verifyAuthToCreatLater(verifyAuth).subscribe(function (data) {
            console.log("Very Auth " + JSON.stringify(data["data"]));
        }, function (err) {
            console.log(err);
        });
    };
    PasswordComponent.prototype.next = function () {
        var _this = this;
        if (connectivity_1.getConnectionType() === connectivity_1.connectionType.none) {
            // alert("Cooper Switch requires an internet connection to log in.");
            nativescript_fancyalert_1.TNSFancyAlert.showError("Error!", "Cooper Switch requires an internet connection to log in.", "Ok");
            return;
        }
        //this.loading = true;
        console.log("Login Reaching " + this.opass + " Password" + this.npass);
        this.opass = "Welcome";
        this.authService.resetPassword(this.userId, this.opass, this.npass, this.cnpass, this.userMode)
            .subscribe(function (data) {
            //this.isAuthenticating = false;
            console.log("change password data " + JSON.stringify(data["data"]));
            if (_this.userMode == "New") {
                LS.removeItem('currentUser');
                LS.setItem('currentUser', JSON.stringify(data["data"]));
                _this.sendOTP(_this.userId);
                _this.router.navigate(['/otp']);
            }
        }, function (error) {
            //this.alertService.error(error);
            nativescript_fancyalert_1.TNSFancyAlert.showError("Error!", error.error.message, "Ok");
            console.log("Error " + JSON.stringify(error));
            //  this.isAuthenticating = false;
            // this.loading = false;
        });
    };
    PasswordComponent.prototype.navigateBack = function () {
        this.routerExtensions.backToPreviousPage();
    };
    PasswordComponent.prototype.fabTap = function () {
    };
    PasswordComponent.prototype.onBottomNavigationTabSelected = function (args) {
        console.log("Tab selected:  " + args.oldIndex);
        if (args.newIndex == 0) {
            // this.router.navigate([""]);
            //this.maintab.nativeElement.selectedIndex  = 0;
        }
        else if (args.newIndex == 1) {
            this.router.navigate(["/approve"]);
        }
        else if (args.newIndex == 2) {
            // this.maintab.nativeElement.selectedIndex  = 1;
            //this.router.navigate(["/shop"]);
        }
        else if (args.newIndex == 3) {
            this.router.navigate(["/account"]);
        }
    };
    PasswordComponent.prototype.sendOTP = function (userId) {
        console.log("Edit Phone Number " + userId);
        this.authService.sendToken(userId).subscribe(function (data) {
            console.log("OTP Send" + JSON.stringify(data["data"]));
            //send OTP
        }, function (err) {
            console.log(err);
        });
    };
    PasswordComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: "ns-password",
            templateUrl: "./password.component.html",
            styleUrls: ["./password-common.css", "./password.component.css"],
        }),
        __metadata("design:paramtypes", [common_1.Location, cooperative_service_1.CooperativeService, cooperativeStaff_service_1.CooperativeStaffService,
            router_1.Router, router_2.RouterExtensions, router_1.ActivatedRoute, auth_service_1.AuthService])
    ], PasswordComponent);
    return PasswordComponent;
}());
exports.PasswordComponent = PasswordComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFzc3dvcmQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicGFzc3dvcmQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQStEO0FBQy9ELDBDQUF5RDtBQUN6RCwwQ0FBMkM7QUFHM0MsNkNBQWlFO0FBVWpFLDBFQUFzRTtBQUN0RSxvRkFBZ0Y7QUFDaEYsNERBQXdEO0FBRXhELG1FQUF3RDtBQUd4RCxJQUFJLEVBQUUsR0FBRyxPQUFPLENBQUUsMkJBQTJCLENBQUUsQ0FBQztBQUVoRCxzREFBK0Q7QUFtQi9EO0lBdUJJLDJCQUEyQixRQUFrQixFQUFVLGtCQUFxQyxFQUFVLHVCQUErQyxFQUN6SSxNQUFjLEVBQVMsZ0JBQWtDLEVBQVUsY0FBOEIsRUFBVSxXQUF1QjtRQURuSCxhQUFRLEdBQVIsUUFBUSxDQUFVO1FBQVUsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFtQjtRQUFVLDRCQUF1QixHQUF2Qix1QkFBdUIsQ0FBd0I7UUFDekksV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUFTLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFBVSxtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFBVSxnQkFBVyxHQUFYLFdBQVcsQ0FBWTtRQWxCOUksZ0JBQVcsR0FBdUIsRUFBRSxDQUFDO1FBQ3JDLFNBQUksR0FBVyxvQkFBb0IsQ0FBQztRQUU3QixhQUFRLEdBQWdCLFNBQVMsQ0FBQztRQVN6QyxrQkFBYSxHQUFXLEVBQUUsQ0FBQztRQUMzQixVQUFLLEdBQVksS0FBSyxDQUFDO1FBQ3ZCLDBCQUFxQixHQUFFLEVBQUUsQ0FBQztRQUMxQixzQkFBaUIsR0FBRSxFQUFFLENBQUM7SUFLdEIsQ0FBQztJQUdELDJDQUFlLEdBQWY7SUFFQSxDQUFDO0lBRVEsb0NBQVEsR0FBZjtRQUdHLElBQUksVUFBVSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQyxD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R0FBRyxNQUFNLENBQUMsQ0FBQztRQUczQyxJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxTQUFTLENBQ3hDLFVBQUEsSUFBSTtZQUNILE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxHQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUUsQ0FBQztZQUV2RCxVQUFVO1FBRVQsQ0FBQyxFQUNELFVBQUEsR0FBRztZQUNGLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFZixDQUFDLENBQ0wsQ0FBQztJQUNWLENBQUM7SUF6Tk8saUJBQWlCO1FBUjdCLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsUUFBUSxFQUFFLGFBQWE7WUFDdkIsV0FBVyxFQUFFLDJCQUEyQjtZQUN4QyxTQUFTLEVBQUUsQ0FBQyx1QkFBdUIsRUFBRSwwQkFBMEIsQ0FBQztTQUNuRSxDQUFDO3lDQTBCdUMsaUJBQVEsRUFBNkIsd0NBQWtCLEVBQWtDLGtEQUF1QjtZQUNqSSxlQUFNLEVBQTJCLHlCQUFnQixFQUEwQix1QkFBYyxFQUFzQiwwQkFBVztPQXhCckksaUJBQWlCLENBNE43QjtJQUFELHdCQUFDO0NBQUEsQUE1TkQsSUE0TkM7QUE1TlksOENBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LE9uSW5pdCxBZnRlclZpZXdJbml0IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgUm91dGVyLCBBY3RpdmF0ZWRSb3V0ZSB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcclxuaW1wb3J0IHsgTG9jYXRpb24gfSBmcm9tIFwiQGFuZ3VsYXIvY29tbW9uXCI7XHJcbmltcG9ydCB7IFNuYWNrQmFyIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1zbmFja2JhclwiO1xyXG5pbXBvcnQgKiBhcyBBcHBsaWNhdGlvblNldHRpbmdzIGZyb20gXCJhcHBsaWNhdGlvbi1zZXR0aW5nc1wiO1xyXG5pbXBvcnQgeyBjb25uZWN0aW9uVHlwZSwgZ2V0Q29ubmVjdGlvblR5cGUgfSBmcm9tIFwiY29ubmVjdGl2aXR5XCI7XHJcbmltcG9ydCB7IEFuaW1hdGlvbiB9IGZyb20gXCJ1aS9hbmltYXRpb25cIjtcclxuaW1wb3J0IHsgVmlldyB9IGZyb20gXCJ1aS9jb3JlL3ZpZXdcIjtcclxuaW1wb3J0IHsgcHJvbXB0IH0gZnJvbSBcInVpL2RpYWxvZ3NcIjtcclxuaW1wb3J0IHsgUGFnZSB9IGZyb20gXCJ1aS9wYWdlXCI7XHJcbmltcG9ydCB7IFRleHRGaWVsZCB9IGZyb20gXCJ1aS90ZXh0LWZpZWxkXCI7XHJcblxyXG5pbXBvcnQgeyBWYWx1ZUxpc3QsIERyb3BEb3duIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1kcm9wLWRvd25cIjtcclxuaW1wb3J0IHsgU2VsZWN0ZWRJbmRleENoYW5nZWRFdmVudERhdGEgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWRyb3AtZG93blwiO1xyXG5pbXBvcnQgeyBDb29wZXJhdGl2ZSB9IGZyb20gJy4uLy4uL21vZGVscy9pbmRleCc7XHJcbmltcG9ydCB7Q29vcGVyYXRpdmVTZXJ2aWNlfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvY29vcGVyYXRpdmUuc2VydmljZVwiO1xyXG5pbXBvcnQge0Nvb3BlcmF0aXZlU3RhZmZTZXJ2aWNlfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvY29vcGVyYXRpdmVTdGFmZi5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7QXV0aFNlcnZpY2V9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9hdXRoLnNlcnZpY2VcIjtcclxuXHJcbmltcG9ydCB7IFROU0ZhbmN5QWxlcnQgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWZhbmN5YWxlcnRcIjtcclxuXHJcbmltcG9ydCB7Q29vcGVyYXRpdmVTdGFmZixWZXJpZnlBdXRofSBmcm9tIFwiLi4vLi4vbW9kZWxzL2luZGV4XCI7XHJcbmxldCBMUyA9IHJlcXVpcmUoIFwibmF0aXZlc2NyaXB0LWxvY2Fsc3RvcmFnZVwiICk7XHJcblxyXG5pbXBvcnQgeyBSb3V0ZXJFeHRlbnNpb25zIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlclwiO1xyXG5pbXBvcnQgeyBCb3R0b21OYXZpZ2F0aW9uLCBCb3R0b21OYXZpZ2F0aW9uVGFiLCBPblRhYlNlbGVjdGVkRXZlbnREYXRhIH0gZnJvbSAnbmF0aXZlc2NyaXB0LWJvdHRvbS1uYXZpZ2F0aW9uJztcclxuXHJcblxyXG5cclxuXHJcbmltcG9ydCB7IGFsZXJ0IH0gZnJvbSBcIi4uLy4uL3NoYXJlZFwiO1xyXG5cclxuXHJcblxyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxyXG4gICAgc2VsZWN0b3I6IFwibnMtcGFzc3dvcmRcIixcclxuICAgIHRlbXBsYXRlVXJsOiBcIi4vcGFzc3dvcmQuY29tcG9uZW50Lmh0bWxcIixcclxuICAgIHN0eWxlVXJsczogW1wiLi9wYXNzd29yZC1jb21tb24uY3NzXCIsIFwiLi9wYXNzd29yZC5jb21wb25lbnQuY3NzXCJdLFxyXG59KVxyXG5cclxuXHJcbmV4cG9ydCBjbGFzcyBQYXNzd29yZENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcblxyXG4gICAgcHVibGljIGlucHV0OiBhbnk7XHJcbiAgICBzZWxlY3RlZENvb3BlcmF0aXZlSW5kZXg6IG51bWJlciA7XHJcbiAgICBzZWxlY3RlZENvb3BlcmF0aXZlIDogc3RyaW5nO1xyXG4gICAgc3RhZmZJZDogU3RyaW5nO1xyXG4gICAgY29vcGVyYXRpdmU6IEFycmF5PENvb3BlcmF0aXZlPiA9IFtdO1xyXG4gICAgaGludDogc3RyaW5nID0gXCJTZWxlY3QgQ29vcGVyYXRpdmVcIjtcclxuICAgIHB1YmxpYyBjb29wZXJhdGl2ZUxpc3Q6IFZhbHVlTGlzdDxzdHJpbmc+O1xyXG4gICAgcHVibGljIGNzc0NsYXNzOiBzdHJpbmcgICAgICA9IFwiZGVmYXVsdFwiO1xyXG4gICAgY29vcGVyYXRpdmVTdGFmZjogQ29vcGVyYXRpdmVTdGFmZjtcclxuICAgIHZlcmlmeUF1dGg6IFZlcmlmeUF1dGg7XHJcbiAgICBvcGFzczogU3RyaW5nO1xyXG4gICAgbnBhc3M6IFN0cmluZztcclxuICAgIHVzZXJJZDogU3RyaW5nO1xyXG4gICAgdXNlck1vZGU6IFN0cmluZztcclxuICAgIGNucGFzczogU3RyaW5nO1xyXG4gICAgb2xkcGFzc3dvcmRoaW50OiBTdHJpbmc7XHJcbiAgICBQYXNzd29yZExhYmVsOiBTdHJpbmcgPSBcIlwiO1xyXG4gICAgaXNOZXc6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIGhlYWRlckNvb3BlcmF0b3JTdHlsZT0gXCJcIjtcclxuICAgIGhlYWRlclZlbmRvclN0eWxlPSBcIlwiO1xyXG5cclxuICAgIHB1YmxpYyBjb25zdHJ1Y3Rvcihwcml2YXRlIGxvY2F0aW9uOiBMb2NhdGlvbiwgcHJpdmF0ZSBjb29wZXJhdGl2ZVNlcnZpY2U6Q29vcGVyYXRpdmVTZXJ2aWNlLCBwcml2YXRlIGNvb3BlcmF0aXZlU3RhZmZTZXJ2aWNlOkNvb3BlcmF0aXZlU3RhZmZTZXJ2aWNlLFxyXG4gICAgICAgIHByaXZhdGUgcm91dGVyOiBSb3V0ZXIscHJpdmF0ZSByb3V0ZXJFeHRlbnNpb25zOiBSb3V0ZXJFeHRlbnNpb25zLCBwcml2YXRlIGFjdGl2YXRlZFJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSwgcHJpdmF0ZSBhdXRoU2VydmljZTpBdXRoU2VydmljZSkge1xyXG4gICAgIFxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBuZ0FmdGVyVmlld0luaXQoKSB7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcbiAgICBcclxuICAgICAgcHVibGljIG5nT25Jbml0KCkge1xyXG4gXHJcbiBcclxuICAgICAgICAgdmFyIGRhdGFPYmplY3QgPSBKU09OLnBhcnNlKExTLmdldEl0ZW0oJ2N1cnJlbnRVc2VyJykpO1xyXG4gXHJcbiAgICAgICAgXHJcbiBcclxuICAgICAgICAgY29uc29sZS5sb2coXCJVc2VyIElEIFwiICsgZGF0YU9iamVjdC5faWQpO1xyXG4gICAgICAgICAgIGlmKGRhdGFPYmplY3QuX2lkKVxyXG4gICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgdGhpcy51c2VySWQgPSBkYXRhT2JqZWN0Ll9pZDtcclxuICAgICAgICAgICAgICAgdGhpcy51c2VyTW9kZSA9IGRhdGFPYmplY3QudXNlck1vZGU7XHJcbiAgICAgICAgICAgICAgIGlmKGRhdGFPYmplY3QudXNlck1vZGUgPT0gXCJOZXdcIilcclxuICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgdGhpcy5vbGRwYXNzd29yZGhpbnQgPSBcIlRlbXBvcmFyeSBQYXNzd29yZFwiO1xyXG4gICAgICAgICAgICAgICAgICAgdGhpcy5QYXNzd29yZExhYmVsID0gXCJTZXQgUGFzc3dvcmRcIjtcclxuICAgICAgICAgICAgICAgICAgIHRoaXMuaXNOZXcgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICB0aGlzLm9sZHBhc3N3b3JkaGludCA9IFwiT2xkIFBhc3N3b3JkXCI7XHJcbiAgICAgICAgICAgICAgICAgdGhpcy5QYXNzd29yZExhYmVsID0gXCJDaGFuZ2UgUGFzc3dvcmRcIjtcclxuICAgICAgICAgICAgICAgICB0aGlzLmlzTmV3ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgIGlmKGRhdGFPYmplY3QudXNlclR5cGVJZCA9PSBcIkNvb3BlcmF0b3JcIilcclxuICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5oZWFkZXJDb29wZXJhdG9yU3R5bGU9IFwiY29sb3I6ICNmZjkwMDA7IGZvbnQtc2l6ZTogMTU7XCI7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmhlYWRlclZlbmRvclN0eWxlID0gXCJjb2xvcjogd2hpdGU7IGZvbnQtc2l6ZTogMTU7XCJcclxuICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmhlYWRlckNvb3BlcmF0b3JTdHlsZT0gXCJjb2xvcjp3aGl0ZSA7IGZvbnQtc2l6ZTogMTU7XCI7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmhlYWRlclZlbmRvclN0eWxlID0gXCJjb2xvcjogI2ZmOTAwMDsgZm9udC1zaXplOiAxNTtcIlxyXG4gICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgICAvLyB0aGlzLnVzZXJJZCA9IHRoaXMuYWN0aXZhdGVkUm91dGUuc25hcHNob3QucGFyYW1zW1widXNlcklkXCJdO1xyXG4gICAgICAgICAvLyB0aGlzLnVzZXJNb2RlID0gdGhpcy5hY3RpdmF0ZWRSb3V0ZS5zbmFwc2hvdC5wYXJhbXNbXCJ1c2VyTW9kZVwiXTtcclxuICAgICAgfVxyXG4gICAgIHB1YmxpYyByZWdpc3RlcigpIHtcclxuICAgICAgICAgLy8gaWYodGhpcy5pbnB1dC5maXJzdG5hbWUgJiYgdGhpcy5pbnB1dC5sYXN0bmFtZSAmJiB0aGlzLmlucHV0LmVtYWlsICYmIHRoaXMuaW5wdXQucGFzc3dvcmQpIHtcclxuICAgICAgICAgLy8gICAgIEFwcGxpY2F0aW9uU2V0dGluZ3Muc2V0U3RyaW5nKFwiYWNjb3VudFwiLCBKU09OLnN0cmluZ2lmeSh0aGlzLmlucHV0KSk7XHJcbiAgICAgICAgIC8vICAgICB0aGlzLmxvY2F0aW9uLmJhY2soKTtcclxuICAgICAgICAgLy8gfSBlbHNlIHtcclxuICAgICAgICAgLy8gICAgIChuZXcgU25hY2tCYXIoKSkuc2ltcGxlKFwiQWxsIEZpZWxkcyBSZXF1aXJlZCFcIik7XHJcbiAgICAgICAgIC8vIH1cclxuIFxyXG4gICAgICAgICBjb25zb2xlLmxvZyhcIlJlYWNoaW5nIFJlZ2lzdGVyIFwiICk7XHJcbiBcclxuICAgICAgICBcclxuICAgICB9XHJcbiBcclxuICAgICBvbk5hdkJ0blRhcCgpe1xyXG4gICAgICAgICAvLyBUaGlzIGNvZGUgd2lsbCBiZSBjYWxsZWQgb25seSBpbiBBbmRyb2lkLlxyXG4gICAgICAgICBjb25zb2xlLmxvZyhcIk5hdmlnYXRpb24gYnV0dG9uIHRhcHBlZCFcIik7XHJcbiAgICAgfVxyXG4gXHJcbiAgICAgY2FuY2VsKCl7XHJcbiBcclxuICAgICB9XHJcbiBcclxuICAgICBwdWJsaWMgZ29CYWNrKCkge1xyXG4gICAgICAgICB0aGlzLmxvY2F0aW9uLmJhY2soKTtcclxuICAgICB9XHJcbiAgICAgc3RhcnRCYWNrZ3JvdW5kQW5pbWF0aW9uKGJhY2tncm91bmQpIHtcclxuICAgICAgICAgYmFja2dyb3VuZC5hbmltYXRlKHtcclxuICAgICAgICAgICBzY2FsZTogeyB4OiAxLjAsIHk6IDEuMCB9LFxyXG4gICAgICAgICAgIGR1cmF0aW9uOiAxMDAwMFxyXG4gICAgICAgICB9KTtcclxuICAgICAgIH1cclxuIFxyXG4gICAgICAgXHJcbiBcclxuICAgXHJcbiBcclxuICAgICBzZW5kVmVyaWZ5QXV0aCh2ZXJpZnlBdXRoOiBDb29wZXJhdGl2ZVN0YWZmKXtcclxuICAgICAgICAgY29uc29sZS5sb2coXCJWZXJpZnkgXCIrICB2ZXJpZnlBdXRoLnN0YWZmSWQpO1xyXG4gICAgICAgIFxyXG4gXHJcbiAgICAgICAgIHRoaXMuY29vcGVyYXRpdmVTdGFmZlNlcnZpY2UudmVyaWZ5QXV0aFRvQ3JlYXRMYXRlcih2ZXJpZnlBdXRoKS5zdWJzY3JpYmUoXHJcbiAgICAgICAgICAgICBkYXRhID0+IHsgXHJcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJWZXJ5IEF1dGggXCIrIEpTT04uc3RyaW5naWZ5KGRhdGFbXCJkYXRhXCJdKSApO1xyXG4gICAgICAgIFxyXG4gICAgICAgICAgICAgIFxyXG4gXHJcbiAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgIGVyciA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xyXG4gICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgKTtcdCAgXHJcbiAgICAgfVxyXG4gXHJcbiAgICAgbmV4dCgpe1xyXG4gXHJcbiAgICAgICAgIGlmIChnZXRDb25uZWN0aW9uVHlwZSgpID09PSBjb25uZWN0aW9uVHlwZS5ub25lKSB7XHJcbiAgICAgICAgICAgICAvLyBhbGVydChcIkNvb3BlciBTd2l0Y2ggcmVxdWlyZXMgYW4gaW50ZXJuZXQgY29ubmVjdGlvbiB0byBsb2cgaW4uXCIpO1xyXG4gICAgXHJcbiAgICAgICAgICAgICAgVE5TRmFuY3lBbGVydC5zaG93RXJyb3IoXCJFcnJvciFcIiwgXCJDb29wZXIgU3dpdGNoIHJlcXVpcmVzIGFuIGludGVybmV0IGNvbm5lY3Rpb24gdG8gbG9nIGluLlwiLCBcIk9rXCIpO1xyXG4gICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvL3RoaXMubG9hZGluZyA9IHRydWU7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiTG9naW4gUmVhY2hpbmcgXCIgKyB0aGlzLm9wYXNzICsgXCIgUGFzc3dvcmRcIiArIHRoaXMubnBhc3MpO1xyXG4gICAgICAgICAgICB0aGlzLm9wYXNzID0gXCJXZWxjb21lXCI7XHJcbiAgICAgICAgICAgIHRoaXMuYXV0aFNlcnZpY2UucmVzZXRQYXNzd29yZCh0aGlzLnVzZXJJZCx0aGlzLm9wYXNzLHRoaXMubnBhc3MsIHRoaXMuY25wYXNzLHRoaXMudXNlck1vZGUpXHJcbiAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKFxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGEgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgLy90aGlzLmlzQXV0aGVudGljYXRpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJjaGFuZ2UgcGFzc3dvcmQgZGF0YSBcIiArIEpTT04uc3RyaW5naWZ5KGRhdGFbXCJkYXRhXCJdKSApO1xyXG4gICAgICAgICAgICAgICAgICAgICBpZih0aGlzLnVzZXJNb2RlID09IFwiTmV3XCIpXHJcbiAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgIExTLnJlbW92ZUl0ZW0oJ2N1cnJlbnRVc2VyJyk7XHJcbiBcclxuICAgICAgICAgICAgICAgICAgICAgICAgIExTLnNldEl0ZW0oJ2N1cnJlbnRVc2VyJywgSlNPTi5zdHJpbmdpZnkoZGF0YVtcImRhdGFcIl0pKTtcclxuIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZW5kT1RQKHRoaXMudXNlcklkKTtcclxuIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvb3RwJ10pO1xyXG4gICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgZXJyb3IgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3RoaXMuYWxlcnRTZXJ2aWNlLmVycm9yKGVycm9yKTtcclxuICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBUTlNGYW5jeUFsZXJ0LnNob3dFcnJvcihcIkVycm9yIVwiLCBlcnJvci5lcnJvci5tZXNzYWdlLCBcIk9rXCIpO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3IgXCIgKyBKU09OLnN0cmluZ2lmeShlcnJvcikgKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICB0aGlzLmlzQXV0aGVudGljYXRpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gdGhpcy5sb2FkaW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgIFxyXG4gICAgIH1cclxuIFxyXG4gICAgIG5hdmlnYXRlQmFjaygpIHtcclxuICAgICAgICBcclxuICAgICAgICAgdGhpcy5yb3V0ZXJFeHRlbnNpb25zLmJhY2tUb1ByZXZpb3VzUGFnZSgpO1xyXG4gICAgXHJcbiAgICAgfVxyXG4gXHJcbiAgICAgZmFiVGFwKCl7XHJcbiBcclxuICAgICB9XHJcbiBcclxuICAgICBvbkJvdHRvbU5hdmlnYXRpb25UYWJTZWxlY3RlZChhcmdzOiBPblRhYlNlbGVjdGVkRXZlbnREYXRhKTogdm9pZCB7XHJcbiAgICAgICAgIGNvbnNvbGUubG9nKGBUYWIgc2VsZWN0ZWQ6ICAke2FyZ3Mub2xkSW5kZXh9YCk7XHJcbiAgICAgXHJcbiAgICAgICBcclxuICAgICAgICAgaWYoYXJncy5uZXdJbmRleCA9PSAwKVxyXG4gICAgICAgICB7XHJcbiAgICAgICAgICAgLy8gdGhpcy5yb3V0ZXIubmF2aWdhdGUoW1wiXCJdKTtcclxuICAgICAgICAgICAvL3RoaXMubWFpbnRhYi5uYXRpdmVFbGVtZW50LnNlbGVjdGVkSW5kZXggID0gMDtcclxuICAgICAgICAgfVxyXG4gICAgICAgICBlbHNlIGlmKGFyZ3MubmV3SW5kZXggPT0gMSlcclxuICAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbXCIvYXBwcm92ZVwiXSk7XHJcbiAgICAgICAgIH1cclxuICAgICAgICAgZWxzZSBpZihhcmdzLm5ld0luZGV4ID09IDIpXHJcbiAgICAgICAgIHtcclxuICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvLyB0aGlzLm1haW50YWIubmF0aXZlRWxlbWVudC5zZWxlY3RlZEluZGV4ICA9IDE7XHJcbiAgICAgICAgICAgIC8vdGhpcy5yb3V0ZXIubmF2aWdhdGUoW1wiL3Nob3BcIl0pO1xyXG4gICAgICAgICB9XHJcbiAgICAgICAgIGVsc2UgaWYoYXJncy5uZXdJbmRleCA9PSAzKVxyXG4gICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFtcIi9hY2NvdW50XCJdKTtcclxuICAgICAgICAgfVxyXG4gICAgICAgfVxyXG4gXHJcbiBcclxuICAgICAgIFxyXG4gICAgIHNlbmRPVFAodXNlcklkOlN0cmluZyl7XHJcbiAgICAgICAgIGNvbnNvbGUubG9nKFwiRWRpdCBQaG9uZSBOdW1iZXIgXCIrICB1c2VySWQpO1xyXG4gICAgICAgIFxyXG4gXHJcbiAgICAgICAgIHRoaXMuYXV0aFNlcnZpY2Uuc2VuZFRva2VuKHVzZXJJZCkuc3Vic2NyaWJlKFxyXG4gICAgICAgICAgICAgZGF0YSA9PiB7IFxyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiT1RQIFNlbmRcIisgSlNPTi5zdHJpbmdpZnkoZGF0YVtcImRhdGFcIl0pICk7XHJcbiBcclxuICAgICAgICAgICAgICAvL3NlbmQgT1RQXHJcbiAgICAgICAgXHJcbiAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgIGVyciA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xyXG4gICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgKTtcdCAgXHJcbiAgICAgfVxyXG5cclxuICAgIFxyXG59XHJcblxyXG4iXX0=