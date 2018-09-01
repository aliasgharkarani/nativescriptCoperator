"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var router_2 = require("nativescript-angular/router");
var common_1 = require("@angular/common");
var nativescript_drop_down_1 = require("nativescript-drop-down");
var cooperative_service_1 = require("../../services/cooperative.service");
var cooperativeStaff_service_1 = require("../../services/cooperativeStaff.service");
var product_service_1 = require("../../services/product.service");
var config_1 = require("../../shared/config");
var LS = require("nativescript-localstorage");
var dialogs = require("ui/dialogs");
var autologout_service_1 = require("../../services/autologout.service");
var BuyComponent = /** @class */ (function () {
    function BuyComponent(location, cooperativeService, cooperativeStaffService, productService, router, activatedRoute, _changeDetectionRef, zone, routerExtensions, autoLogoutService) {
        this.location = location;
        this.cooperativeService = cooperativeService;
        this.cooperativeStaffService = cooperativeStaffService;
        this.productService = productService;
        this.router = router;
        this.activatedRoute = activatedRoute;
        this._changeDetectionRef = _changeDetectionRef;
        this.zone = zone;
        this.routerExtensions = routerExtensions;
        this.autoLogoutService = autoLogoutService;
        this.productImageUrl = config_1.Config.productImageURL;
        this.cooperative = [];
        this.hint = " 1";
        this.cssClass = "default";
        this.likedThisProduct = false;
        this.likeLabelClass = "fa notlike";
        this.myLikeCount = 0;
        this.likeTotalCount = 0;
        this.canViewDetails = false;
        this.cartProducts = [];
        this.notification = "You can access your personal offer, updates and price drop here";
        this.images = [];
    }
    BuyComponent.prototype.ngOnInit = function () {
        this.productId = this.activatedRoute.snapshot.params["id"];
        var dataObject = JSON.parse(LS.getItem('currentUser'));
        if (dataObject._id) {
            this.userId = dataObject._id;
            this.cooperId = dataObject.cooperId;
        }
        this.getProductById(this.productId, this.userId);
        //console.log("Current URL " + this.router.url);
    };
    BuyComponent.prototype.ngOnDestroy = function () {
        //this.sendLikeToDB();
        // this.router.navigate(["/"]);
    };
    BuyComponent.prototype.register = function () {
        // if(this.input.firstname && this.input.lastname && this.input.email && this.input.password) {
        //     ApplicationSettings.setString("account", JSON.stringify(this.input));
        //     this.location.back();
        // } else {
        //     (new SnackBar()).simple("All Fields Required!");
        // }
        console.log("Reaching Register ");
        this.getCooperativeStaff(this.staffId, this.selectedCooperative);
    };
    BuyComponent.prototype.onNavBtnTap = function () {
        // This code will be called only in Android.
        console.log("Navigation button tapped!");
    };
    BuyComponent.prototype.goBack = function () {
        this.location.back();
        //this.router.navigate(["/]"]);
    };
    BuyComponent.prototype.startBackgroundAnimation = function (background) {
        background.animate({
            scale: { x: 1.0, y: 1.0 },
            duration: 10000
        });
    };
    BuyComponent.prototype.addToCart = function () {
        // let buttons = [
        //     new TNSFancyAlertButton({ label: 'Continue Shopping', action: () => { console.log('One'); } }),
        //     new TNSFancyAlertButton({ label: 'Proceed to Checkout', action: () => { console.log('Two'); } })
        var _this = this;
        //   ];
        if (LS.getItem('mycartproducts')) {
            this.cartProducts = [];
            var mycartproducts2 = LS.getItem('mycartproducts');
            console.log("Product Id " + this.product._id);
            var mycartproducts = mycartproducts2;
            console.log("Cart Count " + mycartproducts.length);
            var mainlength = mycartproducts.length;
            var itemExist_1 = false;
            mycartproducts.forEach(function (element) {
                var newProduct = element;
                if (_this.product == element) {
                    element.qty += 1;
                    element.amount = element.price * element.qty;
                    element.isSelected = false;
                    element.selectedQtyIndex = newProduct.qty - 1;
                    itemExist_1 = true;
                }
            });
            if (!itemExist_1) {
                this.product.qty = 1;
                console.log("Qty When New " + this.product.qty);
                //console.log("New Qty " + this.product.qty);
                this.product.isSelected = false;
                this.product.amount = this.product.price;
                this.product.selectedQtyIndex = this.product.qty - 1;
                this.product.qtyList = new nativescript_drop_down_1.ValueList();
                for (var loop = 0; loop < this.product.quantity; loop++) {
                    if (loop > 0) {
                        this.product.qtyList.push({
                            value: loop.toString(),
                            display: loop.toString(),
                        });
                    }
                }
                mycartproducts.push(this.product);
            }
            this.cartProducts = mycartproducts;
            LS.removeItem('mycartproducts');
            LS.setItem('mycartproducts', this.cartProducts);
            //  console.log("Qty Array " + this.product.qtyList);
            //  TNSFancyAlert.showSuccess("Success!", this.product.productName + " was successfully added", "Ok")
            //  .then( () => { /* user pressed the button */
            // });
            var parentContext_1 = this;
            dialogs.confirm({
                title: "Success",
                message: " \"A new Item has been added to your shopping cart. You now have " + this.cartProducts.length + " item(s) in your shopping cart\"",
                okButtonText: "Proceed to Checkout",
                cancelButtonText: "Continue Shopping"
            }).then(function (result) {
                // result argument is boolean
                console.log("Dialog result for shopping:   " + result);
                if (result) {
                    //Go to Cart
                    parentContext_1.router.navigate(["/mycart"]);
                }
                else {
                    // Continuing Shopping
                    parentContext_1.router.navigate(["/shop"]);
                }
            });
        }
        else {
            console.log("Cart is empty");
            this.product.qty = 1;
            this.product.isSelected = false;
            this.product.amount = this.product.price;
            this.product.selectedQtyIndex = this.product.qty - 1;
            this.product.qtyList = new nativescript_drop_down_1.ValueList();
            for (var loop = 0; loop < this.product.quantity; loop++) {
                if (loop > 0) {
                    this.product.qtyList.push({
                        value: loop.toString(),
                        display: loop.toString(),
                    });
                }
            }
            // console.log("Qty Array when empty " + JSON.stringify(this.product.qtyList));
            //  TNSFancyAlert.showSuccess("Success!", this.product.productName + " was successfully added", "Ok")
            //  .then( () => { /* user pressed the button */
            // });
            this.cartProducts.push(this.product);
            LS.setItem('mycartproducts', this.cartProducts);
            var parentContext_2 = this;
            dialogs.confirm({
                title: "Success",
                message: "\"A new Item has been added to your shopping cart. You now have " + this.cartProducts.length + " item(s) in your shopping cart\"",
                okButtonText: "Proceed to Checkout",
                cancelButtonText: "Continue Shopping"
            }).then(function (result) {
                // result argument is boolean
                console.log("Dialog result: " + result);
                if (result) {
                    //Go to Cart
                    // this.router.navigate(["/mycart"]);
                    parentContext_2.router.navigate(["/mycart"]);
                }
                else {
                    // Continuing Shopping
                    // this.router.navigate(["/shop"]);
                    parentContext_2.router.navigate(["/shop"]);
                }
            });
            //     TNSFancyAlert.showSuccess("Success!", this.product.productName + " was successfully added", "Ok")
            //     .then( () => { /* user pressed the button */
            //    });
            //  TNSFancyAlert.showCustomButtons(buttons, undefined, undefined, 'Success!', `A new item has been added to your shopping cart. You now have 1 item(s) in your shopping cart`, 'Ok');
        }
        //
    };
    BuyComponent.prototype.findIndexToUpdate = function (newItem) {
        return newItem.id === this;
    };
    BuyComponent.prototype.oncooperativechange = function (args) {
        // console.log(`Drop Down selected index changed  ${args.oldIndex} to ${args.newIndex}. New value is "${this.sessionitems.getValue(
        //     args.newIndex)}"`);
        console.log("Selected ID " + args.newIndex);
        this.selectedCooperative = this.cooperativeList.getValue(args.newIndex);
        console.log("Selected Id Value  " + this.selectedCooperative);
    };
    BuyComponent.prototype.getCooperative = function () {
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
    BuyComponent.prototype.getCooperativeStaff = function (staffId, cooperativeId) {
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
    BuyComponent.prototype.sendVerifyAuth = function (verifyAuth) {
        console.log("Verify " + verifyAuth.staffId);
        this.cooperativeStaffService.verifyAuthToCreatLater(verifyAuth).subscribe(function (data) {
            console.log("Very Auth " + JSON.stringify(data["data"]));
        }, function (err) {
            console.log(err);
        });
    };
    BuyComponent.prototype.getProductById = function (productId, userId) {
        var _this = this;
        console.log("Product Id Buy" + productId);
        this.product = null;
        this.productService.getproduct(productId, userId).subscribe(function (data) {
            // console.log("Single Product " + JSON.stringify(data["data"]));
            _this.product = data["data"];
            if (_this.product.likesCount) {
            }
            else {
                _this.product.likesCount = 0;
            }
            var checkIfLikeExist = _this.product.likes.filter(function (n) { return n.cooperId === _this.cooperId; });
            if (checkIfLikeExist.length > 0) {
                _this.likedThisProduct = true;
                _this.likeLabelClass = "fa like";
                _this.likeTotalCount = _this.product.likesCount;
            }
            else {
                _this.likedThisProduct = false;
                _this.likeLabelClass = "fa notlike";
                _this.likeTotalCount = _this.product.likesCount;
            }
        }, function (err) {
            console.log(err);
        });
    };
    BuyComponent.prototype.sendLikeToDB = function () {
        var _this = this;
        if (this.likedThisProduct) {
            this.productService.likeProducts(this.product._id, this.product.productId, this.product.likes).subscribe(function (data) {
                // console.log("Single Product " + JSON.stringify(data["data"]));
                _this.product = null;
                _this.product = data["data"];
                // alert success
                //this._changeDetectionRef.detectChanges();
            }, function (err) {
                console.log(err);
            });
        }
        else {
            //remove for database
        }
    };
    BuyComponent.prototype.likeProduct = function () {
        var _this = this;
        this.likedThisProduct = !this.likedThisProduct;
        var checkIfLikeExist = this.product.likes.filter(function (n) { return n.cooperId === _this.cooperId; });
        if (this.likedThisProduct) {
            if (checkIfLikeExist.length === 0) {
                //this.product.likes.push({"cooperId":this.cooperId,"userId":this.userId,"user":this.userId,"dateCreated": new Date() })
                this.likeObject = { "cooperId": this.cooperId, "userId": this.userId, "user": this.userId, "dateCreated": new Date() };
                // this.product.likesCount +=1;
                this.likeTotalCount = this.product.likesCount + 1;
            }
            else {
                this.likeObject = checkIfLikeExist.find(function (n) { return n.cooperId === _this.cooperId; });
                this.likeTotalCount = this.product.likesCount;
            }
            this.likeLabelClass = "fa like";
        }
        else {
            this.likeLabelClass = "fa notlike";
            if (checkIfLikeExist.length === 0) {
                //this.product.likes.push({"cooperId":this.cooperId,"userId":this.userId,"user":this.userId,"dateCreated": new Date() })
                this.likeObject = { "cooperId": this.cooperId, "userId": this.userId, "user": this.userId, "dateCreated": new Date() };
                // this.product.likesCount +=1;
                if (this.product.likesCount > 0) {
                    this.likeTotalCount = this.product.likesCount - 1;
                }
                else {
                    this.likeTotalCount = this.product.likesCount;
                }
            }
            else {
                this.likeObject = checkIfLikeExist.find(function (n) { return n.cooperId === _this.cooperId; });
                if (this.product.likesCount > 0) {
                    this.likeTotalCount = this.product.likesCount - 1;
                }
                else {
                    this.likeTotalCount = this.product.likesCount;
                }
                this.likeObject = checkIfLikeExist.find(function (n) { return n.cooperId === _this.cooperId; });
            }
        }
        console.log("Product Id Buy" + this.product.likesCount);
    };
    BuyComponent.prototype.navigateBack = function () {
        console.log("Go Back Button Clicked");
        this.routerExtensions.backToPreviousPage();
        //this.router.navigate(["/"]);
    };
    BuyComponent.prototype.onTouch = function (args) {
        this.autoLogoutService.reset();
    };
    BuyComponent.prototype.viewMore = function () {
        this.canViewDetails = !this.canViewDetails;
    };
    BuyComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: "ns-buy",
            templateUrl: "./buy.component.html",
            styleUrls: ["./buy-common.css", "./buy.component.css"],
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
        }),
        __metadata("design:paramtypes", [common_1.Location, cooperative_service_1.CooperativeService, cooperativeStaff_service_1.CooperativeStaffService,
            product_service_1.ProductService, router_1.Router, router_1.ActivatedRoute,
            core_1.ChangeDetectorRef,
            core_1.NgZone, router_2.RouterExtensions, autologout_service_1.AutoLogoutService])
    ], BuyComponent);
    return BuyComponent;
}());
exports.BuyComponent = BuyComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnV5LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImJ1eS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMEo7QUFDMUosMENBQXlEO0FBR3pELHNEQUErRDtBQUMvRCwwQ0FBMkM7QUFhM0MsaUVBQTZEO0FBRzdELDBFQUF3RTtBQUN4RSxvRkFBa0Y7QUFDbEYsa0VBQWdFO0FBS2hFLDhDQUE2QztBQUM3QyxJQUFJLEVBQUUsR0FBRyxPQUFPLENBQUUsMkJBQTJCLENBQUUsQ0FBQztBQU1oRCxvQ0FBc0M7QUFFdEMsd0VBQXNFO0FBZXRFO0lBK0JJLHNCQUEyQixRQUFrQixFQUFVLGtCQUFzQyxFQUFVLHVCQUFnRCxFQUMvSSxjQUE2QixFQUFVLE1BQWMsRUFBVSxjQUE4QixFQUM3RixtQkFBc0MsRUFDdEMsSUFBWSxFQUFTLGdCQUFrQyxFQUFTLGlCQUFvQztRQUhqRixhQUFRLEdBQVIsUUFBUSxDQUFVO1FBQVUsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFvQjtRQUFVLDRCQUF1QixHQUF2Qix1QkFBdUIsQ0FBeUI7UUFDL0ksbUJBQWMsR0FBZCxjQUFjLENBQWU7UUFBVSxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQVUsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBQzdGLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBbUI7UUFDdEMsU0FBSSxHQUFKLElBQUksQ0FBUTtRQUFTLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFBUyxzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FBakM1RyxvQkFBZSxHQUFZLGVBQU0sQ0FBQyxlQUFlLENBQUM7UUFLbEQsZ0JBQVcsR0FBdUIsRUFBRSxDQUFDO1FBQ3JDLFNBQUksR0FBVyxJQUFJLENBQUM7UUFFYixhQUFRLEdBQVcsU0FBUyxDQUFDO1FBT3BDLHFCQUFnQixHQUFZLEtBQUssQ0FBQztRQUNsQyxtQkFBYyxHQUFHLFlBQVksQ0FBQztRQUU5QixnQkFB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Q0FBQyxpQkFBaUIsQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUNsQyxDQUFDO0lBRUQsK0JBQVEsR0FBUjtRQUNJLElBQUksQ0FBQyxjQUFjLEdBQUcsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDO0lBQy9DLENBQUM7SUFwaUJPLFlBQVk7UUFWeEIsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixRQUFRLEVBQUUsUUFBUTtZQUNsQixXQUFXLEVBQUUsc0JBQXNCO1lBQ25DLFNBQVMsRUFBRSxDQUFDLGtCQUFrQixFQUFFLHFCQUFxQixDQUFDO1lBQ3RELGVBQWUsRUFBRSw4QkFBdUIsQ0FBQyxNQUFNO1NBRWxELENBQUM7eUNBa0N1QyxpQkFBUSxFQUE4Qix3Q0FBa0IsRUFBbUMsa0RBQXVCO1lBQ2hJLGdDQUFjLEVBQWtCLGVBQU0sRUFBMEIsdUJBQWM7WUFDeEUsd0JBQWlCO1lBQ2hDLGFBQU0sRUFBMkIseUJBQWdCLEVBQTRCLHNDQUFpQjtPQWxDbkcsWUFBWSxDQXNpQnhCO0lBQUQsbUJBQUM7Q0FBQSxBQXRpQkQsSUFzaUJDO0FBdGlCWSxvQ0FBWSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBBZnRlclZpZXdJbml0LCAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksQ2hhbmdlRGV0ZWN0b3JSZWYsSW5wdXQsTmdab25lLFZpZXdDaGlsZCxFbGVtZW50UmVmLCBPbkRlc3Ryb3kgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBSb3V0ZXIsIEFjdGl2YXRlZFJvdXRlIH0gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xyXG5pbXBvcnQgKiBhcyBhcHBsaWNhdGlvbiBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9hcHBsaWNhdGlvblwiO1xyXG5cclxuaW1wb3J0IHsgUm91dGVyRXh0ZW5zaW9ucyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXJcIjtcclxuaW1wb3J0IHsgTG9jYXRpb24gfSBmcm9tIFwiQGFuZ3VsYXIvY29tbW9uXCI7XHJcbmltcG9ydCB7IFNuYWNrQmFyIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1zbmFja2JhclwiO1xyXG5pbXBvcnQgKiBhcyBBcHBsaWNhdGlvblNldHRpbmdzIGZyb20gXCJhcHBsaWNhdGlvbi1zZXR0aW5nc1wiO1xyXG5pbXBvcnQgeyBjb25uZWN0aW9uVHlwZSwgZ2V0Q29ubmVjdGlvblR5cGUgfSBmcm9tIFwiY29ubmVjdGl2aXR5XCI7XHJcbmltcG9ydCB7IEFuaW1hdGlvbiB9IGZyb20gXCJ1aS9hbmltYXRpb25cIjtcclxuaW1wb3J0IHsgVmlldyB9IGZyb20gXCJ1aS9jb3JlL3ZpZXdcIjtcclxuaW1wb3J0IHsgcHJvbXB0IH0gZnJvbSBcInVpL2RpYWxvZ3NcIjtcclxuaW1wb3J0IHsgUGFnZSB9IGZyb20gXCJ1aS9wYWdlXCI7XHJcbmltcG9ydCB7IFRleHRGaWVsZCB9IGZyb20gXCJ1aS90ZXh0LWZpZWxkXCI7XHJcbmltcG9ydCAqIGFzIHRleHRWaWV3TW9kdWxlIGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL3RleHQtdmlld1wiO1xyXG5cclxuXHJcblxyXG5pbXBvcnQgeyBWYWx1ZUxpc3QsIERyb3BEb3duIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1kcm9wLWRvd25cIjtcclxuaW1wb3J0IHsgU2VsZWN0ZWRJbmRleENoYW5nZWRFdmVudERhdGEgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWRyb3AtZG93blwiO1xyXG5pbXBvcnQgeyBDb29wZXJhdGl2ZSB9IGZyb20gJy4uLy4uL21vZGVscy9pbmRleCc7XHJcbmltcG9ydCB7IENvb3BlcmF0aXZlU2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9jb29wZXJhdGl2ZS5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IENvb3BlcmF0aXZlU3RhZmZTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL2Nvb3BlcmF0aXZlU3RhZmYuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBQcm9kdWN0U2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9wcm9kdWN0LnNlcnZpY2VcIjtcclxuXHJcblxyXG5pbXBvcnQgeyBDb29wZXJhdGl2ZVN0YWZmLCBWZXJpZnlBdXRoLCBQcm9kdWN0LFByb2R1Y3RDYXJ0IH0gZnJvbSBcIi4uLy4uL21vZGVscy9pbmRleFwiO1xyXG5cclxuaW1wb3J0IHsgQ29uZmlnIH0gZnJvbSBcIi4uLy4uL3NoYXJlZC9jb25maWdcIjtcclxubGV0IExTID0gcmVxdWlyZSggXCJuYXRpdmVzY3JpcHQtbG9jYWxzdG9yYWdlXCIgKTtcclxuXHJcbmltcG9ydCB7IFROU0ZhbmN5QWxlcnQsIFROU0ZhbmN5QWxlcnRCdXR0b24gfSBmcm9tIFwibmF0aXZlc2NyaXB0LWZhbmN5YWxlcnRcIjtcclxuXHJcbmltcG9ydCB7IFRvdWNoR2VzdHVyZUV2ZW50RGF0YSB9IGZyb20gXCJ1aS9nZXN0dXJlc1wiO1xyXG5cclxuaW1wb3J0ICogYXMgZGlhbG9ncyBmcm9tIFwidWkvZGlhbG9nc1wiO1xyXG5cclxuaW1wb3J0IHsgQXV0b0xvZ291dFNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9hdXRvbG9nb3V0LnNlcnZpY2UnO1xyXG5cclxuXHJcbmltcG9ydCB7IEFuZHJvaWRBcHBsaWNhdGlvbiwgQW5kcm9pZEFjdGl2aXR5QmFja1ByZXNzZWRFdmVudERhdGEgfSBmcm9tIFwiYXBwbGljYXRpb25cIjtcclxuaW1wb3J0IHsgaXNBbmRyb2lkIH0gZnJvbSBcInBsYXRmb3JtXCI7XHJcbkBDb21wb25lbnQoe1xyXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcclxuICAgIHNlbGVjdG9yOiBcIm5zLWJ1eVwiLFxyXG4gICAgdGVtcGxhdGVVcmw6IFwiLi9idXkuY29tcG9uZW50Lmh0bWxcIixcclxuICAgIHN0eWxlVXJsczogW1wiLi9idXktY29tbW9uLmNzc1wiLCBcIi4vYnV5LmNvbXBvbmVudC5jc3NcIl0sXHJcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcclxuICBcclxufSlcclxuXHJcblxyXG5leHBvcnQgY2xhc3MgQnV5Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kgIHtcclxuICAgIHByb2R1Y3RJbWFnZVVybDogc3RyaW5nICA9IENvbmZpZy5wcm9kdWN0SW1hZ2VVUkw7XHJcbiAgICBwdWJsaWMgaW5wdXQ6IGFueTtcclxuICAgIHNlbGVjdGVkQ29vcGVyYXRpdmVJbmRleDogbnVtYmVyO1xyXG4gICAgc2VsZWN0ZWRDb29wZXJhdGl2ZTogc3RyaW5nO1xyXG4gICAgc3RhZmZJZDogU3RyaW5nO1xyXG4gICAgY29vcGVyYXRpdmU6IEFycmF5PENvb3BlcmF0aXZlPiA9IFtdO1xyXG4gICAgaGludDogc3RyaW5nID0gXCIgMVwiO1xyXG4gICAgcHVibGljIGNvb3BlcmF0aXZlTGlzdDogVmFsdWVMaXN0PHN0cmluZz47XHJcbiAgICBwdWJsaWMgY3NzQ2xhc3M6IHN0cmluZyA9IFwiZGVmYXVsdFwiO1xyXG4gICAgY29vcGVyYXRpdmVTdGFmZjogQ29vcGVyYXRpdmVTdGFmZjtcclxuICAgIHZlcmlmeUF1dGg6IFZlcmlmeUF1dGg7XHJcbiAgICBwcm9kdWN0SWQ6IFN0cmluZztcclxuICAgIHByb2R1Y3Q6IFByb2R1Y3RDYXJ0O1xyXG4gICAgdXNlcklkOiBTdHJpbmc7XHJcbiAgICBjb29wZXJJZDogU3RyaW5nO1xyXG4gICAgbGlrZWRUaGlzUHJvZHVjdDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgbGlrZUxhYmVsQ2xhc3MgPSBcImZhIG5vdGxpa2VcIjtcclxuICAgIGxpa2VPYmplY3Q6IGFueTtcclxuICAgIG15TGlrZUNvdW50OiBOdW1iZXIgPSAwO1xyXG4gICAgbGlrZVRvdGFsQ291bnQ6IE51bWJlciA9IDA7XHJcbiAgICBjYW5WaWV3RGV0YWlsczogQm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAgIGNhcnRQcm9kdWN0czogQXJyYXk8UHJvZHVjdENhcnQ+ID0gW107XHJcblxyXG4gICAgIG5vdGlmaWNhdGlvbjogU3RyaW5nID0gXCJZb3UgY2FuIGFjY2VzcyB5b3VyIHBlcnNvbmFsIG9mZmVyLCB1cGRhdGVzIGFuZCBwcmljZSBkcm9wIGhlcmVcIjtcclxuICAgIHB1YmxpYyBpbWFnZXM6IEFycmF5PGFueT4gPSBbXTtcclxuICAgXHJcblxyXG5cclxuICAgICBcclxuICAgIHB1YmxpYyBjb25zdHJ1Y3Rvcihwcml2YXRlIGxvY2F0aW9uOiBMb2NhdGlvbiwgcHJpdmF0ZSBjb29wZXJhdGl2ZVNlcnZpY2U6IENvb3BlcmF0aXZlU2VydmljZSwgcHJpdmF0ZSBjb29wZXJhdGl2ZVN0YWZmU2VydmljZTogQ29vcGVyYXRpdmVTdGFmZlNlcnZpY2UsXHJcbiAgICBwcml2YXRlIHByb2R1Y3RTZXJ2aWNlOlByb2R1Y3RTZXJ2aWNlLCBwcml2YXRlIHJvdXRlcjogUm91dGVyLCBwcml2YXRlIGFjdGl2YXRlZFJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSxcclxuICAgIHByaXZhdGUgX2NoYW5nZURldGVjdGlvblJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXHJcbiAgICBwcml2YXRlIHpvbmU6IE5nWm9uZSxwcml2YXRlIHJvdXRlckV4dGVuc2lvbnM6IFJvdXRlckV4dGVuc2lvbnMscHJpdmF0ZSBhdXRvTG9nb3V0U2VydmljZTogQXV0b0xvZ291dFNlcnZpY2VcclxuICApIHtcclxuICAgICAgXHJcblxyXG4gICAgICAgXHJcbiAgICBcclxuICAgIH1cclxuXHJcbiAgXHJcblxyXG4gICAgcHVibGljIG5nT25Jbml0KCkge1xyXG5cclxuXHJcbiAgICAgICAgdGhpcy5wcm9kdWN0SWQgPSB0aGlzLmFjdGl2YXRlZFJvdXRlLnNuYXBzaG90LnBhcmFtc1tcImlkXCJdO1xyXG5cclxuICAgICAgICB2YXIgZGF0YU9iamVjdCA9IEpTT04ucGFyc2UoTFMuZ2V0SXRlbSgnY3VycmVudFVzZXInKSk7XHJcblxyXG4gICAgICAgXHJcblxyXG4gICAgICAgIFxyXG4gICAgICAgICAgaWYoZGF0YU9iamVjdC5faWQpXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgdGhpcy51c2VySWQgPSBkYXRhT2JqZWN0Ll9pZDtcclxuICAgICAgICAgICAgICB0aGlzLmNvb3BlcklkID0gZGF0YU9iamVjdC5jb29wZXJJZDtcclxuICAgICAgICAgICAgIFxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuZ2V0UHJvZHVjdEJ5SWQodGhpcy5wcm9kdWN0SWQsdGhpcy51c2VySWQpO1xyXG5cclxuICAgICAgICAvL2NvbnNvbGUubG9nKFwiQ3VycmVudCBVUkwgXCIgKyB0aGlzLnJvdXRlci51cmwpO1xyXG5cclxuICAgICAgIFxyXG4gICAgICAgXHJcblxyXG4gICAgfVxyXG4gICAgXHJcblxyXG4gICAgbmdPbkRlc3Ryb3koKVxyXG4gICAge1xyXG4gICAgIC8vdGhpcy5zZW5kTGlrZVRvREIoKTtcclxuICAgICAvLyB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbXCIvXCJdKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyByZWdpc3RlcigpIHtcclxuICAgICAgICAvLyBpZih0aGlzLmlucHV0LmZpcnN0bmFtZSAmJiB0aGlzLmlucHV0Lmxhc3RuYW1lICYmIHRoaXMuaW5wdXQuZW1haWwgJiYgdGhpcy5pbnB1dC5wYXNzd29yZCkge1xyXG4gICAgICAgIC8vICAgICBBcHBsaWNhdGlvblNldHRpbmdzLnNldFN0cmluZyhcImFjY291bnRcIiwgSlNPTi5zdHJpbmdpZnkodGhpcy5pbnB1dCkpO1xyXG4gICAgICAgIC8vICAgICB0aGlzLmxvY2F0aW9uLmJhY2soKTtcclxuICAgICAgICAvLyB9IGVsc2Uge1xyXG4gICAgICAgIC8vICAgICAobmV3IFNuYWNrQmFyKCkpLnNpbXBsZShcIkFsbCBGaWVsZHMgUmVxdWlyZWQhXCIpO1xyXG4gICAgICAgIC8vIH1cclxuXHJcbiAgICAgICAgY29uc29sZS5sb2coXCJSZWFjaGluZyBSZWdpc3RlciBcIik7XHJcblxyXG4gICAgICAgIHRoaXMuZ2V0Q29vcGVyYXRpdmVTdGFmZih0aGlzLnN0YWZmSWQsIHRoaXMuc2VsZWN0ZWRDb29wZXJhdGl2ZSk7XHJcbiAgICB9XHJcblxyXG5cclxuXHJcbiAgICBvbk5hdkJ0blRhcCgpIHtcclxuICAgICAgICAvLyBUaGlzIGNvZGUgd2lsbCBiZSBjYWxsZWQgb25seSBpbiBBbmRyb2lkLlxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiTmF2aWdhdGlvbiBidXR0b24gdGFwcGVkIVwiKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ29CYWNrKCkge1xyXG4gICAgICAgdGhpcy5sb2NhdGlvbi5iYWNrKCk7XHJcblxyXG4gICAgICAgIC8vdGhpcy5yb3V0ZXIubmF2aWdhdGUoW1wiL11cIl0pO1xyXG4gICAgfVxyXG4gICAgc3RhcnRCYWNrZ3JvdW5kQW5pbWF0aW9uKGJhY2tncm91bmQpIHtcclxuICAgICAgICBiYWNrZ3JvdW5kLmFuaW1hdGUoe1xyXG4gICAgICAgICAgICBzY2FsZTogeyB4OiAxLjAsIHk6IDEuMCB9LFxyXG4gICAgICAgICAgICBkdXJhdGlvbjogMTAwMDBcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBhZGRUb0NhcnQoKXtcclxuXHJcbiAgICAgICAgLy8gbGV0IGJ1dHRvbnMgPSBbXHJcbiAgICAgICAgLy8gICAgIG5ldyBUTlNGYW5jeUFsZXJ0QnV0dG9uKHsgbGFiZWw6ICdDb250aW51ZSBTaG9wcGluZycsIGFjdGlvbjogKCkgPT4geyBjb25zb2xlLmxvZygnT25lJyk7IH0gfSksXHJcbiAgICAgICAgLy8gICAgIG5ldyBUTlNGYW5jeUFsZXJ0QnV0dG9uKHsgbGFiZWw6ICdQcm9jZWVkIHRvIENoZWNrb3V0JywgYWN0aW9uOiAoKSA9PiB7IGNvbnNvbGUubG9nKCdUd28nKTsgfSB9KVxyXG4gICAgICAgICAgIFxyXG4gICAgICAgIC8vICAgXTtcclxuXHJcblxyXG4gICAgICAgIFxyXG4gICAgICAgXHJcbiAgICAgICAgaWYoTFMuZ2V0SXRlbSgnbXljYXJ0cHJvZHVjdHMnKSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuY2FydFByb2R1Y3RzID0gW107XHJcbiAgICAgICAgICAgIHZhciBteWNhcnRwcm9kdWN0czIgPSBMUy5nZXRJdGVtKCdteWNhcnRwcm9kdWN0cycpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIlByb2R1Y3QgSWQgXCIgKyB0aGlzLnByb2R1Y3QuX2lkKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBteWNhcnRwcm9kdWN0czogQXJyYXk8UHJvZHVjdENhcnQ+ID0gbXljYXJ0cHJvZHVjdHMyO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkNhcnQgQ291bnQgXCIrIG15Y2FydHByb2R1Y3RzLmxlbmd0aCk7XHJcblxyXG4gICAgICAgICAgICB2YXIgbWFpbmxlbmd0aCA9IG15Y2FydHByb2R1Y3RzLmxlbmd0aDtcclxuXHJcbiAgICAgICAgICAgIGxldCBpdGVtRXhpc3QgOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG5cclxuICAgICAgICAgICAgbXljYXJ0cHJvZHVjdHMuZm9yRWFjaCggKGVsZW1lbnQpID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgbmV3UHJvZHVjdCA9IGVsZW1lbnQ7XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLnByb2R1Y3QgPT0gZWxlbWVudClcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnQucXR5ICs9ICAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50LmFtb3VudCA9IGVsZW1lbnQucHJpY2UgKiBlbGVtZW50LnF0eTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5pc1NlbGVjdGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnQuc2VsZWN0ZWRRdHlJbmRleCA9IG5ld1Byb2R1Y3QucXR5IC0gMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbUV4aXN0ID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9KTtcclxuXHJcblxyXG4gICAgICAgICAgICBpZighaXRlbUV4aXN0KVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnByb2R1Y3QucXR5ID0gMTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiUXR5IFdoZW4gTmV3IFwiICsgdGhpcy5wcm9kdWN0LnF0eSk7XHJcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiTmV3IFF0eSBcIiArIHRoaXMucHJvZHVjdC5xdHkpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wcm9kdWN0LmlzU2VsZWN0ZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHRoaXMucHJvZHVjdC5hbW91bnQgPSAgdGhpcy5wcm9kdWN0LnByaWNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wcm9kdWN0LnNlbGVjdGVkUXR5SW5kZXggPSB0aGlzLnByb2R1Y3QucXR5IC0gMTtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLnByb2R1Y3QucXR5TGlzdCA9IG5ldyBWYWx1ZUxpc3Q8c3RyaW5nPigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBsb29wID0gMDsgbG9vcCA8IHRoaXMucHJvZHVjdC5xdWFudGl0eTsgbG9vcCsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBpZihsb29wID4gMClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9kdWN0LnF0eUxpc3QucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGxvb3AudG9TdHJpbmcoKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiBsb29wLnRvU3RyaW5nKCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgbXljYXJ0cHJvZHVjdHMucHVzaCh0aGlzLnByb2R1Y3QpO1xyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuXHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgIFxyXG4gICAgICAgICAgIFxyXG4gICAgICAgICAgICB0aGlzLmNhcnRQcm9kdWN0cyA9IG15Y2FydHByb2R1Y3RzO1xyXG4gICAgICAgICAgICAgIFxyXG5cclxuXHJcbiAgICAgICAgICAgIExTLnJlbW92ZUl0ZW0oJ215Y2FydHByb2R1Y3RzJyk7XHJcblxyXG4gICAgICAgICAgICBMUy5zZXRJdGVtKCdteWNhcnRwcm9kdWN0cycsdGhpcy5jYXJ0UHJvZHVjdHMpO1xyXG5cclxuICAgICAgICAgICAgIC8vICBjb25zb2xlLmxvZyhcIlF0eSBBcnJheSBcIiArIHRoaXMucHJvZHVjdC5xdHlMaXN0KTtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIC8vICBUTlNGYW5jeUFsZXJ0LnNob3dTdWNjZXNzKFwiU3VjY2VzcyFcIiwgdGhpcy5wcm9kdWN0LnByb2R1Y3ROYW1lICsgXCIgd2FzIHN1Y2Nlc3NmdWxseSBhZGRlZFwiLCBcIk9rXCIpXHJcbiAgICAgICAgICAgICAgICAvLyAgLnRoZW4oICgpID0+IHsgLyogdXNlciBwcmVzc2VkIHRoZSBidXR0b24gKi9cclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgLy8gfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IHBhcmVudENvbnRleHQgPSB0aGlzO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBkaWFsb2dzLmNvbmZpcm0oe1xyXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIlN1Y2Nlc3NcIixcclxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOmAgXCJBIG5ldyBJdGVtIGhhcyBiZWVuIGFkZGVkIHRvIHlvdXIgc2hvcHBpbmcgY2FydC4gWW91IG5vdyBoYXZlICR7dGhpcy5jYXJ0UHJvZHVjdHMubGVuZ3RofSBpdGVtKHMpIGluIHlvdXIgc2hvcHBpbmcgY2FydFwiYCxcclxuICAgICAgICAgICAgICAgICAgICBva0J1dHRvblRleHQ6IFwiUHJvY2VlZCB0byBDaGVja291dFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhbmNlbEJ1dHRvblRleHQ6IFwiQ29udGludWUgU2hvcHBpbmdcIlxyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgfSkudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gcmVzdWx0IGFyZ3VtZW50IGlzIGJvb2xlYW5cclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkRpYWxvZyByZXN1bHQgZm9yIHNob3BwaW5nOiAgIFwiICsgcmVzdWx0KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYocmVzdWx0KVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9HbyB0byBDYXJ0XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJlbnRDb250ZXh0LnJvdXRlci5uYXZpZ2F0ZShbXCIvbXljYXJ0XCJdKTtcclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gQ29udGludWluZyBTaG9wcGluZ1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgcGFyZW50Q29udGV4dC5yb3V0ZXIubmF2aWdhdGUoW1wiL3Nob3BcIl0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcblxyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJDYXJ0IGlzIGVtcHR5XCIpO1xyXG4gICAgICAgICAgICAgIHRoaXMucHJvZHVjdC5xdHkgPSAxO1xyXG4gICAgICAgICAgICAgIHRoaXMucHJvZHVjdC5pc1NlbGVjdGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgdGhpcy5wcm9kdWN0LmFtb3VudCA9ICB0aGlzLnByb2R1Y3QucHJpY2U7XHJcbiAgICAgICAgICAgICAgdGhpcy5wcm9kdWN0LnNlbGVjdGVkUXR5SW5kZXggPSB0aGlzLnByb2R1Y3QucXR5IC0gMTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMucHJvZHVjdC5xdHlMaXN0ID0gbmV3IFZhbHVlTGlzdDxzdHJpbmc+KCk7XHJcbiAgICAgICAgICAgICAgZm9yIChsZXQgbG9vcCA9IDA7IGxvb3AgPCB0aGlzLnByb2R1Y3QucXVhbnRpdHk7IGxvb3ArKykge1xyXG4gICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgIGlmKGxvb3AgPiAwKVxyXG4gICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgdGhpcy5wcm9kdWN0LnF0eUxpc3QucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogbG9vcC50b1N0cmluZygpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogbG9vcC50b1N0cmluZygpLFxyXG4gICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiUXR5IEFycmF5IHdoZW4gZW1wdHkgXCIgKyBKU09OLnN0cmluZ2lmeSh0aGlzLnByb2R1Y3QucXR5TGlzdCkpO1xyXG5cclxuICAgICAgICAgICAgICAgXHJcblxyXG4gICAgICAgICAgICAgICAgLy8gIFROU0ZhbmN5QWxlcnQuc2hvd1N1Y2Nlc3MoXCJTdWNjZXNzIVwiLCB0aGlzLnByb2R1Y3QucHJvZHVjdE5hbWUgKyBcIiB3YXMgc3VjY2Vzc2Z1bGx5IGFkZGVkXCIsIFwiT2tcIilcclxuICAgICAgICAgICAgICAgIC8vICAudGhlbiggKCkgPT4geyAvKiB1c2VyIHByZXNzZWQgdGhlIGJ1dHRvbiAqL1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAvLyB9KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2FydFByb2R1Y3RzLnB1c2godGhpcy5wcm9kdWN0KTtcclxuICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBMUy5zZXRJdGVtKCdteWNhcnRwcm9kdWN0cycsIHRoaXMuY2FydFByb2R1Y3RzKTtcclxuICAgICAgICAgICAgICAgICBsZXQgcGFyZW50Q29udGV4dCA9IHRoaXM7XHJcbiAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgZGlhbG9ncy5jb25maXJtKHtcclxuICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJTdWNjZXNzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogYFwiQSBuZXcgSXRlbSBoYXMgYmVlbiBhZGRlZCB0byB5b3VyIHNob3BwaW5nIGNhcnQuIFlvdSBub3cgaGF2ZSAke3RoaXMuY2FydFByb2R1Y3RzLmxlbmd0aH0gaXRlbShzKSBpbiB5b3VyIHNob3BwaW5nIGNhcnRcImAsXHJcbiAgICAgICAgICAgICAgICAgICAgb2tCdXR0b25UZXh0OiBcIlByb2NlZWQgdG8gQ2hlY2tvdXRcIixcclxuICAgICAgICAgICAgICAgICAgICBjYW5jZWxCdXR0b25UZXh0OiBcIkNvbnRpbnVlIFNob3BwaW5nXCJcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIH0pLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHJlc3VsdCBhcmd1bWVudCBpcyBib29sZWFuXHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJEaWFsb2cgcmVzdWx0OiBcIiArIHJlc3VsdCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmKHJlc3VsdClcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vR28gdG8gQ2FydFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAvLyB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbXCIvbXljYXJ0XCJdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICBwYXJlbnRDb250ZXh0LnJvdXRlci5uYXZpZ2F0ZShbXCIvbXljYXJ0XCJdKTtcclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gQ29udGludWluZyBTaG9wcGluZ1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAvLyB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbXCIvc2hvcFwiXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgcGFyZW50Q29udGV4dC5yb3V0ZXIubmF2aWdhdGUoW1wiL3Nob3BcIl0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgXHJcblxyXG4gICAgICAgICAgICAvLyAgICAgVE5TRmFuY3lBbGVydC5zaG93U3VjY2VzcyhcIlN1Y2Nlc3MhXCIsIHRoaXMucHJvZHVjdC5wcm9kdWN0TmFtZSArIFwiIHdhcyBzdWNjZXNzZnVsbHkgYWRkZWRcIiwgXCJPa1wiKVxyXG4gICAgICAgICAgICAvLyAgICAgLnRoZW4oICgpID0+IHsgLyogdXNlciBwcmVzc2VkIHRoZSBidXR0b24gKi9cclxuICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgLy8gICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgIC8vICBUTlNGYW5jeUFsZXJ0LnNob3dDdXN0b21CdXR0b25zKGJ1dHRvbnMsIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCAnU3VjY2VzcyEnLCBgQSBuZXcgaXRlbSBoYXMgYmVlbiBhZGRlZCB0byB5b3VyIHNob3BwaW5nIGNhcnQuIFlvdSBub3cgaGF2ZSAxIGl0ZW0ocykgaW4geW91ciBzaG9wcGluZyBjYXJ0YCwgJ09rJyk7XHJcbiAgXHJcblxyXG4gICAgICAgIH1cclxuXHJcblxyXG5cclxuICAgICAgICAvL1xyXG5cclxuXHJcblxyXG4gICAgICBcclxuICAgIFxyXG4gICBcclxuICAgICAgICBcclxuICAgIFxyXG5cclxufVxyXG5cclxuICAgIGZpbmRJbmRleFRvVXBkYXRlKG5ld0l0ZW0pIHsgXHJcbiAgICAgICAgcmV0dXJuIG5ld0l0ZW0uaWQgPT09IHRoaXM7XHJcbiAgfVxyXG5cclxuICAgIHB1YmxpYyBvbmNvb3BlcmF0aXZlY2hhbmdlKGFyZ3M6IFNlbGVjdGVkSW5kZXhDaGFuZ2VkRXZlbnREYXRhKSB7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coYERyb3AgRG93biBzZWxlY3RlZCBpbmRleCBjaGFuZ2VkICAke2FyZ3Mub2xkSW5kZXh9IHRvICR7YXJncy5uZXdJbmRleH0uIE5ldyB2YWx1ZSBpcyBcIiR7dGhpcy5zZXNzaW9uaXRlbXMuZ2V0VmFsdWUoXHJcbiAgICAgICAgLy8gICAgIGFyZ3MubmV3SW5kZXgpfVwiYCk7XHJcblxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiU2VsZWN0ZWQgSUQgXCIgKyBhcmdzLm5ld0luZGV4KTtcclxuICAgICAgICB0aGlzLnNlbGVjdGVkQ29vcGVyYXRpdmUgPSB0aGlzLmNvb3BlcmF0aXZlTGlzdC5nZXRWYWx1ZShhcmdzLm5ld0luZGV4KTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIlNlbGVjdGVkIElkIFZhbHVlICBcIiArIHRoaXMuc2VsZWN0ZWRDb29wZXJhdGl2ZSk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGdldENvb3BlcmF0aXZlKCkge1xyXG4gICAgICAgIHRoaXMuY29vcGVyYXRpdmVTZXJ2aWNlLmdldEFsbENvb3BlcmF0aXZlKCkuc3Vic2NyaWJlKFxyXG4gICAgICAgICAgICBkYXRhID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQ29vcGVyYXRpdmUgTGlzdCBcIiArIEpTT04uc3RyaW5naWZ5KGRhdGFbXCJkYXRhXCJdKSk7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5jb29wZXJhdGl2ZSA9IGRhdGFbXCJkYXRhXCJdO1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuY29vcGVyYXRpdmVMaXN0ID0gbmV3IFZhbHVlTGlzdDxzdHJpbmc+KCk7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBsb29wID0gMDsgbG9vcCA8IHRoaXMuY29vcGVyYXRpdmUubGVuZ3RoOyBsb29wKyspIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvb3BlcmF0aXZlTGlzdC5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGAke3RoaXMuY29vcGVyYXRpdmVbbG9vcF0uY29vcGVyYXRpdmVJZH1gLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiBgJHt0aGlzLmNvb3BlcmF0aXZlW2xvb3BdLmZpcnN0X25hbWV9YCxcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZXJyID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRDb29wZXJhdGl2ZVN0YWZmKHN0YWZmSWQ6IFN0cmluZywgY29vcGVyYXRpdmVJZDogU3RyaW5nKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJTdGFmZiBhbmQgQ29vcGVyYXRpdmVJZCBcIiArIHN0YWZmSWQgKyBcIiAtIFwiICsgY29vcGVyYXRpdmVJZCk7XHJcblxyXG5cclxuICAgICAgICB0aGlzLmNvb3BlcmF0aXZlU3RhZmZTZXJ2aWNlLmdldENvb3BlcmF0aXZlU3RhZmYoc3RhZmZJZCwgY29vcGVyYXRpdmVJZCkuc3Vic2NyaWJlKFxyXG4gICAgICAgICAgICBkYXRhID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQ29vcGVyYXRpdmUgU3RhZmYgXCIgKyBKU09OLnN0cmluZ2lmeShkYXRhW1wiZGF0YVwiXSkpO1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuY29vcGVyYXRpdmVTdGFmZiA9IGRhdGFbXCJkYXRhXCJdO1xyXG5cclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiVmVyaWZ5aW5nIFN0YWZmIG91dCBzaWRlIFwiICsgdGhpcy5jb29wZXJhdGl2ZVN0YWZmLnN0YWZmSWQpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZW5kVmVyaWZ5QXV0aCh0aGlzLmNvb3BlcmF0aXZlU3RhZmYpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBlcnIgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIHNlbmRWZXJpZnlBdXRoKHZlcmlmeUF1dGg6IENvb3BlcmF0aXZlU3RhZmYpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIlZlcmlmeSBcIiArIHZlcmlmeUF1dGguc3RhZmZJZCk7XHJcblxyXG5cclxuICAgICAgICB0aGlzLmNvb3BlcmF0aXZlU3RhZmZTZXJ2aWNlLnZlcmlmeUF1dGhUb0NyZWF0TGF0ZXIodmVyaWZ5QXV0aCkuc3Vic2NyaWJlKFxyXG4gICAgICAgICAgICBkYXRhID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiVmVyeSBBdXRoIFwiICsgSlNPTi5zdHJpbmdpZnkoZGF0YVtcImRhdGFcIl0pKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZXJyID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRQcm9kdWN0QnlJZChwcm9kdWN0SWQ6IFN0cmluZywgdXNlcklkOiBTdHJpbmcpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIlByb2R1Y3QgSWQgQnV5XCIgKyBwcm9kdWN0SWQpO1xyXG4gICAgICAgIHRoaXMucHJvZHVjdCA9IG51bGw7XHJcblxyXG4gICAgICAgIHRoaXMucHJvZHVjdFNlcnZpY2UuZ2V0cHJvZHVjdChwcm9kdWN0SWQsdXNlcklkKS5zdWJzY3JpYmUoXHJcbiAgICAgICAgICAgIGRhdGEgPT4ge1xyXG4gICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJTaW5nbGUgUHJvZHVjdCBcIiArIEpTT04uc3RyaW5naWZ5KGRhdGFbXCJkYXRhXCJdKSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnByb2R1Y3QgPSBkYXRhW1wiZGF0YVwiXTtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnByb2R1Y3QubGlrZXNDb3VudCkge1xyXG5cclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9kdWN0Lmxpa2VzQ291bnQgPSAwO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHZhciBjaGVja0lmTGlrZUV4aXN0ID0gdGhpcy5wcm9kdWN0Lmxpa2VzLmZpbHRlcihuID0+IG4uY29vcGVySWQgPT09IHRoaXMuY29vcGVySWQpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmKGNoZWNrSWZMaWtlRXhpc3QubGVuZ3RoID4gMClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxpa2VkVGhpc1Byb2R1Y3QgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubGlrZUxhYmVsQ2xhc3MgPSBcImZhIGxpa2VcIjtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxpa2VUb3RhbENvdW50ID0gdGhpcy5wcm9kdWN0Lmxpa2VzQ291bnQgO1xyXG4gICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIHRoaXMubGlrZWRUaGlzUHJvZHVjdCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5saWtlTGFiZWxDbGFzcyA9IFwiZmEgbm90bGlrZVwiO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5saWtlVG90YWxDb3VudCA9IHRoaXMucHJvZHVjdC5saWtlc0NvdW50IDtcclxuICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIFxyXG5cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZXJyID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBzZW5kTGlrZVRvREIoKXtcclxuXHJcbiAgICAgICAgaWYodGhpcy5saWtlZFRoaXNQcm9kdWN0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5wcm9kdWN0U2VydmljZS5saWtlUHJvZHVjdHModGhpcy5wcm9kdWN0Ll9pZCx0aGlzLnByb2R1Y3QucHJvZHVjdElkLCB0aGlzLnByb2R1Y3QubGlrZXMpLnN1YnNjcmliZShcclxuICAgICAgICAgICAgICAgIGRhdGEgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIlNpbmdsZSBQcm9kdWN0IFwiICsgSlNPTi5zdHJpbmdpZnkoZGF0YVtcImRhdGFcIl0pKTtcclxuICAgIFxyXG4gICAgICAgICAgICAgICAgICAgdGhpcy5wcm9kdWN0ID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgIHRoaXMucHJvZHVjdCA9IGRhdGFbXCJkYXRhXCJdO1xyXG4gICAgXHJcbiAgICAgICAgICAgICAgICAgICAvLyBhbGVydCBzdWNjZXNzXHJcbiAgICBcclxuICAgICAgICAgICAgICAgICAgIC8vdGhpcy5fY2hhbmdlRGV0ZWN0aW9uUmVmLmRldGVjdENoYW5nZXMoKTtcclxuICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZXJyID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xyXG4gICAgXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAvL3JlbW92ZSBmb3IgZGF0YWJhc2VcclxuICAgICAgICB9XHJcbiAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBsaWtlUHJvZHVjdCgpIHtcclxuXHJcbiAgICAgICAgXHJcblxyXG4gICAgICAgIHRoaXMubGlrZWRUaGlzUHJvZHVjdCA9ICF0aGlzLmxpa2VkVGhpc1Byb2R1Y3Q7XHJcbiAgICAgICAgdmFyIGNoZWNrSWZMaWtlRXhpc3QgPSB0aGlzLnByb2R1Y3QubGlrZXMuZmlsdGVyKG4gPT4gbi5jb29wZXJJZCA9PT0gdGhpcy5jb29wZXJJZCk7XHJcbiAgICAgICAgaWYodGhpcy5saWtlZFRoaXNQcm9kdWN0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICBcclxuXHJcbiAgICAgICAgICAgIGlmKGNoZWNrSWZMaWtlRXhpc3QubGVuZ3RoID09PSAwKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgIC8vdGhpcy5wcm9kdWN0Lmxpa2VzLnB1c2goe1wiY29vcGVySWRcIjp0aGlzLmNvb3BlcklkLFwidXNlcklkXCI6dGhpcy51c2VySWQsXCJ1c2VyXCI6dGhpcy51c2VySWQsXCJkYXRlQ3JlYXRlZFwiOiBuZXcgRGF0ZSgpIH0pXHJcbiAgICAgICAgICAgICAgIHRoaXMubGlrZU9iamVjdCA9IHtcImNvb3BlcklkXCI6dGhpcy5jb29wZXJJZCxcInVzZXJJZFwiOnRoaXMudXNlcklkLFwidXNlclwiOnRoaXMudXNlcklkLFwiZGF0ZUNyZWF0ZWRcIjogbmV3IERhdGUoKSB9O1xyXG4gICAgICAgICAgICAgIC8vIHRoaXMucHJvZHVjdC5saWtlc0NvdW50ICs9MTtcclxuICAgICAgICAgICAgICB0aGlzLmxpa2VUb3RhbENvdW50ID0gdGhpcy5wcm9kdWN0Lmxpa2VzQ291bnQgKyAxO1xyXG4gICAgICAgICAgIH1lbHNle1xyXG4gICBcclxuICAgICAgICAgICAgICAgdGhpcy5saWtlT2JqZWN0ID0gY2hlY2tJZkxpa2VFeGlzdC5maW5kKG4gPT4gbi5jb29wZXJJZCA9PT0gdGhpcy5jb29wZXJJZCk7XHJcbiAgICAgICAgICAgICAgIHRoaXMubGlrZVRvdGFsQ291bnQgPSB0aGlzLnByb2R1Y3QubGlrZXNDb3VudCA7XHJcbiAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgdGhpcy5saWtlTGFiZWxDbGFzcyA9IFwiZmEgbGlrZVwiO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICB0aGlzLmxpa2VMYWJlbENsYXNzID0gXCJmYSBub3RsaWtlXCI7XHJcblxyXG5cclxuICAgICAgICAgICAgaWYoY2hlY2tJZkxpa2VFeGlzdC5sZW5ndGggPT09IDApXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgLy90aGlzLnByb2R1Y3QubGlrZXMucHVzaCh7XCJjb29wZXJJZFwiOnRoaXMuY29vcGVySWQsXCJ1c2VySWRcIjp0aGlzLnVzZXJJZCxcInVzZXJcIjp0aGlzLnVzZXJJZCxcImRhdGVDcmVhdGVkXCI6IG5ldyBEYXRlKCkgfSlcclxuICAgICAgICAgICAgICAgdGhpcy5saWtlT2JqZWN0ID0ge1wiY29vcGVySWRcIjp0aGlzLmNvb3BlcklkLFwidXNlcklkXCI6dGhpcy51c2VySWQsXCJ1c2VyXCI6dGhpcy51c2VySWQsXCJkYXRlQ3JlYXRlZFwiOiBuZXcgRGF0ZSgpIH07XHJcbiAgICAgICAgICAgICAgLy8gdGhpcy5wcm9kdWN0Lmxpa2VzQ291bnQgKz0xO1xyXG5cclxuICAgICAgICAgICAgICBpZih0aGlzLnByb2R1Y3QubGlrZXNDb3VudCA+IDApXHJcbiAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5saWtlVG90YWxDb3VudCA9IHRoaXMucHJvZHVjdC5saWtlc0NvdW50IC0gMTtcclxuICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIHRoaXMubGlrZVRvdGFsQ291bnQgPSB0aGlzLnByb2R1Y3QubGlrZXNDb3VudCA7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICBcclxuICAgICAgICAgICB9ZWxzZXtcclxuICAgXHJcbiAgICAgICAgICAgICAgIHRoaXMubGlrZU9iamVjdCA9IGNoZWNrSWZMaWtlRXhpc3QuZmluZChuID0+IG4uY29vcGVySWQgPT09IHRoaXMuY29vcGVySWQpO1xyXG4gICAgICAgICAgICAgICBpZih0aGlzLnByb2R1Y3QubGlrZXNDb3VudCA+IDApXHJcbiAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICB0aGlzLmxpa2VUb3RhbENvdW50ID0gdGhpcy5wcm9kdWN0Lmxpa2VzQ291bnQgLSAxO1xyXG4gICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICB0aGlzLmxpa2VUb3RhbENvdW50ID0gdGhpcy5wcm9kdWN0Lmxpa2VzQ291bnQgO1xyXG4gICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICB0aGlzLmxpa2VPYmplY3QgPSBjaGVja0lmTGlrZUV4aXN0LmZpbmQobiA9PiBuLmNvb3BlcklkID09PSB0aGlzLmNvb3BlcklkKTtcclxuICAgICAgICAgICAgICBcclxuICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgIFxyXG4gICAgICAgICAgICBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiUHJvZHVjdCBJZCBCdXlcIiArIHRoaXMucHJvZHVjdC5saWtlc0NvdW50KTtcclxuICAgICAgICBcclxuICAgICAgIFxyXG5cclxuICAgXHJcbiAgICB9XHJcblxyXG5cclxuICAgIG5hdmlnYXRlQmFjaygpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIkdvIEJhY2sgQnV0dG9uIENsaWNrZWRcIiApO1xyXG4gICAgICAgIHRoaXMucm91dGVyRXh0ZW5zaW9ucy5iYWNrVG9QcmV2aW91c1BhZ2UoKTtcclxuICAgICAgICAvL3RoaXMucm91dGVyLm5hdmlnYXRlKFtcIi9cIl0pO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBvblRvdWNoKGFyZ3M6IFRvdWNoR2VzdHVyZUV2ZW50RGF0YSkge1xyXG5cclxuICAgICAgIFxyXG4gICAgICAgIHRoaXMuYXV0b0xvZ291dFNlcnZpY2UucmVzZXQoKTtcclxuICAgICB9XHJcblxyXG4gICAgIHZpZXdNb3JlKCl7XHJcbiAgICAgICAgIHRoaXMuY2FuVmlld0RldGFpbHMgPSAhdGhpcy5jYW5WaWV3RGV0YWlscztcclxuICAgICB9XHJcblxyXG59Il19