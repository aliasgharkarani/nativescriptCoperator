"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var nativescript_drop_down_1 = require("nativescript-drop-down");
var cooperative_service_1 = require("../../services/cooperative.service");
var cooperativeStaff_service_1 = require("../../services/cooperativeStaff.service");
var category_service_1 = require("../../services/category.service");
var config_1 = require("../../shared/config");
var ShopCategoryComponent = /** @class */ (function () {
    function ShopCategoryComponent(location, cooperativeService, cooperativeStaffService, categoryService) {
        this.location = location;
        this.cooperativeService = cooperativeService;
        this.cooperativeStaffService = cooperativeStaffService;
        this.categoryService = categoryService;
        this.productImageUrl = config_1.Config.productImageURL;
        this.cooperative = [];
        this.hint = "Select Cooperative";
        this.cssClass = "default";
        this.categories = [];
    }
    ShopCategoryComponent.prototype.ngAfterViewInit = function () {
        this.getCooperative();
    };
    ShopCategoryComponent.prototype.ngOnInit = function () {
        this.getCategory();
    };
    ShopCategoryComponent.prototype.register = function () {
        // if(this.input.firstname && this.input.lastname && this.input.email && this.input.password) {
        //     ApplicationSettings.setString("account", JSON.stringify(this.input));
        //     this.location.back();
        // } else {
        //     (new SnackBar()).simple("All Fields Required!");
        // }
        console.log("Reaching Register ");
        this.getCooperativeStaff(this.staffId, this.selectedCooperative);
    };
    ShopCategoryComponent.prototype.onNavBtnTap = function () {
        // This code will be called only in Android.
        console.log("Navigation button tapped!");
    };
    ShopCategoryComponent.prototype.goBack = function () {
        this.location.back();
    };
    ShopCategoryComponent.prototype.startBackgroundAnimation = function (background) {
        background.animate({
            scale: { x: 1.0, y: 1.0 },
            duration: 10000
        });
    };
    ShopCategoryComponent.prototype.oncooperativechange = function (args) {
        // console.log(`Drop Down selected index changed  ${args.oldIndex} to ${args.newIndex}. New value is "${this.sessionitems.getValue(
        //     args.newIndex)}"`);
        console.log("Selected ID " + args.newIndex);
        this.selectedCooperative = this.cooperativeList.getValue(args.newIndex);
        console.log("Selected Id Value  " + this.selectedCooperative);
    };
    ShopCategoryComponent.prototype.getCooperative = function () {
        var _this = this;
        this.cooperativeService.getAllCooperative().subscribe(function (data) {
            console.log("Cooperative List " + JSON.stringify(data["data"]));
            _this.cooperative = data["data"];
            _this.cooperativeList = new nativescript_drop_down_1.ValueList();
            for (var loop = 0; loop < _this.cooperative.length; loop++) {
                _this.cooperativeList.push({ value: "" + _this.cooperative[loop].cooperativeId,
                    display: "" + _this.cooperative[loop].first_name,
                });
            }
        }, function (err) {
            console.log(err);
        });
    };
    ShopCategoryComponent.prototype.getCooperativeStaff = function (staffId, cooperativeId) {
        var _this = this;
        console.log("Staff and CooperativeId " + staffId + " - " + cooperativeId);
        this.cooperativeStaffService.getCooperativeStaff(staffId, cooperativeId).subscribe(function (data) {
            console.log("Cooperative Staff " + JSON.stringify(data["data"]));
            _this.cooperativeStaff = data["data"];
            console.log("Verifying Staff out side " + _this.cooperativeStaff.staffId);
            _this.sendVerifyAuth(_this.cooperativeStaff);
        }, function (err) {
            console.log(err);
        });
    };
    ShopCategoryComponent.prototype.sendVerifyAuth = function (verifyAuth) {
        console.log("Verify " + verifyAuth.staffId);
        this.cooperativeStaffService.verifyAuthToCreatLater(verifyAuth).subscribe(function (data) {
            console.log("Very Auth " + JSON.stringify(data["data"]));
        }, function (err) {
            console.log(err);
        });
    };
    ShopCategoryComponent.prototype.getCategory = function () {
        var _this = this;
        console.log("Reaching Categories ");
        this.categoryService.getAllCategory().subscribe(function (data) {
            //console.log("Category from DB " + JSON.stringify(data["data"]));
            _this.categories = data["data"];
        }, function (err) {
            console.log(JSON.stringify(err));
        });
    };
    ShopCategoryComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: "ns-shopcategory",
            templateUrl: "shopcategory.component.html",
            styleUrls: ["./shopcategory-common.css", "./shopcategory.component.css"],
        }),
        __metadata("design:paramtypes", [common_1.Location, cooperative_service_1.CooperativeService, cooperativeStaff_service_1.CooperativeStaffService,
            category_service_1.CategoryService])
    ], ShopCategoryComponent);
    return ShopCategoryComponent;
}());
exports.ShopCategoryComponent = ShopCategoryComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hvcGNhdGVnb3J5LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNob3BjYXRlZ29yeS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBK0Q7QUFDL0QsMENBQTJDO0FBVzNDLGlFQUE2RDtBQUc3RCwwRUFBc0U7QUFDdEUsb0ZBQWdGO0FBSWhGLG9FQUFnRTtBQUNoRSw4Q0FBNkM7QUFRN0M7SUFjSSwrQkFBMkIsUUFBa0IsRUFBVSxrQkFBcUMsRUFBVSx1QkFBK0MsRUFDN0ksZUFBK0I7UUFEWixhQUFRLEdBQVIsUUFBUSxDQUFVO1FBQVUsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFtQjtRQUFVLDRCQUF1QixHQUF2Qix1QkFBdUIsQ0FBd0I7UUFDN0ksb0JBQWUsR0FBZixlQUFlLENBQWdCO1FBZHZDLG9CQUFlLEdBQVksZUFBTSxDQUFDLGVBQWUsQ0FBQztRQUtsRCxnQkFBVyxHQUF1QixFQUFFLENBQUM7UUFDckMsU0FBSSxHQUFXLG9CQUFvQixDQUFDO1FBRTdCLGFBQVEsR0FBZ0IsU0FBUyxDQUFDO1FBR3pDLGVBQVUsR0FBb0IsRUFBRSxDQUFDO0lBS2pDLENBQUM7SUFFRCwrQ0FBZSxHQUFmO1FBQ0ksSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQzNCLENBQUM7SUFFUSx3Q0FBUSxHQUFmO1FBQ0ksSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBRXZCLENBQUM7SUFDSyx3Q0FBUSxHQUFmO1FBQ0ksK0ZBQStGO1FBQy9GLDRFQUE0RTtRQUM1RSw0QkFBNEI7UUFDNUIsV0FBVztRQUNYLHVEQUF1RDtRQUN2RCxJQUFJO1FBRUosT0FBTyxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsQ0FBRSxDQUFDO1FBRW5DLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO0lBQ3BFLENBQUM7SUFFRCwyQ0FBVyxHQUFYO1FB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QUFlO09BZjlCLHFCQUFxQixDQXlKakM7SUFBRCw0QkFBQztDQUFBLEFBekpELElBeUpDO0FBekpZLHNEQUFxQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCxPbkluaXQsQWZ0ZXJWaWV3SW5pdCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IExvY2F0aW9uIH0gZnJvbSBcIkBhbmd1bGFyL2NvbW1vblwiO1xyXG5pbXBvcnQgeyBTbmFja0JhciB9IGZyb20gXCJuYXRpdmVzY3JpcHQtc25hY2tiYXJcIjtcclxuaW1wb3J0ICogYXMgQXBwbGljYXRpb25TZXR0aW5ncyBmcm9tIFwiYXBwbGljYXRpb24tc2V0dGluZ3NcIjtcclxuaW1wb3J0IHsgY29ubmVjdGlvblR5cGUsIGdldENvbm5lY3Rpb25UeXBlIH0gZnJvbSBcImNvbm5lY3Rpdml0eVwiO1xyXG5pbXBvcnQgeyBBbmltYXRpb24gfSBmcm9tIFwidWkvYW5pbWF0aW9uXCI7XHJcbmltcG9ydCB7IFZpZXcgfSBmcm9tIFwidWkvY29yZS92aWV3XCI7XHJcbmltcG9ydCB7IHByb21wdCB9IGZyb20gXCJ1aS9kaWFsb2dzXCI7XHJcbmltcG9ydCB7IFBhZ2UgfSBmcm9tIFwidWkvcGFnZVwiO1xyXG5pbXBvcnQgeyBUZXh0RmllbGQgfSBmcm9tIFwidWkvdGV4dC1maWVsZFwiO1xyXG5pbXBvcnQgKiBhcyB0YWJWaWV3TW9kdWxlIGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL3RhYi12aWV3XCI7XHJcblxyXG5pbXBvcnQgeyBWYWx1ZUxpc3QsIERyb3BEb3duIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1kcm9wLWRvd25cIjtcclxuaW1wb3J0IHsgU2VsZWN0ZWRJbmRleENoYW5nZWRFdmVudERhdGEgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWRyb3AtZG93blwiO1xyXG5pbXBvcnQgeyBDb29wZXJhdGl2ZSB9IGZyb20gJy4uLy4uL21vZGVscy9pbmRleCc7XHJcbmltcG9ydCB7Q29vcGVyYXRpdmVTZXJ2aWNlfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvY29vcGVyYXRpdmUuc2VydmljZVwiO1xyXG5pbXBvcnQge0Nvb3BlcmF0aXZlU3RhZmZTZXJ2aWNlfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvY29vcGVyYXRpdmVTdGFmZi5zZXJ2aWNlXCI7XHJcblxyXG5pbXBvcnQge0Nvb3BlcmF0aXZlU3RhZmYsVmVyaWZ5QXV0aCxDYXRlZ29yeX0gZnJvbSBcIi4uLy4uL21vZGVscy9pbmRleFwiO1xyXG5cclxuaW1wb3J0IHtDYXRlZ29yeVNlcnZpY2V9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9jYXRlZ29yeS5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IENvbmZpZyB9IGZyb20gXCIuLi8uLi9zaGFyZWQvY29uZmlnXCI7XHJcbkBDb21wb25lbnQoe1xyXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcclxuICAgIHNlbGVjdG9yOiBcIm5zLXNob3BjYXRlZ29yeVwiLFxyXG4gICAgdGVtcGxhdGVVcmw6IFwic2hvcGNhdGVnb3J5LmNvbXBvbmVudC5odG1sXCIsXHJcbiAgICBzdHlsZVVybHM6IFtcIi4vc2hvcGNhdGVnb3J5LWNvbW1vbi5jc3NcIiwgXCIuL3Nob3BjYXRlZ29yeS5jb21wb25lbnQuY3NzXCJdLFxyXG59KVxyXG5cclxuZXhwb3J0IGNsYXNzIFNob3BDYXRlZ29yeUNvbXBvbmVudCB7XHJcbiAgICBwcm9kdWN0SW1hZ2VVcmw6IHN0cmluZyAgPSBDb25maWcucHJvZHVjdEltYWdlVVJMO1xyXG4gICAgcHVibGljIGlucHV0OiBhbnk7XHJcbiAgICBzZWxlY3RlZENvb3BlcmF0aXZlSW5kZXg6IG51bWJlciA7XHJcbiAgICBzZWxlY3RlZENvb3BlcmF0aXZlIDogc3RyaW5nO1xyXG4gICAgc3RhZmZJZDogU3RyaW5nO1xyXG4gICAgY29vcGVyYXRpdmU6IEFycmF5PENvb3BlcmF0aXZlPiA9IFtdO1xyXG4gICAgaGludDogc3RyaW5nID0gXCJTZWxlY3QgQ29vcGVyYXRpdmVcIjtcclxuICAgIHB1YmxpYyBjb29wZXJhdGl2ZUxpc3Q6IFZhbHVlTGlzdDxzdHJpbmc+O1xyXG4gICAgcHVibGljIGNzc0NsYXNzOiBzdHJpbmcgICAgICA9IFwiZGVmYXVsdFwiO1xyXG4gICAgY29vcGVyYXRpdmVTdGFmZjogQ29vcGVyYXRpdmVTdGFmZjtcclxuICAgIHZlcmlmeUF1dGg6IFZlcmlmeUF1dGg7XHJcbiAgICBjYXRlZ29yaWVzOiBBcnJheTxDYXRlZ29yeT4gPSBbXTtcclxuXHJcbiAgICBwdWJsaWMgY29uc3RydWN0b3IocHJpdmF0ZSBsb2NhdGlvbjogTG9jYXRpb24sIHByaXZhdGUgY29vcGVyYXRpdmVTZXJ2aWNlOkNvb3BlcmF0aXZlU2VydmljZSwgcHJpdmF0ZSBjb29wZXJhdGl2ZVN0YWZmU2VydmljZTpDb29wZXJhdGl2ZVN0YWZmU2VydmljZSxcclxuICAgIHByaXZhdGUgY2F0ZWdvcnlTZXJ2aWNlOkNhdGVnb3J5U2VydmljZSkge1xyXG4gICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgbmdBZnRlclZpZXdJbml0KCkge1xyXG4gICAgICAgIHRoaXMuZ2V0Q29vcGVyYXRpdmUoKTtcclxuICAgfVxyXG4gICBcclxuICAgICBwdWJsaWMgbmdPbkluaXQoKSB7XHJcbiAgICAgICAgIHRoaXMuZ2V0Q2F0ZWdvcnkoKTtcclxuXHJcbiAgICAgfVxyXG4gICAgcHVibGljIHJlZ2lzdGVyKCkge1xyXG4gICAgICAgIC8vIGlmKHRoaXMuaW5wdXQuZmlyc3RuYW1lICYmIHRoaXMuaW5wdXQubGFzdG5hbWUgJiYgdGhpcy5pbnB1dC5lbWFpbCAmJiB0aGlzLmlucHV0LnBhc3N3b3JkKSB7XHJcbiAgICAgICAgLy8gICAgIEFwcGxpY2F0aW9uU2V0dGluZ3Muc2V0U3RyaW5nKFwiYWNjb3VudFwiLCBKU09OLnN0cmluZ2lmeSh0aGlzLmlucHV0KSk7XHJcbiAgICAgICAgLy8gICAgIHRoaXMubG9jYXRpb24uYmFjaygpO1xyXG4gICAgICAgIC8vIH0gZWxzZSB7XHJcbiAgICAgICAgLy8gICAgIChuZXcgU25hY2tCYXIoKSkuc2ltcGxlKFwiQWxsIEZpZWxkcyBSZXF1aXJlZCFcIik7XHJcbiAgICAgICAgLy8gfVxyXG5cclxuICAgICAgICBjb25zb2xlLmxvZyhcIlJlYWNoaW5nIFJlZ2lzdGVyIFwiICk7XHJcblxyXG4gICAgICAgIHRoaXMuZ2V0Q29vcGVyYXRpdmVTdGFmZih0aGlzLnN0YWZmSWQsdGhpcy5zZWxlY3RlZENvb3BlcmF0aXZlKTtcclxuICAgIH1cclxuXHJcbiAgICBvbk5hdkJ0blRhcCgpe1xyXG4gICAgICAgIC8vIFRoaXMgY29kZSB3aWxsIGJlIGNhbGxlZCBvbmx5IGluIEFuZHJvaWQuXHJcbiAgICAgICAgY29uc29sZS5sb2coXCJOYXZpZ2F0aW9uIGJ1dHRvbiB0YXBwZWQhXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnb0JhY2soKSB7XHJcbiAgICAgICAgdGhpcy5sb2NhdGlvbi5iYWNrKCk7XHJcbiAgICB9XHJcbiAgICBzdGFydEJhY2tncm91bmRBbmltYXRpb24oYmFja2dyb3VuZCkge1xyXG4gICAgICAgIGJhY2tncm91bmQuYW5pbWF0ZSh7XHJcbiAgICAgICAgICBzY2FsZTogeyB4OiAxLjAsIHk6IDEuMCB9LFxyXG4gICAgICAgICAgZHVyYXRpb246IDEwMDAwXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHB1YmxpYyBvbmNvb3BlcmF0aXZlY2hhbmdlKGFyZ3M6IFNlbGVjdGVkSW5kZXhDaGFuZ2VkRXZlbnREYXRhKSB7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coYERyb3AgRG93biBzZWxlY3RlZCBpbmRleCBjaGFuZ2VkICAke2FyZ3Mub2xkSW5kZXh9IHRvICR7YXJncy5uZXdJbmRleH0uIE5ldyB2YWx1ZSBpcyBcIiR7dGhpcy5zZXNzaW9uaXRlbXMuZ2V0VmFsdWUoXHJcbiAgICAgICAgLy8gICAgIGFyZ3MubmV3SW5kZXgpfVwiYCk7XHJcbiAgICAgIFxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiU2VsZWN0ZWQgSUQgXCIgKyBhcmdzLm5ld0luZGV4ICk7XHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRDb29wZXJhdGl2ZSA9IHRoaXMuY29vcGVyYXRpdmVMaXN0LmdldFZhbHVlKGFyZ3MubmV3SW5kZXgpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIlNlbGVjdGVkIElkIFZhbHVlICBcIiArICB0aGlzLnNlbGVjdGVkQ29vcGVyYXRpdmUgKTtcclxuICAgICAgICAgICBcclxuICAgICAgfVxyXG5cclxuICAgICAgZ2V0Q29vcGVyYXRpdmUoKXtcclxuICAgICAgICB0aGlzLmNvb3BlcmF0aXZlU2VydmljZS5nZXRBbGxDb29wZXJhdGl2ZSgpLnN1YnNjcmliZShcclxuICAgICAgICAgICAgZGF0YSA9PiB7IFxyXG4gICAgICAgICAgICAgY29uc29sZS5sb2coXCJDb29wZXJhdGl2ZSBMaXN0IFwiKyBKU09OLnN0cmluZ2lmeShkYXRhW1wiZGF0YVwiXSkgKTtcclxuICAgICAgIFxyXG4gICAgICAgICAgICAgdGhpcy5jb29wZXJhdGl2ZSA9IGRhdGFbXCJkYXRhXCJdO1xyXG5cclxuICAgICAgICAgICAgIHRoaXMuY29vcGVyYXRpdmVMaXN0ID0gbmV3IFZhbHVlTGlzdDxzdHJpbmc+KCk7XHJcbiAgICAgICAgICAgICBmb3IgKCBsZXQgbG9vcCA9IDA7IGxvb3AgPCB0aGlzLmNvb3BlcmF0aXZlLmxlbmd0aDsgbG9vcCsrICkge1xyXG4gICAgICAgICAgICAgICB0aGlzLmNvb3BlcmF0aXZlTGlzdC5wdXNoKHsgdmFsdWU6ICAgYCR7dGhpcy5jb29wZXJhdGl2ZVtsb29wXS5jb29wZXJhdGl2ZUlkfWAsXHJcbiAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6IGAke3RoaXMuY29vcGVyYXRpdmVbbG9vcF0uZmlyc3RfbmFtZX1gLFxyXG4gICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgfVxyXG4gICAgICAgICBcclxuICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICBlcnIgPT4ge1xyXG4gICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xyXG4gICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgKTtcdCAgXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0Q29vcGVyYXRpdmVTdGFmZihzdGFmZklkOlN0cmluZyxjb29wZXJhdGl2ZUlkOlN0cmluZyl7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJTdGFmZiBhbmQgQ29vcGVyYXRpdmVJZCBcIisgIHN0YWZmSWQgKyBcIiAtIFwiICsgY29vcGVyYXRpdmVJZCk7XHJcbiAgICAgICBcclxuXHJcbiAgICAgICAgdGhpcy5jb29wZXJhdGl2ZVN0YWZmU2VydmljZS5nZXRDb29wZXJhdGl2ZVN0YWZmKHN0YWZmSWQsY29vcGVyYXRpdmVJZCkuc3Vic2NyaWJlKFxyXG4gICAgICAgICAgICBkYXRhID0+IHsgXHJcbiAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkNvb3BlcmF0aXZlIFN0YWZmIFwiKyBKU09OLnN0cmluZ2lmeShkYXRhW1wiZGF0YVwiXSkgKTtcclxuICAgICAgIFxyXG4gICAgICAgICAgICAgdGhpcy5jb29wZXJhdGl2ZVN0YWZmID0gZGF0YVtcImRhdGFcIl07XHJcblxyXG4gICAgICAgICAgICAgY29uc29sZS5sb2coXCJWZXJpZnlpbmcgU3RhZmYgb3V0IHNpZGUgXCIgKyB0aGlzLmNvb3BlcmF0aXZlU3RhZmYuc3RhZmZJZCk7XHJcbiAgICAgICAgICAgICB0aGlzLnNlbmRWZXJpZnlBdXRoKHRoaXMuY29vcGVyYXRpdmVTdGFmZik7XHJcblxyXG4gICAgICAgICAgXHJcbiAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgIGVyciA9PiB7XHJcbiAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XHJcbiAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICApO1x0ICBcclxuICAgIH1cclxuXHJcbiAgICBzZW5kVmVyaWZ5QXV0aCh2ZXJpZnlBdXRoOiBDb29wZXJhdGl2ZVN0YWZmKXtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIlZlcmlmeSBcIisgIHZlcmlmeUF1dGguc3RhZmZJZCk7XHJcbiAgICAgICBcclxuXHJcbiAgICAgICAgdGhpcy5jb29wZXJhdGl2ZVN0YWZmU2VydmljZS52ZXJpZnlBdXRoVG9DcmVhdExhdGVyKHZlcmlmeUF1dGgpLnN1YnNjcmliZShcclxuICAgICAgICAgICAgZGF0YSA9PiB7IFxyXG4gICAgICAgICAgICAgY29uc29sZS5sb2coXCJWZXJ5IEF1dGggXCIrIEpTT04uc3RyaW5naWZ5KGRhdGFbXCJkYXRhXCJdKSApO1xyXG4gICAgICAgXHJcbiAgICAgICAgICAgICBcclxuXHJcbiAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICBlcnIgPT4ge1xyXG4gICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xyXG4gICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgKTtcdCAgXHJcbiAgICB9XHJcblxyXG5cclxuICAgIGdldENhdGVnb3J5KCApe1xyXG4gICAgICAgXHJcbiAgICBcclxuICBjb25zb2xlLmxvZyhcIlJlYWNoaW5nIENhdGVnb3JpZXMgXCIpO1xyXG4gICAgICAgIHRoaXMuY2F0ZWdvcnlTZXJ2aWNlLmdldEFsbENhdGVnb3J5KCkuc3Vic2NyaWJlKFxyXG4gICAgICAgICAgICBkYXRhID0+IHsgXHJcbiAgICBcclxuICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiQ2F0ZWdvcnkgZnJvbSBEQiBcIiArIEpTT04uc3RyaW5naWZ5KGRhdGFbXCJkYXRhXCJdKSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNhdGVnb3JpZXMgPSBkYXRhW1wiZGF0YVwiXTtcclxuICAgIFxyXG4gICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgZXJyID0+IHtcclxuICAgICAgICAgICAgICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkoZXJyKSk7XHJcbiAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgKTtcdCAgXHJcbiAgICB9XHJcbiAgICAgIFxyXG5cclxufSJdfQ==