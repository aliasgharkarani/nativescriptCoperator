"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var common_1 = require("@angular/common");
var cooperative_service_1 = require("../../services/cooperative.service");
var product_service_1 = require("../../services/product.service");
var category_service_1 = require("../../services/category.service");
var advert_service_1 = require("../../services/advert.service");
var cooperativeStaff_service_1 = require("../../services/cooperativeStaff.service");
var config_1 = require("../../shared/config");
var ShopCatalogueComponent = /** @class */ (function () {
    function ShopCatalogueComponent(location, cooperativeService, cooperativeStaffService, router, activatedRoute, productService, categoryService, advertService, ngZone, _changeDetectionRef) {
        this.location = location;
        this.cooperativeService = cooperativeService;
        this.cooperativeStaffService = cooperativeStaffService;
        this.router = router;
        this.activatedRoute = activatedRoute;
        this.productService = productService;
        this.categoryService = categoryService;
        this.advertService = advertService;
        this.ngZone = ngZone;
        this._changeDetectionRef = _changeDetectionRef;
        this.productImageUrl = config_1.Config.productImageURL;
        this.adsURL = config_1.Config.adsURL;
        this.categories = [];
        this.products = [];
    }
    ShopCatalogueComponent.prototype.ngOnInit = function () {
        this.categoryId = this.activatedRoute.snapshot.params["id"];
        console.log("Selected Category " + this.categoryId);
        // this.getProductByCategoryId(this.categoryId);
    };
    ShopCatalogueComponent.prototype.ngAfterViewInit = function () {
        //this.getBalances(this.cooperId);
        //  this.getCategory();
        this.getProductByCategoryId(this.categoryId);
    };
    ShopCatalogueComponent.prototype.register = function () {
        // if(this.input.firstname && this.input.lastname && this.input.email && this.input.password) {
        //     ApplicationSettings.setString("account", JSON.stringify(this.input));
        //     this.location.back();
        // } else {
        //     (new SnackBar()).simple("All Fields Required!");
        // }
        console.log("Reaching Register ");
    };
    ShopCatalogueComponent.prototype.onNavBtnTap = function () {
        // This code will be called only in Android.
        console.log("Navigation button tapped!");
    };
    ShopCatalogueComponent.prototype.goBack = function () {
        this.location.back();
    };
    ShopCatalogueComponent.prototype.startBackgroundAnimation = function (background) {
        background.animate({
            scale: { x: 1.0, y: 1.0 },
            duration: 10000
        });
    };
    ShopCatalogueComponent.prototype.getProductByCategoryId = function (categoryId) {
        var _this = this;
        console.log("Category Id " + categoryId);
        this.products = [];
        this.productService.getallproductByCategory(categoryId).subscribe(function (data) {
            // console.log("Products  " + JSON.stringify(data["data"]));
            _this.ngZone.run(function () {
                _this.products = data["data"];
            });
            console.log("Products  " + JSON.stringify(_this.products));
            _this._changeDetectionRef.detectChanges();
            _this.getCategory();
        }, function (err) {
            console.log(err);
        });
    };
    ShopCatalogueComponent.prototype.getCategory = function () {
        var _this = this;
        this.categoryService.getAllCategory().subscribe(function (data) {
            // console.log("Account Balances from DB " + JSON.stringify(data["data"]));
            _this.ngZone.run(function () {
                _this.categories = data["data"];
                _this.category = _this.categories.find(function (x) { return x._id === _this.categoryId; });
            });
            _this._changeDetectionRef.detectChanges();
        }, function (err) {
            console.log(JSON.stringify(err));
        });
    };
    ShopCatalogueComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: "ns-shopcatalogue",
            templateUrl: "./shopcatalogue.component.html",
            styleUrls: ["./shopcatalogue-common.css", "./shopcatalogue.component.css"],
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
        }),
        __metadata("design:paramtypes", [common_1.Location, cooperative_service_1.CooperativeService, cooperativeStaff_service_1.CooperativeStaffService,
            router_1.Router, router_1.ActivatedRoute, product_service_1.ProductService,
            category_service_1.CategoryService, advert_service_1.AdvertService, core_1.NgZone, core_1.ChangeDetectorRef])
    ], ShopCatalogueComponent);
    return ShopCatalogueComponent;
}());
exports.ShopCatalogueComponent = ShopCatalogueComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hvcGNhdGFsb2d1ZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzaG9wY2F0YWxvZ3VlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFvSDtBQUNwSCwwQ0FBeUQ7QUFDekQsMENBQTJDO0FBZ0IzQywwRUFBd0U7QUFDeEUsa0VBQWdFO0FBQ2hFLG9FQUFnRTtBQUNoRSxnRUFBNEQ7QUFFNUQsb0ZBQWtGO0FBR2xGLDhDQUE2QztBQWE3QztJQWtCSSxnQ0FBMkIsUUFBa0IsRUFBVSxrQkFBc0MsRUFBVSx1QkFBZ0QsRUFFOUksTUFBYyxFQUFVLGNBQThCLEVBQVUsY0FBNkIsRUFDOUYsZUFBK0IsRUFBVSxhQUEyQixFQUFVLE1BQWMsRUFBUyxtQkFBc0M7UUFIeEgsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQUFVLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBb0I7UUFBVSw0QkFBdUIsR0FBdkIsdUJBQXVCLENBQXlCO1FBRTlJLFdBQU0sR0FBTixNQUFNLENBQVE7UUFBVSxtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFBVSxtQkFBYyxHQUFkLGNBQWMsQ0FBZTtRQUM5RixvQkFBZSxHQUFmLGVBQWUsQ0FBZ0I7UUFBVSxrQkFBYSxHQUFiLGFBQWEsQ0FBYztRQUFVLFdBQU0sR0FBTixNQUFNLENBQVE7UUFBUyx3QkFBbUIsR0FBbkIsbUJBQW1CLENBQW1CO1FBcEJuSixvQkFBZSxHQUFZLGVBQU0sQ0FBQyxlQUFlLENBQUM7UUFDbEQsV0FBTSxHQUFZLGVBQU0sQ0FBQyxNQUFNLENBQUM7UUFRaEMsZUFBVSxHQUFvQixFQUFFLENBQUM7UUFFakMsYUFBUSxHQUEwQixFQUFFLENBQUM7SUFjckMsQ0FBQztJQUlNLHlDQUFRLEdBQWY7UUFFSSxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUU1RCxPQUFPLENB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QjtZQUM1QixXQUFXLEVBQUUsZ0NBQWdDO1lBQzdDLFNBQVMsRUFBRSxDQUFDLDRCQUE0QixFQUFFLCtCQUErQixDQUFDO1lBQzFFLGVBQWUsRUFBRSw4QkFBdUIsQ0FBQyxNQUFNO1NBRWxELENBQUM7eUNBcUJ1QyxpQkFBUSxFQUE4Qix3Q0FBa0IsRUFBbUMsa0RBQXVCO1lBRXRJLGVBQU0sRUFBMEIsdUJBQWMsRUFBeUIsZ0NBQWM7WUFDOUUsa0NBQWUsRUFBd0IsOEJBQWEsRUFBa0IsYUFBTSxFQUE4Qix3QkFBaUI7T0FyQjFJLHNCQUFzQixDQXlJbEM7SUFBRCw2QkFBQztDQUFBLEFBeklELElBeUlDO0FBeklZLHdEQUFzQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBBZnRlclZpZXdJbml0LCAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksQ2hhbmdlRGV0ZWN0b3JSZWYsTmdab25lIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgUm91dGVyLCBBY3RpdmF0ZWRSb3V0ZSB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcclxuaW1wb3J0IHsgTG9jYXRpb24gfSBmcm9tIFwiQGFuZ3VsYXIvY29tbW9uXCI7XHJcbmltcG9ydCB7IFNuYWNrQmFyIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1zbmFja2JhclwiO1xyXG5pbXBvcnQgKiBhcyBBcHBsaWNhdGlvblNldHRpbmdzIGZyb20gXCJhcHBsaWNhdGlvbi1zZXR0aW5nc1wiO1xyXG5pbXBvcnQgeyBjb25uZWN0aW9uVHlwZSwgZ2V0Q29ubmVjdGlvblR5cGUgfSBmcm9tIFwiY29ubmVjdGl2aXR5XCI7XHJcbmltcG9ydCB7IEFuaW1hdGlvbiB9IGZyb20gXCJ1aS9hbmltYXRpb25cIjtcclxuaW1wb3J0IHsgVmlldyB9IGZyb20gXCJ1aS9jb3JlL3ZpZXdcIjtcclxuaW1wb3J0IHsgcHJvbXB0IH0gZnJvbSBcInVpL2RpYWxvZ3NcIjtcclxuaW1wb3J0IHsgUGFnZSB9IGZyb20gXCJ1aS9wYWdlXCI7XHJcbmltcG9ydCB7IFRleHRGaWVsZCB9IGZyb20gXCJ1aS90ZXh0LWZpZWxkXCI7XHJcbmltcG9ydCAqIGFzIHRleHRWaWV3TW9kdWxlIGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL3RleHQtdmlld1wiO1xyXG5cclxuXHJcblxyXG5pbXBvcnQgeyBWYWx1ZUxpc3QsIERyb3BEb3duIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1kcm9wLWRvd25cIjtcclxuaW1wb3J0IHsgU2VsZWN0ZWRJbmRleENoYW5nZWRFdmVudERhdGEgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWRyb3AtZG93blwiO1xyXG5pbXBvcnQgeyBDb29wZXJhdGl2ZSwgUHJvZHVjdCxTcG9uc29yUHJvZHVjdCwgQWR2ZXJ0IH0gZnJvbSAnLi4vLi4vbW9kZWxzL2luZGV4JztcclxuaW1wb3J0IHsgQ29vcGVyYXRpdmVTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL2Nvb3BlcmF0aXZlLnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgUHJvZHVjdFNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvcHJvZHVjdC5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7Q2F0ZWdvcnlTZXJ2aWNlfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvY2F0ZWdvcnkuc2VydmljZVwiO1xyXG5pbXBvcnQge0FkdmVydFNlcnZpY2V9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9hZHZlcnQuc2VydmljZVwiO1xyXG5cclxuaW1wb3J0IHsgQ29vcGVyYXRpdmVTdGFmZlNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvY29vcGVyYXRpdmVTdGFmZi5zZXJ2aWNlXCI7XHJcblxyXG5pbXBvcnQgeyBDb29wZXJhdGl2ZVN0YWZmLCBWZXJpZnlBdXRoLENhdGVnb3J5IH0gZnJvbSBcIi4uLy4uL21vZGVscy9pbmRleFwiO1xyXG5pbXBvcnQgeyBDb25maWcgfSBmcm9tIFwiLi4vLi4vc2hhcmVkL2NvbmZpZ1wiO1xyXG5cclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcclxuICAgIHNlbGVjdG9yOiBcIm5zLXNob3BjYXRhbG9ndWVcIixcclxuICAgIHRlbXBsYXRlVXJsOiBcIi4vc2hvcGNhdGFsb2d1ZS5jb21wb25lbnQuaHRtbFwiLFxyXG4gICAgc3R5bGVVcmxzOiBbXCIuL3Nob3BjYXRhbG9ndWUtY29tbW9uLmNzc1wiLCBcIi4vc2hvcGNhdGFsb2d1ZS5jb21wb25lbnQuY3NzXCJdLFxyXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXHJcbiAgXHJcbn0pXHJcblxyXG5cclxuZXhwb3J0IGNsYXNzIFNob3BDYXRhbG9ndWVDb21wb25lbnQgIHtcclxuICAgIHByb2R1Y3RJbWFnZVVybDogc3RyaW5nICA9IENvbmZpZy5wcm9kdWN0SW1hZ2VVUkw7XHJcbiAgICBhZHNVUkw6IHN0cmluZyAgPSBDb25maWcuYWRzVVJMO1xyXG4gICAgXHJcbiAgICBwdWJsaWMgaW5wdXQ6IGFueTtcclxuICAgIHNlbGVjdGVkQ29vcGVyYXRpdmVJbmRleDogbnVtYmVyO1xyXG4gICAgc2VsZWN0ZWRDb29wZXJhdGl2ZTogc3RyaW5nO1xyXG4gICAgc3RhZmZJZDogU3RyaW5nO1xyXG5cclxuICAgIGNhdGVnb3J5SWQ6IFN0cmluZztcclxuICAgIGNhdGVnb3JpZXM6IEFycmF5PENhdGVnb3J5PiA9IFtdO1xyXG4gICAgY2F0ZWdvcnk6IENhdGVnb3J5O1xyXG4gICAgcHJvZHVjdHM6IEFycmF5PFNwb25zb3JQcm9kdWN0PiA9IFtdO1xyXG4gXHJcbiAgIFxyXG5cclxuXHJcbiAgICAgXHJcbiAgICBwdWJsaWMgY29uc3RydWN0b3IocHJpdmF0ZSBsb2NhdGlvbjogTG9jYXRpb24sIHByaXZhdGUgY29vcGVyYXRpdmVTZXJ2aWNlOiBDb29wZXJhdGl2ZVNlcnZpY2UsIHByaXZhdGUgY29vcGVyYXRpdmVTdGFmZlNlcnZpY2U6IENvb3BlcmF0aXZlU3RhZmZTZXJ2aWNlLFxyXG4gICAgXHJcbiAgICAgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlciwgcHJpdmF0ZSBhY3RpdmF0ZWRSb3V0ZTogQWN0aXZhdGVkUm91dGUsIHByaXZhdGUgcHJvZHVjdFNlcnZpY2U6UHJvZHVjdFNlcnZpY2UsXHJcbiAgICBwcml2YXRlIGNhdGVnb3J5U2VydmljZTpDYXRlZ29yeVNlcnZpY2UsIHByaXZhdGUgYWR2ZXJ0U2VydmljZTpBZHZlcnRTZXJ2aWNlLCBwcml2YXRlIG5nWm9uZTogTmdab25lLHByaXZhdGUgX2NoYW5nZURldGVjdGlvblJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYpIHtcclxuICAgICAgICBcclxuICAgICAgXHJcbiAgICBcclxuICAgIFxyXG4gICAgfVxyXG5cclxuICBcclxuXHJcbiAgICBwdWJsaWMgbmdPbkluaXQoKSB7XHJcblxyXG4gICAgICAgIHRoaXMuY2F0ZWdvcnlJZCA9IHRoaXMuYWN0aXZhdGVkUm91dGUuc25hcHNob3QucGFyYW1zW1wiaWRcIl07XHJcblxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiU2VsZWN0ZWQgQ2F0ZWdvcnkgXCIgKyB0aGlzLmNhdGVnb3J5SWQpO1xyXG4gICAgICAvLyB0aGlzLmdldFByb2R1Y3RCeUNhdGVnb3J5SWQodGhpcy5jYXRlZ29yeUlkKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgbmdBZnRlclZpZXdJbml0KCkge1xyXG4gICAgICAgIC8vdGhpcy5nZXRCYWxhbmNlcyh0aGlzLmNvb3BlcklkKTtcclxuXHJcbiAgICAvLyAgdGhpcy5nZXRDYXRlZ29yeSgpO1xyXG5cclxuICAgICAgdGhpcy5nZXRQcm9kdWN0QnlDYXRlZ29yeUlkKHRoaXMuY2F0ZWdvcnlJZCk7XHJcbiAgICAgICBcclxuICAgfVxyXG4gICAgcHVibGljIHJlZ2lzdGVyKCkge1xyXG4gICAgICAgIC8vIGlmKHRoaXMuaW5wdXQuZmlyc3RuYW1lICYmIHRoaXMuaW5wdXQubGFzdG5hbWUgJiYgdGhpcy5pbnB1dC5lbWFpbCAmJiB0aGlzLmlucHV0LnBhc3N3b3JkKSB7XHJcbiAgICAgICAgLy8gICAgIEFwcGxpY2F0aW9uU2V0dGluZ3Muc2V0U3RyaW5nKFwiYWNjb3VudFwiLCBKU09OLnN0cmluZ2lmeSh0aGlzLmlucHV0KSk7XHJcbiAgICAgICAgLy8gICAgIHRoaXMubG9jYXRpb24uYmFjaygpO1xyXG4gICAgICAgIC8vIH0gZWxzZSB7XHJcbiAgICAgICAgLy8gICAgIChuZXcgU25hY2tCYXIoKSkuc2ltcGxlKFwiQWxsIEZpZWxkcyBSZXF1aXJlZCFcIik7XHJcbiAgICAgICAgLy8gfVxyXG5cclxuICAgICAgICBjb25zb2xlLmxvZyhcIlJlYWNoaW5nIFJlZ2lzdGVyIFwiKTtcclxuXHJcbiAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBvbk5hdkJ0blRhcCgpIHtcclxuICAgICAgICAvLyBUaGlzIGNvZGUgd2lsbCBiZSBjYWxsZWQgb25seSBpbiBBbmRyb2lkLlxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiTmF2aWdhdGlvbiBidXR0b24gdGFwcGVkIVwiKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ29CYWNrKCkge1xyXG4gICAgICAgIHRoaXMubG9jYXRpb24uYmFjaygpO1xyXG4gICAgfVxyXG4gICAgc3RhcnRCYWNrZ3JvdW5kQW5pbWF0aW9uKGJhY2tncm91bmQpIHtcclxuICAgICAgICBiYWNrZ3JvdW5kLmFuaW1hdGUoe1xyXG4gICAgICAgICAgICBzY2FsZTogeyB4OiAxLjAsIHk6IDEuMCB9LFxyXG4gICAgICAgICAgICBkdXJhdGlvbjogMTAwMDBcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcblxyXG5cclxuICAgXHJcblxyXG4gICAgZ2V0UHJvZHVjdEJ5Q2F0ZWdvcnlJZChjYXRlZ29yeUlkOiBTdHJpbmcpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIkNhdGVnb3J5IElkIFwiICsgY2F0ZWdvcnlJZCk7XHJcbiAgICAgICAgdGhpcy5wcm9kdWN0cyA9IFtdO1xyXG5cclxuICAgICAgICB0aGlzLnByb2R1Y3RTZXJ2aWNlLmdldGFsbHByb2R1Y3RCeUNhdGVnb3J5KGNhdGVnb3J5SWQpLnN1YnNjcmliZShcclxuICAgICAgICAgICAgZGF0YSA9PiB7XHJcbiAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIlByb2R1Y3RzICBcIiArIEpTT04uc3RyaW5naWZ5KGRhdGFbXCJkYXRhXCJdKSk7XHJcbiAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgdGhpcy5uZ1pvbmUucnVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnByb2R1Y3RzID0gZGF0YVtcImRhdGFcIl07XHJcblxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlByb2R1Y3RzICBcIiArIEpTT04uc3RyaW5naWZ5KHRoaXMucHJvZHVjdHMpKTtcclxuICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIHRoaXMuX2NoYW5nZURldGVjdGlvblJlZi5kZXRlY3RDaGFuZ2VzKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmdldENhdGVnb3J5KCk7XHJcbiAgICAgICAgICAgICAgICBcclxuXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGVyciA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0Q2F0ZWdvcnkoICl7XHJcbiAgICAgICBcclxuICAgIFxyXG5cclxuICAgICAgICB0aGlzLmNhdGVnb3J5U2VydmljZS5nZXRBbGxDYXRlZ29yeSgpLnN1YnNjcmliZShcclxuICAgICAgICAgICAgZGF0YSA9PiB7IFxyXG4gICAgXHJcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIkFjY291bnQgQmFsYW5jZXMgZnJvbSBEQiBcIiArIEpTT04uc3RyaW5naWZ5KGRhdGFbXCJkYXRhXCJdKSk7XHJcbiAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICB0aGlzLm5nWm9uZS5ydW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2F0ZWdvcmllcyA9IGRhdGFbXCJkYXRhXCJdO1xyXG5cclxuICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgIHRoaXMuY2F0ZWdvcnkgPSAgIHRoaXMuY2F0ZWdvcmllcy5maW5kKHggPT4geC5faWQgPT09IHRoaXMuY2F0ZWdvcnlJZCk7IFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5fY2hhbmdlRGV0ZWN0aW9uUmVmLmRldGVjdENoYW5nZXMoKTtcclxuICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgIGVyciA9PiB7XHJcbiAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KGVycikpO1xyXG4gICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICk7XHQgIFxyXG4gICAgfVxyXG5cclxuXHJcbiAgIFxyXG5cclxuXHJcblxyXG59Il19