"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var page_1 = require("ui/page");
//import { alert } from "../../shared";
//import { Cooperative } from '../../models/index';
var cooperative_service_1 = require("../../services/cooperative.service");
var auth_service_1 = require("../../services/auth.service");
// import { TNSFancyAlert } from "nativescript-fancyalert";
//  import {LoadingIndicator} from "nativescript-loading-indicator";
// var loader = new LoadingIndicator();
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
var PhoneVerifyComponent = /** @class */ (function () {
    // public input: any;
    // returnUrl: string;
    // username: string;
    // password: string;
    // private modal: ModalDialogService, private vcRef: ViewContainerRef 
    function PhoneVerifyComponent(route, router, page, cooperativeService, authService, _page) {
        this.route = route;
        this.router = router;
        this.page = page;
        this.cooperativeService = cooperativeService;
        this.authService = authService;
        this._page = _page;
        // this.input = {
        //     "email": "",
        //     "password": ""
        // }
    }
    PhoneVerifyComponent.prototype.ngOnInit = function () {
        this._page.actionBarHidden = true;
        // this.page.actionBarHidden = true;
        // // if(ApplicationSettings.getBoolean("authenticated", false)) {
        // //     this.router.navigate(["/secure"], { clearHistory: true });
        // // }
        // // this.getCooperative();
        // //this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
        // this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
        // console.log("Routing to page " +  this.returnUrl);
        // this.router.navigate(['/transpin']);
    };
    PhoneVerifyComponent.prototype.sleep = function (milliseconds) {
        var start = new Date().getTime();
        for (var i = 0; i < 1e7; i++) {
            if ((new Date().getTime() - start) > milliseconds) {
                break;
            }
        }
    };
    PhoneVerifyComponent.prototype.ngAfterViewInit = function () {
        // setTimeout(function() {
        //   this.router.navigate(['/transpin']);
        // }, 3000);
        // this.sleep(3000);
        var _this = this;
        setTimeout(function () {
            _this.router.navigate(['/transpin']);
        }, 3000);
    };
    PhoneVerifyComponent.prototype.tapSuccess = function () {
        this.router.navigate(['/transpin']);
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
    // login() {
    //     if (getConnectionType() === connectionType.none) {
    //      // alert("Cooper Switch requires an internet connection to log in.");
    //       TNSFancyAlert.showError("Error!", "Cooper Switch requires an internet connection to log in.", "Ok");
    //       return;
    //     }
    //     //this.loading = true;
    //     loader.show(options);
    //     console.log("Login Reaching " + this.username + " Password" + this.password);
    //     this.authService.login(this.username, this.password)
    //         .subscribe(
    //             data => {
    //               //this.isAuthenticating = false;
    //              // console.log("login data " + data);
    //               this.router.navigate([this.returnUrl]);
    //               loader.hide();
    //             },
    //             error => {
    //                 //this.alertService.error(error);
    //                 TNSFancyAlert.showError("Error!", error.error.message, "Ok");
    //                 console.log("Error " + JSON.stringify(error) );
    //                 loader.hide();
    //                 //  this.isAuthenticating = false;
    //                 // this.loading = false;
    //             });
    // }
    // getCooperative(){
    //     this.cooperativeService.getAllCooperative().subscribe(
    //         data => { 
    //          console.log("Cooperative List "+ JSON.stringify(data["data"]) );
    //           },
    //           err => {
    //            console.log(err);
    //              }
    //         );	  
    // }
    PhoneVerifyComponent.prototype.startBackgroundAnimation = function (background) {
        background.animate({
            scale: { x: 1.0, y: 1.0 },
            duration: 10000
        });
    };
    PhoneVerifyComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: "ns-phoneverify",
            templateUrl: "./phoneverify.component.html",
            styleUrls: ["./phoneverify-common.css", "./phoneverify.component.css"],
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute, router_1.Router, page_1.Page, cooperative_service_1.CooperativeService, auth_service_1.AuthService,
            page_1.Page])
    ], PhoneVerifyComponent);
    return PhoneVerifyComponent;
}());
exports.PhoneVerifyComponent = PhoneVerifyComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGhvbmV2ZXJpZnkuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicGhvbmV2ZXJpZnkuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWtGO0FBRWxGLDBDQUF5RDtBQU96RCxnQ0FBK0I7QUFJL0IsdUNBQXVDO0FBRXZDLG1EQUFtRDtBQUNuRCwwRUFBc0U7QUFDdEUsNERBQXdEO0FBRXhELDJEQUEyRDtBQUUzRCxvRUFBb0U7QUFFcEUsdUNBQXVDO0FBRXZDLHlDQUF5QztBQUN6QyxtR0FBbUc7QUFDbkcsb0RBQW9EO0FBQ3BELElBQUksT0FBTyxHQUFHO0lBQ1YsT0FBTyxFQUFFLFlBQVk7SUFDckIsUUFBUSxFQUFFLElBQUk7SUFDZCxPQUFPLEVBQUU7UUFDUCxhQUFhLEVBQUUsSUFBSTtRQUNuQixVQUFVLEVBQUUsSUFBSTtRQUNoQixjQUFjLEVBQUUsVUFBUyxNQUFNLElBQUksT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFBLENBQUMsQ0FBQztRQUNyRSxHQUFHLEVBQUUsR0FBRztRQUNSLG9CQUFvQixFQUFFLFNBQVM7UUFDL0IscUJBQXFCLEVBQUUsSUFBSTtRQUMzQixhQUFhLEVBQUUsQ0FBQztRQUNoQixpQkFBaUIsRUFBRSxDQUFDO1FBQ3BCLEtBQUssRUFBRSxTQUFTO0tBQ2pCO0lBQ0QsR0FBRyxFQUFFO1FBQ0gsT0FBTyxFQUFFLHlCQUF5QjtRQUNsQyxNQUFNLEVBQUUsRUFBRTtRQUNWLGFBQWEsRUFBRSxJQUFJO1FBQ25CLEtBQUssRUFBRSxTQUFTO1FBQ2hCLGtDQUFrQztRQUNsQyx1Q0FBdUM7UUFDdkMsZUFBZSxFQUFFLFFBQVE7UUFDekIsc0JBQXNCLEVBQUUsS0FBSztRQUM3QixTQUFTLEVBQUUsSUFBSTtLQUdoQjtDQUNGLENBQUM7QUFVSjtJQUVJLHFCQUFxQjtJQUNyQixxQkFBcUI7SUFDckIsb0JBQW9CO0lBQ3BCLG9CQUFvQjtJQUtwQixzRUFB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ekIsUUFBUSxFQUFFLEtBQUs7U0FDaEIsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQXhJTSxvQkFBb0I7UUFSaEMsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixRQUFRLEVBQUUsZ0JBQWdCO1lBQzFCLFdBQVcsRUFBRSw4QkFBOEI7WUFDM0MsU0FBUyxFQUFFLENBQUMsMEJBQTBCLEVBQUUsNkJBQTZCLENBQUM7U0FDekUsQ0FBQzt5Q0Flb0MsdUJBQWMsRUFBaUIsZUFBTSxFQUFlLFdBQUksRUFBOEIsd0NBQWtCLEVBQXNCLDBCQUFXO1lBRXhKLFdBQUk7T0FkZCxvQkFBb0IsQ0FpS2hDO0lBQUQsMkJBQUM7Q0FBQSxBQWpLRCxJQWlLQztBQWpLWSxvREFBb0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCxWaWV3Q29udGFpbmVyUmVmLCBBZnRlclZpZXdJbml0IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuXHJcbmltcG9ydCB7IFJvdXRlciwgQWN0aXZhdGVkUm91dGUgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XHJcbmltcG9ydCB7IENvbG9yIH0gZnJvbSBcImNvbG9yXCI7XHJcblxyXG5pbXBvcnQgeyBjb25uZWN0aW9uVHlwZSwgZ2V0Q29ubmVjdGlvblR5cGUgfSBmcm9tIFwiY29ubmVjdGl2aXR5XCI7XHJcbmltcG9ydCB7IEFuaW1hdGlvbiB9IGZyb20gXCJ1aS9hbmltYXRpb25cIjtcclxuaW1wb3J0IHsgVmlldyB9IGZyb20gXCJ1aS9jb3JlL3ZpZXdcIjtcclxuaW1wb3J0IHsgcHJvbXB0IH0gZnJvbSBcInVpL2RpYWxvZ3NcIjtcclxuaW1wb3J0IHsgUGFnZSB9IGZyb20gXCJ1aS9wYWdlXCI7XHJcbmltcG9ydCB7IFRleHRGaWVsZCB9IGZyb20gXCJ1aS90ZXh0LWZpZWxkXCI7XHJcblxyXG5cclxuLy9pbXBvcnQgeyBhbGVydCB9IGZyb20gXCIuLi8uLi9zaGFyZWRcIjtcclxuXHJcbi8vaW1wb3J0IHsgQ29vcGVyYXRpdmUgfSBmcm9tICcuLi8uLi9tb2RlbHMvaW5kZXgnO1xyXG5pbXBvcnQge0Nvb3BlcmF0aXZlU2VydmljZX0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL2Nvb3BlcmF0aXZlLnNlcnZpY2VcIjtcclxuaW1wb3J0IHtBdXRoU2VydmljZX0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL2F1dGguc2VydmljZVwiO1xyXG5cclxuLy8gaW1wb3J0IHsgVE5TRmFuY3lBbGVydCB9IGZyb20gXCJuYXRpdmVzY3JpcHQtZmFuY3lhbGVydFwiO1xyXG5cclxuLy8gIGltcG9ydCB7TG9hZGluZ0luZGljYXRvcn0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1sb2FkaW5nLWluZGljYXRvclwiO1xyXG5cclxuLy8gdmFyIGxvYWRlciA9IG5ldyBMb2FkaW5nSW5kaWNhdG9yKCk7XHJcblxyXG4vLyBpbXBvcnQgKiBhcyBkaWFsb2dzIGZyb20gXCJ1aS9kaWFsb2dzXCI7XHJcbi8vIGltcG9ydCB7IE1vZGFsRGlhbG9nU2VydmljZSxNb2RhbERpYWxvZ09wdGlvbnMgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvZGlyZWN0aXZlcy9kaWFsb2dzXCI7XHJcbi8vIGltcG9ydCB7IE1vZGFsQ29tcG9uZW50IH0gZnJvbSBcIi4uLy4uL2FwcC5tb2RhbFwiO1xyXG52YXIgb3B0aW9ucyA9IHtcclxuICAgIG1lc3NhZ2U6ICdMb2FkaW5nLi4uJyxcclxuICAgIHByb2dyZXNzOiAwLjY1LFxyXG4gICAgYW5kcm9pZDoge1xyXG4gICAgICBpbmRldGVybWluYXRlOiB0cnVlLFxyXG4gICAgICBjYW5jZWxhYmxlOiB0cnVlLFxyXG4gICAgICBjYW5jZWxMaXN0ZW5lcjogZnVuY3Rpb24oZGlhbG9nKSB7IGNvbnNvbGUubG9nKFwiTG9hZGluZyBjYW5jZWxsZWRcIikgfSxcclxuICAgICAgbWF4OiAxMDAsXHJcbiAgICAgIHByb2dyZXNzTnVtYmVyRm9ybWF0OiBcIiUxZC8lMmRcIixcclxuICAgICAgcHJvZ3Jlc3NQZXJjZW50Rm9ybWF0OiAwLjUzLFxyXG4gICAgICBwcm9ncmVzc1N0eWxlOiAxLFxyXG4gICAgICBzZWNvbmRhcnlQcm9ncmVzczogMSxcclxuICAgICAgY29sb3I6IFwiIzRCOUVENlwiLCAvLyBjb2xvciBvZiBpbmRpY2F0b3IgYW5kIGxhYmVsc1xyXG4gICAgfSxcclxuICAgIGlvczoge1xyXG4gICAgICBkZXRhaWxzOiBcIkFkZGl0aW9uYWwgZGV0YWlsIG5vdGUhXCIsXHJcbiAgICAgIG1hcmdpbjogMTAsXHJcbiAgICAgIGRpbUJhY2tncm91bmQ6IHRydWUsXHJcbiAgICAgIGNvbG9yOiBcIiM0QjlFRDZcIiwgLy8gY29sb3Igb2YgaW5kaWNhdG9yIGFuZCBsYWJlbHNcclxuICAgICAgLy8gYmFja2dyb3VuZCBib3ggYXJvdW5kIGluZGljYXRvclxyXG4gICAgICAvLyBoaWRlQmV6ZWwgd2lsbCBvdmVycmlkZSB0aGlzIGlmIHRydWVcclxuICAgICAgYmFja2dyb3VuZENvbG9yOiBcInllbGxvd1wiLFxyXG4gICAgICB1c2VySW50ZXJhY3Rpb25FbmFibGVkOiBmYWxzZSwgLy8gZGVmYXVsdCB0cnVlLiBTZXQgZmFsc2Ugc28gdGhhdCB0aGUgdG91Y2hlcyB3aWxsIGZhbGwgdGhyb3VnaCBpdC5cclxuICAgICAgaGlkZUJlemVsOiB0cnVlLCAvLyBkZWZhdWx0IGZhbHNlLCBjYW4gaGlkZSB0aGUgc3Vycm91bmRpbmcgYmV6ZWxcclxuICAgIC8vICAgdmlldzogVUlWaWV3LCAvLyBUYXJnZXQgdmlldyB0byBzaG93IG9uIHRvcCBvZiAoRGVmYXVsdHMgdG8gZW50aXJlIHdpbmRvdylcclxuICAgIC8vICAgbW9kZTogLy8gc2VlIGlPUyBzcGVjaWZpYyBvcHRpb25zIGJlbG93XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcclxuICAgIHNlbGVjdG9yOiBcIm5zLXBob25ldmVyaWZ5XCIsXHJcbiAgICB0ZW1wbGF0ZVVybDogXCIuL3Bob25ldmVyaWZ5LmNvbXBvbmVudC5odG1sXCIsXHJcbiAgICBzdHlsZVVybHM6IFtcIi4vcGhvbmV2ZXJpZnktY29tbW9uLmNzc1wiLCBcIi4vcGhvbmV2ZXJpZnkuY29tcG9uZW50LmNzc1wiXSxcclxufSlcclxuXHJcblxyXG5leHBvcnQgY2xhc3MgUGhvbmVWZXJpZnlDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsQWZ0ZXJWaWV3SW5pdCB7XHJcblxyXG4gICAgLy8gcHVibGljIGlucHV0OiBhbnk7XHJcbiAgICAvLyByZXR1cm5Vcmw6IHN0cmluZztcclxuICAgIC8vIHVzZXJuYW1lOiBzdHJpbmc7XHJcbiAgICAvLyBwYXNzd29yZDogc3RyaW5nO1xyXG5cclxuXHJcbiAgICBcclxuXHJcbiAgICAvLyBwcml2YXRlIG1vZGFsOiBNb2RhbERpYWxvZ1NlcnZpY2UsIHByaXZhdGUgdmNSZWY6IFZpZXdDb250YWluZXJSZWYgXHJcblxyXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKHByaXZhdGUgcm91dGU6IEFjdGl2YXRlZFJvdXRlLHByaXZhdGUgcm91dGVyOiBSb3V0ZXIscHJpdmF0ZSBwYWdlOiBQYWdlLCBwcml2YXRlIGNvb3BlcmF0aXZlU2VydmljZTogQ29vcGVyYXRpdmVTZXJ2aWNlLCBwcml2YXRlIGF1dGhTZXJ2aWNlOkF1dGhTZXJ2aWNlLFxyXG4gICAgICAgXHJcbiAgICAgICAgcHJpdmF0ZSBfcGFnZTogUGFnZSxcclxuICAgICAgIClcclxuICAgICAgICB7XHJcbiAgICAgICAgLy8gdGhpcy5pbnB1dCA9IHtcclxuICAgICAgICAvLyAgICAgXCJlbWFpbFwiOiBcIlwiLFxyXG4gICAgICAgIC8vICAgICBcInBhc3N3b3JkXCI6IFwiXCJcclxuICAgICAgICAvLyB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHB1YmxpYyBuZ09uSW5pdCgpIHtcclxuICAgICAgICB0aGlzLl9wYWdlLmFjdGlvbkJhckhpZGRlbiA9IHRydWU7XHJcbiAgICAgICAgLy8gdGhpcy5wYWdlLmFjdGlvbkJhckhpZGRlbiA9IHRydWU7XHJcbiAgICAgICAgLy8gLy8gaWYoQXBwbGljYXRpb25TZXR0aW5ncy5nZXRCb29sZWFuKFwiYXV0aGVudGljYXRlZFwiLCBmYWxzZSkpIHtcclxuICAgICAgICAvLyAvLyAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW1wiL3NlY3VyZVwiXSwgeyBjbGVhckhpc3Rvcnk6IHRydWUgfSk7XHJcbiAgICAgICAgLy8gLy8gfVxyXG5cclxuICAgICAgICAvLyAvLyB0aGlzLmdldENvb3BlcmF0aXZlKCk7XHJcbiAgICAgICAgLy8gLy90aGlzLnJldHVyblVybCA9IHRoaXMucm91dGUuc25hcHNob3QucXVlcnlQYXJhbXNbJ3JldHVyblVybCddIHx8ICcvJztcclxuXHJcbiAgICAgICAgLy8gdGhpcy5yZXR1cm5VcmwgPSB0aGlzLnJvdXRlLnNuYXBzaG90LnF1ZXJ5UGFyYW1zWydyZXR1cm5VcmwnXSB8fCAnLyc7XHJcblxyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwiUm91dGluZyB0byBwYWdlIFwiICsgIHRoaXMucmV0dXJuVXJsKTtcclxuXHJcbiAgICAgXHJcbiAgICAgICAgICAgLy8gdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvdHJhbnNwaW4nXSk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHNsZWVwKG1pbGxpc2Vjb25kcykge1xyXG4gICAgICB2YXIgc3RhcnQgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcclxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCAxZTc7IGkrKykge1xyXG4gICAgICAgIGlmICgobmV3IERhdGUoKS5nZXRUaW1lKCkgLSBzdGFydCkgPiBtaWxsaXNlY29uZHMpe1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgbmdBZnRlclZpZXdJbml0KCl7XHJcblxyXG4gICAgICAvLyBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG4gICAgICAvLyAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnL3RyYW5zcGluJ10pO1xyXG4gICAgICAvLyB9LCAzMDAwKTtcclxuICAgIC8vIHRoaXMuc2xlZXAoMzAwMCk7XHJcblxyXG4gICAgIHNldFRpbWVvdXQoKCkgPT4gXHJcbiAgICAgIHtcclxuICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy90cmFuc3BpbiddKTtcclxuICAgICAgfSxcclxuICAgICAgMzAwMCk7XHJcbiAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgdGFwU3VjY2Vzcygpe1xyXG4gICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy90cmFuc3BpbiddKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBwdWJsaWMgbG9naW4oKSB7XHJcbiAgICAvLyAgICAgaWYodGhpcy5pbnB1dC5lbWFpbCAmJiB0aGlzLmlucHV0LnBhc3N3b3JkKSB7XHJcbiAgICAvLyAgICAgICAgIGxldCBhY2NvdW50ID0gSlNPTi5wYXJzZShBcHBsaWNhdGlvblNldHRpbmdzLmdldFN0cmluZyhcImFjY291bnRcIiwgXCJ7fVwiKSk7XHJcbiAgICAvLyAgICAgICAgIGlmKHRoaXMuaW5wdXQuZW1haWwgPT0gYWNjb3VudC5lbWFpbCAmJiB0aGlzLmlucHV0LnBhc3N3b3JkID09IGFjY291bnQucGFzc3dvcmQpIHtcclxuICAgIC8vICAgICAgICAgICAgIEFwcGxpY2F0aW9uU2V0dGluZ3Muc2V0Qm9vbGVhbihcImF1dGhlbnRpY2F0ZWRcIiwgdHJ1ZSk7XHJcbiAgICAvLyAgICAgICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbXCIvc2VjdXJlXCJdLCB7IGNsZWFySGlzdG9yeTogdHJ1ZSB9KTtcclxuICAgIC8vICAgICAgICAgfSBlbHNlIHtcclxuICAgIC8vICAgICAgICAgICAgIChuZXcgU25hY2tCYXIoKSkuc2ltcGxlKFwiSW5jb3JyZWN0IENyZWRlbnRpYWxzIVwiKTtcclxuICAgIC8vICAgICAgICAgfVxyXG4gICAgLy8gICAgIH0gZWxzZSB7XHJcbiAgICAvLyAgICAgICAgIChuZXcgU25hY2tCYXIoKSkuc2ltcGxlKFwiQWxsIEZpZWxkcyBSZXF1aXJlZCFcIik7XHJcbiAgICAvLyAgICAgfVxyXG4gICAgLy8gfVxyXG5cclxuICAgIC8vIGxvZ2luKCkge1xyXG4gICAgLy8gICAgIGlmIChnZXRDb25uZWN0aW9uVHlwZSgpID09PSBjb25uZWN0aW9uVHlwZS5ub25lKSB7XHJcbiAgICAvLyAgICAgIC8vIGFsZXJ0KFwiQ29vcGVyIFN3aXRjaCByZXF1aXJlcyBhbiBpbnRlcm5ldCBjb25uZWN0aW9uIHRvIGxvZyBpbi5cIik7XHJcblxyXG4gICAgLy8gICAgICAgVE5TRmFuY3lBbGVydC5zaG93RXJyb3IoXCJFcnJvciFcIiwgXCJDb29wZXIgU3dpdGNoIHJlcXVpcmVzIGFuIGludGVybmV0IGNvbm5lY3Rpb24gdG8gbG9nIGluLlwiLCBcIk9rXCIpO1xyXG4gICAgLy8gICAgICAgcmV0dXJuO1xyXG4gICAgLy8gICAgIH1cclxuICAgIC8vICAgICAvL3RoaXMubG9hZGluZyA9IHRydWU7XHJcbiAgICAvLyAgICAgbG9hZGVyLnNob3cob3B0aW9ucyk7XHJcbiAgICAvLyAgICAgY29uc29sZS5sb2coXCJMb2dpbiBSZWFjaGluZyBcIiArIHRoaXMudXNlcm5hbWUgKyBcIiBQYXNzd29yZFwiICsgdGhpcy5wYXNzd29yZCk7XHJcbiAgICAvLyAgICAgdGhpcy5hdXRoU2VydmljZS5sb2dpbih0aGlzLnVzZXJuYW1lLCB0aGlzLnBhc3N3b3JkKVxyXG4gICAgLy8gICAgICAgICAuc3Vic2NyaWJlKFxyXG4gICAgLy8gICAgICAgICAgICAgZGF0YSA9PiB7XHJcbiAgICAvLyAgICAgICAgICAgICAgIC8vdGhpcy5pc0F1dGhlbnRpY2F0aW5nID0gZmFsc2U7XHJcbiAgICAvLyAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJsb2dpbiBkYXRhIFwiICsgZGF0YSk7XHJcbiAgICAvLyAgICAgICAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFt0aGlzLnJldHVyblVybF0pO1xyXG4gICAgLy8gICAgICAgICAgICAgICBsb2FkZXIuaGlkZSgpO1xyXG4gICAgLy8gICAgICAgICAgICAgfSxcclxuICAgIC8vICAgICAgICAgICAgIGVycm9yID0+IHtcclxuICAgIC8vICAgICAgICAgICAgICAgICAvL3RoaXMuYWxlcnRTZXJ2aWNlLmVycm9yKGVycm9yKTtcclxuXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgVE5TRmFuY3lBbGVydC5zaG93RXJyb3IoXCJFcnJvciFcIiwgZXJyb3IuZXJyb3IubWVzc2FnZSwgXCJPa1wiKTtcclxuICAgICAgICAgICAgXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJFcnJvciBcIiArIEpTT04uc3RyaW5naWZ5KGVycm9yKSApO1xyXG4gICAgLy8gICAgICAgICAgICAgICAgIGxvYWRlci5oaWRlKCk7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgLy8gIHRoaXMuaXNBdXRoZW50aWNhdGluZyA9IGZhbHNlO1xyXG4gICAgLy8gICAgICAgICAgICAgICAgIC8vIHRoaXMubG9hZGluZyA9IGZhbHNlO1xyXG4gICAgLy8gICAgICAgICAgICAgfSk7XHJcbiAgICAvLyB9XHJcbiAgICBcclxuXHJcbiAgICAvLyBnZXRDb29wZXJhdGl2ZSgpe1xyXG4gICAgLy8gICAgIHRoaXMuY29vcGVyYXRpdmVTZXJ2aWNlLmdldEFsbENvb3BlcmF0aXZlKCkuc3Vic2NyaWJlKFxyXG4gICAgLy8gICAgICAgICBkYXRhID0+IHsgXHJcbiAgICAvLyAgICAgICAgICBjb25zb2xlLmxvZyhcIkNvb3BlcmF0aXZlIExpc3QgXCIrIEpTT04uc3RyaW5naWZ5KGRhdGFbXCJkYXRhXCJdKSApO1xyXG4gICAgICAgXHJcbiAgICAgICAgXHJcbiAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgIFxyXG4gICAgLy8gICAgICAgICAgIH0sXHJcbiAgICAvLyAgICAgICAgICAgZXJyID0+IHtcclxuICAgIC8vICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcclxuICAgICAgICAgICAgICBcclxuICAgIC8vICAgICAgICAgICAgICB9XHJcbiAgICAvLyAgICAgICAgICk7XHQgIFxyXG4gICAgLy8gfVxyXG5cclxuICAgIHN0YXJ0QmFja2dyb3VuZEFuaW1hdGlvbihiYWNrZ3JvdW5kKSB7XHJcbiAgICAgICAgYmFja2dyb3VuZC5hbmltYXRlKHtcclxuICAgICAgICAgIHNjYWxlOiB7IHg6IDEuMCwgeTogMS4wIH0sXHJcbiAgICAgICAgICBkdXJhdGlvbjogMTAwMDBcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG5cclxuXHJcbiAgICAvLyAgIHB1YmxpYyBzaG93TW9kYWwoKSB7XHJcblxyXG4gICAgLy8gICAgIGNvbnN0IG9wdGlvbnM6IE1vZGFsRGlhbG9nT3B0aW9ucyA9IHtcclxuICAgIC8vICAgICAgICAgdmlld0NvbnRhaW5lclJlZjogdGhpcy52Y1JlZixcclxuICAgIC8vICAgICAgICAgY29udGV4dDoge30sXHJcbiAgICAvLyAgICAgICAgIGZ1bGxzY3JlZW46IGZhbHNlLFxyXG4gICAgLy8gICAgIH07XHJcbiAgICAvLyAgICAgbGV0IG9wdGlvbnMyID0ge1xyXG4gICAgLy8gICAgICAgICBjb250ZXh0OiB7fSxcclxuICAgICAgICAgIFxyXG4gICAgLy8gICAgICAgICB2aWV3Q29udGFpbmVyUmVmOiB0aGlzLnZjUmVmLFxyXG4gICAgLy8gICAgICAgICBmdWxsc2NyZWVuOiBmYWxzZSxcclxuICAgIC8vICAgICB9O1xyXG4gICAgLy8gICAgIHRoaXMubW9kYWwuc2hvd01vZGFsKE1vZGFsQ29tcG9uZW50LCBvcHRpb25zKS50aGVuKHJlcyA9PiB7XHJcbiAgICAvLyAgICAgICAgIGNvbnNvbGUubG9nKHJlcyk7XHJcbiAgICAvLyAgICAgfSk7XHJcblxyXG4gICAgLy8gfVxyXG5cclxuXHJcbiAgICBcclxuXHJcbn1cclxuXHJcbiJdfQ==