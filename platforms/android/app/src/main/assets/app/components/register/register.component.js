"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var common_1 = require("@angular/common");
var nativescript_drop_down_1 = require("nativescript-drop-down");
var cooperative_service_1 = require("../../services/cooperative.service");
var cooperativeStaff_service_1 = require("../../services/cooperativeStaff.service");
var member_service_1 = require("../../services/member.service");
var nativescript_fancyalert_1 = require("nativescript-fancyalert");
var router_2 = require("nativescript-angular/router");
var RegisterComponent = /** @class */ (function () {
    function RegisterComponent(location, cooperativeService, cooperativeStaffService, memberService, route, router, routerExtensions) {
        this.location = location;
        this.cooperativeService = cooperativeService;
        this.cooperativeStaffService = cooperativeStaffService;
        this.memberService = memberService;
        this.route = route;
        this.router = router;
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
    RegisterComponent.prototype.ngAfterViewInit = function () {
        this.getCooperative();
    };
    RegisterComponent.prototype.ngOnInit = function () {
    };
    RegisterComponent.prototype.register = function () {
        // if(this.input.firstname && this.input.lastname && this.input.email && this.input.password) {
        //     ApplicationSettings.setString("account", JSON.stringify(this.input));
        //     this.location.back();
        // } else {
        //     (new SnackBar()).simple("All Fields Required!");
        // }
        console.log("Reaching Register ");
        this.getCooperativeStaff(this.staffId, this.selectedCooperative, "", "cooperator");
    };
    RegisterComponent.prototype.registerVendor = function () {
        // if(this.input.firstname && this.input.lastname && this.input.email && this.input.password) {
        //     ApplicationSettings.setString("account", JSON.stringify(this.input));
        //     this.location.back();
        // } else {
        //     (new SnackBar()).simple("All Fields Required!");
        // }
        console.log("Reaching Register Vendor ");
        this.getCooperativeStaff(this.businessEmail, "0", this.businessName, "vendor");
    };
    RegisterComponent.prototype.onNavBtnTap = function () {
        // This code will be called only in Android.
        console.log("Navigation button tapped!");
    };
    RegisterComponent.prototype.goBack = function () {
        this.location.back();
    };
    RegisterComponent.prototype.navigateBack = function () {
        console.log("Go Back Button Clicked");
        this.routerExtensions.backToPreviousPage();
        //this.router.navigate(["/"]);
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
    RegisterComponent.prototype.startBackgroundAnimation = function (background) {
        background.animate({
            scale: { x: 1.0, y: 1.0 },
            duration: 10000
        });
    };
    RegisterComponent.prototype.oncooperativechange = function (args) {
        // console.log(`Drop Down selected index changed  ${args.oldIndex} to ${args.newIndex}. New value is "${this.sessionitems.getValue(
        //     args.newIndex)}"`);
        console.log("Selected ID " + args.newIndex);
        this.selectedCooperative = this.cooperativeList.getValue(args.newIndex);
        console.log("Selected Id Value  " + this.selectedCooperative);
    };
    RegisterComponent.prototype.getCooperative = function () {
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
    RegisterComponent.prototype.getCooperativeStaff = function (staffId, cooperativeId, name, userType) {
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
    RegisterComponent.prototype.sendVerifyAuth = function (verifyAuth) {
        console.log("Verify " + verifyAuth.staffId);
        this.cooperativeStaffService.verifyAuthToCreatLater(verifyAuth).subscribe(function (data) {
            console.log("Very Auth " + JSON.stringify(data["data"]));
        }, function (err) {
            console.log(err);
        });
    };
    RegisterComponent.prototype.showSuccess = function () {
        nativescript_fancyalert_1.TNSFancyAlert.showSuccess("Success!", "Something finished successfully.", "Ok");
    };
    RegisterComponent.prototype.showError = function () {
        nativescript_fancyalert_1.TNSFancyAlert.showError("Error!", "Oh no, something went wrong.", "Dismiss");
    };
    RegisterComponent.prototype.showCustomImage = function () {
        nativescript_fancyalert_1.TNSFancyAlert.showAnimationType = nativescript_fancyalert_1.TNSFancyAlert.SHOW_ANIMATION_TYPES.SlideInFromBottom;
        nativescript_fancyalert_1.TNSFancyAlert.hideAnimationType = nativescript_fancyalert_1.TNSFancyAlert.HIDE_ANIMATION_TYPES.SlideOutToTop;
        nativescript_fancyalert_1.TNSFancyAlert.showCustomImage("polyglot_developer.png", "#911E25", "Custom Image", "Use your own images in an alert!", "Dismiss");
    };
    RegisterComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: "ns-register",
            templateUrl: "register.component.html",
            styleUrls: ["./register-common.css", "./register.component.css"],
        }),
        __metadata("design:paramtypes", [common_1.Location,
            cooperative_service_1.CooperativeService,
            cooperativeStaff_service_1.CooperativeStaffService,
            member_service_1.MemberService,
            router_1.ActivatedRoute,
            router_1.Router,
            router_2.RouterExtensions])
    ], RegisterComponent);
    return RegisterComponent;
}());
exports.RegisterComponent = RegisterComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVnaXN0ZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicmVnaXN0ZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQStEO0FBQy9ELDBDQUF5RDtBQUN6RCwwQ0FBMkM7QUFVM0MsaUVBQTZEO0FBRzdELDBFQUFzRTtBQUN0RSxvRkFBZ0Y7QUFFaEYsZ0VBQTREO0FBSTVELG1FQUF3RDtBQUV4RCxzREFBK0Q7QUFTL0Q7SUFvQkksMkJBQTJCLFFBQWtCLEVBQ3JDLGtCQUFxQyxFQUNyQyx1QkFBK0MsRUFDL0MsYUFBMkIsRUFDM0IsS0FBcUIsRUFDckIsTUFBYyxFQUNkLGdCQUFrQztRQU5mLGFBQVEsR0FBUixRQUFRLENBQVU7UUFDckMsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFtQjtRQUNyQyw0QkFBdUIsR0FBdkIsdUJBQXVCLENBQXdCO1FBQy9DLGtCQUFhLEdBQWIsYUFBYSxDQUFjO1FBQzNCLFVBQUssR0FBTCxLQUFLLENBQWdCO1FBQ3JCLFdBQU0sR0FBTixNQUFNLENBQVE7UUFDZCxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBbEIxQyxnQkFBVyxHQUF1QixFQUFFLENBQUM7UUFDckMsU0FBSSxHQUFXLG9CQUFvQixDQUFDO1FBRTdCLGFBQVEsR0FBZ0IsU0FBUyxDQUFDO1FBZ0JyQyxJQUFJLENBQUMsS0FBSyxHQUFHO1lBQ1QsV0FBVyxFQUFFLEVBQUU7WUFDZixVQUFVLEVBQUUsRUFBRTtZQUNkLE9BQU8sRUFBRSxFQUFFO1lBQ1gsVUFBVSxFQUFFLEVBQUU7U0FDakIsQ0FBQTtJQUNMLENBQUM7SUFFRCwyQ0FBZSxHQUFmO1FBQ0ksSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQzNCLENBQUM7SUFFUSxvQ0FBUSxHQUFmO0lBRUEsQ0FBQztJQUNLLG9DQUFRLEdBQWY7UUFDSSwrRkFBK0Y7UUFDL0YsNEVBQTRFO1FBQzVFLDRCQUE0QjtRQUM1QixXQUFXO1FBQ1gs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QUF3QixFQUFFLFNBQVMsRUFBRSxjQUFjLEVBQUUsa0NBQWtDLEVBQUUsU0FBUyxDQUFDLENBQUM7SUFDdEksQ0FBQztJQXhNUSxpQkFBaUI7UUFQN0IsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixRQUFRLEVBQUUsYUFBYTtZQUN2QixXQUFXLEVBQUUseUJBQXlCO1lBQ3RDLFNBQVMsRUFBRSxDQUFDLHVCQUF1QixFQUFFLDBCQUEwQixDQUFDO1NBQ25FLENBQUM7eUNBc0J1QyxpQkFBUTtZQUNsQix3Q0FBa0I7WUFDYixrREFBdUI7WUFDakMsOEJBQWE7WUFDcEIsdUJBQWM7WUFDYixlQUFNO1lBQ0kseUJBQWdCO09BMUJqQyxpQkFBaUIsQ0EyTTdCO0lBQUQsd0JBQUM7Q0FBQSxBQTNNRCxJQTJNQztBQTNNWSw4Q0FBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsT25Jbml0LEFmdGVyVmlld0luaXQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBSb3V0ZXIsIEFjdGl2YXRlZFJvdXRlIH0gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xyXG5pbXBvcnQgeyBMb2NhdGlvbiB9IGZyb20gXCJAYW5ndWxhci9jb21tb25cIjtcclxuaW1wb3J0IHsgU25hY2tCYXIgfSBmcm9tIFwibmF0aXZlc2NyaXB0LXNuYWNrYmFyXCI7XHJcbmltcG9ydCAqIGFzIEFwcGxpY2F0aW9uU2V0dGluZ3MgZnJvbSBcImFwcGxpY2F0aW9uLXNldHRpbmdzXCI7XHJcbmltcG9ydCB7IGNvbm5lY3Rpb25UeXBlLCBnZXRDb25uZWN0aW9uVHlwZSB9IGZyb20gXCJjb25uZWN0aXZpdHlcIjtcclxuaW1wb3J0IHsgQW5pbWF0aW9uIH0gZnJvbSBcInVpL2FuaW1hdGlvblwiO1xyXG5pbXBvcnQgeyBWaWV3IH0gZnJvbSBcInVpL2NvcmUvdmlld1wiO1xyXG5pbXBvcnQgeyBwcm9tcHQgfSBmcm9tIFwidWkvZGlhbG9nc1wiO1xyXG5pbXBvcnQgeyBQYWdlIH0gZnJvbSBcInVpL3BhZ2VcIjtcclxuaW1wb3J0IHsgVGV4dEZpZWxkIH0gZnJvbSBcInVpL3RleHQtZmllbGRcIjtcclxuXHJcbmltcG9ydCB7IFZhbHVlTGlzdCwgRHJvcERvd24gfSBmcm9tIFwibmF0aXZlc2NyaXB0LWRyb3AtZG93blwiO1xyXG5pbXBvcnQgeyBTZWxlY3RlZEluZGV4Q2hhbmdlZEV2ZW50RGF0YSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtZHJvcC1kb3duXCI7XHJcbmltcG9ydCB7IENvb3BlcmF0aXZlLCBVc2VyIH0gZnJvbSAnLi4vLi4vbW9kZWxzL2luZGV4JztcclxuaW1wb3J0IHtDb29wZXJhdGl2ZVNlcnZpY2V9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9jb29wZXJhdGl2ZS5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7Q29vcGVyYXRpdmVTdGFmZlNlcnZpY2V9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9jb29wZXJhdGl2ZVN0YWZmLnNlcnZpY2VcIjtcclxuXHJcbmltcG9ydCB7TWVtYmVyU2VydmljZX0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL21lbWJlci5zZXJ2aWNlXCI7XHJcblxyXG5pbXBvcnQge0Nvb3BlcmF0aXZlU3RhZmYsVmVyaWZ5QXV0aH0gZnJvbSBcIi4uLy4uL21vZGVscy9pbmRleFwiO1xyXG5cclxuaW1wb3J0IHsgVE5TRmFuY3lBbGVydCB9IGZyb20gXCJuYXRpdmVzY3JpcHQtZmFuY3lhbGVydFwiO1xyXG5cclxuaW1wb3J0IHsgUm91dGVyRXh0ZW5zaW9ucyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXJcIjtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcclxuICAgIHNlbGVjdG9yOiBcIm5zLXJlZ2lzdGVyXCIsXHJcbiAgICB0ZW1wbGF0ZVVybDogXCJyZWdpc3Rlci5jb21wb25lbnQuaHRtbFwiLFxyXG4gICAgc3R5bGVVcmxzOiBbXCIuL3JlZ2lzdGVyLWNvbW1vbi5jc3NcIiwgXCIuL3JlZ2lzdGVyLmNvbXBvbmVudC5jc3NcIl0sXHJcbn0pXHJcblxyXG5leHBvcnQgY2xhc3MgUmVnaXN0ZXJDb21wb25lbnQge1xyXG5cclxuICAgIHB1YmxpYyBpbnB1dDogYW55O1xyXG4gICAgc2VsZWN0ZWRDb29wZXJhdGl2ZUluZGV4OiBudW1iZXIgO1xyXG4gICAgc2VsZWN0ZWRDb29wZXJhdGl2ZSA6IHN0cmluZztcclxuICAgIHN0YWZmSWQ6IFN0cmluZztcclxuICAgIGJ1c2luZXNzTmFtZTogU3RyaW5nO1xyXG4gICAgYnVzaW5lc3NFbWFpbDogU3RyaW5nO1xyXG4gICAgY29vcGVyYXRpdmU6IEFycmF5PENvb3BlcmF0aXZlPiA9IFtdO1xyXG4gICAgaGludDogc3RyaW5nID0gXCJTZWxlY3QgQ29vcGVyYXRpdmVcIjtcclxuICAgIHB1YmxpYyBjb29wZXJhdGl2ZUxpc3Q6IFZhbHVlTGlzdDxzdHJpbmc+O1xyXG4gICAgcHVibGljIGNzc0NsYXNzOiBzdHJpbmcgICAgICA9IFwiZGVmYXVsdFwiO1xyXG4gICAgY29vcGVyYXRpdmVTdGFmZjogVXNlcjtcclxuICAgIHZlcmlmeUF1dGg6IFZlcmlmeUF1dGg7XHJcbiAgICBwdWJsaWMgaGlkZGVuOiBib29sZWFuO1xyXG4gICAgLy8gcHVibGljIHRpdGxlU3RhdGU6IFRJVExFX1NUQVRFO1xyXG4gICAgLy8gcHVibGljIF9iYXI6IEJvdHRvbUJhcjtcclxuICAgIHB1YmxpYyBpbmFjdGl2ZUNvbG9yOiBzdHJpbmc7XHJcbiAgICBwdWJsaWMgYWNjZW50Q29sb3I6IHN0cmluZztcclxuXHJcbiAgICBwdWJsaWMgY29uc3RydWN0b3IocHJpdmF0ZSBsb2NhdGlvbjogTG9jYXRpb24sIFxyXG4gICAgcHJpdmF0ZSBjb29wZXJhdGl2ZVNlcnZpY2U6Q29vcGVyYXRpdmVTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBjb29wZXJhdGl2ZVN0YWZmU2VydmljZTpDb29wZXJhdGl2ZVN0YWZmU2VydmljZSxcclxuICAgIHByaXZhdGUgbWVtYmVyU2VydmljZTpNZW1iZXJTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSByb3V0ZTogQWN0aXZhdGVkUm91dGUsXHJcbiAgICBwcml2YXRlIHJvdXRlcjogUm91dGVyLFxyXG4gICAgcHJpdmF0ZSByb3V0ZXJFeHRlbnNpb25zOiBSb3V0ZXJFeHRlbnNpb25zKSB7XHJcbiAgICAgICAgdGhpcy5pbnB1dCA9IHtcclxuICAgICAgICAgICAgXCJmaXJzdG5hbWVcIjogXCJcIixcclxuICAgICAgICAgICAgXCJsYXN0bmFtZVwiOiBcIlwiLFxyXG4gICAgICAgICAgICBcImVtYWlsXCI6IFwiXCIsXHJcbiAgICAgICAgICAgIFwicGFzc3dvcmRcIjogXCJcIlxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBuZ0FmdGVyVmlld0luaXQoKSB7XHJcbiAgICAgICAgdGhpcy5nZXRDb29wZXJhdGl2ZSgpO1xyXG4gICB9XHJcbiAgIFxyXG4gICAgIHB1YmxpYyBuZ09uSW5pdCgpIHtcclxuXHJcbiAgICAgfVxyXG4gICAgcHVibGljIHJlZ2lzdGVyKCkge1xyXG4gICAgICAgIC8vIGlmKHRoaXMuaW5wdXQuZmlyc3RuYW1lICYmIHRoaXMuaW5wdXQubGFzdG5hbWUgJiYgdGhpcy5pbnB1dC5lbWFpbCAmJiB0aGlzLmlucHV0LnBhc3N3b3JkKSB7XHJcbiAgICAgICAgLy8gICAgIEFwcGxpY2F0aW9uU2V0dGluZ3Muc2V0U3RyaW5nKFwiYWNjb3VudFwiLCBKU09OLnN0cmluZ2lmeSh0aGlzLmlucHV0KSk7XHJcbiAgICAgICAgLy8gICAgIHRoaXMubG9jYXRpb24uYmFjaygpO1xyXG4gICAgICAgIC8vIH0gZWxzZSB7XHJcbiAgICAgICAgLy8gICAgIChuZXcgU25hY2tCYXIoKSkuc2ltcGxlKFwiQWxsIEZpZWxkcyBSZXF1aXJlZCFcIik7XHJcbiAgICAgICAgLy8gfVxyXG5cclxuICAgICAgICBjb25zb2xlLmxvZyhcIlJlYWNoaW5nIFJlZ2lzdGVyIFwiICk7XHJcblxyXG4gICAgICAgIHRoaXMuZ2V0Q29vcGVyYXRpdmVTdGFmZih0aGlzLnN0YWZmSWQsdGhpcy5zZWxlY3RlZENvb3BlcmF0aXZlLFwiXCIsXCJjb29wZXJhdG9yXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZWdpc3RlclZlbmRvcigpIHtcclxuICAgICAgICAvLyBpZih0aGlzLmlucHV0LmZpcnN0bmFtZSAmJiB0aGlzLmlucHV0Lmxhc3RuYW1lICYmIHRoaXMuaW5wdXQuZW1haWwgJiYgdGhpcy5pbnB1dC5wYXNzd29yZCkge1xyXG4gICAgICAgIC8vICAgICBBcHBsaWNhdGlvblNldHRpbmdzLnNldFN0cmluZyhcImFjY291bnRcIiwgSlNPTi5zdHJpbmdpZnkodGhpcy5pbnB1dCkpO1xyXG4gICAgICAgIC8vICAgICB0aGlzLmxvY2F0aW9uLmJhY2soKTtcclxuICAgICAgICAvLyB9IGVsc2Uge1xyXG4gICAgICAgIC8vICAgICAobmV3IFNuYWNrQmFyKCkpLnNpbXBsZShcIkFsbCBGaWVsZHMgUmVxdWlyZWQhXCIpO1xyXG4gICAgICAgIC8vIH1cclxuXHJcbiAgICAgICAgY29uc29sZS5sb2coXCJSZWFjaGluZyBSZWdpc3RlciBWZW5kb3IgXCIgKTtcclxuXHJcbiAgICAgICAgdGhpcy5nZXRDb29wZXJhdGl2ZVN0YWZmKHRoaXMuYnVzaW5lc3NFbWFpbCxcIjBcIix0aGlzLmJ1c2luZXNzTmFtZSxcInZlbmRvclwiKTtcclxuICAgIH1cclxuXHJcbiAgICBvbk5hdkJ0blRhcCgpe1xyXG4gICAgICAgIC8vIFRoaXMgY29kZSB3aWxsIGJlIGNhbGxlZCBvbmx5IGluIEFuZHJvaWQuXHJcbiAgICAgICAgY29uc29sZS5sb2coXCJOYXZpZ2F0aW9uIGJ1dHRvbiB0YXBwZWQhXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnb0JhY2soKSB7XHJcbiAgICAgICAgdGhpcy5sb2NhdGlvbi5iYWNrKCk7XHJcbiAgICB9XHJcblxyXG4gICAgbmF2aWdhdGVCYWNrKCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiR28gQmFjayBCdXR0b24gQ2xpY2tlZFwiICk7XHJcbiAgICAgICAgdGhpcy5yb3V0ZXJFeHRlbnNpb25zLmJhY2tUb1ByZXZpb3VzUGFnZSgpO1xyXG4gICAgICAgIC8vdGhpcy5yb3V0ZXIubmF2aWdhdGUoW1wiL1wiXSk7XHJcbiAgICB9XHJcbiAgICAvLyB0YWJMb2FkZWQoZXZlbnQpIHtcclxuLy8gICAgIHRoaXMuX2JhciA9IDxCb3R0b21CYXI+ZXZlbnQub2JqZWN0O1xyXG4vLyAgICAgdGhpcy5oaWRkZW4gPSBmYWxzZTtcclxuLy8gICAgIHRoaXMudGl0bGVTdGF0ZSA9IFRJVExFX1NUQVRFLlNIT1dfV0hFTl9BQ1RJVkU7XHJcbi8vICAgICB0aGlzLmluYWN0aXZlQ29sb3IgPSBcIndoaXRlXCI7XHJcbi8vICAgICB0aGlzLmFjY2VudENvbG9yID0gXCJibHVlXCI7XHJcbi8vIH1cclxuXHJcbi8vICB0YWJTZWxlY3RlZChhcmdzOiBTZWxlY3RlZEluZGV4Q2hhbmdlZEV2ZW50RGF0YSkge1xyXG4vLyAgICAgIC8vIG9ubHkgdHJpZ2dlcmVkIHdoZW4gYSBkaWZmZXJlbnQgdGFiIGlzIHRhcHBlZFxyXG4vLyAgICAgIGNvbnNvbGUubG9nKGFyZ3MubmV3SW5kZXgpO1xyXG4vLyAgfVxyXG5cclxuICAgIHN0YXJ0QmFja2dyb3VuZEFuaW1hdGlvbihiYWNrZ3JvdW5kKSB7XHJcbiAgICAgICAgYmFja2dyb3VuZC5hbmltYXRlKHtcclxuICAgICAgICAgIHNjYWxlOiB7IHg6IDEuMCwgeTogMS4wIH0sXHJcbiAgICAgICAgICBkdXJhdGlvbjogMTAwMDBcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG5cclxuICAgICAgcHVibGljIG9uY29vcGVyYXRpdmVjaGFuZ2UoYXJnczogU2VsZWN0ZWRJbmRleENoYW5nZWRFdmVudERhdGEpIHtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhgRHJvcCBEb3duIHNlbGVjdGVkIGluZGV4IGNoYW5nZWQgICR7YXJncy5vbGRJbmRleH0gdG8gJHthcmdzLm5ld0luZGV4fS4gTmV3IHZhbHVlIGlzIFwiJHt0aGlzLnNlc3Npb25pdGVtcy5nZXRWYWx1ZShcclxuICAgICAgICAvLyAgICAgYXJncy5uZXdJbmRleCl9XCJgKTtcclxuICAgICAgXHJcbiAgICAgICAgY29uc29sZS5sb2coXCJTZWxlY3RlZCBJRCBcIiArIGFyZ3MubmV3SW5kZXggKTtcclxuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZENvb3BlcmF0aXZlID0gdGhpcy5jb29wZXJhdGl2ZUxpc3QuZ2V0VmFsdWUoYXJncy5uZXdJbmRleCk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiU2VsZWN0ZWQgSWQgVmFsdWUgIFwiICsgIHRoaXMuc2VsZWN0ZWRDb29wZXJhdGl2ZSApO1xyXG4gICAgICAgICAgIFxyXG4gICAgICB9XHJcblxyXG4gICAgICBnZXRDb29wZXJhdGl2ZSgpe1xyXG4gICAgICAgIHRoaXMuY29vcGVyYXRpdmVTZXJ2aWNlLmdldEFsbENvb3BlcmF0aXZlKCkuc3Vic2NyaWJlKFxyXG4gICAgICAgICAgICBkYXRhID0+IHsgXHJcbiAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkNvb3BlcmF0aXZlIExpc3QgXCIrIEpTT04uc3RyaW5naWZ5KGRhdGFbXCJkYXRhXCJdKSApO1xyXG4gICAgICAgXHJcbiAgICAgICAgICAgICB0aGlzLmNvb3BlcmF0aXZlID0gZGF0YVtcImRhdGFcIl07XHJcblxyXG4gICAgICAgICAgICAgdGhpcy5jb29wZXJhdGl2ZUxpc3QgPSBuZXcgVmFsdWVMaXN0PHN0cmluZz4oKTtcclxuICAgICAgICAgICAgIGZvciAoIGxldCBsb29wID0gMDsgbG9vcCA8IHRoaXMuY29vcGVyYXRpdmUubGVuZ3RoOyBsb29wKysgKSB7XHJcbiAgICAgICAgICAgICAgIHRoaXMuY29vcGVyYXRpdmVMaXN0LnB1c2goeyB2YWx1ZTogICBgJHt0aGlzLmNvb3BlcmF0aXZlW2xvb3BdLmNvb3BlcmF0aXZlSWR9YCxcclxuICAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogYCR7dGhpcy5jb29wZXJhdGl2ZVtsb29wXS5maXJzdF9uYW1lfWAsXHJcbiAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICB9XHJcbiAgICAgICAgIFxyXG4gICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgIGVyciA9PiB7XHJcbiAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XHJcbiAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICApO1x0ICBcclxuICAgIH1cclxuXHJcbiAgICBnZXRDb29wZXJhdGl2ZVN0YWZmKHN0YWZmSWQ6U3RyaW5nLGNvb3BlcmF0aXZlSWQ6U3RyaW5nLG5hbWU6U3RyaW5nLCB1c2VyVHlwZTogU3RyaW5nKXtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIlN0YWZmIGFuZCBDb29wZXJhdGl2ZUlkIFwiKyAgc3RhZmZJZCArIFwiIC0gXCIgKyBjb29wZXJhdGl2ZUlkKTtcclxuICAgICAgIFxyXG5cclxuICAgICAgICB0aGlzLm1lbWJlclNlcnZpY2UuZ2V0Q29vcGVyYXRpdmVTdGFmZihzdGFmZklkLGNvb3BlcmF0aXZlSWQsXCJOZXdcIixuYW1lLHVzZXJUeXBlKS5zdWJzY3JpYmUoXHJcbiAgICAgICAgICAgIGRhdGEgPT4geyBcclxuICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQ29vcGVyYXRpdmUgU3RhZmYgXCIrIEpTT04uc3RyaW5naWZ5KGRhdGFbXCJkYXRhXCJdKSApO1xyXG4gICAgICAgXHJcbiAgICAgICAgICAgICB0aGlzLmNvb3BlcmF0aXZlU3RhZmYgPSBkYXRhW1wiZGF0YVwiXTtcclxuXHJcbiAgICAgICAgICAgICBUTlNGYW5jeUFsZXJ0LnNob3dTdWNjZXNzKFwiU3VjY2VzcyFcIiwgXCJDaGVjayB5b3VyIGVtYWlsIGZvciB0ZW1wb3JhcnkgcGFzc3dvcmRcIiwgXCJPa1wiKVxyXG4gICAgICAgICAgICAgLnRoZW4oICgpID0+IHsgLyogdXNlciBwcmVzc2VkIHRoZSBidXR0b24gKi9cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy9sb2dpbiddKTtcclxuICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJSZWRpcmVjdCB0byBDaGFuZ2UgUGFzc3dvcmRcIik7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiVmVyaWZ5aW5nIFN0YWZmIG91dCBzaWRlIFwiICsgdGhpcy5jb29wZXJhdGl2ZVN0YWZmLl9pZCk7XHJcbiAgICAgICAgICAgLy8gIHRoaXMuc2VuZFZlcmlmeUF1dGgodGhpcy5jb29wZXJhdGl2ZVN0YWZmKTtcclxuXHJcbiAgICAgICAgICBcclxuICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgZXJyID0+IHtcclxuICAgICAgICAgICAgICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkoZXJyKSk7XHJcbiAgICAgICAgICAgICAgIFROU0ZhbmN5QWxlcnQuc2hvd0Vycm9yKFwiRXJyb3IhXCIsIGVyci5lcnJvci5tZXNzYWdlLCBcIk9rXCIpIC50aGVuKCAoKSA9PiB7IC8qIHVzZXIgcHJlc3NlZCB0aGUgYnV0dG9uICovXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJSZWRpcmVjdCB0byBDaGFuZ2UgUGFzc3dvcmRcIik7XHJcbiAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICk7XHQgIFxyXG4gICAgfVxyXG5cclxuICAgIHNlbmRWZXJpZnlBdXRoKHZlcmlmeUF1dGg6IENvb3BlcmF0aXZlU3RhZmYpe1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiVmVyaWZ5IFwiKyAgdmVyaWZ5QXV0aC5zdGFmZklkKTtcclxuICAgICAgIFxyXG5cclxuICAgICAgICB0aGlzLmNvb3BlcmF0aXZlU3RhZmZTZXJ2aWNlLnZlcmlmeUF1dGhUb0NyZWF0TGF0ZXIodmVyaWZ5QXV0aCkuc3Vic2NyaWJlKFxyXG4gICAgICAgICAgICBkYXRhID0+IHsgXHJcbiAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlZlcnkgQXV0aCBcIisgSlNPTi5zdHJpbmdpZnkoZGF0YVtcImRhdGFcIl0pICk7XHJcbiAgICAgICBcclxuICAgICAgICAgICAgIFxyXG5cclxuICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgIGVyciA9PiB7XHJcbiAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XHJcbiAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICApO1x0ICBcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2hvd1N1Y2Nlc3MoKSB7XHJcbiAgICAgICAgVE5TRmFuY3lBbGVydC5zaG93U3VjY2VzcyhcIlN1Y2Nlc3MhXCIsIFwiU29tZXRoaW5nIGZpbmlzaGVkIHN1Y2Nlc3NmdWxseS5cIiwgXCJPa1wiKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2hvd0Vycm9yKCkge1xyXG4gICAgICAgIFROU0ZhbmN5QWxlcnQuc2hvd0Vycm9yKFwiRXJyb3IhXCIsIFwiT2ggbm8sIHNvbWV0aGluZyB3ZW50IHdyb25nLlwiLCBcIkRpc21pc3NcIik7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNob3dDdXN0b21JbWFnZSgpIHtcclxuICAgICAgICBUTlNGYW5jeUFsZXJ0LnNob3dBbmltYXRpb25UeXBlID0gVE5TRmFuY3lBbGVydC5TSE9XX0FOSU1BVElPTl9UWVBFUy5TbGlkZUluRnJvbUJvdHRvbTtcclxuICAgICAgICBUTlNGYW5jeUFsZXJ0LmhpZGVBbmltYXRpb25UeXBlID0gVE5TRmFuY3lBbGVydC5ISURFX0FOSU1BVElPTl9UWVBFUy5TbGlkZU91dFRvVG9wO1xyXG4gICAgICAgIFROU0ZhbmN5QWxlcnQuc2hvd0N1c3RvbUltYWdlKFwicG9seWdsb3RfZGV2ZWxvcGVyLnBuZ1wiLCBcIiM5MTFFMjVcIiwgXCJDdXN0b20gSW1hZ2VcIiwgXCJVc2UgeW91ciBvd24gaW1hZ2VzIGluIGFuIGFsZXJ0IVwiLCBcIkRpc21pc3NcIik7XHJcbiAgICB9XHJcbiAgICAgIFxyXG5cclxufSJdfQ==