"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var router_2 = require("nativescript-angular/router");
var common_1 = require("@angular/common");
var dialogs_1 = require("ui/dialogs");
var nativescript_drop_down_1 = require("nativescript-drop-down");
var cooperative_service_1 = require("../../services/cooperative.service");
var cooperativeStaff_service_1 = require("../../services/cooperativeStaff.service");
var coopercooperative_service_1 = require("../../services/coopercooperative.service");
var auth_service_1 = require("../../services/auth.service");
var product_service_1 = require("../../services/product.service");
var cooperativestaffaccount_service_1 = require("../../services/cooperativestaffaccount.service");
var LS = require("nativescript-localstorage");
var nativescript_fancyalert_1 = require("nativescript-fancyalert");
var config_1 = require("../../shared/config");
var autologout_service_1 = require("../../services/autologout.service");
var PayComponent = /** @class */ (function () {
    function PayComponent(location, cooperativeService, cooperativeStaffService, cooperCooperativeService, authService, productService, cooperativeStaffAccountService, router, activatedRoute, routerExtensions, autoLogoutService) {
        this.location = location;
        this.cooperativeService = cooperativeService;
        this.cooperativeStaffService = cooperativeStaffService;
        this.cooperCooperativeService = cooperCooperativeService;
        this.authService = authService;
        this.productService = productService;
        this.cooperativeStaffAccountService = cooperativeStaffAccountService;
        this.router = router;
        this.activatedRoute = activatedRoute;
        this.routerExtensions = routerExtensions;
        this.autoLogoutService = autoLogoutService;
        this.productImageUrl = config_1.Config.productImageURL;
        this.selectedCooperative = "";
        this.cooperative = [];
        this.assignedcooperatives = [];
        this.hint = " 1";
        this.cssClass = "default";
        this.cartProducts = [];
        this.notification = "You can access your personal offer, updates and price drop here";
        // this.input = {
        //     "firstname": "",
        //     "lastname": "",
        //     "email": "",
        //     "password": ""
        // }
    }
    PayComponent.prototype.ngAfterViewInit = function () {
        this.getCooperative();
    };
    PayComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (LS.getItem('mycartproducts')) {
            this.cartProducts = [];
            var mycartproducts = LS.getItem('mycartproducts');
            mycartproducts.forEach(function (element) {
                if (element.isSelected) {
                    console.log("Product Image " + element.productImage);
                    _this.cartProducts.push(element);
                }
            });
            //this.cartProducts = mycartproducts;
            this.getTotalWeight();
        }
        var dataObject = JSON.parse(LS.getItem('currentUser'));
        console.log("User ID " + dataObject._id);
        if (dataObject._id) {
            this.userId = dataObject._id;
            this.cooperId = dataObject.cooperId;
        }
    };
    PayComponent.prototype.register = function () {
        // if(this.input.firstname && this.input.lastname && this.input.email && this.input.password) {
        //     ApplicationSettings.setString("account", JSON.stringify(this.input));
        //     this.location.back();
        // } else {
        //     (new SnackBar()).simple("All Fields Required!");
        // }
        console.log("Reaching Register ");
        this.getCooperativeStaff(this.staffId, this.selectedCooperative);
    };
    PayComponent.prototype.onNavBtnTap = function () {
        // This code will be called only in Android.
        console.log("Navigation button tapped!");
    };
    PayComponent.prototype.removefromCart = function (productChecked) {
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
            //this.getTotalWeight();
        });
    };
    PayComponent.prototype.goBack = function () {
        this.location.back();
    };
    PayComponent.prototype.startBackgroundAnimation = function (background) {
        background.animate({
            scale: { x: 1.0, y: 1.0 },
            duration: 10000
        });
    };
    PayComponent.prototype.onqtychange = function (args, productChecked) {
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
    PayComponent.prototype.getTotalWeight = function () {
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
        // if(this.cartProducts.length == selectedCount )
        // {
        //     this.isSelectAll = true;
        // }else{
        //     this.isSelectAll = false;
        // }
        LS.removeItem('mycartproducts');
        LS.setItem('mycartproducts', this.cartProducts);
        return total;
    };
    PayComponent.prototype.oncooperativechange = function (args) {
        // console.log(`Drop Down selected index changed  ${args.oldIndex} to ${args.newIndex}. New value is "${this.sessionitems.getValue(
        //     args.newIndex)}"`);
        console.log("Selected ID " + args.newIndex);
        this.selectedCooperative = this.cooperativeList.getValue(args.newIndex);
        console.log("Selected Id Value  " + this.selectedCooperative);
    };
    PayComponent.prototype.getCooperative = function () {
        var _this = this;
        this.cooperativeService.getAllCooperative().subscribe(function (data) {
            console.log("Cooperative List " + JSON.stringify(data["data"]));
            _this.cooperative = data["data"];
            _this.getAllCooperativesAssigned(_this.cooperId);
        }, function (err) {
            console.log(err);
        });
    };
    PayComponent.prototype.getCooperativeStaff = function (staffId, cooperativeId) {
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
    PayComponent.prototype.getAllCooperativesAssigned = function (cooperId) {
        var _this = this;
        console.log("Staff and CooperativeId " + cooperId);
        this.cooperCooperativeService.getAllCooperativesCooper(cooperId).subscribe(function (data) {
            console.log("Assigned Cooperative " + data["data"]);
            _this.assignedcooperatives = data["data"];
            _this.cooperativeList = new nativescript_drop_down_1.ValueList();
            var _loop_1 = function (loop) {
                _this.assignedcooperatives.forEach(function (element) {
                    if (_this.cooperative[loop].cooperativeId == element.cooperativeId) {
                        _this.cooperativeList.push({
                            value: "" + _this.cooperative[loop].cooperativeId,
                            display: "" + _this.cooperative[loop].first_name,
                        });
                    }
                });
            };
            //    for (let loop = 0; loop < this.cooperative.length; loop++) {
            //    }
            for (var loop = 0; loop < _this.cooperative.length; loop++) {
                _loop_1(loop);
            }
            if (_this.assignedcooperatives.length == 1) {
                _this.selectedCooperative = _this.assignedcooperatives[0].cooperativeId;
            }
            _this.staffId = _this.assignedcooperatives[0].staffId;
        }, function (err) {
            nativescript_fancyalert_1.TNSFancyAlert.showError("Error!", err.error.message, "Ok");
            console.log(err);
        });
    };
    PayComponent.prototype.sendVerifyAuth = function (verifyAuth) {
        console.log("Verify " + verifyAuth.staffId);
        this.cooperativeStaffService.verifyAuthToCreatLater(verifyAuth).subscribe(function (data) {
            console.log("Very Auth " + JSON.stringify(data["data"]));
        }, function (err) {
            console.log(err);
        });
    };
    PayComponent.prototype.pay = function () {
        var _this = this;
        if (this.selectedCooperative == "") {
            nativescript_fancyalert_1.TNSFancyAlert.showError("Error!", "Please Select a Cooperative to continue", "Ok");
            return;
        }
        var options = {
            title: "Transaction PIN",
            defaultText: "",
            inputType: dialogs_1.inputType.password,
            okButtonText: "Confirm",
            cancelButtonText: "Cancel"
        };
        dialogs_1.prompt(options).then(function (result) {
            console.log("Hello, " + result.text);
            _this.checkUserPIn(_this.userId, result.text);
            console.log("Selected Id Value  " + _this.selectedCooperative);
        });
    };
    PayComponent.prototype.displayPromptDialog = function () {
        // >> prompt-dialog-code
        // << prompt-dialog-code
    };
    PayComponent.prototype.reduceProduct = function (productId, quantity, batchNo, cooperId, cooperativeId, staffId, transAmount) {
        console.log("Verify " + productId);
        this.productService.deductProduct(productId, quantity, batchNo, cooperId, cooperativeId, staffId, transAmount).subscribe(function (data) {
            console.log("Product " + JSON.stringify(data["data"]));
        }, function (err) {
            nativescript_fancyalert_1.TNSFancyAlert.showError("Error!", err.error.message, "Ok");
            console.log(err);
        });
    };
    PayComponent.prototype.reduceStaffAccount = function (cooperativeId, staffId, amount) {
        var _this = this;
        console.log("Cooperative Id " + cooperativeId);
        this.cooperativeStaffAccountService.deductCooperativeAccount(cooperativeId, staffId, amount, "Savings").subscribe(function (data) {
            console.log("Staff Account " + JSON.stringify(data["data"]));
            //Generate Batch No 6 Digit
            // let batchNo = Math.floor(Math.random());
            var batchNo = Math.floor(100000 + Math.random() * 900000);
            _this.cartProducts.forEach(function (element) {
                _this.reduceProduct(element._id, element.qty.toString(), batchNo.toString(), _this.cooperId, _this.selectedCooperative, _this.staffId, element.amount.toString());
            });
            // empty Cart 
            LS.removeItem('mycartproducts');
            _this.cartProducts = [];
            nativescript_fancyalert_1.TNSFancyAlert.showSuccess("Success!", " Your transaction was successful", "Ok")
                .then(function () {
                _this.router.navigate(["/"]);
            });
            // Redirect to Home
        }, function (err) {
            nativescript_fancyalert_1.TNSFancyAlert.showError("Error!", err.error.message, "Ok");
            console.log(err);
        });
    };
    PayComponent.prototype.checkUserPIn = function (userId, pin) {
        var _this = this;
        console.log("Verify " + userId);
        this.authService.checkTransPin(userId, pin).subscribe(function (data) {
            console.log("User Found " + JSON.stringify(data["data"]));
            if (_this.selectedCooperative == "") {
                nativescript_fancyalert_1.TNSFancyAlert.showError("Error!", "Please Select a Cooperative to continue", "Ok");
            }
            else {
                _this.reduceStaffAccount(_this.selectedCooperative, _this.staffId, _this.totalSelectedAmount.toString());
                //  
            }
        }, function (err) {
            nativescript_fancyalert_1.TNSFancyAlert.showError("Error!", err.error.message, "Ok");
            console.log(err);
        });
    };
    PayComponent.prototype.navigateBack = function () {
        console.log("Go Back Button Clicked");
        this.routerExtensions.backToPreviousPage();
    };
    PayComponent.prototype.onTouch = function (args) {
        console.log("Page is touched");
        this.autoLogoutService.reset();
    };
    PayComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: "ns-pay",
            templateUrl: "./pay.component.html",
            styleUrls: ["./pay-common.css", "./pay.component.css"],
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
        }),
        __metadata("design:paramtypes", [common_1.Location, cooperative_service_1.CooperativeService, cooperativeStaff_service_1.CooperativeStaffService,
            coopercooperative_service_1.CooperCooperativeService, auth_service_1.AuthService, product_service_1.ProductService,
            cooperativestaffaccount_service_1.CooperativeStaffAccountService, router_1.Router, router_1.ActivatedRoute,
            router_2.RouterExtensions, autologout_service_1.AutoLogoutService])
    ], PayComponent);
    return PayComponent;
}());
exports.PayComponent = PayComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGF5LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInBheS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMkY7QUFDM0YsMENBQXlEO0FBQ3pELHNEQUErRDtBQUMvRCwwQ0FBMkM7QUFNM0Msc0NBQTREO0FBTzVELGlFQUE2RDtBQUc3RCwwRUFBd0U7QUFDeEUsb0ZBQWtGO0FBQ2xGLHNGQUFvRjtBQUNwRiw0REFBMEQ7QUFDMUQsa0VBQWdFO0FBQ2hFLGtHQUFnRztBQUtoRyxJQUFJLEVBQUUsR0FBRyxPQUFPLENBQUUsMkJBQTJCLENBQUUsQ0FBQztBQUNoRCxtRUFBNkU7QUFFN0UsOENBQTZDO0FBQzdDLHdFQUFzRTtBQWF0RTtJQXlCSSxzQkFBMkIsUUFBa0IsRUFBVSxrQkFBc0MsRUFBVSx1QkFBZ0QsRUFDL0ksd0JBQWlELEVBQVUsV0FBdUIsRUFBVSxjQUE2QixFQUN6SCw4QkFBNkQsRUFBVSxNQUFjLEVBQVUsY0FBOEIsRUFDN0gsZ0JBQWtDLEVBQVMsaUJBQW1DO1FBSDNELGFBQVEsR0FBUixRQUFRLENBQVU7UUFBVSx1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW9CO1FBQVUsNEJBQXVCLEdBQXZCLHVCQUF1QixDQUF5QjtRQUMvSSw2QkFBd0IsR0FBeEIsd0JBQXdCLENBQXlCO1FBQVUsZ0JBQVcsR0FBWCxXQUFXLENBQVk7UUFBVSxtQkFBYyxHQUFkLGNBQWMsQ0FBZTtRQUN6SCxtQ0FBOEIsR0FBOUIsOEJBQThCLENBQStCO1FBQVUsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUFVLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUM3SCxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQVMsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFrQjtRQTNCdEYsb0JBQWUsR0FBWSxlQUFNLENBQUMsZUFBZSxDQUFDO1FBR2xELHdCQUFtQixHQUFXLEVBQUUsQ0FBQztRQUVqQyxnQkFBVyxHQUF1QixF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QixFQUFtQyxrREFBdUI7WUFDdEgsb0RBQXdCLEVBQXNCLDBCQUFXLEVBQXlCLGdDQUFjO1lBQzFGLGdFQUE4QixFQUFrQixlQUFNLEVBQTBCLHVCQUFjO1lBQzNHLHlCQUFnQixFQUEyQixzQ0FBaUI7T0E1QjdFLFlBQVksQ0E4Y3hCO0lBQUQsbUJBQUM7Q0FBQSxBQTljRCxJQThjQztBQTljWSxvQ0FBWSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBBZnRlclZpZXdJbml0LCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSAgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBSb3V0ZXIsIEFjdGl2YXRlZFJvdXRlIH0gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xyXG5pbXBvcnQgeyBSb3V0ZXJFeHRlbnNpb25zIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlclwiO1xyXG5pbXBvcnQgeyBMb2NhdGlvbiB9IGZyb20gXCJAYW5ndWxhci9jb21tb25cIjtcclxuaW1wb3J0IHsgU25hY2tCYXIgfSBmcm9tIFwibmF0aXZlc2NyaXB0LXNuYWNrYmFyXCI7XHJcbmltcG9ydCAqIGFzIEFwcGxpY2F0aW9uU2V0dGluZ3MgZnJvbSBcImFwcGxpY2F0aW9uLXNldHRpbmdzXCI7XHJcbmltcG9ydCB7IGNvbm5lY3Rpb25UeXBlLCBnZXRDb25uZWN0aW9uVHlwZSB9IGZyb20gXCJjb25uZWN0aXZpdHlcIjtcclxuaW1wb3J0IHsgQW5pbWF0aW9uIH0gZnJvbSBcInVpL2FuaW1hdGlvblwiO1xyXG5pbXBvcnQgeyBWaWV3IH0gZnJvbSBcInVpL2NvcmUvdmlld1wiO1xyXG5pbXBvcnQgeyBwcm9tcHQsUHJvbXB0UmVzdWx0LCBpbnB1dFR5cGUgfSBmcm9tIFwidWkvZGlhbG9nc1wiO1xyXG5pbXBvcnQgeyBQYWdlIH0gZnJvbSBcInVpL3BhZ2VcIjtcclxuaW1wb3J0IHsgVGV4dEZpZWxkIH0gZnJvbSBcInVpL3RleHQtZmllbGRcIjtcclxuaW1wb3J0ICogYXMgdGV4dFZpZXdNb2R1bGUgZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvdGV4dC12aWV3XCI7XHJcbmltcG9ydCB7IFRvdWNoR2VzdHVyZUV2ZW50RGF0YSB9IGZyb20gXCJ1aS9nZXN0dXJlc1wiO1xyXG5cclxuXHJcbmltcG9ydCB7IFZhbHVlTGlzdCwgRHJvcERvd24gfSBmcm9tIFwibmF0aXZlc2NyaXB0LWRyb3AtZG93blwiO1xyXG5pbXBvcnQgeyBTZWxlY3RlZEluZGV4Q2hhbmdlZEV2ZW50RGF0YSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtZHJvcC1kb3duXCI7XHJcbmltcG9ydCB7IENvb3BlcmF0aXZlIH0gZnJvbSAnLi4vLi4vbW9kZWxzL2luZGV4JztcclxuaW1wb3J0IHsgQ29vcGVyYXRpdmVTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL2Nvb3BlcmF0aXZlLnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgQ29vcGVyYXRpdmVTdGFmZlNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvY29vcGVyYXRpdmVTdGFmZi5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IENvb3BlckNvb3BlcmF0aXZlU2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9jb29wZXJjb29wZXJhdGl2ZS5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IEF1dGhTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL2F1dGguc2VydmljZVwiO1xyXG5pbXBvcnQgeyBQcm9kdWN0U2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9wcm9kdWN0LnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgQ29vcGVyYXRpdmVTdGFmZkFjY291bnRTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL2Nvb3BlcmF0aXZlc3RhZmZhY2NvdW50LnNlcnZpY2VcIjtcclxuXHJcblxyXG5pbXBvcnQgeyBDb29wZXJhdGl2ZVN0YWZmLCBWZXJpZnlBdXRoLFByb2R1Y3RDYXJ0IH0gZnJvbSBcIi4uLy4uL21vZGVscy9pbmRleFwiO1xyXG5cclxubGV0IExTID0gcmVxdWlyZSggXCJuYXRpdmVzY3JpcHQtbG9jYWxzdG9yYWdlXCIgKTtcclxuaW1wb3J0IHsgVE5TRmFuY3lBbGVydCwgVE5TRmFuY3lBbGVydEJ1dHRvbiB9IGZyb20gXCJuYXRpdmVzY3JpcHQtZmFuY3lhbGVydFwiO1xyXG5cclxuaW1wb3J0IHsgQ29uZmlnIH0gZnJvbSBcIi4uLy4uL3NoYXJlZC9jb25maWdcIjtcclxuaW1wb3J0IHsgQXV0b0xvZ291dFNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9hdXRvbG9nb3V0LnNlcnZpY2UnO1xyXG5cclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcclxuICAgIHNlbGVjdG9yOiBcIm5zLXBheVwiLFxyXG4gICAgdGVtcGxhdGVVcmw6IFwiLi9wYXkuY29tcG9uZW50Lmh0bWxcIixcclxuICAgIHN0eWxlVXJsczogW1wiLi9wYXktY29tbW9uLmNzc1wiLCBcIi4vcGF5LmNvbXBvbmVudC5jc3NcIl0sXHJcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcclxuICBcclxufSlcclxuXHJcblxyXG5leHBvcnQgY2xhc3MgUGF5Q29tcG9uZW50IHtcclxuICAgIHByb2R1Y3RJbWFnZVVybDogc3RyaW5nICA9IENvbmZpZy5wcm9kdWN0SW1hZ2VVUkw7XHJcbiAgICBwdWJsaWMgaW5wdXQ6IGFueTtcclxuICAgIHNlbGVjdGVkQ29vcGVyYXRpdmVJbmRleDogbnVtYmVyO1xyXG4gICAgc2VsZWN0ZWRDb29wZXJhdGl2ZTogc3RyaW5nID0gXCJcIjtcclxuICAgIHN0YWZmSWQ6IFN0cmluZztcclxuICAgIGNvb3BlcmF0aXZlOiBBcnJheTxDb29wZXJhdGl2ZT4gPSBbXTtcclxuICAgIGFzc2lnbmVkY29vcGVyYXRpdmVzOiBBcnJheTxhbnk+ID0gW107XHJcbiAgICBoaW50OiBzdHJpbmcgPSBcIiAxXCI7XHJcbiAgICBwdWJsaWMgY29vcGVyYXRpdmVMaXN0OiBWYWx1ZUxpc3Q8c3RyaW5nPjtcclxuICAgIHB1YmxpYyBjc3NDbGFzczogc3RyaW5nID0gXCJkZWZhdWx0XCI7XHJcbiAgICBjb29wZXJhdGl2ZVN0YWZmOiBDb29wZXJhdGl2ZVN0YWZmO1xyXG4gICAgdmVyaWZ5QXV0aDogVmVyaWZ5QXV0aDtcclxuICAgIGNhcnRQcm9kdWN0czogQXJyYXk8UHJvZHVjdENhcnQ+ID0gW107XHJcbiAgICB0b3RhbFNlbGVjdGVkQW1vdW50OiBudW1iZXI7XHJcbiAgICB0b3RhbFNlbGVjdGVkSXRlbTogbnVtYmVyO1xyXG4gICAgdXNlcklkOiBTdHJpbmc7XHJcbiAgICBjb29wZXJJZDogU3RyaW5nO1xyXG5cclxuXHJcbiAgICAgbm90aWZpY2F0aW9uOiBTdHJpbmcgPSBcIllvdSBjYW4gYWNjZXNzIHlvdXIgcGVyc29uYWwgb2ZmZXIsIHVwZGF0ZXMgYW5kIHByaWNlIGRyb3AgaGVyZVwiO1xyXG5cclxuXHJcblxyXG4gICAgIFxyXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKHByaXZhdGUgbG9jYXRpb246IExvY2F0aW9uLCBwcml2YXRlIGNvb3BlcmF0aXZlU2VydmljZTogQ29vcGVyYXRpdmVTZXJ2aWNlLCBwcml2YXRlIGNvb3BlcmF0aXZlU3RhZmZTZXJ2aWNlOiBDb29wZXJhdGl2ZVN0YWZmU2VydmljZSxcclxuICAgIHByaXZhdGUgY29vcGVyQ29vcGVyYXRpdmVTZXJ2aWNlOkNvb3BlckNvb3BlcmF0aXZlU2VydmljZSwgcHJpdmF0ZSBhdXRoU2VydmljZTpBdXRoU2VydmljZSwgcHJpdmF0ZSBwcm9kdWN0U2VydmljZTpQcm9kdWN0U2VydmljZSxcclxuICAgIHByaXZhdGUgY29vcGVyYXRpdmVTdGFmZkFjY291bnRTZXJ2aWNlOkNvb3BlcmF0aXZlU3RhZmZBY2NvdW50U2VydmljZSwgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlciwgcHJpdmF0ZSBhY3RpdmF0ZWRSb3V0ZTogQWN0aXZhdGVkUm91dGUsXHJcbiAgICBwcml2YXRlIHJvdXRlckV4dGVuc2lvbnM6IFJvdXRlckV4dGVuc2lvbnMscHJpdmF0ZSBhdXRvTG9nb3V0U2VydmljZTpBdXRvTG9nb3V0U2VydmljZVxyXG4pIHtcclxuICAgICAgICAvLyB0aGlzLmlucHV0ID0ge1xyXG4gICAgICAgIC8vICAgICBcImZpcnN0bmFtZVwiOiBcIlwiLFxyXG4gICAgICAgIC8vICAgICBcImxhc3RuYW1lXCI6IFwiXCIsXHJcbiAgICAgICAgLy8gICAgIFwiZW1haWxcIjogXCJcIixcclxuICAgICAgICAvLyAgICAgXCJwYXNzd29yZFwiOiBcIlwiXHJcbiAgICAgICAgLy8gfVxyXG4gICAgfVxyXG5cclxuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcclxuICAgICAgICB0aGlzLmdldENvb3BlcmF0aXZlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG5nT25Jbml0KCkge1xyXG4gICAgICAgIGlmKExTLmdldEl0ZW0oJ215Y2FydHByb2R1Y3RzJykpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmNhcnRQcm9kdWN0cyA9IFtdO1xyXG4gICAgICAgICAgICB2YXIgbXljYXJ0cHJvZHVjdHMgPSBMUy5nZXRJdGVtKCdteWNhcnRwcm9kdWN0cycpO1xyXG4gICAgICAgICAgICBteWNhcnRwcm9kdWN0cy5mb3JFYWNoKCAoZWxlbWVudCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgaWYoZWxlbWVudC5pc1NlbGVjdGVkKVxyXG4gICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiUHJvZHVjdCBJbWFnZSBcIiArIGVsZW1lbnQucHJvZHVjdEltYWdlKVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2FydFByb2R1Y3RzLnB1c2goZWxlbWVudCk7XHJcbiAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcblxyXG4gICAgICAgICAgICAvL3RoaXMuY2FydFByb2R1Y3RzID0gbXljYXJ0cHJvZHVjdHM7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmdldFRvdGFsV2VpZ2h0KCk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFyIGRhdGFPYmplY3QgPSBKU09OLnBhcnNlKExTLmdldEl0ZW0oJ2N1cnJlbnRVc2VyJykpO1xyXG5cclxuICAgICAgIFxyXG5cclxuICAgICAgICBjb25zb2xlLmxvZyhcIlVzZXIgSUQgXCIgKyBkYXRhT2JqZWN0Ll9pZCk7XHJcbiAgICAgICAgICBpZihkYXRhT2JqZWN0Ll9pZClcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgICB0aGlzLnVzZXJJZCA9IGRhdGFPYmplY3QuX2lkO1xyXG4gICAgICAgICAgICAgIHRoaXMuY29vcGVySWQgPSBkYXRhT2JqZWN0LmNvb3BlcklkO1xyXG4gICAgICAgICAgICAgXHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgfVxyXG4gICAgcHVibGljIHJlZ2lzdGVyKCkge1xyXG4gICAgICAgIC8vIGlmKHRoaXMuaW5wdXQuZmlyc3RuYW1lICYmIHRoaXMuaW5wdXQubGFzdG5hbWUgJiYgdGhpcy5pbnB1dC5lbWFpbCAmJiB0aGlzLmlucHV0LnBhc3N3b3JkKSB7XHJcbiAgICAgICAgLy8gICAgIEFwcGxpY2F0aW9uU2V0dGluZ3Muc2V0U3RyaW5nKFwiYWNjb3VudFwiLCBKU09OLnN0cmluZ2lmeSh0aGlzLmlucHV0KSk7XHJcbiAgICAgICAgLy8gICAgIHRoaXMubG9jYXRpb24uYmFjaygpO1xyXG4gICAgICAgIC8vIH0gZWxzZSB7XHJcbiAgICAgICAgLy8gICAgIChuZXcgU25hY2tCYXIoKSkuc2ltcGxlKFwiQWxsIEZpZWxkcyBSZXF1aXJlZCFcIik7XHJcbiAgICAgICAgLy8gfVxyXG5cclxuICAgICAgICBjb25zb2xlLmxvZyhcIlJlYWNoaW5nIFJlZ2lzdGVyIFwiKTtcclxuXHJcbiAgICAgICAgdGhpcy5nZXRDb29wZXJhdGl2ZVN0YWZmKHRoaXMuc3RhZmZJZCwgdGhpcy5zZWxlY3RlZENvb3BlcmF0aXZlKTtcclxuICAgIH1cclxuXHJcbiAgICBvbk5hdkJ0blRhcCgpIHtcclxuICAgICAgICAvLyBUaGlzIGNvZGUgd2lsbCBiZSBjYWxsZWQgb25seSBpbiBBbmRyb2lkLlxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiTmF2aWdhdGlvbiBidXR0b24gdGFwcGVkIVwiKTtcclxuICAgIH1cclxuXHJcbiAgICBcclxuICAgIHJlbW92ZWZyb21DYXJ0KCBwcm9kdWN0Q2hlY2tlZDpQcm9kdWN0Q2FydClcclxuICAgIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIlNlbGVjdGVkIFByb2R1Y3QgRGVsZXRlIFwiICsgcHJvZHVjdENoZWNrZWQgKTtcclxuICAgICAgVE5TRmFuY3lBbGVydC5zaG93V2FybmluZyhcIldhcm5pbmchXCIsIFwiQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIGRlbGV0ZSB0aGlzIGl0ZW0/XCIsIFwiT2tcIikgLnRoZW4oICgpID0+IHsgLyogdXNlciBwcmVzc2VkIHRoZSBidXR0b24gKi9cclxuICAgICAgICAgICBjb25zb2xlLmxvZyhcImRlbGV0ZSBhcHByb3ZlZCBcIisgcHJvZHVjdENoZWNrZWQpXHJcbiAgICAgICAgICB2YXIgaW5kZXggPSB0aGlzLmNhcnRQcm9kdWN0cy5pbmRleE9mKHByb2R1Y3RDaGVja2VkLCAwKTtcclxuICAgICAgICAgIGlmIChpbmRleCA+IC0xKSB7XHJcbiAgICAgICAgICAgICAgdGhpcy5jYXJ0UHJvZHVjdHMuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBMUy5yZW1vdmVJdGVtKCdteWNhcnRwcm9kdWN0cycpO1xyXG5cclxuICAgICAgTFMuc2V0SXRlbSgnbXljYXJ0cHJvZHVjdHMnLHRoaXMuY2FydFByb2R1Y3RzKTtcclxuXHJcbiAgICAgICAgICAvL3RoaXMuZ2V0VG90YWxXZWlnaHQoKTtcclxuICAgICAgXHJcbiAgICAgIH0pO1xyXG5cclxuXHJcbiAgICAgXHJcblxyXG4gICAgIFxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnb0JhY2soKSB7XHJcbiAgICAgICAgdGhpcy5sb2NhdGlvbi5iYWNrKCk7XHJcbiAgICB9XHJcbiAgICBzdGFydEJhY2tncm91bmRBbmltYXRpb24oYmFja2dyb3VuZCkge1xyXG4gICAgICAgIGJhY2tncm91bmQuYW5pbWF0ZSh7XHJcbiAgICAgICAgICAgIHNjYWxlOiB7IHg6IDEuMCwgeTogMS4wIH0sXHJcbiAgICAgICAgICAgIGR1cmF0aW9uOiAxMDAwMFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwdWJsaWMgb25xdHljaGFuZ2UoYXJnczogU2VsZWN0ZWRJbmRleENoYW5nZWRFdmVudERhdGEscHJvZHVjdENoZWNrZWQ6UHJvZHVjdENhcnQpIHtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhgRHJvcCBEb3duIHNlbGVjdGVkIGluZGV4IGNoYW5nZWQgICR7YXJncy5vbGRJbmRleH0gdG8gJHthcmdzLm5ld0luZGV4fS4gTmV3IHZhbHVlIGlzIFwiJHt0aGlzLnNlc3Npb25pdGVtcy5nZXRWYWx1ZShcclxuICAgICAgICAvLyAgICAgYXJncy5uZXdJbmRleCl9XCJgKTtcclxuXHJcbiAgICAgICAgY29uc29sZS5sb2coXCJTZWxlY3RlZCBJRCBcIiArIGFyZ3MubmV3SW5kZXgpO1xyXG4gICAgICAgIC8vdGhpcy5zZWxlY3RlZENvb3BlcmF0aXZlID0gdGhpcy5wcm9kdWN0Q2hlY2tlZC5xdHlMaXN0LmdldFZhbHVlKGFyZ3MubmV3SW5kZXgpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiU2VsZWN0ZWQgSWQgVmFsdWUgIFwiICsgcHJvZHVjdENoZWNrZWQucXR5TGlzdC5nZXRWYWx1ZShhcmdzLm5ld0luZGV4KSk7XHJcbiAgICAgICAgbGV0IG5ld3F0eSA9ICtwcm9kdWN0Q2hlY2tlZC5xdHlMaXN0LmdldFZhbHVlKGFyZ3MubmV3SW5kZXgpO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBwcm9kdWN0IG9mIHRoaXMuY2FydFByb2R1Y3RzKSB7XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHByb2R1Y3QpOyAvLyAxLCBcInN0cmluZ1wiLCBmYWxzZVxyXG5cclxuICAgICAgICAgICAgaWYocHJvZHVjdENoZWNrZWQuX2lkID09IHByb2R1Y3QuX2lkKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBwcm9kdWN0LnF0eSA9IG5ld3F0eTtcclxuICAgICAgICAgICAgICAgIHByb2R1Y3QuYW1vdW50ID0gcHJvZHVjdC5wcmljZSAqIG5ld3F0eTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgIFxyXG4gICAgICAgICB9XHJcbiAgICAgICAgIFxyXG4gICAgICAgICB0aGlzLmdldFRvdGFsV2VpZ2h0KCk7XHJcblxyXG5cclxuICAgIH1cclxuXHJcblxyXG4gICAgZ2V0VG90YWxXZWlnaHQoKTogbnVtYmVyIHtcclxuICAgICAgICB2YXIgdG90YWwgPSAwO1xyXG4gICAgICAgIHZhciBzZWxlY3RlZENvdW50ID0gMDtcclxuICAgICAgICBpZiAodGhpcy5jYXJ0UHJvZHVjdHMgIT0gbnVsbCAmJiB0aGlzLmNhcnRQcm9kdWN0cy5sZW5ndGggPiAwKSB7ICAgICAgXHJcbiAgICAgICAgICB0aGlzLmNhcnRQcm9kdWN0cy5mb3JFYWNoKHggPT4ge1xyXG4gICAgICAgICAgICAgIGlmKHguaXNTZWxlY3RlZClcclxuICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0b3RhbCArPSB4LmFtb3VudDtcclxuICAgICAgICAgICAgICAgIHNlbGVjdGVkQ291bnQgKz0gMTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMudG90YWxTZWxlY3RlZEFtb3VudCA9IHRvdGFsO1xyXG4gICAgICAgIHRoaXMudG90YWxTZWxlY3RlZEl0ZW0gPSBzZWxlY3RlZENvdW50O1xyXG4gICAgICAgIC8vIGlmKHRoaXMuY2FydFByb2R1Y3RzLmxlbmd0aCA9PSBzZWxlY3RlZENvdW50IClcclxuICAgICAgICAvLyB7XHJcbiAgICAgICAgLy8gICAgIHRoaXMuaXNTZWxlY3RBbGwgPSB0cnVlO1xyXG4gICAgICAgIC8vIH1lbHNle1xyXG4gICAgICAgIC8vICAgICB0aGlzLmlzU2VsZWN0QWxsID0gZmFsc2U7XHJcbiAgICAgICAgLy8gfVxyXG5cclxuICAgICAgICBMUy5yZW1vdmVJdGVtKCdteWNhcnRwcm9kdWN0cycpO1xyXG5cclxuICAgICAgICBMUy5zZXRJdGVtKCdteWNhcnRwcm9kdWN0cycsdGhpcy5jYXJ0UHJvZHVjdHMpO1xyXG4gICAgICAgIHJldHVybiB0b3RhbDtcclxuICAgICAgfSAgXHJcblxyXG5cclxuICAgIHB1YmxpYyBvbmNvb3BlcmF0aXZlY2hhbmdlKGFyZ3M6IFNlbGVjdGVkSW5kZXhDaGFuZ2VkRXZlbnREYXRhKSB7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coYERyb3AgRG93biBzZWxlY3RlZCBpbmRleCBjaGFuZ2VkICAke2FyZ3Mub2xkSW5kZXh9IHRvICR7YXJncy5uZXdJbmRleH0uIE5ldyB2YWx1ZSBpcyBcIiR7dGhpcy5zZXNzaW9uaXRlbXMuZ2V0VmFsdWUoXHJcbiAgICAgICAgLy8gICAgIGFyZ3MubmV3SW5kZXgpfVwiYCk7XHJcblxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiU2VsZWN0ZWQgSUQgXCIgKyBhcmdzLm5ld0luZGV4KTtcclxuICAgICAgICB0aGlzLnNlbGVjdGVkQ29vcGVyYXRpdmUgPSB0aGlzLmNvb3BlcmF0aXZlTGlzdC5nZXRWYWx1ZShhcmdzLm5ld0luZGV4KTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIlNlbGVjdGVkIElkIFZhbHVlICBcIiArIHRoaXMuc2VsZWN0ZWRDb29wZXJhdGl2ZSk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGdldENvb3BlcmF0aXZlKCkge1xyXG4gICAgICAgIHRoaXMuY29vcGVyYXRpdmVTZXJ2aWNlLmdldEFsbENvb3BlcmF0aXZlKCkuc3Vic2NyaWJlKFxyXG4gICAgICAgICAgICBkYXRhID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQ29vcGVyYXRpdmUgTGlzdCBcIiArIEpTT04uc3RyaW5naWZ5KGRhdGFbXCJkYXRhXCJdKSk7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5jb29wZXJhdGl2ZSA9IGRhdGFbXCJkYXRhXCJdO1xyXG5cclxuICAgICAgICAgICAgIHRoaXMuZ2V0QWxsQ29vcGVyYXRpdmVzQXNzaWduZWQodGhpcy5jb29wZXJJZCk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGVyciA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0Q29vcGVyYXRpdmVTdGFmZihzdGFmZklkOiBTdHJpbmcsIGNvb3BlcmF0aXZlSWQ6IFN0cmluZykge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiU3RhZmYgYW5kIENvb3BlcmF0aXZlSWQgXCIgKyBzdGFmZklkICsgXCIgLSBcIiArIGNvb3BlcmF0aXZlSWQpO1xyXG5cclxuXHJcbiAgICAgICAgdGhpcy5jb29wZXJhdGl2ZVN0YWZmU2VydmljZS5nZXRDb29wZXJhdGl2ZVN0YWZmKHN0YWZmSWQsIGNvb3BlcmF0aXZlSWQpLnN1YnNjcmliZShcclxuICAgICAgICAgICAgZGF0YSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkNvb3BlcmF0aXZlIFN0YWZmIFwiICsgSlNPTi5zdHJpbmdpZnkoZGF0YVtcImRhdGFcIl0pKTtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvb3BlcmF0aXZlU3RhZmYgPSBkYXRhW1wiZGF0YVwiXTtcclxuXHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlZlcmlmeWluZyBTdGFmZiBvdXQgc2lkZSBcIiArIHRoaXMuY29vcGVyYXRpdmVTdGFmZi5zdGFmZklkKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2VuZFZlcmlmeUF1dGgodGhpcy5jb29wZXJhdGl2ZVN0YWZmKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZXJyID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgZ2V0QWxsQ29vcGVyYXRpdmVzQXNzaWduZWQoY29vcGVySWQ6IFN0cmluZykge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiU3RhZmYgYW5kIENvb3BlcmF0aXZlSWQgXCIgKyBjb29wZXJJZCApO1xyXG5cclxuXHJcbiAgICAgICAgdGhpcy5jb29wZXJDb29wZXJhdGl2ZVNlcnZpY2UuZ2V0QWxsQ29vcGVyYXRpdmVzQ29vcGVyKGNvb3BlcklkKS5zdWJzY3JpYmUoXHJcbiAgICAgICAgICAgIGRhdGEgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJBc3NpZ25lZCBDb29wZXJhdGl2ZSBcIiArIGRhdGFbXCJkYXRhXCJdKTtcclxuXHJcbiAgICAgICAgICAgICAgIHRoaXMuYXNzaWduZWRjb29wZXJhdGl2ZXMgPSBkYXRhW1wiZGF0YVwiXTtcclxuXHJcbiAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICB0aGlzLmNvb3BlcmF0aXZlTGlzdCA9IG5ldyBWYWx1ZUxpc3Q8c3RyaW5nPigpO1xyXG4gICAgICAgICAgICAvLyAgICBmb3IgKGxldCBsb29wID0gMDsgbG9vcCA8IHRoaXMuY29vcGVyYXRpdmUubGVuZ3RoOyBsb29wKyspIHtcclxuICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvLyAgICB9XHJcblxyXG4gICAgICAgICAgICAgICBmb3IgKGxldCBsb29wID0gMDsgbG9vcCA8IHRoaXMuY29vcGVyYXRpdmUubGVuZ3RoOyBsb29wKyspIHtcclxuICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFzc2lnbmVkY29vcGVyYXRpdmVzLmZvckVhY2goKGVsZW1lbnQpPT57XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHRoaXMuY29vcGVyYXRpdmVbbG9vcF0uY29vcGVyYXRpdmVJZCA9PSBlbGVtZW50LmNvb3BlcmF0aXZlSWQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29vcGVyYXRpdmVMaXN0LnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogYCR7dGhpcy5jb29wZXJhdGl2ZVtsb29wXS5jb29wZXJhdGl2ZUlkfWAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6IGAke3RoaXMuY29vcGVyYXRpdmVbbG9vcF0uZmlyc3RfbmFtZX1gLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmKHRoaXMuYXNzaWduZWRjb29wZXJhdGl2ZXMubGVuZ3RoID09IDEpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkQ29vcGVyYXRpdmUgPSB0aGlzLmFzc2lnbmVkY29vcGVyYXRpdmVzWzBdLmNvb3BlcmF0aXZlSWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YWZmSWQgPSB0aGlzLmFzc2lnbmVkY29vcGVyYXRpdmVzWzBdLnN0YWZmSWQ7XHJcbiAgICAgICAgICAgICAgXHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGVyciA9PiB7XHJcbiAgICAgICAgICAgICAgICBUTlNGYW5jeUFsZXJ0LnNob3dFcnJvcihcIkVycm9yIVwiLCBlcnIuZXJyb3IubWVzc2FnZSwgXCJPa1wiKTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgc2VuZFZlcmlmeUF1dGgodmVyaWZ5QXV0aDogQ29vcGVyYXRpdmVTdGFmZikge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiVmVyaWZ5IFwiICsgdmVyaWZ5QXV0aC5zdGFmZklkKTtcclxuXHJcblxyXG4gICAgICAgIHRoaXMuY29vcGVyYXRpdmVTdGFmZlNlcnZpY2UudmVyaWZ5QXV0aFRvQ3JlYXRMYXRlcih2ZXJpZnlBdXRoKS5zdWJzY3JpYmUoXHJcbiAgICAgICAgICAgIGRhdGEgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJWZXJ5IEF1dGggXCIgKyBKU09OLnN0cmluZ2lmeShkYXRhW1wiZGF0YVwiXSkpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBlcnIgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuXHJcblxyXG5cclxuXHJcbiAgICBwYXkoKXtcclxuXHJcbiAgICAgICAgaWYodGhpcy5zZWxlY3RlZENvb3BlcmF0aXZlID09IFwiXCIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICBUTlNGYW5jeUFsZXJ0LnNob3dFcnJvcihcIkVycm9yIVwiLCBcIlBsZWFzZSBTZWxlY3QgYSBDb29wZXJhdGl2ZSB0byBjb250aW51ZVwiLCBcIk9rXCIpO1xyXG4gICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBvcHRpb25zID0ge1xyXG4gICAgICAgICAgICB0aXRsZTogXCJUcmFuc2FjdGlvbiBQSU5cIixcclxuICAgICAgICAgICAgZGVmYXVsdFRleHQ6IFwiXCIsXHJcbiAgICAgICAgICAgIGlucHV0VHlwZTogaW5wdXRUeXBlLnBhc3N3b3JkLFxyXG4gICAgICAgICAgICBva0J1dHRvblRleHQ6IFwiQ29uZmlybVwiLFxyXG4gICAgICAgICAgICBjYW5jZWxCdXR0b25UZXh0OiBcIkNhbmNlbFwiXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgcHJvbXB0KG9wdGlvbnMpLnRoZW4oKHJlc3VsdDogUHJvbXB0UmVzdWx0KSA9PiB7XHJcblxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkhlbGxvLCBcIiArIHJlc3VsdC50ZXh0KTtcclxuXHJcblxyXG4gICAgICAgICAgICB0aGlzLmNoZWNrVXNlclBJbih0aGlzLnVzZXJJZCxyZXN1bHQudGV4dCk7XHJcblxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIlNlbGVjdGVkIElkIFZhbHVlICBcIiArIHRoaXMuc2VsZWN0ZWRDb29wZXJhdGl2ZSk7XHJcblxyXG5cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgZGlzcGxheVByb21wdERpYWxvZygpIHtcclxuICAgICAgICAvLyA+PiBwcm9tcHQtZGlhbG9nLWNvZGVcclxuICAgICAgIFxyXG4gICAgICAgIC8vIDw8IHByb21wdC1kaWFsb2ctY29kZVxyXG4gICAgfVxyXG5cclxuICAgIHJlZHVjZVByb2R1Y3QocHJvZHVjdElkOiBTdHJpbmcscXVhbnRpdHkgOiBTdHJpbmcsIGJhdGNoTm86IFN0cmluZyxjb29wZXJJZDpTdHJpbmcsY29vcGVyYXRpdmVJZDpTdHJpbmcsc3RhZmZJZDogU3RyaW5nLHRyYW5zQW1vdW50OiBTdHJpbmcgKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJWZXJpZnkgXCIgKyBwcm9kdWN0SWQpO1xyXG5cclxuXHJcbiAgICAgICAgdGhpcy5wcm9kdWN0U2VydmljZS5kZWR1Y3RQcm9kdWN0KHByb2R1Y3RJZCxxdWFudGl0eSxiYXRjaE5vLGNvb3BlcklkLGNvb3BlcmF0aXZlSWQsc3RhZmZJZCx0cmFuc0Ftb3VudCkuc3Vic2NyaWJlKFxyXG4gICAgICAgICAgICBkYXRhID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiUHJvZHVjdCBcIiArIEpTT04uc3RyaW5naWZ5KGRhdGFbXCJkYXRhXCJdKSk7XHJcblxyXG4gICAgICAgICAgICAgICBcclxuXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGVyciA9PiB7XHJcbiAgICAgICAgICAgICAgICBUTlNGYW5jeUFsZXJ0LnNob3dFcnJvcihcIkVycm9yIVwiLCBlcnIuZXJyb3IubWVzc2FnZSwgXCJPa1wiKTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgIFxyXG4gICAgcmVkdWNlU3RhZmZBY2NvdW50KGNvb3BlcmF0aXZlSWQ6IFN0cmluZyxzdGFmZklkIDogU3RyaW5nLCBhbW91bnQ6IFN0cmluZykge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiQ29vcGVyYXRpdmUgSWQgXCIgKyBjb29wZXJhdGl2ZUlkKTtcclxuXHJcblxyXG4gICAgICAgIHRoaXMuY29vcGVyYXRpdmVTdGFmZkFjY291bnRTZXJ2aWNlLmRlZHVjdENvb3BlcmF0aXZlQWNjb3VudChjb29wZXJhdGl2ZUlkLHN0YWZmSWQsYW1vdW50LFwiU2F2aW5nc1wiKS5zdWJzY3JpYmUoXHJcbiAgICAgICAgICAgIGRhdGEgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJTdGFmZiBBY2NvdW50IFwiICsgSlNPTi5zdHJpbmdpZnkoZGF0YVtcImRhdGFcIl0pKTtcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgLy9HZW5lcmF0ZSBCYXRjaCBObyA2IERpZ2l0XHJcbiAgICAgICAgICAgICAgIC8vIGxldCBiYXRjaE5vID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKTtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgYmF0Y2hObyA9IE1hdGguZmxvb3IoMTAwMDAwICsgTWF0aC5yYW5kb20oKSAqIDkwMDAwMClcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLmNhcnRQcm9kdWN0cy5mb3JFYWNoKChlbGVtZW50KSA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVkdWNlUHJvZHVjdChlbGVtZW50Ll9pZCxlbGVtZW50LnF0eS50b1N0cmluZygpLGJhdGNoTm8udG9TdHJpbmcoKSx0aGlzLmNvb3BlcklkLHRoaXMuc2VsZWN0ZWRDb29wZXJhdGl2ZSx0aGlzLnN0YWZmSWQsZWxlbWVudC5hbW91bnQudG9TdHJpbmcoKSk7XHJcblxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gZW1wdHkgQ2FydCBcclxuXHJcbiAgICAgICAgICAgICAgICBMUy5yZW1vdmVJdGVtKCdteWNhcnRwcm9kdWN0cycpO1xyXG5cclxuICAgICAgICAgICAgICAgICB0aGlzLmNhcnRQcm9kdWN0cyA9IFtdO1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgVE5TRmFuY3lBbGVydC5zaG93U3VjY2VzcyhcIlN1Y2Nlc3MhXCIsIFwiIFlvdXIgdHJhbnNhY3Rpb24gd2FzIHN1Y2Nlc3NmdWxcIiwgXCJPa1wiKVxyXG4gICAgICAgICAgICAgICAgIC50aGVuKCAoKSA9PiB7IC8qIHVzZXIgcHJlc3NlZCB0aGUgYnV0dG9uICovXHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbXCIvXCJdKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIC8vIFJlZGlyZWN0IHRvIEhvbWVcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICBcclxuXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGVyciA9PiB7XHJcbiAgICAgICAgICAgICAgICBUTlNGYW5jeUFsZXJ0LnNob3dFcnJvcihcIkVycm9yIVwiLCBlcnIuZXJyb3IubWVzc2FnZSwgXCJPa1wiKTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcblxyXG5cclxuICAgIGNoZWNrVXNlclBJbih1c2VySWQ6IFN0cmluZywgcGluOiBTdHJpbmcpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIlZlcmlmeSBcIiArIHVzZXJJZCk7XHJcblxyXG5cclxuICAgICAgICB0aGlzLmF1dGhTZXJ2aWNlLmNoZWNrVHJhbnNQaW4odXNlcklkLHBpbikuc3Vic2NyaWJlKFxyXG4gICAgICAgICAgICBkYXRhID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiVXNlciBGb3VuZCBcIiArIEpTT04uc3RyaW5naWZ5KGRhdGFbXCJkYXRhXCJdKSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgaWYodGhpcy5zZWxlY3RlZENvb3BlcmF0aXZlID09IFwiXCIpXHJcbiAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgVE5TRmFuY3lBbGVydC5zaG93RXJyb3IoXCJFcnJvciFcIiwgXCJQbGVhc2UgU2VsZWN0IGEgQ29vcGVyYXRpdmUgdG8gY29udGludWVcIiwgXCJPa1wiKTtcclxuICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZWR1Y2VTdGFmZkFjY291bnQodGhpcy5zZWxlY3RlZENvb3BlcmF0aXZlLHRoaXMuc3RhZmZJZCx0aGlzLnRvdGFsU2VsZWN0ZWRBbW91bnQudG9TdHJpbmcoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgIFxyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vICBcclxuICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGVyciA9PiB7XHJcbiAgICAgICAgICAgICAgICBUTlNGYW5jeUFsZXJ0LnNob3dFcnJvcihcIkVycm9yIVwiLCBlcnIuZXJyb3IubWVzc2FnZSwgXCJPa1wiKTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBuYXZpZ2F0ZUJhY2soKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJHbyBCYWNrIEJ1dHRvbiBDbGlja2VkXCIgKTtcclxuICAgICAgICB0aGlzLnJvdXRlckV4dGVuc2lvbnMuYmFja1RvUHJldmlvdXNQYWdlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgb25Ub3VjaChhcmdzOiBUb3VjaEdlc3R1cmVFdmVudERhdGEpIHtcclxuXHJcbiAgICAgICAgY29uc29sZS5sb2coXCJQYWdlIGlzIHRvdWNoZWRcIik7XHJcbiAgICAgICB0aGlzLmF1dG9Mb2dvdXRTZXJ2aWNlLnJlc2V0KCk7XHJcbiAgICB9XHJcblxyXG59Il19