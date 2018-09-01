"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var nativescript_drop_down_1 = require("nativescript-drop-down");
var cooperative_service_1 = require("../../services/cooperative.service");
var cooperativeStaff_service_1 = require("../../services/cooperativeStaff.service");
var PaymentComponent = /** @class */ (function () {
    function PaymentComponent(location, cooperativeService, cooperativeStaffService) {
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
    PaymentComponent.prototype.ngAfterViewInit = function () {
        this.getCooperative();
    };
    PaymentComponent.prototype.ngOnInit = function () {
    };
    PaymentComponent.prototype.register = function () {
        // if(this.input.firstname && this.input.lastname && this.input.email && this.input.password) {
        //     ApplicationSettings.setString("account", JSON.stringify(this.input));
        //     this.location.back();
        // } else {
        //     (new SnackBar()).simple("All Fields Required!");
        // }
        console.log("Reaching Register ");
        this.getCooperativeStaff(this.staffId, this.selectedCooperative);
    };
    PaymentComponent.prototype.onNavBtnTap = function () {
        // This code will be called only in Android.
        console.log("Navigation button tapped!");
    };
    PaymentComponent.prototype.pay = function () {
    };
    PaymentComponent.prototype.goBack = function () {
        this.location.back();
    };
    PaymentComponent.prototype.startBackgroundAnimation = function (background) {
        background.animate({
            scale: { x: 1.0, y: 1.0 },
            duration: 10000
        });
    };
    PaymentComponent.prototype.oncooperativechange = function (args) {
        // console.log(`Drop Down selected index changed  ${args.oldIndex} to ${args.newIndex}. New value is "${this.sessionitems.getValue(
        //     args.newIndex)}"`);
        console.log("Selected ID " + args.newIndex);
        this.selectedCooperative = this.cooperativeList.getValue(args.newIndex);
        console.log("Selected Id Value  " + this.selectedCooperative);
    };
    PaymentComponent.prototype.getCooperative = function () {
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
    PaymentComponent.prototype.getCooperativeStaff = function (staffId, cooperativeId) {
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
    PaymentComponent.prototype.sendVerifyAuth = function (verifyAuth) {
        console.log("Verify " + verifyAuth.staffId);
        this.cooperativeStaffService.verifyAuthToCreatLater(verifyAuth).subscribe(function (data) {
            console.log("Very Auth " + JSON.stringify(data["data"]));
        }, function (err) {
            console.log(err);
        });
    };
    PaymentComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: "ns-payment",
            templateUrl: "payment.component.html",
            styleUrls: ["./payment.component.css"],
        }),
        __metadata("design:paramtypes", [common_1.Location, cooperative_service_1.CooperativeService, cooperativeStaff_service_1.CooperativeStaffService])
    ], PaymentComponent);
    return PaymentComponent;
}());
exports.PaymentComponent = PaymentComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGF5bWVudC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwYXltZW50LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUErRDtBQUMvRCwwQ0FBMkM7QUFVM0MsaUVBQTZEO0FBRzdELDBFQUFzRTtBQUN0RSxvRkFBZ0Y7QUFXaEY7SUFhSSwwQkFBMkIsUUFBa0IsRUFBVSxrQkFBcUMsRUFBVSx1QkFBK0M7UUFBMUgsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQUFVLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBbUI7UUFBVSw0QkFBdUIsR0FBdkIsdUJBQXVCLENBQXdCO1FBUHJKLGdCQUFXLEdBQXVCLEVBQUUsQ0FBQztRQUNyQyxTQUFJLEdBQVcsb0JBQW9CLENBQUM7UUFFN0IsYUFBUSxHQUFnQixTQUFTLENBQUM7UUFLckMsSUFBSSxDQUFDLEtBQUssR0FBRztZQUNULFdBQVcsRUFBRSxFQUFFO1lBQ2YsVUFBVSxFQUFFLEVBQUU7WUFDZCxPQUFPLEVBQUUsRUFBRTtZQUNYLFVBQVUsRUFBRSxFQUFFO1NBQ2pCLENBQUE7SUFDTCxDQUFDO0lBRUQsMENBQWUsR0FBZjtRQUNJLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztJQUMzQixDQUFDO0lBRVEsbUNBQVEsR0FBZjtJQUVBLENBQUM7SUFDSyxtQ0FBUSxHQUFmO1FBQ0ksK0ZBQStGO1FBQy9GLDRFQUE0RTtRQUM1RSw0QkFBNEI7UUFDNUIsV0FBVztRQUNYLHVEQUF1RDtRQUN2RCxJQUFJO1FBRUosT0FBTyxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsQ0FBRSxDQUFDO1FBRW5DLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO0lBQ3BFLENBQUM7SUFFRCxzQ0FBVyxHQUFYO1FBQ0ksNENBQTRDO1FBQzVDLE9BQU8sQ0FBQyxHQUFHLENBQUMsMkJBQTJCLENBQUMsQ0FBQztJ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Q0FBYyxHQUFkLFVBQWUsVUFBNEI7UUFDdkMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLEdBQUcsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBRzVDLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxzQkFBc0IsQ0FBQyxVQUFVLENBQUMsQ0FBQyxTQUFTLENBQ3JFLFVBQUEsSUFBSTtZQUNILE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBWSxHQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUUsQ0FBQztRQUl4RCxDQUFDLEVBQ0QsVUFBQSxHQUFHO1lBQ0YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUVmLENBQUMsQ0FDTCxDQUFDO0lBQ1YsQ0FBQztJQXRJUSxnQkFBZ0I7UUFQNUIsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixRQUFRLEVBQUUsWUFBWTtZQUN0QixXQUFXLEVBQUUsd0JBQXdCO1lBQ3JDLFNBQVMsRUFBRSxDQUFDLHlCQUF5QixDQUFDO1NBQ3pDLENBQUM7eUNBZXVDLGlCQUFRLEVBQTZCLHdDQUFrQixFQUFrQyxrREFBdUI7T0FiNUksZ0JBQWdCLENBeUk1QjtJQUFELHVCQUFDO0NBQUEsQUF6SUQsSUF5SUM7QUF6SVksNENBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LE9uSW5pdCxBZnRlclZpZXdJbml0IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgTG9jYXRpb24gfSBmcm9tIFwiQGFuZ3VsYXIvY29tbW9uXCI7XHJcbmltcG9ydCB7IFNuYWNrQmFyIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1zbmFja2JhclwiO1xyXG5pbXBvcnQgKiBhcyBBcHBsaWNhdGlvblNldHRpbmdzIGZyb20gXCJhcHBsaWNhdGlvbi1zZXR0aW5nc1wiO1xyXG5pbXBvcnQgeyBjb25uZWN0aW9uVHlwZSwgZ2V0Q29ubmVjdGlvblR5cGUgfSBmcm9tIFwiY29ubmVjdGl2aXR5XCI7XHJcbmltcG9ydCB7IEFuaW1hdGlvbiB9IGZyb20gXCJ1aS9hbmltYXRpb25cIjtcclxuaW1wb3J0IHsgVmlldyB9IGZyb20gXCJ1aS9jb3JlL3ZpZXdcIjtcclxuaW1wb3J0IHsgcHJvbXB0IH0gZnJvbSBcInVpL2RpYWxvZ3NcIjtcclxuaW1wb3J0IHsgUGFnZSB9IGZyb20gXCJ1aS9wYWdlXCI7XHJcbmltcG9ydCB7IFRleHRGaWVsZCB9IGZyb20gXCJ1aS90ZXh0LWZpZWxkXCI7XHJcblxyXG5pbXBvcnQgeyBWYWx1ZUxpc3QsIERyb3BEb3duIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1kcm9wLWRvd25cIjtcclxuaW1wb3J0IHsgU2VsZWN0ZWRJbmRleENoYW5nZWRFdmVudERhdGEgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWRyb3AtZG93blwiO1xyXG5pbXBvcnQgeyBDb29wZXJhdGl2ZSB9IGZyb20gJy4uLy4uL21vZGVscy9pbmRleCc7XHJcbmltcG9ydCB7Q29vcGVyYXRpdmVTZXJ2aWNlfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvY29vcGVyYXRpdmUuc2VydmljZVwiO1xyXG5pbXBvcnQge0Nvb3BlcmF0aXZlU3RhZmZTZXJ2aWNlfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvY29vcGVyYXRpdmVTdGFmZi5zZXJ2aWNlXCI7XHJcblxyXG5pbXBvcnQge0Nvb3BlcmF0aXZlU3RhZmYsVmVyaWZ5QXV0aH0gZnJvbSBcIi4uLy4uL21vZGVscy9pbmRleFwiO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxyXG4gICAgc2VsZWN0b3I6IFwibnMtcGF5bWVudFwiLFxyXG4gICAgdGVtcGxhdGVVcmw6IFwicGF5bWVudC5jb21wb25lbnQuaHRtbFwiLFxyXG4gICAgc3R5bGVVcmxzOiBbXCIuL3BheW1lbnQuY29tcG9uZW50LmNzc1wiXSxcclxufSlcclxuXHJcbmV4cG9ydCBjbGFzcyBQYXltZW50Q29tcG9uZW50IHtcclxuXHJcbiAgICBwdWJsaWMgaW5wdXQ6IGFueTtcclxuICAgIHNlbGVjdGVkQ29vcGVyYXRpdmVJbmRleDogbnVtYmVyIDtcclxuICAgIHNlbGVjdGVkQ29vcGVyYXRpdmUgOiBzdHJpbmc7XHJcbiAgICBzdGFmZklkOiBTdHJpbmc7XHJcbiAgICBjb29wZXJhdGl2ZTogQXJyYXk8Q29vcGVyYXRpdmU+ID0gW107XHJcbiAgICBoaW50OiBzdHJpbmcgPSBcIlNlbGVjdCBDb29wZXJhdGl2ZVwiO1xyXG4gICAgcHVibGljIGNvb3BlcmF0aXZlTGlzdDogVmFsdWVMaXN0PHN0cmluZz47XHJcbiAgICBwdWJsaWMgY3NzQ2xhc3M6IHN0cmluZyAgICAgID0gXCJkZWZhdWx0XCI7XHJcbiAgICBjb29wZXJhdGl2ZVN0YWZmOiBDb29wZXJhdGl2ZVN0YWZmO1xyXG4gICAgdmVyaWZ5QXV0aDogVmVyaWZ5QXV0aDtcclxuXHJcbiAgICBwdWJsaWMgY29uc3RydWN0b3IocHJpdmF0ZSBsb2NhdGlvbjogTG9jYXRpb24sIHByaXZhdGUgY29vcGVyYXRpdmVTZXJ2aWNlOkNvb3BlcmF0aXZlU2VydmljZSwgcHJpdmF0ZSBjb29wZXJhdGl2ZVN0YWZmU2VydmljZTpDb29wZXJhdGl2ZVN0YWZmU2VydmljZSkge1xyXG4gICAgICAgIHRoaXMuaW5wdXQgPSB7XHJcbiAgICAgICAgICAgIFwiZmlyc3RuYW1lXCI6IFwiXCIsXHJcbiAgICAgICAgICAgIFwibGFzdG5hbWVcIjogXCJcIixcclxuICAgICAgICAgICAgXCJlbWFpbFwiOiBcIlwiLFxyXG4gICAgICAgICAgICBcInBhc3N3b3JkXCI6IFwiXCJcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgbmdBZnRlclZpZXdJbml0KCkge1xyXG4gICAgICAgIHRoaXMuZ2V0Q29vcGVyYXRpdmUoKTtcclxuICAgfVxyXG4gICBcclxuICAgICBwdWJsaWMgbmdPbkluaXQoKSB7XHJcblxyXG4gICAgIH1cclxuICAgIHB1YmxpYyByZWdpc3RlcigpIHtcclxuICAgICAgICAvLyBpZih0aGlzLmlucHV0LmZpcnN0bmFtZSAmJiB0aGlzLmlucHV0Lmxhc3RuYW1lICYmIHRoaXMuaW5wdXQuZW1haWwgJiYgdGhpcy5pbnB1dC5wYXNzd29yZCkge1xyXG4gICAgICAgIC8vICAgICBBcHBsaWNhdGlvblNldHRpbmdzLnNldFN0cmluZyhcImFjY291bnRcIiwgSlNPTi5zdHJpbmdpZnkodGhpcy5pbnB1dCkpO1xyXG4gICAgICAgIC8vICAgICB0aGlzLmxvY2F0aW9uLmJhY2soKTtcclxuICAgICAgICAvLyB9IGVsc2Uge1xyXG4gICAgICAgIC8vICAgICAobmV3IFNuYWNrQmFyKCkpLnNpbXBsZShcIkFsbCBGaWVsZHMgUmVxdWlyZWQhXCIpO1xyXG4gICAgICAgIC8vIH1cclxuXHJcbiAgICAgICAgY29uc29sZS5sb2coXCJSZWFjaGluZyBSZWdpc3RlciBcIiApO1xyXG5cclxuICAgICAgICB0aGlzLmdldENvb3BlcmF0aXZlU3RhZmYodGhpcy5zdGFmZklkLHRoaXMuc2VsZWN0ZWRDb29wZXJhdGl2ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgb25OYXZCdG5UYXAoKXtcclxuICAgICAgICAvLyBUaGlzIGNvZGUgd2lsbCBiZSBjYWxsZWQgb25seSBpbiBBbmRyb2lkLlxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiTmF2aWdhdGlvbiBidXR0b24gdGFwcGVkIVwiKTtcclxuICAgIH1cclxuXHJcbiAgICBwYXkoKXtcclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ29CYWNrKCkge1xyXG4gICAgICAgIHRoaXMubG9jYXRpb24uYmFjaygpO1xyXG4gICAgfVxyXG4gICAgc3RhcnRCYWNrZ3JvdW5kQW5pbWF0aW9uKGJhY2tncm91bmQpIHtcclxuICAgICAgICBiYWNrZ3JvdW5kLmFuaW1hdGUoe1xyXG4gICAgICAgICAgc2NhbGU6IHsgeDogMS4wLCB5OiAxLjAgfSxcclxuICAgICAgICAgIGR1cmF0aW9uOiAxMDAwMFxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBwdWJsaWMgb25jb29wZXJhdGl2ZWNoYW5nZShhcmdzOiBTZWxlY3RlZEluZGV4Q2hhbmdlZEV2ZW50RGF0YSkge1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGBEcm9wIERvd24gc2VsZWN0ZWQgaW5kZXggY2hhbmdlZCAgJHthcmdzLm9sZEluZGV4fSB0byAke2FyZ3MubmV3SW5kZXh9LiBOZXcgdmFsdWUgaXMgXCIke3RoaXMuc2Vzc2lvbml0ZW1zLmdldFZhbHVlKFxyXG4gICAgICAgIC8vICAgICBhcmdzLm5ld0luZGV4KX1cImApO1xyXG4gICAgICBcclxuICAgICAgICBjb25zb2xlLmxvZyhcIlNlbGVjdGVkIElEIFwiICsgYXJncy5uZXdJbmRleCApO1xyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkQ29vcGVyYXRpdmUgPSB0aGlzLmNvb3BlcmF0aXZlTGlzdC5nZXRWYWx1ZShhcmdzLm5ld0luZGV4KTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJTZWxlY3RlZCBJZCBWYWx1ZSAgXCIgKyAgdGhpcy5zZWxlY3RlZENvb3BlcmF0aXZlICk7XHJcbiAgICAgICAgICAgXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGdldENvb3BlcmF0aXZlKCl7XHJcbiAgICAgICAgdGhpcy5jb29wZXJhdGl2ZVNlcnZpY2UuZ2V0QWxsQ29vcGVyYXRpdmUoKS5zdWJzY3JpYmUoXHJcbiAgICAgICAgICAgIGRhdGEgPT4geyBcclxuICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQ29vcGVyYXRpdmUgTGlzdCBcIisgSlNPTi5zdHJpbmdpZnkoZGF0YVtcImRhdGFcIl0pICk7XHJcbiAgICAgICBcclxuICAgICAgICAgICAgIHRoaXMuY29vcGVyYXRpdmUgPSBkYXRhW1wiZGF0YVwiXTtcclxuXHJcbiAgICAgICAgICAgICB0aGlzLmNvb3BlcmF0aXZlTGlzdCA9IG5ldyBWYWx1ZUxpc3Q8c3RyaW5nPigpO1xyXG4gICAgICAgICAgICAgZm9yICggbGV0IGxvb3AgPSAwOyBsb29wIDwgdGhpcy5jb29wZXJhdGl2ZS5sZW5ndGg7IGxvb3ArKyApIHtcclxuICAgICAgICAgICAgICAgdGhpcy5jb29wZXJhdGl2ZUxpc3QucHVzaCh7IHZhbHVlOiAgIGAke3RoaXMuY29vcGVyYXRpdmVbbG9vcF0uY29vcGVyYXRpdmVJZH1gLFxyXG4gICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiBgJHt0aGlzLmNvb3BlcmF0aXZlW2xvb3BdLmZpcnN0X25hbWV9YCxcclxuICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgIH1cclxuICAgICAgICAgXHJcbiAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgZXJyID0+IHtcclxuICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcclxuICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICk7XHQgIFxyXG4gICAgfVxyXG5cclxuICAgIGdldENvb3BlcmF0aXZlU3RhZmYoc3RhZmZJZDpTdHJpbmcsY29vcGVyYXRpdmVJZDpTdHJpbmcpe1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiU3RhZmYgYW5kIENvb3BlcmF0aXZlSWQgXCIrICBzdGFmZklkICsgXCIgLSBcIiArIGNvb3BlcmF0aXZlSWQpO1xyXG4gICAgICAgXHJcblxyXG4gICAgICAgIHRoaXMuY29vcGVyYXRpdmVTdGFmZlNlcnZpY2UuZ2V0Q29vcGVyYXRpdmVTdGFmZihzdGFmZklkLGNvb3BlcmF0aXZlSWQpLnN1YnNjcmliZShcclxuICAgICAgICAgICAgZGF0YSA9PiB7IFxyXG4gICAgICAgICAgICAgY29uc29sZS5sb2coXCJDb29wZXJhdGl2ZSBTdGFmZiBcIisgSlNPTi5zdHJpbmdpZnkoZGF0YVtcImRhdGFcIl0pICk7XHJcbiAgICAgICBcclxuICAgICAgICAgICAgIHRoaXMuY29vcGVyYXRpdmVTdGFmZiA9IGRhdGFbXCJkYXRhXCJdO1xyXG5cclxuICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiVmVyaWZ5aW5nIFN0YWZmIG91dCBzaWRlIFwiICsgdGhpcy5jb29wZXJhdGl2ZVN0YWZmLnN0YWZmSWQpO1xyXG4gICAgICAgICAgICAgdGhpcy5zZW5kVmVyaWZ5QXV0aCh0aGlzLmNvb3BlcmF0aXZlU3RhZmYpO1xyXG5cclxuICAgICAgICAgIFxyXG4gICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICBlcnIgPT4ge1xyXG4gICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xyXG4gICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgKTtcdCAgXHJcbiAgICB9XHJcblxyXG4gICAgc2VuZFZlcmlmeUF1dGgodmVyaWZ5QXV0aDogQ29vcGVyYXRpdmVTdGFmZil7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJWZXJpZnkgXCIrICB2ZXJpZnlBdXRoLnN0YWZmSWQpO1xyXG4gICAgICAgXHJcblxyXG4gICAgICAgIHRoaXMuY29vcGVyYXRpdmVTdGFmZlNlcnZpY2UudmVyaWZ5QXV0aFRvQ3JlYXRMYXRlcih2ZXJpZnlBdXRoKS5zdWJzY3JpYmUoXHJcbiAgICAgICAgICAgIGRhdGEgPT4geyBcclxuICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiVmVyeSBBdXRoIFwiKyBKU09OLnN0cmluZ2lmeShkYXRhW1wiZGF0YVwiXSkgKTtcclxuICAgICAgIFxyXG4gICAgICAgICAgICAgXHJcblxyXG4gICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgZXJyID0+IHtcclxuICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcclxuICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICk7XHQgIFxyXG4gICAgfVxyXG4gICAgICBcclxuXHJcbn0iXX0=