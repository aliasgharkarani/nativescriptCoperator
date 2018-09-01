"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var autologout_service_1 = require("./services/autologout.service");
var AppComponent = /** @class */ (function () {
    function AppComponent(autoLogoutService) {
        this.autoLogoutService = autoLogoutService;
    }
    AppComponent.prototype.onBottomNavigationTabSelected = function (args) {
        console.log("Tab selected:  " + args.oldIndex);
    };
    AppComponent.prototype.onTouch = function (args) {
        console.log("Page is touched");
        this.autoLogoutService.reset();
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: "ns-app",
            templateUrl: "app.component.html",
        }),
        __metadata("design:paramtypes", [autologout_service_1.AutoLogoutService])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBaUQ7QUFFakQsb0VBQWtFO0FBT2xFO0lBRUssc0JBQW9CLGlCQUFtQztRQUFuQyxzQkFBaUIsR0FBakIsaUJBQWlCLENBQWtCO0lBRXZELENBQUM7SUFDRixvREFBNkIsR0FBN0IsVUFBOEIsSUFBNEI7UUFDdEQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxvQkFBa0IsSUFBSSxDQUFDLFFBQVUsQ0FBQyxDQUFDO0lBQ2pELENBQUM7SUFFRCw4QkFBTyxHQUFQLFVBQVEsSUFBMkI7UUFFakMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1FBQ2hDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUNsQyxDQUFDO0lBYlEsWUFBWTtRQUx4QixnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLFFBQVE7WUFDbEIsV0FBVyxFQUFFLG9CQUFvQjtTQUNwQyxDQUFDO3lDQUl5QyxzQ0FBaUI7T0FGL0MsWUFBWSxDQWN2QjtJQUFELG1CQUFDO0NBQUEsQUFkRixJQWNFO0FBZFcsb0NBQVkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsT25Jbml0IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IEJvdHRvbU5hdmlnYXRpb24sIEJvdHRvbU5hdmlnYXRpb25UYWIsIE9uVGFiU2VsZWN0ZWRFdmVudERhdGEgfSBmcm9tICduYXRpdmVzY3JpcHQtYm90dG9tLW5hdmlnYXRpb24nO1xuaW1wb3J0IHsgQXV0b0xvZ291dFNlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2VzL2F1dG9sb2dvdXQuc2VydmljZSc7XG5pbXBvcnQgeyBUb3VjaEdlc3R1cmVFdmVudERhdGEgfSBmcm9tIFwidWkvZ2VzdHVyZXNcIjtcbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcIm5zLWFwcFwiLFxuICAgIHRlbXBsYXRlVXJsOiBcImFwcC5jb21wb25lbnQuaHRtbFwiLFxufSlcblxuZXhwb3J0IGNsYXNzIEFwcENvbXBvbmVudCB7XG5cbiAgICAgY29uc3RydWN0b3IocHJpdmF0ZSBhdXRvTG9nb3V0U2VydmljZTpBdXRvTG9nb3V0U2VydmljZSl7XG5cbiAgICAgfVxuICAgIG9uQm90dG9tTmF2aWdhdGlvblRhYlNlbGVjdGVkKGFyZ3M6IE9uVGFiU2VsZWN0ZWRFdmVudERhdGEpOiB2b2lkIHtcbiAgICAgICAgY29uc29sZS5sb2coYFRhYiBzZWxlY3RlZDogICR7YXJncy5vbGRJbmRleH1gKTtcbiAgICAgIH1cblxuICAgICAgb25Ub3VjaChhcmdzOiBUb3VjaEdlc3R1cmVFdmVudERhdGEpIHtcblxuICAgICAgICBjb25zb2xlLmxvZyhcIlBhZ2UgaXMgdG91Y2hlZFwiKTtcbiAgICAgICB0aGlzLmF1dG9Mb2dvdXRTZXJ2aWNlLnJlc2V0KCk7XG4gICAgfVxuIH1cbiJdfQ==