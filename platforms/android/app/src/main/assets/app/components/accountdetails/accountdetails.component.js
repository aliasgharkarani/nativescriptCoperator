"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var nativescript_drop_down_1 = require("nativescript-drop-down");
var cooperative_service_1 = require("../../services/cooperative.service");
var cooperativeStaff_service_1 = require("../../services/cooperativeStaff.service");
var bank_service_1 = require("../../services/bank.service");
var member_service_1 = require("../../services/member.service");
var nativescript_fancyalert_1 = require("nativescript-fancyalert");
var LS = require("nativescript-localstorage");
var router_1 = require("@angular/router");
var AccountDetailsComponent = /** @class */ (function () {
    function AccountDetailsComponent(location, cooperativeService, cooperativeStaffService, bankService, memberService, router, activatedRoute) {
        this.location = location;
        this.cooperativeService = cooperativeService;
        this.cooperativeStaffService = cooperativeStaffService;
        this.bankService = bankService;
        this.memberService = memberService;
        this.router = router;
        this.activatedRoute = activatedRoute;
        this.cooperative = [];
        this.hint = " 1";
        this.cssClass = "default";
        this.banks = [];
        this.notification = "You can access your personal offer, updates and price drop here";
    }
    AccountDetailsComponent.prototype.ngAfterViewInit = function () {
        //this.getCooperative();
    };
    AccountDetailsComponent.prototype.ngOnInit = function () {
        var dataObject = JSON.parse(LS.getItem('currentUser'));
        console.log("User ID " + dataObject._id);
        if (dataObject._id) {
            this.userId = dataObject._id;
            this.cooperId = dataObject.cooperId;
        }
        this.getBanks();
    };
    AccountDetailsComponent.prototype.register = function () {
        // if(this.input.firstname && this.input.lastname && this.input.email && this.input.password) {
        //     ApplicationSettings.setString("account", JSON.stringify(this.input));
        //     this.location.back();
        // } else {
        //     (new SnackBar()).simple("All Fields Required!");
        // }
        console.log("Reaching Register ");
    };
    AccountDetailsComponent.prototype.updateAccount = function () {
        this.setAccountDetails(this.userId, this.accountNo, this.accountName, this.selectedBank);
    };
    AccountDetailsComponent.prototype.onNavBtnTap = function () {
        // This code will be called only in Android.
        console.log("Navigation button tapped!");
    };
    AccountDetailsComponent.prototype.goBack = function () {
        this.location.back();
    };
    AccountDetailsComponent.prototype.startBackgroundAnimation = function (background) {
        background.animate({
            scale: { x: 1.0, y: 1.0 },
            duration: 10000
        });
    };
    AccountDetailsComponent.prototype.onBankChange = function (args) {
        // console.log(`Drop Down selected index changed  ${args.oldIndex} to ${args.newIndex}. New value is "${this.sessionitems.getValue(
        //     args.newIndex)}"`);
        console.log("Selected ID " + args.newIndex);
        this.selectedBank = this.bankDrop.getValue(args.newIndex);
        console.log("Selected Id Value  " + this.selectedBank);
    };
    AccountDetailsComponent.prototype.getCooperative = function () {
        var _this = this;
        this.cooperativeService.getAllCooperative().subscribe(function (data) {
            console.log("Cooperative List " + JSON.stringify(data["data"]));
            _this.cooperative = data["data"];
            _this.cooperativeList = new nativescript_drop_down_1.ValueList();
            for (var loop = 0; loop < _this.cooperative.length; loop++) {
                _this.cooperativeList.push({
                    value: "" + _this.cooperative[loop].cooperativeId,
                    display: "" + _this.cooperative[loop].first_name,
                });
            }
        }, function (err) {
            console.log(err);
        });
    };
    AccountDetailsComponent.prototype.getCooperativeStaff = function (staffId, cooperativeId) {
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
    AccountDetailsComponent.prototype.sendVerifyAuth = function (verifyAuth) {
        console.log("Verify " + verifyAuth.staffId);
        this.cooperativeStaffService.verifyAuthToCreatLater(verifyAuth).subscribe(function (data) {
            console.log("Very Auth " + JSON.stringify(data["data"]));
        }, function (err) {
            console.log(err);
        });
    };
    AccountDetailsComponent.prototype.getBanks = function () {
        var _this = this;
        this.bankService.getAllBanks().subscribe(function (data) {
            // console.log("Account Balances from DB " + JSON.stringify(data["data"]));
            _this.banks = data["data"];
            _this.bankDrop = new nativescript_drop_down_1.ValueList();
            for (var loop = 0; loop < _this.banks.length; loop++) {
                _this.bankDrop.push({ value: "" + _this.banks[loop]._id,
                    display: "" + _this.banks[loop].bankName,
                });
            }
            console.log("Banks " + JSON.stringify(_this.bankDrop));
        }, function (err) {
            console.log(JSON.stringify(err));
        });
    };
    AccountDetailsComponent.prototype.setAccountDetails = function (userId, accountnumber, accountname, bankId) {
        var _this = this;
        console.log("Set Pin Id " + userId);
        this.memberService.setAccountDetails(userId, accountnumber, accountname, bankId).subscribe(function (data) {
            console.log("Change Pin " + JSON.stringify(data["data"]));
            //send OTP
            nativescript_fancyalert_1.TNSFancyAlert.showSuccess("Success!", "Account Details was added successfuly", "Ok")
                .then(function () {
                _this.router.navigate(['/']);
            });
        }, function (err) {
            console.log(err);
            nativescript_fancyalert_1.TNSFancyAlert.showError("Error!", err.error.message, "Ok").then(function () {
            });
        });
    };
    AccountDetailsComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: "ns-accountdetails",
            templateUrl: "./accountdetails.component.html",
            styleUrls: ["./accountdetails-common.css", "./accountdetails.component.css"],
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
        }),
        __metadata("design:paramtypes", [common_1.Location, cooperative_service_1.CooperativeService, cooperativeStaff_service_1.CooperativeStaffService,
            bank_service_1.BankService, member_service_1.MemberService, router_1.Router, router_1.ActivatedRoute])
    ], AccountDetailsComponent);
    return AccountDetailsComponent;
}());
exports.AccountDetailsComponent = AccountDetailsComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWNjb3VudGRldGFpbHMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYWNjb3VudGRldGFpbHMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTJGO0FBQzNGLDBDQUEyQztBQWEzQyxpRUFBNkQ7QUFHN0QsMEVBQXdFO0FBQ3hFLG9GQUFrRjtBQUNsRiw0REFBMEQ7QUFFMUQsZ0VBQThEO0FBRTlELG1FQUF3RDtBQUd4RCxJQUFJLEVBQUUsR0FBRyxPQUFPLENBQUUsMkJBQTJCLENBQUUsQ0FBQztBQUVoRCwwQ0FBeUQ7QUFZekQ7SUF3QkksaUNBQTJCLFFBQWtCLEVBQVUsa0JBQXNDLEVBQVUsdUJBQWdELEVBQy9JLFdBQXVCLEVBQVUsYUFBNEIsRUFBUyxNQUFjLEVBQVUsY0FBOEI7UUFEekcsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQUFVLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBb0I7UUFBVSw0QkFBdUIsR0FBdkIsdUJBQXVCLENBQXlCO1FBQy9JLGdCQUFXLEdBQVgsV0FBVyxDQUFZO1FBQVUsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFBUyxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQVUsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBbkJwSSxnQkFBVyxHQUF1QixFQUFFLENBQUM7UUFDckMsU0FBSSxHQUFXLElBQUksQ0FBQztRQUViLGFBQVEsR0FBVyxTQUFTLENBQUM7UUFLcEMsVUFBSyxHQUFnQixFQUFFLENBQUM7UUFNdkIsaUJBQVksR0FBVyxpRUFBaUUsQ0FBQztJQU8xRixDQUFDO0lBRUQsaURBQWUsR0FBZjtRQUNJLHdCQUF3QjtJQUU1QixDQUFDO0lBRU0sMENBQVEsR0FBZjtRQUNJLElBQUksVUFBVSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO1FBR3ZELE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxHQUFH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UyxDQUNuRixVQUFBLElBQUk7WUFDSCxPQUFPLENBQUMsR0FBRyxDQUFDLGFBQWEsR0FBRSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFFLENBQUM7WUFFMUQsVUFBVTtZQUdOLHVDQUFhLENBQUMsV0FBVyxDQUFDLFVBQVUsRUFBRSx1Q0FBdUMsRUFBRSxJQUFJLENBQUM7aUJBQ25GLElBQUksQ0FBRTtnQkFDSixLQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFHaEMsQ0FBQyxDQUFDLENBQUM7UUFFTCxDQUFDLEVBQ0QsVUFBQSxHQUFHO1lBQ0YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUVqQix1Q0FBYSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUUsR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUUsSUFBSSxDQUFFO1lBR2xFLENBQUMsQ0FBQyxDQUFDO1FBRUQsQ0FBQyxDQUNMLENBQUM7SUFDVixDQUFDO0lBek5RLHVCQUF1QjtRQVZuQyxnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFFBQVEsRUFBRSxtQkFBbUI7WUFDN0IsV0FBVyxFQUFFLGlDQUFpQztZQUM5QyxTQUFTLEVBQUUsQ0FBQyw2QkFBNkIsRUFBRSxnQ0FBZ0MsQ0FBQztZQUM1RSxlQUFlLEVBQUUsOEJBQXVCLENBQUMsTUFBTTtTQUVsRCxDQUFDO3lDQTJCdUMsaUJBQVEsRUFBOEIsd0NBQWtCLEVBQW1DLGtEQUF1QjtZQUNuSSwwQkFBVyxFQUF5Qiw4QkFBYSxFQUFpQixlQUFNLEVBQTBCLHVCQUFjO09BekIzSCx1QkFBdUIsQ0E4Tm5DO0lBQUQsOEJBQUM7Q0FBQSxBQTlORCxJQThOQztBQTlOWSwwREFBdUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgQWZ0ZXJWaWV3SW5pdCwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kgIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgTG9jYXRpb24gfSBmcm9tIFwiQGFuZ3VsYXIvY29tbW9uXCI7XHJcbmltcG9ydCB7IFNuYWNrQmFyIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1zbmFja2JhclwiO1xyXG5pbXBvcnQgKiBhcyBBcHBsaWNhdGlvblNldHRpbmdzIGZyb20gXCJhcHBsaWNhdGlvbi1zZXR0aW5nc1wiO1xyXG5pbXBvcnQgeyBjb25uZWN0aW9uVHlwZSwgZ2V0Q29ubmVjdGlvblR5cGUgfSBmcm9tIFwiY29ubmVjdGl2aXR5XCI7XHJcbmltcG9ydCB7IEFuaW1hdGlvbiB9IGZyb20gXCJ1aS9hbmltYXRpb25cIjtcclxuaW1wb3J0IHsgVmlldyB9IGZyb20gXCJ1aS9jb3JlL3ZpZXdcIjtcclxuaW1wb3J0IHsgcHJvbXB0IH0gZnJvbSBcInVpL2RpYWxvZ3NcIjtcclxuaW1wb3J0IHsgUGFnZSB9IGZyb20gXCJ1aS9wYWdlXCI7XHJcbmltcG9ydCB7IFRleHRGaWVsZCB9IGZyb20gXCJ1aS90ZXh0LWZpZWxkXCI7XHJcbmltcG9ydCAqIGFzIHRleHRWaWV3TW9kdWxlIGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL3RleHQtdmlld1wiO1xyXG4gIFxyXG5cclxuXHJcbmltcG9ydCB7IFZhbHVlTGlzdCwgRHJvcERvd24gfSBmcm9tIFwibmF0aXZlc2NyaXB0LWRyb3AtZG93blwiO1xyXG5pbXBvcnQgeyBTZWxlY3RlZEluZGV4Q2hhbmdlZEV2ZW50RGF0YSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtZHJvcC1kb3duXCI7XHJcbmltcG9ydCB7IENvb3BlcmF0aXZlIH0gZnJvbSAnLi4vLi4vbW9kZWxzL2luZGV4JztcclxuaW1wb3J0IHsgQ29vcGVyYXRpdmVTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL2Nvb3BlcmF0aXZlLnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgQ29vcGVyYXRpdmVTdGFmZlNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvY29vcGVyYXRpdmVTdGFmZi5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IEJhbmtTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL2Jhbmsuc2VydmljZVwiO1xyXG5cclxuaW1wb3J0IHsgTWVtYmVyU2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9tZW1iZXIuc2VydmljZVwiO1xyXG5cclxuaW1wb3J0IHsgVE5TRmFuY3lBbGVydCB9IGZyb20gXCJuYXRpdmVzY3JpcHQtZmFuY3lhbGVydFwiO1xyXG5cclxuaW1wb3J0IHsgQ29vcGVyYXRpdmVTdGFmZiwgVmVyaWZ5QXV0aCxCYW5rIH0gZnJvbSBcIi4uLy4uL21vZGVscy9pbmRleFwiO1xyXG5sZXQgTFMgPSByZXF1aXJlKCBcIm5hdGl2ZXNjcmlwdC1sb2NhbHN0b3JhZ2VcIiApO1xyXG5cclxuaW1wb3J0IHsgUm91dGVyLCBBY3RpdmF0ZWRSb3V0ZSB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcclxuICAgIHNlbGVjdG9yOiBcIm5zLWFjY291bnRkZXRhaWxzXCIsXHJcbiAgICB0ZW1wbGF0ZVVybDogXCIuL2FjY291bnRkZXRhaWxzLmNvbXBvbmVudC5odG1sXCIsXHJcbiAgICBzdHlsZVVybHM6IFtcIi4vYWNjb3VudGRldGFpbHMtY29tbW9uLmNzc1wiLCBcIi4vYWNjb3VudGRldGFpbHMuY29tcG9uZW50LmNzc1wiXSxcclxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxyXG4gIFxyXG59KVxyXG5cclxuXHJcbmV4cG9ydCBjbGFzcyBBY2NvdW50RGV0YWlsc0NvbXBvbmVudCB7XHJcblxyXG4gICAgcHVibGljIGlucHV0OiBhbnk7XHJcbiAgICBzZWxlY3RlZEJhbmtJbmRleDogbnVtYmVyO1xyXG4gICAgc2VsZWN0ZWRCYW5rOiBzdHJpbmc7XHJcbiAgICBzdGFmZklkOiBTdHJpbmc7XHJcbiAgICBjb29wZXJhdGl2ZTogQXJyYXk8Q29vcGVyYXRpdmU+ID0gW107XHJcbiAgICBoaW50OiBzdHJpbmcgPSBcIiAxXCI7XHJcbiAgICBwdWJsaWMgY29vcGVyYXRpdmVMaXN0OiBWYWx1ZUxpc3Q8c3RyaW5nPjtcclxuICAgIHB1YmxpYyBjc3NDbGFzczogc3RyaW5nID0gXCJkZWZhdWx0XCI7XHJcbiAgICBjb29wZXJhdGl2ZVN0YWZmOiBDb29wZXJhdGl2ZVN0YWZmO1xyXG4gICAgdmVyaWZ5QXV0aDogVmVyaWZ5QXV0aDtcclxuICAgIGFjY291bnROYW1lOiBTdHJpbmc7XHJcbiAgICBhY2NvdW50Tm86IFN0cmluZztcclxuICAgIGJhbmtzOiBBcnJheTxCYW5rPiA9IFtdO1xyXG4gICAgcHVibGljIGJhbmtEcm9wOiBWYWx1ZUxpc3Q8c3RyaW5nPjtcclxuXHJcbiAgICB1c2VySWQ6IFN0cmluZztcclxuICAgIGNvb3BlcklkOiBTdHJpbmc7XHJcblxyXG4gICAgIG5vdGlmaWNhdGlvbjogU3RyaW5nID0gXCJZb3UgY2FuIGFjY2VzcyB5b3VyIHBlcnNvbmFsIG9mZmVyLCB1cGRhdGVzIGFuZCBwcmljZSBkcm9wIGhlcmVcIjtcclxuXHJcblxyXG4gICAgIFxyXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKHByaXZhdGUgbG9jYXRpb246IExvY2F0aW9uLCBwcml2YXRlIGNvb3BlcmF0aXZlU2VydmljZTogQ29vcGVyYXRpdmVTZXJ2aWNlLCBwcml2YXRlIGNvb3BlcmF0aXZlU3RhZmZTZXJ2aWNlOiBDb29wZXJhdGl2ZVN0YWZmU2VydmljZSxcclxuICAgIHByaXZhdGUgYmFua1NlcnZpY2U6QmFua1NlcnZpY2UsIHByaXZhdGUgbWVtYmVyU2VydmljZTogTWVtYmVyU2VydmljZSxwcml2YXRlIHJvdXRlcjogUm91dGVyLCBwcml2YXRlIGFjdGl2YXRlZFJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSkge1xyXG4gICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgbmdBZnRlclZpZXdJbml0KCkge1xyXG4gICAgICAgIC8vdGhpcy5nZXRDb29wZXJhdGl2ZSgpO1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBuZ09uSW5pdCgpIHtcclxuICAgICAgICB2YXIgZGF0YU9iamVjdCA9IEpTT04ucGFyc2UoTFMuZ2V0SXRlbSgnY3VycmVudFVzZXInKSk7XHJcblxyXG4gICAgICAgXHJcbiAgICAgICAgY29uc29sZS5sb2coXCJVc2VyIElEIFwiICsgZGF0YU9iamVjdC5faWQpO1xyXG4gICAgICAgICAgaWYoZGF0YU9iamVjdC5faWQpXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgdGhpcy51c2VySWQgPSBkYXRhT2JqZWN0Ll9pZDtcclxuICAgICAgICAgICAgICB0aGlzLmNvb3BlcklkID0gZGF0YU9iamVjdC5jb29wZXJJZDtcclxuICAgICAgICAgICAgIFxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgdGhpcy5nZXRCYW5rcygpO1xyXG4gICAgfVxyXG4gICAgcHVibGljIHJlZ2lzdGVyKCkge1xyXG4gICAgICAgIC8vIGlmKHRoaXMuaW5wdXQuZmlyc3RuYW1lICYmIHRoaXMuaW5wdXQubGFzdG5hbWUgJiYgdGhpcy5pbnB1dC5lbWFpbCAmJiB0aGlzLmlucHV0LnBhc3N3b3JkKSB7XHJcbiAgICAgICAgLy8gICAgIEFwcGxpY2F0aW9uU2V0dGluZ3Muc2V0U3RyaW5nKFwiYWNjb3VudFwiLCBKU09OLnN0cmluZ2lmeSh0aGlzLmlucHV0KSk7XHJcbiAgICAgICAgLy8gICAgIHRoaXMubG9jYXRpb24uYmFjaygpO1xyXG4gICAgICAgIC8vIH0gZWxzZSB7XHJcbiAgICAgICAgLy8gICAgIChuZXcgU25hY2tCYXIoKSkuc2ltcGxlKFwiQWxsIEZpZWxkcyBSZXF1aXJlZCFcIik7XHJcbiAgICAgICAgLy8gfVxyXG5cclxuICAgICAgICBjb25zb2xlLmxvZyhcIlJlYWNoaW5nIFJlZ2lzdGVyIFwiKTtcclxuXHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlQWNjb3VudCgpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5zZXRBY2NvdW50RGV0YWlscyh0aGlzLnVzZXJJZCx0aGlzLmFjY291bnRObyx0aGlzLmFjY291bnROYW1lLHRoaXMuc2VsZWN0ZWRCYW5rKTtcclxuICAgIH1cclxuICAgIG9uTmF2QnRuVGFwKCkge1xyXG4gICAgICAgIC8vIFRoaXMgY29kZSB3aWxsIGJlIGNhbGxlZCBvbmx5IGluIEFuZHJvaWQuXHJcbiAgICAgICAgY29uc29sZS5sb2coXCJOYXZpZ2F0aW9uIGJ1dHRvbiB0YXBwZWQhXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnb0JhY2soKSB7XHJcbiAgICAgICAgdGhpcy5sb2NhdGlvbi5iYWNrKCk7XHJcbiAgICB9XHJcbiAgICBzdGFydEJhY2tncm91bmRBbmltYXRpb24oYmFja2dyb3VuZCkge1xyXG4gICAgICAgIGJhY2tncm91bmQuYW5pbWF0ZSh7XHJcbiAgICAgICAgICAgIHNjYWxlOiB7IHg6IDEuMCwgeTogMS4wIH0sXHJcbiAgICAgICAgICAgIGR1cmF0aW9uOiAxMDAwMFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBvbkJhbmtDaGFuZ2UoYXJnczogU2VsZWN0ZWRJbmRleENoYW5nZWRFdmVudERhdGEpIHtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhgRHJvcCBEb3duIHNlbGVjdGVkIGluZGV4IGNoYW5nZWQgICR7YXJncy5vbGRJbmRleH0gdG8gJHthcmdzLm5ld0luZGV4fS4gTmV3IHZhbHVlIGlzIFwiJHt0aGlzLnNlc3Npb25pdGVtcy5nZXRWYWx1ZShcclxuICAgICAgICAvLyAgICAgYXJncy5uZXdJbmRleCl9XCJgKTtcclxuXHJcbiAgICAgICAgY29uc29sZS5sb2coXCJTZWxlY3RlZCBJRCBcIiArIGFyZ3MubmV3SW5kZXgpO1xyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRCYW5rID0gdGhpcy5iYW5rRHJvcC5nZXRWYWx1ZShhcmdzLm5ld0luZGV4KTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIlNlbGVjdGVkIElkIFZhbHVlICBcIiArIHRoaXMuc2VsZWN0ZWRCYW5rKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0Q29vcGVyYXRpdmUoKSB7XHJcbiAgICAgICAgdGhpcy5jb29wZXJhdGl2ZVNlcnZpY2UuZ2V0QWxsQ29vcGVyYXRpdmUoKS5zdWJzY3JpYmUoXHJcbiAgICAgICAgICAgIGRhdGEgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJDb29wZXJhdGl2ZSBMaXN0IFwiICsgSlNPTi5zdHJpbmdpZnkoZGF0YVtcImRhdGFcIl0pKTtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvb3BlcmF0aXZlID0gZGF0YVtcImRhdGFcIl07XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5jb29wZXJhdGl2ZUxpc3QgPSBuZXcgVmFsdWVMaXN0PHN0cmluZz4oKTtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGxvb3AgPSAwOyBsb29wIDwgdGhpcy5jb29wZXJhdGl2ZS5sZW5ndGg7IGxvb3ArKykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29vcGVyYXRpdmVMaXN0LnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogYCR7dGhpcy5jb29wZXJhdGl2ZVtsb29wXS5jb29wZXJhdGl2ZUlkfWAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6IGAke3RoaXMuY29vcGVyYXRpdmVbbG9vcF0uZmlyc3RfbmFtZX1gLFxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuXHJcblxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBlcnIgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIGdldENvb3BlcmF0aXZlU3RhZmYoc3RhZmZJZDogU3RyaW5nLCBjb29wZXJhdGl2ZUlkOiBTdHJpbmcpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIlN0YWZmIGFuZCBDb29wZXJhdGl2ZUlkIFwiICsgc3RhZmZJZCArIFwiIC0gXCIgKyBjb29wZXJhdGl2ZUlkKTtcclxuXHJcblxyXG4gICAgICAgIHRoaXMuY29vcGVyYXRpdmVTdGFmZlNlcnZpY2UuZ2V0Q29vcGVyYXRpdmVTdGFmZihzdGFmZklkLCBjb29wZXJhdGl2ZUlkKS5zdWJzY3JpYmUoXHJcbiAgICAgICAgICAgIGRhdGEgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJDb29wZXJhdGl2ZSBTdGFmZiBcIiArIEpTT04uc3RyaW5naWZ5KGRhdGFbXCJkYXRhXCJdKSk7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5jb29wZXJhdGl2ZVN0YWZmID0gZGF0YVtcImRhdGFcIl07XHJcblxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJWZXJpZnlpbmcgU3RhZmYgb3V0IHNpZGUgXCIgKyB0aGlzLmNvb3BlcmF0aXZlU3RhZmYuc3RhZmZJZCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlbmRWZXJpZnlBdXRoKHRoaXMuY29vcGVyYXRpdmVTdGFmZik7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGVyciA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgc2VuZFZlcmlmeUF1dGgodmVyaWZ5QXV0aDogQ29vcGVyYXRpdmVTdGFmZikge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiVmVyaWZ5IFwiICsgdmVyaWZ5QXV0aC5zdGFmZklkKTtcclxuXHJcblxyXG4gICAgICAgIHRoaXMuY29vcGVyYXRpdmVTdGFmZlNlcnZpY2UudmVyaWZ5QXV0aFRvQ3JlYXRMYXRlcih2ZXJpZnlBdXRoKS5zdWJzY3JpYmUoXHJcbiAgICAgICAgICAgIGRhdGEgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJWZXJ5IEF1dGggXCIgKyBKU09OLnN0cmluZ2lmeShkYXRhW1wiZGF0YVwiXSkpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBlcnIgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBcclxuICAgIGdldEJhbmtzKCApe1xyXG4gICAgICAgXHJcbiAgICBcclxuXHJcbiAgICAgICAgdGhpcy5iYW5rU2VydmljZS5nZXRBbGxCYW5rcygpLnN1YnNjcmliZShcclxuICAgICAgICAgICAgZGF0YSA9PiB7IFxyXG4gICAgXHJcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIkFjY291bnQgQmFsYW5jZXMgZnJvbSBEQiBcIiArIEpTT04uc3RyaW5naWZ5KGRhdGFbXCJkYXRhXCJdKSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJhbmtzID0gZGF0YVtcImRhdGFcIl07XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5iYW5rRHJvcCA9IG5ldyBWYWx1ZUxpc3Q8c3RyaW5nPigpO1xyXG4gICAgICAgICAgICAgICAgZm9yICggbGV0IGxvb3AgPSAwOyBsb29wIDwgdGhpcy5iYW5rcy5sZW5ndGg7IGxvb3ArKyApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYmFua0Ryb3AucHVzaCh7IHZhbHVlOiAgIGAke3RoaXMuYmFua3NbbG9vcF0uX2lkfWAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6IGAke3RoaXMuYmFua3NbbG9vcF0uYmFua05hbWV9YCxcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICBcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQmFua3MgXCIgKyBKU09OLnN0cmluZ2lmeSh0aGlzLmJhbmtEcm9wKSk7XHJcbiAgICAgICAgICAgICBcclxuICAgICAgIFxyXG4gICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICBlcnIgPT4ge1xyXG4gICAgICAgICAgICAgICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShlcnIpKTtcclxuICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICApO1x0ICBcclxuICAgIH1cclxuXHJcblxyXG4gICAgc2V0QWNjb3VudERldGFpbHModXNlcklkOlN0cmluZywgYWNjb3VudG51bWJlcjogU3RyaW5nLCBhY2NvdW50bmFtZTpTdHJpbmcsIGJhbmtJZDogU3RyaW5nKXtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIlNldCBQaW4gSWQgXCIrICB1c2VySWQpO1xyXG4gICAgICAgXHJcblxyXG4gICAgICAgIHRoaXMubWVtYmVyU2VydmljZS5zZXRBY2NvdW50RGV0YWlscyh1c2VySWQsYWNjb3VudG51bWJlcixhY2NvdW50bmFtZSxiYW5rSWQpLnN1YnNjcmliZShcclxuICAgICAgICAgICAgZGF0YSA9PiB7IFxyXG4gICAgICAgICAgICAgY29uc29sZS5sb2coXCJDaGFuZ2UgUGluIFwiKyBKU09OLnN0cmluZ2lmeShkYXRhW1wiZGF0YVwiXSkgKTtcclxuXHJcbiAgICAgICAgICAgICAvL3NlbmQgT1RQXHJcbiAgICAgICAgICAgICAgIFxyXG5cclxuICAgICAgICAgICAgICAgICBUTlNGYW5jeUFsZXJ0LnNob3dTdWNjZXNzKFwiU3VjY2VzcyFcIiwgXCJBY2NvdW50IERldGFpbHMgd2FzIGFkZGVkIHN1Y2Nlc3NmdWx5XCIsIFwiT2tcIilcclxuICAgICAgICAgICAgICAgICAudGhlbiggKCkgPT4geyAvKiB1c2VyIHByZXNzZWQgdGhlIGJ1dHRvbiAqLyBcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy8nXSk7XHJcblxyXG5cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgIGVyciA9PiB7XHJcbiAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XHJcblxyXG4gICAgICAgICAgICAgICBUTlNGYW5jeUFsZXJ0LnNob3dFcnJvcihcIkVycm9yIVwiLCBlcnIuZXJyb3IubWVzc2FnZSwgXCJPa1wiKSAudGhlbiggKCkgPT4geyAvKiB1c2VyIHByZXNzZWQgdGhlIGJ1dHRvbiAqL1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICk7XHQgIFxyXG4gICAgfVxyXG4gICAgXHJcblxyXG4gICAgXHJcblxyXG59Il19