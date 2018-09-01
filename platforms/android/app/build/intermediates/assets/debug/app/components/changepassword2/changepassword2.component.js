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
var ChangePassword2Component = /** @class */ (function () {
    function ChangePassword2Component(location, cooperativeService, cooperativeStaffService, router, routerExtensions, activatedRoute, authService) {
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
    }
    ChangePassword2Component.prototype.ngAfterViewInit = function () {
    };
    ChangePassword2Component.prototype.ngOnInit = function () {
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
        }
        // this.userId = this.activatedRoute.snapshot.params["userId"];
        // this.userMode = this.activatedRoute.snapshot.params["userMode"];
    };
    ChangePassword2Component.prototype.register = function () {
        // if(this.input.firstname && this.input.lastname && this.input.email && this.input.password) {
        //     ApplicationSettings.setString("account", JSON.stringify(this.input));
        //     this.location.back();
        // } else {
        //     (new SnackBar()).simple("All Fields Required!");
        // }
        console.log("Reaching Register ");
    };
    ChangePassword2Component.prototype.onNavBtnTap = function () {
        // This code will be called only in Android.
        console.log("Navigation button tapped!");
    };
    ChangePassword2Component.prototype.cancel = function () {
    };
    ChangePassword2Component.prototype.goBack = function () {
        this.location.back();
    };
    ChangePassword2Component.prototype.startBackgroundAnimation = function (background) {
        background.animate({
            scale: { x: 1.0, y: 1.0 },
            duration: 10000
        });
    };
    ChangePassword2Component.prototype.sendVerifyAuth = function (verifyAuth) {
        console.log("Verify " + verifyAuth.staffId);
        this.cooperativeStaffService.verifyAuthToCreatLater(verifyAuth).subscribe(function (data) {
            console.log("Very Auth " + JSON.stringify(data["data"]));
        }, function (err) {
            console.log(err);
        });
    };
    ChangePassword2Component.prototype.next = function () {
        var _this = this;
        if (connectivity_1.getConnectionType() === connectivity_1.connectionType.none) {
            // alert("Cooper Switch requires an internet connection to log in.");
            nativescript_fancyalert_1.TNSFancyAlert.showError("Error!", "Cooper Switch requires an internet connection to log in.", "Ok");
            return;
        }
        //this.loading = true;
        console.log("Login Reaching " + this.opass + " Password" + this.npass);
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
    ChangePassword2Component.prototype.navigateBack = function () {
        this.routerExtensions.backToPreviousPage();
    };
    ChangePassword2Component.prototype.fabTap = function () {
    };
    ChangePassword2Component.prototype.onBottomNavigationTabSelected = function (args) {
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
    ChangePassword2Component.prototype.sendOTP = function (userId) {
        console.log("Edit Phone Number " + userId);
        this.authService.sendToken(userId).subscribe(function (data) {
            console.log("OTP Send" + JSON.stringify(data["data"]));
            //send OTP
        }, function (err) {
            console.log(err);
        });
    };
    ChangePassword2Component = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: "ns-changepassword2",
            templateUrl: "changepassword2.component.html",
            styleUrls: ["./changepassword2-common.css", "./changepassword2.component.css"],
        }),
        __metadata("design:paramtypes", [common_1.Location, cooperative_service_1.CooperativeService, cooperativeStaff_service_1.CooperativeStaffService,
            router_1.Router, router_2.RouterExtensions, router_1.ActivatedRoute, auth_service_1.AuthService])
    ], ChangePassword2Component);
    return ChangePassword2Component;
}());
exports.ChangePassword2Component = ChangePassword2Component;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhbmdlcGFzc3dvcmQyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNoYW5nZXBhc3N3b3JkMi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBK0Q7QUFDL0QsMENBQXlEO0FBQ3pELDBDQUEyQztBQUczQyw2Q0FBaUU7QUFVakUsMEVBQXNFO0FBQ3RFLG9GQUFnRjtBQUNoRiw0REFBd0Q7QUFFeEQsbUVBQXdEO0FBR3hELElBQUksRUFBRSxHQUFHLE9BQU8sQ0FBRSwyQkFBMkIsQ0FBRSxDQUFDO0FBRWhELHNEQUErRDtBQVcvRDtJQXNCSSxrQ0FBMkIsUUFBa0IsRUFBVSxrQkFBcUMsRUFBVSx1QkFBK0MsRUFDekksTUFBYyxFQUFTLGdCQUFrQyxFQUFVLGNBQThCLEVBQVUsV0FBdUI7UUFEbkgsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQUFVLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBbUI7UUFBVSw0QkFBdUIsR0FBdkIsdUJBQXVCLENBQXdCO1FBQ3pJLFdBQU0sR0FBTixNQUFNLENBQVE7UUFBUyxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQVUsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBQVUsZ0JBQVcsR0FBWCxXQUFXLENBQVk7UUFqQjlJLGdCQUFXLEdBQXVCLEVBQUUsQ0FBQztRQUNyQyxTQUFJLEdBQVcsb0JBQW9CLENBQUM7UUFFN0IsYUFBUSxHQUFnQixTQUFTLENBQUM7UUFTekMsa0JBQWEsR0FBVyxFQUFFLENBQUM7UUFDM0IsVUFBSyxHQUFZLEtBQUssQ0FBQztJQU12QixDQUFDO0lBRUQsa0RBQWUsR0FBZjtJQUVELENBQUM7SUFFUSwyQ0FBUSxHQUFmO1FBR0csSUFBSSxVQUFVLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7UUFJdkQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLEdBQUcsVUFB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QUFFO1lBQ25CLFFBQVEsRUFBRSxvQkFBb0I7WUFDOUIsV0FBVyxFQUFFLGdDQUFnQztZQUM3QyxTQUFTLEVBQUUsQ0FBQyw4QkFBOEIsRUFBRSxpQ0FBaUMsQ0FBQztTQUNqRixDQUFDO3lDQXdCdUMsaUJBQVEsRUFBNkIsd0NBQWtCLEVBQWtDLGtEQUF1QjtZQUNqSSxlQUFNLEVBQTJCLHlCQUFnQixFQUEwQix1QkFBYyxFQUFzQiwwQkFBVztPQXZCckksd0JBQXdCLENBZ05wQztJQUFELCtCQUFDO0NBQUEsQUFoTkQsSUFnTkM7QUFoTlksNERBQXdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LE9uSW5pdCxBZnRlclZpZXdJbml0IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgUm91dGVyLCBBY3RpdmF0ZWRSb3V0ZSB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcclxuaW1wb3J0IHsgTG9jYXRpb24gfSBmcm9tIFwiQGFuZ3VsYXIvY29tbW9uXCI7XHJcbmltcG9ydCB7IFNuYWNrQmFyIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1zbmFja2JhclwiO1xyXG5pbXBvcnQgKiBhcyBBcHBsaWNhdGlvblNldHRpbmdzIGZyb20gXCJhcHBsaWNhdGlvbi1zZXR0aW5nc1wiO1xyXG5pbXBvcnQgeyBjb25uZWN0aW9uVHlwZSwgZ2V0Q29ubmVjdGlvblR5cGUgfSBmcm9tIFwiY29ubmVjdGl2aXR5XCI7XHJcbmltcG9ydCB7IEFuaW1hdGlvbiB9IGZyb20gXCJ1aS9hbmltYXRpb25cIjtcclxuaW1wb3J0IHsgVmlldyB9IGZyb20gXCJ1aS9jb3JlL3ZpZXdcIjtcclxuaW1wb3J0IHsgcHJvbXB0IH0gZnJvbSBcInVpL2RpYWxvZ3NcIjtcclxuaW1wb3J0IHsgUGFnZSB9IGZyb20gXCJ1aS9wYWdlXCI7XHJcbmltcG9ydCB7IFRleHRGaWVsZCB9IGZyb20gXCJ1aS90ZXh0LWZpZWxkXCI7XHJcblxyXG5pbXBvcnQgeyBWYWx1ZUxpc3QsIERyb3BEb3duIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1kcm9wLWRvd25cIjtcclxuaW1wb3J0IHsgU2VsZWN0ZWRJbmRleENoYW5nZWRFdmVudERhdGEgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWRyb3AtZG93blwiO1xyXG5pbXBvcnQgeyBDb29wZXJhdGl2ZSB9IGZyb20gJy4uLy4uL21vZGVscy9pbmRleCc7XHJcbmltcG9ydCB7Q29vcGVyYXRpdmVTZXJ2aWNlfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvY29vcGVyYXRpdmUuc2VydmljZVwiO1xyXG5pbXBvcnQge0Nvb3BlcmF0aXZlU3RhZmZTZXJ2aWNlfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvY29vcGVyYXRpdmVTdGFmZi5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7QXV0aFNlcnZpY2V9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9hdXRoLnNlcnZpY2VcIjtcclxuXHJcbmltcG9ydCB7IFROU0ZhbmN5QWxlcnQgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWZhbmN5YWxlcnRcIjtcclxuXHJcbmltcG9ydCB7Q29vcGVyYXRpdmVTdGFmZixWZXJpZnlBdXRofSBmcm9tIFwiLi4vLi4vbW9kZWxzL2luZGV4XCI7XHJcbmxldCBMUyA9IHJlcXVpcmUoIFwibmF0aXZlc2NyaXB0LWxvY2Fsc3RvcmFnZVwiICk7XHJcblxyXG5pbXBvcnQgeyBSb3V0ZXJFeHRlbnNpb25zIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlclwiO1xyXG5pbXBvcnQgeyBCb3R0b21OYXZpZ2F0aW9uLCBCb3R0b21OYXZpZ2F0aW9uVGFiLCBPblRhYlNlbGVjdGVkRXZlbnREYXRhIH0gZnJvbSAnbmF0aXZlc2NyaXB0LWJvdHRvbS1uYXZpZ2F0aW9uJztcclxuXHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXHJcbiAgICBzZWxlY3RvcjogXCJucy1jaGFuZ2VwYXNzd29yZDJcIixcclxuICAgIHRlbXBsYXRlVXJsOiBcImNoYW5nZXBhc3N3b3JkMi5jb21wb25lbnQuaHRtbFwiLFxyXG4gICAgc3R5bGVVcmxzOiBbXCIuL2NoYW5nZXBhc3N3b3JkMi1jb21tb24uY3NzXCIsIFwiLi9jaGFuZ2VwYXNzd29yZDIuY29tcG9uZW50LmNzc1wiXSxcclxufSlcclxuXHJcbmV4cG9ydCBjbGFzcyBDaGFuZ2VQYXNzd29yZDJDb21wb25lbnQge1xyXG5cclxuICAgIHB1YmxpYyBpbnB1dDogYW55O1xyXG4gICAgc2VsZWN0ZWRDb29wZXJhdGl2ZUluZGV4OiBudW1iZXIgO1xyXG4gICAgc2VsZWN0ZWRDb29wZXJhdGl2ZSA6IHN0cmluZztcclxuICAgIHN0YWZmSWQ6IFN0cmluZztcclxuICAgIGNvb3BlcmF0aXZlOiBBcnJheTxDb29wZXJhdGl2ZT4gPSBbXTtcclxuICAgIGhpbnQ6IHN0cmluZyA9IFwiU2VsZWN0IENvb3BlcmF0aXZlXCI7XHJcbiAgICBwdWJsaWMgY29vcGVyYXRpdmVMaXN0OiBWYWx1ZUxpc3Q8c3RyaW5nPjtcclxuICAgIHB1YmxpYyBjc3NDbGFzczogc3RyaW5nICAgICAgPSBcImRlZmF1bHRcIjtcclxuICAgIGNvb3BlcmF0aXZlU3RhZmY6IENvb3BlcmF0aXZlU3RhZmY7XHJcbiAgICB2ZXJpZnlBdXRoOiBWZXJpZnlBdXRoO1xyXG4gICAgb3Bhc3M6IFN0cmluZztcclxuICAgIG5wYXNzOiBTdHJpbmc7XHJcbiAgICB1c2VySWQ6IFN0cmluZztcclxuICAgIHVzZXJNb2RlOiBTdHJpbmc7XHJcbiAgICBjbnBhc3M6IFN0cmluZztcclxuICAgIG9sZHBhc3N3b3JkaGludDogU3RyaW5nO1xyXG4gICAgUGFzc3dvcmRMYWJlbDogU3RyaW5nID0gXCJcIjtcclxuICAgIGlzTmV3OiBib29sZWFuID0gZmFsc2U7XHJcbiAgIFxyXG5cclxuICAgIHB1YmxpYyBjb25zdHJ1Y3Rvcihwcml2YXRlIGxvY2F0aW9uOiBMb2NhdGlvbiwgcHJpdmF0ZSBjb29wZXJhdGl2ZVNlcnZpY2U6Q29vcGVyYXRpdmVTZXJ2aWNlLCBwcml2YXRlIGNvb3BlcmF0aXZlU3RhZmZTZXJ2aWNlOkNvb3BlcmF0aXZlU3RhZmZTZXJ2aWNlLFxyXG4gICAgICAgIHByaXZhdGUgcm91dGVyOiBSb3V0ZXIscHJpdmF0ZSByb3V0ZXJFeHRlbnNpb25zOiBSb3V0ZXJFeHRlbnNpb25zLCBwcml2YXRlIGFjdGl2YXRlZFJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSwgcHJpdmF0ZSBhdXRoU2VydmljZTpBdXRoU2VydmljZSkge1xyXG4gICAgIFxyXG4gICAgfVxyXG5cclxuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcclxuICAgICAgICBcclxuICAgfVxyXG4gICBcclxuICAgICBwdWJsaWMgbmdPbkluaXQoKSB7XHJcblxyXG5cclxuICAgICAgICB2YXIgZGF0YU9iamVjdCA9IEpTT04ucGFyc2UoTFMuZ2V0SXRlbSgnY3VycmVudFVzZXInKSk7XHJcblxyXG4gICAgICAgXHJcblxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiVXNlciBJRCBcIiArIGRhdGFPYmplY3QuX2lkKTtcclxuICAgICAgICAgIGlmKGRhdGFPYmplY3QuX2lkKVxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICAgIHRoaXMudXNlcklkID0gZGF0YU9iamVjdC5faWQ7XHJcbiAgICAgICAgICAgICAgdGhpcy51c2VyTW9kZSA9IGRhdGFPYmplY3QudXNlck1vZGU7XHJcbiAgICAgICAgICAgICAgaWYoZGF0YU9iamVjdC51c2VyTW9kZSA9PSBcIk5ld1wiKVxyXG4gICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgdGhpcy5vbGRwYXNzd29yZGhpbnQgPSBcIlRlbXBvcmFyeSBQYXNzd29yZFwiO1xyXG4gICAgICAgICAgICAgICAgICB0aGlzLlBhc3N3b3JkTGFiZWwgPSBcIlNldCBQYXNzd29yZFwiO1xyXG4gICAgICAgICAgICAgICAgICB0aGlzLmlzTmV3ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIHRoaXMub2xkcGFzc3dvcmRoaW50ID0gXCJPbGQgUGFzc3dvcmRcIjtcclxuICAgICAgICAgICAgICAgIHRoaXMuUGFzc3dvcmRMYWJlbCA9IFwiQ2hhbmdlIFBhc3N3b3JkXCI7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmlzTmV3ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgXHJcbiAgICAgICAgLy8gdGhpcy51c2VySWQgPSB0aGlzLmFjdGl2YXRlZFJvdXRlLnNuYXBzaG90LnBhcmFtc1tcInVzZXJJZFwiXTtcclxuICAgICAgICAvLyB0aGlzLnVzZXJNb2RlID0gdGhpcy5hY3RpdmF0ZWRSb3V0ZS5zbmFwc2hvdC5wYXJhbXNbXCJ1c2VyTW9kZVwiXTtcclxuICAgICB9XHJcbiAgICBwdWJsaWMgcmVnaXN0ZXIoKSB7XHJcbiAgICAgICAgLy8gaWYodGhpcy5pbnB1dC5maXJzdG5hbWUgJiYgdGhpcy5pbnB1dC5sYXN0bmFtZSAmJiB0aGlzLmlucHV0LmVtYWlsICYmIHRoaXMuaW5wdXQucGFzc3dvcmQpIHtcclxuICAgICAgICAvLyAgICAgQXBwbGljYXRpb25TZXR0aW5ncy5zZXRTdHJpbmcoXCJhY2NvdW50XCIsIEpTT04uc3RyaW5naWZ5KHRoaXMuaW5wdXQpKTtcclxuICAgICAgICAvLyAgICAgdGhpcy5sb2NhdGlvbi5iYWNrKCk7XHJcbiAgICAgICAgLy8gfSBlbHNlIHtcclxuICAgICAgICAvLyAgICAgKG5ldyBTbmFja0JhcigpKS5zaW1wbGUoXCJBbGwgRmllbGRzIFJlcXVpcmVkIVwiKTtcclxuICAgICAgICAvLyB9XHJcblxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiUmVhY2hpbmcgUmVnaXN0ZXIgXCIgKTtcclxuXHJcbiAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBvbk5hdkJ0blRhcCgpe1xyXG4gICAgICAgIC8vIFRoaXMgY29kZSB3aWxsIGJlIGNhbGxlZCBvbmx5IGluIEFuZHJvaWQuXHJcbiAgICAgICAgY29uc29sZS5sb2coXCJOYXZpZ2F0aW9uIGJ1dHRvbiB0YXBwZWQhXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIGNhbmNlbCgpe1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ29CYWNrKCkge1xyXG4gICAgICAgIHRoaXMubG9jYXRpb24uYmFjaygpO1xyXG4gICAgfVxyXG4gICAgc3RhcnRCYWNrZ3JvdW5kQW5pbWF0aW9uKGJhY2tncm91bmQpIHtcclxuICAgICAgICBiYWNrZ3JvdW5kLmFuaW1hdGUoe1xyXG4gICAgICAgICAgc2NhbGU6IHsgeDogMS4wLCB5OiAxLjAgfSxcclxuICAgICAgICAgIGR1cmF0aW9uOiAxMDAwMFxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBcclxuXHJcbiAgXHJcblxyXG4gICAgc2VuZFZlcmlmeUF1dGgodmVyaWZ5QXV0aDogQ29vcGVyYXRpdmVTdGFmZil7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJWZXJpZnkgXCIrICB2ZXJpZnlBdXRoLnN0YWZmSWQpO1xyXG4gICAgICAgXHJcblxyXG4gICAgICAgIHRoaXMuY29vcGVyYXRpdmVTdGFmZlNlcnZpY2UudmVyaWZ5QXV0aFRvQ3JlYXRMYXRlcih2ZXJpZnlBdXRoKS5zdWJzY3JpYmUoXHJcbiAgICAgICAgICAgIGRhdGEgPT4geyBcclxuICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiVmVyeSBBdXRoIFwiKyBKU09OLnN0cmluZ2lmeShkYXRhW1wiZGF0YVwiXSkgKTtcclxuICAgICAgIFxyXG4gICAgICAgICAgICAgXHJcblxyXG4gICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgZXJyID0+IHtcclxuICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcclxuICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICk7XHQgIFxyXG4gICAgfVxyXG5cclxuICAgIG5leHQoKXtcclxuXHJcbiAgICAgICAgaWYgKGdldENvbm5lY3Rpb25UeXBlKCkgPT09IGNvbm5lY3Rpb25UeXBlLm5vbmUpIHtcclxuICAgICAgICAgICAgLy8gYWxlcnQoXCJDb29wZXIgU3dpdGNoIHJlcXVpcmVzIGFuIGludGVybmV0IGNvbm5lY3Rpb24gdG8gbG9nIGluLlwiKTtcclxuICAgXHJcbiAgICAgICAgICAgICBUTlNGYW5jeUFsZXJ0LnNob3dFcnJvcihcIkVycm9yIVwiLCBcIkNvb3BlciBTd2l0Y2ggcmVxdWlyZXMgYW4gaW50ZXJuZXQgY29ubmVjdGlvbiB0byBsb2cgaW4uXCIsIFwiT2tcIik7XHJcbiAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgfVxyXG4gICAgICAgICAgIC8vdGhpcy5sb2FkaW5nID0gdHJ1ZTtcclxuICAgICAgICAgICBjb25zb2xlLmxvZyhcIkxvZ2luIFJlYWNoaW5nIFwiICsgdGhpcy5vcGFzcyArIFwiIFBhc3N3b3JkXCIgKyB0aGlzLm5wYXNzKTtcclxuICAgICAgICAgICB0aGlzLmF1dGhTZXJ2aWNlLnJlc2V0UGFzc3dvcmQodGhpcy51c2VySWQsdGhpcy5vcGFzcyx0aGlzLm5wYXNzLCB0aGlzLmNucGFzcyx0aGlzLnVzZXJNb2RlKVxyXG4gICAgICAgICAgICAgICAuc3Vic2NyaWJlKFxyXG4gICAgICAgICAgICAgICAgICAgZGF0YSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgIC8vdGhpcy5pc0F1dGhlbnRpY2F0aW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJjaGFuZ2UgcGFzc3dvcmQgZGF0YSBcIiArIEpTT04uc3RyaW5naWZ5KGRhdGFbXCJkYXRhXCJdKSApO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHRoaXMudXNlck1vZGUgPT0gXCJOZXdcIilcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIExTLnJlbW92ZUl0ZW0oJ2N1cnJlbnRVc2VyJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBMUy5zZXRJdGVtKCdjdXJyZW50VXNlcicsIEpTT04uc3RyaW5naWZ5KGRhdGFbXCJkYXRhXCJdKSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbmRPVFAodGhpcy51c2VySWQpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvb3RwJ10pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICBlcnJvciA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgLy90aGlzLmFsZXJ0U2VydmljZS5lcnJvcihlcnJvcik7XHJcbiAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgIFROU0ZhbmN5QWxlcnQuc2hvd0Vycm9yKFwiRXJyb3IhXCIsIGVycm9yLmVycm9yLm1lc3NhZ2UsIFwiT2tcIik7XHJcbiAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3IgXCIgKyBKU09OLnN0cmluZ2lmeShlcnJvcikgKTtcclxuICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAvLyAgdGhpcy5pc0F1dGhlbnRpY2F0aW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgLy8gdGhpcy5sb2FkaW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBuYXZpZ2F0ZUJhY2soKSB7XHJcbiAgICAgICBcclxuICAgICAgICB0aGlzLnJvdXRlckV4dGVuc2lvbnMuYmFja1RvUHJldmlvdXNQYWdlKCk7XHJcbiAgIFxyXG4gICAgfVxyXG5cclxuICAgIGZhYlRhcCgpe1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBvbkJvdHRvbU5hdmlnYXRpb25UYWJTZWxlY3RlZChhcmdzOiBPblRhYlNlbGVjdGVkRXZlbnREYXRhKTogdm9pZCB7XHJcbiAgICAgICAgY29uc29sZS5sb2coYFRhYiBzZWxlY3RlZDogICR7YXJncy5vbGRJbmRleH1gKTtcclxuICAgIFxyXG4gICAgICBcclxuICAgICAgICBpZihhcmdzLm5ld0luZGV4ID09IDApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgLy8gdGhpcy5yb3V0ZXIubmF2aWdhdGUoW1wiXCJdKTtcclxuICAgICAgICAgIC8vdGhpcy5tYWludGFiLm5hdGl2ZUVsZW1lbnQuc2VsZWN0ZWRJbmRleCAgPSAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmKGFyZ3MubmV3SW5kZXggPT0gMSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW1wiL2FwcHJvdmVcIl0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmKGFyZ3MubmV3SW5kZXggPT0gMilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgIC8vIHRoaXMubWFpbnRhYi5uYXRpdmVFbGVtZW50LnNlbGVjdGVkSW5kZXggID0gMTtcclxuICAgICAgICAgICAvL3RoaXMucm91dGVyLm5hdmlnYXRlKFtcIi9zaG9wXCJdKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZihhcmdzLm5ld0luZGV4ID09IDMpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFtcIi9hY2NvdW50XCJdKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcblxyXG4gICAgICBcclxuICAgIHNlbmRPVFAodXNlcklkOlN0cmluZyl7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJFZGl0IFBob25lIE51bWJlciBcIisgIHVzZXJJZCk7XHJcbiAgICAgICBcclxuXHJcbiAgICAgICAgdGhpcy5hdXRoU2VydmljZS5zZW5kVG9rZW4odXNlcklkKS5zdWJzY3JpYmUoXHJcbiAgICAgICAgICAgIGRhdGEgPT4geyBcclxuICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiT1RQIFNlbmRcIisgSlNPTi5zdHJpbmdpZnkoZGF0YVtcImRhdGFcIl0pICk7XHJcblxyXG4gICAgICAgICAgICAgLy9zZW5kIE9UUFxyXG4gICAgICAgXHJcbiAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICBlcnIgPT4ge1xyXG4gICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xyXG4gICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgKTtcdCAgXHJcbiAgICB9XHJcbiAgICAgIFxyXG5cclxufSJdfQ==