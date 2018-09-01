"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("nativescript-angular/router");
var common_1 = require("@angular/common");
var router_2 = require("@angular/router");
var nativescript_drop_down_1 = require("nativescript-drop-down");
var cooperative_service_1 = require("../../services/cooperative.service");
var cooperativeStaff_service_1 = require("../../services/cooperativeStaff.service");
var member_service_1 = require("../../services/member.service");
var coopercooperative_service_1 = require("../../services/coopercooperative.service");
var nativescript_fancyalert_1 = require("nativescript-fancyalert");
var LS = require("nativescript-localstorage");
var autologout_service_1 = require("../../services/autologout.service");
var AddNewCooperativeComponent = /** @class */ (function () {
    function AddNewCooperativeComponent(location, cooperativeService, cooperativeStaffService, memberService, router, canActivate, cooperCooperativeService, routerExtensions, autoLogoutService) {
        this.location = location;
        this.cooperativeService = cooperativeService;
        this.cooperativeStaffService = cooperativeStaffService;
        this.memberService = memberService;
        this.router = router;
        this.canActivate = canActivate;
        this.cooperCooperativeService = cooperCooperativeService;
        this.routerExtensions = routerExtensions;
        this.autoLogoutService = autoLogoutService;
        this.cooperative = [];
        this.hint = "Select Cooperative";
        this.cssClass = "default";
        this.cooperId = "";
    }
    AddNewCooperativeComponent.prototype.ngAfterViewInit = function () {
        this.getCooperative();
    };
    AddNewCooperativeComponent.prototype.ngOnInit = function () {
        var dataObject = JSON.parse(LS.getItem('currentUser'));
        console.log("User ID " + dataObject._id);
        if (dataObject._id) {
            this.userId = dataObject._id;
            this.cooperId = dataObject.cooperId;
        }
    };
    AddNewCooperativeComponent.prototype.register = function () {
        // if(this.input.firstname && this.input.lastname && this.input.email && this.input.password) {
        //     ApplicationSettings.setString("account", JSON.stringify(this.input));
        //     this.location.back();
        // } else {
        //     (new SnackBar()).simple("All Fields Required!");
        // }
        console.log("Reaching Register ");
    };
    AddNewCooperativeComponent.prototype.onNavBtnTap = function () {
        // This code will be called only in Android.
        console.log("Navigation button tapped!");
    };
    AddNewCooperativeComponent.prototype.goBack = function () {
        this.location.back();
    };
    AddNewCooperativeComponent.prototype.startBackgroundAnimation = function (background) {
        background.animate({
            scale: { x: 1.0, y: 1.0 },
            duration: 10000
        });
    };
    AddNewCooperativeComponent.prototype.oncooperativechange = function (args) {
        // console.log(`Drop Down selected index changed  ${args.oldIndex} to ${args.newIndex}. New value is "${this.sessionitems.getValue(
        //     args.newIndex)}"`);
        console.log("Selected ID " + args.newIndex);
        this.selectedCooperative = this.cooperativeList.getValue(args.newIndex);
        console.log("Selected Id Value  " + this.selectedCooperative);
    };
    AddNewCooperativeComponent.prototype.add = function () {
        this.getCooperativeStaff(this.staffId, this.selectedCooperative, "Additions");
    };
    AddNewCooperativeComponent.prototype.getCooperative = function () {
        var _this = this;
        this.cooperativeService.getAllCooperative().subscribe(function (data) {
            console.log("Cooperative List " + JSON.stringify(data["data"]));
            _this.cooperative = data["data"];
            _this.cooperativeList = new nativescript_drop_down_1.ValueList();
            for (var loop = 0; loop < _this.cooperative.length; loop++) {
                _this.cooperativeList.push({
                    value: "" + _this.cooperative[loop].cooperativeId,
                    display: "" + _this.cooperative[loop].first_name,
                });
            }
        }, function (err) {
            console.log(err);
        });
    };
    AddNewCooperativeComponent.prototype.getCooperativeStaff = function (staffId, cooperativeId, mode) {
        var _this = this;
        console.log("Staff and CooperativeId " + staffId + " - " + cooperativeId);
        this.memberService.getCooperativeStaff(staffId, cooperativeId, mode, "", "cooperator").subscribe(function (data) {
            console.log("Cooperative Staff " + JSON.stringify(data["data"]));
            _this.addCooperCooperative(cooperativeId, staffId, _this.cooperId);
        }, function (err) {
            console.log(JSON.stringify(err));
            nativescript_fancyalert_1.TNSFancyAlert.showError("Error!", err.error.message, "Ok").then(function () {
            });
        });
    };
    AddNewCooperativeComponent.prototype.addCooperCooperative = function (cooperativeId, staffId, cooperId) {
        var _this = this;
        this.cooperCooperativeService.addCooperCooperative(cooperativeId, staffId, cooperId).subscribe(function (data) {
            nativescript_fancyalert_1.TNSFancyAlert.showSuccess("Success!", "Cooperative added successfuly", "Ok")
                .then(function () {
                _this.router.navigate(['/account']);
            });
        }, function (err) {
            console.log(JSON.stringify(err));
            nativescript_fancyalert_1.TNSFancyAlert.showError("Error!", err.error.message, "Ok").then(function () {
            });
        });
    };
    AddNewCooperativeComponent.prototype.sendVerifyAuth = function (verifyAuth) {
        console.log("Verify " + verifyAuth.staffId);
        this.cooperativeStaffService.verifyAuthToCreatLater(verifyAuth).subscribe(function (data) {
            console.log("Very Auth " + JSON.stringify(data["data"]));
        }, function (err) {
            console.log(err);
        });
    };
    AddNewCooperativeComponent.prototype.navigateBack = function () {
        console.log("Go Back Button Clicked");
        this.routerExtensions.backToPreviousPage();
    };
    AddNewCooperativeComponent.prototype.onTouch = function (args) {
        console.log("Page is touched");
        this.autoLogoutService.reset();
    };
    AddNewCooperativeComponent.prototype.onBottomNavigationTabSelected = function (args) {
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
    AddNewCooperativeComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: "ns-addnewcooperative",
            templateUrl: "./addnewcooperative.component.html",
            styleUrls: ["./addnewcooperative-common.css", "./addnewcooperative.component.css"],
        }),
        __metadata("design:paramtypes", [common_1.Location, cooperative_service_1.CooperativeService, cooperativeStaff_service_1.CooperativeStaffService,
            member_service_1.MemberService, router_2.Router, router_2.ActivatedRoute, coopercooperative_service_1.CooperCooperativeService,
            router_1.RouterExtensions, autologout_service_1.AutoLogoutService])
    ], AddNewCooperativeComponent);
    return AddNewCooperativeComponent;
}());
exports.AddNewCooperativeComponent = AddNewCooperativeComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRkbmV3Y29vcGVyYXRpdmUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYWRkbmV3Y29vcGVyYXRpdmUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWlFO0FBQ2pFLHNEQUErRDtBQUMvRCwwQ0FBMkM7QUFDM0MsMENBQXNFO0FBVXRFLGlFQUE2RDtBQUc3RCwwRUFBd0U7QUFDeEUsb0ZBQWtGO0FBSWxGLGdFQUE0RDtBQUM1RCxzRkFBaUY7QUFHakYsbUVBQXdEO0FBQ3hELElBQUksRUFBRSxHQUFHLE9BQU8sQ0FBRSwyQkFBMkIsQ0FBRSxDQUFDO0FBRWhELHdFQUFzRTtBQVd0RTtJQWVJLG9DQUEyQixRQUFrQixFQUFVLGtCQUFzQyxFQUFVLHVCQUFnRCxFQUMvSSxhQUEyQixFQUFVLE1BQWMsRUFBVSxXQUEyQixFQUFTLHdCQUFpRCxFQUNsSixnQkFBa0MsRUFBVSxpQkFBb0M7UUFGN0QsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQUFVLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBb0I7UUFBVSw0QkFBdUIsR0FBdkIsdUJBQXVCLENBQXlCO1FBQy9JLGtCQUFhLEdBQWIsYUFBYSxDQUFjO1FBQVUsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUFVLGdCQUFXLEdBQVgsV0FBVyxDQUFnQjtRQUFTLDZCQUF3QixHQUF4Qix3QkFBd0IsQ0FBeUI7UUFDbEoscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUFVLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUFYeEYsZ0JBQVcsR0FBdUIsRUFBRSxDQUFDO1FBQ3JDLFNBQUksR0FBVyxvQkFBb0IsQ0FBQztRQUU3QixhQUFRLEdBQVcsU0FBUyxDQUFDO1FBR3BDLGFBQVEsR0FBWSxFQUFFLENBQUM7SUFPdkIsQ0FBQztJQUVELG9EQUFlLEdBQWY7UUFDSSxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7SUFDMUIsQ0FBQztJQUVNLDZDQUFRLEdBQWY7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O0NBQUEsQUF6TkQsSUF5TkM7QUF6TlksZ0VBQTBCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIEFmdGVyVmlld0luaXQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBSb3V0ZXJFeHRlbnNpb25zIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlclwiO1xyXG5pbXBvcnQgeyBMb2NhdGlvbiB9IGZyb20gXCJAYW5ndWxhci9jb21tb25cIjtcclxuaW1wb3J0IHsgUm91dGVyLCBBY3RpdmF0ZWRSb3V0ZSwgQ2FuQWN0aXZhdGUgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XHJcbmltcG9ydCB7IFNuYWNrQmFyIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1zbmFja2JhclwiO1xyXG5pbXBvcnQgKiBhcyBBcHBsaWNhdGlvblNldHRpbmdzIGZyb20gXCJhcHBsaWNhdGlvbi1zZXR0aW5nc1wiO1xyXG5pbXBvcnQgeyBjb25uZWN0aW9uVHlwZSwgZ2V0Q29ubmVjdGlvblR5cGUgfSBmcm9tIFwiY29ubmVjdGl2aXR5XCI7XHJcbmltcG9ydCB7IEFuaW1hdGlvbiB9IGZyb20gXCJ1aS9hbmltYXRpb25cIjtcclxuaW1wb3J0IHsgVmlldyB9IGZyb20gXCJ1aS9jb3JlL3ZpZXdcIjtcclxuaW1wb3J0IHsgcHJvbXB0IH0gZnJvbSBcInVpL2RpYWxvZ3NcIjtcclxuaW1wb3J0IHsgUGFnZSB9IGZyb20gXCJ1aS9wYWdlXCI7XHJcbmltcG9ydCB7IFRleHRGaWVsZCB9IGZyb20gXCJ1aS90ZXh0LWZpZWxkXCI7XHJcblxyXG5pbXBvcnQgeyBWYWx1ZUxpc3QsIERyb3BEb3duIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1kcm9wLWRvd25cIjtcclxuaW1wb3J0IHsgU2VsZWN0ZWRJbmRleENoYW5nZWRFdmVudERhdGEgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWRyb3AtZG93blwiO1xyXG5pbXBvcnQgeyBDb29wZXJhdGl2ZSB9IGZyb20gJy4uLy4uL21vZGVscy9pbmRleCc7XHJcbmltcG9ydCB7IENvb3BlcmF0aXZlU2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9jb29wZXJhdGl2ZS5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IENvb3BlcmF0aXZlU3RhZmZTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL2Nvb3BlcmF0aXZlU3RhZmYuc2VydmljZVwiO1xyXG5cclxuaW1wb3J0IHsgQ29vcGVyYXRpdmVTdGFmZiwgVmVyaWZ5QXV0aCB9IGZyb20gXCIuLi8uLi9tb2RlbHMvaW5kZXhcIjtcclxuXHJcbmltcG9ydCB7TWVtYmVyU2VydmljZX0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL21lbWJlci5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7Q29vcGVyQ29vcGVyYXRpdmVTZXJ2aWNlfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvY29vcGVyY29vcGVyYXRpdmUuc2VydmljZVwiXHJcblxyXG5cclxuaW1wb3J0IHsgVE5TRmFuY3lBbGVydCB9IGZyb20gXCJuYXRpdmVzY3JpcHQtZmFuY3lhbGVydFwiO1xyXG5sZXQgTFMgPSByZXF1aXJlKCBcIm5hdGl2ZXNjcmlwdC1sb2NhbHN0b3JhZ2VcIiApO1xyXG5pbXBvcnQgeyBUb3VjaEdlc3R1cmVFdmVudERhdGEgfSBmcm9tIFwidWkvZ2VzdHVyZXNcIjtcclxuaW1wb3J0IHsgQXV0b0xvZ291dFNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9hdXRvbG9nb3V0LnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBCb3R0b21OYXZpZ2F0aW9uLCBCb3R0b21OYXZpZ2F0aW9uVGFiLCBPblRhYlNlbGVjdGVkRXZlbnREYXRhIH0gZnJvbSAnbmF0aXZlc2NyaXB0LWJvdHRvbS1uYXZpZ2F0aW9uJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcclxuICAgIHNlbGVjdG9yOiBcIm5zLWFkZG5ld2Nvb3BlcmF0aXZlXCIsXHJcbiAgICB0ZW1wbGF0ZVVybDogXCIuL2FkZG5ld2Nvb3BlcmF0aXZlLmNvbXBvbmVudC5odG1sXCIsXHJcbiAgICBzdHlsZVVybHM6IFtcIi4vYWRkbmV3Y29vcGVyYXRpdmUtY29tbW9uLmNzc1wiLCBcIi4vYWRkbmV3Y29vcGVyYXRpdmUuY29tcG9uZW50LmNzc1wiXSxcclxufSlcclxuXHJcblxyXG5leHBvcnQgY2xhc3MgQWRkTmV3Q29vcGVyYXRpdmVDb21wb25lbnQge1xyXG5cclxuICAgIHB1YmxpYyBpbnB1dDogYW55O1xyXG4gICAgc2VsZWN0ZWRDb29wZXJhdGl2ZUluZGV4OiBudW1iZXI7XHJcbiAgICBzZWxlY3RlZENvb3BlcmF0aXZlOiBzdHJpbmc7XHJcbiAgICBzdGFmZklkOiBTdHJpbmc7XHJcbiAgICBjb29wZXJhdGl2ZTogQXJyYXk8Q29vcGVyYXRpdmU+ID0gW107XHJcbiAgICBoaW50OiBzdHJpbmcgPSBcIlNlbGVjdCBDb29wZXJhdGl2ZVwiO1xyXG4gICAgcHVibGljIGNvb3BlcmF0aXZlTGlzdDogVmFsdWVMaXN0PHN0cmluZz47XHJcbiAgICBwdWJsaWMgY3NzQ2xhc3M6IHN0cmluZyA9IFwiZGVmYXVsdFwiO1xyXG4gICAgY29vcGVyYXRpdmVTdGFmZjogQ29vcGVyYXRpdmVTdGFmZjtcclxuICAgIHZlcmlmeUF1dGg6IFZlcmlmeUF1dGg7XHJcbiAgICBjb29wZXJJZCA6IFN0cmluZyA9IFwiXCI7XHJcbiAgICB1c2VySWQ6IFN0cmluZztcclxuXHJcbiAgICBwdWJsaWMgY29uc3RydWN0b3IocHJpdmF0ZSBsb2NhdGlvbjogTG9jYXRpb24sIHByaXZhdGUgY29vcGVyYXRpdmVTZXJ2aWNlOiBDb29wZXJhdGl2ZVNlcnZpY2UsIHByaXZhdGUgY29vcGVyYXRpdmVTdGFmZlNlcnZpY2U6IENvb3BlcmF0aXZlU3RhZmZTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBtZW1iZXJTZXJ2aWNlOk1lbWJlclNlcnZpY2UsIHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsIHByaXZhdGUgY2FuQWN0aXZhdGU6IEFjdGl2YXRlZFJvdXRlLHByaXZhdGUgY29vcGVyQ29vcGVyYXRpdmVTZXJ2aWNlOkNvb3BlckNvb3BlcmF0aXZlU2VydmljZSxcclxuICAgIHByaXZhdGUgcm91dGVyRXh0ZW5zaW9uczogUm91dGVyRXh0ZW5zaW9ucywgcHJpdmF0ZSBhdXRvTG9nb3V0U2VydmljZTogQXV0b0xvZ291dFNlcnZpY2UpIHtcclxuICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcclxuICAgICAgICB0aGlzLmdldENvb3BlcmF0aXZlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG5nT25Jbml0KCkge1xyXG5cclxuICAgICAgICB2YXIgZGF0YU9iamVjdCA9IEpTT04ucGFyc2UoTFMuZ2V0SXRlbSgnY3VycmVudFVzZXInKSk7XHJcblxyXG4gICAgICAgXHJcblxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiVXNlciBJRCBcIiArIGRhdGFPYmplY3QuX2lkKTtcclxuICAgICAgICAgIGlmKGRhdGFPYmplY3QuX2lkKVxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICAgIHRoaXMudXNlcklkID0gZGF0YU9iamVjdC5faWQ7XHJcbiAgICAgICAgICAgICAgdGhpcy5jb29wZXJJZCA9IGRhdGFPYmplY3QuY29vcGVySWQ7XHJcbiAgICAgICAgICAgICBcclxuICAgICAgICAgIH1cclxuXHJcbiAgICB9XHJcbiAgICBwdWJsaWMgcmVnaXN0ZXIoKSB7XHJcbiAgICAgICAgLy8gaWYodGhpcy5pbnB1dC5maXJzdG5hbWUgJiYgdGhpcy5pbnB1dC5sYXN0bmFtZSAmJiB0aGlzLmlucHV0LmVtYWlsICYmIHRoaXMuaW5wdXQucGFzc3dvcmQpIHtcclxuICAgICAgICAvLyAgICAgQXBwbGljYXRpb25TZXR0aW5ncy5zZXRTdHJpbmcoXCJhY2NvdW50XCIsIEpTT04uc3RyaW5naWZ5KHRoaXMuaW5wdXQpKTtcclxuICAgICAgICAvLyAgICAgdGhpcy5sb2NhdGlvbi5iYWNrKCk7XHJcbiAgICAgICAgLy8gfSBlbHNlIHtcclxuICAgICAgICAvLyAgICAgKG5ldyBTbmFja0JhcigpKS5zaW1wbGUoXCJBbGwgRmllbGRzIFJlcXVpcmVkIVwiKTtcclxuICAgICAgICAvLyB9XHJcblxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiUmVhY2hpbmcgUmVnaXN0ZXIgXCIpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBvbk5hdkJ0blRhcCgpIHtcclxuICAgICAgICAvLyBUaGlzIGNvZGUgd2lsbCBiZSBjYWxsZWQgb25seSBpbiBBbmRyb2lkLlxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiTmF2aWdhdGlvbiBidXR0b24gdGFwcGVkIVwiKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ29CYWNrKCkge1xyXG4gICAgICAgIHRoaXMubG9jYXRpb24uYmFjaygpO1xyXG4gICAgfVxyXG4gICAgc3RhcnRCYWNrZ3JvdW5kQW5pbWF0aW9uKGJhY2tncm91bmQpIHtcclxuICAgICAgICBiYWNrZ3JvdW5kLmFuaW1hdGUoe1xyXG4gICAgICAgICAgICBzY2FsZTogeyB4OiAxLjAsIHk6IDEuMCB9LFxyXG4gICAgICAgICAgICBkdXJhdGlvbjogMTAwMDBcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgb25jb29wZXJhdGl2ZWNoYW5nZShhcmdzOiBTZWxlY3RlZEluZGV4Q2hhbmdlZEV2ZW50RGF0YSkge1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGBEcm9wIERvd24gc2VsZWN0ZWQgaW5kZXggY2hhbmdlZCAgJHthcmdzLm9sZEluZGV4fSB0byAke2FyZ3MubmV3SW5kZXh9LiBOZXcgdmFsdWUgaXMgXCIke3RoaXMuc2Vzc2lvbml0ZW1zLmdldFZhbHVlKFxyXG4gICAgICAgIC8vICAgICBhcmdzLm5ld0luZGV4KX1cImApO1xyXG5cclxuICAgICAgICBjb25zb2xlLmxvZyhcIlNlbGVjdGVkIElEIFwiICsgYXJncy5uZXdJbmRleCk7XHJcbiAgICAgICAgdGhpcy5zZWxlY3RlZENvb3BlcmF0aXZlID0gdGhpcy5jb29wZXJhdGl2ZUxpc3QuZ2V0VmFsdWUoYXJncy5uZXdJbmRleCk7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJTZWxlY3RlZCBJZCBWYWx1ZSAgXCIgKyB0aGlzLnNlbGVjdGVkQ29vcGVyYXRpdmUpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBhZGQoKVxyXG4gICAge1xyXG5cclxuICAgICAgICB0aGlzLmdldENvb3BlcmF0aXZlU3RhZmYodGhpcy5zdGFmZklkLCB0aGlzLnNlbGVjdGVkQ29vcGVyYXRpdmUsXCJBZGRpdGlvbnNcIik7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0Q29vcGVyYXRpdmUoKSB7XHJcbiAgICAgICAgdGhpcy5jb29wZXJhdGl2ZVNlcnZpY2UuZ2V0QWxsQ29vcGVyYXRpdmUoKS5zdWJzY3JpYmUoXHJcbiAgICAgICAgICAgIGRhdGEgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJDb29wZXJhdGl2ZSBMaXN0IFwiICsgSlNPTi5zdHJpbmdpZnkoZGF0YVtcImRhdGFcIl0pKTtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvb3BlcmF0aXZlID0gZGF0YVtcImRhdGFcIl07XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5jb29wZXJhdGl2ZUxpc3QgPSBuZXcgVmFsdWVMaXN0PHN0cmluZz4oKTtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGxvb3AgPSAwOyBsb29wIDwgdGhpcy5jb29wZXJhdGl2ZS5sZW5ndGg7IGxvb3ArKykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29vcGVyYXRpdmVMaXN0LnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogYCR7dGhpcy5jb29wZXJhdGl2ZVtsb29wXS5jb29wZXJhdGl2ZUlkfWAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6IGAke3RoaXMuY29vcGVyYXRpdmVbbG9vcF0uZmlyc3RfbmFtZX1gLFxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuXHJcblxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBlcnIgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIGdldENvb3BlcmF0aXZlU3RhZmYoc3RhZmZJZDpTdHJpbmcsY29vcGVyYXRpdmVJZDpTdHJpbmcsIG1vZGU6IFN0cmluZyApe1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiU3RhZmYgYW5kIENvb3BlcmF0aXZlSWQgXCIrICBzdGFmZklkICsgXCIgLSBcIiArIGNvb3BlcmF0aXZlSWQpO1xyXG4gICAgICAgXHJcblxyXG4gICAgICAgIHRoaXMubWVtYmVyU2VydmljZS5nZXRDb29wZXJhdGl2ZVN0YWZmKHN0YWZmSWQsY29vcGVyYXRpdmVJZCxtb2RlLFwiXCIsXCJjb29wZXJhdG9yXCIpLnN1YnNjcmliZShcclxuICAgICAgICAgICAgZGF0YSA9PiB7IFxyXG4gICAgICAgICAgICAgY29uc29sZS5sb2coXCJDb29wZXJhdGl2ZSBTdGFmZiBcIisgSlNPTi5zdHJpbmdpZnkoZGF0YVtcImRhdGFcIl0pICk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFkZENvb3BlckNvb3BlcmF0aXZlKGNvb3BlcmF0aXZlSWQsc3RhZmZJZCx0aGlzLmNvb3BlcklkKTtcclxuICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgIGVyciA9PiB7XHJcbiAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KGVycikpO1xyXG4gICAgICAgICAgICAgICBUTlNGYW5jeUFsZXJ0LnNob3dFcnJvcihcIkVycm9yIVwiLCBlcnIuZXJyb3IubWVzc2FnZSwgXCJPa1wiKSAudGhlbiggKCkgPT4geyAvKiB1c2VyIHByZXNzZWQgdGhlIGJ1dHRvbiAqL1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICApO1x0ICBcclxuICAgIH1cclxuXHJcblxyXG4gICAgYWRkQ29vcGVyQ29vcGVyYXRpdmUoY29vcGVyYXRpdmVJZDpTdHJpbmcsc3RhZmZJZDpTdHJpbmcsIGNvb3BlcklkOiBTdHJpbmcgKXtcclxuICAgICAgIFxyXG4gICAgICAgXHJcblxyXG4gICAgICAgIHRoaXMuY29vcGVyQ29vcGVyYXRpdmVTZXJ2aWNlLmFkZENvb3BlckNvb3BlcmF0aXZlKGNvb3BlcmF0aXZlSWQsc3RhZmZJZCxjb29wZXJJZCkuc3Vic2NyaWJlKFxyXG4gICAgICAgICAgICBkYXRhID0+IHsgXHJcbiAgICAgICAgICAgICBcclxuICAgICAgICAgICAgXHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICBUTlNGYW5jeUFsZXJ0LnNob3dTdWNjZXNzKFwiU3VjY2VzcyFcIiwgXCJDb29wZXJhdGl2ZSBhZGRlZCBzdWNjZXNzZnVseVwiLCBcIk9rXCIpXHJcbiAgICAgICAgICAgICAudGhlbiggKCkgPT4geyAvKiB1c2VyIHByZXNzZWQgdGhlIGJ1dHRvbiAqL1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnL2FjY291bnQnXSk7XHJcbiAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9KTtcclxuXHJcblxyXG5cclxuICAgICAgICAgIFxyXG4gICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICBlcnIgPT4ge1xyXG4gICAgICAgICAgICAgICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShlcnIpKTtcclxuICAgICAgICAgICAgICAgVE5TRmFuY3lBbGVydC5zaG93RXJyb3IoXCJFcnJvciFcIiwgZXJyLmVycm9yLm1lc3NhZ2UsIFwiT2tcIikgLnRoZW4oICgpID0+IHsgLyogdXNlciBwcmVzc2VkIHRoZSBidXR0b24gKi9cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICApO1x0ICBcclxuICAgIH1cclxuXHJcbiAgICBzZW5kVmVyaWZ5QXV0aCh2ZXJpZnlBdXRoOiBDb29wZXJhdGl2ZVN0YWZmKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJWZXJpZnkgXCIgKyB2ZXJpZnlBdXRoLnN0YWZmSWQpO1xyXG5cclxuXHJcbiAgICAgICAgdGhpcy5jb29wZXJhdGl2ZVN0YWZmU2VydmljZS52ZXJpZnlBdXRoVG9DcmVhdExhdGVyKHZlcmlmeUF1dGgpLnN1YnNjcmliZShcclxuICAgICAgICAgICAgZGF0YSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlZlcnkgQXV0aCBcIiArIEpTT04uc3RyaW5naWZ5KGRhdGFbXCJkYXRhXCJdKSk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGVyciA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgbmF2aWdhdGVCYWNrKCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiR28gQmFjayBCdXR0b24gQ2xpY2tlZFwiICk7XHJcbiAgICAgICAgdGhpcy5yb3V0ZXJFeHRlbnNpb25zLmJhY2tUb1ByZXZpb3VzUGFnZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uVG91Y2goYXJnczogVG91Y2hHZXN0dXJlRXZlbnREYXRhKSB7XHJcblxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiUGFnZSBpcyB0b3VjaGVkXCIpO1xyXG4gICAgICAgdGhpcy5hdXRvTG9nb3V0U2VydmljZS5yZXNldCgpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uQm90dG9tTmF2aWdhdGlvblRhYlNlbGVjdGVkKGFyZ3M6IE9uVGFiU2VsZWN0ZWRFdmVudERhdGEpOiB2b2lkIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhgVGFiIHNlbGVjdGVkOiAgJHthcmdzLm9sZEluZGV4fWApO1xyXG4gICAgXHJcbiAgICAgIFxyXG4gICAgICAgIGlmKGFyZ3MubmV3SW5kZXggPT0gMClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAvLyB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbXCJcIl0pO1xyXG4gICAgICAgICAgLy90aGlzLm1haW50YWIubmF0aXZlRWxlbWVudC5zZWxlY3RlZEluZGV4ICA9IDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYoYXJncy5uZXdJbmRleCA9PSAxKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbXCIvYXBwcm92ZVwiXSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYoYXJncy5uZXdJbmRleCA9PSAyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgLy8gdGhpcy5tYWludGFiLm5hdGl2ZUVsZW1lbnQuc2VsZWN0ZWRJbmRleCAgPSAxO1xyXG4gICAgICAgICAgIC8vdGhpcy5yb3V0ZXIubmF2aWdhdGUoW1wiL3Nob3BcIl0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmKGFyZ3MubmV3SW5kZXggPT0gMylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW1wiL2FjY291bnRcIl0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxufSJdfQ==