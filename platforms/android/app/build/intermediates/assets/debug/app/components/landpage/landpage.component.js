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
var LandpageComponent = /** @class */ (function () {
    // public input: any;
    // returnUrl: string;
    // username: string;
    // password: string;
    // private modal: ModalDialogService, private vcRef: ViewContainerRef
    function LandpageComponent(route, router, page, cooperativeService, authService, _page) {
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
    LandpageComponent.prototype.ngOnInit = function () {
        this._page.actionBarHidden = true;
        // this.page.actionBarHidden = true;
        // // if(ApplicationSettings.getBoolean("authenticated", false)) {
        // //     this.router.navigate(["/secure"], { clearHistory: true });
        // // }
        // // this.getCooperative();
        // //this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
        // this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
        // console.log("Routing to page " +  this.returnUrl);
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
    LandpageComponent.prototype.startBackgroundAnimation = function (background) {
        background.animate({
            scale: { x: 1.0, y: 1.0 },
            duration: 10000
        });
    };
    LandpageComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: "ns-landpage",
            templateUrl: "./landpage.component.html",
            styleUrls: ["./landpage-common.css", "./landpage.component.css"]
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute,
            router_1.Router,
            page_1.Page,
            cooperative_service_1.CooperativeService,
            auth_service_1.AuthService,
            page_1.Page])
    ], LandpageComponent);
    return LandpageComponent;
}());
exports.LandpageComponent = LandpageComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGFuZHBhZ2UuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibGFuZHBhZ2UuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQW1FO0FBRW5FLDBDQUF5RDtBQU96RCxnQ0FBK0I7QUFJL0IsdUNBQXVDO0FBRXZDLG1EQUFtRDtBQUNuRCwwRUFBc0U7QUFDdEUsNERBQXdEO0FBRXhELDJEQUEyRDtBQUUzRCxvRUFBb0U7QUFFcEUsdUNBQXVDO0FBRXZDLHlDQUF5QztBQUN6QyxtR0FBbUc7QUFDbkcsb0RBQW9EO0FBQ3BELElBQUksT0FBTyxHQUFHO0lBQ1YsT0FBTyxFQUFFLFlBQVk7SUFDckIsUUFBUSxFQUFFLElBQUk7SUFDZCxPQUFPLEVBQUU7UUFDUCxhQUFhLEVBQUUsSUFBSTtRQUNuQixVQUFVLEVBQUUsSUFBSTtRQUNoQixjQUFjLEVBQUUsVUFBUyxNQUFNLElBQUksT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFBLENBQUMsQ0FBQztRQUNyRSxHQUFHLEVBQUUsR0FBRztRQUNSLG9CQUFvQixFQUFFLFNBQVM7UUFDL0IscUJBQXFCLEVBQUUsSUFBSTtRQUMzQixhQUFhLEVBQUUsQ0FBQztRQUNoQixpQkFBaUIsRUFBRSxDQUFDO1FBQ3BCLEtBQUssRUFBRSxTQUFTO0tBQ2pCO0lBQ0QsR0FBRyxFQUFFO1FBQ0gsT0FBTyxFQUFFLHlCQUF5QjtRQUNsQyxNQUFNLEVBQUUsRUFBRTtRQUNWLGFBQWEsRUFBRSxJQUFJO1FBQ25CLEtBQUssRUFBRSxTQUFTO1FBQ2hCLGtDQUFrQztRQUNsQyx1Q0FBdUM7UUFDdkMsZUFBZSxFQUFFLFFBQVE7UUFDekIsc0JBQXNCLEVBQUUsS0FBSztRQUM3QixTQUFTLEVBQUUsSUFBSTtLQUdoQjtDQUNGLENBQUM7QUFRSjtJQUNFLHFCQUFxQjtJQUNyQixxQkFBcUI7SUFDckIsb0JBQW9CO0lBQ3BCLG9CQUFvQjtJQUVwQixxRUFBcUU7SUFFckUsMkJBQ1UsS0FBcUIsRUFDckIsTUFBYyxFQUNkLElBQVUsRUFDVixrQkFBc0MsRUFDdEMsV0FBd0IsRUFDeEIsS0FBVztRQUxYLFVBQUssR0FBTCxLQUFLLENBQWdCO1FBQ3JCLFdBQU0sR0FBTixNQUFNLENBQVE7UUFDZCxTQUFJLEdBQUosSUFBSSxDQUFNO1FBQ1YsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFvQjtRQUN0QyxnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUN4QixVQUFLLEdBQUwsS0FBSyxDQUFNO1FBRW5CLGlCQUFpQjtRQUNqQixtQkFBbUI7UUFDbkIscUJBQXFCO1FBQ3JCLElBQUk7SUFDTixDQUFDO0lBRU0sb0NBQVEsR0FBZjtRQUNFLElBQUksQ0FBQyxLQUFLLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQztRQUNsQyxvQ0FBb0M7UUFDcEMsa0VBQWtFO1FBQ2xFLG9FQUFvRTtRQUNwRSxPQUFPO1FBRVAsNEJBQTRCO1FBQzVCLDBFQUEwRTtRQUUxRSx3RUFBd0U7UUFFeEUscURBQXFEO0lBQ3ZELENBQUM7SUFFRCxtQkFBbUI7SUFDbkIsb0RBQW9EO0lBQ3BELG9GQUFvRjtJQUNwRiw2RkFBNkY7SUFDN0YscUVBQXFFO0lBQ3JFLHlFQUF5RTtJQUN6RSxtQkFBbUI7SUFDbkIsaUVBQWlFO0lBQ2pFLFlBQVk7SUFDWixlQUFlO0lBQ2YsMkRBQTJEO0lBQzNELFFBQVE7SUFDUixJQUFJO0lBRUosWUFBWTtJQUNaLHlEQUF5RDtJQUN6RCw2RUFBNkU7SUFFN0UsNkdBQTZHO0lBQzdHLGdCQUFnQjtJQUNoQixRQUFRO0lBQ1IsNkJBQTZCO0lBQzdCLDRCQUE0QjtJQUM1QixvRkFBb0Y7SUFDcEYsMkRBQTJEO0lBQzNELHNCQUFzQjtJQUN0Qix3QkFBd0I7SUFDeEIsaURBQWlEO0lBQ2pELHFEQUFxRDtJQUNyRCx3REFBd0Q7SUFDeEQsK0JBQStCO0lBQy9CLGlCQUFpQjtJQUNqQix5QkFBeUI7SUFDekIsb0RBQW9EO0lBRXBELGdGQUFnRjtJQUVoRixrRUFBa0U7SUFDbEUsaUNBQWlDO0lBQ2pDLHFEQUFxRDtJQUNyRCwyQ0FBMkM7SUFDM0Msa0JBQWtCO0lBQ2xCLElBQUk7SUFFSixvQkFBb0I7SUFDcEIsNkRBQTZEO0lBQzdELG9CQUFvQjtJQUNwQiw0RUFBNEU7SUFFNUUsZUFBZTtJQUNmLHFCQUFxQjtJQUNyQiwrQkFBK0I7SUFFL0IsaUJBQWlCO0lBQ2pCLGFBQWE7SUFDYixJQUFJO0lBRUosb0RBQXdCLEdBQXhCLFVBQXlCLFVBQVU7UUFDakMsVUFBVSxDQUFDLE9BQU8sQ0FBQztZQUNqQixLQUFLLEVBQUUsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUU7WUFDekIsUUFBUSxFQUFFLEtBQUs7U0FDaEIsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQW5HVSxpQkFBaUI7UUFON0IsZ0JBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixRQUFRLEVBQUUsYUFBYTtZQUN2QixXQUFXLEVBQUUsMkJBQTJCO1lBQ3hDLFNBQVMsRUFBRSxDQUFDLHVCQUF1QixFQUFFLDBCQUEwQixDQUFDO1NBQ2pFLENBQUM7eUNBVWlCLHVCQUFjO1lBQ2IsZUFBTTtZQUNSLFdBQUk7WUFDVSx3Q0FBa0I7WUFDekIsMEJBQVc7WUFDakIsV0FBSTtPQWRWLGlCQUFpQixDQXVIN0I7SUFBRCx3QkFBQztDQUFBLEFBdkhELElBdUhDO0FBdkhZLDhDQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LFZpZXdDb250YWluZXJSZWYgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5cclxuaW1wb3J0IHsgUm91dGVyLCBBY3RpdmF0ZWRSb3V0ZSB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcclxuaW1wb3J0IHsgQ29sb3IgfSBmcm9tIFwiY29sb3JcIjtcclxuXHJcbmltcG9ydCB7IGNvbm5lY3Rpb25UeXBlLCBnZXRDb25uZWN0aW9uVHlwZSB9IGZyb20gXCJjb25uZWN0aXZpdHlcIjtcclxuaW1wb3J0IHsgQW5pbWF0aW9uIH0gZnJvbSBcInVpL2FuaW1hdGlvblwiO1xyXG5pbXBvcnQgeyBWaWV3IH0gZnJvbSBcInVpL2NvcmUvdmlld1wiO1xyXG5pbXBvcnQgeyBwcm9tcHQgfSBmcm9tIFwidWkvZGlhbG9nc1wiO1xyXG5pbXBvcnQgeyBQYWdlIH0gZnJvbSBcInVpL3BhZ2VcIjtcclxuaW1wb3J0IHsgVGV4dEZpZWxkIH0gZnJvbSBcInVpL3RleHQtZmllbGRcIjtcclxuXHJcblxyXG4vL2ltcG9ydCB7IGFsZXJ0IH0gZnJvbSBcIi4uLy4uL3NoYXJlZFwiO1xyXG5cclxuLy9pbXBvcnQgeyBDb29wZXJhdGl2ZSB9IGZyb20gJy4uLy4uL21vZGVscy9pbmRleCc7XHJcbmltcG9ydCB7Q29vcGVyYXRpdmVTZXJ2aWNlfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvY29vcGVyYXRpdmUuc2VydmljZVwiO1xyXG5pbXBvcnQge0F1dGhTZXJ2aWNlfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvYXV0aC5zZXJ2aWNlXCI7XHJcblxyXG4vLyBpbXBvcnQgeyBUTlNGYW5jeUFsZXJ0IH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1mYW5jeWFsZXJ0XCI7XHJcblxyXG4vLyAgaW1wb3J0IHtMb2FkaW5nSW5kaWNhdG9yfSBmcm9tIFwibmF0aXZlc2NyaXB0LWxvYWRpbmctaW5kaWNhdG9yXCI7XHJcblxyXG4vLyB2YXIgbG9hZGVyID0gbmV3IExvYWRpbmdJbmRpY2F0b3IoKTtcclxuXHJcbi8vIGltcG9ydCAqIGFzIGRpYWxvZ3MgZnJvbSBcInVpL2RpYWxvZ3NcIjtcclxuLy8gaW1wb3J0IHsgTW9kYWxEaWFsb2dTZXJ2aWNlLE1vZGFsRGlhbG9nT3B0aW9ucyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9kaXJlY3RpdmVzL2RpYWxvZ3NcIjtcclxuLy8gaW1wb3J0IHsgTW9kYWxDb21wb25lbnQgfSBmcm9tIFwiLi4vLi4vYXBwLm1vZGFsXCI7XHJcbnZhciBvcHRpb25zID0ge1xyXG4gICAgbWVzc2FnZTogJ0xvYWRpbmcuLi4nLFxyXG4gICAgcHJvZ3Jlc3M6IDAuNjUsXHJcbiAgICBhbmRyb2lkOiB7XHJcbiAgICAgIGluZGV0ZXJtaW5hdGU6IHRydWUsXHJcbiAgICAgIGNhbmNlbGFibGU6IHRydWUsXHJcbiAgICAgIGNhbmNlbExpc3RlbmVyOiBmdW5jdGlvbihkaWFsb2cpIHsgY29uc29sZS5sb2coXCJMb2FkaW5nIGNhbmNlbGxlZFwiKSB9LFxyXG4gICAgICBtYXg6IDEwMCxcclxuICAgICAgcHJvZ3Jlc3NOdW1iZXJGb3JtYXQ6IFwiJTFkLyUyZFwiLFxyXG4gICAgICBwcm9ncmVzc1BlcmNlbnRGb3JtYXQ6IDAuNTMsXHJcbiAgICAgIHByb2dyZXNzU3R5bGU6IDEsXHJcbiAgICAgIHNlY29uZGFyeVByb2dyZXNzOiAxLFxyXG4gICAgICBjb2xvcjogXCIjNEI5RUQ2XCIsIC8vIGNvbG9yIG9mIGluZGljYXRvciBhbmQgbGFiZWxzXHJcbiAgICB9LFxyXG4gICAgaW9zOiB7XHJcbiAgICAgIGRldGFpbHM6IFwiQWRkaXRpb25hbCBkZXRhaWwgbm90ZSFcIixcclxuICAgICAgbWFyZ2luOiAxMCxcclxuICAgICAgZGltQmFja2dyb3VuZDogdHJ1ZSxcclxuICAgICAgY29sb3I6IFwiIzRCOUVENlwiLCAvLyBjb2xvciBvZiBpbmRpY2F0b3IgYW5kIGxhYmVsc1xyXG4gICAgICAvLyBiYWNrZ3JvdW5kIGJveCBhcm91bmQgaW5kaWNhdG9yXHJcbiAgICAgIC8vIGhpZGVCZXplbCB3aWxsIG92ZXJyaWRlIHRoaXMgaWYgdHJ1ZVxyXG4gICAgICBiYWNrZ3JvdW5kQ29sb3I6IFwieWVsbG93XCIsXHJcbiAgICAgIHVzZXJJbnRlcmFjdGlvbkVuYWJsZWQ6IGZhbHNlLCAvLyBkZWZhdWx0IHRydWUuIFNldCBmYWxzZSBzbyB0aGF0IHRoZSB0b3VjaGVzIHdpbGwgZmFsbCB0aHJvdWdoIGl0LlxyXG4gICAgICBoaWRlQmV6ZWw6IHRydWUsIC8vIGRlZmF1bHQgZmFsc2UsIGNhbiBoaWRlIHRoZSBzdXJyb3VuZGluZyBiZXplbFxyXG4gICAgLy8gICB2aWV3OiBVSVZpZXcsIC8vIFRhcmdldCB2aWV3IHRvIHNob3cgb24gdG9wIG9mIChEZWZhdWx0cyB0byBlbnRpcmUgd2luZG93KVxyXG4gICAgLy8gICBtb2RlOiAvLyBzZWUgaU9TIHNwZWNpZmljIG9wdGlvbnMgYmVsb3dcclxuICAgIH1cclxuICB9O1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcclxuICBzZWxlY3RvcjogXCJucy1sYW5kcGFnZVwiLFxyXG4gIHRlbXBsYXRlVXJsOiBcIi4vbGFuZHBhZ2UuY29tcG9uZW50Lmh0bWxcIixcclxuICBzdHlsZVVybHM6IFtcIi4vbGFuZHBhZ2UtY29tbW9uLmNzc1wiLCBcIi4vbGFuZHBhZ2UuY29tcG9uZW50LmNzc1wiXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgTGFuZHBhZ2VDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gIC8vIHB1YmxpYyBpbnB1dDogYW55O1xyXG4gIC8vIHJldHVyblVybDogc3RyaW5nO1xyXG4gIC8vIHVzZXJuYW1lOiBzdHJpbmc7XHJcbiAgLy8gcGFzc3dvcmQ6IHN0cmluZztcclxuXHJcbiAgLy8gcHJpdmF0ZSBtb2RhbDogTW9kYWxEaWFsb2dTZXJ2aWNlLCBwcml2YXRlIHZjUmVmOiBWaWV3Q29udGFpbmVyUmVmXHJcblxyXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgcm91dGU6IEFjdGl2YXRlZFJvdXRlLFxyXG4gICAgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlcixcclxuICAgIHByaXZhdGUgcGFnZTogUGFnZSxcclxuICAgIHByaXZhdGUgY29vcGVyYXRpdmVTZXJ2aWNlOiBDb29wZXJhdGl2ZVNlcnZpY2UsXHJcbiAgICBwcml2YXRlIGF1dGhTZXJ2aWNlOiBBdXRoU2VydmljZSxcclxuICAgIHByaXZhdGUgX3BhZ2U6IFBhZ2UsXHJcbiAgKSB7XHJcbiAgICAvLyB0aGlzLmlucHV0ID0ge1xyXG4gICAgLy8gICAgIFwiZW1haWxcIjogXCJcIixcclxuICAgIC8vICAgICBcInBhc3N3b3JkXCI6IFwiXCJcclxuICAgIC8vIH1cclxuICB9XHJcblxyXG4gIHB1YmxpYyBuZ09uSW5pdCgpIHtcclxuICAgIHRoaXMuX3BhZ2UuYWN0aW9uQmFySGlkZGVuID0gdHJ1ZTtcclxuICAgIC8vIHRoaXMucGFnZS5hY3Rpb25CYXJIaWRkZW4gPSB0cnVlO1xyXG4gICAgLy8gLy8gaWYoQXBwbGljYXRpb25TZXR0aW5ncy5nZXRCb29sZWFuKFwiYXV0aGVudGljYXRlZFwiLCBmYWxzZSkpIHtcclxuICAgIC8vIC8vICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbXCIvc2VjdXJlXCJdLCB7IGNsZWFySGlzdG9yeTogdHJ1ZSB9KTtcclxuICAgIC8vIC8vIH1cclxuXHJcbiAgICAvLyAvLyB0aGlzLmdldENvb3BlcmF0aXZlKCk7XHJcbiAgICAvLyAvL3RoaXMucmV0dXJuVXJsID0gdGhpcy5yb3V0ZS5zbmFwc2hvdC5xdWVyeVBhcmFtc1sncmV0dXJuVXJsJ10gfHwgJy8nO1xyXG5cclxuICAgIC8vIHRoaXMucmV0dXJuVXJsID0gdGhpcy5yb3V0ZS5zbmFwc2hvdC5xdWVyeVBhcmFtc1sncmV0dXJuVXJsJ10gfHwgJy8nO1xyXG5cclxuICAgIC8vIGNvbnNvbGUubG9nKFwiUm91dGluZyB0byBwYWdlIFwiICsgIHRoaXMucmV0dXJuVXJsKTtcclxuICB9XHJcblxyXG4gIC8vIHB1YmxpYyBsb2dpbigpIHtcclxuICAvLyAgICAgaWYodGhpcy5pbnB1dC5lbWFpbCAmJiB0aGlzLmlucHV0LnBhc3N3b3JkKSB7XHJcbiAgLy8gICAgICAgICBsZXQgYWNjb3VudCA9IEpTT04ucGFyc2UoQXBwbGljYXRpb25TZXR0aW5ncy5nZXRTdHJpbmcoXCJhY2NvdW50XCIsIFwie31cIikpO1xyXG4gIC8vICAgICAgICAgaWYodGhpcy5pbnB1dC5lbWFpbCA9PSBhY2NvdW50LmVtYWlsICYmIHRoaXMuaW5wdXQucGFzc3dvcmQgPT0gYWNjb3VudC5wYXNzd29yZCkge1xyXG4gIC8vICAgICAgICAgICAgIEFwcGxpY2F0aW9uU2V0dGluZ3Muc2V0Qm9vbGVhbihcImF1dGhlbnRpY2F0ZWRcIiwgdHJ1ZSk7XHJcbiAgLy8gICAgICAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW1wiL3NlY3VyZVwiXSwgeyBjbGVhckhpc3Rvcnk6IHRydWUgfSk7XHJcbiAgLy8gICAgICAgICB9IGVsc2Uge1xyXG4gIC8vICAgICAgICAgICAgIChuZXcgU25hY2tCYXIoKSkuc2ltcGxlKFwiSW5jb3JyZWN0IENyZWRlbnRpYWxzIVwiKTtcclxuICAvLyAgICAgICAgIH1cclxuICAvLyAgICAgfSBlbHNlIHtcclxuICAvLyAgICAgICAgIChuZXcgU25hY2tCYXIoKSkuc2ltcGxlKFwiQWxsIEZpZWxkcyBSZXF1aXJlZCFcIik7XHJcbiAgLy8gICAgIH1cclxuICAvLyB9XHJcblxyXG4gIC8vIGxvZ2luKCkge1xyXG4gIC8vICAgICBpZiAoZ2V0Q29ubmVjdGlvblR5cGUoKSA9PT0gY29ubmVjdGlvblR5cGUubm9uZSkge1xyXG4gIC8vICAgICAgLy8gYWxlcnQoXCJDb29wZXIgU3dpdGNoIHJlcXVpcmVzIGFuIGludGVybmV0IGNvbm5lY3Rpb24gdG8gbG9nIGluLlwiKTtcclxuXHJcbiAgLy8gICAgICAgVE5TRmFuY3lBbGVydC5zaG93RXJyb3IoXCJFcnJvciFcIiwgXCJDb29wZXIgU3dpdGNoIHJlcXVpcmVzIGFuIGludGVybmV0IGNvbm5lY3Rpb24gdG8gbG9nIGluLlwiLCBcIk9rXCIpO1xyXG4gIC8vICAgICAgIHJldHVybjtcclxuICAvLyAgICAgfVxyXG4gIC8vICAgICAvL3RoaXMubG9hZGluZyA9IHRydWU7XHJcbiAgLy8gICAgIGxvYWRlci5zaG93KG9wdGlvbnMpO1xyXG4gIC8vICAgICBjb25zb2xlLmxvZyhcIkxvZ2luIFJlYWNoaW5nIFwiICsgdGhpcy51c2VybmFtZSArIFwiIFBhc3N3b3JkXCIgKyB0aGlzLnBhc3N3b3JkKTtcclxuICAvLyAgICAgdGhpcy5hdXRoU2VydmljZS5sb2dpbih0aGlzLnVzZXJuYW1lLCB0aGlzLnBhc3N3b3JkKVxyXG4gIC8vICAgICAgICAgLnN1YnNjcmliZShcclxuICAvLyAgICAgICAgICAgICBkYXRhID0+IHtcclxuICAvLyAgICAgICAgICAgICAgIC8vdGhpcy5pc0F1dGhlbnRpY2F0aW5nID0gZmFsc2U7XHJcbiAgLy8gICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwibG9naW4gZGF0YSBcIiArIGRhdGEpO1xyXG4gIC8vICAgICAgICAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW3RoaXMucmV0dXJuVXJsXSk7XHJcbiAgLy8gICAgICAgICAgICAgICBsb2FkZXIuaGlkZSgpO1xyXG4gIC8vICAgICAgICAgICAgIH0sXHJcbiAgLy8gICAgICAgICAgICAgZXJyb3IgPT4ge1xyXG4gIC8vICAgICAgICAgICAgICAgICAvL3RoaXMuYWxlcnRTZXJ2aWNlLmVycm9yKGVycm9yKTtcclxuXHJcbiAgLy8gICAgICAgICAgICAgICAgIFROU0ZhbmN5QWxlcnQuc2hvd0Vycm9yKFwiRXJyb3IhXCIsIGVycm9yLmVycm9yLm1lc3NhZ2UsIFwiT2tcIik7XHJcblxyXG4gIC8vICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yIFwiICsgSlNPTi5zdHJpbmdpZnkoZXJyb3IpICk7XHJcbiAgLy8gICAgICAgICAgICAgICAgIGxvYWRlci5oaWRlKCk7XHJcbiAgLy8gICAgICAgICAgICAgICAgIC8vICB0aGlzLmlzQXV0aGVudGljYXRpbmcgPSBmYWxzZTtcclxuICAvLyAgICAgICAgICAgICAgICAgLy8gdGhpcy5sb2FkaW5nID0gZmFsc2U7XHJcbiAgLy8gICAgICAgICAgICAgfSk7XHJcbiAgLy8gfVxyXG5cclxuICAvLyBnZXRDb29wZXJhdGl2ZSgpe1xyXG4gIC8vICAgICB0aGlzLmNvb3BlcmF0aXZlU2VydmljZS5nZXRBbGxDb29wZXJhdGl2ZSgpLnN1YnNjcmliZShcclxuICAvLyAgICAgICAgIGRhdGEgPT4ge1xyXG4gIC8vICAgICAgICAgIGNvbnNvbGUubG9nKFwiQ29vcGVyYXRpdmUgTGlzdCBcIisgSlNPTi5zdHJpbmdpZnkoZGF0YVtcImRhdGFcIl0pICk7XHJcblxyXG4gIC8vICAgICAgICAgICB9LFxyXG4gIC8vICAgICAgICAgICBlcnIgPT4ge1xyXG4gIC8vICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcclxuXHJcbiAgLy8gICAgICAgICAgICAgIH1cclxuICAvLyAgICAgICAgICk7XHJcbiAgLy8gfVxyXG5cclxuICBzdGFydEJhY2tncm91bmRBbmltYXRpb24oYmFja2dyb3VuZCkge1xyXG4gICAgYmFja2dyb3VuZC5hbmltYXRlKHtcclxuICAgICAgc2NhbGU6IHsgeDogMS4wLCB5OiAxLjAgfSxcclxuICAgICAgZHVyYXRpb246IDEwMDAwXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8vICAgcHVibGljIHNob3dNb2RhbCgpIHtcclxuXHJcbiAgLy8gICAgIGNvbnN0IG9wdGlvbnM6IE1vZGFsRGlhbG9nT3B0aW9ucyA9IHtcclxuICAvLyAgICAgICAgIHZpZXdDb250YWluZXJSZWY6IHRoaXMudmNSZWYsXHJcbiAgLy8gICAgICAgICBjb250ZXh0OiB7fSxcclxuICAvLyAgICAgICAgIGZ1bGxzY3JlZW46IGZhbHNlLFxyXG4gIC8vICAgICB9O1xyXG4gIC8vICAgICBsZXQgb3B0aW9uczIgPSB7XHJcbiAgLy8gICAgICAgICBjb250ZXh0OiB7fSxcclxuXHJcbiAgLy8gICAgICAgICB2aWV3Q29udGFpbmVyUmVmOiB0aGlzLnZjUmVmLFxyXG4gIC8vICAgICAgICAgZnVsbHNjcmVlbjogZmFsc2UsXHJcbiAgLy8gICAgIH07XHJcbiAgLy8gICAgIHRoaXMubW9kYWwuc2hvd01vZGFsKE1vZGFsQ29tcG9uZW50LCBvcHRpb25zKS50aGVuKHJlcyA9PiB7XHJcbiAgLy8gICAgICAgICBjb25zb2xlLmxvZyhyZXMpO1xyXG4gIC8vICAgICB9KTtcclxuXHJcbiAgLy8gfVxyXG59XHJcblxyXG4iXX0=