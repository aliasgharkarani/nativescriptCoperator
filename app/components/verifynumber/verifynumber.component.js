"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var common_1 = require("@angular/common");
var member_service_1 = require("../../services/member.service");
var auth_service_1 = require("../../services/auth.service");
var LS = require("nativescript-localstorage");
var VerifyNumberComponent = /** @class */ (function () {
    function VerifyNumberComponent(location, memberService, authService, router, activatedRoute) {
        this.location = location;
        this.memberService = memberService;
        this.authService = authService;
        this.router = router;
        this.activatedRoute = activatedRoute;
        this.cooperative = [];
        this.hint = "Select Cooperative";
        this.cssClass = "default";
        this.phoneNumber = "08060933727";
        this.isedit = false;
        this.input = {
            "firstname": "",
            "lastname": "",
            "email": "",
            "password": ""
        };
    }
    VerifyNumberComponent.prototype.ngAfterViewInit = function () {
    };
    VerifyNumberComponent.prototype.ngOnInit = function () {
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
    VerifyNumberComponent.prototype.enablePhoneText = function () {
        this.isedit = !this.isedit;
    };
    VerifyNumberComponent.prototype.onNavBtnTap = function () {
        // This code will be called only in Android.
        console.log("Navigation button tapped!");
    };
    VerifyNumberComponent.prototype.goBack = function () {
        this.location.back();
    };
    VerifyNumberComponent.prototype.startBackgroundAnimation = function (background) {
        background.animate({
            scale: { x: 1.0, y: 1.0 },
            duration: 10000
        });
    };
    VerifyNumberComponent.prototype.oncooperativechange = function (args) {
        // console.log(`Drop Down selected index changed  ${args.oldIndex} to ${args.newIndex}. New value is "${this.sessionitems.getValue(
        //     args.newIndex)}"`);
        console.log("Selected ID " + args.newIndex);
        this.selectedCooperative = this.cooperativeList.getValue(args.newIndex);
        console.log("Selected Id Value  " + this.selectedCooperative);
    };
    VerifyNumberComponent.prototype.editPhoneNumber = function (userId, phoneNo) {
        var _this = this;
        console.log("Edit Phone Number " + userId);
        this.memberService.editPhoneNumber(userId, phoneNo).subscribe(function (data) {
            console.log("Very Auth " + JSON.stringify(data["data"]));
            //send OTP
            _this.sendOTP(userId);
            if (_this.userMode == "PhoneVerify") {
                LS.removeItem('currentUser');
                LS.setItem('currentUser', JSON.stringify(data["data"]));
                _this.router.navigate(['/otp']);
            }
        }, function (err) {
            console.log(err);
        });
    };
    VerifyNumberComponent.prototype.sendOTP = function (userId) {
        console.log("Edit Phone Number " + userId);
        this.authService.sendToken(userId).subscribe(function (data) {
            console.log("OTP Send" + JSON.stringify(data["data"]));
            //send OTP
        }, function (err) {
            console.log(err);
        });
    };
    VerifyNumberComponent.prototype.sendcode = function () {
        this.editPhoneNumber(this.userId, this.phoneNumber);
    };
    VerifyNumberComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: "ns-verifynumber",
            templateUrl: "verifynumber.component.html",
            styleUrls: ["./verifynumber-common.css", "./verifynumber.component.css"],
        }),
        __metadata("design:paramtypes", [common_1.Location, member_service_1.MemberService, auth_service_1.AuthService, router_1.Router, router_1.ActivatedRoute])
    ], VerifyNumberComponent);
    return VerifyNumberComponent;
}());
exports.VerifyNumberComponent = VerifyNumberComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmVyaWZ5bnVtYmVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInZlcmlmeW51bWJlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBK0Q7QUFDL0QsMENBQXlEO0FBQ3pELDBDQUEyQztBQWMzQyxnRUFBNEQ7QUFDNUQsNERBQXdEO0FBR3hELElBQUksRUFBRSxHQUFHLE9BQU8sQ0FBRSwyQkFBMkIsQ0FBRSxDQUFDO0FBUWhEO0lBaUJJLCtCQUEyQixRQUFrQixFQUFVLGFBQTJCLEVBQVMsV0FBdUIsRUFBUyxNQUFjLEVBQVUsY0FBOEI7UUFBdEosYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQUFVLGtCQUFhLEdBQWIsYUFBYSxDQUFjO1FBQVMsZ0JBQVcsR0FBWCxXQUFXLENBQVk7UUFBUyxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQVUsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBWGpMLGdCQUFXLEdBQXVCLEVBQUUsQ0FBQztRQUNyQyxTQUFJLEdBQVcsb0JBQW9CLENBQUM7UUFFN0IsYUFBUSxHQUFnQixTQUFTLENBQUM7UUFHekMsZ0JBQVcsR0FBVyxhQUFhLENBQUM7UUFDcEMsV0FBTSxHQUFZLEtBQUssQ0FBQztRQUtwQixJQUFJLENBQUMsS0FBSyxHQUFHO1lBQ1QsV0FBVyxFQUFFLEVBQUU7WUFDZixVQUFVLEVBQUUsRUFBRTtZQUNkLE9BQU8sRUFBRSxFQUFFO1lBQ1gsVUFBVSxFQUFFLEVBQUU7U0FDakIsQ0FBQTtJQUNMLENBQUM7SUFFRCwrQ0FBZSxHQUFmO0lBRUQsQ0FBQztJQUVRLHdDQUFRLEdBQWY7UUFDRyxJQUFJLFVBQVUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztRQUl2RCxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDdkMsRUFBRSxDQUFB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LENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFFLENBQUM7WUFFdkQsVUFBVTtRQUVULENBQUMsRUFDRCxVQUFBLEdBQUc7WUFDRixPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRWYsQ0FBQyxDQUNMLENBQUM7SUFDVixDQUFDO0lBQ0Qsd0NBQVEsR0FBUjtRQUVJLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7SUFFdkQsQ0FBQztJQW5JUSxxQkFBcUI7UUFQakMsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixRQUFRLEVBQUUsaUJBQWlCO1lBQzNCLFdBQVcsRUFBRSw2QkFBNkI7WUFDMUMsU0FBUyxFQUFFLENBQUMsMkJBQTJCLEVBQUUsOEJBQThCLENBQUM7U0FDM0UsQ0FBQzt5Q0FtQnVDLGlCQUFRLEVBQXdCLDhCQUFhLEVBQXFCLDBCQUFXLEVBQWlCLGVBQU0sRUFBMEIsdUJBQWM7T0FqQnhLLHFCQUFxQixDQXNJakM7SUFBRCw0QkFBQztDQUFBLEFBdElELElBc0lDO0FBdElZLHNEQUFxQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCxPbkluaXQsQWZ0ZXJWaWV3SW5pdCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IFJvdXRlciwgQWN0aXZhdGVkUm91dGUgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XHJcbmltcG9ydCB7IExvY2F0aW9uIH0gZnJvbSBcIkBhbmd1bGFyL2NvbW1vblwiO1xyXG5pbXBvcnQgeyBTbmFja0JhciB9IGZyb20gXCJuYXRpdmVzY3JpcHQtc25hY2tiYXJcIjtcclxuaW1wb3J0ICogYXMgQXBwbGljYXRpb25TZXR0aW5ncyBmcm9tIFwiYXBwbGljYXRpb24tc2V0dGluZ3NcIjtcclxuaW1wb3J0IHsgY29ubmVjdGlvblR5cGUsIGdldENvbm5lY3Rpb25UeXBlIH0gZnJvbSBcImNvbm5lY3Rpdml0eVwiO1xyXG5pbXBvcnQgeyBBbmltYXRpb24gfSBmcm9tIFwidWkvYW5pbWF0aW9uXCI7XHJcbmltcG9ydCB7IFZpZXcgfSBmcm9tIFwidWkvY29yZS92aWV3XCI7XHJcbmltcG9ydCB7IHByb21wdCB9IGZyb20gXCJ1aS9kaWFsb2dzXCI7XHJcbmltcG9ydCB7IFBhZ2UgfSBmcm9tIFwidWkvcGFnZVwiO1xyXG5pbXBvcnQgeyBUZXh0RmllbGQgfSBmcm9tIFwidWkvdGV4dC1maWVsZFwiO1xyXG5cclxuaW1wb3J0IHsgVmFsdWVMaXN0LCBEcm9wRG93biB9IGZyb20gXCJuYXRpdmVzY3JpcHQtZHJvcC1kb3duXCI7XHJcbmltcG9ydCB7IFNlbGVjdGVkSW5kZXhDaGFuZ2VkRXZlbnREYXRhIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1kcm9wLWRvd25cIjtcclxuaW1wb3J0IHsgQ29vcGVyYXRpdmUgfSBmcm9tICcuLi8uLi9tb2RlbHMvaW5kZXgnO1xyXG5cclxuaW1wb3J0IHtNZW1iZXJTZXJ2aWNlfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvbWVtYmVyLnNlcnZpY2VcIjtcclxuaW1wb3J0IHtBdXRoU2VydmljZX0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL2F1dGguc2VydmljZVwiO1xyXG5cclxuaW1wb3J0IHtDb29wZXJhdGl2ZVN0YWZmLFZlcmlmeUF1dGh9IGZyb20gXCIuLi8uLi9tb2RlbHMvaW5kZXhcIjtcclxubGV0IExTID0gcmVxdWlyZSggXCJuYXRpdmVzY3JpcHQtbG9jYWxzdG9yYWdlXCIgKTtcclxuQENvbXBvbmVudCh7XHJcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxyXG4gICAgc2VsZWN0b3I6IFwibnMtdmVyaWZ5bnVtYmVyXCIsXHJcbiAgICB0ZW1wbGF0ZVVybDogXCJ2ZXJpZnludW1iZXIuY29tcG9uZW50Lmh0bWxcIixcclxuICAgIHN0eWxlVXJsczogW1wiLi92ZXJpZnludW1iZXItY29tbW9uLmNzc1wiLCBcIi4vdmVyaWZ5bnVtYmVyLmNvbXBvbmVudC5jc3NcIl0sXHJcbn0pXHJcblxyXG5leHBvcnQgY2xhc3MgVmVyaWZ5TnVtYmVyQ29tcG9uZW50IHtcclxuXHJcbiAgICBwdWJsaWMgaW5wdXQ6IGFueTtcclxuICAgIHNlbGVjdGVkQ29vcGVyYXRpdmVJbmRleDogbnVtYmVyIDtcclxuICAgIHNlbGVjdGVkQ29vcGVyYXRpdmUgOiBzdHJpbmc7XHJcbiAgICBzdGFmZklkOiBTdHJpbmc7XHJcbiAgICBjb29wZXJhdGl2ZTogQXJyYXk8Q29vcGVyYXRpdmU+ID0gW107XHJcbiAgICBoaW50OiBzdHJpbmcgPSBcIlNlbGVjdCBDb29wZXJhdGl2ZVwiO1xyXG4gICAgcHVibGljIGNvb3BlcmF0aXZlTGlzdDogVmFsdWVMaXN0PHN0cmluZz47XHJcbiAgICBwdWJsaWMgY3NzQ2xhc3M6IHN0cmluZyAgICAgID0gXCJkZWZhdWx0XCI7XHJcbiAgICBjb29wZXJhdGl2ZVN0YWZmOiBDb29wZXJhdGl2ZVN0YWZmO1xyXG4gICAgdmVyaWZ5QXV0aDogVmVyaWZ5QXV0aDtcclxuICAgIHBob25lTnVtYmVyOiBTdHJpbmcgPSBcIjA4MDYwOTMzNzI3XCI7XHJcbiAgICBpc2VkaXQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHVzZXJJZDogU3RyaW5nO1xyXG4gICAgdXNlck1vZGU6IFN0cmluZztcclxuXHJcbiAgICBwdWJsaWMgY29uc3RydWN0b3IocHJpdmF0ZSBsb2NhdGlvbjogTG9jYXRpb24sIHByaXZhdGUgbWVtYmVyU2VydmljZTpNZW1iZXJTZXJ2aWNlLHByaXZhdGUgYXV0aFNlcnZpY2U6QXV0aFNlcnZpY2UscHJpdmF0ZSByb3V0ZXI6IFJvdXRlciwgcHJpdmF0ZSBhY3RpdmF0ZWRSb3V0ZTogQWN0aXZhdGVkUm91dGUpIHtcclxuICAgICAgICB0aGlzLmlucHV0ID0ge1xyXG4gICAgICAgICAgICBcImZpcnN0bmFtZVwiOiBcIlwiLFxyXG4gICAgICAgICAgICBcImxhc3RuYW1lXCI6IFwiXCIsXHJcbiAgICAgICAgICAgIFwiZW1haWxcIjogXCJcIixcclxuICAgICAgICAgICAgXCJwYXNzd29yZFwiOiBcIlwiXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcclxuICAgICAgIFxyXG4gICB9XHJcbiAgIFxyXG4gICAgIHB1YmxpYyBuZ09uSW5pdCgpIHtcclxuICAgICAgICB2YXIgZGF0YU9iamVjdCA9IEpTT04ucGFyc2UoTFMuZ2V0SXRlbSgnY3VycmVudFVzZXInKSk7XHJcblxyXG4gICAgICAgXHJcblxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiVXNlciBJRCBcIiArIGRhdGFPYmplY3QuX2lkKTtcclxuICAgICAgICAgIGlmKGRhdGFPYmplY3QuX2lkKVxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICAgIHRoaXMudXNlcklkID0gZGF0YU9iamVjdC5faWQ7XHJcbiAgICAgICAgICAgICAgdGhpcy51c2VyTW9kZSA9IGRhdGFPYmplY3QudXNlck1vZGU7XHJcbiAgICAgICAgICAgICBcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBpZihkYXRhT2JqZWN0LnBob25lTm8pXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgdGhpcy5waG9uZU51bWJlciA9IGRhdGFPYmplY3QucGhvbmVObztcclxuICAgICAgICAgIH1cclxuICAgICB9XHJcblxyXG4gICAgIGVuYWJsZVBob25lVGV4dCgpXHJcbiAgICAge1xyXG4gICAgICAgICB0aGlzLmlzZWRpdCA9ICF0aGlzLmlzZWRpdDtcclxuICAgICB9XHJcbiAgICBcclxuICAgIG9uTmF2QnRuVGFwKCl7XHJcbiAgICAgICAgLy8gVGhpcyBjb2RlIHdpbGwgYmUgY2FsbGVkIG9ubHkgaW4gQW5kcm9pZC5cclxuICAgICAgICBjb25zb2xlLmxvZyhcIk5hdmlnYXRpb24gYnV0dG9uIHRhcHBlZCFcIik7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdvQmFjaygpIHtcclxuICAgICAgICB0aGlzLmxvY2F0aW9uLmJhY2soKTtcclxuICAgIH1cclxuICAgIHN0YXJ0QmFja2dyb3VuZEFuaW1hdGlvbihiYWNrZ3JvdW5kKSB7XHJcbiAgICAgICAgYmFja2dyb3VuZC5hbmltYXRlKHtcclxuICAgICAgICAgIHNjYWxlOiB7IHg6IDEuMCwgeTogMS4wIH0sXHJcbiAgICAgICAgICBkdXJhdGlvbjogMTAwMDBcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG5cclxuICAgICAgcHVibGljIG9uY29vcGVyYXRpdmVjaGFuZ2UoYXJnczogU2VsZWN0ZWRJbmRleENoYW5nZWRFdmVudERhdGEpIHtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhgRHJvcCBEb3duIHNlbGVjdGVkIGluZGV4IGNoYW5nZWQgICR7YXJncy5vbGRJbmRleH0gdG8gJHthcmdzLm5ld0luZGV4fS4gTmV3IHZhbHVlIGlzIFwiJHt0aGlzLnNlc3Npb25pdGVtcy5nZXRWYWx1ZShcclxuICAgICAgICAvLyAgICAgYXJncy5uZXdJbmRleCl9XCJgKTtcclxuICAgICAgXHJcbiAgICAgICAgY29uc29sZS5sb2coXCJTZWxlY3RlZCBJRCBcIiArIGFyZ3MubmV3SW5kZXggKTtcclxuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZENvb3BlcmF0aXZlID0gdGhpcy5jb29wZXJhdGl2ZUxpc3QuZ2V0VmFsdWUoYXJncy5uZXdJbmRleCk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiU2VsZWN0ZWQgSWQgVmFsdWUgIFwiICsgIHRoaXMuc2VsZWN0ZWRDb29wZXJhdGl2ZSApO1xyXG4gICAgICAgICAgIFxyXG4gICAgICB9XHJcblxyXG4gICBcclxuXHJcblxyXG4gICAgZWRpdFBob25lTnVtYmVyKHVzZXJJZDpTdHJpbmcsIHBob25lTm86IFN0cmluZyl7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJFZGl0IFBob25lIE51bWJlciBcIisgIHVzZXJJZCk7XHJcbiAgICAgICBcclxuXHJcbiAgICAgICAgdGhpcy5tZW1iZXJTZXJ2aWNlLmVkaXRQaG9uZU51bWJlcih1c2VySWQscGhvbmVObykuc3Vic2NyaWJlKFxyXG4gICAgICAgICAgICBkYXRhID0+IHsgXHJcbiAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlZlcnkgQXV0aCBcIisgSlNPTi5zdHJpbmdpZnkoZGF0YVtcImRhdGFcIl0pICk7XHJcblxyXG4gICAgICAgICAgICAgLy9zZW5kIE9UUFxyXG4gICAgICAgICAgICAgIHRoaXMuc2VuZE9UUCh1c2VySWQpO1xyXG4gICAgICAgICAgICAgaWYodGhpcy51c2VyTW9kZSA9PSBcIlBob25lVmVyaWZ5XCIpXHJcbiAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgTFMucmVtb3ZlSXRlbSgnY3VycmVudFVzZXInKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgTFMuc2V0SXRlbSgnY3VycmVudFVzZXInLCBKU09OLnN0cmluZ2lmeShkYXRhW1wiZGF0YVwiXSkpO1xyXG5cclxuICAgICAgICAgICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy9vdHAnXSk7XHJcbiAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgZXJyID0+IHtcclxuICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcclxuICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICk7XHQgIFxyXG4gICAgfVxyXG4gICAgXHJcblxyXG4gICAgc2VuZE9UUCh1c2VySWQ6U3RyaW5nKXtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIkVkaXQgUGhvbmUgTnVtYmVyIFwiKyAgdXNlcklkKTtcclxuICAgICAgIFxyXG5cclxuICAgICAgICB0aGlzLmF1dGhTZXJ2aWNlLnNlbmRUb2tlbih1c2VySWQpLnN1YnNjcmliZShcclxuICAgICAgICAgICAgZGF0YSA9PiB7IFxyXG4gICAgICAgICAgICAgY29uc29sZS5sb2coXCJPVFAgU2VuZFwiKyBKU09OLnN0cmluZ2lmeShkYXRhW1wiZGF0YVwiXSkgKTtcclxuXHJcbiAgICAgICAgICAgICAvL3NlbmQgT1RQXHJcbiAgICAgICBcclxuICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgIGVyciA9PiB7XHJcbiAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XHJcbiAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICApO1x0ICBcclxuICAgIH1cclxuICAgIHNlbmRjb2RlKCl7XHJcblxyXG4gICAgICAgIHRoaXMuZWRpdFBob25lTnVtYmVyKHRoaXMudXNlcklkLHRoaXMucGhvbmVOdW1iZXIpO1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG4gICAgICBcclxuXHJcbn0iXX0=