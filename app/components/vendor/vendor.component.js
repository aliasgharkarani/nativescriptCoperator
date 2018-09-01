"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var common_1 = require("@angular/common");
var page_1 = require("ui/page");
var nativescript_drop_down_1 = require("nativescript-drop-down");
var cooperative_service_1 = require("../../services/cooperative.service");
var cooperativeStaff_service_1 = require("../../services/cooperativeStaff.service");
var member_service_1 = require("../../services/member.service");
var nativescript_fancyalert_1 = require("nativescript-fancyalert");
var router_2 = require("nativescript-angular/router");
var VendorRegisterComponent = /** @class */ (function () {
    function VendorRegisterComponent(location, cooperativeService, cooperativeStaffService, memberService, route, router, _page, routerExtensions) {
        this.location = location;
        this.cooperativeService = cooperativeService;
        this.cooperativeStaffService = cooperativeStaffService;
        this.memberService = memberService;
        this.route = route;
        this.router = router;
        this._page = _page;
        this.routerExtensions = routerExtensions;
        this.cooperative = [];
        this.hint = "Select Cooperative";
        this.cssClass = "default";
    }
    VendorRegisterComponent.prototype.ngAfterViewInit = function () {
        this.getCooperative();
    };
    VendorRegisterComponent.prototype.ngOnInit = function () {
        //this._page.actionBarHidden = true;
    };
    VendorRegisterComponent.prototype.register = function () {
        // if(this.input.firstname && this.input.lastname && this.input.email && this.input.password) {
        //     ApplicationSettings.setString("account", JSON.stringify(this.input));
        //     this.location.back();
        // } else {
        //     (new SnackBar()).simple("All Fields Required!");
        // }
        console.log("Reaching Register ");
        this.getCooperativeStaff(this.staffId, this.selectedCooperative, "", "cooperator");
    };
    VendorRegisterComponent.prototype.registerVendor = function () {
        // if(this.input.firstname && this.input.lastname && this.input.email && this.input.password) {
        //     ApplicationSettings.setString("account", JSON.stringify(this.input));
        //     this.location.back();
        // } else {
        //     (new SnackBar()).simple("All Fields Required!");
        // }
        console.log("Reaching Register Vendor ");
        this.getCooperativeStaff(this.businessEmail, "0", this.businessName, "vendor");
    };
    VendorRegisterComponent.prototype.onNavBtnTap = function () {
        // This code will be called only in Android.
        console.log("Navigation button tapped!");
    };
    VendorRegisterComponent.prototype.goBack = function () {
        this.location.back();
    };
    // tabLoaded(event) {
    //     this._bar = <BottomBar>event.object;
    //     this.hidden = false;
    //     this.titleState = TITLE_STATE.SHOW_WHEN_ACTIVE;
    //     this.inactiveColor = "white";
    //     this.accentColor = "blue";
    // }
    //  tabSelected(args: SelectedIndexChangedEventData) {
    //      // only triggered when a different tab is tapped
    //      console.log(args.newIndex);
    //  }
    VendorRegisterComponent.prototype.startBackgroundAnimation = function (background) {
        background.animate({
            scale: { x: 1.0, y: 1.0 },
            duration: 10000
        });
    };
    VendorRegisterComponent.prototype.oncooperativechange = function (args) {
        // console.log(`Drop Down selected index changed  ${args.oldIndex} to ${args.newIndex}. New value is "${this.sessionitems.getValue(
        //     args.newIndex)}"`);
        console.log("Selected ID " + args.newIndex);
        this.selectedCooperative = this.cooperativeList.getValue(args.newIndex);
        console.log("Selected Id Value  " + this.selectedCooperative);
    };
    VendorRegisterComponent.prototype.getCooperative = function () {
        var _this = this;
        this.cooperativeService.getAllCooperative().subscribe(function (data) {
            console.log("Cooperative List " + JSON.stringify(data["data"]));
            _this.cooperative = data["data"];
            _this.cooperativeList = new nativescript_drop_down_1.ValueList();
            for (var loop = 0; loop < _this.cooperative.length; loop++) {
                _this.cooperativeList.push({ value: "" + _this.cooperative[loop].cooperativeId,
                    display: "" + _this.cooperative[loop].first_name,
                });
            }
        }, function (err) {
            console.log(err);
        });
    };
    VendorRegisterComponent.prototype.getCooperativeStaff = function (staffId, cooperativeId, name, userType) {
        var _this = this;
        console.log("Staff and CooperativeId " + staffId + " - " + cooperativeId);
        this.memberService.getCooperativeStaff(staffId, cooperativeId, "New", name, userType).subscribe(function (data) {
            console.log("Cooperative Staff " + JSON.stringify(data["data"]));
            _this.cooperativeStaff = data["data"];
            nativescript_fancyalert_1.TNSFancyAlert.showSuccess("Success!", "Check your email for temporary password", "Ok")
                .then(function () {
                _this.router.navigate(['/login']);
                console.log("Redirect to Change Password");
            });
            console.log("Verifying Staff out side " + _this.cooperativeStaff._id);
            //  this.sendVerifyAuth(this.cooperativeStaff);
        }, function (err) {
            console.log(JSON.stringify(err));
            nativescript_fancyalert_1.TNSFancyAlert.showError("Error!", err.error.message, "Ok").then(function () {
                console.log("Redirect to Change Password");
            });
        });
    };
    VendorRegisterComponent.prototype.sendVerifyAuth = function (verifyAuth) {
        console.log("Verify " + verifyAuth.staffId);
        this.cooperativeStaffService.verifyAuthToCreatLater(verifyAuth).subscribe(function (data) {
            console.log("Very Auth " + JSON.stringify(data["data"]));
        }, function (err) {
            console.log(err);
        });
    };
    VendorRegisterComponent.prototype.showSuccess = function () {
        nativescript_fancyalert_1.TNSFancyAlert.showSuccess("Success!", "Something finished successfully.", "Ok");
    };
    VendorRegisterComponent.prototype.showError = function () {
        nativescript_fancyalert_1.TNSFancyAlert.showError("Error!", "Oh no, something went wrong.", "Dismiss");
    };
    VendorRegisterComponent.prototype.showCustomImage = function () {
        nativescript_fancyalert_1.TNSFancyAlert.showAnimationType = nativescript_fancyalert_1.TNSFancyAlert.SHOW_ANIMATION_TYPES.SlideInFromBottom;
        nativescript_fancyalert_1.TNSFancyAlert.hideAnimationType = nativescript_fancyalert_1.TNSFancyAlert.HIDE_ANIMATION_TYPES.SlideOutToTop;
        nativescript_fancyalert_1.TNSFancyAlert.showCustomImage("polyglot_developer.png", "#911E25", "Custom Image", "Use your own images in an alert!", "Dismiss");
    };
    VendorRegisterComponent.prototype.navigateBack = function () {
        console.log("Go Back Button Clicked");
        this.routerExtensions.backToPreviousPage();
        //this.router.navigate(["/"]);
    };
    VendorRegisterComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: "ns-vendor",
            templateUrl: "vendor.component.html",
            styleUrls: ["./vendor-common.css", "./vendor.component.css"],
        }),
        __metadata("design:paramtypes", [common_1.Location, cooperative_service_1.CooperativeService, cooperativeStaff_service_1.CooperativeStaffService,
            member_service_1.MemberService, router_1.ActivatedRoute, router_1.Router, page_1.Page,
            router_2.RouterExtensions])
    ], VendorRegisterComponent);
    return VendorRegisterComponent;
}());
exports.VendorRegisterComponent = VendorRegisterComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmVuZG9yLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInZlbmRvci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBK0Q7QUFDL0QsMENBQXlEO0FBQ3pELDBDQUEyQztBQU8zQyxnQ0FBK0I7QUFHL0IsaUVBQTZEO0FBRzdELDBFQUFzRTtBQUN0RSxvRkFBZ0Y7QUFFaEYsZ0VBQTREO0FBSTVELG1FQUF3RDtBQUN4RCxzREFBK0Q7QUFTL0Q7SUFvQkksaUNBQTJCLFFBQWtCLEVBQVUsa0JBQXFDLEVBQVUsdUJBQStDLEVBQ3pJLGFBQTRCLEVBQVUsS0FBcUIsRUFBVSxNQUFjLEVBQVUsS0FBVyxFQUN4RyxnQkFBa0M7UUFGbkIsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQUFVLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBbUI7UUFBVSw0QkFBdUIsR0FBdkIsdUJBQXVCLENBQXdCO1FBQ3pJLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBQVUsVUFBSyxHQUFMLEtBQUssQ0FBZ0I7UUFBVSxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQVUsVUFBSyxHQUFMLEtBQUssQ0FBTTtRQUN4RyxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBZDlDLGdCQUFXLEdBQXVCLEVBQUUsQ0FBQztRQUNyQyxTQUFJLEdBQVcsb0JBQW9CLENBQUM7UUFFN0IsYUFBUSxHQUFnQixTQUFTLENBQUM7SUFhekMsQ0FBQztJQUVELGlEQUFlLEdBQWY7UUFDSSxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7SUFDM0IsQ0FBQztJQUVRLDBDQUFRLEdBQWY7UUFDSSxvQ0FBb0M7SUFDeEMsQ0FBQztJQUNLLDBDQUFRLEdBQWY7UUFDSSwrRkFBK0Y7UUFDL0YsNEVBQTRFO1FBQzVFLDRCQUE0QjtRQUM1QixXQUFXO1FBQ1gsdURBQXVEO1FBQ3ZELElBQUk7UUFFSixPQUFPLENBQUMsR0FBRyxDQUFDLG9CQUFvQixDQUFFLENBQUM7UUFFbkMs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QztJQWhNUSx1QkFBdUI7UUFQbkMsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixRQUFRLEVBQUUsV0FBVztZQUNyQixXQUFXLEVBQUUsdUJBQXVCO1lBQ3BDLFNBQVMsRUFBRSxDQUFDLHFCQUFxQixFQUFFLHdCQUF3QixDQUFDO1NBQy9ELENBQUM7eUNBc0J1QyxpQkFBUSxFQUE2Qix3Q0FBa0IsRUFBa0Msa0RBQXVCO1lBQzFILDhCQUFhLEVBQWlCLHVCQUFjLEVBQWtCLGVBQU0sRUFBaUIsV0FBSTtZQUN0Rix5QkFBZ0I7T0F0QnJDLHVCQUF1QixDQW1NbkM7SUFBRCw4QkFBQztDQUFBLEFBbk1ELElBbU1DO0FBbk1ZLDBEQUF1QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCxPbkluaXQsQWZ0ZXJWaWV3SW5pdCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IFJvdXRlciwgQWN0aXZhdGVkUm91dGUgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XHJcbmltcG9ydCB7IExvY2F0aW9uIH0gZnJvbSBcIkBhbmd1bGFyL2NvbW1vblwiO1xyXG5pbXBvcnQgeyBTbmFja0JhciB9IGZyb20gXCJuYXRpdmVzY3JpcHQtc25hY2tiYXJcIjtcclxuaW1wb3J0ICogYXMgQXBwbGljYXRpb25TZXR0aW5ncyBmcm9tIFwiYXBwbGljYXRpb24tc2V0dGluZ3NcIjtcclxuaW1wb3J0IHsgY29ubmVjdGlvblR5cGUsIGdldENvbm5lY3Rpb25UeXBlIH0gZnJvbSBcImNvbm5lY3Rpdml0eVwiO1xyXG5pbXBvcnQgeyBBbmltYXRpb24gfSBmcm9tIFwidWkvYW5pbWF0aW9uXCI7XHJcbmltcG9ydCB7IFZpZXcgfSBmcm9tIFwidWkvY29yZS92aWV3XCI7XHJcbmltcG9ydCB7IHByb21wdCB9IGZyb20gXCJ1aS9kaWFsb2dzXCI7XHJcbmltcG9ydCB7IFBhZ2UgfSBmcm9tIFwidWkvcGFnZVwiO1xyXG5pbXBvcnQgeyBUZXh0RmllbGQgfSBmcm9tIFwidWkvdGV4dC1maWVsZFwiO1xyXG5cclxuaW1wb3J0IHsgVmFsdWVMaXN0LCBEcm9wRG93biB9IGZyb20gXCJuYXRpdmVzY3JpcHQtZHJvcC1kb3duXCI7XHJcbmltcG9ydCB7IFNlbGVjdGVkSW5kZXhDaGFuZ2VkRXZlbnREYXRhIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1kcm9wLWRvd25cIjtcclxuaW1wb3J0IHsgQ29vcGVyYXRpdmUsIFVzZXIgfSBmcm9tICcuLi8uLi9tb2RlbHMvaW5kZXgnO1xyXG5pbXBvcnQge0Nvb3BlcmF0aXZlU2VydmljZX0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL2Nvb3BlcmF0aXZlLnNlcnZpY2VcIjtcclxuaW1wb3J0IHtDb29wZXJhdGl2ZVN0YWZmU2VydmljZX0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL2Nvb3BlcmF0aXZlU3RhZmYuc2VydmljZVwiO1xyXG5cclxuaW1wb3J0IHtNZW1iZXJTZXJ2aWNlfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvbWVtYmVyLnNlcnZpY2VcIjtcclxuXHJcbmltcG9ydCB7Q29vcGVyYXRpdmVTdGFmZixWZXJpZnlBdXRofSBmcm9tIFwiLi4vLi4vbW9kZWxzL2luZGV4XCI7XHJcblxyXG5pbXBvcnQgeyBUTlNGYW5jeUFsZXJ0IH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1mYW5jeWFsZXJ0XCI7XHJcbmltcG9ydCB7IFJvdXRlckV4dGVuc2lvbnMgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyXCI7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXHJcbiAgICBzZWxlY3RvcjogXCJucy12ZW5kb3JcIixcclxuICAgIHRlbXBsYXRlVXJsOiBcInZlbmRvci5jb21wb25lbnQuaHRtbFwiLFxyXG4gICAgc3R5bGVVcmxzOiBbXCIuL3ZlbmRvci1jb21tb24uY3NzXCIsIFwiLi92ZW5kb3IuY29tcG9uZW50LmNzc1wiXSxcclxufSlcclxuXHJcbmV4cG9ydCBjbGFzcyBWZW5kb3JSZWdpc3RlckNvbXBvbmVudCB7XHJcblxyXG4gICAgcHVibGljIGlucHV0OiBhbnk7XHJcbiAgICBzZWxlY3RlZENvb3BlcmF0aXZlSW5kZXg6IG51bWJlciA7XHJcbiAgICBzZWxlY3RlZENvb3BlcmF0aXZlIDogc3RyaW5nO1xyXG4gICAgc3RhZmZJZDogU3RyaW5nO1xyXG4gICAgYnVzaW5lc3NOYW1lOiBTdHJpbmc7XHJcbiAgICBidXNpbmVzc0VtYWlsOiBTdHJpbmc7XHJcbiAgICBjb29wZXJhdGl2ZTogQXJyYXk8Q29vcGVyYXRpdmU+ID0gW107XHJcbiAgICBoaW50OiBzdHJpbmcgPSBcIlNlbGVjdCBDb29wZXJhdGl2ZVwiO1xyXG4gICAgcHVibGljIGNvb3BlcmF0aXZlTGlzdDogVmFsdWVMaXN0PHN0cmluZz47XHJcbiAgICBwdWJsaWMgY3NzQ2xhc3M6IHN0cmluZyAgICAgID0gXCJkZWZhdWx0XCI7XHJcbiAgICBjb29wZXJhdGl2ZVN0YWZmOiBVc2VyO1xyXG4gICAgdmVyaWZ5QXV0aDogVmVyaWZ5QXV0aDtcclxuICAgIHB1YmxpYyBoaWRkZW46IGJvb2xlYW47XHJcbiAgICAvLyBwdWJsaWMgdGl0bGVTdGF0ZTogVElUTEVfU1RBVEU7XHJcbiAgICAvLyBwdWJsaWMgX2JhcjogQm90dG9tQmFyO1xyXG4gICAgcHVibGljIGluYWN0aXZlQ29sb3I6IHN0cmluZztcclxuICAgIHB1YmxpYyBhY2NlbnRDb2xvcjogc3RyaW5nO1xyXG5cclxuICAgIHB1YmxpYyBjb25zdHJ1Y3Rvcihwcml2YXRlIGxvY2F0aW9uOiBMb2NhdGlvbiwgcHJpdmF0ZSBjb29wZXJhdGl2ZVNlcnZpY2U6Q29vcGVyYXRpdmVTZXJ2aWNlLCBwcml2YXRlIGNvb3BlcmF0aXZlU3RhZmZTZXJ2aWNlOkNvb3BlcmF0aXZlU3RhZmZTZXJ2aWNlLFxyXG4gICAgICAgIHByaXZhdGUgbWVtYmVyU2VydmljZTogTWVtYmVyU2VydmljZSwgcHJpdmF0ZSByb3V0ZTogQWN0aXZhdGVkUm91dGUsIHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsIHByaXZhdGUgX3BhZ2U6IFBhZ2UsXHJcbiAgICAgICAgcHJpdmF0ZSByb3V0ZXJFeHRlbnNpb25zOiBSb3V0ZXJFeHRlbnNpb25zKSB7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgbmdBZnRlclZpZXdJbml0KCkge1xyXG4gICAgICAgIHRoaXMuZ2V0Q29vcGVyYXRpdmUoKTtcclxuICAgfVxyXG4gICBcclxuICAgICBwdWJsaWMgbmdPbkluaXQoKSB7XHJcbiAgICAgICAgIC8vdGhpcy5fcGFnZS5hY3Rpb25CYXJIaWRkZW4gPSB0cnVlO1xyXG4gICAgIH1cclxuICAgIHB1YmxpYyByZWdpc3RlcigpIHtcclxuICAgICAgICAvLyBpZih0aGlzLmlucHV0LmZpcnN0bmFtZSAmJiB0aGlzLmlucHV0Lmxhc3RuYW1lICYmIHRoaXMuaW5wdXQuZW1haWwgJiYgdGhpcy5pbnB1dC5wYXNzd29yZCkge1xyXG4gICAgICAgIC8vICAgICBBcHBsaWNhdGlvblNldHRpbmdzLnNldFN0cmluZyhcImFjY291bnRcIiwgSlNPTi5zdHJpbmdpZnkodGhpcy5pbnB1dCkpO1xyXG4gICAgICAgIC8vICAgICB0aGlzLmxvY2F0aW9uLmJhY2soKTtcclxuICAgICAgICAvLyB9IGVsc2Uge1xyXG4gICAgICAgIC8vICAgICAobmV3IFNuYWNrQmFyKCkpLnNpbXBsZShcIkFsbCBGaWVsZHMgUmVxdWlyZWQhXCIpO1xyXG4gICAgICAgIC8vIH1cclxuXHJcbiAgICAgICAgY29uc29sZS5sb2coXCJSZWFjaGluZyBSZWdpc3RlciBcIiApO1xyXG5cclxuICAgICAgICB0aGlzLmdldENvb3BlcmF0aXZlU3RhZmYodGhpcy5zdGFmZklkLHRoaXMuc2VsZWN0ZWRDb29wZXJhdGl2ZSxcIlwiLFwiY29vcGVyYXRvclwiKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVnaXN0ZXJWZW5kb3IoKSB7XHJcbiAgICAgICAgLy8gaWYodGhpcy5pbnB1dC5maXJzdG5hbWUgJiYgdGhpcy5pbnB1dC5sYXN0bmFtZSAmJiB0aGlzLmlucHV0LmVtYWlsICYmIHRoaXMuaW5wdXQucGFzc3dvcmQpIHtcclxuICAgICAgICAvLyAgICAgQXBwbGljYXRpb25TZXR0aW5ncy5zZXRTdHJpbmcoXCJhY2NvdW50XCIsIEpTT04uc3RyaW5naWZ5KHRoaXMuaW5wdXQpKTtcclxuICAgICAgICAvLyAgICAgdGhpcy5sb2NhdGlvbi5iYWNrKCk7XHJcbiAgICAgICAgLy8gfSBlbHNlIHtcclxuICAgICAgICAvLyAgICAgKG5ldyBTbmFja0JhcigpKS5zaW1wbGUoXCJBbGwgRmllbGRzIFJlcXVpcmVkIVwiKTtcclxuICAgICAgICAvLyB9XHJcblxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiUmVhY2hpbmcgUmVnaXN0ZXIgVmVuZG9yIFwiICk7XHJcblxyXG4gICAgICAgIHRoaXMuZ2V0Q29vcGVyYXRpdmVTdGFmZih0aGlzLmJ1c2luZXNzRW1haWwsXCIwXCIsdGhpcy5idXNpbmVzc05hbWUsXCJ2ZW5kb3JcIik7XHJcbiAgICB9XHJcblxyXG4gICAgb25OYXZCdG5UYXAoKXtcclxuICAgICAgICAvLyBUaGlzIGNvZGUgd2lsbCBiZSBjYWxsZWQgb25seSBpbiBBbmRyb2lkLlxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiTmF2aWdhdGlvbiBidXR0b24gdGFwcGVkIVwiKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ29CYWNrKCkge1xyXG4gICAgICAgIHRoaXMubG9jYXRpb24uYmFjaygpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIHRhYkxvYWRlZChldmVudCkge1xyXG4vLyAgICAgdGhpcy5fYmFyID0gPEJvdHRvbUJhcj5ldmVudC5vYmplY3Q7XHJcbi8vICAgICB0aGlzLmhpZGRlbiA9IGZhbHNlO1xyXG4vLyAgICAgdGhpcy50aXRsZVN0YXRlID0gVElUTEVfU1RBVEUuU0hPV19XSEVOX0FDVElWRTtcclxuLy8gICAgIHRoaXMuaW5hY3RpdmVDb2xvciA9IFwid2hpdGVcIjtcclxuLy8gICAgIHRoaXMuYWNjZW50Q29sb3IgPSBcImJsdWVcIjtcclxuLy8gfVxyXG5cclxuLy8gIHRhYlNlbGVjdGVkKGFyZ3M6IFNlbGVjdGVkSW5kZXhDaGFuZ2VkRXZlbnREYXRhKSB7XHJcbi8vICAgICAgLy8gb25seSB0cmlnZ2VyZWQgd2hlbiBhIGRpZmZlcmVudCB0YWIgaXMgdGFwcGVkXHJcbi8vICAgICAgY29uc29sZS5sb2coYXJncy5uZXdJbmRleCk7XHJcbi8vICB9XHJcblxyXG4gICAgc3RhcnRCYWNrZ3JvdW5kQW5pbWF0aW9uKGJhY2tncm91bmQpIHtcclxuICAgICAgICBiYWNrZ3JvdW5kLmFuaW1hdGUoe1xyXG4gICAgICAgICAgc2NhbGU6IHsgeDogMS4wLCB5OiAxLjAgfSxcclxuICAgICAgICAgIGR1cmF0aW9uOiAxMDAwMFxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBwdWJsaWMgb25jb29wZXJhdGl2ZWNoYW5nZShhcmdzOiBTZWxlY3RlZEluZGV4Q2hhbmdlZEV2ZW50RGF0YSkge1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGBEcm9wIERvd24gc2VsZWN0ZWQgaW5kZXggY2hhbmdlZCAgJHthcmdzLm9sZEluZGV4fSB0byAke2FyZ3MubmV3SW5kZXh9LiBOZXcgdmFsdWUgaXMgXCIke3RoaXMuc2Vzc2lvbml0ZW1zLmdldFZhbHVlKFxyXG4gICAgICAgIC8vICAgICBhcmdzLm5ld0luZGV4KX1cImApO1xyXG4gICAgICBcclxuICAgICAgICBjb25zb2xlLmxvZyhcIlNlbGVjdGVkIElEIFwiICsgYXJncy5uZXdJbmRleCApO1xyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkQ29vcGVyYXRpdmUgPSB0aGlzLmNvb3BlcmF0aXZlTGlzdC5nZXRWYWx1ZShhcmdzLm5ld0luZGV4KTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJTZWxlY3RlZCBJZCBWYWx1ZSAgXCIgKyAgdGhpcy5zZWxlY3RlZENvb3BlcmF0aXZlICk7XHJcbiAgICAgICAgICAgXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGdldENvb3BlcmF0aXZlKCl7XHJcbiAgICAgICAgdGhpcy5jb29wZXJhdGl2ZVNlcnZpY2UuZ2V0QWxsQ29vcGVyYXRpdmUoKS5zdWJzY3JpYmUoXHJcbiAgICAgICAgICAgIGRhdGEgPT4geyBcclxuICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQ29vcGVyYXRpdmUgTGlzdCBcIisgSlNPTi5zdHJpbmdpZnkoZGF0YVtcImRhdGFcIl0pICk7XHJcbiAgICAgICBcclxuICAgICAgICAgICAgIHRoaXMuY29vcGVyYXRpdmUgPSBkYXRhW1wiZGF0YVwiXTtcclxuXHJcbiAgICAgICAgICAgICB0aGlzLmNvb3BlcmF0aXZlTGlzdCA9IG5ldyBWYWx1ZUxpc3Q8c3RyaW5nPigpO1xyXG4gICAgICAgICAgICAgZm9yICggbGV0IGxvb3AgPSAwOyBsb29wIDwgdGhpcy5jb29wZXJhdGl2ZS5sZW5ndGg7IGxvb3ArKyApIHtcclxuICAgICAgICAgICAgICAgdGhpcy5jb29wZXJhdGl2ZUxpc3QucHVzaCh7IHZhbHVlOiAgIGAke3RoaXMuY29vcGVyYXRpdmVbbG9vcF0uY29vcGVyYXRpdmVJZH1gLFxyXG4gICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiBgJHt0aGlzLmNvb3BlcmF0aXZlW2xvb3BdLmZpcnN0X25hbWV9YCxcclxuICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgIH1cclxuICAgICAgICAgXHJcbiAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgZXJyID0+IHtcclxuICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcclxuICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICk7XHQgIFxyXG4gICAgfVxyXG5cclxuICAgIGdldENvb3BlcmF0aXZlU3RhZmYoc3RhZmZJZDpTdHJpbmcsY29vcGVyYXRpdmVJZDpTdHJpbmcsbmFtZTpTdHJpbmcsIHVzZXJUeXBlOiBTdHJpbmcpe1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiU3RhZmYgYW5kIENvb3BlcmF0aXZlSWQgXCIrICBzdGFmZklkICsgXCIgLSBcIiArIGNvb3BlcmF0aXZlSWQpO1xyXG4gICAgICAgXHJcblxyXG4gICAgICAgIHRoaXMubWVtYmVyU2VydmljZS5nZXRDb29wZXJhdGl2ZVN0YWZmKHN0YWZmSWQsY29vcGVyYXRpdmVJZCxcIk5ld1wiLG5hbWUsdXNlclR5cGUpLnN1YnNjcmliZShcclxuICAgICAgICAgICAgZGF0YSA9PiB7IFxyXG4gICAgICAgICAgICAgY29uc29sZS5sb2coXCJDb29wZXJhdGl2ZSBTdGFmZiBcIisgSlNPTi5zdHJpbmdpZnkoZGF0YVtcImRhdGFcIl0pICk7XHJcbiAgICAgICBcclxuICAgICAgICAgICAgIHRoaXMuY29vcGVyYXRpdmVTdGFmZiA9IGRhdGFbXCJkYXRhXCJdO1xyXG5cclxuICAgICAgICAgICAgIFROU0ZhbmN5QWxlcnQuc2hvd1N1Y2Nlc3MoXCJTdWNjZXNzIVwiLCBcIkNoZWNrIHlvdXIgZW1haWwgZm9yIHRlbXBvcmFyeSBwYXNzd29yZFwiLCBcIk9rXCIpXHJcbiAgICAgICAgICAgICAudGhlbiggKCkgPT4geyAvKiB1c2VyIHByZXNzZWQgdGhlIGJ1dHRvbiAqL1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnL2xvZ2luJ10pO1xyXG4gICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlJlZGlyZWN0IHRvIENoYW5nZSBQYXNzd29yZFwiKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgY29uc29sZS5sb2coXCJWZXJpZnlpbmcgU3RhZmYgb3V0IHNpZGUgXCIgKyB0aGlzLmNvb3BlcmF0aXZlU3RhZmYuX2lkKTtcclxuICAgICAgICAgICAvLyAgdGhpcy5zZW5kVmVyaWZ5QXV0aCh0aGlzLmNvb3BlcmF0aXZlU3RhZmYpO1xyXG5cclxuICAgICAgICAgIFxyXG4gICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICBlcnIgPT4ge1xyXG4gICAgICAgICAgICAgICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShlcnIpKTtcclxuICAgICAgICAgICAgICAgVE5TRmFuY3lBbGVydC5zaG93RXJyb3IoXCJFcnJvciFcIiwgZXJyLmVycm9yLm1lc3NhZ2UsIFwiT2tcIikgLnRoZW4oICgpID0+IHsgLyogdXNlciBwcmVzc2VkIHRoZSBidXR0b24gKi9cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlJlZGlyZWN0IHRvIENoYW5nZSBQYXNzd29yZFwiKTtcclxuICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgKTtcdCAgXHJcbiAgICB9XHJcblxyXG4gICAgc2VuZFZlcmlmeUF1dGgodmVyaWZ5QXV0aDogQ29vcGVyYXRpdmVTdGFmZil7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJWZXJpZnkgXCIrICB2ZXJpZnlBdXRoLnN0YWZmSWQpO1xyXG4gICAgICAgXHJcblxyXG4gICAgICAgIHRoaXMuY29vcGVyYXRpdmVTdGFmZlNlcnZpY2UudmVyaWZ5QXV0aFRvQ3JlYXRMYXRlcih2ZXJpZnlBdXRoKS5zdWJzY3JpYmUoXHJcbiAgICAgICAgICAgIGRhdGEgPT4geyBcclxuICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiVmVyeSBBdXRoIFwiKyBKU09OLnN0cmluZ2lmeShkYXRhW1wiZGF0YVwiXSkgKTtcclxuICAgICAgIFxyXG4gICAgICAgICAgICAgXHJcblxyXG4gICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgZXJyID0+IHtcclxuICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcclxuICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICk7XHQgIFxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzaG93U3VjY2VzcygpIHtcclxuICAgICAgICBUTlNGYW5jeUFsZXJ0LnNob3dTdWNjZXNzKFwiU3VjY2VzcyFcIiwgXCJTb21ldGhpbmcgZmluaXNoZWQgc3VjY2Vzc2Z1bGx5LlwiLCBcIk9rXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzaG93RXJyb3IoKSB7XHJcbiAgICAgICAgVE5TRmFuY3lBbGVydC5zaG93RXJyb3IoXCJFcnJvciFcIiwgXCJPaCBubywgc29tZXRoaW5nIHdlbnQgd3JvbmcuXCIsIFwiRGlzbWlzc1wiKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2hvd0N1c3RvbUltYWdlKCkge1xyXG4gICAgICAgIFROU0ZhbmN5QWxlcnQuc2hvd0FuaW1hdGlvblR5cGUgPSBUTlNGYW5jeUFsZXJ0LlNIT1dfQU5JTUFUSU9OX1RZUEVTLlNsaWRlSW5Gcm9tQm90dG9tO1xyXG4gICAgICAgIFROU0ZhbmN5QWxlcnQuaGlkZUFuaW1hdGlvblR5cGUgPSBUTlNGYW5jeUFsZXJ0LkhJREVfQU5JTUFUSU9OX1RZUEVTLlNsaWRlT3V0VG9Ub3A7XHJcbiAgICAgICAgVE5TRmFuY3lBbGVydC5zaG93Q3VzdG9tSW1hZ2UoXCJwb2x5Z2xvdF9kZXZlbG9wZXIucG5nXCIsIFwiIzkxMUUyNVwiLCBcIkN1c3RvbSBJbWFnZVwiLCBcIlVzZSB5b3VyIG93biBpbWFnZXMgaW4gYW4gYWxlcnQhXCIsIFwiRGlzbWlzc1wiKTtcclxuICAgIH1cclxuXHJcbiAgICBuYXZpZ2F0ZUJhY2soKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJHbyBCYWNrIEJ1dHRvbiBDbGlja2VkXCIgKTtcclxuICAgICAgICB0aGlzLnJvdXRlckV4dGVuc2lvbnMuYmFja1RvUHJldmlvdXNQYWdlKCk7XHJcbiAgICAgICAgLy90aGlzLnJvdXRlci5uYXZpZ2F0ZShbXCIvXCJdKTtcclxuICAgIH1cclxuICAgICAgXHJcblxyXG59Il19