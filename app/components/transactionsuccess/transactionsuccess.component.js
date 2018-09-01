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
var SuccessTransComponent = /** @class */ (function () {
    // public input: any;
    // returnUrl: string;
    // username: string;
    // password: string;
    // private modal: ModalDialogService, private vcRef: ViewContainerRef 
    function SuccessTransComponent(route, router, page, cooperativeService, authService, _page) {
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
    SuccessTransComponent.prototype.ngOnInit = function () {
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
    SuccessTransComponent.prototype.startBackgroundAnimation = function (background) {
        background.animate({
            scale: { x: 1.0, y: 1.0 },
            duration: 10000
        });
    };
    SuccessTransComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: "ns-transactionsuccess",
            templateUrl: "./transactionsuccess.component.html",
            styleUrls: ["./transactionsuccess-common.css", "./transactionsuccess.component.css"],
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute, router_1.Router, page_1.Page, cooperative_service_1.CooperativeService, auth_service_1.AuthService,
            page_1.Page])
    ], SuccessTransComponent);
    return SuccessTransComponent;
}());
exports.SuccessTransComponent = SuccessTransComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNhY3Rpb25zdWNjZXNzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInRyYW5zYWN0aW9uc3VjY2Vzcy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBbUU7QUFFbkUsMENBQXlEO0FBT3pELGdDQUErQjtBQUkvQix1Q0FBdUM7QUFFdkMsbURBQW1EO0FBQ25ELDBFQUFzRTtBQUN0RSw0REFBd0Q7QUFFeEQsMkRBQTJEO0FBRTNELG9FQUFvRTtBQUVwRSx1Q0FBdUM7QUFFdkMseUNBQXlDO0FBQ3pDLG1HQUFtRztBQUNuRyxvREFBb0Q7QUFDcEQsSUFBSSxPQUFPLEdBQUc7SUFDVixPQUFPLEVBQUUsWUFBWTtJQUNyQixRQUFRLEVBQUUsSUFBSTtJQUNkLE9BQU8sRUFBRTtRQUNQLGFBQWEsRUFBRSxJQUFJO1FBQ25CLFVBQVUsRUFBRSxJQUFJO1FBQ2hCLGNBQWMsRUFBRSxVQUFTLE1BQU0sSUFBSSxPQUFPLENBQUMsR0FBRyxDQUFDLG1CQUFtQixDQUFDLENBQUEsQ0FBQyxDQUFDO1FBQ3JFLEdBQUcsRUFBRSxHQUFHO1FBQ1Isb0JBQW9CLEVBQUUsU0FBUztRQUMvQixxQkFBcUIsRUFBRSxJQUFJO1FBQzNCLGFBQWEsRUFBRSxDQUFDO1FBQ2hCLGlCQUFpQixFQUFFLENBQUM7UUFDcEIsS0FBSyxFQUFFLFNBQVM7S0FDakI7SUFDRCxHQUFHLEVBQUU7UUFDSCxPQUFPLEVBQUUseUJBQXlCO1FBQ2xDLE1BQU0sRUFBRSxFQUFFO1FBQ1YsYUFBYSxFQUFFLElBQUk7UUFDbkIsS0FBSyxFQUFFLFNBQVM7UUFDaEIsa0NBQWtDO1FBQ2xDLHVDQUF1QztRQUN2QyxlQUFlLEVBQUUsUUFBUTtRQUN6QixzQkFBc0IsRUFBRSxLQUFLO1FBQzdCLFNBQVMsRUFBRSxJQUFJO0tBR2hCO0NBQ0YsQ0FBQztBQVVKO0lBRUkscUJBQXFCO0lBQ3JCLHFCQUFxQjtJQUNyQixvQkFBb0I7SUFDcEIsb0JBQW9CO0lBS3BCLHNFQUFzRTtJQUV0RSwrQkFBMkIsS0FBcUIsRUFBUyxNQUFjLEVBQVMsSUFBVSxFQUFVLGtCQUFzQyxFQUFVLFdBQXVCLEVBRS9KLEtBQVc7UUFGSSxVQUFLLEdBQUwsS0FBSyxDQUFnQjtRQUFTLFdBQU0sR0FBTixNQUFNLENBQVE7UUFBUyxTQUFJLEdBQUosSUFBSSxDQUFNO1FBQVUsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFvQjtRQUFVLGdCQUFXLEdBQVgsV0FBVyxDQUFZO1FBRS9KLFVBQUssR0FBTCxLQUFLLENBQU07UUFHbkIsaUJBQWlCO1FBQ2pCLG1CQUFtQjtRQUNuQixxQkFBcUI7UUFDckIsSUFBSTtJQUNSLENBQUM7SUFHTSx3Q0FBUSxHQUFmO1FBQ0ksSUFBSSxDQUFDLEtBQUssQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDO1FBQ2xDLG9DQUFvQztRQUNwQyxrRUFBa0U7UUFDbEUsb0VBQW9FO1FBQ3BFLE9BQU87UUFFUCw0QkFBNEI7UUFDNUIsMEVBQTBFO1FBRTFFLHdFQUF3RTtRQUV4RSxxREFBcUQ7SUFHekQsQ0FBQztJQUVELG1CQUFtQjtJQUNuQixvREFBb0Q7SUFDcEQsb0ZBQW9GO0lBQ3BGLDZGQUE2RjtJQUM3RixxRUFBcUU7SUFDckUseUVBQXlFO0lBQ3pFLG1CQUFtQjtJQUNuQixpRUFBaUU7SUFDakUsWUFBWTtJQUNaLGVBQWU7SUFDZiwyREFBMkQ7SUFDM0QsUUFBUTtJQUNSLElBQUk7SUFFSixZQUFZO0lBQ1oseURBQXlEO0lBQ3pELDZFQUE2RTtJQUU3RSw2R0FBNkc7SUFDN0csZ0JBQWdCO0lBQ2hCLFFBQVE7SUFDUiw2QkFBNkI7SUFDN0IsNEJBQTRCO0lBQzVCLG9GQUFvRjtJQUNwRiwyREFBMkQ7SUFDM0Qsc0JBQXNCO0lBQ3RCLHdCQUF3QjtJQUN4QixpREFBaUQ7SUFDakQscURBQXFEO0lBQ3JELHdEQUF3RDtJQUN4RCwrQkFBK0I7SUFDL0IsaUJBQWlCO0lBQ2pCLHlCQUF5QjtJQUN6QixvREFBb0Q7SUFFcEQsZ0ZBQWdGO0lBRWhGLGtFQUFrRTtJQUNsRSxpQ0FBaUM7SUFDakMscURBQXFEO0lBQ3JELDJDQUEyQztJQUMzQyxrQkFBa0I7SUFDbEIsSUFBSTtJQUdKLG9CQUFvQjtJQUNwQiw2REFBNkQ7SUFDN0QscUJBQXFCO0lBQ3JCLDRFQUE0RTtJQUs1RSxlQUFlO0lBQ2YscUJBQXFCO0lBQ3JCLCtCQUErQjtJQUUvQixpQkFBaUI7SUFDakIsZ0JBQWdCO0lBQ2hCLElBQUk7SUFFSix3REFBd0IsR0FBeEIsVUFBeUIsVUFBVTtRQUMvQixVQUFVLENBQUMsT0FBTyxDQUFDO1lBQ2pCLEtBQUssRUFBRSxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRTtZQUN6QixRQUFRLEVBQUUsS0FBSztTQUNoQixDQUFDLENBQUM7SUFDTCxDQUFDO0lBM0dNLHFCQUFxQjtRQVJqQyxnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFFBQVEsRUFBRSx1QkFBdUI7WUFDakMsV0FBVyxFQUFFLHFDQUFxQztZQUNsRCxTQUFTLEVBQUUsQ0FBQyxpQ0FBaUMsRUFBRSxvQ0FBb0MsQ0FBQztTQUN2RixDQUFDO3lDQWVvQyx1QkFBYyxFQUFpQixlQUFNLEVBQWUsV0FBSSxFQUE4Qix3Q0FBa0IsRUFBc0IsMEJBQVc7WUFFeEosV0FBSTtPQWRkLHFCQUFxQixDQW9JakM7SUFBRCw0QkFBQztDQUFBLEFBcElELElBb0lDO0FBcElZLHNEQUFxQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LFZpZXdDb250YWluZXJSZWYgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5cclxuaW1wb3J0IHsgUm91dGVyLCBBY3RpdmF0ZWRSb3V0ZSB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcclxuaW1wb3J0IHsgQ29sb3IgfSBmcm9tIFwiY29sb3JcIjtcclxuXHJcbmltcG9ydCB7IGNvbm5lY3Rpb25UeXBlLCBnZXRDb25uZWN0aW9uVHlwZSB9IGZyb20gXCJjb25uZWN0aXZpdHlcIjtcclxuaW1wb3J0IHsgQW5pbWF0aW9uIH0gZnJvbSBcInVpL2FuaW1hdGlvblwiO1xyXG5pbXBvcnQgeyBWaWV3IH0gZnJvbSBcInVpL2NvcmUvdmlld1wiO1xyXG5pbXBvcnQgeyBwcm9tcHQgfSBmcm9tIFwidWkvZGlhbG9nc1wiO1xyXG5pbXBvcnQgeyBQYWdlIH0gZnJvbSBcInVpL3BhZ2VcIjtcclxuaW1wb3J0IHsgVGV4dEZpZWxkIH0gZnJvbSBcInVpL3RleHQtZmllbGRcIjtcclxuXHJcblxyXG4vL2ltcG9ydCB7IGFsZXJ0IH0gZnJvbSBcIi4uLy4uL3NoYXJlZFwiO1xyXG5cclxuLy9pbXBvcnQgeyBDb29wZXJhdGl2ZSB9IGZyb20gJy4uLy4uL21vZGVscy9pbmRleCc7XHJcbmltcG9ydCB7Q29vcGVyYXRpdmVTZXJ2aWNlfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvY29vcGVyYXRpdmUuc2VydmljZVwiO1xyXG5pbXBvcnQge0F1dGhTZXJ2aWNlfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvYXV0aC5zZXJ2aWNlXCI7XHJcblxyXG4vLyBpbXBvcnQgeyBUTlNGYW5jeUFsZXJ0IH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1mYW5jeWFsZXJ0XCI7XHJcblxyXG4vLyAgaW1wb3J0IHtMb2FkaW5nSW5kaWNhdG9yfSBmcm9tIFwibmF0aXZlc2NyaXB0LWxvYWRpbmctaW5kaWNhdG9yXCI7XHJcblxyXG4vLyB2YXIgbG9hZGVyID0gbmV3IExvYWRpbmdJbmRpY2F0b3IoKTtcclxuXHJcbi8vIGltcG9ydCAqIGFzIGRpYWxvZ3MgZnJvbSBcInVpL2RpYWxvZ3NcIjtcclxuLy8gaW1wb3J0IHsgTW9kYWxEaWFsb2dTZXJ2aWNlLE1vZGFsRGlhbG9nT3B0aW9ucyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9kaXJlY3RpdmVzL2RpYWxvZ3NcIjtcclxuLy8gaW1wb3J0IHsgTW9kYWxDb21wb25lbnQgfSBmcm9tIFwiLi4vLi4vYXBwLm1vZGFsXCI7XHJcbnZhciBvcHRpb25zID0ge1xyXG4gICAgbWVzc2FnZTogJ0xvYWRpbmcuLi4nLFxyXG4gICAgcHJvZ3Jlc3M6IDAuNjUsXHJcbiAgICBhbmRyb2lkOiB7XHJcbiAgICAgIGluZGV0ZXJtaW5hdGU6IHRydWUsXHJcbiAgICAgIGNhbmNlbGFibGU6IHRydWUsXHJcbiAgICAgIGNhbmNlbExpc3RlbmVyOiBmdW5jdGlvbihkaWFsb2cpIHsgY29uc29sZS5sb2coXCJMb2FkaW5nIGNhbmNlbGxlZFwiKSB9LFxyXG4gICAgICBtYXg6IDEwMCxcclxuICAgICAgcHJvZ3Jlc3NOdW1iZXJGb3JtYXQ6IFwiJTFkLyUyZFwiLFxyXG4gICAgICBwcm9ncmVzc1BlcmNlbnRGb3JtYXQ6IDAuNTMsXHJcbiAgICAgIHByb2dyZXNzU3R5bGU6IDEsXHJcbiAgICAgIHNlY29uZGFyeVByb2dyZXNzOiAxLFxyXG4gICAgICBjb2xvcjogXCIjNEI5RUQ2XCIsIC8vIGNvbG9yIG9mIGluZGljYXRvciBhbmQgbGFiZWxzXHJcbiAgICB9LFxyXG4gICAgaW9zOiB7XHJcbiAgICAgIGRldGFpbHM6IFwiQWRkaXRpb25hbCBkZXRhaWwgbm90ZSFcIixcclxuICAgICAgbWFyZ2luOiAxMCxcclxuICAgICAgZGltQmFja2dyb3VuZDogdHJ1ZSxcclxuICAgICAgY29sb3I6IFwiIzRCOUVENlwiLCAvLyBjb2xvciBvZiBpbmRpY2F0b3IgYW5kIGxhYmVsc1xyXG4gICAgICAvLyBiYWNrZ3JvdW5kIGJveCBhcm91bmQgaW5kaWNhdG9yXHJcbiAgICAgIC8vIGhpZGVCZXplbCB3aWxsIG92ZXJyaWRlIHRoaXMgaWYgdHJ1ZVxyXG4gICAgICBiYWNrZ3JvdW5kQ29sb3I6IFwieWVsbG93XCIsXHJcbiAgICAgIHVzZXJJbnRlcmFjdGlvbkVuYWJsZWQ6IGZhbHNlLCAvLyBkZWZhdWx0IHRydWUuIFNldCBmYWxzZSBzbyB0aGF0IHRoZSB0b3VjaGVzIHdpbGwgZmFsbCB0aHJvdWdoIGl0LlxyXG4gICAgICBoaWRlQmV6ZWw6IHRydWUsIC8vIGRlZmF1bHQgZmFsc2UsIGNhbiBoaWRlIHRoZSBzdXJyb3VuZGluZyBiZXplbFxyXG4gICAgLy8gICB2aWV3OiBVSVZpZXcsIC8vIFRhcmdldCB2aWV3IHRvIHNob3cgb24gdG9wIG9mIChEZWZhdWx0cyB0byBlbnRpcmUgd2luZG93KVxyXG4gICAgLy8gICBtb2RlOiAvLyBzZWUgaU9TIHNwZWNpZmljIG9wdGlvbnMgYmVsb3dcclxuICAgIH1cclxuICB9O1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxyXG4gICAgc2VsZWN0b3I6IFwibnMtdHJhbnNhY3Rpb25zdWNjZXNzXCIsXHJcbiAgICB0ZW1wbGF0ZVVybDogXCIuL3RyYW5zYWN0aW9uc3VjY2Vzcy5jb21wb25lbnQuaHRtbFwiLFxyXG4gICAgc3R5bGVVcmxzOiBbXCIuL3RyYW5zYWN0aW9uc3VjY2Vzcy1jb21tb24uY3NzXCIsIFwiLi90cmFuc2FjdGlvbnN1Y2Nlc3MuY29tcG9uZW50LmNzc1wiXSxcclxufSlcclxuXHJcblxyXG5leHBvcnQgY2xhc3MgU3VjY2Vzc1RyYW5zQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuXHJcbiAgICAvLyBwdWJsaWMgaW5wdXQ6IGFueTtcclxuICAgIC8vIHJldHVyblVybDogc3RyaW5nO1xyXG4gICAgLy8gdXNlcm5hbWU6IHN0cmluZztcclxuICAgIC8vIHBhc3N3b3JkOiBzdHJpbmc7XHJcblxyXG5cclxuICAgIFxyXG5cclxuICAgIC8vIHByaXZhdGUgbW9kYWw6IE1vZGFsRGlhbG9nU2VydmljZSwgcHJpdmF0ZSB2Y1JlZjogVmlld0NvbnRhaW5lclJlZiBcclxuXHJcbiAgICBwdWJsaWMgY29uc3RydWN0b3IocHJpdmF0ZSByb3V0ZTogQWN0aXZhdGVkUm91dGUscHJpdmF0ZSByb3V0ZXI6IFJvdXRlcixwcml2YXRlIHBhZ2U6IFBhZ2UsIHByaXZhdGUgY29vcGVyYXRpdmVTZXJ2aWNlOiBDb29wZXJhdGl2ZVNlcnZpY2UsIHByaXZhdGUgYXV0aFNlcnZpY2U6QXV0aFNlcnZpY2UsXHJcbiAgICAgICBcclxuICAgICAgICBwcml2YXRlIF9wYWdlOiBQYWdlLFxyXG4gICAgICAgKVxyXG4gICAgICAgIHtcclxuICAgICAgICAvLyB0aGlzLmlucHV0ID0ge1xyXG4gICAgICAgIC8vICAgICBcImVtYWlsXCI6IFwiXCIsXHJcbiAgICAgICAgLy8gICAgIFwicGFzc3dvcmRcIjogXCJcIlxyXG4gICAgICAgIC8vIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgcHVibGljIG5nT25Jbml0KCkge1xyXG4gICAgICAgIHRoaXMuX3BhZ2UuYWN0aW9uQmFySGlkZGVuID0gdHJ1ZTtcclxuICAgICAgICAvLyB0aGlzLnBhZ2UuYWN0aW9uQmFySGlkZGVuID0gdHJ1ZTtcclxuICAgICAgICAvLyAvLyBpZihBcHBsaWNhdGlvblNldHRpbmdzLmdldEJvb2xlYW4oXCJhdXRoZW50aWNhdGVkXCIsIGZhbHNlKSkge1xyXG4gICAgICAgIC8vIC8vICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbXCIvc2VjdXJlXCJdLCB7IGNsZWFySGlzdG9yeTogdHJ1ZSB9KTtcclxuICAgICAgICAvLyAvLyB9XHJcblxyXG4gICAgICAgIC8vIC8vIHRoaXMuZ2V0Q29vcGVyYXRpdmUoKTtcclxuICAgICAgICAvLyAvL3RoaXMucmV0dXJuVXJsID0gdGhpcy5yb3V0ZS5zbmFwc2hvdC5xdWVyeVBhcmFtc1sncmV0dXJuVXJsJ10gfHwgJy8nO1xyXG5cclxuICAgICAgICAvLyB0aGlzLnJldHVyblVybCA9IHRoaXMucm91dGUuc25hcHNob3QucXVlcnlQYXJhbXNbJ3JldHVyblVybCddIHx8ICcvJztcclxuXHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJSb3V0aW5nIHRvIHBhZ2UgXCIgKyAgdGhpcy5yZXR1cm5VcmwpO1xyXG5cclxuXHJcbiAgICB9XHJcblxyXG4gICAgLy8gcHVibGljIGxvZ2luKCkge1xyXG4gICAgLy8gICAgIGlmKHRoaXMuaW5wdXQuZW1haWwgJiYgdGhpcy5pbnB1dC5wYXNzd29yZCkge1xyXG4gICAgLy8gICAgICAgICBsZXQgYWNjb3VudCA9IEpTT04ucGFyc2UoQXBwbGljYXRpb25TZXR0aW5ncy5nZXRTdHJpbmcoXCJhY2NvdW50XCIsIFwie31cIikpO1xyXG4gICAgLy8gICAgICAgICBpZih0aGlzLmlucHV0LmVtYWlsID09IGFjY291bnQuZW1haWwgJiYgdGhpcy5pbnB1dC5wYXNzd29yZCA9PSBhY2NvdW50LnBhc3N3b3JkKSB7XHJcbiAgICAvLyAgICAgICAgICAgICBBcHBsaWNhdGlvblNldHRpbmdzLnNldEJvb2xlYW4oXCJhdXRoZW50aWNhdGVkXCIsIHRydWUpO1xyXG4gICAgLy8gICAgICAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW1wiL3NlY3VyZVwiXSwgeyBjbGVhckhpc3Rvcnk6IHRydWUgfSk7XHJcbiAgICAvLyAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAvLyAgICAgICAgICAgICAobmV3IFNuYWNrQmFyKCkpLnNpbXBsZShcIkluY29ycmVjdCBDcmVkZW50aWFscyFcIik7XHJcbiAgICAvLyAgICAgICAgIH1cclxuICAgIC8vICAgICB9IGVsc2Uge1xyXG4gICAgLy8gICAgICAgICAobmV3IFNuYWNrQmFyKCkpLnNpbXBsZShcIkFsbCBGaWVsZHMgUmVxdWlyZWQhXCIpO1xyXG4gICAgLy8gICAgIH1cclxuICAgIC8vIH1cclxuXHJcbiAgICAvLyBsb2dpbigpIHtcclxuICAgIC8vICAgICBpZiAoZ2V0Q29ubmVjdGlvblR5cGUoKSA9PT0gY29ubmVjdGlvblR5cGUubm9uZSkge1xyXG4gICAgLy8gICAgICAvLyBhbGVydChcIkNvb3BlciBTd2l0Y2ggcmVxdWlyZXMgYW4gaW50ZXJuZXQgY29ubmVjdGlvbiB0byBsb2cgaW4uXCIpO1xyXG5cclxuICAgIC8vICAgICAgIFROU0ZhbmN5QWxlcnQuc2hvd0Vycm9yKFwiRXJyb3IhXCIsIFwiQ29vcGVyIFN3aXRjaCByZXF1aXJlcyBhbiBpbnRlcm5ldCBjb25uZWN0aW9uIHRvIGxvZyBpbi5cIiwgXCJPa1wiKTtcclxuICAgIC8vICAgICAgIHJldHVybjtcclxuICAgIC8vICAgICB9XHJcbiAgICAvLyAgICAgLy90aGlzLmxvYWRpbmcgPSB0cnVlO1xyXG4gICAgLy8gICAgIGxvYWRlci5zaG93KG9wdGlvbnMpO1xyXG4gICAgLy8gICAgIGNvbnNvbGUubG9nKFwiTG9naW4gUmVhY2hpbmcgXCIgKyB0aGlzLnVzZXJuYW1lICsgXCIgUGFzc3dvcmRcIiArIHRoaXMucGFzc3dvcmQpO1xyXG4gICAgLy8gICAgIHRoaXMuYXV0aFNlcnZpY2UubG9naW4odGhpcy51c2VybmFtZSwgdGhpcy5wYXNzd29yZClcclxuICAgIC8vICAgICAgICAgLnN1YnNjcmliZShcclxuICAgIC8vICAgICAgICAgICAgIGRhdGEgPT4ge1xyXG4gICAgLy8gICAgICAgICAgICAgICAvL3RoaXMuaXNBdXRoZW50aWNhdGluZyA9IGZhbHNlO1xyXG4gICAgLy8gICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwibG9naW4gZGF0YSBcIiArIGRhdGEpO1xyXG4gICAgLy8gICAgICAgICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbdGhpcy5yZXR1cm5VcmxdKTtcclxuICAgIC8vICAgICAgICAgICAgICAgbG9hZGVyLmhpZGUoKTtcclxuICAgIC8vICAgICAgICAgICAgIH0sXHJcbiAgICAvLyAgICAgICAgICAgICBlcnJvciA9PiB7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgLy90aGlzLmFsZXJ0U2VydmljZS5lcnJvcihlcnJvcik7XHJcblxyXG4gICAgLy8gICAgICAgICAgICAgICAgIFROU0ZhbmN5QWxlcnQuc2hvd0Vycm9yKFwiRXJyb3IhXCIsIGVycm9yLmVycm9yLm1lc3NhZ2UsIFwiT2tcIik7XHJcbiAgICAgICAgICAgIFxyXG4gICAgLy8gICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3IgXCIgKyBKU09OLnN0cmluZ2lmeShlcnJvcikgKTtcclxuICAgIC8vICAgICAgICAgICAgICAgICBsb2FkZXIuaGlkZSgpO1xyXG4gICAgLy8gICAgICAgICAgICAgICAgIC8vICB0aGlzLmlzQXV0aGVudGljYXRpbmcgPSBmYWxzZTtcclxuICAgIC8vICAgICAgICAgICAgICAgICAvLyB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcclxuICAgIC8vICAgICAgICAgICAgIH0pO1xyXG4gICAgLy8gfVxyXG4gICAgXHJcblxyXG4gICAgLy8gZ2V0Q29vcGVyYXRpdmUoKXtcclxuICAgIC8vICAgICB0aGlzLmNvb3BlcmF0aXZlU2VydmljZS5nZXRBbGxDb29wZXJhdGl2ZSgpLnN1YnNjcmliZShcclxuICAgIC8vICAgICAgICAgZGF0YSA9PiB7IFxyXG4gICAgLy8gICAgICAgICAgY29uc29sZS5sb2coXCJDb29wZXJhdGl2ZSBMaXN0IFwiKyBKU09OLnN0cmluZ2lmeShkYXRhW1wiZGF0YVwiXSkgKTtcclxuICAgICAgIFxyXG4gICAgICAgIFxyXG4gICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICBcclxuICAgIC8vICAgICAgICAgICB9LFxyXG4gICAgLy8gICAgICAgICAgIGVyciA9PiB7XHJcbiAgICAvLyAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XHJcbiAgICAgICAgICAgICAgXHJcbiAgICAvLyAgICAgICAgICAgICAgfVxyXG4gICAgLy8gICAgICAgICApO1x0ICBcclxuICAgIC8vIH1cclxuXHJcbiAgICBzdGFydEJhY2tncm91bmRBbmltYXRpb24oYmFja2dyb3VuZCkge1xyXG4gICAgICAgIGJhY2tncm91bmQuYW5pbWF0ZSh7XHJcbiAgICAgICAgICBzY2FsZTogeyB4OiAxLjAsIHk6IDEuMCB9LFxyXG4gICAgICAgICAgZHVyYXRpb246IDEwMDAwXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuXHJcblxyXG4gICAgLy8gICBwdWJsaWMgc2hvd01vZGFsKCkge1xyXG5cclxuICAgIC8vICAgICBjb25zdCBvcHRpb25zOiBNb2RhbERpYWxvZ09wdGlvbnMgPSB7XHJcbiAgICAvLyAgICAgICAgIHZpZXdDb250YWluZXJSZWY6IHRoaXMudmNSZWYsXHJcbiAgICAvLyAgICAgICAgIGNvbnRleHQ6IHt9LFxyXG4gICAgLy8gICAgICAgICBmdWxsc2NyZWVuOiBmYWxzZSxcclxuICAgIC8vICAgICB9O1xyXG4gICAgLy8gICAgIGxldCBvcHRpb25zMiA9IHtcclxuICAgIC8vICAgICAgICAgY29udGV4dDoge30sXHJcbiAgICAgICAgICBcclxuICAgIC8vICAgICAgICAgdmlld0NvbnRhaW5lclJlZjogdGhpcy52Y1JlZixcclxuICAgIC8vICAgICAgICAgZnVsbHNjcmVlbjogZmFsc2UsXHJcbiAgICAvLyAgICAgfTtcclxuICAgIC8vICAgICB0aGlzLm1vZGFsLnNob3dNb2RhbChNb2RhbENvbXBvbmVudCwgb3B0aW9ucykudGhlbihyZXMgPT4ge1xyXG4gICAgLy8gICAgICAgICBjb25zb2xlLmxvZyhyZXMpO1xyXG4gICAgLy8gICAgIH0pO1xyXG5cclxuICAgIC8vIH1cclxuXHJcblxyXG4gICAgXHJcblxyXG59XHJcblxyXG4iXX0=