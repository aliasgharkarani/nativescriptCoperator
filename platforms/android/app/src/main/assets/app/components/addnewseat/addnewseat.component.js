"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var nativescript_drop_down_1 = require("nativescript-drop-down");
var cooperative_service_1 = require("../../services/cooperative.service");
var cooperativeStaff_service_1 = require("../../services/cooperativeStaff.service");
var AddNewSeatComponent = /** @class */ (function () {
    function AddNewSeatComponent(location, cooperativeService, cooperativeStaffService) {
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
    AddNewSeatComponent.prototype.ngAfterViewInit = function () {
        this.getCooperative();
    };
    AddNewSeatComponent.prototype.ngOnInit = function () {
    };
    AddNewSeatComponent.prototype.register = function () {
        // if(this.input.firstname && this.input.lastname && this.input.email && this.input.password) {
        //     ApplicationSettings.setString("account", JSON.stringify(this.input));
        //     this.location.back();
        // } else {
        //     (new SnackBar()).simple("All Fields Required!");
        // }
        console.log("Reaching Register ");
        this.getCooperativeStaff(this.staffId, this.selectedCooperative);
    };
    AddNewSeatComponent.prototype.onNavBtnTap = function () {
        // This code will be called only in Android.
        console.log("Navigation button tapped!");
    };
    AddNewSeatComponent.prototype.goBack = function () {
        this.location.back();
    };
    AddNewSeatComponent.prototype.addNewSeat = function () {
    };
    AddNewSeatComponent.prototype.startBackgroundAnimation = function (background) {
        background.animate({
            scale: { x: 1.0, y: 1.0 },
            duration: 10000
        });
    };
    AddNewSeatComponent.prototype.oncooperativechange = function (args) {
        // console.log(`Drop Down selected index changed  ${args.oldIndex} to ${args.newIndex}. New value is "${this.sessionitems.getValue(
        //     args.newIndex)}"`);
        console.log("Selected ID " + args.newIndex);
        this.selectedCooperative = this.cooperativeList.getValue(args.newIndex);
        console.log("Selected Id Value  " + this.selectedCooperative);
    };
    AddNewSeatComponent.prototype.getCooperative = function () {
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
    AddNewSeatComponent.prototype.getCooperativeStaff = function (staffId, cooperativeId) {
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
    AddNewSeatComponent.prototype.sendVerifyAuth = function (verifyAuth) {
        console.log("Verify " + verifyAuth.staffId);
        this.cooperativeStaffService.verifyAuthToCreatLater(verifyAuth).subscribe(function (data) {
            console.log("Very Auth " + JSON.stringify(data["data"]));
        }, function (err) {
            console.log(err);
        });
    };
    AddNewSeatComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: "ns-addnewseat",
            templateUrl: "addnewseat.component.html",
            styleUrls: ["./addnewseat.component.css"],
        }),
        __metadata("design:paramtypes", [common_1.Location, cooperative_service_1.CooperativeService, cooperativeStaff_service_1.CooperativeStaffService])
    ], AddNewSeatComponent);
    return AddNewSeatComponent;
}());
exports.AddNewSeatComponent = AddNewSeatComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRkbmV3c2VhdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhZGRuZXdzZWF0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUErRDtBQUMvRCwwQ0FBMkM7QUFVM0MsaUVBQTZEO0FBRzdELDBFQUFzRTtBQUN0RSxvRkFBZ0Y7QUFXaEY7SUFhSSw2QkFBMkIsUUFBa0IsRUFBVSxrQkFBcUMsRUFBVSx1QkFBK0M7UUFBMUgsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQUFVLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBbUI7UUFBVSw0QkFBdUIsR0FBdkIsdUJBQXVCLENBQXdCO1FBUHJKLGdCQUFXLEdBQXVCLEVBQUUsQ0FBQztRQUNyQyxTQUFJLEdBQVcsb0JBQW9CLENBQUM7UUFFN0IsYUFBUSxHQUFnQixTQUFTLENBQUM7UUFLckMsSUFBSSxDQUFDLEtBQUssR0FBRztZQUNULFdBQVcsRUFBRSxFQUFFO1lBQ2YsVUFBVSxFQUFFLEVBQUU7WUFDZCxPQUFPLEVBQUUsRUFBRTtZQUNYLFVBQVUsRUFBRSxFQUFFO1NBQ2pCLENBQUE7SUFDTCxDQUFDO0lBRUQsNkNBQWUsR0FBZjtRQUNJLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztJQUMzQixDQUFDO0lBRVEsc0NBQVEsR0FBZjtJQUVBLENBQUM7SUFDSyxzQ0FBUSxHQUFmO1FBQ0ksK0ZBQStGO1FBQy9GLDRFQUE0RTtRQUM1RSw0QkFBNEI7UUFDNUIsV0FBVztRQUNYLHVEQUF1RDtRQUN2RCxJQUFJO1FBRUosT0FBTyxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsQ0FBRSxDQUFDO1FBRW5DLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO0lBQ3BFLENBQUM7SUFFRCx5Q0FBVyxHQUFYO1FBQ0ksNENBQTRDO1FBQzVDLE9BQU8sQ0FBQyxHQUFHLENBQUMsMkJBQTJCLENBQUMs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SUFFRCw0Q0FBYyxHQUFkLFVBQWUsVUFBNEI7UUFDdkMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLEdBQUcsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBRzVDLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxzQkFBc0IsQ0FBQyxVQUFVLENBQUMsQ0FBQyxTQUFTLENBQ3JFLFVBQUEsSUFBSTtZQUNILE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBWSxHQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUUsQ0FBQztRQUl4RCxDQUFDLEVBQ0QsVUFBQSxHQUFHO1lBQ0YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUVmLENBQUMsQ0FDTCxDQUFDO0lBQ1YsQ0FBQztJQXRJUSxtQkFBbUI7UUFQL0IsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixRQUFRLEVBQUUsZUFBZTtZQUN6QixXQUFXLEVBQUUsMkJBQTJCO1lBQ3hDLFNBQVMsRUFBRSxDQUFDLDRCQUE0QixDQUFDO1NBQzVDLENBQUM7eUNBZXVDLGlCQUFRLEVBQTZCLHdDQUFrQixFQUFrQyxrREFBdUI7T0FiNUksbUJBQW1CLENBeUkvQjtJQUFELDBCQUFDO0NBQUEsQUF6SUQsSUF5SUM7QUF6SVksa0RBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LE9uSW5pdCxBZnRlclZpZXdJbml0IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgTG9jYXRpb24gfSBmcm9tIFwiQGFuZ3VsYXIvY29tbW9uXCI7XHJcbmltcG9ydCB7IFNuYWNrQmFyIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1zbmFja2JhclwiO1xyXG5pbXBvcnQgKiBhcyBBcHBsaWNhdGlvblNldHRpbmdzIGZyb20gXCJhcHBsaWNhdGlvbi1zZXR0aW5nc1wiO1xyXG5pbXBvcnQgeyBjb25uZWN0aW9uVHlwZSwgZ2V0Q29ubmVjdGlvblR5cGUgfSBmcm9tIFwiY29ubmVjdGl2aXR5XCI7XHJcbmltcG9ydCB7IEFuaW1hdGlvbiB9IGZyb20gXCJ1aS9hbmltYXRpb25cIjtcclxuaW1wb3J0IHsgVmlldyB9IGZyb20gXCJ1aS9jb3JlL3ZpZXdcIjtcclxuaW1wb3J0IHsgcHJvbXB0IH0gZnJvbSBcInVpL2RpYWxvZ3NcIjtcclxuaW1wb3J0IHsgUGFnZSB9IGZyb20gXCJ1aS9wYWdlXCI7XHJcbmltcG9ydCB7IFRleHRGaWVsZCB9IGZyb20gXCJ1aS90ZXh0LWZpZWxkXCI7XHJcblxyXG5pbXBvcnQgeyBWYWx1ZUxpc3QsIERyb3BEb3duIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1kcm9wLWRvd25cIjtcclxuaW1wb3J0IHsgU2VsZWN0ZWRJbmRleENoYW5nZWRFdmVudERhdGEgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWRyb3AtZG93blwiO1xyXG5pbXBvcnQgeyBDb29wZXJhdGl2ZSB9IGZyb20gJy4uLy4uL21vZGVscy9pbmRleCc7XHJcbmltcG9ydCB7Q29vcGVyYXRpdmVTZXJ2aWNlfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvY29vcGVyYXRpdmUuc2VydmljZVwiO1xyXG5pbXBvcnQge0Nvb3BlcmF0aXZlU3RhZmZTZXJ2aWNlfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvY29vcGVyYXRpdmVTdGFmZi5zZXJ2aWNlXCI7XHJcblxyXG5pbXBvcnQge0Nvb3BlcmF0aXZlU3RhZmYsVmVyaWZ5QXV0aH0gZnJvbSBcIi4uLy4uL21vZGVscy9pbmRleFwiO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxyXG4gICAgc2VsZWN0b3I6IFwibnMtYWRkbmV3c2VhdFwiLFxyXG4gICAgdGVtcGxhdGVVcmw6IFwiYWRkbmV3c2VhdC5jb21wb25lbnQuaHRtbFwiLFxyXG4gICAgc3R5bGVVcmxzOiBbXCIuL2FkZG5ld3NlYXQuY29tcG9uZW50LmNzc1wiXSxcclxufSlcclxuXHJcbmV4cG9ydCBjbGFzcyBBZGROZXdTZWF0Q29tcG9uZW50IHtcclxuXHJcbiAgICBwdWJsaWMgaW5wdXQ6IGFueTtcclxuICAgIHNlbGVjdGVkQ29vcGVyYXRpdmVJbmRleDogbnVtYmVyIDtcclxuICAgIHNlbGVjdGVkQ29vcGVyYXRpdmUgOiBzdHJpbmc7XHJcbiAgICBzdGFmZklkOiBTdHJpbmc7XHJcbiAgICBjb29wZXJhdGl2ZTogQXJyYXk8Q29vcGVyYXRpdmU+ID0gW107XHJcbiAgICBoaW50OiBzdHJpbmcgPSBcIlNlbGVjdCBDb29wZXJhdGl2ZVwiO1xyXG4gICAgcHVibGljIGNvb3BlcmF0aXZlTGlzdDogVmFsdWVMaXN0PHN0cmluZz47XHJcbiAgICBwdWJsaWMgY3NzQ2xhc3M6IHN0cmluZyAgICAgID0gXCJkZWZhdWx0XCI7XHJcbiAgICBjb29wZXJhdGl2ZVN0YWZmOiBDb29wZXJhdGl2ZVN0YWZmO1xyXG4gICAgdmVyaWZ5QXV0aDogVmVyaWZ5QXV0aDtcclxuXHJcbiAgICBwdWJsaWMgY29uc3RydWN0b3IocHJpdmF0ZSBsb2NhdGlvbjogTG9jYXRpb24sIHByaXZhdGUgY29vcGVyYXRpdmVTZXJ2aWNlOkNvb3BlcmF0aXZlU2VydmljZSwgcHJpdmF0ZSBjb29wZXJhdGl2ZVN0YWZmU2VydmljZTpDb29wZXJhdGl2ZVN0YWZmU2VydmljZSkge1xyXG4gICAgICAgIHRoaXMuaW5wdXQgPSB7XHJcbiAgICAgICAgICAgIFwiZmlyc3RuYW1lXCI6IFwiXCIsXHJcbiAgICAgICAgICAgIFwibGFzdG5hbWVcIjogXCJcIixcclxuICAgICAgICAgICAgXCJlbWFpbFwiOiBcIlwiLFxyXG4gICAgICAgICAgICBcInBhc3N3b3JkXCI6IFwiXCJcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgbmdBZnRlclZpZXdJbml0KCkge1xyXG4gICAgICAgIHRoaXMuZ2V0Q29vcGVyYXRpdmUoKTtcclxuICAgfVxyXG4gICBcclxuICAgICBwdWJsaWMgbmdPbkluaXQoKSB7XHJcblxyXG4gICAgIH1cclxuICAgIHB1YmxpYyByZWdpc3RlcigpIHtcclxuICAgICAgICAvLyBpZih0aGlzLmlucHV0LmZpcnN0bmFtZSAmJiB0aGlzLmlucHV0Lmxhc3RuYW1lICYmIHRoaXMuaW5wdXQuZW1haWwgJiYgdGhpcy5pbnB1dC5wYXNzd29yZCkge1xyXG4gICAgICAgIC8vICAgICBBcHBsaWNhdGlvblNldHRpbmdzLnNldFN0cmluZyhcImFjY291bnRcIiwgSlNPTi5zdHJpbmdpZnkodGhpcy5pbnB1dCkpO1xyXG4gICAgICAgIC8vICAgICB0aGlzLmxvY2F0aW9uLmJhY2soKTtcclxuICAgICAgICAvLyB9IGVsc2Uge1xyXG4gICAgICAgIC8vICAgICAobmV3IFNuYWNrQmFyKCkpLnNpbXBsZShcIkFsbCBGaWVsZHMgUmVxdWlyZWQhXCIpO1xyXG4gICAgICAgIC8vIH1cclxuXHJcbiAgICAgICAgY29uc29sZS5sb2coXCJSZWFjaGluZyBSZWdpc3RlciBcIiApO1xyXG5cclxuICAgICAgICB0aGlzLmdldENvb3BlcmF0aXZlU3RhZmYodGhpcy5zdGFmZklkLHRoaXMuc2VsZWN0ZWRDb29wZXJhdGl2ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgb25OYXZCdG5UYXAoKXtcclxuICAgICAgICAvLyBUaGlzIGNvZGUgd2lsbCBiZSBjYWxsZWQgb25seSBpbiBBbmRyb2lkLlxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiTmF2aWdhdGlvbiBidXR0b24gdGFwcGVkIVwiKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ29CYWNrKCkge1xyXG4gICAgICAgIHRoaXMubG9jYXRpb24uYmFjaygpO1xyXG4gICAgfVxyXG5cclxuICAgIGFkZE5ld1NlYXQoKXtcclxuICAgICAgICBcclxuICAgIH1cclxuICAgIHN0YXJ0QmFja2dyb3VuZEFuaW1hdGlvbihiYWNrZ3JvdW5kKSB7XHJcbiAgICAgICAgYmFja2dyb3VuZC5hbmltYXRlKHtcclxuICAgICAgICAgIHNjYWxlOiB7IHg6IDEuMCwgeTogMS4wIH0sXHJcbiAgICAgICAgICBkdXJhdGlvbjogMTAwMDBcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG5cclxuICAgICAgcHVibGljIG9uY29vcGVyYXRpdmVjaGFuZ2UoYXJnczogU2VsZWN0ZWRJbmRleENoYW5nZWRFdmVudERhdGEpIHtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhgRHJvcCBEb3duIHNlbGVjdGVkIGluZGV4IGNoYW5nZWQgICR7YXJncy5vbGRJbmRleH0gdG8gJHthcmdzLm5ld0luZGV4fS4gTmV3IHZhbHVlIGlzIFwiJHt0aGlzLnNlc3Npb25pdGVtcy5nZXRWYWx1ZShcclxuICAgICAgICAvLyAgICAgYXJncy5uZXdJbmRleCl9XCJgKTtcclxuICAgICAgXHJcbiAgICAgICAgY29uc29sZS5sb2coXCJTZWxlY3RlZCBJRCBcIiArIGFyZ3MubmV3SW5kZXggKTtcclxuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZENvb3BlcmF0aXZlID0gdGhpcy5jb29wZXJhdGl2ZUxpc3QuZ2V0VmFsdWUoYXJncy5uZXdJbmRleCk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiU2VsZWN0ZWQgSWQgVmFsdWUgIFwiICsgIHRoaXMuc2VsZWN0ZWRDb29wZXJhdGl2ZSApO1xyXG4gICAgICAgICAgIFxyXG4gICAgICB9XHJcblxyXG4gICAgICBnZXRDb29wZXJhdGl2ZSgpe1xyXG4gICAgICAgIHRoaXMuY29vcGVyYXRpdmVTZXJ2aWNlLmdldEFsbENvb3BlcmF0aXZlKCkuc3Vic2NyaWJlKFxyXG4gICAgICAgICAgICBkYXRhID0+IHsgXHJcbiAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkNvb3BlcmF0aXZlIExpc3QgXCIrIEpTT04uc3RyaW5naWZ5KGRhdGFbXCJkYXRhXCJdKSApO1xyXG4gICAgICAgXHJcbiAgICAgICAgICAgICB0aGlzLmNvb3BlcmF0aXZlID0gZGF0YVtcImRhdGFcIl07XHJcblxyXG4gICAgICAgICAgICAgdGhpcy5jb29wZXJhdGl2ZUxpc3QgPSBuZXcgVmFsdWVMaXN0PHN0cmluZz4oKTtcclxuICAgICAgICAgICAgIGZvciAoIGxldCBsb29wID0gMDsgbG9vcCA8IHRoaXMuY29vcGVyYXRpdmUubGVuZ3RoOyBsb29wKysgKSB7XHJcbiAgICAgICAgICAgICAgIHRoaXMuY29vcGVyYXRpdmVMaXN0LnB1c2goeyB2YWx1ZTogICBgJHt0aGlzLmNvb3BlcmF0aXZlW2xvb3BdLmNvb3BlcmF0aXZlSWR9YCxcclxuICAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogYCR7dGhpcy5jb29wZXJhdGl2ZVtsb29wXS5maXJzdF9uYW1lfWAsXHJcbiAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICB9XHJcbiAgICAgICAgIFxyXG4gICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgIGVyciA9PiB7XHJcbiAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XHJcbiAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICApO1x0ICBcclxuICAgIH1cclxuXHJcbiAgICBnZXRDb29wZXJhdGl2ZVN0YWZmKHN0YWZmSWQ6U3RyaW5nLGNvb3BlcmF0aXZlSWQ6U3RyaW5nKXtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIlN0YWZmIGFuZCBDb29wZXJhdGl2ZUlkIFwiKyAgc3RhZmZJZCArIFwiIC0gXCIgKyBjb29wZXJhdGl2ZUlkKTtcclxuICAgICAgIFxyXG5cclxuICAgICAgICB0aGlzLmNvb3BlcmF0aXZlU3RhZmZTZXJ2aWNlLmdldENvb3BlcmF0aXZlU3RhZmYoc3RhZmZJZCxjb29wZXJhdGl2ZUlkKS5zdWJzY3JpYmUoXHJcbiAgICAgICAgICAgIGRhdGEgPT4geyBcclxuICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQ29vcGVyYXRpdmUgU3RhZmYgXCIrIEpTT04uc3RyaW5naWZ5KGRhdGFbXCJkYXRhXCJdKSApO1xyXG4gICAgICAgXHJcbiAgICAgICAgICAgICB0aGlzLmNvb3BlcmF0aXZlU3RhZmYgPSBkYXRhW1wiZGF0YVwiXTtcclxuXHJcbiAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlZlcmlmeWluZyBTdGFmZiBvdXQgc2lkZSBcIiArIHRoaXMuY29vcGVyYXRpdmVTdGFmZi5zdGFmZklkKTtcclxuICAgICAgICAgICAgIHRoaXMuc2VuZFZlcmlmeUF1dGgodGhpcy5jb29wZXJhdGl2ZVN0YWZmKTtcclxuXHJcbiAgICAgICAgICBcclxuICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgZXJyID0+IHtcclxuICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcclxuICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICk7XHQgIFxyXG4gICAgfVxyXG5cclxuICAgIHNlbmRWZXJpZnlBdXRoKHZlcmlmeUF1dGg6IENvb3BlcmF0aXZlU3RhZmYpe1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiVmVyaWZ5IFwiKyAgdmVyaWZ5QXV0aC5zdGFmZklkKTtcclxuICAgICAgIFxyXG5cclxuICAgICAgICB0aGlzLmNvb3BlcmF0aXZlU3RhZmZTZXJ2aWNlLnZlcmlmeUF1dGhUb0NyZWF0TGF0ZXIodmVyaWZ5QXV0aCkuc3Vic2NyaWJlKFxyXG4gICAgICAgICAgICBkYXRhID0+IHsgXHJcbiAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlZlcnkgQXV0aCBcIisgSlNPTi5zdHJpbmdpZnkoZGF0YVtcImRhdGFcIl0pICk7XHJcbiAgICAgICBcclxuICAgICAgICAgICAgIFxyXG5cclxuICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgIGVyciA9PiB7XHJcbiAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XHJcbiAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICApO1x0ICBcclxuICAgIH1cclxuICAgICAgXHJcblxyXG59Il19