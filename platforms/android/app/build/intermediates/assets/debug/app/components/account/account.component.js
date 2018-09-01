"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("nativescript-angular/router");
var router_2 = require("@angular/router");
var page_1 = require("ui/page");
var cooperative_service_1 = require("../../services/cooperative.service");
var auth_service_1 = require("../../services/auth.service");
var nativescript_loading_indicator_1 = require("nativescript-loading-indicator");
var loader = new nativescript_loading_indicator_1.LoadingIndicator();
var LS = require("nativescript-localstorage");
var autologout_service_1 = require("../../services/autologout.service");
var AccountComponent = /** @class */ (function () {
    function AccountComponent(router, page, cooperativeService, authService, route, routerExtensions, _changeDetectionRef, zone, autoLogoutService) {
        this.router = router;
        this.page = page;
        this.cooperativeService = cooperativeService;
        this.authService = authService;
        this.route = route;
        this.routerExtensions = routerExtensions;
        this._changeDetectionRef = _changeDetectionRef;
        this.zone = zone;
        this.autoLogoutService = autoLogoutService;
        this.hasImage = false;
    }
    AccountComponent.prototype.ngOnInit = function () {
        // this.page.actionBarHidden = true;
        // if(ApplicationSettings.getBoolean("authenticated", false)) {
        //     this.router.navigate(["/secure"], { clearHistory: true });
        // }
        // this.getCooperative();
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
        var dataObject = JSON.parse(LS.getItem('currentUser'));
        console.log("Profile log " + JSON.stringify(dataObject));
        if (dataObject._id) {
            this.userId = dataObject._id;
            this.cooperId = dataObject.cooperId;
            this.loginImage64 = dataObject.profilePixURL;
            if (this.loginImage64) {
                this.hasImage = true;
            }
        }
        this.currentUser = dataObject;
    };
    AccountComponent.prototype.startBackgroundAnimation = function (background) {
        background.animate({
            scale: { x: 1.0, y: 1.0 },
            duration: 10000
        });
    };
    AccountComponent.prototype.bottomNavigationLoaded = function (args) {
        //this.bottomBar.nativeElement.on('tabSelected', 2);
        this.bottomBar.nativeElement.selectTab(3);
    };
    AccountComponent.prototype.onBottomNavigationTabSelected = function (args) {
        console.log("Tab selected:  " + args.oldIndex);
        if (args.newIndex == 0) {
            this.router.navigate([""]);
        }
        else if (args.newIndex == 1) {
            this.router.navigate(["/approve"]);
        }
        else if (args.newIndex == 2) {
            this.router.navigate(["/shop"]);
        }
        else if (args.newIndex == 3) {
            this.router.navigate(["/account"]);
        }
    };
    AccountComponent.prototype.navigateBack = function () {
        console.log("Go Back Button Clicked");
        this.routerExtensions.backToPreviousPage();
    };
    AccountComponent.prototype.logout = function () {
        // clear token remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        localStorage.removeItem('currentUserToken');
        this.router.navigate(['/login']);
    };
    AccountComponent.prototype.onTouch = function (args) {
        console.log("Page is touched");
        this.autoLogoutService.reset();
    };
    __decorate([
        core_1.ViewChild('bottomNavigation'),
        __metadata("design:type", core_1.ElementRef)
    ], AccountComponent.prototype, "bottomBar", void 0);
    AccountComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: "ns-account",
            templateUrl: "./account.component.html",
            styleUrls: ["./account-common.css", "./account.component.css"],
        }),
        __metadata("design:paramtypes", [router_1.RouterExtensions, page_1.Page, cooperative_service_1.CooperativeService, auth_service_1.AuthService,
            router_2.ActivatedRoute, router_1.RouterExtensions,
            core_1.ChangeDetectorRef,
            core_1.NgZone, autologout_service_1.AutoLogoutService])
    ], AccountComponent);
    return AccountComponent;
}());
exports.AccountComponent = AccountComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWNjb3VudC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhY2NvdW50LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUF5SDtBQUN6SCxzREFBK0Q7QUFJL0QsMENBQXlEO0FBT3pELGdDQUErQjtBQU8vQiwwRUFBc0U7QUFDdEUsNERBQXdEO0FBR3hELGlGQUFnRTtBQUVoRSxJQUFJLE1BQU0sR0FBRyxJQUFJLGlEQUFnQixFQUFFLENBQUM7QUFDcEMsSUFBSSxFQUFFLEdBQUcsT0FBTyxDQUFFLDJCQUEyQixDQUFFLENBQUM7QUFJaEQsd0VBQXNFO0FBWXRFO0lBZ0JJLDBCQUEyQixNQUF3QixFQUFTLElBQVUsRUFBVSxrQkFBc0MsRUFBVSxXQUF1QixFQUMzSSxLQUFxQixFQUFTLGdCQUFrQyxFQUNoRSxtQkFBc0MsRUFDdEMsSUFBWSxFQUFVLGlCQUFvQztRQUgzQyxXQUFNLEdBQU4sTUFBTSxDQUFrQjtRQUFTLFNBQUksR0FBSixJQUFJLENBQU07UUFBVSx1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW9CO1FBQVUsZ0JBQVcsR0FBWCxXQUFXLENBQVk7UUFDM0ksVUFBSyxHQUFMLEtBQUssQ0FBZ0I7UUFBUyxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQ2hFLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBbUI7UUFDdEMsU0FBSSxHQUFKLElBQUksQ0FBUTtRQUFVLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUFadEUsYUFBUSxHQUFZLEtBQUssQ0FBQztJQWdCMUIsQ0FBQztJQUdNLG1DQUFRLEdBQWY7UUFDSSxvQ0FBb0M7UUFDcEMsK0RBQStEO1FBQy9ELGlFQUFpRTtRQUNqRSxJQUFJO1FBRUoseUJBQXlCO1FBQ3pCLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxJQUFJLEdBQUcsQ0FBQztRQUVyRSxJ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aEMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ2xDLENBQUM7SUEvRjhCO1FBQTlCLGdCQUFTLENBQUMsa0JBQWtCLENBQUM7a0NBQVksaUJBQVU7dURBQUM7SUFkNUMsZ0JBQWdCO1FBUjVCLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsUUFBUSxFQUFFLFlBQVk7WUFDdEIsV0FBVyxFQUFFLDBCQUEwQjtZQUN2QyxTQUFTLEVBQUUsQ0FBQyxzQkFBc0IsRUFBRSx5QkFBeUIsQ0FBQztTQUNqRSxDQUFDO3lDQW1CcUMseUJBQWdCLEVBQWUsV0FBSSxFQUE4Qix3Q0FBa0IsRUFBc0IsMEJBQVc7WUFDcEksdUJBQWMsRUFBMkIseUJBQWdCO1lBQzNDLHdCQUFpQjtZQUNoQyxhQUFNLEVBQTZCLHNDQUFpQjtPQW5CN0QsZ0JBQWdCLENBK0c1QjtJQUFELHVCQUFDO0NBQUEsQUEvR0QsSUErR0M7QUEvR1ksNENBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsQ2hhbmdlRGV0ZWN0b3JSZWYsQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksTmdab25lLFZpZXdDaGlsZCxFbGVtZW50UmVmICB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IFJvdXRlckV4dGVuc2lvbnMgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyXCI7XHJcbmltcG9ydCB7IFNuYWNrQmFyIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1zbmFja2JhclwiO1xyXG5pbXBvcnQgKiBhcyBBcHBsaWNhdGlvblNldHRpbmdzIGZyb20gXCJhcHBsaWNhdGlvbi1zZXR0aW5nc1wiO1xyXG5cclxuaW1wb3J0IHsgUm91dGVyLCBBY3RpdmF0ZWRSb3V0ZSB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcclxuaW1wb3J0IHsgQ29sb3IgfSBmcm9tIFwiY29sb3JcIjtcclxuXHJcbmltcG9ydCB7IGNvbm5lY3Rpb25UeXBlLCBnZXRDb25uZWN0aW9uVHlwZSB9IGZyb20gXCJjb25uZWN0aXZpdHlcIjtcclxuaW1wb3J0IHsgQW5pbWF0aW9uIH0gZnJvbSBcInVpL2FuaW1hdGlvblwiO1xyXG5pbXBvcnQgeyBWaWV3IH0gZnJvbSBcInVpL2NvcmUvdmlld1wiO1xyXG5pbXBvcnQgeyBwcm9tcHQgfSBmcm9tIFwidWkvZGlhbG9nc1wiO1xyXG5pbXBvcnQgeyBQYWdlIH0gZnJvbSBcInVpL3BhZ2VcIjtcclxuaW1wb3J0IHsgVGV4dEZpZWxkIH0gZnJvbSBcInVpL3RleHQtZmllbGRcIjtcclxuaW1wb3J0IHsgVG91Y2hHZXN0dXJlRXZlbnREYXRhIH0gZnJvbSBcInVpL2dlc3R1cmVzXCI7XHJcblxyXG5pbXBvcnQgeyBhbGVydCB9IGZyb20gXCIuLi8uLi9zaGFyZWRcIjtcclxuXHJcbmltcG9ydCB7IENvb3BlcmF0aXZlIH0gZnJvbSAnLi4vLi4vbW9kZWxzL2luZGV4JztcclxuaW1wb3J0IHtDb29wZXJhdGl2ZVNlcnZpY2V9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9jb29wZXJhdGl2ZS5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7QXV0aFNlcnZpY2V9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9hdXRoLnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgQm90dG9tTmF2aWdhdGlvbiwgQm90dG9tTmF2aWdhdGlvblRhYiwgT25UYWJTZWxlY3RlZEV2ZW50RGF0YSB9IGZyb20gJ25hdGl2ZXNjcmlwdC1ib3R0b20tbmF2aWdhdGlvbic7XHJcblxyXG5pbXBvcnQge0xvYWRpbmdJbmRpY2F0b3J9IGZyb20gXCJuYXRpdmVzY3JpcHQtbG9hZGluZy1pbmRpY2F0b3JcIjtcclxuXHJcbnZhciBsb2FkZXIgPSBuZXcgTG9hZGluZ0luZGljYXRvcigpO1xyXG5sZXQgTFMgPSByZXF1aXJlKCBcIm5hdGl2ZXNjcmlwdC1sb2NhbHN0b3JhZ2VcIiApO1xyXG5cclxuXHJcbmltcG9ydCB7IFROU0ZhbmN5QWxlcnQsIFROU0ZhbmN5QWxlcnRCdXR0b24gfSBmcm9tIFwibmF0aXZlc2NyaXB0LWZhbmN5YWxlcnRcIjtcclxuaW1wb3J0IHsgQXV0b0xvZ291dFNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9hdXRvbG9nb3V0LnNlcnZpY2UnO1xyXG5cclxuXHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXHJcbiAgICBzZWxlY3RvcjogXCJucy1hY2NvdW50XCIsXHJcbiAgICB0ZW1wbGF0ZVVybDogXCIuL2FjY291bnQuY29tcG9uZW50Lmh0bWxcIixcclxuICAgIHN0eWxlVXJsczogW1wiLi9hY2NvdW50LWNvbW1vbi5jc3NcIiwgXCIuL2FjY291bnQuY29tcG9uZW50LmNzc1wiXSxcclxufSlcclxuXHJcblxyXG5leHBvcnQgY2xhc3MgQWNjb3VudENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcblxyXG4gICAgcHVibGljIGlucHV0OiBhbnk7XHJcbiAgICByZXR1cm5Vcmw6IHN0cmluZztcclxuICAgIHRva2VuOiBzdHJpbmc7XHJcbiAgICBwYXNzd29yZDogc3RyaW5nO1xyXG5cclxuICAgIGhhc0ltYWdlOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBsb2dpbkltYWdlNjQ6IFN0cmluZztcclxuICBcclxuICAgIGN1cnJlbnRVc2VyOiB7XCJjb29wZXJJZFwiOiBcIlwiLFwicGhvbmVOb1wiOiBcIlwiLFwiZmlyc3ROYW1lXCI6IFwiXCIsXCJsYXN0TmFtZVwiOiBcIlwiLFwiZW1haWxcIjogXCJcIixcInByb2ZpbGVQaXhVUkxcIjpcIlwifTtcclxuICAgIHVzZXJJZDogU3RyaW5nO1xyXG4gICAgY29vcGVySWQ6IFN0cmluZztcclxuXHJcbiAgICBAVmlld0NoaWxkKCdib3R0b21OYXZpZ2F0aW9uJykgYm90dG9tQmFyOiBFbGVtZW50UmVmO1xyXG5cclxuICAgIHB1YmxpYyBjb25zdHJ1Y3Rvcihwcml2YXRlIHJvdXRlcjogUm91dGVyRXh0ZW5zaW9ucyxwcml2YXRlIHBhZ2U6IFBhZ2UsIHByaXZhdGUgY29vcGVyYXRpdmVTZXJ2aWNlOiBDb29wZXJhdGl2ZVNlcnZpY2UsIHByaXZhdGUgYXV0aFNlcnZpY2U6QXV0aFNlcnZpY2UsXHJcbiAgICAgICAgcHJpdmF0ZSByb3V0ZTogQWN0aXZhdGVkUm91dGUscHJpdmF0ZSByb3V0ZXJFeHRlbnNpb25zOiBSb3V0ZXJFeHRlbnNpb25zLFxyXG4gICAgICAgIHByaXZhdGUgX2NoYW5nZURldGVjdGlvblJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXHJcbiAgICAgICAgcHJpdmF0ZSB6b25lOiBOZ1pvbmUsIHByaXZhdGUgYXV0b0xvZ291dFNlcnZpY2U6IEF1dG9Mb2dvdXRTZXJ2aWNlXHJcbiAgICAgICAgXHJcbiAgICAgICApIHtcclxuICAgICAgXHJcbiAgICB9XHJcblxyXG5cclxuICAgIHB1YmxpYyBuZ09uSW5pdCgpIHtcclxuICAgICAgICAvLyB0aGlzLnBhZ2UuYWN0aW9uQmFySGlkZGVuID0gdHJ1ZTtcclxuICAgICAgICAvLyBpZihBcHBsaWNhdGlvblNldHRpbmdzLmdldEJvb2xlYW4oXCJhdXRoZW50aWNhdGVkXCIsIGZhbHNlKSkge1xyXG4gICAgICAgIC8vICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbXCIvc2VjdXJlXCJdLCB7IGNsZWFySGlzdG9yeTogdHJ1ZSB9KTtcclxuICAgICAgICAvLyB9XHJcblxyXG4gICAgICAgIC8vIHRoaXMuZ2V0Q29vcGVyYXRpdmUoKTtcclxuICAgICAgICB0aGlzLnJldHVyblVybCA9IHRoaXMucm91dGUuc25hcHNob3QucXVlcnlQYXJhbXNbJ3JldHVyblVybCddIHx8ICcvJztcclxuXHJcbiAgICAgICAgdmFyIGRhdGFPYmplY3QgPSBKU09OLnBhcnNlKExTLmdldEl0ZW0oJ2N1cnJlbnRVc2VyJykpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiUHJvZmlsZSBsb2cgXCIgKyBKU09OLnN0cmluZ2lmeShkYXRhT2JqZWN0KSk7XHJcbiAgICAgICAgaWYoZGF0YU9iamVjdC5faWQpXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgdGhpcy51c2VySWQgPSBkYXRhT2JqZWN0Ll9pZDtcclxuICAgICAgICAgICAgICB0aGlzLmNvb3BlcklkID0gZGF0YU9iamVjdC5jb29wZXJJZDtcclxuICAgICAgICAgICAgICB0aGlzLmxvZ2luSW1hZ2U2NCA9IGRhdGFPYmplY3QucHJvZmlsZVBpeFVSTDtcclxuXHJcbiAgICAgICAgICAgICAgaWYodGhpcy5sb2dpbkltYWdlNjQpXHJcbiAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICB0aGlzLmhhc0ltYWdlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICBcclxuICAgICAgICAgIH1cclxuICAgICAgICB0aGlzLmN1cnJlbnRVc2VyID0gZGF0YU9iamVjdDtcclxuXHJcblxyXG4gICAgfVxyXG5cclxuICAgIFxyXG5cclxuICAgICBzdGFydEJhY2tncm91bmRBbmltYXRpb24oYmFja2dyb3VuZCkge1xyXG4gICAgICAgIGJhY2tncm91bmQuYW5pbWF0ZSh7XHJcbiAgICAgICAgICBzY2FsZTogeyB4OiAxLjAsIHk6IDEuMCB9LFxyXG4gICAgICAgICAgZHVyYXRpb246IDEwMDAwXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGJvdHRvbU5hdmlnYXRpb25Mb2FkZWQoYXJnczogT25UYWJTZWxlY3RlZEV2ZW50RGF0YSlcclxuICAgICAge1xyXG4gICAgICAgLy90aGlzLmJvdHRvbUJhci5uYXRpdmVFbGVtZW50Lm9uKCd0YWJTZWxlY3RlZCcsIDIpO1xyXG4gICAgICAgdGhpcy5ib3R0b21CYXIubmF0aXZlRWxlbWVudC5zZWxlY3RUYWIoMyk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIG9uQm90dG9tTmF2aWdhdGlvblRhYlNlbGVjdGVkKGFyZ3M6IE9uVGFiU2VsZWN0ZWRFdmVudERhdGEpOiB2b2lkIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhgVGFiIHNlbGVjdGVkOiAgJHthcmdzLm9sZEluZGV4fWApO1xyXG5cclxuICAgICAgICBpZihhcmdzLm5ld0luZGV4ID09IDApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFtcIlwiXSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYoYXJncy5uZXdJbmRleCA9PSAxKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbXCIvYXBwcm92ZVwiXSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYoYXJncy5uZXdJbmRleCA9PSAyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbXCIvc2hvcFwiXSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYoYXJncy5uZXdJbmRleCA9PSAzKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbXCIvYWNjb3VudFwiXSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICBuYXZpZ2F0ZUJhY2soKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJHbyBCYWNrIEJ1dHRvbiBDbGlja2VkXCIgKTtcclxuICAgICAgICB0aGlzLnJvdXRlckV4dGVuc2lvbnMuYmFja1RvUHJldmlvdXNQYWdlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgbG9nb3V0KCk6IHZvaWQge1xyXG4gICAgICAgIC8vIGNsZWFyIHRva2VuIHJlbW92ZSB1c2VyIGZyb20gbG9jYWwgc3RvcmFnZSB0byBsb2cgdXNlciBvdXRcclxuICAgICAgICBcclxuICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnY3VycmVudFVzZXInKTtcclxuICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnY3VycmVudFVzZXJUb2tlbicpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnL2xvZ2luJ10pO1xyXG4gICAgXHJcbiAgICB9XHJcblxyXG4gICAgb25Ub3VjaChhcmdzOiBUb3VjaEdlc3R1cmVFdmVudERhdGEpIHtcclxuXHJcbiAgICAgICAgY29uc29sZS5sb2coXCJQYWdlIGlzIHRvdWNoZWRcIik7XHJcbiAgICAgICB0aGlzLmF1dG9Mb2dvdXRTZXJ2aWNlLnJlc2V0KCk7XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG4iXX0=