"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var nativescript_drop_down_1 = require("nativescript-drop-down");
var cooperative_service_1 = require("../../services/cooperative.service");
var cooperativeStaff_service_1 = require("../../services/cooperativeStaff.service");
var AddNewProductComponent = /** @class */ (function () {
    function AddNewProductComponent(location, cooperativeService, cooperativeStaffService) {
        this.location = location;
        this.cooperativeService = cooperativeService;
        this.cooperativeStaffService = cooperativeStaffService;
        this.cooperative = [];
        this.hint = "Select Cooperative";
        this.cssClass = "default";
        this.input = {
            "firstname": "",
            "lastname": "",
            "email": "",
            "password": ""
        };
    }
    AddNewProductComponent.prototype.ngAfterViewInit = function () {
        this.getCooperative();
    };
    AddNewProductComponent.prototype.ngOnInit = function () {
    };
    AddNewProductComponent.prototype.register = function () {
        // if(this.input.firstname && this.input.lastname && this.input.email && this.input.password) {
        //     ApplicationSettings.setString("account", JSON.stringify(this.input));
        //     this.location.back();
        // } else {
        //     (new SnackBar()).simple("All Fields Required!");
        // }
        console.log("Reaching Register ");
        this.getCooperativeStaff(this.staffId, this.selectedCooperative);
    };
    AddNewProductComponent.prototype.onNavBtnTap = function () {
        // This code will be called only in Android.
        console.log("Navigation button tapped!");
    };
    AddNewProductComponent.prototype.goBack = function () {
        this.location.back();
    };
    AddNewProductComponent.prototype.startBackgroundAnimation = function (background) {
        background.animate({
            scale: { x: 1.0, y: 1.0 },
            duration: 10000
        });
    };
    AddNewProductComponent.prototype.oncooperativechange = function (args) {
        // console.log(`Drop Down selected index changed  ${args.oldIndex} to ${args.newIndex}. New value is "${this.sessionitems.getValue(
        //     args.newIndex)}"`);
        console.log("Selected ID " + args.newIndex);
        this.selectedCooperative = this.cooperativeList.getValue(args.newIndex);
        console.log("Selected Id Value  " + this.selectedCooperative);
    };
    AddNewProductComponent.prototype.addproduct = function () {
    };
    AddNewProductComponent.prototype.getCooperative = function () {
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
    AddNewProductComponent.prototype.getCooperativeStaff = function (staffId, cooperativeId) {
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
    AddNewProductComponent.prototype.sendVerifyAuth = function (verifyAuth) {
        console.log("Verify " + verifyAuth.staffId);
        this.cooperativeStaffService.verifyAuthToCreatLater(verifyAuth).subscribe(function (data) {
            console.log("Very Auth " + JSON.stringify(data["data"]));
        }, function (err) {
            console.log(err);
        });
    };
    AddNewProductComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: "ns-addnewproduct",
            templateUrl: "addnewproduct.component.html",
            styleUrls: ["./addnewproduct.component.css"],
        }),
        __metadata("design:paramtypes", [common_1.Location, cooperative_service_1.CooperativeService, cooperativeStaff_service_1.CooperativeStaffService])
    ], AddNewProductComponent);
    return AddNewProductComponent;
}());
exports.AddNewProductComponent = AddNewProductComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRkbmV3cHJvZHVjdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhZGRuZXdwcm9kdWN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUErRDtBQUMvRCwwQ0FBMkM7QUFVM0MsaUVBQTZEO0FBRzdELDBFQUFzRTtBQUN0RSxvRkFBZ0Y7QUFXaEY7SUFhSSxnQ0FBMkIsUUFBa0IsRUFBVSxrQkFBcUMsRUFBVSx1QkFBK0M7UUFBMUgsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQUFVLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBbUI7UUFBVSw0QkFBdUIsR0FBdkIsdUJBQXVCLENBQXdCO1FBUHJKLGdCQUFXLEdBQXVCLEVBQUUsQ0FBQztRQUNyQyxTQUFJLEdBQVcsb0JBQW9CLENBQUM7UUFFN0IsYUFBUSxHQUFnQixTQUFTLENBQUM7UUFLckMsSUFBSSxDQUFDLEtBQUssR0FBRztZQUNULFdBQVcsRUFBRSxFQUFFO1lBQ2YsVUFBVSxFQUFFLEVBQUU7WUFDZCxPQUFPLEVBQUUsRUFBRTtZQUNYLFVBQVUsRUFBRSxFQUFFO1NBQ2pCLENBQUE7SUFDTCxDQUFDO0lBRUQsZ0RBQWUsR0FBZjtRQUNJLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztJQUMzQixDQUFDO0lBRVEseUNBQVEsR0FBZjtJQUVBLENBQUM7SUFDSyx5Q0FBUSxHQUFmO1FBQ0ksK0ZBQStGO1FBQy9GLDRFQUE0RTtRQUM1RSw0QkFBNEI7UUFDNUIsV0FBVztRQUNYLHVEQUF1RDtRQUN2RCxJQUFJO1FBRUosT0FBTyxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsQ0FBRSxDQUFDO1FBRW5DLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO0lBQ3BFLENBQUM7SUFFRCw0Q0FBVyxHQUFYO1FBQ0ksNENBQTRDO1FBQzVDLE9BQU8sQ0FBQyxHQUFHLENBQUMsMkJBQTJC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LENBQUM7SUFFRCwrQ0FBYyxHQUFkLFVBQWUsVUFBNEI7UUFDdkMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLEdBQUcsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBRzVDLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxzQkFBc0IsQ0FBQyxVQUFVLENBQUMsQ0FBQyxTQUFTLENBQ3JFLFVBQUEsSUFBSTtZQUNILE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBWSxHQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUUsQ0FBQztRQUl4RCxDQUFDLEVBQ0QsVUFBQSxHQUFHO1lBQ0YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUVmLENBQUMsQ0FDTCxDQUFDO0lBQ1YsQ0FBQztJQXRJUSxzQkFBc0I7UUFQbEMsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixRQUFRLEVBQUUsa0JBQWtCO1lBQzVCLFdBQVcsRUFBRSw4QkFBOEI7WUFDM0MsU0FBUyxFQUFFLENBQUMsK0JBQStCLENBQUM7U0FDL0MsQ0FBQzt5Q0FldUMsaUJBQVEsRUFBNkIsd0NBQWtCLEVBQWtDLGtEQUF1QjtPQWI1SSxzQkFBc0IsQ0F5SWxDO0lBQUQsNkJBQUM7Q0FBQSxBQXpJRCxJQXlJQztBQXpJWSx3REFBc0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsT25Jbml0LEFmdGVyVmlld0luaXQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBMb2NhdGlvbiB9IGZyb20gXCJAYW5ndWxhci9jb21tb25cIjtcclxuaW1wb3J0IHsgU25hY2tCYXIgfSBmcm9tIFwibmF0aXZlc2NyaXB0LXNuYWNrYmFyXCI7XHJcbmltcG9ydCAqIGFzIEFwcGxpY2F0aW9uU2V0dGluZ3MgZnJvbSBcImFwcGxpY2F0aW9uLXNldHRpbmdzXCI7XHJcbmltcG9ydCB7IGNvbm5lY3Rpb25UeXBlLCBnZXRDb25uZWN0aW9uVHlwZSB9IGZyb20gXCJjb25uZWN0aXZpdHlcIjtcclxuaW1wb3J0IHsgQW5pbWF0aW9uIH0gZnJvbSBcInVpL2FuaW1hdGlvblwiO1xyXG5pbXBvcnQgeyBWaWV3IH0gZnJvbSBcInVpL2NvcmUvdmlld1wiO1xyXG5pbXBvcnQgeyBwcm9tcHQgfSBmcm9tIFwidWkvZGlhbG9nc1wiO1xyXG5pbXBvcnQgeyBQYWdlIH0gZnJvbSBcInVpL3BhZ2VcIjtcclxuaW1wb3J0IHsgVGV4dEZpZWxkIH0gZnJvbSBcInVpL3RleHQtZmllbGRcIjtcclxuXHJcbmltcG9ydCB7IFZhbHVlTGlzdCwgRHJvcERvd24gfSBmcm9tIFwibmF0aXZlc2NyaXB0LWRyb3AtZG93blwiO1xyXG5pbXBvcnQgeyBTZWxlY3RlZEluZGV4Q2hhbmdlZEV2ZW50RGF0YSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtZHJvcC1kb3duXCI7XHJcbmltcG9ydCB7IENvb3BlcmF0aXZlIH0gZnJvbSAnLi4vLi4vbW9kZWxzL2luZGV4JztcclxuaW1wb3J0IHtDb29wZXJhdGl2ZVNlcnZpY2V9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9jb29wZXJhdGl2ZS5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7Q29vcGVyYXRpdmVTdGFmZlNlcnZpY2V9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9jb29wZXJhdGl2ZVN0YWZmLnNlcnZpY2VcIjtcclxuXHJcbmltcG9ydCB7Q29vcGVyYXRpdmVTdGFmZixWZXJpZnlBdXRofSBmcm9tIFwiLi4vLi4vbW9kZWxzL2luZGV4XCI7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXHJcbiAgICBzZWxlY3RvcjogXCJucy1hZGRuZXdwcm9kdWN0XCIsXHJcbiAgICB0ZW1wbGF0ZVVybDogXCJhZGRuZXdwcm9kdWN0LmNvbXBvbmVudC5odG1sXCIsXHJcbiAgICBzdHlsZVVybHM6IFtcIi4vYWRkbmV3cHJvZHVjdC5jb21wb25lbnQuY3NzXCJdLFxyXG59KVxyXG5cclxuZXhwb3J0IGNsYXNzIEFkZE5ld1Byb2R1Y3RDb21wb25lbnQge1xyXG5cclxuICAgIHB1YmxpYyBpbnB1dDogYW55O1xyXG4gICAgc2VsZWN0ZWRDb29wZXJhdGl2ZUluZGV4OiBudW1iZXIgO1xyXG4gICAgc2VsZWN0ZWRDb29wZXJhdGl2ZSA6IHN0cmluZztcclxuICAgIHN0YWZmSWQ6IFN0cmluZztcclxuICAgIGNvb3BlcmF0aXZlOiBBcnJheTxDb29wZXJhdGl2ZT4gPSBbXTtcclxuICAgIGhpbnQ6IHN0cmluZyA9IFwiU2VsZWN0IENvb3BlcmF0aXZlXCI7XHJcbiAgICBwdWJsaWMgY29vcGVyYXRpdmVMaXN0OiBWYWx1ZUxpc3Q8c3RyaW5nPjtcclxuICAgIHB1YmxpYyBjc3NDbGFzczogc3RyaW5nICAgICAgPSBcImRlZmF1bHRcIjtcclxuICAgIGNvb3BlcmF0aXZlU3RhZmY6IENvb3BlcmF0aXZlU3RhZmY7XHJcbiAgICB2ZXJpZnlBdXRoOiBWZXJpZnlBdXRoO1xyXG5cclxuICAgIHB1YmxpYyBjb25zdHJ1Y3Rvcihwcml2YXRlIGxvY2F0aW9uOiBMb2NhdGlvbiwgcHJpdmF0ZSBjb29wZXJhdGl2ZVNlcnZpY2U6Q29vcGVyYXRpdmVTZXJ2aWNlLCBwcml2YXRlIGNvb3BlcmF0aXZlU3RhZmZTZXJ2aWNlOkNvb3BlcmF0aXZlU3RhZmZTZXJ2aWNlKSB7XHJcbiAgICAgICAgdGhpcy5pbnB1dCA9IHtcclxuICAgICAgICAgICAgXCJmaXJzdG5hbWVcIjogXCJcIixcclxuICAgICAgICAgICAgXCJsYXN0bmFtZVwiOiBcIlwiLFxyXG4gICAgICAgICAgICBcImVtYWlsXCI6IFwiXCIsXHJcbiAgICAgICAgICAgIFwicGFzc3dvcmRcIjogXCJcIlxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBuZ0FmdGVyVmlld0luaXQoKSB7XHJcbiAgICAgICAgdGhpcy5nZXRDb29wZXJhdGl2ZSgpO1xyXG4gICB9XHJcbiAgIFxyXG4gICAgIHB1YmxpYyBuZ09uSW5pdCgpIHtcclxuXHJcbiAgICAgfVxyXG4gICAgcHVibGljIHJlZ2lzdGVyKCkge1xyXG4gICAgICAgIC8vIGlmKHRoaXMuaW5wdXQuZmlyc3RuYW1lICYmIHRoaXMuaW5wdXQubGFzdG5hbWUgJiYgdGhpcy5pbnB1dC5lbWFpbCAmJiB0aGlzLmlucHV0LnBhc3N3b3JkKSB7XHJcbiAgICAgICAgLy8gICAgIEFwcGxpY2F0aW9uU2V0dGluZ3Muc2V0U3RyaW5nKFwiYWNjb3VudFwiLCBKU09OLnN0cmluZ2lmeSh0aGlzLmlucHV0KSk7XHJcbiAgICAgICAgLy8gICAgIHRoaXMubG9jYXRpb24uYmFjaygpO1xyXG4gICAgICAgIC8vIH0gZWxzZSB7XHJcbiAgICAgICAgLy8gICAgIChuZXcgU25hY2tCYXIoKSkuc2ltcGxlKFwiQWxsIEZpZWxkcyBSZXF1aXJlZCFcIik7XHJcbiAgICAgICAgLy8gfVxyXG5cclxuICAgICAgICBjb25zb2xlLmxvZyhcIlJlYWNoaW5nIFJlZ2lzdGVyIFwiICk7XHJcblxyXG4gICAgICAgIHRoaXMuZ2V0Q29vcGVyYXRpdmVTdGFmZih0aGlzLnN0YWZmSWQsdGhpcy5zZWxlY3RlZENvb3BlcmF0aXZlKTtcclxuICAgIH1cclxuXHJcbiAgICBvbk5hdkJ0blRhcCgpe1xyXG4gICAgICAgIC8vIFRoaXMgY29kZSB3aWxsIGJlIGNhbGxlZCBvbmx5IGluIEFuZHJvaWQuXHJcbiAgICAgICAgY29uc29sZS5sb2coXCJOYXZpZ2F0aW9uIGJ1dHRvbiB0YXBwZWQhXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnb0JhY2soKSB7XHJcbiAgICAgICAgdGhpcy5sb2NhdGlvbi5iYWNrKCk7XHJcbiAgICB9XHJcbiAgICBzdGFydEJhY2tncm91bmRBbmltYXRpb24oYmFja2dyb3VuZCkge1xyXG4gICAgICAgIGJhY2tncm91bmQuYW5pbWF0ZSh7XHJcbiAgICAgICAgICBzY2FsZTogeyB4OiAxLjAsIHk6IDEuMCB9LFxyXG4gICAgICAgICAgZHVyYXRpb246IDEwMDAwXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHB1YmxpYyBvbmNvb3BlcmF0aXZlY2hhbmdlKGFyZ3M6IFNlbGVjdGVkSW5kZXhDaGFuZ2VkRXZlbnREYXRhKSB7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coYERyb3AgRG93biBzZWxlY3RlZCBpbmRleCBjaGFuZ2VkICAke2FyZ3Mub2xkSW5kZXh9IHRvICR7YXJncy5uZXdJbmRleH0uIE5ldyB2YWx1ZSBpcyBcIiR7dGhpcy5zZXNzaW9uaXRlbXMuZ2V0VmFsdWUoXHJcbiAgICAgICAgLy8gICAgIGFyZ3MubmV3SW5kZXgpfVwiYCk7XHJcbiAgICAgIFxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiU2VsZWN0ZWQgSUQgXCIgKyBhcmdzLm5ld0luZGV4ICk7XHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRDb29wZXJhdGl2ZSA9IHRoaXMuY29vcGVyYXRpdmVMaXN0LmdldFZhbHVlKGFyZ3MubmV3SW5kZXgpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIlNlbGVjdGVkIElkIFZhbHVlICBcIiArICB0aGlzLnNlbGVjdGVkQ29vcGVyYXRpdmUgKTtcclxuICAgICAgICAgICBcclxuICAgICAgfVxyXG5cclxuICAgICAgYWRkcHJvZHVjdCgpe1xyXG4gICAgICAgICAgXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGdldENvb3BlcmF0aXZlKCl7XHJcbiAgICAgICAgdGhpcy5jb29wZXJhdGl2ZVNlcnZpY2UuZ2V0QWxsQ29vcGVyYXRpdmUoKS5zdWJzY3JpYmUoXHJcbiAgICAgICAgICAgIGRhdGEgPT4geyBcclxuICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQ29vcGVyYXRpdmUgTGlzdCBcIisgSlNPTi5zdHJpbmdpZnkoZGF0YVtcImRhdGFcIl0pICk7XHJcbiAgICAgICBcclxuICAgICAgICAgICAgIHRoaXMuY29vcGVyYXRpdmUgPSBkYXRhW1wiZGF0YVwiXTtcclxuXHJcbiAgICAgICAgICAgICB0aGlzLmNvb3BlcmF0aXZlTGlzdCA9IG5ldyBWYWx1ZUxpc3Q8c3RyaW5nPigpO1xyXG4gICAgICAgICAgICAgZm9yICggbGV0IGxvb3AgPSAwOyBsb29wIDwgdGhpcy5jb29wZXJhdGl2ZS5sZW5ndGg7IGxvb3ArKyApIHtcclxuICAgICAgICAgICAgICAgdGhpcy5jb29wZXJhdGl2ZUxpc3QucHVzaCh7IHZhbHVlOiAgIGAke3RoaXMuY29vcGVyYXRpdmVbbG9vcF0uY29vcGVyYXRpdmVJZH1gLFxyXG4gICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiBgJHt0aGlzLmNvb3BlcmF0aXZlW2xvb3BdLmZpcnN0X25hbWV9YCxcclxuICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgIH1cclxuICAgICAgICAgXHJcbiAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgZXJyID0+IHtcclxuICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcclxuICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICk7XHQgIFxyXG4gICAgfVxyXG5cclxuICAgIGdldENvb3BlcmF0aXZlU3RhZmYoc3RhZmZJZDpTdHJpbmcsY29vcGVyYXRpdmVJZDpTdHJpbmcpe1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiU3RhZmYgYW5kIENvb3BlcmF0aXZlSWQgXCIrICBzdGFmZklkICsgXCIgLSBcIiArIGNvb3BlcmF0aXZlSWQpO1xyXG4gICAgICAgXHJcblxyXG4gICAgICAgIHRoaXMuY29vcGVyYXRpdmVTdGFmZlNlcnZpY2UuZ2V0Q29vcGVyYXRpdmVTdGFmZihzdGFmZklkLGNvb3BlcmF0aXZlSWQpLnN1YnNjcmliZShcclxuICAgICAgICAgICAgZGF0YSA9PiB7IFxyXG4gICAgICAgICAgICAgY29uc29sZS5sb2coXCJDb29wZXJhdGl2ZSBTdGFmZiBcIisgSlNPTi5zdHJpbmdpZnkoZGF0YVtcImRhdGFcIl0pICk7XHJcbiAgICAgICBcclxuICAgICAgICAgICAgIHRoaXMuY29vcGVyYXRpdmVTdGFmZiA9IGRhdGFbXCJkYXRhXCJdO1xyXG5cclxuICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiVmVyaWZ5aW5nIFN0YWZmIG91dCBzaWRlIFwiICsgdGhpcy5jb29wZXJhdGl2ZVN0YWZmLnN0YWZmSWQpO1xyXG4gICAgICAgICAgICAgdGhpcy5zZW5kVmVyaWZ5QXV0aCh0aGlzLmNvb3BlcmF0aXZlU3RhZmYpO1xyXG5cclxuICAgICAgICAgIFxyXG4gICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICBlcnIgPT4ge1xyXG4gICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xyXG4gICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgKTtcdCAgXHJcbiAgICB9XHJcblxyXG4gICAgc2VuZFZlcmlmeUF1dGgodmVyaWZ5QXV0aDogQ29vcGVyYXRpdmVTdGFmZil7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJWZXJpZnkgXCIrICB2ZXJpZnlBdXRoLnN0YWZmSWQpO1xyXG4gICAgICAgXHJcblxyXG4gICAgICAgIHRoaXMuY29vcGVyYXRpdmVTdGFmZlNlcnZpY2UudmVyaWZ5QXV0aFRvQ3JlYXRMYXRlcih2ZXJpZnlBdXRoKS5zdWJzY3JpYmUoXHJcbiAgICAgICAgICAgIGRhdGEgPT4geyBcclxuICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiVmVyeSBBdXRoIFwiKyBKU09OLnN0cmluZ2lmeShkYXRhW1wiZGF0YVwiXSkgKTtcclxuICAgICAgIFxyXG4gICAgICAgICAgICAgXHJcblxyXG4gICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgZXJyID0+IHtcclxuICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcclxuICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICk7XHQgIFxyXG4gICAgfVxyXG4gICAgICBcclxuXHJcbn0iXX0=