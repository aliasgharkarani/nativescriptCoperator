"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var platform_1 = require("platform");
var connectivity_1 = require("connectivity");
var page_1 = require("ui/page");
var cooperative_service_1 = require("../../services/cooperative.service");
var auth_service_1 = require("../../services/auth.service");
var audittrail_service_1 = require("../../services/audittrail.service");
var nativescript_fancyalert_1 = require("nativescript-fancyalert");
var nativescript_loading_indicator_1 = require("nativescript-loading-indicator");
var loader = new nativescript_loading_indicator_1.LoadingIndicator();
var application = require("application");
var application_1 = require("application");
// import * as dialogs from "ui/dialogs";
// import { ModalDialogService,ModalDialogOptions } from "nativescript-angular/directives/dialogs";
// import { ModalComponent } from "../../app.modal";
var options = {
    message: 'Loading...',
    progress: 0.65,
    android: {
        indeterminate: true,
        cancelable: true,
        cancelListener: function (dialog) { console.log("Loading cancelled"); },
        max: 100,
        progressNumberFormat: "%1d/%2d",
        progressPercentFormat: 0.53,
        progressStyle: 1,
        secondaryProgress: 1,
        color: "#4B9ED6",
    },
    ios: {
        details: "Additional detail note!",
        margin: 10,
        dimBackground: true,
        color: "#4B9ED6",
        // background box around indicator
        // hideBezel will override this if true
        backgroundColor: "yellow",
        userInteractionEnabled: false,
        hideBezel: true,
    }
};
var DeviceInfo = /** @class */ (function () {
    function DeviceInfo(model, deviceType, os, osVersion, sdkVersion, language, manufacturer, uuid) {
        this.model = model;
        this.deviceType = deviceType;
        this.os = os;
        this.osVersion = osVersion;
        this.sdkVersion = sdkVersion;
        this.language = language;
        this.manufacturer = manufacturer;
        this.uuid = uuid;
    }
    return DeviceInfo;
}());
var ScreenInfo = /** @class */ (function () {
    function ScreenInfo(heightDIPs, heightPixels, scale, widthDIPs, widthPixels) {
        this.heightDIPs = heightDIPs;
        this.heightPixels = heightPixels;
        this.scale = scale;
        this.widthDIPs = widthDIPs;
        this.widthPixels = widthPixels;
    }
    return ScreenInfo;
}());
var LoginComponent = /** @class */ (function () {
    // private modal: ModalDialogService, private vcRef: ViewContainerRef 
    function LoginComponent(route, router, page, cooperativeService, authService, auditTrailService) {
        this.route = route;
        this.router = router;
        this.page = page;
        this.cooperativeService = cooperativeService;
        this.authService = authService;
        this.auditTrailService = auditTrailService;
        this.deviceInformation = { "model": "", "deviceType": "", "os": "", "osVersion": "", "sdkVersion": "", "language": "", "manufacturer": "", "uuid": "" };
        this.screenInformation = { "heightDIPs": 0, "heightPixels": 0, "scale": 0, "widthDIPs": 0, "widthPixels": 0 };
        this.auditTrail = { "cooperId": "", "ipAddress": "", "loginTime": "", "sessionTime": "", "location": "", "model": "", "deviceType": "", "os": "", "osVersion": "", "sdkVersion": "", "language": "", "manufacturer": "", "uuid": "", "heightDIPs": 0, "heightPixels": 0, "scale": 0, "widthDIPs": 0, "widthPixels": 0 };
        this.deviceInformation = new DeviceInfo(platform_1.device.model, platform_1.device.deviceType, platform_1.device.os, platform_1.device.osVersion, platform_1.device.sdkVersion, platform_1.device.language, platform_1.device.manufacturer, platform_1.device.uuid);
        this.screenInformation = new ScreenInfo(platform_1.screen.mainScreen.heightDIPs, platform_1.screen.mainScreen.heightPixels, platform_1.screen.mainScreen.scale, platform_1.screen.mainScreen.widthDIPs, platform_1.screen.mainScreen.widthPixels);
        // console.log("Device UUID " + this.deviceInformation.model);
        // this.auditTrail.model = this.deviceInformation.model;
        // this.auditTrail.os = this.deviceInformation.os;
        // this.auditTrail.osVersion = this.deviceInformation.osVersion;
        // this.auditTrail.sdkVersion = this.deviceInformation.sdkVersion;
        // this.auditTrail.language = this.deviceInformation.language;
        // this.auditTrail.manufacturer = this.deviceInformation.manufacturer;
        // this.auditTrail.uuid = this.deviceInformation.uuid;
        // this.auditTrail.heightDIPs = this.screenInformation.heightDIPs;
        // this.auditTrail.heightPixels = this.screenInformation.heightPixels;
        // this.auditTrail.scale = this.screenInformation.scale;
        // this.auditTrail.widthDIPs = this.screenInformation.widthDIPs;
        // this.auditTrail.widthPixels = this.screenInformation.widthPixels;
    }
    LoginComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.page.actionBarHidden = true;
        // if(ApplicationSettings.getBoolean("authenticated", false)) {
        //     this.router.navigate(["/secure"], { clearHistory: true });
        // }
        // this.getCooperative();
        //this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
        console.log("Routing to page " + this.returnUrl);
        if (!platform_1.isAndroid) {
            return;
        }
        application.android.on(application_1.AndroidApplication.activityBackPressedEvent, function (data) {
            // if (this.router.isActive("/login", false)) {
            //   data.cancel = true; // prevents default back button behavior
            //   //this.logout();
            //   this.router.navigate(["/login"]);
            // }
            if (_this.router.isActive("/", false)) {
                data.cancel = true; // prevents default back button behavior
                //this.logout();
                //this.router.navigate(["/login"]);
            }
            // if (this.router.isActive("/shop", false)) {
            //   data.cancel = true; // prevents default back button behavior
            //   //this.logout();
            //   //this.router.navigate(["/login"]);
            // }
            // if (this.router.isActive("/buy", false)) {
            //   data.cancel = true; // prevents default back button behavior
            //   this.router.navigate(["/"]);
            // }
        });
        // alert("Device Model " + this.deviceInformation.model);
        console.log("Device UUID " + this.auditTrail.model);
        this.auditTrail.model = platform_1.device.model;
        this.auditTrail.deviceType = platform_1.device.deviceType;
        this.auditTrail.os = platform_1.device.os;
        this.auditTrail.osVersion = platform_1.device.osVersion;
        this.auditTrail.sdkVersion = platform_1.device.sdkVersion;
        this.auditTrail.language = platform_1.device.language;
        this.auditTrail.manufacturer = platform_1.device.manufacturer;
        this.auditTrail.uuid = platform_1.device.uuid;
        this.auditTrail.heightDIPs = platform_1.screen.mainScreen.heightDIPs;
        this.auditTrail.heightPixels = platform_1.screen.mainScreen.heightPixels;
        this.auditTrail.scale = platform_1.screen.mainScreen.scale;
        this.auditTrail.widthDIPs = platform_1.screen.mainScreen.widthDIPs;
        this.auditTrail.widthPixels = platform_1.screen.mainScreen.widthPixels;
    };
    // public login() {
    //     if(this.input.email && this.input.password) {
    //         let account = JSON.parse(ApplicationSettings.getString("account", "{}"));
    //         if(this.input.email == account.email && this.input.password == account.password) {
    //             ApplicationSettings.setBoolean("authenticated", true);
    //             this.router.navigate(["/secure"], { clearHistory: true });
    //         } else {
    //             (new SnackBar()).simple("Incorrect Credentials!");
    //         }
    //     } else {
    //         (new SnackBar()).simple("All Fields Required!");
    //     }
    // }
    LoginComponent.prototype.login = function () {
        var _this = this;
        if (connectivity_1.getConnectionType() === connectivity_1.connectionType.none) {
            // alert("Cooper Switch requires an internet connection to log in.");
            nativescript_fancyalert_1.TNSFancyAlert.showError("Error!", "Cooper Switch requires an internet connection to log in.", "Ok");
            return;
        }
        //this.loading = true;
        loader.show(options);
        console.log("Login Reaching " + this.username + " Password" + this.password);
        this.authService.login(this.username, this.password)
            .subscribe(function (data) {
            //this.isAuthenticating = false;
            /// console.log("login data " + data);
            _this.auditTrail.cooperId = _this.username;
            _this.createAuditTrail();
            ///this.authService.checkRegistration();
            _this.router.navigate([_this.returnUrl]);
            loader.hide();
        }, function (error) {
            //this.alertService.error(error);
            nativescript_fancyalert_1.TNSFancyAlert.showError("Error!", error.error.message, "Ok");
            console.log("Error " + JSON.stringify(error));
            loader.hide();
            //  this.isAuthenticating = false;
            // this.loading = false;
        });
    };
    LoginComponent.prototype.getCooperative = function () {
        this.cooperativeService.getAllCooperative().subscribe(function (data) {
            console.log("Cooperative List " + JSON.stringify(data["data"]));
        }, function (err) {
            console.log(err);
        });
    };
    LoginComponent.prototype.getSystemConfig = function () {
        var _this = this;
        this.authService.systemconfig().subscribe(function (data) {
            console.log("System Config " + JSON.stringify(data["data"]));
            _this.systemConfig = data["data"][0];
        }, function (err) {
            console.log(err);
        });
    };
    LoginComponent.prototype.startBackgroundAnimation = function (background) {
        background.animate({
            scale: { x: 1.0, y: 1.0 },
            duration: 10000
        });
    };
    LoginComponent.prototype.createAuditTrail = function () {
        console.log("Reaching Audit Trail ");
        this.auditTrailService.createAuditTrail(this.auditTrail).subscribe(function (data) {
            console.log("Audit Trail " + JSON.stringify(data["data"]));
        }, function (err) {
            console.log(err);
        });
    };
    LoginComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: "ns-login",
            templateUrl: "./login.component.html",
            styleUrls: ["./login-common.css", "./login.component.css"],
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute, router_1.Router, page_1.Page, cooperative_service_1.CooperativeService, auth_service_1.AuthService,
            audittrail_service_1.AuditTrailService])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibG9naW4uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQW1FO0FBRW5FLDBDQUF5RDtBQUV6RCxxQ0FBNEQ7QUFFNUQsNkNBQWlFO0FBSWpFLGdDQUErQjtBQU8vQiwwRUFBc0U7QUFDdEUsNERBQXdEO0FBQ3hELHdFQUFzRTtBQUV0RSxtRUFBd0Q7QUFFdkQsaUZBQWdFO0FBR2pFLElBQUksTUFBTSxHQUFHLElBQUksaURBQWdCLEVBQUUsQ0FBQztBQUdwQyx5Q0FBMkM7QUFDM0MsMkNBQXNGO0FBTXRGLHlDQUF5QztBQUN6QyxtR0FBbUc7QUFDbkcsb0RBQW9EO0FBQ3BELElBQUksT0FBTyxHQUFHO0lBQ1YsT0FBTyxFQUFFLFlBQVk7SUFDckIsUUFBUSxFQUFFLElBQUk7SUFDZCxPQUFPLEVBQUU7UUFDUCxhQUFhLEVBQUUsSUFBSTtRQUNuQixVQUFVLEVBQUUsSUFBSTtRQUNoQixjQUFjLEVBQUUsVUFBUyxNQUFNLElBQUksT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFBLENBQUMsQ0FBQztRQUNyRSxHQUFHLEVBQUUsR0FBRztRQUNSLG9CQUFvQixFQUFFLFNBQVM7UUFDL0IscUJBQXFCLEVBQUUsSUFBSTtRQUMzQixhQUFhLEVBQUUsQ0FBQztRQUNoQixpQkFBaUIsRUFBRSxDQUFDO1FBQ3BCLEtBQUssRUFBRSxTQUFTO0tBQ2pCO0lBQ0QsR0FBRyxFQUFFO1FBQ0gsT0FBTyxFQUFFLHlCQUF5QjtRQUNsQyxNQUFNLEVBQUUsRUFBRTtRQUNWLGFBQWEsRUFBRSxJQUFJO1FBQ25CLEtBQUssRUFBRSxTQUFTO1FBQ2hCLGtDQUFrQztRQUNsQyx1Q0FBdUM7UUFDdkMsZUFBZSxFQUFFLFFBQVE7UUFDekIsc0JBQXNCLEVBQUUsS0FBSztRQUM3QixTQUFTLEVBQUUsSUFBSTtLQUdoQjtDQUNGLENBQUM7QUFFRjtJQUNF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Q0F1UTFCO0lBQUQscUJBQUM7Q0FBQSxBQXZRRCxJQXVRQztBQXZRWSx3Q0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LFZpZXdDb250YWluZXJSZWYgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5cclxuaW1wb3J0IHsgUm91dGVyLCBBY3RpdmF0ZWRSb3V0ZSB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcclxuaW1wb3J0IHsgQ29sb3IgfSBmcm9tIFwiY29sb3JcIjtcclxuaW1wb3J0IHsgaXNBbmRyb2lkLGlzSU9TLCBkZXZpY2UsIHNjcmVlbiAgfSBmcm9tIFwicGxhdGZvcm1cIjtcclxuXHJcbmltcG9ydCB7IGNvbm5lY3Rpb25UeXBlLCBnZXRDb25uZWN0aW9uVHlwZSB9IGZyb20gXCJjb25uZWN0aXZpdHlcIjtcclxuaW1wb3J0IHsgQW5pbWF0aW9uIH0gZnJvbSBcInVpL2FuaW1hdGlvblwiO1xyXG5pbXBvcnQgeyBWaWV3IH0gZnJvbSBcInVpL2NvcmUvdmlld1wiO1xyXG5pbXBvcnQgeyBwcm9tcHQgfSBmcm9tIFwidWkvZGlhbG9nc1wiO1xyXG5pbXBvcnQgeyBQYWdlIH0gZnJvbSBcInVpL3BhZ2VcIjtcclxuaW1wb3J0IHsgVGV4dEZpZWxkIH0gZnJvbSBcInVpL3RleHQtZmllbGRcIjtcclxuXHJcblxyXG5pbXBvcnQgeyBhbGVydCB9IGZyb20gXCIuLi8uLi9zaGFyZWRcIjtcclxuXHJcbmltcG9ydCB7QXVkaXRUcmFpbCwgQ29vcGVyYXRpdmUgfSBmcm9tICcuLi8uLi9tb2RlbHMvaW5kZXgnO1xyXG5pbXBvcnQge0Nvb3BlcmF0aXZlU2VydmljZX0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL2Nvb3BlcmF0aXZlLnNlcnZpY2VcIjtcclxuaW1wb3J0IHtBdXRoU2VydmljZX0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL2F1dGguc2VydmljZVwiO1xyXG5pbXBvcnQgeyBBdWRpdFRyYWlsU2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9hdWRpdHRyYWlsLnNlcnZpY2VcIjtcclxuXHJcbmltcG9ydCB7IFROU0ZhbmN5QWxlcnQgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWZhbmN5YWxlcnRcIjtcclxuXHJcbiBpbXBvcnQge0xvYWRpbmdJbmRpY2F0b3J9IGZyb20gXCJuYXRpdmVzY3JpcHQtbG9hZGluZy1pbmRpY2F0b3JcIjtcclxuIGltcG9ydCB7U3lzdGVtQ29uZmlndXJhdGlvbn0gZnJvbSBcIi4uLy4uL21vZGVscy9pbmRleFwiO1xyXG5cclxudmFyIGxvYWRlciA9IG5ldyBMb2FkaW5nSW5kaWNhdG9yKCk7XHJcblxyXG5cclxuaW1wb3J0ICogYXMgYXBwbGljYXRpb24gZnJvbSBcImFwcGxpY2F0aW9uXCI7XHJcbmltcG9ydCB7IEFuZHJvaWRBcHBsaWNhdGlvbiwgQW5kcm9pZEFjdGl2aXR5QmFja1ByZXNzZWRFdmVudERhdGEgfSBmcm9tIFwiYXBwbGljYXRpb25cIjtcclxuXHJcblxyXG5cclxuXHJcblxyXG4vLyBpbXBvcnQgKiBhcyBkaWFsb2dzIGZyb20gXCJ1aS9kaWFsb2dzXCI7XHJcbi8vIGltcG9ydCB7IE1vZGFsRGlhbG9nU2VydmljZSxNb2RhbERpYWxvZ09wdGlvbnMgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvZGlyZWN0aXZlcy9kaWFsb2dzXCI7XHJcbi8vIGltcG9ydCB7IE1vZGFsQ29tcG9uZW50IH0gZnJvbSBcIi4uLy4uL2FwcC5tb2RhbFwiO1xyXG52YXIgb3B0aW9ucyA9IHtcclxuICAgIG1lc3NhZ2U6ICdMb2FkaW5nLi4uJyxcclxuICAgIHByb2dyZXNzOiAwLjY1LFxyXG4gICAgYW5kcm9pZDoge1xyXG4gICAgICBpbmRldGVybWluYXRlOiB0cnVlLFxyXG4gICAgICBjYW5jZWxhYmxlOiB0cnVlLFxyXG4gICAgICBjYW5jZWxMaXN0ZW5lcjogZnVuY3Rpb24oZGlhbG9nKSB7IGNvbnNvbGUubG9nKFwiTG9hZGluZyBjYW5jZWxsZWRcIikgfSxcclxuICAgICAgbWF4OiAxMDAsXHJcbiAgICAgIHByb2dyZXNzTnVtYmVyRm9ybWF0OiBcIiUxZC8lMmRcIixcclxuICAgICAgcHJvZ3Jlc3NQZXJjZW50Rm9ybWF0OiAwLjUzLFxyXG4gICAgICBwcm9ncmVzc1N0eWxlOiAxLFxyXG4gICAgICBzZWNvbmRhcnlQcm9ncmVzczogMSxcclxuICAgICAgY29sb3I6IFwiIzRCOUVENlwiLCAvLyBjb2xvciBvZiBpbmRpY2F0b3IgYW5kIGxhYmVsc1xyXG4gICAgfSxcclxuICAgIGlvczoge1xyXG4gICAgICBkZXRhaWxzOiBcIkFkZGl0aW9uYWwgZGV0YWlsIG5vdGUhXCIsXHJcbiAgICAgIG1hcmdpbjogMTAsXHJcbiAgICAgIGRpbUJhY2tncm91bmQ6IHRydWUsXHJcbiAgICAgIGNvbG9yOiBcIiM0QjlFRDZcIiwgLy8gY29sb3Igb2YgaW5kaWNhdG9yIGFuZCBsYWJlbHNcclxuICAgICAgLy8gYmFja2dyb3VuZCBib3ggYXJvdW5kIGluZGljYXRvclxyXG4gICAgICAvLyBoaWRlQmV6ZWwgd2lsbCBvdmVycmlkZSB0aGlzIGlmIHRydWVcclxuICAgICAgYmFja2dyb3VuZENvbG9yOiBcInllbGxvd1wiLFxyXG4gICAgICB1c2VySW50ZXJhY3Rpb25FbmFibGVkOiBmYWxzZSwgLy8gZGVmYXVsdCB0cnVlLiBTZXQgZmFsc2Ugc28gdGhhdCB0aGUgdG91Y2hlcyB3aWxsIGZhbGwgdGhyb3VnaCBpdC5cclxuICAgICAgaGlkZUJlemVsOiB0cnVlLCAvLyBkZWZhdWx0IGZhbHNlLCBjYW4gaGlkZSB0aGUgc3Vycm91bmRpbmcgYmV6ZWxcclxuICAgIC8vICAgdmlldzogVUlWaWV3LCAvLyBUYXJnZXQgdmlldyB0byBzaG93IG9uIHRvcCBvZiAoRGVmYXVsdHMgdG8gZW50aXJlIHdpbmRvdylcclxuICAgIC8vICAgbW9kZTogLy8gc2VlIGlPUyBzcGVjaWZpYyBvcHRpb25zIGJlbG93XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgY2xhc3MgRGV2aWNlSW5mbyB7XHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwdWJsaWMgbW9kZWw6IHN0cmluZyxcclxuICAgICAgICBwdWJsaWMgZGV2aWNlVHlwZTogc3RyaW5nLFxyXG4gICAgICAgIHB1YmxpYyBvczogc3RyaW5nLFxyXG4gICAgICAgIHB1YmxpYyBvc1ZlcnNpb246IHN0cmluZyxcclxuICAgICAgICBwdWJsaWMgc2RrVmVyc2lvbjogc3RyaW5nLFxyXG4gICAgICAgIHB1YmxpYyBsYW5ndWFnZTogc3RyaW5nLFxyXG4gICAgICAgIHB1YmxpYyBtYW51ZmFjdHVyZXI6IHN0cmluZyxcclxuICAgICAgICBwdWJsaWMgdXVpZDogc3RyaW5nXHJcbiAgICApIHsgfVxyXG59XHJcblxyXG5jbGFzcyBTY3JlZW5JbmZvIHtcclxuICBjb25zdHJ1Y3RvcihcclxuICAgICAgcHVibGljIGhlaWdodERJUHM6IG51bWJlcixcclxuICAgICAgcHVibGljIGhlaWdodFBpeGVsczogbnVtYmVyLFxyXG4gICAgICBwdWJsaWMgc2NhbGU6IG51bWJlcixcclxuICAgICAgcHVibGljIHdpZHRoRElQczogbnVtYmVyLFxyXG4gICAgICBwdWJsaWMgd2lkdGhQaXhlbHM6IG51bWJlclxyXG4gICkgeyB9XHJcbn1cclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcclxuICAgIHNlbGVjdG9yOiBcIm5zLWxvZ2luXCIsXHJcbiAgICB0ZW1wbGF0ZVVybDogXCIuL2xvZ2luLmNvbXBvbmVudC5odG1sXCIsXHJcbiAgICBzdHlsZVVybHM6IFtcIi4vbG9naW4tY29tbW9uLmNzc1wiLCBcIi4vbG9naW4uY29tcG9uZW50LmNzc1wiXSxcclxufSlcclxuXHJcblxyXG5leHBvcnQgY2xhc3MgTG9naW5Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG5cclxuICAgIHB1YmxpYyBpbnB1dDogYW55O1xyXG4gICAgcmV0dXJuVXJsOiBzdHJpbmc7XHJcbiAgICB1c2VybmFtZTogc3RyaW5nO1xyXG4gICAgcGFzc3dvcmQ6IHN0cmluZztcclxuICAgIHN5c3RlbUNvbmZpZzogU3lzdGVtQ29uZmlndXJhdGlvbjtcclxuXHJcbiAgICBwdWJsaWMgZGV2aWNlSW5mb3JtYXRpb246IERldmljZUluZm8gPSB7XCJtb2RlbFwiOlwiXCIsXCJkZXZpY2VUeXBlXCI6XCJcIixcIm9zXCI6XCJcIixcIm9zVmVyc2lvblwiOlwiXCIsXCJzZGtWZXJzaW9uXCI6XCJcIixcImxhbmd1YWdlXCI6XCJcIixcIm1hbnVmYWN0dXJlclwiOlwiXCIsXCJ1dWlkXCI6XCJcIn07XHJcbiAgXHJcbiAgICBwdWJsaWMgc2NyZWVuSW5mb3JtYXRpb246IFNjcmVlbkluZm8gPSB7XCJoZWlnaHRESVBzXCI6MCxcImhlaWdodFBpeGVsc1wiOjAsXCJzY2FsZVwiOjAsXCJ3aWR0aERJUHNcIjowLFwid2lkdGhQaXhlbHNcIjowfTtcclxuXHJcbiAgICBhdWRpdFRyYWlsOiBBdWRpdFRyYWlsID0ge1wiY29vcGVySWRcIjpcIlwiLFwiaXBBZGRyZXNzXCI6XCJcIiwgXCJsb2dpblRpbWVcIjpcIlwiLFwic2Vzc2lvblRpbWVcIjpcIlwiLFwibG9jYXRpb25cIjpcIlwiLFwibW9kZWxcIjpcIlwiLFwiZGV2aWNlVHlwZVwiOlwiXCIsXCJvc1wiOlwiXCIsXCJvc1ZlcnNpb25cIjpcIlwiLFwic2RrVmVyc2lvblwiOlwiXCIsXCJsYW5ndWFnZVwiOlwiXCIsXCJtYW51ZmFjdHVyZXJcIjpcIlwiLFwidXVpZFwiOlwiXCIsXCJoZWlnaHRESVBzXCI6MCxcImhlaWdodFBpeGVsc1wiOjAsXCJzY2FsZVwiOjAsXCJ3aWR0aERJUHNcIjowLFwid2lkdGhQaXhlbHNcIjowfTtcclxuICBcclxuXHJcbiAgICBcclxuXHJcbiAgICAvLyBwcml2YXRlIG1vZGFsOiBNb2RhbERpYWxvZ1NlcnZpY2UsIHByaXZhdGUgdmNSZWY6IFZpZXdDb250YWluZXJSZWYgXHJcblxyXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKHByaXZhdGUgcm91dGU6IEFjdGl2YXRlZFJvdXRlLHByaXZhdGUgcm91dGVyOiBSb3V0ZXIscHJpdmF0ZSBwYWdlOiBQYWdlLCBwcml2YXRlIGNvb3BlcmF0aXZlU2VydmljZTogQ29vcGVyYXRpdmVTZXJ2aWNlLCBwcml2YXRlIGF1dGhTZXJ2aWNlOkF1dGhTZXJ2aWNlLFxyXG4gICAgICAgXHJcbiAgICAgICBwcml2YXRlIGF1ZGl0VHJhaWxTZXJ2aWNlOkF1ZGl0VHJhaWxTZXJ2aWNlIFxyXG4gICAgICAgKSB7XHJcbiAgICAgICBcclxuICAgICAgICB0aGlzLmRldmljZUluZm9ybWF0aW9uID0gbmV3IERldmljZUluZm8oXHJcbiAgICAgICAgICBkZXZpY2UubW9kZWwsXHJcbiAgICAgICAgICBkZXZpY2UuZGV2aWNlVHlwZSxcclxuICAgICAgICAgIGRldmljZS5vcyxcclxuICAgICAgICAgIGRldmljZS5vc1ZlcnNpb24sXHJcbiAgICAgICAgICBkZXZpY2Uuc2RrVmVyc2lvbixcclxuICAgICAgICAgIGRldmljZS5sYW5ndWFnZSxcclxuICAgICAgICAgIGRldmljZS5tYW51ZmFjdHVyZXIsXHJcbiAgICAgICAgICBkZXZpY2UudXVpZCk7XHJcblxyXG4gICAgICAgICAgdGhpcy5zY3JlZW5JbmZvcm1hdGlvbiA9IG5ldyBTY3JlZW5JbmZvKFxyXG4gICAgICAgICAgICBzY3JlZW4ubWFpblNjcmVlbi5oZWlnaHRESVBzLFxyXG4gICAgICAgICAgICBzY3JlZW4ubWFpblNjcmVlbi5oZWlnaHRQaXhlbHMsXHJcbiAgICAgICAgICAgIHNjcmVlbi5tYWluU2NyZWVuLnNjYWxlLFxyXG4gICAgICAgICAgICBzY3JlZW4ubWFpblNjcmVlbi53aWR0aERJUHMsXHJcbiAgICAgICAgICAgIHNjcmVlbi5tYWluU2NyZWVuLndpZHRoUGl4ZWxzKTtcclxuICAgIFxyXG5cclxuICAgICAgICAgLy8gY29uc29sZS5sb2coXCJEZXZpY2UgVVVJRCBcIiArIHRoaXMuZGV2aWNlSW5mb3JtYXRpb24ubW9kZWwpO1xyXG5cclxuXHJcbiAgICAgICAgICAvLyB0aGlzLmF1ZGl0VHJhaWwubW9kZWwgPSB0aGlzLmRldmljZUluZm9ybWF0aW9uLm1vZGVsO1xyXG4gICAgICAgICAgLy8gdGhpcy5hdWRpdFRyYWlsLm9zID0gdGhpcy5kZXZpY2VJbmZvcm1hdGlvbi5vcztcclxuICAgICAgICAgIC8vIHRoaXMuYXVkaXRUcmFpbC5vc1ZlcnNpb24gPSB0aGlzLmRldmljZUluZm9ybWF0aW9uLm9zVmVyc2lvbjtcclxuICAgICAgICAgIC8vIHRoaXMuYXVkaXRUcmFpbC5zZGtWZXJzaW9uID0gdGhpcy5kZXZpY2VJbmZvcm1hdGlvbi5zZGtWZXJzaW9uO1xyXG4gICAgICAgICAgLy8gdGhpcy5hdWRpdFRyYWlsLmxhbmd1YWdlID0gdGhpcy5kZXZpY2VJbmZvcm1hdGlvbi5sYW5ndWFnZTtcclxuICAgICAgICAgIC8vIHRoaXMuYXVkaXRUcmFpbC5tYW51ZmFjdHVyZXIgPSB0aGlzLmRldmljZUluZm9ybWF0aW9uLm1hbnVmYWN0dXJlcjtcclxuICAgICAgICAgIC8vIHRoaXMuYXVkaXRUcmFpbC51dWlkID0gdGhpcy5kZXZpY2VJbmZvcm1hdGlvbi51dWlkO1xyXG4gICAgICAgICAgLy8gdGhpcy5hdWRpdFRyYWlsLmhlaWdodERJUHMgPSB0aGlzLnNjcmVlbkluZm9ybWF0aW9uLmhlaWdodERJUHM7XHJcbiAgICAgICAgICAvLyB0aGlzLmF1ZGl0VHJhaWwuaGVpZ2h0UGl4ZWxzID0gdGhpcy5zY3JlZW5JbmZvcm1hdGlvbi5oZWlnaHRQaXhlbHM7XHJcbiAgICAgICAgICAvLyB0aGlzLmF1ZGl0VHJhaWwuc2NhbGUgPSB0aGlzLnNjcmVlbkluZm9ybWF0aW9uLnNjYWxlO1xyXG4gICAgICAgICAgLy8gdGhpcy5hdWRpdFRyYWlsLndpZHRoRElQcyA9IHRoaXMuc2NyZWVuSW5mb3JtYXRpb24ud2lkdGhESVBzO1xyXG4gICAgICAgICAgLy8gdGhpcy5hdWRpdFRyYWlsLndpZHRoUGl4ZWxzID0gdGhpcy5zY3JlZW5JbmZvcm1hdGlvbi53aWR0aFBpeGVscztcclxuXHJcbiAgICB9XHJcblxyXG5cclxuICAgIHB1YmxpYyBuZ09uSW5pdCgpIHtcclxuICAgICAgICB0aGlzLnBhZ2UuYWN0aW9uQmFySGlkZGVuID0gdHJ1ZTtcclxuICAgICAgICAvLyBpZihBcHBsaWNhdGlvblNldHRpbmdzLmdldEJvb2xlYW4oXCJhdXRoZW50aWNhdGVkXCIsIGZhbHNlKSkge1xyXG4gICAgICAgIC8vICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbXCIvc2VjdXJlXCJdLCB7IGNsZWFySGlzdG9yeTogdHJ1ZSB9KTtcclxuICAgICAgICAvLyB9XHJcblxyXG4gICAgICAgIC8vIHRoaXMuZ2V0Q29vcGVyYXRpdmUoKTtcclxuICAgICAgICAvL3RoaXMucmV0dXJuVXJsID0gdGhpcy5yb3V0ZS5zbmFwc2hvdC5xdWVyeVBhcmFtc1sncmV0dXJuVXJsJ10gfHwgJy8nO1xyXG5cclxuICAgICAgICB0aGlzLnJldHVyblVybCA9IHRoaXMucm91dGUuc25hcHNob3QucXVlcnlQYXJhbXNbJ3JldHVyblVybCddIHx8ICcvJztcclxuXHJcbiAgICAgICAgY29uc29sZS5sb2coXCJSb3V0aW5nIHRvIHBhZ2UgXCIgKyAgdGhpcy5yZXR1cm5VcmwpO1xyXG5cclxuICAgICAgXHJcbiAgICAgICAgaWYgKCFpc0FuZHJvaWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgYXBwbGljYXRpb24uYW5kcm9pZC5vbihBbmRyb2lkQXBwbGljYXRpb24uYWN0aXZpdHlCYWNrUHJlc3NlZEV2ZW50LCAoZGF0YTogQW5kcm9pZEFjdGl2aXR5QmFja1ByZXNzZWRFdmVudERhdGEpID0+IHtcclxuICAgICAgICAgICAgLy8gaWYgKHRoaXMucm91dGVyLmlzQWN0aXZlKFwiL2xvZ2luXCIsIGZhbHNlKSkge1xyXG4gICAgICAgICAgICAvLyAgIGRhdGEuY2FuY2VsID0gdHJ1ZTsgLy8gcHJldmVudHMgZGVmYXVsdCBiYWNrIGJ1dHRvbiBiZWhhdmlvclxyXG4gICAgICAgICAgICAvLyAgIC8vdGhpcy5sb2dvdXQoKTtcclxuXHJcbiAgICAgICAgICAgIC8vICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW1wiL2xvZ2luXCJdKTtcclxuXHJcbiAgICAgICAgICAgIC8vIH1cclxuICAgICAgICAgICAgaWYgKHRoaXMucm91dGVyLmlzQWN0aXZlKFwiL1wiLCBmYWxzZSkpIHtcclxuICAgICAgICAgICAgICBkYXRhLmNhbmNlbCA9IHRydWU7IC8vIHByZXZlbnRzIGRlZmF1bHQgYmFjayBidXR0b24gYmVoYXZpb3JcclxuICAgICAgICAgICAgICAvL3RoaXMubG9nb3V0KCk7XHJcblxyXG4gICAgICAgICAgICAgIC8vdGhpcy5yb3V0ZXIubmF2aWdhdGUoW1wiL2xvZ2luXCJdKTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gaWYgKHRoaXMucm91dGVyLmlzQWN0aXZlKFwiL3Nob3BcIiwgZmFsc2UpKSB7XHJcbiAgICAgICAgICAgIC8vICAgZGF0YS5jYW5jZWwgPSB0cnVlOyAvLyBwcmV2ZW50cyBkZWZhdWx0IGJhY2sgYnV0dG9uIGJlaGF2aW9yXHJcbiAgICAgICAgICAgIC8vICAgLy90aGlzLmxvZ291dCgpO1xyXG5cclxuICAgICAgICAgICAgLy8gICAvL3RoaXMucm91dGVyLm5hdmlnYXRlKFtcIi9sb2dpblwiXSk7XHJcblxyXG4gICAgICAgICAgICAvLyB9XHJcblxyXG4gICAgICAgICAgICAvLyBpZiAodGhpcy5yb3V0ZXIuaXNBY3RpdmUoXCIvYnV5XCIsIGZhbHNlKSkge1xyXG4gICAgICAgICAgICAvLyAgIGRhdGEuY2FuY2VsID0gdHJ1ZTsgLy8gcHJldmVudHMgZGVmYXVsdCBiYWNrIGJ1dHRvbiBiZWhhdmlvclxyXG4gICAgICAgICAgICAvLyAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFtcIi9cIl0pO1xyXG4gICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgXHJcbiAgICAgICAgIC8vIGFsZXJ0KFwiRGV2aWNlIE1vZGVsIFwiICsgdGhpcy5kZXZpY2VJbmZvcm1hdGlvbi5tb2RlbCk7XHJcblxyXG4gICAgICAgICBjb25zb2xlLmxvZyhcIkRldmljZSBVVUlEIFwiICsgdGhpcy5hdWRpdFRyYWlsLm1vZGVsKTtcclxuXHJcbiAgICAgXHJcbiAgICAgICAgICAgIHRoaXMuYXVkaXRUcmFpbC5tb2RlbCA9IGRldmljZS5tb2RlbDtcclxuXHJcbiAgICAgICAgICB0aGlzLmF1ZGl0VHJhaWwuZGV2aWNlVHlwZSA9IGRldmljZS5kZXZpY2VUeXBlO1xyXG4gICAgICAgICAgdGhpcy5hdWRpdFRyYWlsLm9zID0gZGV2aWNlLm9zO1xyXG4gICAgICAgICAgdGhpcy5hdWRpdFRyYWlsLm9zVmVyc2lvbiA9IGRldmljZS5vc1ZlcnNpb247XHJcbiAgICAgICAgICB0aGlzLmF1ZGl0VHJhaWwuc2RrVmVyc2lvbiA9IGRldmljZS5zZGtWZXJzaW9uO1xyXG4gICAgICAgICAgdGhpcy5hdWRpdFRyYWlsLmxhbmd1YWdlID0gZGV2aWNlLmxhbmd1YWdlO1xyXG4gICAgICAgICAgdGhpcy5hdWRpdFRyYWlsLm1hbnVmYWN0dXJlciA9IGRldmljZS5tYW51ZmFjdHVyZXI7XHJcbiAgICAgICAgICB0aGlzLmF1ZGl0VHJhaWwudXVpZCA9IGRldmljZS51dWlkO1xyXG4gICAgICAgICAgdGhpcy5hdWRpdFRyYWlsLmhlaWdodERJUHMgPSBzY3JlZW4ubWFpblNjcmVlbi5oZWlnaHRESVBzO1xyXG4gICAgICAgICAgdGhpcy5hdWRpdFRyYWlsLmhlaWdodFBpeGVscyA9IHNjcmVlbi5tYWluU2NyZWVuLmhlaWdodFBpeGVscztcclxuICAgICAgICAgIHRoaXMuYXVkaXRUcmFpbC5zY2FsZSA9IHNjcmVlbi5tYWluU2NyZWVuLnNjYWxlO1xyXG4gICAgICAgICAgdGhpcy5hdWRpdFRyYWlsLndpZHRoRElQcyA9IHNjcmVlbi5tYWluU2NyZWVuLndpZHRoRElQcztcclxuICAgICAgICAgIHRoaXMuYXVkaXRUcmFpbC53aWR0aFBpeGVscyA9IHNjcmVlbi5tYWluU2NyZWVuLndpZHRoUGl4ZWxzO1xyXG5cclxuXHJcblxyXG4gICAgICAgIH1cclxuICAgICAgIFxyXG5cclxuICAgIC8vIHB1YmxpYyBsb2dpbigpIHtcclxuICAgIC8vICAgICBpZih0aGlzLmlucHV0LmVtYWlsICYmIHRoaXMuaW5wdXQucGFzc3dvcmQpIHtcclxuICAgIC8vICAgICAgICAgbGV0IGFjY291bnQgPSBKU09OLnBhcnNlKEFwcGxpY2F0aW9uU2V0dGluZ3MuZ2V0U3RyaW5nKFwiYWNjb3VudFwiLCBcInt9XCIpKTtcclxuICAgIC8vICAgICAgICAgaWYodGhpcy5pbnB1dC5lbWFpbCA9PSBhY2NvdW50LmVtYWlsICYmIHRoaXMuaW5wdXQucGFzc3dvcmQgPT0gYWNjb3VudC5wYXNzd29yZCkge1xyXG4gICAgLy8gICAgICAgICAgICAgQXBwbGljYXRpb25TZXR0aW5ncy5zZXRCb29sZWFuKFwiYXV0aGVudGljYXRlZFwiLCB0cnVlKTtcclxuICAgIC8vICAgICAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFtcIi9zZWN1cmVcIl0sIHsgY2xlYXJIaXN0b3J5OiB0cnVlIH0pO1xyXG4gICAgLy8gICAgICAgICB9IGVsc2Uge1xyXG4gICAgLy8gICAgICAgICAgICAgKG5ldyBTbmFja0JhcigpKS5zaW1wbGUoXCJJbmNvcnJlY3QgQ3JlZGVudGlhbHMhXCIpO1xyXG4gICAgLy8gICAgICAgICB9XHJcbiAgICAvLyAgICAgfSBlbHNlIHtcclxuICAgIC8vICAgICAgICAgKG5ldyBTbmFja0JhcigpKS5zaW1wbGUoXCJBbGwgRmllbGRzIFJlcXVpcmVkIVwiKTtcclxuICAgIC8vICAgICB9XHJcbiAgICAvLyB9XHJcblxyXG4gICAgbG9naW4oKSB7XHJcbiAgICAgICAgaWYgKGdldENvbm5lY3Rpb25UeXBlKCkgPT09IGNvbm5lY3Rpb25UeXBlLm5vbmUpIHtcclxuICAgICAgICAgLy8gYWxlcnQoXCJDb29wZXIgU3dpdGNoIHJlcXVpcmVzIGFuIGludGVybmV0IGNvbm5lY3Rpb24gdG8gbG9nIGluLlwiKTtcclxuXHJcbiAgICAgICAgICBUTlNGYW5jeUFsZXJ0LnNob3dFcnJvcihcIkVycm9yIVwiLCBcIkNvb3BlciBTd2l0Y2ggcmVxdWlyZXMgYW4gaW50ZXJuZXQgY29ubmVjdGlvbiB0byBsb2cgaW4uXCIsIFwiT2tcIik7XHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vdGhpcy5sb2FkaW5nID0gdHJ1ZTtcclxuICAgICAgICBsb2FkZXIuc2hvdyhvcHRpb25zKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIkxvZ2luIFJlYWNoaW5nIFwiICsgdGhpcy51c2VybmFtZSArIFwiIFBhc3N3b3JkXCIgKyB0aGlzLnBhc3N3b3JkKTtcclxuICAgICAgICB0aGlzLmF1dGhTZXJ2aWNlLmxvZ2luKHRoaXMudXNlcm5hbWUsIHRoaXMucGFzc3dvcmQpXHJcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoXHJcbiAgICAgICAgICAgICAgICBkYXRhID0+IHtcclxuICAgICAgICAgICAgICAgICAgLy90aGlzLmlzQXV0aGVudGljYXRpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIC8vLyBjb25zb2xlLmxvZyhcImxvZ2luIGRhdGEgXCIgKyBkYXRhKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgdGhpcy5hdWRpdFRyYWlsLmNvb3BlcklkID0gdGhpcy51c2VybmFtZTtcclxuXHJcbiAgICAgICAgICAgICAgICAgdGhpcy5jcmVhdGVBdWRpdFRyYWlsKCk7XHJcbiAgICAgICAgICAgICAgICAgLy8vdGhpcy5hdXRoU2VydmljZS5jaGVja1JlZ2lzdHJhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbdGhpcy5yZXR1cm5VcmxdKTtcclxuICAgICAgICAgICAgICAgICAgbG9hZGVyLmhpZGUoKTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBlcnJvciA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy90aGlzLmFsZXJ0U2VydmljZS5lcnJvcihlcnJvcik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIFROU0ZhbmN5QWxlcnQuc2hvd0Vycm9yKFwiRXJyb3IhXCIsIGVycm9yLmVycm9yLm1lc3NhZ2UsIFwiT2tcIik7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3IgXCIgKyBKU09OLnN0cmluZ2lmeShlcnJvcikgKTtcclxuICAgICAgICAgICAgICAgICAgICBsb2FkZXIuaGlkZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICB0aGlzLmlzQXV0aGVudGljYXRpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAvLyB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgXHJcblxyXG4gICAgZ2V0Q29vcGVyYXRpdmUoKXtcclxuICAgICAgICB0aGlzLmNvb3BlcmF0aXZlU2VydmljZS5nZXRBbGxDb29wZXJhdGl2ZSgpLnN1YnNjcmliZShcclxuICAgICAgICAgICAgZGF0YSA9PiB7IFxyXG4gICAgICAgICAgICAgY29uc29sZS5sb2coXCJDb29wZXJhdGl2ZSBMaXN0IFwiKyBKU09OLnN0cmluZ2lmeShkYXRhW1wiZGF0YVwiXSkgKTtcclxuICAgICAgIFxyXG4gICAgICAgIFxyXG4gICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgIGVyciA9PiB7XHJcbiAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XHJcbiAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICApO1x0ICBcclxuICAgIH1cclxuXHJcbiAgICBnZXRTeXN0ZW1Db25maWcoKXtcclxuICAgICAgICB0aGlzLmF1dGhTZXJ2aWNlLnN5c3RlbWNvbmZpZygpLnN1YnNjcmliZShcclxuICAgICAgICAgICAgZGF0YSA9PiB7IFxyXG4gICAgICAgICAgICAgY29uc29sZS5sb2coXCJTeXN0ZW0gQ29uZmlnIFwiKyBKU09OLnN0cmluZ2lmeShkYXRhW1wiZGF0YVwiXSkgKTtcclxuICAgICAgIFxyXG4gICAgICAgICAgICAgdGhpcy5zeXN0ZW1Db25maWcgPSBkYXRhW1wiZGF0YVwiXVswXTtcclxuICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICBlcnIgPT4ge1xyXG4gICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xyXG4gICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgKTtcdCAgXHJcbiAgICB9XHJcbiAgICBzdGFydEJhY2tncm91bmRBbmltYXRpb24oYmFja2dyb3VuZCkge1xyXG4gICAgICAgIGJhY2tncm91bmQuYW5pbWF0ZSh7XHJcbiAgICAgICAgICBzY2FsZTogeyB4OiAxLjAsIHk6IDEuMCB9LFxyXG4gICAgICAgICAgZHVyYXRpb246IDEwMDAwXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuXHJcblxyXG4gICAgICBjcmVhdGVBdWRpdFRyYWlsKCl7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJSZWFjaGluZyBBdWRpdCBUcmFpbCBcIik7XHJcbiAgICAgICAgdGhpcy5hdWRpdFRyYWlsU2VydmljZS5jcmVhdGVBdWRpdFRyYWlsKHRoaXMuYXVkaXRUcmFpbCkuc3Vic2NyaWJlKFxyXG4gICAgICAgICAgICBkYXRhID0+IHsgXHJcbiAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkF1ZGl0IFRyYWlsIFwiKyBKU09OLnN0cmluZ2lmeShkYXRhW1wiZGF0YVwiXSkgKTtcclxuICAgICAgIFxyXG4gICAgICAgIFxyXG4gICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgIGVyciA9PiB7XHJcbiAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XHJcbiAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICApO1x0ICBcclxuICAgIH1cclxuXHJcblxyXG5cclxuICAgIC8vICAgcHVibGljIHNob3dNb2RhbCgpIHtcclxuXHJcbiAgICAvLyAgICAgY29uc3Qgb3B0aW9uczogTW9kYWxEaWFsb2dPcHRpb25zID0ge1xyXG4gICAgLy8gICAgICAgICB2aWV3Q29udGFpbmVyUmVmOiB0aGlzLnZjUmVmLFxyXG4gICAgLy8gICAgICAgICBjb250ZXh0OiB7fSxcclxuICAgIC8vICAgICAgICAgZnVsbHNjcmVlbjogZmFsc2UsXHJcbiAgICAvLyAgICAgfTtcclxuICAgIC8vICAgICBsZXQgb3B0aW9uczIgPSB7XHJcbiAgICAvLyAgICAgICAgIGNvbnRleHQ6IHt9LFxyXG4gICAgICAgICAgXHJcbiAgICAvLyAgICAgICAgIHZpZXdDb250YWluZXJSZWY6IHRoaXMudmNSZWYsXHJcbiAgICAvLyAgICAgICAgIGZ1bGxzY3JlZW46IGZhbHNlLFxyXG4gICAgLy8gICAgIH07XHJcbiAgICAvLyAgICAgdGhpcy5tb2RhbC5zaG93TW9kYWwoTW9kYWxDb21wb25lbnQsIG9wdGlvbnMpLnRoZW4ocmVzID0+IHtcclxuICAgIC8vICAgICAgICAgY29uc29sZS5sb2cocmVzKTtcclxuICAgIC8vICAgICB9KTtcclxuXHJcbiAgICAvLyB9XHJcblxyXG5cclxuICAgIFxyXG5cclxufVxyXG5cclxuIl19