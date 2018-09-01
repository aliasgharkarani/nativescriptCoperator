"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("nativescript-angular/router");
var common_1 = require("@angular/common");
var nativescript_drop_down_1 = require("nativescript-drop-down");
var cooperative_service_1 = require("../../services/cooperative.service");
var cooperativeStaff_service_1 = require("../../services/cooperativeStaff.service");
var autologout_service_1 = require("../../services/autologout.service");
var ChangePasswordComponent = /** @class */ (function () {
    function ChangePasswordComponent(location, cooperativeService, cooperativeStaffService, routerExtensions, autoLogoutService) {
        this.location = location;
        this.cooperativeService = cooperativeService;
        this.cooperativeStaffService = cooperativeStaffService;
        this.routerExtensions = routerExtensions;
        this.autoLogoutService = autoLogoutService;
        this.cooperative = [];
        this.hint = "Select Cooperative";
        this.cssClass = "default";
    }
    ChangePasswordComponent.prototype.ngAfterViewInit = function () {
        this.getCooperative();
    };
    ChangePasswordComponent.prototype.ngOnInit = function () {
    };
    ChangePasswordComponent.prototype.register = function () {
        // if(this.input.firstname && this.input.lastname && this.input.email && this.input.password) {
        //     ApplicationSettings.setString("account", JSON.stringify(this.input));
        //     this.location.back();
        // } else {
        //     (new SnackBar()).simple("All Fields Required!");
        // }
        console.log("Reaching Register ");
        this.getCooperativeStaff(this.staffId, this.selectedCooperative);
    };
    ChangePasswordComponent.prototype.onNavBtnTap = function () {
        // This code will be called only in Android.
        console.log("Navigation button tapped!");
    };
    ChangePasswordComponent.prototype.next = function () {
    };
    ChangePasswordComponent.prototype.goBack = function () {
        this.location.back();
    };
    ChangePasswordComponent.prototype.startBackgroundAnimation = function (background) {
        background.animate({
            scale: { x: 1.0, y: 1.0 },
            duration: 10000
        });
    };
    ChangePasswordComponent.prototype.oncooperativechange = function (args) {
        // console.log(`Drop Down selected index changed  ${args.oldIndex} to ${args.newIndex}. New value is "${this.sessionitems.getValue(
        //     args.newIndex)}"`);
        console.log("Selected ID " + args.newIndex);
        this.selectedCooperative = this.cooperativeList.getValue(args.newIndex);
        console.log("Selected Id Value  " + this.selectedCooperative);
    };
    ChangePasswordComponent.prototype.getCooperative = function () {
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
    ChangePasswordComponent.prototype.getCooperativeStaff = function (staffId, cooperativeId) {
        var _this = this;
        console.log("Staff and CooperativeId " + staffId + " - " + cooperativeId);
        this.cooperativeStaffService.getCooperativeStaff(staffId, cooperativeId).subscribe(function (data) {
            console.log("Cooperative Staff " + JSON.stringify(data["data"]));
            _this.cooperativeStaff = data["data"];
            console.log("Verifying Staff out side " + _this.cooperativeStaff.staffId);
            _this.sendVerifyAuth(_this.cooperativeStaff);
        }, function (err) {
            console.log(err);
        });
    };
    ChangePasswordComponent.prototype.sendVerifyAuth = function (verifyAuth) {
        console.log("Verify " + verifyAuth.staffId);
        this.cooperativeStaffService.verifyAuthToCreatLater(verifyAuth).subscribe(function (data) {
            console.log("Very Auth " + JSON.stringify(data["data"]));
        }, function (err) {
            console.log(err);
        });
    };
    ChangePasswordComponent.prototype.navigateBack = function () {
        console.log("Go Back Button Clicked");
        this.routerExtensions.backToPreviousPage();
    };
    ChangePasswordComponent.prototype.onTouch = function (args) {
        this.autoLogoutService.reset();
    };
    ChangePasswordComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: "ns-changepassword",
            templateUrl: "changepassword.component.html",
            styleUrls: ["./changepassword-common.css", "./changepassword.component.css"],
        }),
        __metadata("design:paramtypes", [common_1.Location, cooperative_service_1.CooperativeService, cooperativeStaff_service_1.CooperativeStaffService,
            router_1.RouterExtensions, autologout_service_1.AutoLogoutService])
    ], ChangePasswordComponent);
    return ChangePasswordComponent;
}());
exports.ChangePasswordComponent = ChangePasswordComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhbmdlcGFzc3dvcmQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY2hhbmdlcGFzc3dvcmQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQStEO0FBQy9ELHNEQUErRDtBQUMvRCwwQ0FBMkM7QUFVM0MsaUVBQTZEO0FBRzdELDBFQUFzRTtBQUN0RSxvRkFBZ0Y7QUFJaEYsd0VBQXNFO0FBVXRFO0lBa0JJLGlDQUEyQixRQUFrQixFQUFVLGtCQUFxQyxFQUFVLHVCQUErQyxFQUN6SSxnQkFBa0MsRUFBUyxpQkFBbUM7UUFEL0QsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQUFVLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBbUI7UUFBVSw0QkFBdUIsR0FBdkIsdUJBQXVCLENBQXdCO1FBQ3pJLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFBUyxzQkFBaUIsR0FBakIsaUJBQWlCLENBQWtCO1FBYjFGLGdCQUFXLEdBQXVCLEVBQUUsQ0FBQztRQUNyQyxTQUFJLEdBQVcsb0JBQW9CLENBQUM7UUFFN0IsYUFBUSxHQUFnQixTQUFTLENBQUM7SUFZekMsQ0FBQztJQUVELGlEQUFlLEdBQWY7UUFDSSxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7SUFDM0IsQ0FBQztJQUVRLDBDQUFRLEdBQWY7SUFFQSxDQUFDO0lBQ0ssMENBQVEsR0FBZjtRQUNJLCtGQUErRjtRQUMvRiw0RUFBNEU7UUFDNUUsNEJBQTRCO1FBQzVCLFdBQVc7UUFDWCx1REFBdUQ7UUFDdkQsSUFBSTtRQUVKLE9BQU8sQ0FBQyxHQUFHLENBQUMsb0JBQW9CLENBQUUsQ0FBQztRQUVuQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsQ0FBQztJQUNwRSxDQUFDO0lBRUQsNkNBQVcsR0FBWDtRQUNJLDRDQUE0QztRQUM1QyxPQUFPLENBQUMsR0FBRyxDQUFDLDJCQUEy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dCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IFJvdXRlckV4dGVuc2lvbnMgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyXCI7XHJcbmltcG9ydCB7IExvY2F0aW9uIH0gZnJvbSBcIkBhbmd1bGFyL2NvbW1vblwiO1xyXG5pbXBvcnQgeyBTbmFja0JhciB9IGZyb20gXCJuYXRpdmVzY3JpcHQtc25hY2tiYXJcIjtcclxuaW1wb3J0ICogYXMgQXBwbGljYXRpb25TZXR0aW5ncyBmcm9tIFwiYXBwbGljYXRpb24tc2V0dGluZ3NcIjtcclxuaW1wb3J0IHsgY29ubmVjdGlvblR5cGUsIGdldENvbm5lY3Rpb25UeXBlIH0gZnJvbSBcImNvbm5lY3Rpdml0eVwiO1xyXG5pbXBvcnQgeyBBbmltYXRpb24gfSBmcm9tIFwidWkvYW5pbWF0aW9uXCI7XHJcbmltcG9ydCB7IFZpZXcgfSBmcm9tIFwidWkvY29yZS92aWV3XCI7XHJcbmltcG9ydCB7IHByb21wdCB9IGZyb20gXCJ1aS9kaWFsb2dzXCI7XHJcbmltcG9ydCB7IFBhZ2UgfSBmcm9tIFwidWkvcGFnZVwiO1xyXG5pbXBvcnQgeyBUZXh0RmllbGQgfSBmcm9tIFwidWkvdGV4dC1maWVsZFwiO1xyXG5cclxuaW1wb3J0IHsgVmFsdWVMaXN0LCBEcm9wRG93biB9IGZyb20gXCJuYXRpdmVzY3JpcHQtZHJvcC1kb3duXCI7XHJcbmltcG9ydCB7IFNlbGVjdGVkSW5kZXhDaGFuZ2VkRXZlbnREYXRhIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1kcm9wLWRvd25cIjtcclxuaW1wb3J0IHsgQ29vcGVyYXRpdmUgfSBmcm9tICcuLi8uLi9tb2RlbHMvaW5kZXgnO1xyXG5pbXBvcnQge0Nvb3BlcmF0aXZlU2VydmljZX0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL2Nvb3BlcmF0aXZlLnNlcnZpY2VcIjtcclxuaW1wb3J0IHtDb29wZXJhdGl2ZVN0YWZmU2VydmljZX0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL2Nvb3BlcmF0aXZlU3RhZmYuc2VydmljZVwiO1xyXG5cclxuaW1wb3J0IHtDb29wZXJhdGl2ZVN0YWZmLFZlcmlmeUF1dGh9IGZyb20gXCIuLi8uLi9tb2RlbHMvaW5kZXhcIjtcclxuXHJcbmltcG9ydCB7IEF1dG9Mb2dvdXRTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvYXV0b2xvZ291dC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgVG91Y2hHZXN0dXJlRXZlbnREYXRhIH0gZnJvbSBcInVpL2dlc3R1cmVzXCI7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXHJcbiAgICBzZWxlY3RvcjogXCJucy1jaGFuZ2VwYXNzd29yZFwiLFxyXG4gICAgdGVtcGxhdGVVcmw6IFwiY2hhbmdlcGFzc3dvcmQuY29tcG9uZW50Lmh0bWxcIixcclxuICAgIHN0eWxlVXJsczogW1wiLi9jaGFuZ2VwYXNzd29yZC1jb21tb24uY3NzXCIsIFwiLi9jaGFuZ2VwYXNzd29yZC5jb21wb25lbnQuY3NzXCJdLFxyXG59KVxyXG5cclxuZXhwb3J0IGNsYXNzIENoYW5nZVBhc3N3b3JkQ29tcG9uZW50IHtcclxuXHJcbiAgICBwdWJsaWMgaW5wdXQ6IGFueTtcclxuICAgIHNlbGVjdGVkQ29vcGVyYXRpdmVJbmRleDogbnVtYmVyIDtcclxuICAgIHNlbGVjdGVkQ29vcGVyYXRpdmUgOiBzdHJpbmc7XHJcbiAgICBzdGFmZklkOiBTdHJpbmc7XHJcbiAgICBjb29wZXJhdGl2ZTogQXJyYXk8Q29vcGVyYXRpdmU+ID0gW107XHJcbiAgICBoaW50OiBzdHJpbmcgPSBcIlNlbGVjdCBDb29wZXJhdGl2ZVwiO1xyXG4gICAgcHVibGljIGNvb3BlcmF0aXZlTGlzdDogVmFsdWVMaXN0PHN0cmluZz47XHJcbiAgICBwdWJsaWMgY3NzQ2xhc3M6IHN0cmluZyAgICAgID0gXCJkZWZhdWx0XCI7XHJcbiAgICBjb29wZXJhdGl2ZVN0YWZmOiBDb29wZXJhdGl2ZVN0YWZmO1xyXG4gICAgdmVyaWZ5QXV0aDogVmVyaWZ5QXV0aDtcclxuICAgIHRwYXNzOiBTdHJpbmc7XHJcbiAgICBucGFzczogU3RyaW5nO1xyXG4gICAgY25wYXNzOlN0cmluZztcclxuXHJcblxyXG5cclxuICAgIHB1YmxpYyBjb25zdHJ1Y3Rvcihwcml2YXRlIGxvY2F0aW9uOiBMb2NhdGlvbiwgcHJpdmF0ZSBjb29wZXJhdGl2ZVNlcnZpY2U6Q29vcGVyYXRpdmVTZXJ2aWNlLCBwcml2YXRlIGNvb3BlcmF0aXZlU3RhZmZTZXJ2aWNlOkNvb3BlcmF0aXZlU3RhZmZTZXJ2aWNlLFxyXG4gICAgICAgIHByaXZhdGUgcm91dGVyRXh0ZW5zaW9uczogUm91dGVyRXh0ZW5zaW9ucyxwcml2YXRlIGF1dG9Mb2dvdXRTZXJ2aWNlOkF1dG9Mb2dvdXRTZXJ2aWNlKSB7XHJcbiAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcclxuICAgICAgICB0aGlzLmdldENvb3BlcmF0aXZlKCk7XHJcbiAgIH1cclxuICAgXHJcbiAgICAgcHVibGljIG5nT25Jbml0KCkge1xyXG5cclxuICAgICB9XHJcbiAgICBwdWJsaWMgcmVnaXN0ZXIoKSB7XHJcbiAgICAgICAgLy8gaWYodGhpcy5pbnB1dC5maXJzdG5hbWUgJiYgdGhpcy5pbnB1dC5sYXN0bmFtZSAmJiB0aGlzLmlucHV0LmVtYWlsICYmIHRoaXMuaW5wdXQucGFzc3dvcmQpIHtcclxuICAgICAgICAvLyAgICAgQXBwbGljYXRpb25TZXR0aW5ncy5zZXRTdHJpbmcoXCJhY2NvdW50XCIsIEpTT04uc3RyaW5naWZ5KHRoaXMuaW5wdXQpKTtcclxuICAgICAgICAvLyAgICAgdGhpcy5sb2NhdGlvbi5iYWNrKCk7XHJcbiAgICAgICAgLy8gfSBlbHNlIHtcclxuICAgICAgICAvLyAgICAgKG5ldyBTbmFja0JhcigpKS5zaW1wbGUoXCJBbGwgRmllbGRzIFJlcXVpcmVkIVwiKTtcclxuICAgICAgICAvLyB9XHJcblxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiUmVhY2hpbmcgUmVnaXN0ZXIgXCIgKTtcclxuXHJcbiAgICAgICAgdGhpcy5nZXRDb29wZXJhdGl2ZVN0YWZmKHRoaXMuc3RhZmZJZCx0aGlzLnNlbGVjdGVkQ29vcGVyYXRpdmUpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uTmF2QnRuVGFwKCl7XHJcbiAgICAgICAgLy8gVGhpcyBjb2RlIHdpbGwgYmUgY2FsbGVkIG9ubHkgaW4gQW5kcm9pZC5cclxuICAgICAgICBjb25zb2xlLmxvZyhcIk5hdmlnYXRpb24gYnV0dG9uIHRhcHBlZCFcIik7XHJcbiAgICB9XHJcbiAgICBuZXh0KClcclxuICAgIHtcclxuICAgICAgICBcclxuICAgIH1cclxuICAgIHB1YmxpYyBnb0JhY2soKSB7XHJcbiAgICAgICAgdGhpcy5sb2NhdGlvbi5iYWNrKCk7XHJcbiAgICB9XHJcbiAgICBzdGFydEJhY2tncm91bmRBbmltYXRpb24oYmFja2dyb3VuZCkge1xyXG4gICAgICAgIGJhY2tncm91bmQuYW5pbWF0ZSh7XHJcbiAgICAgICAgICBzY2FsZTogeyB4OiAxLjAsIHk6IDEuMCB9LFxyXG4gICAgICAgICAgZHVyYXRpb246IDEwMDAwXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHB1YmxpYyBvbmNvb3BlcmF0aXZlY2hhbmdlKGFyZ3M6IFNlbGVjdGVkSW5kZXhDaGFuZ2VkRXZlbnREYXRhKSB7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coYERyb3AgRG93biBzZWxlY3RlZCBpbmRleCBjaGFuZ2VkICAke2FyZ3Mub2xkSW5kZXh9IHRvICR7YXJncy5uZXdJbmRleH0uIE5ldyB2YWx1ZSBpcyBcIiR7dGhpcy5zZXNzaW9uaXRlbXMuZ2V0VmFsdWUoXHJcbiAgICAgICAgLy8gICAgIGFyZ3MubmV3SW5kZXgpfVwiYCk7XHJcbiAgICAgIFxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiU2VsZWN0ZWQgSUQgXCIgKyBhcmdzLm5ld0luZGV4ICk7XHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRDb29wZXJhdGl2ZSA9IHRoaXMuY29vcGVyYXRpdmVMaXN0LmdldFZhbHVlKGFyZ3MubmV3SW5kZXgpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIlNlbGVjdGVkIElkIFZhbHVlICBcIiArICB0aGlzLnNlbGVjdGVkQ29vcGVyYXRpdmUgKTtcclxuICAgICAgICAgICBcclxuICAgICAgfVxyXG5cclxuICAgICAgZ2V0Q29vcGVyYXRpdmUoKXtcclxuICAgICAgICB0aGlzLmNvb3BlcmF0aXZlU2VydmljZS5nZXRBbGxDb29wZXJhdGl2ZSgpLnN1YnNjcmliZShcclxuICAgICAgICAgICAgZGF0YSA9PiB7IFxyXG4gICAgICAgICAgICAgY29uc29sZS5sb2coXCJDb29wZXJhdGl2ZSBMaXN0IFwiKyBKU09OLnN0cmluZ2lmeShkYXRhW1wiZGF0YVwiXSkgKTtcclxuICAgICAgIFxyXG4gICAgICAgICAgICAgdGhpcy5jb29wZXJhdGl2ZSA9IGRhdGFbXCJkYXRhXCJdO1xyXG5cclxuICAgICAgICAgICAgIHRoaXMuY29vcGVyYXRpdmVMaXN0ID0gbmV3IFZhbHVlTGlzdDxzdHJpbmc+KCk7XHJcbiAgICAgICAgICAgICBmb3IgKCBsZXQgbG9vcCA9IDA7IGxvb3AgPCB0aGlzLmNvb3BlcmF0aXZlLmxlbmd0aDsgbG9vcCsrICkge1xyXG4gICAgICAgICAgICAgICB0aGlzLmNvb3BlcmF0aXZlTGlzdC5wdXNoKHsgdmFsdWU6ICAgYCR7dGhpcy5jb29wZXJhdGl2ZVtsb29wXS5jb29wZXJhdGl2ZUlkfWAsXHJcbiAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6IGAke3RoaXMuY29vcGVyYXRpdmVbbG9vcF0uZmlyc3RfbmFtZX1gLFxyXG4gICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgfVxyXG4gICAgICAgICBcclxuICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICBlcnIgPT4ge1xyXG4gICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xyXG4gICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgKTtcdCAgXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0Q29vcGVyYXRpdmVTdGFmZihzdGFmZklkOlN0cmluZyxjb29wZXJhdGl2ZUlkOlN0cmluZyl7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJTdGFmZiBhbmQgQ29vcGVyYXRpdmVJZCBcIisgIHN0YWZmSWQgKyBcIiAtIFwiICsgY29vcGVyYXRpdmVJZCk7XHJcbiAgICAgICBcclxuXHJcbiAgICAgICAgdGhpcy5jb29wZXJhdGl2ZVN0YWZmU2VydmljZS5nZXRDb29wZXJhdGl2ZVN0YWZmKHN0YWZmSWQsY29vcGVyYXRpdmVJZCkuc3Vic2NyaWJlKFxyXG4gICAgICAgICAgICBkYXRhID0+IHsgXHJcbiAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkNvb3BlcmF0aXZlIFN0YWZmIFwiKyBKU09OLnN0cmluZ2lmeShkYXRhW1wiZGF0YVwiXSkgKTtcclxuICAgICAgIFxyXG4gICAgICAgICAgICAgdGhpcy5jb29wZXJhdGl2ZVN0YWZmID0gZGF0YVtcImRhdGFcIl07XHJcblxyXG4gICAgICAgICAgICAgY29uc29sZS5sb2coXCJWZXJpZnlpbmcgU3RhZmYgb3V0IHNpZGUgXCIgKyB0aGlzLmNvb3BlcmF0aXZlU3RhZmYuc3RhZmZJZCk7XHJcbiAgICAgICAgICAgICB0aGlzLnNlbmRWZXJpZnlBdXRoKHRoaXMuY29vcGVyYXRpdmVTdGFmZik7XHJcblxyXG4gICAgICAgICAgXHJcbiAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgIGVyciA9PiB7XHJcbiAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XHJcbiAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICApO1x0ICBcclxuICAgIH1cclxuXHJcbiAgICBzZW5kVmVyaWZ5QXV0aCh2ZXJpZnlBdXRoOiBDb29wZXJhdGl2ZVN0YWZmKXtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIlZlcmlmeSBcIisgIHZlcmlmeUF1dGguc3RhZmZJZCk7XHJcbiAgICAgICBcclxuXHJcbiAgICAgICAgdGhpcy5jb29wZXJhdGl2ZVN0YWZmU2VydmljZS52ZXJpZnlBdXRoVG9DcmVhdExhdGVyKHZlcmlmeUF1dGgpLnN1YnNjcmliZShcclxuICAgICAgICAgICAgZGF0YSA9PiB7IFxyXG4gICAgICAgICAgICAgY29uc29sZS5sb2coXCJWZXJ5IEF1dGggXCIrIEpTT04uc3RyaW5naWZ5KGRhdGFbXCJkYXRhXCJdKSApO1xyXG4gICAgICAgXHJcbiAgICAgICAgICAgICBcclxuXHJcbiAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICBlcnIgPT4ge1xyXG4gICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xyXG4gICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgKTtcdCAgXHJcbiAgICB9XHJcbiAgICAgIFxyXG4gICAgbmF2aWdhdGVCYWNrKCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiR28gQmFjayBCdXR0b24gQ2xpY2tlZFwiICk7XHJcbiAgICAgICAgdGhpcy5yb3V0ZXJFeHRlbnNpb25zLmJhY2tUb1ByZXZpb3VzUGFnZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uVG91Y2goYXJnczogVG91Y2hHZXN0dXJlRXZlbnREYXRhKSB7XHJcblxyXG4gICAgICAgXHJcbiAgICAgICAgdGhpcy5hdXRvTG9nb3V0U2VydmljZS5yZXNldCgpO1xyXG4gICAgIH1cclxuXHJcbn0iXX0=