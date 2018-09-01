"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var router_1 = require("nativescript-angular/router");
var common_1 = require("@angular/common");
var nativescript_bottombar_1 = require("nativescript-bottombar");
var nativescript_drop_down_1 = require("nativescript-drop-down");
var cooperative_service_1 = require("../../services/cooperative.service");
var cooperativeStaff_service_1 = require("../../services/cooperativeStaff.service");
var LS = require("nativescript-localstorage");
var config_1 = require("../../shared/config");
var nativescript_fancyalert_1 = require("nativescript-fancyalert");
var autologout_service_1 = require("../../services/autologout.service");
var MyCartComponent = /** @class */ (function () {
    function MyCartComponent(location, cooperativeService, cooperativeStaffService, formBuilder, autoLogoutService, routerExtensions) {
        this.location = location;
        this.cooperativeService = cooperativeService;
        this.cooperativeStaffService = cooperativeStaffService;
        this.formBuilder = formBuilder;
        this.autoLogoutService = autoLogoutService;
        this.routerExtensions = routerExtensions;
        this.productImageUrl = config_1.Config.productImageURL;
        this.cooperative = [];
        this.hint = " 1";
        this.cssClass = "default";
        this.cartProducts = [];
        this.cartSelectedProducts = [];
        this.totalSelectedAmount = 0;
        this.totalSelectedItem = 0;
        this.isSelectAll = false;
        this.accentColor = "rgb(254, 204, 22)";
        this.notification = "You can access your personal offer, updates and price drop here";
        this.itemsMenu = [
            new nativescript_bottombar_1.BottomBarItem(0, "Cart", "ic_home_black_24dp", "#9A9999")
        ];
    }
    MyCartComponent.prototype.ngAfterViewInit = function () {
        this.getCooperative();
    };
    MyCartComponent.prototype.ngOnInit = function () {
        if (LS.getItem('mycartproducts')) {
            this.cartProducts = [];
            var mycartproducts = LS.getItem('mycartproducts');
            this.cartProducts = mycartproducts;
        }
        this.formGroup = this.formBuilder.group({
            testCheck: [
                {
                    value: true,
                    disabled: false
                },
                [forms_1.Validators.required]
            ]
        });
    };
    MyCartComponent.prototype.tabLoaded = function (event) {
        this._bar = event.object;
        this.hidden = false;
        this.titleState = 0 /* SHOW_WHEN_ACTIVE */;
        this.inactiveColor = "white";
        this.accentColor = "rgb(254, 204, 22)";
    };
    MyCartComponent.prototype.tabSelected = function (args) {
        // only triggered when a different tab is tapped
        console.log(args.newIndex);
        if (args.newIndex == 3) {
            //this.router.navigate(["/account"]);
        }
    };
    MyCartComponent.prototype.toggleCheck = function () {
        this.FirstCheckBox.nativeElement.toggle();
    };
    MyCartComponent.prototype.getCheckProp = function () {
        console.log('checked prop value = ' + this.FirstCheckBox.nativeElement.checked);
    };
    MyCartComponent.prototype.register = function () {
        // if(this.input.firstname && this.input.lastname && this.input.email && this.input.password) {
        //     ApplicationSettings.setString("account", JSON.stringify(this.input));
        //     this.location.back();
        // } else {
        //     (new SnackBar()).simple("All Fields Required!");
        // }
        console.log("Reaching Register ");
        this.getCooperativeStaff(this.staffId, this.selectedCooperative);
    };
    MyCartComponent.prototype.onNavBtnTap = function () {
        // This code will be called only in Android.
        console.log("Navigation button tapped!");
    };
    MyCartComponent.prototype.productChecked = function (checkedProduct, event) {
        console.log("Checked Product " + checkedProduct);
        console.log("Event " + event.checked);
    };
    MyCartComponent.prototype.productcheckedChange = function (modelRef, productChecked) {
        //console.log("checkedChange: ", modelRef.checked);
        //console.log("Product Checked : ", JSON.stringify(productChecked));
        if (modelRef.checked) {
            for (var _i = 0, _a = this.cartProducts; _i < _a.length; _i++) {
                var product = _a[_i];
                // console.log(product); // 1, "string", false
                if (productChecked._id == product._id) {
                    product.isSelected = true;
                }
            }
            //console.log("Product Checked : ", JSON.stringify(productChecked));
            //this.cartSelectedProducts.push(productChecked);
            //console.log("Items Selected: ", this.cartSelectedProducts);
        }
        else {
            //this.cartSelectedProducts.reduce(productChecked);
            // var index = this.cartSelectedProducts.indexOf(productChecked, 0);
            // if (index > -1) {
            //     this.cartSelectedProducts.splice(index, 1);
            // }
            //console.log("Items Selected remove: ", this.cartSelectedProducts);
            for (var _b = 0, _c = this.cartProducts; _b < _c.length; _b++) {
                var product = _c[_b];
                // console.log(product); // 1, "string", false
                if (productChecked._id == product._id) {
                    product.isSelected = false;
                }
            }
        }
        this.getTotalWeight();
    };
    MyCartComponent.prototype.removefromCart = function (productChecked) {
        var _this = this;
        console.log("Selected Product Delete " + productChecked);
        nativescript_fancyalert_1.TNSFancyAlert.showWarning("Warning!", "Are you sure you want to delete this item?", "Ok").then(function () {
            console.log("delete approved " + productChecked);
            var index = _this.cartProducts.indexOf(productChecked, 0);
            if (index > -1) {
                _this.cartProducts.splice(index, 1);
            }
            LS.removeItem('mycartproducts');
            LS.setItem('mycartproducts', _this.cartProducts);
            _this.getTotalWeight();
        });
    };
    MyCartComponent.prototype.productcheckedAllChange = function (modelRef) {
        console.log("Selected All " + modelRef);
        if (modelRef.checked) {
            for (var _i = 0, _a = this.cartProducts; _i < _a.length; _i++) {
                var product = _a[_i];
                // console.log(product); // 1, "string", false
                product.isSelected = true;
            }
        }
        else {
            // for (let product of this.cartProducts) {
            //     // console.log(product); // 1, "string", false
            //     product.isSelected = false;
            //  }
        }
        this.getTotalWeight();
    };
    MyCartComponent.prototype.goBack = function () {
        this.location.back();
    };
    MyCartComponent.prototype.startBackgroundAnimation = function (background) {
        background.animate({
            scale: { x: 1.0, y: 1.0 },
            duration: 10000
        });
    };
    MyCartComponent.prototype.oncooperativechange = function (args) {
        // console.log(`Drop Down selected index changed  ${args.oldIndex} to ${args.newIndex}. New value is "${this.sessionitems.getValue(
        //     args.newIndex)}"`);
        console.log("Selected ID " + args.newIndex);
        this.selectedCooperative = this.cooperativeList.getValue(args.newIndex);
        console.log("Selected Id Value  " + this.selectedCooperative);
    };
    MyCartComponent.prototype.onqtychange = function (args, productChecked) {
        // console.log(`Drop Down selected index changed  ${args.oldIndex} to ${args.newIndex}. New value is "${this.sessionitems.getValue(
        //     args.newIndex)}"`);
        console.log("Selected ID " + args.newIndex);
        //this.selectedCooperative = this.productChecked.qtyList.getValue(args.newIndex);
        console.log("Selected Id Value  " + productChecked.qtyList.getValue(args.newIndex));
        var newqty = +productChecked.qtyList.getValue(args.newIndex);
        for (var _i = 0, _a = this.cartProducts; _i < _a.length; _i++) {
            var product = _a[_i];
            // console.log(product); // 1, "string", false
            if (productChecked._id == product._id) {
                product.qty = newqty;
                product.amount = product.price * newqty;
            }
        }
        this.getTotalWeight();
    };
    MyCartComponent.prototype.getCooperative = function () {
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
    MyCartComponent.prototype.getCooperativeStaff = function (staffId, cooperativeId) {
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
    MyCartComponent.prototype.sendVerifyAuth = function (verifyAuth) {
        console.log("Verify " + verifyAuth.staffId);
        this.cooperativeStaffService.verifyAuthToCreatLater(verifyAuth).subscribe(function (data) {
            console.log("Very Auth " + JSON.stringify(data["data"]));
        }, function (err) {
            console.log(err);
        });
    };
    MyCartComponent.prototype.getTotalWeight = function () {
        var total = 0;
        var selectedCount = 0;
        if (this.cartProducts != null && this.cartProducts.length > 0) {
            this.cartProducts.forEach(function (x) {
                if (x.isSelected) {
                    total += x.amount;
                    selectedCount += 1;
                }
            });
        }
        this.totalSelectedAmount = total;
        this.totalSelectedItem = selectedCount;
        if (this.cartProducts.length == selectedCount) {
            this.isSelectAll = true;
        }
        else {
            this.isSelectAll = false;
        }
        LS.removeItem('mycartproducts');
        LS.setItem('mycartproducts', this.cartProducts);
        return total;
    };
    MyCartComponent.prototype.navigateBack = function () {
        console.log("Go Back Button Clicked");
        this.routerExtensions.backToPreviousPage();
    };
    MyCartComponent.prototype.onTouch = function (args) {
        console.log("Page is touched");
        this.autoLogoutService.reset();
    };
    __decorate([
        core_1.ViewChild("CB1"),
        __metadata("design:type", core_1.ElementRef)
    ], MyCartComponent.prototype, "FirstCheckBox", void 0);
    MyCartComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: "ns-mycart",
            templateUrl: "./mycart.component.html",
            styleUrls: ["./mycart-common.css", "./mycart.component.css"],
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
        }),
        __metadata("design:paramtypes", [common_1.Location, cooperative_service_1.CooperativeService, cooperativeStaff_service_1.CooperativeStaffService,
            forms_1.FormBuilder, autologout_service_1.AutoLogoutService,
            router_1.RouterExtensions])
    ], MyCartComponent);
    return MyCartComponent;
}());
exports.MyCartComponent = MyCartComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXljYXJ0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm15Y2FydC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBZ0g7QUFDaEgsd0NBQW9FO0FBQ3BFLHNEQUErRDtBQUMvRCwwQ0FBMkM7QUFXM0MsaUVBQTZGO0FBSTdGLGlFQUE2RDtBQUc3RCwwRUFBd0U7QUFDeEUsb0ZBQWtGO0FBR2xGLElBQUksRUFBRSxHQUFHLE9BQU8sQ0FBRSwyQkFBMkIsQ0FBRSxDQUFDO0FBQ2hELDhDQUE2QztBQUU3QyxtRUFBd0Q7QUFDeEQsd0VBQXNFO0FBYXRFO0lBdUNJLHlCQUEyQixRQUFrQixFQUFVLGtCQUFzQyxFQUFVLHVCQUFnRCxFQUMzSSxXQUF3QixFQUFVLGlCQUFvQyxFQUN0RSxnQkFBa0M7UUFGbkIsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQUFVLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBb0I7UUFBVSw0QkFBdUIsR0FBdkIsdUJBQXVCLENBQXlCO1FBQzNJLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQVUsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQUN0RSxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBeEM5QyxvQkFBZSxHQUFZLGVBQU0sQ0FBQyxlQUFlLENBQUM7UUFLbEQsZ0JBQVcsR0FBdUIsRUFBRSxDQUFDO1FBQ3JDLFNBQUksR0FBVyxJQUFJLENBQUM7UUFFYixhQUFRLEdBQVcsU0FBUyxDQUFDO1FBR3BDLGlCQUFZLEdBQXVCLEVBQUUsQ0FBQztRQUN0Qyx5QkFBb0IsR0FBZSxFQUFFLENBQUM7UUFDdEMsd0JBQW1CLEdBQVcsQ0FBQyxDQUFDO1FBQ2hDLHNCQUFpQixHQUFXLENBQUMsQ0FBQztRQUc5QixnQkFBVyxHQUFZLEtBQUssQ0FBQztRQUt0QixnQkFBVyxHQUFXLG1CQUFtQixDQUFDO1FBS2hELGlCQUFZLEdBQVcsaUVBQWlFLENBQUM7UUFJbEYsY0FBUyxHQUF5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VmtCO1FBQWpCLGdCQUFTLENBQUMsS0FBSyxDQUFDO2tDQUFnQixpQkFBVTswREFBQztJQTlCcEMsZUFBZTtRQVYzQixnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFFBQVEsRUFBRSxXQUFXO1lBQ3JCLFdBQVcsRUFBRSx5QkFBeUI7WUFDdEMsU0FBUyxFQUFFLENBQUMscUJBQXFCLEVBQUUsd0JBQXdCLENBQUM7WUFDNUQsZUFBZSxFQUFFLDhCQUF1QixDQUFDLE1BQU07U0FFbEQsQ0FBQzt5Q0EwQ3VDLGlCQUFRLEVBQThCLHdDQUFrQixFQUFtQyxrREFBdUI7WUFDOUgsbUJBQVcsRUFBNkIsc0NBQWlCO1lBQ3BELHlCQUFnQjtPQXpDckMsZUFBZSxDQWlYM0I7SUFBRCxzQkFBQztDQUFBLEFBalhELElBaVhDO0FBalhZLDBDQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIEFmdGVyVmlld0luaXQsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFZpZXdDaGlsZCAsRWxlbWVudFJlZiB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IEZvcm1CdWlsZGVyLCBGb3JtR3JvdXAsIFZhbGlkYXRvcnMgfSBmcm9tIFwiQGFuZ3VsYXIvZm9ybXNcIjtcclxuaW1wb3J0IHsgUm91dGVyRXh0ZW5zaW9ucyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXJcIjtcclxuaW1wb3J0IHsgTG9jYXRpb24gfSBmcm9tIFwiQGFuZ3VsYXIvY29tbW9uXCI7XHJcbmltcG9ydCB7IFNuYWNrQmFyIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1zbmFja2JhclwiO1xyXG5pbXBvcnQgKiBhcyBBcHBsaWNhdGlvblNldHRpbmdzIGZyb20gXCJhcHBsaWNhdGlvbi1zZXR0aW5nc1wiO1xyXG5pbXBvcnQgeyBjb25uZWN0aW9uVHlwZSwgZ2V0Q29ubmVjdGlvblR5cGUgfSBmcm9tIFwiY29ubmVjdGl2aXR5XCI7XHJcbmltcG9ydCB7IEFuaW1hdGlvbiB9IGZyb20gXCJ1aS9hbmltYXRpb25cIjtcclxuaW1wb3J0IHsgVmlldyB9IGZyb20gXCJ1aS9jb3JlL3ZpZXdcIjtcclxuaW1wb3J0IHsgcHJvbXB0IH0gZnJvbSBcInVpL2RpYWxvZ3NcIjtcclxuaW1wb3J0IHsgUGFnZSB9IGZyb20gXCJ1aS9wYWdlXCI7XHJcbmltcG9ydCB7IFRleHRGaWVsZCB9IGZyb20gXCJ1aS90ZXh0LWZpZWxkXCI7XHJcbmltcG9ydCAqIGFzIHRleHRWaWV3TW9kdWxlIGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL3RleHQtdmlld1wiO1xyXG5cclxuaW1wb3J0IHsgQm90dG9tQmFyLCBCb3R0b21CYXJJdGVtLCBUSVRMRV9TVEFURSwgTm90aWZpY2F0aW9uIH0gZnJvbSAnbmF0aXZlc2NyaXB0LWJvdHRvbWJhcic7XHJcbiAgXHJcblxyXG5cclxuaW1wb3J0IHsgVmFsdWVMaXN0LCBEcm9wRG93biB9IGZyb20gXCJuYXRpdmVzY3JpcHQtZHJvcC1kb3duXCI7XHJcbmltcG9ydCB7IFNlbGVjdGVkSW5kZXhDaGFuZ2VkRXZlbnREYXRhIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1kcm9wLWRvd25cIjtcclxuaW1wb3J0IHsgQ29vcGVyYXRpdmUgfSBmcm9tICcuLi8uLi9tb2RlbHMvaW5kZXgnO1xyXG5pbXBvcnQgeyBDb29wZXJhdGl2ZVNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvY29vcGVyYXRpdmUuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBDb29wZXJhdGl2ZVN0YWZmU2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9jb29wZXJhdGl2ZVN0YWZmLnNlcnZpY2VcIjtcclxuXHJcbmltcG9ydCB7IENvb3BlcmF0aXZlU3RhZmYsIFZlcmlmeUF1dGgsUHJvZHVjdCxQcm9kdWN0Q2FydCB9IGZyb20gXCIuLi8uLi9tb2RlbHMvaW5kZXhcIjtcclxubGV0IExTID0gcmVxdWlyZSggXCJuYXRpdmVzY3JpcHQtbG9jYWxzdG9yYWdlXCIgKTtcclxuaW1wb3J0IHsgQ29uZmlnIH0gZnJvbSBcIi4uLy4uL3NoYXJlZC9jb25maWdcIjtcclxuXHJcbmltcG9ydCB7IFROU0ZhbmN5QWxlcnQgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWZhbmN5YWxlcnRcIjtcclxuaW1wb3J0IHsgQXV0b0xvZ291dFNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9hdXRvbG9nb3V0LnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBUb3VjaEdlc3R1cmVFdmVudERhdGEgfSBmcm9tIFwidWkvZ2VzdHVyZXNcIjtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcclxuICAgIHNlbGVjdG9yOiBcIm5zLW15Y2FydFwiLFxyXG4gICAgdGVtcGxhdGVVcmw6IFwiLi9teWNhcnQuY29tcG9uZW50Lmh0bWxcIixcclxuICAgIHN0eWxlVXJsczogW1wiLi9teWNhcnQtY29tbW9uLmNzc1wiLCBcIi4vbXljYXJ0LmNvbXBvbmVudC5jc3NcIl0sXHJcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcclxuICBcclxufSlcclxuXHJcblxyXG5leHBvcnQgY2xhc3MgTXlDYXJ0Q29tcG9uZW50IHtcclxuICAgIHByb2R1Y3RJbWFnZVVybDogc3RyaW5nICA9IENvbmZpZy5wcm9kdWN0SW1hZ2VVUkw7XHJcbiAgICBwdWJsaWMgaW5wdXQ6IGFueTtcclxuICAgIHNlbGVjdGVkQ29vcGVyYXRpdmVJbmRleDogbnVtYmVyO1xyXG4gICAgc2VsZWN0ZWRDb29wZXJhdGl2ZTogc3RyaW5nO1xyXG4gICAgc3RhZmZJZDogU3RyaW5nO1xyXG4gICAgY29vcGVyYXRpdmU6IEFycmF5PENvb3BlcmF0aXZlPiA9IFtdO1xyXG4gICAgaGludDogc3RyaW5nID0gXCIgMVwiO1xyXG4gICAgcHVibGljIGNvb3BlcmF0aXZlTGlzdDogVmFsdWVMaXN0PHN0cmluZz47XHJcbiAgICBwdWJsaWMgY3NzQ2xhc3M6IHN0cmluZyA9IFwiZGVmYXVsdFwiO1xyXG4gICAgY29vcGVyYXRpdmVTdGFmZjogQ29vcGVyYXRpdmVTdGFmZjtcclxuICAgIHZlcmlmeUF1dGg6IFZlcmlmeUF1dGg7XHJcbiAgICBjYXJ0UHJvZHVjdHM6IEFycmF5PFByb2R1Y3RDYXJ0PiA9IFtdO1xyXG4gICAgY2FydFNlbGVjdGVkUHJvZHVjdHM6IEFycmF5PGFueT4gPSBbXTtcclxuICAgIHRvdGFsU2VsZWN0ZWRBbW91bnQ6IG51bWJlciA9IDA7XHJcbiAgICB0b3RhbFNlbGVjdGVkSXRlbTogbnVtYmVyID0gMDtcclxuICAgIHB1YmxpYyBoaWRkZW46IGJvb2xlYW47XHJcblxyXG4gICAgaXNTZWxlY3RBbGw6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgICBwdWJsaWMgdGl0bGVTdGF0ZTogVElUTEVfU1RBVEU7XHJcbiAgICBwdWJsaWMgX2JhcjogQm90dG9tQmFyO1xyXG4gICAgcHVibGljIGluYWN0aXZlQ29sb3I6IHN0cmluZztcclxuICAgIHB1YmxpYyBhY2NlbnRDb2xvcjogc3RyaW5nID0gXCJyZ2IoMjU0LCAyMDQsIDIyKVwiO1xyXG5cclxuICAgIGZvcm1Hcm91cDogRm9ybUdyb3VwO1xyXG4gIGNoZWNrVGVzdDogYm9vbGVhbjtcclxuXHJcbiAgICAgbm90aWZpY2F0aW9uOiBTdHJpbmcgPSBcIllvdSBjYW4gYWNjZXNzIHlvdXIgcGVyc29uYWwgb2ZmZXIsIHVwZGF0ZXMgYW5kIHByaWNlIGRyb3AgaGVyZVwiO1xyXG5cclxuICAgICBAVmlld0NoaWxkKFwiQ0IxXCIpIEZpcnN0Q2hlY2tCb3g6IEVsZW1lbnRSZWY7XHJcblxyXG4gICAgIHB1YmxpYyBpdGVtc01lbnU6IEFycmF5PEJvdHRvbUJhckl0ZW0+ID0gW1xyXG4gICAgICAgIG5ldyBCb3R0b21CYXJJdGVtKDAsIFwiQ2FydFwiLCBcImljX2hvbWVfYmxhY2tfMjRkcFwiLCBcIiM5QTk5OTlcIilcclxuICAgICAgXHJcbiAgICBdO1xyXG5cclxuXHJcbiAgICAgXHJcbiAgICBwdWJsaWMgY29uc3RydWN0b3IocHJpdmF0ZSBsb2NhdGlvbjogTG9jYXRpb24sIHByaXZhdGUgY29vcGVyYXRpdmVTZXJ2aWNlOiBDb29wZXJhdGl2ZVNlcnZpY2UsIHByaXZhdGUgY29vcGVyYXRpdmVTdGFmZlNlcnZpY2U6IENvb3BlcmF0aXZlU3RhZmZTZXJ2aWNlLFxyXG4gICAgICAgIHByaXZhdGUgZm9ybUJ1aWxkZXI6IEZvcm1CdWlsZGVyLCBwcml2YXRlIGF1dG9Mb2dvdXRTZXJ2aWNlOiBBdXRvTG9nb3V0U2VydmljZSxcclxuICAgICAgICBwcml2YXRlIHJvdXRlckV4dGVuc2lvbnM6IFJvdXRlckV4dGVuc2lvbnMpIHtcclxuICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgbmdBZnRlclZpZXdJbml0KCkge1xyXG4gICAgICAgIHRoaXMuZ2V0Q29vcGVyYXRpdmUoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgbmdPbkluaXQoKSB7XHJcbiAgICAgICAgaWYoTFMuZ2V0SXRlbSgnbXljYXJ0cHJvZHVjdHMnKSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuY2FydFByb2R1Y3RzID0gW107XHJcbiAgICAgICAgICAgIHZhciBteWNhcnRwcm9kdWN0cyA9IExTLmdldEl0ZW0oJ215Y2FydHByb2R1Y3RzJyk7XHJcbiAgICAgICAgICAgIHRoaXMuY2FydFByb2R1Y3RzID0gbXljYXJ0cHJvZHVjdHM7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5mb3JtR3JvdXAgPSB0aGlzLmZvcm1CdWlsZGVyLmdyb3VwKHtcclxuICAgICAgICAgICAgdGVzdENoZWNrOiBbXHJcbiAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFsdWU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBkaXNhYmxlZDogZmFsc2VcclxuICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgIFtWYWxpZGF0b3JzLnJlcXVpcmVkXVxyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICB0YWJMb2FkZWQoZXZlbnQpIHtcclxuICAgICAgICB0aGlzLl9iYXIgPSA8Qm90dG9tQmFyPmV2ZW50Lm9iamVjdDtcclxuICAgICAgICB0aGlzLmhpZGRlbiA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMudGl0bGVTdGF0ZSA9IFRJVExFX1NUQVRFLlNIT1dfV0hFTl9BQ1RJVkU7XHJcbiAgICAgICAgdGhpcy5pbmFjdGl2ZUNvbG9yID0gXCJ3aGl0ZVwiO1xyXG4gICAgICAgIHRoaXMuYWNjZW50Q29sb3IgPSBcInJnYigyNTQsIDIwNCwgMjIpXCI7XHJcbiAgICB9XHJcbiAgICBcclxuICAgICB0YWJTZWxlY3RlZChhcmdzOiBTZWxlY3RlZEluZGV4Q2hhbmdlZEV2ZW50RGF0YSkge1xyXG4gICAgICAgICAvLyBvbmx5IHRyaWdnZXJlZCB3aGVuIGEgZGlmZmVyZW50IHRhYiBpcyB0YXBwZWRcclxuICAgICAgICAgY29uc29sZS5sb2coYXJncy5uZXdJbmRleCk7XHJcblxyXG4gICAgICAgICBpZihhcmdzLm5ld0luZGV4ID09IDMpXHJcbiAgICAgICAgIHtcclxuICAgICAgICAgICAgLy90aGlzLnJvdXRlci5uYXZpZ2F0ZShbXCIvYWNjb3VudFwiXSk7XHJcbiAgICAgICAgIH1cclxuICAgICB9XHJcbiAgICBwdWJsaWMgdG9nZ2xlQ2hlY2soKSB7XHJcbiAgICAgICAgdGhpcy5GaXJzdENoZWNrQm94Lm5hdGl2ZUVsZW1lbnQudG9nZ2xlKCk7XHJcbiAgICB9XHJcbiBcclxuICAgIHB1YmxpYyBnZXRDaGVja1Byb3AoKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ2NoZWNrZWQgcHJvcCB2YWx1ZSA9ICcgKyB0aGlzLkZpcnN0Q2hlY2tCb3gubmF0aXZlRWxlbWVudC5jaGVja2VkKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyByZWdpc3RlcigpIHtcclxuICAgICAgICAvLyBpZih0aGlzLmlucHV0LmZpcnN0bmFtZSAmJiB0aGlzLmlucHV0Lmxhc3RuYW1lICYmIHRoaXMuaW5wdXQuZW1haWwgJiYgdGhpcy5pbnB1dC5wYXNzd29yZCkge1xyXG4gICAgICAgIC8vICAgICBBcHBsaWNhdGlvblNldHRpbmdzLnNldFN0cmluZyhcImFjY291bnRcIiwgSlNPTi5zdHJpbmdpZnkodGhpcy5pbnB1dCkpO1xyXG4gICAgICAgIC8vICAgICB0aGlzLmxvY2F0aW9uLmJhY2soKTtcclxuICAgICAgICAvLyB9IGVsc2Uge1xyXG4gICAgICAgIC8vICAgICAobmV3IFNuYWNrQmFyKCkpLnNpbXBsZShcIkFsbCBGaWVsZHMgUmVxdWlyZWQhXCIpO1xyXG4gICAgICAgIC8vIH1cclxuXHJcbiAgICAgICAgY29uc29sZS5sb2coXCJSZWFjaGluZyBSZWdpc3RlciBcIik7XHJcblxyXG4gICAgICAgIHRoaXMuZ2V0Q29vcGVyYXRpdmVTdGFmZih0aGlzLnN0YWZmSWQsIHRoaXMuc2VsZWN0ZWRDb29wZXJhdGl2ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgb25OYXZCdG5UYXAoKSB7XHJcbiAgICAgICAgLy8gVGhpcyBjb2RlIHdpbGwgYmUgY2FsbGVkIG9ubHkgaW4gQW5kcm9pZC5cclxuICAgICAgICBjb25zb2xlLmxvZyhcIk5hdmlnYXRpb24gYnV0dG9uIHRhcHBlZCFcIik7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvZHVjdENoZWNrZWQoY2hlY2tlZFByb2R1Y3Q6IFByb2R1Y3QsZXZlbnQpXHJcbiAgICB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJDaGVja2VkIFByb2R1Y3QgXCIrIGNoZWNrZWRQcm9kdWN0KTtcclxuXHJcbiAgICAgICAgY29uc29sZS5sb2coXCJFdmVudCBcIisgZXZlbnQuY2hlY2tlZCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHByb2R1Y3RjaGVja2VkQ2hhbmdlKG1vZGVsUmVmLHByb2R1Y3RDaGVja2VkOlByb2R1Y3RDYXJ0KSB7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcImNoZWNrZWRDaGFuZ2U6IFwiLCBtb2RlbFJlZi5jaGVja2VkKTtcclxuXHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcIlByb2R1Y3QgQ2hlY2tlZCA6IFwiLCBKU09OLnN0cmluZ2lmeShwcm9kdWN0Q2hlY2tlZCkpO1xyXG5cclxuICAgICAgIGlmKG1vZGVsUmVmLmNoZWNrZWQpXHJcbiAgICAgICB7XHJcblxyXG4gICAgICAgIGZvciAobGV0IHByb2R1Y3Qgb2YgdGhpcy5jYXJ0UHJvZHVjdHMpIHtcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2cocHJvZHVjdCk7IC8vIDEsIFwic3RyaW5nXCIsIGZhbHNlXHJcblxyXG4gICAgICAgICAgICBpZihwcm9kdWN0Q2hlY2tlZC5faWQgPT0gcHJvZHVjdC5faWQpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHByb2R1Y3QuaXNTZWxlY3RlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICBcclxuICAgICAgICAgfVxyXG4gICAgICAgIC8vY29uc29sZS5sb2coXCJQcm9kdWN0IENoZWNrZWQgOiBcIiwgSlNPTi5zdHJpbmdpZnkocHJvZHVjdENoZWNrZWQpKTtcclxuICAgICAgICBcclxuICAgICAgICAgICAvL3RoaXMuY2FydFNlbGVjdGVkUHJvZHVjdHMucHVzaChwcm9kdWN0Q2hlY2tlZCk7XHJcblxyXG4gICAgICAgICAgIC8vY29uc29sZS5sb2coXCJJdGVtcyBTZWxlY3RlZDogXCIsIHRoaXMuY2FydFNlbGVjdGVkUHJvZHVjdHMpO1xyXG4gICAgICAgfWVsc2V7XHJcbiAgICAgICAgLy90aGlzLmNhcnRTZWxlY3RlZFByb2R1Y3RzLnJlZHVjZShwcm9kdWN0Q2hlY2tlZCk7XHJcblxyXG4gICAgICAgIC8vIHZhciBpbmRleCA9IHRoaXMuY2FydFNlbGVjdGVkUHJvZHVjdHMuaW5kZXhPZihwcm9kdWN0Q2hlY2tlZCwgMCk7XHJcbiAgICAgICAgLy8gaWYgKGluZGV4ID4gLTEpIHtcclxuICAgICAgICAvLyAgICAgdGhpcy5jYXJ0U2VsZWN0ZWRQcm9kdWN0cy5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICAgIC8vIH1cclxuXHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcIkl0ZW1zIFNlbGVjdGVkIHJlbW92ZTogXCIsIHRoaXMuY2FydFNlbGVjdGVkUHJvZHVjdHMpO1xyXG4gICAgICAgIGZvciAobGV0IHByb2R1Y3Qgb2YgdGhpcy5jYXJ0UHJvZHVjdHMpIHtcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2cocHJvZHVjdCk7IC8vIDEsIFwic3RyaW5nXCIsIGZhbHNlXHJcblxyXG4gICAgICAgICAgICBpZihwcm9kdWN0Q2hlY2tlZC5faWQgPT0gcHJvZHVjdC5faWQpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHByb2R1Y3QuaXNTZWxlY3RlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgXHJcbiAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgfVxyXG5cclxuICAgICAgIFxyXG4gICAgICB0aGlzLmdldFRvdGFsV2VpZ2h0KCk7XHJcbiAgICAgICBcclxuICAgICAgfVxyXG5cclxuICAgICAgcmVtb3ZlZnJvbUNhcnQoIHByb2R1Y3RDaGVja2VkOlByb2R1Y3RDYXJ0KVxyXG4gICAgICB7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhcIlNlbGVjdGVkIFByb2R1Y3QgRGVsZXRlIFwiICsgcHJvZHVjdENoZWNrZWQgKTtcclxuICAgICAgICBUTlNGYW5jeUFsZXJ0LnNob3dXYXJuaW5nKFwiV2FybmluZyFcIiwgXCJBcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gZGVsZXRlIHRoaXMgaXRlbT9cIiwgXCJPa1wiKSAudGhlbiggKCkgPT4geyAvKiB1c2VyIHByZXNzZWQgdGhlIGJ1dHRvbiAqL1xyXG4gICAgICAgICAgICAgY29uc29sZS5sb2coXCJkZWxldGUgYXBwcm92ZWQgXCIrIHByb2R1Y3RDaGVja2VkKVxyXG4gICAgICAgICAgICB2YXIgaW5kZXggPSB0aGlzLmNhcnRQcm9kdWN0cy5pbmRleE9mKHByb2R1Y3RDaGVja2VkLCAwKTtcclxuICAgICAgICAgICAgaWYgKGluZGV4ID4gLTEpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2FydFByb2R1Y3RzLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIExTLnJlbW92ZUl0ZW0oJ215Y2FydHByb2R1Y3RzJyk7XHJcblxyXG4gICAgICAgIExTLnNldEl0ZW0oJ215Y2FydHByb2R1Y3RzJyx0aGlzLmNhcnRQcm9kdWN0cyk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmdldFRvdGFsV2VpZ2h0KCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgfSk7XHJcblxyXG5cclxuICAgICAgIFxyXG5cclxuICAgICAgIFxyXG4gICAgICB9XHJcblxyXG5cclxuICAgICAgcHJvZHVjdGNoZWNrZWRBbGxDaGFuZ2UobW9kZWxSZWYpe1xyXG5cclxuICAgICAgICBjb25zb2xlLmxvZyhcIlNlbGVjdGVkIEFsbCBcIiArIG1vZGVsUmVmKTtcclxuICAgICAgICAgaWYobW9kZWxSZWYuY2hlY2tlZClcclxuICAgICAgICAge1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgZm9yIChsZXQgcHJvZHVjdCBvZiB0aGlzLmNhcnRQcm9kdWN0cykge1xyXG4gICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhwcm9kdWN0KTsgLy8gMSwgXCJzdHJpbmdcIiwgZmFsc2VcclxuICAgICAgICAgICAgICAgcHJvZHVjdC5pc1NlbGVjdGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICB9ZWxzZVxyXG4gICAgICAgICB7XHJcbiAgICAgICAgICAgIC8vIGZvciAobGV0IHByb2R1Y3Qgb2YgdGhpcy5jYXJ0UHJvZHVjdHMpIHtcclxuICAgICAgICAgICAgLy8gICAgIC8vIGNvbnNvbGUubG9nKHByb2R1Y3QpOyAvLyAxLCBcInN0cmluZ1wiLCBmYWxzZVxyXG4gICAgICAgICAgICAvLyAgICAgcHJvZHVjdC5pc1NlbGVjdGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIC8vICB9XHJcbiAgICAgICAgIH1cclxuICAgICAgICAgdGhpcy5nZXRUb3RhbFdlaWdodCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnb0JhY2soKSB7XHJcbiAgICAgICAgdGhpcy5sb2NhdGlvbi5iYWNrKCk7XHJcbiAgICB9XHJcbiAgICBzdGFydEJhY2tncm91bmRBbmltYXRpb24oYmFja2dyb3VuZCkge1xyXG4gICAgICAgIGJhY2tncm91bmQuYW5pbWF0ZSh7XHJcbiAgICAgICAgICAgIHNjYWxlOiB7IHg6IDEuMCwgeTogMS4wIH0sXHJcbiAgICAgICAgICAgIGR1cmF0aW9uOiAxMDAwMFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBvbmNvb3BlcmF0aXZlY2hhbmdlKGFyZ3M6IFNlbGVjdGVkSW5kZXhDaGFuZ2VkRXZlbnREYXRhKSB7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coYERyb3AgRG93biBzZWxlY3RlZCBpbmRleCBjaGFuZ2VkICAke2FyZ3Mub2xkSW5kZXh9IHRvICR7YXJncy5uZXdJbmRleH0uIE5ldyB2YWx1ZSBpcyBcIiR7dGhpcy5zZXNzaW9uaXRlbXMuZ2V0VmFsdWUoXHJcbiAgICAgICAgLy8gICAgIGFyZ3MubmV3SW5kZXgpfVwiYCk7XHJcblxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiU2VsZWN0ZWQgSUQgXCIgKyBhcmdzLm5ld0luZGV4KTtcclxuICAgICAgICB0aGlzLnNlbGVjdGVkQ29vcGVyYXRpdmUgPSB0aGlzLmNvb3BlcmF0aXZlTGlzdC5nZXRWYWx1ZShhcmdzLm5ld0luZGV4KTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIlNlbGVjdGVkIElkIFZhbHVlICBcIiArIHRoaXMuc2VsZWN0ZWRDb29wZXJhdGl2ZSk7XHJcblxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwdWJsaWMgb25xdHljaGFuZ2UoYXJnczogU2VsZWN0ZWRJbmRleENoYW5nZWRFdmVudERhdGEscHJvZHVjdENoZWNrZWQ6UHJvZHVjdENhcnQpIHtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhgRHJvcCBEb3duIHNlbGVjdGVkIGluZGV4IGNoYW5nZWQgICR7YXJncy5vbGRJbmRleH0gdG8gJHthcmdzLm5ld0luZGV4fS4gTmV3IHZhbHVlIGlzIFwiJHt0aGlzLnNlc3Npb25pdGVtcy5nZXRWYWx1ZShcclxuICAgICAgICAvLyAgICAgYXJncy5uZXdJbmRleCl9XCJgKTtcclxuXHJcbiAgICAgICAgY29uc29sZS5sb2coXCJTZWxlY3RlZCBJRCBcIiArIGFyZ3MubmV3SW5kZXgpO1xyXG4gICAgICAgIC8vdGhpcy5zZWxlY3RlZENvb3BlcmF0aXZlID0gdGhpcy5wcm9kdWN0Q2hlY2tlZC5xdHlMaXN0LmdldFZhbHVlKGFyZ3MubmV3SW5kZXgpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiU2VsZWN0ZWQgSWQgVmFsdWUgIFwiICsgcHJvZHVjdENoZWNrZWQucXR5TGlzdC5nZXRWYWx1ZShhcmdzLm5ld0luZGV4KSk7XHJcbiAgICAgICAgbGV0IG5ld3F0eSA9ICtwcm9kdWN0Q2hlY2tlZC5xdHlMaXN0LmdldFZhbHVlKGFyZ3MubmV3SW5kZXgpO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBwcm9kdWN0IG9mIHRoaXMuY2FydFByb2R1Y3RzKSB7XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHByb2R1Y3QpOyAvLyAxLCBcInN0cmluZ1wiLCBmYWxzZVxyXG5cclxuICAgICAgICAgICAgaWYocHJvZHVjdENoZWNrZWQuX2lkID09IHByb2R1Y3QuX2lkKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBwcm9kdWN0LnF0eSA9IG5ld3F0eTtcclxuICAgICAgICAgICAgICAgIHByb2R1Y3QuYW1vdW50ID0gcHJvZHVjdC5wcmljZSAqIG5ld3F0eTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgIFxyXG4gICAgICAgICB9XHJcbiAgICAgICAgIFxyXG4gICAgICAgICB0aGlzLmdldFRvdGFsV2VpZ2h0KCk7XHJcblxyXG5cclxuICAgIH1cclxuXHJcblxyXG4gICAgXHJcblxyXG4gICAgZ2V0Q29vcGVyYXRpdmUoKSB7XHJcbiAgICAgICAgdGhpcy5jb29wZXJhdGl2ZVNlcnZpY2UuZ2V0QWxsQ29vcGVyYXRpdmUoKS5zdWJzY3JpYmUoXHJcbiAgICAgICAgICAgIGRhdGEgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJDb29wZXJhdGl2ZSBMaXN0IFwiICsgSlNPTi5zdHJpbmdpZnkoZGF0YVtcImRhdGFcIl0pKTtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvb3BlcmF0aXZlID0gZGF0YVtcImRhdGFcIl07XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5jb29wZXJhdGl2ZUxpc3QgPSBuZXcgVmFsdWVMaXN0PHN0cmluZz4oKTtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGxvb3AgPSAwOyBsb29wIDwgdGhpcy5jb29wZXJhdGl2ZS5sZW5ndGg7IGxvb3ArKykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29vcGVyYXRpdmVMaXN0LnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogYCR7dGhpcy5jb29wZXJhdGl2ZVtsb29wXS5jb29wZXJhdGl2ZUlkfWAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6IGAke3RoaXMuY29vcGVyYXRpdmVbbG9vcF0uZmlyc3RfbmFtZX1gLFxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuXHJcblxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBlcnIgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIGdldENvb3BlcmF0aXZlU3RhZmYoc3RhZmZJZDogU3RyaW5nLCBjb29wZXJhdGl2ZUlkOiBTdHJpbmcpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIlN0YWZmIGFuZCBDb29wZXJhdGl2ZUlkIFwiICsgc3RhZmZJZCArIFwiIC0gXCIgKyBjb29wZXJhdGl2ZUlkKTtcclxuXHJcblxyXG4gICAgICAgIHRoaXMuY29vcGVyYXRpdmVTdGFmZlNlcnZpY2UuZ2V0Q29vcGVyYXRpdmVTdGFmZihzdGFmZklkLCBjb29wZXJhdGl2ZUlkKS5zdWJzY3JpYmUoXHJcbiAgICAgICAgICAgIGRhdGEgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJDb29wZXJhdGl2ZSBTdGFmZiBcIiArIEpTT04uc3RyaW5naWZ5KGRhdGFbXCJkYXRhXCJdKSk7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5jb29wZXJhdGl2ZVN0YWZmID0gZGF0YVtcImRhdGFcIl07XHJcblxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJWZXJpZnlpbmcgU3RhZmYgb3V0IHNpZGUgXCIgKyB0aGlzLmNvb3BlcmF0aXZlU3RhZmYuc3RhZmZJZCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlbmRWZXJpZnlBdXRoKHRoaXMuY29vcGVyYXRpdmVTdGFmZik7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGVyciA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgc2VuZFZlcmlmeUF1dGgodmVyaWZ5QXV0aDogQ29vcGVyYXRpdmVTdGFmZikge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiVmVyaWZ5IFwiICsgdmVyaWZ5QXV0aC5zdGFmZklkKTtcclxuXHJcblxyXG4gICAgICAgIHRoaXMuY29vcGVyYXRpdmVTdGFmZlNlcnZpY2UudmVyaWZ5QXV0aFRvQ3JlYXRMYXRlcih2ZXJpZnlBdXRoKS5zdWJzY3JpYmUoXHJcbiAgICAgICAgICAgIGRhdGEgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJWZXJ5IEF1dGggXCIgKyBKU09OLnN0cmluZ2lmeShkYXRhW1wiZGF0YVwiXSkpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBlcnIgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFRvdGFsV2VpZ2h0KCk6IG51bWJlciB7XHJcbiAgICAgICAgdmFyIHRvdGFsID0gMDtcclxuICAgICAgICB2YXIgc2VsZWN0ZWRDb3VudCA9IDA7XHJcbiAgICAgICAgaWYgKHRoaXMuY2FydFByb2R1Y3RzICE9IG51bGwgJiYgdGhpcy5jYXJ0UHJvZHVjdHMubGVuZ3RoID4gMCkgeyAgICAgIFxyXG4gICAgICAgICAgdGhpcy5jYXJ0UHJvZHVjdHMuZm9yRWFjaCh4ID0+IHtcclxuICAgICAgICAgICAgICBpZih4LmlzU2VsZWN0ZWQpXHJcbiAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdG90YWwgKz0geC5hbW91bnQ7XHJcbiAgICAgICAgICAgICAgICBzZWxlY3RlZENvdW50ICs9IDE7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgIFxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnRvdGFsU2VsZWN0ZWRBbW91bnQgPSB0b3RhbDtcclxuICAgICAgICB0aGlzLnRvdGFsU2VsZWN0ZWRJdGVtID0gc2VsZWN0ZWRDb3VudDtcclxuICAgICAgICBpZih0aGlzLmNhcnRQcm9kdWN0cy5sZW5ndGggPT0gc2VsZWN0ZWRDb3VudCApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmlzU2VsZWN0QWxsID0gdHJ1ZTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5pc1NlbGVjdEFsbCA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgTFMucmVtb3ZlSXRlbSgnbXljYXJ0cHJvZHVjdHMnKTtcclxuXHJcbiAgICAgICAgTFMuc2V0SXRlbSgnbXljYXJ0cHJvZHVjdHMnLHRoaXMuY2FydFByb2R1Y3RzKTtcclxuICAgICAgICByZXR1cm4gdG90YWw7XHJcbiAgICAgIH0gIFxyXG5cclxuICAgICAgXHJcbiAgICAgIG5hdmlnYXRlQmFjaygpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIkdvIEJhY2sgQnV0dG9uIENsaWNrZWRcIiApO1xyXG4gICAgICAgIHRoaXMucm91dGVyRXh0ZW5zaW9ucy5iYWNrVG9QcmV2aW91c1BhZ2UoKTtcclxuICAgIH1cclxuXHJcbiAgICAgIG9uVG91Y2goYXJnczogVG91Y2hHZXN0dXJlRXZlbnREYXRhKSB7XHJcblxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiUGFnZSBpcyB0b3VjaGVkXCIpO1xyXG4gICAgICAgdGhpcy5hdXRvTG9nb3V0U2VydmljZS5yZXNldCgpO1xyXG4gICAgfVxyXG5cclxufSJdfQ==