"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
// import {} from ''
// const store = require('store');
var nativescript_fancyalert_1 = require("nativescript-fancyalert");
var auth_service_1 = require("../services/auth.service");
var MINUTES_UNITL_AUTO_LOGOUT = 5; // in mins
var CHECK_INTERVAL = 15000; // in ms
var STORE_KEY = 'lastAction';
var AutoLogoutService = /** @class */ (function () {
    function AutoLogoutService(router, authService) {
        this.router = router;
        this.authService = authService;
        console.log('object created');
        // this.auth = authService;
        this.check();
        //this.initListener();
        this.initInterval();
        this.getSystemConfig();
        // localStorage.setItem(STORE_KEY,Date.now().toString());
    }
    AutoLogoutService.prototype.getLastAction = function () {
        return parseInt(localStorage.getItem(STORE_KEY));
    };
    AutoLogoutService.prototype.setLastAction = function (lastAction) {
        localStorage.setItem(STORE_KEY, lastAction.toString());
    };
    AutoLogoutService.prototype.initListener = function () {
        var _this = this;
        document.body.addEventListener('click', function () { return _this.reset(); });
        document.body.addEventListener('mouseover', function () { return _this.reset(); });
        document.body.addEventListener('mouseout', function () { return _this.reset(); });
        document.body.addEventListener('keydown', function () { return _this.reset(); });
        document.body.addEventListener('keyup', function () { return _this.reset(); });
        document.body.addEventListener('keypress', function () { return _this.reset(); });
        document.body.addEventListener('tap', function () { return _this.reset(); });
    };
    AutoLogoutService.prototype.reset = function () {
        this.setLastAction(Date.now());
    };
    AutoLogoutService.prototype.initInterval = function () {
        var _this = this;
        setInterval(function () {
            _this.check();
        }, CHECK_INTERVAL);
    };
    AutoLogoutService.prototype.check = function () {
        var now = Date.now();
        var timeleft = this.getLastAction() + MINUTES_UNITL_AUTO_LOGOUT * 60 * 1000;
        var diff = timeleft - now;
        var isTimeout = diff < 0;
        // if (isTimeout && this.auth.loggedIn)
        if (isTimeout) {
            // alert('logout');
            //localStorage.clear();
            localStorage.removeItem('lastAction');
            nativescript_fancyalert_1.TNSFancyAlert.showWarning("Session!", "Your session has expired, please login to continue. ", "Ok").then(function () {
            });
            localStorage.removeItem('currentUser');
            localStorage.removeItem('currentUserToken');
            this.router.navigate(['./login']);
        }
    };
    AutoLogoutService.prototype.getSystemConfig = function () {
        var _this = this;
        this.authService.systemconfig().subscribe(function (data) {
            console.log("System Config Data  " + JSON.stringify(data["data"]));
            _this.sysConfig = data["data"];
            if (_this.sysConfig.length > 0) {
                MINUTES_UNITL_AUTO_LOGOUT = +_this.sysConfig[0].sessionTime;
            }
        }, function (err) {
            console.log(err);
        });
    };
    AutoLogoutService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [router_1.Router, auth_service_1.AuthService])
    ], AutoLogoutService);
    return AutoLogoutService;
}());
exports.AutoLogoutService = AutoLogoutService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0b2xvZ291dC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXV0b2xvZ291dC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTJDO0FBQzNDLDBDQUF3QztBQUN4QyxvQkFBb0I7QUFDcEIsa0NBQWtDO0FBRWxDLG1FQUF3RDtBQUN4RCx5REFBdUQ7QUFFdkQsSUFBSSx5QkFBeUIsR0FBRyxDQUFDLENBQUEsQ0FBQyxVQUFVO0FBQzVDLElBQU0sY0FBYyxHQUFHLEtBQUssQ0FBQSxDQUFDLFFBQVE7QUFDckMsSUFBTSxTQUFTLEdBQUksWUFBWSxDQUFDO0FBRWhDO0lBU0UsMkJBQW9CLE1BQWMsRUFBVyxXQUF3QjtRQUFqRCxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQVcsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFDbkUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQzlCLDJCQUEyQjtRQUMzQixJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDYixzQkFBc0I7UUFDdEIsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBRXBCLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUN2Qix5REFBeUQ7SUFDM0QsQ0FBQztJQWhCSyx5Q0FBYSxHQUFwQjtRQUNHLE1BQU0sQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO0lBQ25ELENBQUM7SUFDSyx5Q0FBYSxHQUFwQixVQUFxQixVQUFrQjtRQUNwQyxZQUFZLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxVQUFVLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztJQUN6RCxDQUFDO0lBYUQsd0NBQVksR0FBWjtRQUFBLGlCQVFDO1FBUEMsUUFBUSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsY0FBTSxPQUFBLEtBQUksQ0FBQyxLQUFLLEVBQUUsRUFBWixDQUFZLENB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RCxVQUFBLEdBQUc7WUFDQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRXJCLENBQUMsQ0FDSixDQUFDO0lBQ04sQ0FBQztJQTFGWSxpQkFBaUI7UUFEN0IsaUJBQVUsRUFBRTt5Q0FVaUIsZUFBTSxFQUF3QiwwQkFBVztPQVQxRCxpQkFBaUIsQ0EyRjdCO0lBQUQsd0JBQUM7Q0FBQSxBQTNGRCxJQTJGQztBQTNGWSw4Q0FBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJ1xyXG4vLyBpbXBvcnQge30gZnJvbSAnJ1xyXG4vLyBjb25zdCBzdG9yZSA9IHJlcXVpcmUoJ3N0b3JlJyk7XHJcblxyXG5pbXBvcnQgeyBUTlNGYW5jeUFsZXJ0IH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1mYW5jeWFsZXJ0XCI7XHJcbmltcG9ydCB7IEF1dGhTZXJ2aWNlIH0gZnJvbSBcIi4uL3NlcnZpY2VzL2F1dGguc2VydmljZVwiO1xyXG5pbXBvcnQgeyBTeXN0ZW1Db25maWd1cmF0aW9uIH0gZnJvbSAnLi4vbW9kZWxzL2luZGV4JztcclxudmFyIE1JTlVURVNfVU5JVExfQVVUT19MT0dPVVQgPSA1IC8vIGluIG1pbnNcclxuY29uc3QgQ0hFQ0tfSU5URVJWQUwgPSAxNTAwMCAvLyBpbiBtc1xyXG5jb25zdCBTVE9SRV9LRVkgPSAgJ2xhc3RBY3Rpb24nO1xyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBBdXRvTG9nb3V0U2VydmljZSB7XHJcbnN5c0NvbmZpZzogQXJyYXk8U3lzdGVtQ29uZmlndXJhdGlvbj47XHJcbiBwdWJsaWMgZ2V0TGFzdEFjdGlvbigpIHtcclxuICAgIHJldHVybiBwYXJzZUludChsb2NhbFN0b3JhZ2UuZ2V0SXRlbShTVE9SRV9LRVkpKTtcclxuICB9XHJcbiBwdWJsaWMgc2V0TGFzdEFjdGlvbihsYXN0QWN0aW9uOiBudW1iZXIpIHtcclxuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFNUT1JFX0tFWSwgbGFzdEFjdGlvbi50b1N0cmluZygpKTtcclxuICB9XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsIHByaXZhdGUgIGF1dGhTZXJ2aWNlOiBBdXRoU2VydmljZSkge1xyXG4gICAgY29uc29sZS5sb2coJ29iamVjdCBjcmVhdGVkJyk7XHJcbiAgICAvLyB0aGlzLmF1dGggPSBhdXRoU2VydmljZTtcclxuICAgIHRoaXMuY2hlY2soKTtcclxuICAgIC8vdGhpcy5pbml0TGlzdGVuZXIoKTtcclxuICAgIHRoaXMuaW5pdEludGVydmFsKCk7XHJcblxyXG4gICAgdGhpcy5nZXRTeXN0ZW1Db25maWcoKTtcclxuICAgIC8vIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFNUT1JFX0tFWSxEYXRlLm5vdygpLnRvU3RyaW5nKCkpO1xyXG4gIH1cclxuXHJcbiAgaW5pdExpc3RlbmVyKCkge1xyXG4gICAgZG9jdW1lbnQuYm9keS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHRoaXMucmVzZXQoKSk7XHJcbiAgICBkb2N1bWVudC5ib2R5LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3ZlcicsKCk9PiB0aGlzLnJlc2V0KCkpO1xyXG4gICAgZG9jdW1lbnQuYm9keS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW91dCcsKCkgPT4gdGhpcy5yZXNldCgpKTtcclxuICAgIGRvY3VtZW50LmJvZHkuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsKCkgPT4gdGhpcy5yZXNldCgpKTtcclxuICAgIGRvY3VtZW50LmJvZHkuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCgpID0+IHRoaXMucmVzZXQoKSk7XHJcbiAgICBkb2N1bWVudC5ib2R5LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXByZXNzJywoKSA9PiB0aGlzLnJlc2V0KCkpO1xyXG4gICAgZG9jdW1lbnQuYm9keS5hZGRFdmVudExpc3RlbmVyKCd0YXAnLCgpID0+IHRoaXMucmVzZXQoKSk7XHJcbiAgfVxyXG5cclxuICByZXNldCgpIHtcclxuICAgIHRoaXMuc2V0TGFzdEFjdGlvbihEYXRlLm5vdygpKTtcclxuICB9XHJcblxyXG4gIGluaXRJbnRlcnZhbCgpIHtcclxuICAgIHNldEludGVydmFsKCgpID0+IHtcclxuICAgICAgdGhpcy5jaGVjaygpO1xyXG4gICAgfSwgQ0hFQ0tfSU5URVJWQUwpO1xyXG4gIH1cclxuXHJcbiAgY2hlY2soKSB7XHJcbiAgICBjb25zdCBub3cgPSBEYXRlLm5vdygpO1xyXG4gICAgY29uc3QgdGltZWxlZnQgPSB0aGlzLmdldExhc3RBY3Rpb24oKSArIE1JTlVURVNfVU5JVExfQVVUT19MT0dPVVQgKiA2MCAqIDEwMDA7XHJcbiAgICBjb25zdCBkaWZmID0gdGltZWxlZnQgLSBub3c7XHJcbiAgICBjb25zdCBpc1RpbWVvdXQgPSBkaWZmIDwgMDtcclxuXHJcbiAgICAvLyBpZiAoaXNUaW1lb3V0ICYmIHRoaXMuYXV0aC5sb2dnZWRJbilcclxuICAgIGlmIChpc1RpbWVvdXQpICB7XHJcbiAgICAgIC8vIGFsZXJ0KCdsb2dvdXQnKTtcclxuICAgICAgLy9sb2NhbFN0b3JhZ2UuY2xlYXIoKTtcclxuICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ2xhc3RBY3Rpb24nKTtcclxuXHJcbiAgICAgIFROU0ZhbmN5QWxlcnQuc2hvd1dhcm5pbmcoXCJTZXNzaW9uIVwiLCBcIllvdXIgc2Vzc2lvbiBoYXMgZXhwaXJlZCwgcGxlYXNlIGxvZ2luIHRvIGNvbnRpbnVlLiBcIiwgXCJPa1wiKSAudGhlbiggKCkgPT4geyAvKiB1c2VyIHByZXNzZWQgdGhlIGJ1dHRvbiAqL1xyXG4gICAgICAgIFxyXG4gICAgICBcclxuICAgfSk7XHJcblxyXG4gICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnY3VycmVudFVzZXInKTtcclxuICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ2N1cnJlbnRVc2VyVG9rZW4nKTtcclxuICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycuL2xvZ2luJ10pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcblxyXG4gIGdldFN5c3RlbUNvbmZpZygpIHtcclxuICAgXHJcblxyXG5cclxuICAgIHRoaXMuYXV0aFNlcnZpY2Uuc3lzdGVtY29uZmlnKCkuc3Vic2NyaWJlKFxyXG4gICAgICAgIGRhdGEgPT4ge1xyXG4gICAgICAgICAgIFxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIlN5c3RlbSBDb25maWcgRGF0YSAgXCIgKyBKU09OLnN0cmluZ2lmeShkYXRhW1wiZGF0YVwiXSkpO1xyXG4gICAgICAgICAgICB0aGlzLnN5c0NvbmZpZyA9IGRhdGFbXCJkYXRhXCJdO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgaWYodGhpcy5zeXNDb25maWcubGVuZ3RoID4gMClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIE1JTlVURVNfVU5JVExfQVVUT19MT0dPVVQgPSArdGhpcy5zeXNDb25maWdbMF0uc2Vzc2lvblRpbWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICBcclxuXHJcblxyXG4gICAgICAgICAgIFxyXG4gICAgICAgICAgICBcclxuXHJcbiAgICAgICAgfSxcclxuICAgICAgICBlcnIgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xyXG5cclxuICAgICAgICB9XHJcbiAgICApO1xyXG59XHJcbn0iXX0=