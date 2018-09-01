"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var AuthGuard = /** @class */ (function () {
    function AuthGuard(router) {
        this.router = router;
    }
    AuthGuard.prototype.canActivate = function (route, state) {
        console.log("Current User State " + localStorage.getItem('currentUser'));
        if (localStorage.getItem('currentUser')) {
            //         var dataObject = JSON.parse(localStorage.getItem('currentUser'));
            //   console.log("User has login " + dataObject);
            var dataObject = JSON.parse(localStorage.getItem('currentUser'));
            if (dataObject.userMode == "New") {
                //this.router.navigate(['/changepassword']);
                this.router.navigate(['/password']);
            }
            if (dataObject.userMode == "PhoneVerify") {
                this.router.navigate(['/verifyphone']);
            }
            if (dataObject.userMode == "OTPVerify") {
                this.router.navigate(['/otp']);
            }
            if (dataObject.userMode == "TransPin") {
                this.router.navigate(['/transpin']);
            }
            // logged in so return true
            return true;
        }
        // not logged in so redirect to login page with the return url
        this.router.navigate(['/landingpage'], { queryParams: { returnUrl: state.url } });
        return false;
    };
    AuthGuard = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [router_1.Router])
    ], AuthGuard);
    return AuthGuard;
}());
exports.AuthGuard = AuthGuard;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC1ndWFyZC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXV0aC1ndWFyZC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTJDO0FBRTNDLDBDQUFtRztBQUluRztJQUVJLG1CQUFvQixNQUFjO1FBQWQsV0FBTSxHQUFOLE1BQU0sQ0FBUTtJQUFJLENBQUM7SUFFdkMsK0JBQVcsR0FBWCxVQUFZLEtBQTZCLEVBQUUsS0FBMEI7UUFDakUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsR0FBRyxZQUFZLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7UUFDekUsRUFBRSxDQUFDLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFOUMsNEVBQTRFO1lBRTVFLGlEQUFpRDtZQUU3QyxJQUFJLFVBQVUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztZQUc3RCxFQUFFLENBQUEsQ0FBQyxVQUFVLENBQUMsUUFBUSxJQUFJLEtBQUssQ0FBQyxDQUNoQyxDQUFDO2dCQUNHLDRDQUE0QztnQkFDNUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO1lBQ3hDLENBQUM7WUFFRCxFQUFFLENBQUEsQ0FBQyxVQUFVLENBQUMsUUFBUSxJQUFJLGFBQWEsQ0FBQyxDQUN4QyxDQUFDO2dCQUNHLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQztZQUMzQyxDQUFDO1lBRUQsRUFBRSxDQUFBLENBQUMsVUFBVSxDQUFDLFFBQVEsSUFBSSxXQUFXLENBQUMsQ0FDdEMsQ0FBQztnQkFDRyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDbkMsQ0FBQztZQUNELEVBQUUsQ0FBQSxDQUFDLFVBQVUsQ0FBQyxRQUFRLElBQUksVUFBVSxDQUFDLENBQ3JDLENBQUM7Z0JBQ0csSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO1lBQ3hDLENBQUM7WUFFRCwyQkFBMkI7WUFDM0IsTUFBTSxDQUFDLElBQUksQ0FBQztRQUNoQixDQUFDO1FBRUQsOERBQThEO1FBQzlELElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsY0FBYyxDQUFDLEVBQUUsRUFBRSxXQUFXLEVBQUUsRUFBRSxTQUFTLEVBQUUsS0FBSyxDQUFDLEdBQUcsRUFBRSxFQUFDLENBQUMsQ0FBQztRQUNqRixNQUFNLENBQUMsS0FBSyxDQUFDO0lBQ2pCLENBQUM7SUExQ1EsU0FBUztRQURyQixpQkFBVSxFQUFFO3lDQUdtQixlQUFNO09BRnpCLFNBQVMsQ0ErQ3JCO0lBQUQsZ0JBQUM7Q0FBQSxBQS9DRCxJQStDQztBQS9DWSw4QkFBUyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5cclxuaW1wb3J0IHsgUm91dGVyLCBDYW5BY3RpdmF0ZSwgQWN0aXZhdGVkUm91dGVTbmFwc2hvdCwgUm91dGVyU3RhdGVTbmFwc2hvdCB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcblxyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgQXV0aEd1YXJkIGltcGxlbWVudHMgQ2FuQWN0aXZhdGUge1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcm91dGVyOiBSb3V0ZXIpIHsgfVxyXG5cclxuICAgIGNhbkFjdGl2YXRlKHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZVNuYXBzaG90LCBzdGF0ZTogUm91dGVyU3RhdGVTbmFwc2hvdCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiQ3VycmVudCBVc2VyIFN0YXRlIFwiICsgbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2N1cnJlbnRVc2VyJykpO1xyXG4gICAgICAgIGlmIChsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnY3VycmVudFVzZXInKSkge1xyXG4gICAgICAgICAgICBcclxuICAgIC8vICAgICAgICAgdmFyIGRhdGFPYmplY3QgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdjdXJyZW50VXNlcicpKTtcclxuXHJcbiAgICAvLyAgIGNvbnNvbGUubG9nKFwiVXNlciBoYXMgbG9naW4gXCIgKyBkYXRhT2JqZWN0KTtcclxuXHJcbiAgICAgICAgdmFyIGRhdGFPYmplY3QgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdjdXJyZW50VXNlcicpKTtcclxuXHJcblxyXG4gICAgICAgICAgICBpZihkYXRhT2JqZWN0LnVzZXJNb2RlID09IFwiTmV3XCIpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIC8vdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvY2hhbmdlcGFzc3dvcmQnXSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy9wYXNzd29yZCddKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYoZGF0YU9iamVjdC51c2VyTW9kZSA9PSBcIlBob25lVmVyaWZ5XCIpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnL3ZlcmlmeXBob25lJ10pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZihkYXRhT2JqZWN0LnVzZXJNb2RlID09IFwiT1RQVmVyaWZ5XCIpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnL290cCddKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZihkYXRhT2JqZWN0LnVzZXJNb2RlID09IFwiVHJhbnNQaW5cIilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvdHJhbnNwaW4nXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vIGxvZ2dlZCBpbiBzbyByZXR1cm4gdHJ1ZVxyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIG5vdCBsb2dnZWQgaW4gc28gcmVkaXJlY3QgdG8gbG9naW4gcGFnZSB3aXRoIHRoZSByZXR1cm4gdXJsXHJcbiAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvbGFuZGluZ3BhZ2UnXSwgeyBxdWVyeVBhcmFtczogeyByZXR1cm5Vcmw6IHN0YXRlLnVybCB9fSk7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuXHJcblxyXG4gICAgXHJcbn1cclxuXHJcblxyXG5cclxuIl19