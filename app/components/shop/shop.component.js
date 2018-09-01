"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var image_1 = require("tns-core-modules/ui/image");
var CarouselItem = require('nativescript-carousel').CarouselItem;
var router_2 = require("nativescript-angular/router");
var common_1 = require("@angular/common");
var page_1 = require("tns-core-modules/ui/page");
var nativescript_drop_down_1 = require("nativescript-drop-down");
var cooperative_service_1 = require("../../services/cooperative.service");
var product_service_1 = require("../../services/product.service");
var category_service_1 = require("../../services/category.service");
var advert_service_1 = require("../../services/advert.service");
var cooperativeStaff_service_1 = require("../../services/cooperativeStaff.service");
var config_1 = require("../../shared/config");
var nativescript_loading_indicator_1 = require("nativescript-loading-indicator");
var loader = new nativescript_loading_indicator_1.LoadingIndicator();
var autologout_service_1 = require("../../services/autologout.service");
var application = require("application");
var application_1 = require("application");
var platform_1 = require("platform");
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/observable/interval");
var modal_1 = require("../modal");
var forkJoin_1 = require("rxjs/observable/forkJoin");
var sponsorproduct_service_1 = require("../../services/sponsorproduct.service");
var options = {
    message: 'Loading...',
    progress: 0.65,
    android: {
        indeterminate: true,
        cancelable: true,
        cancelListener: function (dialog) { console.log("Loading cancelled"); },
        max: 100,
        progressNumberFormat: "%1d/%2d",
        progressPercentFormat: 0.53,
        progressStyle: 1,
        secondaryProgress: 1,
        color: "#4B9ED6",
    },
    ios: {
        details: "Additional detail note!",
        margin: 10,
        dimBackground: true,
        color: "#4B9ED6",
        // background box around indicator
        // hideBezel will override this if true
        backgroundColor: "yellow",
        userInteractionEnabled: false,
        hideBezel: true,
    }
};
var ShopComponent = /** @class */ (function () {
    function ShopComponent(location, cooperativeService, cooperativeStaffService, router, activatedRoute, productService, categoryService, advertService, routerExtensions, _changeDetectionRef, zone, page, autoLogoutService, sponsorProductService) {
        this.location = location;
        this.cooperativeService = cooperativeService;
        this.cooperativeStaffService = cooperativeStaffService;
        this.router = router;
        this.activatedRoute = activatedRoute;
        this.productService = productService;
        this.categoryService = categoryService;
        this.advertService = advertService;
        this.routerExtensions = routerExtensions;
        this._changeDetectionRef = _changeDetectionRef;
        this.zone = zone;
        this.page = page;
        this.autoLogoutService = autoLogoutService;
        this.sponsorProductService = sponsorProductService;
        this.productImageUrl = config_1.Config.productImageURL;
        this.adsURL = config_1.Config.adsURL;
        this.cooperative = [];
        this.hint = " ";
        this.sorthint = "Sort";
        this.filterhint = "Filter";
        this.cssClass = "default";
        this.categoryhint = "Category";
        this.categories = [];
        this.products = [];
        this.adverts = [];
        this.searchedProducts = [];
        this.notification = "You can access your personal offer, updates and price drop here";
        //images: Array<any>;
        this.images = [];
        this.pagenumber = 0;
        this.row = 0;
        this.imagesSlide = [];
        this.page.actionBarHidden = true;
    }
    ShopComponent.prototype.buildCarousel = function () {
        var count = 0;
        for (var _i = 0, _a = this.images; _i < _a.length; _i++) {
            var imageData = _a[_i];
            console.log(" Image Path " + imageData.url);
            var image = new image_1.Image();
            image.height = 200;
            image.src = imageData.url;
            image.className = "image";
            image.stretch = "aspectFill";
            image.loadMode = "async";
            var item = new CarouselItem();
            item.addChild(image);
            this.carousel.nativeElement.addChild(item);
            count++;
            if (platform_1.isAndroid) {
                var adapter = this.carousel.nativeElement.android.getAdapter();
                if (adapter) {
                    adapter.notifyDataSetChanged();
                    this.carousel.nativeElement._pageIndicatorView.setCount(count);
                    if (count === 1) {
                        this.carousel.nativeElement._pageIndicatorView.setSelection(item.android);
                    }
                }
            }
        }
        this.carousel.nativeElement.refresh();
        this.pagenumber = 1;
    };
    ShopComponent.prototype.scrollTo = function () {
        this.sv.nativeElement.scrollToVerticalOffset(0, true);
        //this.scrollLayout.scrollToVerticalOffset(this.grid.getLocationRelativeTo(this.button).y, false);   
    };
    ShopComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.scrollLayout = this.sv.nativeElement;
        // this.button = this.btn.nativeElement; 
        // this.grid = this.gr.nativeElement;
        this.categoryId = this.activatedRoute.snapshot.params["id"];
        console.log("Selected Category " + this.categoryId);
        forkJoin_1.forkJoin([
            this.categoryService.getAllCategory(),
            this.sponsorProductService.getallSponsorProducts(),
            this.advertService.getallAdverts()
        ]).subscribe(function (response) {
            // console.log("<<<<<<<<<<<<<<<<<<<<<<<<< first value>>>>>>>>>>>" + JSON.stringify(response[0]));
            // console.log("<<<<<<<<<<<<<<<<<<<<<<<<< second value>>>>>>>>>>>" + JSON.stringify(response[1]));
            // console.log("<<<<<<<<<<<<<<<<<<<<<<<<< third value>>>>>>>>>>>" + JSON.stringify(response[2]));
            _this.categories = response[0]["data"];
            _this.sponsorproducts = response[1]["data"];
            _this.adverts = response[2]["data"];
            if (_this.adverts.length > 0) {
                _this.images = [];
                for (var loop = 0; loop < _this.adverts.length; loop++) {
                    _this.images.push({ title: "" + _this.adverts[loop].ownerName,
                        url: "" + (_this.adsURL + _this.adverts[loop].advertImagePath),
                    });
                }
                console.log("Advert Images " + JSON.stringify(_this.images));
                _this.buildCarousel();
            }
            _this._changeDetectionRef.detectChanges();
        });
        // this.getProductByCategoryId(this.categoryId);
        this.sortList = new nativescript_drop_down_1.ValueList([
            { value: "NA", display: "New Arrival" },
            { value: "PU", display: "Price Up" },
            { value: "PD", display: "Price Down" },
            { value: "P", display: "Popularity" },
            { value: "BR", display: "Best Rating" }
        ]);
        this.filterList = new nativescript_drop_down_1.ValueList([
            { value: "Color", display: "Color" },
            { value: "Size", display: "Size" },
            { value: "Price", display: "Price" },
            { value: "Brand", display: "Brand" }
        ]);
        //this._bottomNavigation = this.page.getViewById('bottomNavigation');
        //this.getCategory();
        // if (!isAndroid) {
        //     return;
        //   }
        //   application.android.on(AndroidApplication.activityBackPressedEvent, (data: AndroidActivityBackPressedEventData) => {
        //     if (this.router.isActive("/shop", false)) {
        //      // data.cancel = true; // prevents default back button behavior
        //       //this.logout();
        //       this.router.navigate(["/]"], { replaceUrl: true });
        //     }
        //   });
        //   application.android.on(AndroidApplication.activityBackPressedEvent, (data: AndroidActivityBackPressedEventData) => {
        //     if (this.router.isActive("buy", false)) {
        //         console.log("Reaching Shop Back Button");
        //       data.cancel = true; // prevents default back button behavior
        //       //this.logout();
        //       this.router.navigate(["/"]);
        //     }
        //   });
        if (!platform_1.isAndroid) {
            return;
        }
        application.android.on(application_1.AndroidApplication.activityBackPressedEvent, function (data) {
            data.cancel = true;
            // if (this.router.isActive("/", false)) {
            //   data.cancel = true; // prevents default back button behavior
            //   //this.logout();
            //   //this.router.navigate(["/login"]);
            // }
            // if (this.router.isActive("/buy", false)) {
            //     data.cancel = true; // prevents default back button behavior
            //     //this.logout();
            //     //this.router.navigate(["/login"]);
            //   }
        });
    };
    ShopComponent.prototype.changeImage = function () {
        var slides = this.carousel.nativeElement;
        if (this.pagenumber === this.images.length) {
            this.pagenumber = 0;
        }
        slides.selectedPage = this.pagenumber;
        this.pagenumber += 1;
        this._changeDetectionRef.detectChanges();
    };
    ShopComponent.prototype.shuffle = function (array) {
        var currentIndex = array.length, temporaryValue, randomIndex;
        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        return array;
    };
    ShopComponent.prototype.ngAfterViewInit = function () {
        //this.getBalances(this.cooperId);
        var _this = this;
        //this._bottomNavigation = this.page.getViewById('bottomNavigation');
        //this._bottomNavigation.selectTab(2);
        //this.bottomBar.nativeElement.selectTab(2);
        //this.getCategory();
        this.sub = Observable_1.Observable.interval(5000)
            .subscribe(function (val) {
            _this.changeImage();
        });
        // this.images = [
        //     {
        //         title: 'Image 1 (URL)',
        //         url: 'http://192.168.8.100:3000/ads/apple.png'
        //     },
        //     // {
        //     //     title: 'Image 2 (resources folder)',
        //     //     file: 'res://mountain'
        //     // },
        //     // {
        //     //     title: 'Image 3 (assets folder)',
        //     //     file: '~/assets/sea-sunrise.jpg'
        //     // },
        //     {
        //         title: 'Image 4 (URL)',
        //         url: 'http://192.168.8.100:3000/ads/Onlineads.png'
        //     },
        //     {
        //         title: 'Image 5 (URL)',
        //         url: 'http://192.168.8.100:3000/ads/youtube.png'
        //     },
        //     {
        //         title: 'Image 6 (URL)',
        //         url: 'http://192.168.8.100:3000/ads/coffee.jpg'
        //     },
        // ];
        // this.slides.nativeElement.NextSlide();
    };
    ShopComponent.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
    };
    ShopComponent.prototype.bottomNavigationLoaded = function (args) {
        //this.bottomBar.nativeElement.on('tabSelected', 2);
        this.bottomBar.nativeElement.selectTab(2);
        //this.getProductByCategoryId(this.categoryId);
    };
    ShopComponent.prototype.register = function () {
        // if(this.input.firstname && this.input.lastname && this.input.email && this.input.password) {
        //     ApplicationSettings.setString("account", JSON.stringify(this.input));
        //     this.location.back();
        // } else {
        //     (new SnackBar()).simple("All Fields Required!");
        // }
        console.log("Reaching Register ");
        this.getCooperativeStaff(this.staffId, this.selectedCooperative);
    };
    ShopComponent.prototype.onNavBtnTap = function () {
        // This code will be called only in Android.
        console.log("Navigation button tapped!");
    };
    ShopComponent.prototype.goBack = function () {
        this.location.back();
    };
    ShopComponent.prototype.startBackgroundAnimation = function (background) {
        background.animate({
            scale: { x: 1.0, y: 1.0 },
            duration: 10000
        });
    };
    ShopComponent.prototype.navigateBack = function () {
        console.log("Go Back Button Clicked");
        this.routerExtensions.backToPreviousPage();
    };
    ShopComponent.prototype.onBottomNavigationTabSelected = function (args) {
        console.log("Tab selected:  " + args.oldIndex);
        if (args.newIndex == 0) {
            this.router.navigate([""]);
        }
        else if (args.newIndex == 1) {
            this.router.navigate(["/approve"]);
        }
        else if (args.newIndex == 3) {
            this.router.navigate(["/account"]);
        }
    };
    ShopComponent.prototype.oncooperativechange = function (args) {
        // console.log(`Drop Down selected index changed  ${args.oldIndex} to ${args.newIndex}. New value is "${this.sessionitems.getValue(
        //     args.newIndex)}"`);
        console.log("Selected ID " + args.newIndex);
        this.selectedCooperative = this.cooperativeList.getValue(args.newIndex);
        console.log("Selected Id Value  " + this.selectedCooperative);
    };
    ShopComponent.prototype.oncategorychange = function (args) {
        // console.log(`Drop Down selected index changed  ${args.oldIndex} to ${args.newIndex}. New value is "${this.sessionitems.getValue(
        //     args.newIndex)}"`);
        console.log("Selected ID " + args.newIndex);
        this.selectedCategory = this.categoriesDrop.getValue(args.newIndex);
        console.log("Selected Id Value  " + this.selectedCategory);
        this.categoryId = this.selectedCategory;
        // this.getProductByCategoryId(this.selectedCategory);
        this._changeDetectionRef.detectChanges();
    };
    ShopComponent.prototype.onsortchange = function (args) {
        // console.log(`Drop Down selected index changed  ${args.oldIndex} to ${args.newIndex}. New value is "${this.sessionitems.getValue(
        //     args.newIndex)}"`);
        console.log("Selected ID " + args.newIndex);
        this.selectedSort = this.sortList.getValue(args.newIndex);
        console.log("Selected Id Value  " + this.selectedSort);
    };
    ShopComponent.prototype.onfilterchange = function (args) {
        // console.log(`Drop Down selected index changed  ${args.oldIndex} to ${args.newIndex}. New value is "${this.sessionitems.getValue(
        //     args.newIndex)}"`);
        console.log("Selected ID " + args.newIndex);
        this.selectedFilter = this.filterList.getValue(args.newIndex);
        console.log("Selected Id Value  " + this.selectedFilter);
    };
    ShopComponent.prototype.getCooperative = function () {
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
    ShopComponent.prototype.getCooperativeStaff = function (staffId, cooperativeId) {
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
    ShopComponent.prototype.sendVerifyAuth = function (verifyAuth) {
        console.log("Verify " + verifyAuth.staffId);
        this.cooperativeStaffService.verifyAuthToCreatLater(verifyAuth).subscribe(function (data) {
            console.log("Very Auth " + JSON.stringify(data["data"]));
        }, function (err) {
            console.log(err);
        });
    };
    ShopComponent.prototype.getProductByCategoryId = function (categoryId) {
        var _this = this;
        console.log("Category Id " + categoryId);
        this.products = [];
        loader.show(options);
        this.productService.getallproductByCategory(categoryId).subscribe(function (data) {
            //console.log("Products  " + JSON.stringify(data["data"]));
            _this.products = data["data"];
            _this.searchedProducts = [];
            for (var _i = 0, _a = _this.products; _i < _a.length; _i++) {
                var item = _a[_i];
                _this.searchedProducts.push(item.product);
            }
            _this.sv.nativeElement.scrollToVerticalOffset(0, true);
            _this._changeDetectionRef.detectChanges();
            loader.hide();
        }, function (err) {
            console.log(err);
        });
    };
    ShopComponent.prototype.getCategory = function () {
        var _this = this;
        this.categoryService.getAllCategory().subscribe(function (data) {
            // console.log("Account Balances from DB " + JSON.stringify(data["data"]));
            _this.categories = data["data"];
            _this.getAdverts();
            _this.categoriesDrop = new nativescript_drop_down_1.ValueList();
            for (var loop = 0; loop < _this.categories.length; loop++) {
                _this.categoriesDrop.push({ value: "" + _this.categories[loop]._id,
                    display: "" + _this.categories[loop].categoryName,
                });
            }
            console.log("Shop Categories " + JSON.stringify(_this.categoriesDrop));
            _this._changeDetectionRef.detectChanges();
        }, function (err) {
            console.log(JSON.stringify(err));
        });
    };
    ShopComponent.prototype.getAdverts = function () {
        var _this = this;
        this.advertService.getallAdverts().subscribe(function (data) {
            // console.log("Adverts from DB " + JSON.stringify(data["data"]));
            _this.adverts = data["data"];
            _this.zone.run(function () {
                _this.images = [];
                for (var loop = 0; loop < _this.adverts.length; loop++) {
                    _this.images.push({ title: "" + _this.adverts[loop].ownerName,
                        url: "" + (_this.adsURL + _this.adverts[loop].advertImagePath),
                    });
                }
                console.log("Advert Images " + JSON.stringify(_this.images));
                _this.buildCarousel();
                _this._changeDetectionRef.detectChanges();
            });
            // console.log("Image List " + JSON.stringify(this.images));
        }, function (err) {
            console.log(JSON.stringify(err));
        });
    };
    ShopComponent.prototype.onTouch = function (args) {
        console.log("Page is touched");
        this.autoLogoutService.reset();
    };
    ShopComponent.prototype.onSubmit = function (args) {
        var searchBar = args.object;
        var searchValue = searchBar.text.toLowerCase();
        this.searchProducts(searchValue, 0, 5);
    };
    ShopComponent.prototype.onClear = function (args) {
        var searchBar = args.object;
        searchBar.text = "";
        searchBar.hint = "Search for products";
        this.searchedProducts = [];
        this._changeDetectionRef.detectChanges();
    };
    ShopComponent.prototype.sBLoaded = function (args) {
        var searchbar = args.object;
        if (platform_1.isAndroid) {
            searchbar.android.clearFocus();
        }
    };
    ShopComponent.prototype.searchProducts = function (searchValue, skipValue, limitValue) {
        var _this = this;
        loader.show(options);
        this.productService.searchProducts(searchValue, skipValue, limitValue).subscribe(function (data) {
            // console.log("Transaction from DB " + JSON.stringify(data["data"]));
            _this.searchedProducts = data["data"];
            _this._changeDetectionRef.detectChanges();
            loader.hide();
        }, function (err) {
            console.log(JSON.stringify(err));
        });
    };
    ShopComponent.prototype.onTap = function () {
        alert("clicked an item");
    };
    ShopComponent.prototype.openModal = function () {
        this.modal.show();
    };
    ShopComponent.prototype.closeModal = function () {
        this.modal.hide();
    };
    ShopComponent.prototype.onOpenModal = function () {
        console.log("opened modal");
    };
    ShopComponent.prototype.onCloseModal = function () {
        console.log("closed modal");
    };
    __decorate([
        core_1.ViewChild('bottomNavigation'),
        __metadata("design:type", core_1.ElementRef)
    ], ShopComponent.prototype, "bottomBar", void 0);
    __decorate([
        core_1.ViewChild(modal_1.ModalComponent),
        __metadata("design:type", modal_1.ModalComponent)
    ], ShopComponent.prototype, "modal", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], ShopComponent.prototype, "row", void 0);
    __decorate([
        core_1.ViewChild('carousel'),
        __metadata("design:type", core_1.ElementRef)
    ], ShopComponent.prototype, "carousel", void 0);
    __decorate([
        core_1.ViewChild("slides"),
        __metadata("design:type", core_1.ElementRef)
    ], ShopComponent.prototype, "slides", void 0);
    __decorate([
        core_1.ViewChild("myScroller"),
        __metadata("design:type", core_1.ElementRef)
    ], ShopComponent.prototype, "sv", void 0);
    __decorate([
        core_1.ViewChild("btn"),
        __metadata("design:type", core_1.ElementRef)
    ], ShopComponent.prototype, "btn", void 0);
    __decorate([
        core_1.ViewChild("grid"),
        __metadata("design:type", core_1.ElementRef)
    ], ShopComponent.prototype, "gr", void 0);
    ShopComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: "coopershop",
            templateUrl: "./shop.component.html",
            styleUrls: ["./shop-common.css", "./shop.component.css"],
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [common_1.Location, cooperative_service_1.CooperativeService, cooperativeStaff_service_1.CooperativeStaffService,
            router_1.Router, router_1.ActivatedRoute, product_service_1.ProductService,
            category_service_1.CategoryService, advert_service_1.AdvertService, router_2.RouterExtensions,
            core_1.ChangeDetectorRef,
            core_1.NgZone, page_1.Page, autologout_service_1.AutoLogoutService, sponsorproduct_service_1.SponsorProductService])
    ], ShopComponent);
    return ShopComponent;
}());
exports.ShopComponent = ShopComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hvcC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzaG9wLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUEwSjtBQUMxSiwwQ0FBeUQ7QUFHekQsbURBQWtEO0FBQ2xELElBQU0sWUFBWSxHQUFHLE9BQU8sQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDLFlBQVksQ0FBQztBQUluRSxzREFBNkQ7QUFDN0QsMENBQTJDO0FBTzNDLGlEQUF1RDtBQU12RCxpRUFBNkQ7QUFHN0QsMEVBQXdFO0FBQ3hFLGtFQUFnRTtBQUNoRSxvRUFBZ0U7QUFDaEUsZ0VBQTREO0FBRTVELG9GQUFrRjtBQUdsRiw4Q0FBNkM7QUFFN0MsaUZBQWdFO0FBR2hFLElBQUksTUFBTSxHQUFHLElBQUksaURBQWdCLEVBQUUsQ0FBQztBQUVwQyx3RUFBc0U7QUFNdEUseUNBQTJDO0FBQzNDLDJDQUFzRjtBQUN0RixxQ0FBcUM7QUFLckMsOENBQTZDO0FBRTdDLHdDQUFzQztBQUd0QyxrQ0FBMEM7QUFHMUMscURBQW9EO0FBQ3BELGdGQUE0RTtBQU01RSxJQUFJLE9BQU8sR0FBRztJQUNWLE9BQU8sRUFBRSxZQUFZO0lBQ3JCLFFBQVEsRUFBRSxJQUFJO0lBQ2QsT0FBTyxFQUFFO1FBQ1AsYUFBYSxFQUFFLElBQUk7UUFDbkIsVUFBVSxFQUFFLElBQUk7UUFDaEIsY0FBYyxFQUFFLFVBQVMsTUFBTSxJQUFJLE9BQU8sQ0FBQyxHQUFHLENBQUMsbUJBQW1CLENBQUMsQ0FBQSxDQUFDLENBQUM7UUFDckUsR0FBRyxFQUFFLEdBQUc7UUFDUixvQkFBb0IsRUFBRSxTQUFTO1FBQy9CLHFCQUFxQixFQUFFLElBQUk7UUFDM0IsYUFBYSxFQUFFLENBQUM7UUFDaEIsaUJBQWlCLEVBQUUsQ0FBQztRQUNwQixLQUFLLEVBQUUsU0FBUztLQUNqQjtJQUNELEdBQUcsRUFBRTtRQUNILE9BQU8sRUFBRSx5QkFBeUI7UUFDbEMsTUFBTSxFQUFFLEVB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c0JBQWMsQ0FBQztrQ0FBUSxzQkFBYztnREFBQztJQUV4QztRQUFSLFlBQUssRUFBRTs7OENBQVM7SUFFTTtRQUF0QixnQkFBUyxDQUFDLFVBQVUsQ0FBQztrQ0FBVyxpQkFBVTttREFBQztJQUd2QjtRQUFwQixnQkFBUyxDQUFDLFFBQVEsQ0FBQztrQ0FBUyxpQkFBVTtpREFBQztJQUVmO1FBQXhCLGdCQUFTLENBQUMsWUFBWSxDQUFDO2tDQUFLLGlCQUFVOzZDQUFDO0lBQ3RCO1FBQWpCLGdCQUFTLENBQUMsS0FBSyxDQUFDO2tDQUFNLGlCQUFVOzhDQUFDO0lBQ2Y7UUFBbEIsZ0JBQVMsQ0FBQyxNQUFNLENBQUM7a0NBQUssaUJBQVU7NkNBQUM7SUF6RHpCLGFBQWE7UUFWekIsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixRQUFRLEVBQUUsWUFBWTtZQUN0QixXQUFXLEVBQUUsdUJBQXVCO1lBQ3BDLFNBQVMsRUFBRSxDQUFDLG1CQUFtQixFQUFFLHNCQUFzQixDQUFDO1lBQ3hELGVBQWUsRUFBRSw4QkFBdUIsQ0FBQyxNQUFNO1NBRWxELENBQUM7eUNBcUV1QyxpQkFBUSxFQUE4Qix3Q0FBa0IsRUFBbUMsa0RBQXVCO1lBRXRJLGVBQU0sRUFBMEIsdUJBQWMsRUFBeUIsZ0NBQWM7WUFDOUUsa0NBQWUsRUFBd0IsOEJBQWEsRUFBMkIseUJBQWdCO1lBQzFGLHdCQUFpQjtZQUNoQyxhQUFNLEVBQWUsV0FBSSxFQUEyQixzQ0FBaUIsRUFBZ0MsOENBQXFCO09BdkUvSCxhQUFhLENBd3JCekI7SUFBRCxvQkFBQztDQUFBLEFBeHJCRCxJQXdyQkM7QUF4ckJZLHNDQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSwgSW5wdXQsIENoYW5nZURldGVjdG9yUmVmLENoYW5nZURldGVjdGlvblN0cmF0ZWd5LE5nWm9uZSxWaWV3Q2hpbGQsRWxlbWVudFJlZiB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IFJvdXRlciwgQWN0aXZhdGVkUm91dGUgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XHJcblxyXG5cclxuaW1wb3J0IHsgSW1hZ2UgfSBmcm9tICd0bnMtY29yZS1tb2R1bGVzL3VpL2ltYWdlJztcclxuY29uc3QgQ2Fyb3VzZWxJdGVtID0gcmVxdWlyZSgnbmF0aXZlc2NyaXB0LWNhcm91c2VsJykuQ2Fyb3VzZWxJdGVtO1xyXG5cclxuXHJcblxyXG5pbXBvcnQge1JvdXRlckV4dGVuc2lvbnN9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXJcIjtcclxuaW1wb3J0IHsgTG9jYXRpb24gfSBmcm9tIFwiQGFuZ3VsYXIvY29tbW9uXCI7XHJcbmltcG9ydCB7IFNuYWNrQmFyIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1zbmFja2JhclwiO1xyXG5pbXBvcnQgKiBhcyBBcHBsaWNhdGlvblNldHRpbmdzIGZyb20gXCJhcHBsaWNhdGlvbi1zZXR0aW5nc1wiO1xyXG5pbXBvcnQgeyBjb25uZWN0aW9uVHlwZSwgZ2V0Q29ubmVjdGlvblR5cGUgfSBmcm9tIFwiY29ubmVjdGl2aXR5XCI7XHJcbmltcG9ydCB7IEFuaW1hdGlvbiB9IGZyb20gXCJ1aS9hbmltYXRpb25cIjtcclxuaW1wb3J0IHsgVmlldyB9IGZyb20gXCJ1aS9jb3JlL3ZpZXdcIjtcclxuaW1wb3J0IHsgcHJvbXB0IH0gZnJvbSBcInVpL2RpYWxvZ3NcIjtcclxuaW1wb3J0IHsgUGFnZSwgaXNJT1MgfSBmcm9tICd0bnMtY29yZS1tb2R1bGVzL3VpL3BhZ2UnO1xyXG5pbXBvcnQgeyBUZXh0RmllbGQgfSBmcm9tIFwidWkvdGV4dC1maWVsZFwiO1xyXG5pbXBvcnQgKiBhcyB0ZXh0Vmlld01vZHVsZSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS90ZXh0LXZpZXdcIjtcclxuXHJcblxyXG5cclxuaW1wb3J0IHsgVmFsdWVMaXN0LCBEcm9wRG93biB9IGZyb20gXCJuYXRpdmVzY3JpcHQtZHJvcC1kb3duXCI7XHJcbmltcG9ydCB7IFNlbGVjdGVkSW5kZXhDaGFuZ2VkRXZlbnREYXRhIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1kcm9wLWRvd25cIjtcclxuaW1wb3J0IHsgQ29vcGVyYXRpdmUsIFByb2R1Y3QsU3BvbnNvclByb2R1Y3QsIEFkdmVydCB9IGZyb20gJy4uLy4uL21vZGVscy9pbmRleCc7XHJcbmltcG9ydCB7IENvb3BlcmF0aXZlU2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9jb29wZXJhdGl2ZS5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IFByb2R1Y3RTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL3Byb2R1Y3Quc2VydmljZVwiO1xyXG5pbXBvcnQge0NhdGVnb3J5U2VydmljZX0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL2NhdGVnb3J5LnNlcnZpY2VcIjtcclxuaW1wb3J0IHtBZHZlcnRTZXJ2aWNlfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvYWR2ZXJ0LnNlcnZpY2VcIjtcclxuXHJcbmltcG9ydCB7IENvb3BlcmF0aXZlU3RhZmZTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL2Nvb3BlcmF0aXZlU3RhZmYuc2VydmljZVwiO1xyXG5cclxuaW1wb3J0IHsgQ29vcGVyYXRpdmVTdGFmZiwgVmVyaWZ5QXV0aCxDYXRlZ29yeSB9IGZyb20gXCIuLi8uLi9tb2RlbHMvaW5kZXhcIjtcclxuaW1wb3J0IHsgQ29uZmlnIH0gZnJvbSBcIi4uLy4uL3NoYXJlZC9jb25maWdcIjtcclxuXHJcbmltcG9ydCB7TG9hZGluZ0luZGljYXRvcn0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1sb2FkaW5nLWluZGljYXRvclwiO1xyXG5pbXBvcnQgeyBCb3R0b21OYXZpZ2F0aW9uLCBCb3R0b21OYXZpZ2F0aW9uVGFiLCBPblRhYlNlbGVjdGVkRXZlbnREYXRhIH0gZnJvbSAnbmF0aXZlc2NyaXB0LWJvdHRvbS1uYXZpZ2F0aW9uJztcclxuXHJcbnZhciBsb2FkZXIgPSBuZXcgTG9hZGluZ0luZGljYXRvcigpO1xyXG5cclxuaW1wb3J0IHsgQXV0b0xvZ291dFNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9hdXRvbG9nb3V0LnNlcnZpY2UnO1xyXG5cclxuaW1wb3J0IHsgR2VzdHVyZUV2ZW50RGF0YSB9IGZyb20gXCJ1aS9nZXN0dXJlc1wiO1xyXG5cclxuaW1wb3J0IHsgVG91Y2hHZXN0dXJlRXZlbnREYXRhIH0gZnJvbSBcInVpL2dlc3R1cmVzXCI7XHJcblxyXG5pbXBvcnQgKiBhcyBhcHBsaWNhdGlvbiBmcm9tIFwiYXBwbGljYXRpb25cIjtcclxuaW1wb3J0IHsgQW5kcm9pZEFwcGxpY2F0aW9uLCBBbmRyb2lkQWN0aXZpdHlCYWNrUHJlc3NlZEV2ZW50RGF0YSB9IGZyb20gXCJhcHBsaWNhdGlvblwiO1xyXG5pbXBvcnQgeyBpc0FuZHJvaWQgfSBmcm9tIFwicGxhdGZvcm1cIjtcclxuXHJcbmltcG9ydCAqIGFzIGVsZW1lbnRSZWdpc3RyeU1vZHVsZSBmcm9tICduYXRpdmVzY3JpcHQtYW5ndWxhci9lbGVtZW50LXJlZ2lzdHJ5JztcclxuXHJcblxyXG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcclxuXHJcbmltcG9ydCAncnhqcy9hZGQvb2JzZXJ2YWJsZS9pbnRlcnZhbCc7XHJcblxyXG5pbXBvcnQgeyBTZWFyY2hCYXIgfSBmcm9tIFwidWkvc2VhcmNoLWJhclwiO1xyXG5pbXBvcnQgeyBNb2RhbENvbXBvbmVudCB9IGZyb20gXCIuLi9tb2RhbFwiO1xyXG5pbXBvcnQgeyBIdHRwQ2xpZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xyXG5cclxuaW1wb3J0IHsgZm9ya0pvaW4gfSBmcm9tIFwicnhqcy9vYnNlcnZhYmxlL2ZvcmtKb2luXCI7XHJcbmltcG9ydCB7U3BvbnNvclByb2R1Y3RTZXJ2aWNlfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvc3BvbnNvcnByb2R1Y3Quc2VydmljZVwiO1xyXG5pbXBvcnQgeyBTY3JvbGxWaWV3LCBTY3JvbGxFdmVudERhdGEgfSBmcm9tIFwidWkvc2Nyb2xsLXZpZXdcIjtcclxuaW1wb3J0IHsgQnV0dG9uIH0gZnJvbSBcInVpL2J1dHRvblwiO1xyXG5cclxuXHJcbmltcG9ydCB7IEdyaWRMYXlvdXQsIEdyaWRVbml0VHlwZSwgSXRlbVNwZWMgfSBmcm9tIFwidWkvbGF5b3V0cy9ncmlkLWxheW91dFwiO1xyXG52YXIgb3B0aW9ucyA9IHtcclxuICAgIG1lc3NhZ2U6ICdMb2FkaW5nLi4uJyxcclxuICAgIHByb2dyZXNzOiAwLjY1LFxyXG4gICAgYW5kcm9pZDoge1xyXG4gICAgICBpbmRldGVybWluYXRlOiB0cnVlLFxyXG4gICAgICBjYW5jZWxhYmxlOiB0cnVlLFxyXG4gICAgICBjYW5jZWxMaXN0ZW5lcjogZnVuY3Rpb24oZGlhbG9nKSB7IGNvbnNvbGUubG9nKFwiTG9hZGluZyBjYW5jZWxsZWRcIikgfSxcclxuICAgICAgbWF4OiAxMDAsXHJcbiAgICAgIHByb2dyZXNzTnVtYmVyRm9ybWF0OiBcIiUxZC8lMmRcIixcclxuICAgICAgcHJvZ3Jlc3NQZXJjZW50Rm9ybWF0OiAwLjUzLFxyXG4gICAgICBwcm9ncmVzc1N0eWxlOiAxLFxyXG4gICAgICBzZWNvbmRhcnlQcm9ncmVzczogMSxcclxuICAgICAgY29sb3I6IFwiIzRCOUVENlwiLCAvLyBjb2xvciBvZiBpbmRpY2F0b3IgYW5kIGxhYmVsc1xyXG4gICAgfSxcclxuICAgIGlvczoge1xyXG4gICAgICBkZXRhaWxzOiBcIkFkZGl0aW9uYWwgZGV0YWlsIG5vdGUhXCIsXHJcbiAgICAgIG1hcmdpbjogMTAsXHJcbiAgICAgIGRpbUJhY2tncm91bmQ6IHRydWUsXHJcbiAgICAgIGNvbG9yOiBcIiM0QjlFRDZcIiwgLy8gY29sb3Igb2YgaW5kaWNhdG9yIGFuZCBsYWJlbHNcclxuICAgICAgLy8gYmFja2dyb3VuZCBib3ggYXJvdW5kIGluZGljYXRvclxyXG4gICAgICAvLyBoaWRlQmV6ZWwgd2lsbCBvdmVycmlkZSB0aGlzIGlmIHRydWVcclxuICAgICAgYmFja2dyb3VuZENvbG9yOiBcInllbGxvd1wiLFxyXG4gICAgICB1c2VySW50ZXJhY3Rpb25FbmFibGVkOiBmYWxzZSwgLy8gZGVmYXVsdCB0cnVlLiBTZXQgZmFsc2Ugc28gdGhhdCB0aGUgdG91Y2hlcyB3aWxsIGZhbGwgdGhyb3VnaCBpdC5cclxuICAgICAgaGlkZUJlemVsOiB0cnVlLCAvLyBkZWZhdWx0IGZhbHNlLCBjYW4gaGlkZSB0aGUgc3Vycm91bmRpbmcgYmV6ZWxcclxuICAgIC8vICAgdmlldzogVUlWaWV3LCAvLyBUYXJnZXQgdmlldyB0byBzaG93IG9uIHRvcCBvZiAoRGVmYXVsdHMgdG8gZW50aXJlIHdpbmRvdylcclxuICAgIC8vICAgbW9kZTogLy8gc2VlIGlPUyBzcGVjaWZpYyBvcHRpb25zIGJlbG93XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcclxuICAgIHNlbGVjdG9yOiBcImNvb3BlcnNob3BcIixcclxuICAgIHRlbXBsYXRlVXJsOiBcIi4vc2hvcC5jb21wb25lbnQuaHRtbFwiLFxyXG4gICAgc3R5bGVVcmxzOiBbXCIuL3Nob3AtY29tbW9uLmNzc1wiLCBcIi4vc2hvcC5jb21wb25lbnQuY3NzXCJdLFxyXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcclxuICBcclxufSlcclxuXHJcblxyXG5leHBvcnQgY2xhc3MgU2hvcENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgQWZ0ZXJWaWV3SW5pdCxPbkRlc3Ryb3kgIHtcclxuICAgIHByb2R1Y3RJbWFnZVVybDogc3RyaW5nICA9IENvbmZpZy5wcm9kdWN0SW1hZ2VVUkw7XHJcbiAgICBhZHNVUkw6IHN0cmluZyAgPSBDb25maWcuYWRzVVJMO1xyXG4gICAgXHJcbiAgICBwdWJsaWMgaW5wdXQ6IGFueTtcclxuICAgIHNlbGVjdGVkQ29vcGVyYXRpdmVJbmRleDogbnVtYmVyO1xyXG4gICAgc2VsZWN0ZWRDb29wZXJhdGl2ZTogc3RyaW5nO1xyXG4gICAgc3RhZmZJZDogU3RyaW5nO1xyXG4gICAgY29vcGVyYXRpdmU6IEFycmF5PENvb3BlcmF0aXZlPiA9IFtdO1xyXG4gICAgaGludDogc3RyaW5nID0gXCIgXCI7XHJcbiAgICBzZWxlY3RlZENhdGVnb3J5OiBTdHJpbmc7XHJcbiAgICBzZWxlY3RlZENhdGVnb3J5SW5kZXg6IE51bWJlcjtcclxuXHJcbiAgICBwdWJsaWMgY2F0ZWdvcmllc0Ryb3A6IFZhbHVlTGlzdDxzdHJpbmc+O1xyXG4gICAgcHVibGljIHNvcnRMaXN0OiBWYWx1ZUxpc3Q8c3RyaW5nPjtcclxuICAgIHNlbGVjdGVkU29ydDogU3RyaW5nO1xyXG4gICAgc2VsZWN0ZWRTb3J0SW5kZXg6IE51bWJlcjtcclxuICAgIHNvcnRoaW50OiBTdHJpbmcgPSBcIlNvcnRcIjtcclxuXHJcbiAgICBwdWJsaWMgZmlsdGVyTGlzdDogVmFsdWVMaXN0PHN0cmluZz47XHJcbiAgICBzZWxlY3RlZEZpbHRlcjogU3RyaW5nO1xyXG4gICAgc2VsZWN0ZWRGaWx0ZXJJbmRleDogTnVtYmVyO1xyXG4gICAgZmlsdGVyaGludDogU3RyaW5nID0gXCJGaWx0ZXJcIjtcclxuICAgIHB1YmxpYyBjb29wZXJhdGl2ZUxpc3Q6IFZhbHVlTGlzdDxzdHJpbmc+O1xyXG4gICAgcHVibGljIGNzc0NsYXNzOiBzdHJpbmcgPSBcImRlZmF1bHRcIjtcclxuICAgIGNhdGVnb3J5aGludDogU3RyaW5nID0gXCJDYXRlZ29yeVwiO1xyXG4gICAgY29vcGVyYXRpdmVTdGFmZjogQ29vcGVyYXRpdmVTdGFmZjtcclxuICAgIHZlcmlmeUF1dGg6IFZlcmlmeUF1dGg7XHJcbiAgICBjYXRlZ29yeUlkOiBTdHJpbmc7XHJcbiAgICBjYXRlZ29yaWVzOiBBcnJheTxDYXRlZ29yeT4gPSBbXTtcclxuICAgIHByb2R1Y3RzOiBBcnJheTxTcG9uc29yUHJvZHVjdD4gPSBbXTtcclxuICAgIGFkdmVydHM6IEFycmF5PEFkdmVydD4gPSBbXTtcclxuICAgIHByaXZhdGUgX2JvdHRvbU5hdmlnYXRpb246IEJvdHRvbU5hdmlnYXRpb247XHJcbiAgICBzdWI6IGFueTtcclxuICAgIHNlYXJjaGVkUHJvZHVjdHM6IEFycmF5PFByb2R1Y3Q+ID0gW10gO1xyXG4gICAgc3BvbnNvcnByb2R1Y3RzOiBBcnJheTxTcG9uc29yUHJvZHVjdD4gO1xyXG5cclxuICAgICBub3RpZmljYXRpb246IFN0cmluZyA9IFwiWW91IGNhbiBhY2Nlc3MgeW91ciBwZXJzb25hbCBvZmZlciwgdXBkYXRlcyBhbmQgcHJpY2UgZHJvcCBoZXJlXCI7XHJcbiAgICAvL2ltYWdlczogQXJyYXk8YW55PjtcclxuXHJcbiAgIGltYWdlczogQXJyYXk8YW55PiA9IFtdO1xyXG4gICBwYWdlbnVtYmVyOiBudW1iZXIgPSAwO1xyXG5cclxuICAgXHJcbiAgICBAVmlld0NoaWxkKCdib3R0b21OYXZpZ2F0aW9uJykgYm90dG9tQmFyOiBFbGVtZW50UmVmO1xyXG5cclxuICAgIEBWaWV3Q2hpbGQoTW9kYWxDb21wb25lbnQpIG1vZGFsOiBNb2RhbENvbXBvbmVudDtcclxuXHJcbiAgICBASW5wdXQoKSByb3cgPSAwO1xyXG5cclxuICAgIEBWaWV3Q2hpbGQoJ2Nhcm91c2VsJykgY2Fyb3VzZWw6IEVsZW1lbnRSZWY7XHJcbiAgICBwdWJsaWMgaW1hZ2VzU2xpZGU6IEFycmF5PGFueT4gPSBbXTtcclxuXHJcbiAgICBAVmlld0NoaWxkKFwic2xpZGVzXCIpIHNsaWRlczogRWxlbWVudFJlZjtcclxuXHJcbiAgICBAVmlld0NoaWxkKFwibXlTY3JvbGxlclwiKSBzdjogRWxlbWVudFJlZjtcclxuICAgIEBWaWV3Q2hpbGQoXCJidG5cIikgYnRuOiBFbGVtZW50UmVmO1xyXG4gICAgQFZpZXdDaGlsZChcImdyaWRcIikgZ3I6IEVsZW1lbnRSZWY7XHJcblxyXG4gICAgc2Nyb2xsTGF5b3V0OiBTY3JvbGxWaWV3O1xyXG4gICAgYnV0dG9uOiBCdXR0b247XHJcbiAgICBncmlkOiBHcmlkTGF5b3V0O1xyXG5cclxuXHJcblxyXG4gICAgIFxyXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKHByaXZhdGUgbG9jYXRpb246IExvY2F0aW9uLCBwcml2YXRlIGNvb3BlcmF0aXZlU2VydmljZTogQ29vcGVyYXRpdmVTZXJ2aWNlLCBwcml2YXRlIGNvb3BlcmF0aXZlU3RhZmZTZXJ2aWNlOiBDb29wZXJhdGl2ZVN0YWZmU2VydmljZSxcclxuICAgIFxyXG4gICAgIHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsIHByaXZhdGUgYWN0aXZhdGVkUm91dGU6IEFjdGl2YXRlZFJvdXRlLCBwcml2YXRlIHByb2R1Y3RTZXJ2aWNlOlByb2R1Y3RTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBjYXRlZ29yeVNlcnZpY2U6Q2F0ZWdvcnlTZXJ2aWNlLCBwcml2YXRlIGFkdmVydFNlcnZpY2U6QWR2ZXJ0U2VydmljZSxwcml2YXRlIHJvdXRlckV4dGVuc2lvbnM6IFJvdXRlckV4dGVuc2lvbnMsXHJcbiAgICBwcml2YXRlIF9jaGFuZ2VEZXRlY3Rpb25SZWY6IENoYW5nZURldGVjdG9yUmVmLFxyXG4gICAgcHJpdmF0ZSB6b25lOiBOZ1pvbmUscHJpdmF0ZSBwYWdlOiBQYWdlLHByaXZhdGUgYXV0b0xvZ291dFNlcnZpY2U6QXV0b0xvZ291dFNlcnZpY2UsIHByaXZhdGUgc3BvbnNvclByb2R1Y3RTZXJ2aWNlOlNwb25zb3JQcm9kdWN0U2VydmljZSxcclxuICAgICkge1xyXG4gICAgICAgIFxyXG4gICAgICAgXHJcbiAgICAgICAgdGhpcy5wYWdlLmFjdGlvbkJhckhpZGRlbiA9IHRydWU7XHJcbiAgICBcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGJ1aWxkQ2Fyb3VzZWwoKTogdm9pZCB7XHJcbiAgICAgIFxyXG4gICAgICAgIGxldCBjb3VudCA9IDA7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGltYWdlRGF0YSBvZiB0aGlzLmltYWdlcykge1xyXG5cclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCIgSW1hZ2UgUGF0aCBcIiArIGltYWdlRGF0YS51cmwpO1xyXG4gICAgICAgICAgICBjb25zdCBpbWFnZSA9IG5ldyBJbWFnZSgpO1xyXG4gICAgICAgICAgXHJcbiAgICAgICAgICAgIGltYWdlLmhlaWdodCA9IDIwMDtcclxuICAgICAgICAgICAgaW1hZ2Uuc3JjID0gaW1hZ2VEYXRhLnVybDtcclxuICAgICAgICAgICAgaW1hZ2UuY2xhc3NOYW1lID0gXCJpbWFnZVwiO1xyXG4gICAgICAgICAgICBpbWFnZS5zdHJldGNoID0gXCJhc3BlY3RGaWxsXCI7XHJcbiAgICAgICAgICAgIGltYWdlLmxvYWRNb2RlID0gXCJhc3luY1wiO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgaXRlbSA9IG5ldyBDYXJvdXNlbEl0ZW0oKTtcclxuICAgICAgICAgICAgaXRlbS5hZGRDaGlsZChpbWFnZSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmNhcm91c2VsLm5hdGl2ZUVsZW1lbnQuYWRkQ2hpbGQoaXRlbSk7XHJcbiAgICAgICAgICAgIGNvdW50Kys7XHJcblxyXG4gICAgICAgICAgICBpZiAoaXNBbmRyb2lkKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBhZGFwdGVyID0gdGhpcy5jYXJvdXNlbC5uYXRpdmVFbGVtZW50LmFuZHJvaWQuZ2V0QWRhcHRlcigpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChhZGFwdGVyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWRhcHRlci5ub3RpZnlEYXRhU2V0Q2hhbmdlZCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2Fyb3VzZWwubmF0aXZlRWxlbWVudC5fcGFnZUluZGljYXRvclZpZXcuc2V0Q291bnQoY291bnQpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoY291bnQgPT09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jYXJvdXNlbC5uYXRpdmVFbGVtZW50Ll9wYWdlSW5kaWNhdG9yVmlldy5zZXRTZWxlY3Rpb24oaXRlbS5hbmRyb2lkKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuY2Fyb3VzZWwubmF0aXZlRWxlbWVudC5yZWZyZXNoKCk7XHJcblxyXG4gICAgICAgIHRoaXMucGFnZW51bWJlciA9IDE7XHJcbiAgICB9XHJcbiAgXHJcbiAgICBwdWJsaWMgc2Nyb2xsVG8oKSB7XHJcblxyXG4gICAgICAgIHRoaXMuc3YubmF0aXZlRWxlbWVudC5zY3JvbGxUb1ZlcnRpY2FsT2Zmc2V0KDAsIHRydWUpO1xyXG4gICAgICAgIC8vdGhpcy5zY3JvbGxMYXlvdXQuc2Nyb2xsVG9WZXJ0aWNhbE9mZnNldCh0aGlzLmdyaWQuZ2V0TG9jYXRpb25SZWxhdGl2ZVRvKHRoaXMuYnV0dG9uKS55LCBmYWxzZSk7ICAgXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG5nT25Jbml0KCkge1xyXG5cclxuICAgICAgICB0aGlzLnNjcm9sbExheW91dCA9IHRoaXMuc3YubmF0aXZlRWxlbWVudDtcclxuICAgICAgICAvLyB0aGlzLmJ1dHRvbiA9IHRoaXMuYnRuLm5hdGl2ZUVsZW1lbnQ7IFxyXG4gICAgICAgIC8vIHRoaXMuZ3JpZCA9IHRoaXMuZ3IubmF0aXZlRWxlbWVudDtcclxuICAgICAgICB0aGlzLmNhdGVnb3J5SWQgPSB0aGlzLmFjdGl2YXRlZFJvdXRlLnNuYXBzaG90LnBhcmFtc1tcImlkXCJdO1xyXG5cclxuICAgICAgICBjb25zb2xlLmxvZyhcIlNlbGVjdGVkIENhdGVnb3J5IFwiICsgdGhpcy5jYXRlZ29yeUlkKTtcclxuXHJcblxyXG5cclxuICAgICAgICBmb3JrSm9pbihbXHJcbiAgICAgICAgICAgIHRoaXMuY2F0ZWdvcnlTZXJ2aWNlLmdldEFsbENhdGVnb3J5KCksXHJcblxyXG4gICAgICAgICAgICB0aGlzLnNwb25zb3JQcm9kdWN0U2VydmljZS5nZXRhbGxTcG9uc29yUHJvZHVjdHMoKSxcclxuXHJcbiAgICAgICAgICAgIHRoaXMuYWR2ZXJ0U2VydmljZS5nZXRhbGxBZHZlcnRzKClcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBdKS5zdWJzY3JpYmUoKHJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiPDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PCBmaXJzdCB2YWx1ZT4+Pj4+Pj4+Pj4+XCIgKyBKU09OLnN0cmluZ2lmeShyZXNwb25zZVswXSkpO1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIjw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDwgc2Vjb25kIHZhbHVlPj4+Pj4+Pj4+Pj5cIiArIEpTT04uc3RyaW5naWZ5KHJlc3BvbnNlWzFdKSk7XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiPDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PCB0aGlyZCB2YWx1ZT4+Pj4+Pj4+Pj4+XCIgKyBKU09OLnN0cmluZ2lmeShyZXNwb25zZVsyXSkpO1xyXG4gICAgICAgICAgIFxyXG4gICAgICAgICAgICB0aGlzLmNhdGVnb3JpZXMgPSByZXNwb25zZVswXVtcImRhdGFcIl07XHJcblxyXG4gICAgICAgICAgIFxyXG4gICAgICAgICAgICB0aGlzLnNwb25zb3Jwcm9kdWN0cyA9IHJlc3BvbnNlWzFdW1wiZGF0YVwiXTtcclxuICAgICAgICAgICAgdGhpcy5hZHZlcnRzID0gcmVzcG9uc2VbMl1bXCJkYXRhXCJdO1xyXG5cclxuICAgICAgICAgICAgaWYodGhpcy5hZHZlcnRzLmxlbmd0aCA+IDApXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pbWFnZXMgPSBbXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yICggbGV0IGxvb3AgPSAwOyBsb29wIDwgdGhpcy5hZHZlcnRzLmxlbmd0aDsgbG9vcCsrICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pbWFnZXMucHVzaCh7IHRpdGxlOiAgIGAke3RoaXMuYWR2ZXJ0c1tsb29wXS5vd25lck5hbWV9YCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVybDogYCR7dGhpcy5hZHNVUkwgKyAgdGhpcy5hZHZlcnRzW2xvb3BdLmFkdmVydEltYWdlUGF0aH1gLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJBZHZlcnQgSW1hZ2VzIFwiICsgSlNPTi5zdHJpbmdpZnkodGhpcy5pbWFnZXMpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmJ1aWxkQ2Fyb3VzZWwoKTtcclxuICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLl9jaGFuZ2VEZXRlY3Rpb25SZWYuZGV0ZWN0Q2hhbmdlcygpO1xyXG4gICAgICAgICAgXHJcblxyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICApO1xyXG5cclxuICAgICAgXHJcbiAgICAgICAvLyB0aGlzLmdldFByb2R1Y3RCeUNhdGVnb3J5SWQodGhpcy5jYXRlZ29yeUlkKTtcclxuXHJcbiAgICAgICAgdGhpcy5zb3J0TGlzdCA9IG5ldyBWYWx1ZUxpc3Q8c3RyaW5nPihbXHJcbiAgICAgICAgICAgIHsgdmFsdWU6IFwiTkFcIiwgZGlzcGxheTogXCJOZXcgQXJyaXZhbFwiIH0sIFxyXG4gICAgICAgICAgICB7IHZhbHVlOiBcIlBVXCIsIGRpc3BsYXk6IFwiUHJpY2UgVXBcIiB9LFxyXG4gICAgICAgICAgICB7IHZhbHVlOiBcIlBEXCIsIGRpc3BsYXk6IFwiUHJpY2UgRG93blwiIH0sXHJcbiAgICAgICAgICAgIHsgdmFsdWU6IFwiUFwiLCBkaXNwbGF5OiBcIlBvcHVsYXJpdHlcIiB9LFxyXG4gICAgICAgICAgICB7IHZhbHVlOiBcIkJSXCIsIGRpc3BsYXk6IFwiQmVzdCBSYXRpbmdcIiB9XHJcbiAgICAgICAgXSk7XHJcblxyXG4gICAgICAgIHRoaXMuZmlsdGVyTGlzdCA9IG5ldyBWYWx1ZUxpc3Q8c3RyaW5nPihbXHJcbiAgICAgICAgICAgIHsgdmFsdWU6IFwiQ29sb3JcIiwgZGlzcGxheTogXCJDb2xvclwiIH0sIFxyXG4gICAgICAgICAgICB7IHZhbHVlOiBcIlNpemVcIiwgZGlzcGxheTogXCJTaXplXCIgfSxcclxuICAgICAgICAgICAgeyB2YWx1ZTogXCJQcmljZVwiLCBkaXNwbGF5OiBcIlByaWNlXCIgfSxcclxuICAgICAgICAgICAgeyB2YWx1ZTogXCJCcmFuZFwiLCBkaXNwbGF5OiBcIkJyYW5kXCIgfVxyXG4gICAgICAgICAgXHJcbiAgICAgICAgXSk7XHJcblxyXG4gICAgICBcclxuICAgICAgICAvL3RoaXMuX2JvdHRvbU5hdmlnYXRpb24gPSB0aGlzLnBhZ2UuZ2V0Vmlld0J5SWQoJ2JvdHRvbU5hdmlnYXRpb24nKTtcclxuICAgICAgICBcclxuXHJcbiAgICAgICBcclxuICAgICAgICAvL3RoaXMuZ2V0Q2F0ZWdvcnkoKTtcclxuXHJcbiAgICBcclxuICAgICAgICAvLyBpZiAoIWlzQW5kcm9pZCkge1xyXG4gICAgICAgIC8vICAgICByZXR1cm47XHJcbiAgICAgICAgLy8gICB9XHJcbiAgICAgICAgLy8gICBhcHBsaWNhdGlvbi5hbmRyb2lkLm9uKEFuZHJvaWRBcHBsaWNhdGlvbi5hY3Rpdml0eUJhY2tQcmVzc2VkRXZlbnQsIChkYXRhOiBBbmRyb2lkQWN0aXZpdHlCYWNrUHJlc3NlZEV2ZW50RGF0YSkgPT4ge1xyXG4gICAgICAgIC8vICAgICBpZiAodGhpcy5yb3V0ZXIuaXNBY3RpdmUoXCIvc2hvcFwiLCBmYWxzZSkpIHtcclxuICAgICAgICAvLyAgICAgIC8vIGRhdGEuY2FuY2VsID0gdHJ1ZTsgLy8gcHJldmVudHMgZGVmYXVsdCBiYWNrIGJ1dHRvbiBiZWhhdmlvclxyXG4gICAgICAgIC8vICAgICAgIC8vdGhpcy5sb2dvdXQoKTtcclxuXHJcbiAgICAgICAgLy8gICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW1wiL11cIl0sIHsgcmVwbGFjZVVybDogdHJ1ZSB9KTtcclxuXHJcbiAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAvLyAgIH0pO1xyXG5cclxuXHJcbiAgICAgICAgLy8gICBhcHBsaWNhdGlvbi5hbmRyb2lkLm9uKEFuZHJvaWRBcHBsaWNhdGlvbi5hY3Rpdml0eUJhY2tQcmVzc2VkRXZlbnQsIChkYXRhOiBBbmRyb2lkQWN0aXZpdHlCYWNrUHJlc3NlZEV2ZW50RGF0YSkgPT4ge1xyXG4gICAgICAgIC8vICAgICBpZiAodGhpcy5yb3V0ZXIuaXNBY3RpdmUoXCJidXlcIiwgZmFsc2UpKSB7XHJcbiAgICAgICAgLy8gICAgICAgICBjb25zb2xlLmxvZyhcIlJlYWNoaW5nIFNob3AgQmFjayBCdXR0b25cIik7XHJcbiAgICAgICAgLy8gICAgICAgZGF0YS5jYW5jZWwgPSB0cnVlOyAvLyBwcmV2ZW50cyBkZWZhdWx0IGJhY2sgYnV0dG9uIGJlaGF2aW9yXHJcbiAgICAgICAgLy8gICAgICAgLy90aGlzLmxvZ291dCgpO1xyXG4gICAgICAgIC8vICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFtcIi9cIl0pO1xyXG4gICAgICAgIC8vICAgICB9XHJcbiAgICAgICAgLy8gICB9KTtcclxuICAgICAgIFxyXG4gICAgICAgIGlmICghaXNBbmRyb2lkKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgIH1cclxuICAgICAgICBhcHBsaWNhdGlvbi5hbmRyb2lkLm9uKEFuZHJvaWRBcHBsaWNhdGlvbi5hY3Rpdml0eUJhY2tQcmVzc2VkRXZlbnQsIChkYXRhOiBBbmRyb2lkQWN0aXZpdHlCYWNrUHJlc3NlZEV2ZW50RGF0YSkgPT4ge1xyXG4gICAgICAgICAgICBkYXRhLmNhbmNlbCA9IHRydWU7IFxyXG4gICAgICAgICAgICAvLyBpZiAodGhpcy5yb3V0ZXIuaXNBY3RpdmUoXCIvXCIsIGZhbHNlKSkge1xyXG4gICAgICAgICAgICAvLyAgIGRhdGEuY2FuY2VsID0gdHJ1ZTsgLy8gcHJldmVudHMgZGVmYXVsdCBiYWNrIGJ1dHRvbiBiZWhhdmlvclxyXG4gICAgICAgICAgICAvLyAgIC8vdGhpcy5sb2dvdXQoKTtcclxuXHJcbiAgICAgICAgICAgIC8vICAgLy90aGlzLnJvdXRlci5uYXZpZ2F0ZShbXCIvbG9naW5cIl0pO1xyXG5cclxuICAgICAgICAgICAgLy8gfVxyXG5cclxuICAgICAgICAgICAgLy8gaWYgKHRoaXMucm91dGVyLmlzQWN0aXZlKFwiL2J1eVwiLCBmYWxzZSkpIHtcclxuICAgICAgICAgICAgLy8gICAgIGRhdGEuY2FuY2VsID0gdHJ1ZTsgLy8gcHJldmVudHMgZGVmYXVsdCBiYWNrIGJ1dHRvbiBiZWhhdmlvclxyXG4gICAgICAgICAgICAvLyAgICAgLy90aGlzLmxvZ291dCgpO1xyXG4gIFxyXG4gICAgICAgICAgICAvLyAgICAgLy90aGlzLnJvdXRlci5uYXZpZ2F0ZShbXCIvbG9naW5cIl0pO1xyXG4gIFxyXG4gICAgICAgICAgICAvLyAgIH1cclxuICAgICAgICAgICAgIFxyXG4gICAgICAgICAgIFxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgY2hhbmdlSW1hZ2UoKVxyXG4gICAge1xyXG4gICAgICAgXHJcbiAgICAgICAgbGV0IHNsaWRlcyA9IHRoaXMuY2Fyb3VzZWwubmF0aXZlRWxlbWVudDtcclxuICAgICAgICAgaWYodGhpcy5wYWdlbnVtYmVyID09PSB0aGlzLmltYWdlcy5sZW5ndGgpXHJcbiAgICAgICAgIHtcclxuICAgICAgICAgICAgIHRoaXMucGFnZW51bWJlciA9IDA7XHJcbiAgICAgICAgIH1cclxuICAgICAgIFxyXG4gICAgICAgIHNsaWRlcy5zZWxlY3RlZFBhZ2UgPSB0aGlzLnBhZ2VudW1iZXI7XHJcblxyXG4gICAgICAgIHRoaXMucGFnZW51bWJlciArPSAxO1xyXG5cclxuICAgICBcclxuICAgICAgICB0aGlzLl9jaGFuZ2VEZXRlY3Rpb25SZWYuZGV0ZWN0Q2hhbmdlcygpO1xyXG4gICAgfVxyXG5cclxuICAgIHNodWZmbGUoYXJyYXkpIHtcclxuICAgICAgICB2YXIgY3VycmVudEluZGV4ID0gYXJyYXkubGVuZ3RoLCB0ZW1wb3JhcnlWYWx1ZSwgcmFuZG9tSW5kZXg7XHJcbiAgICAgIFxyXG4gICAgICAgIC8vIFdoaWxlIHRoZXJlIHJlbWFpbiBlbGVtZW50cyB0byBzaHVmZmxlLi4uXHJcbiAgICAgICAgd2hpbGUgKDAgIT09IGN1cnJlbnRJbmRleCkge1xyXG4gICAgICBcclxuICAgICAgICAgIC8vIFBpY2sgYSByZW1haW5pbmcgZWxlbWVudC4uLlxyXG4gICAgICAgICAgcmFuZG9tSW5kZXggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBjdXJyZW50SW5kZXgpO1xyXG4gICAgICAgICAgY3VycmVudEluZGV4IC09IDE7XHJcbiAgICAgIFxyXG4gICAgICAgICAgLy8gQW5kIHN3YXAgaXQgd2l0aCB0aGUgY3VycmVudCBlbGVtZW50LlxyXG4gICAgICAgICAgdGVtcG9yYXJ5VmFsdWUgPSBhcnJheVtjdXJyZW50SW5kZXhdO1xyXG4gICAgICAgICAgYXJyYXlbY3VycmVudEluZGV4XSA9IGFycmF5W3JhbmRvbUluZGV4XTtcclxuICAgICAgICAgIGFycmF5W3JhbmRvbUluZGV4XSA9IHRlbXBvcmFyeVZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgICAgXHJcbiAgICAgICAgcmV0dXJuIGFycmF5O1xyXG4gICAgICB9XHJcblxyXG4gICAgbmdBZnRlclZpZXdJbml0KCkge1xyXG4gICAgICAgIC8vdGhpcy5nZXRCYWxhbmNlcyh0aGlzLmNvb3BlcklkKTtcclxuXHJcbiAgICAgICBcclxuXHJcbiAgICAgICAgLy90aGlzLl9ib3R0b21OYXZpZ2F0aW9uID0gdGhpcy5wYWdlLmdldFZpZXdCeUlkKCdib3R0b21OYXZpZ2F0aW9uJyk7XHJcblxyXG4gICAgICAgLy90aGlzLl9ib3R0b21OYXZpZ2F0aW9uLnNlbGVjdFRhYigyKTtcclxuICAgICAgICAvL3RoaXMuYm90dG9tQmFyLm5hdGl2ZUVsZW1lbnQuc2VsZWN0VGFiKDIpO1xyXG4gICAgICAgIC8vdGhpcy5nZXRDYXRlZ29yeSgpO1xyXG4gICAgIFxyXG5cclxuXHJcbiAgICAgICAgdGhpcy5zdWIgPSBPYnNlcnZhYmxlLmludGVydmFsKDUwMDApXHJcbiAgICAuc3Vic2NyaWJlKCh2YWwpID0+IHsgXHJcbiAgICAgICAgXHJcbiAgICAgICB0aGlzLmNoYW5nZUltYWdlKCk7XHJcblxyXG4gICAgICAgIFxyXG4gICAgXHJcbiAgICB9KVxyXG5cclxuXHJcbiAgICAvLyB0aGlzLmltYWdlcyA9IFtcclxuICAgIC8vICAgICB7XHJcbiAgICAvLyAgICAgICAgIHRpdGxlOiAnSW1hZ2UgMSAoVVJMKScsXHJcbiAgICAvLyAgICAgICAgIHVybDogJ2h0dHA6Ly8xOTIuMTY4LjguMTAwOjMwMDAvYWRzL2FwcGxlLnBuZydcclxuICAgIC8vICAgICB9LFxyXG4gICAgLy8gICAgIC8vIHtcclxuICAgIC8vICAgICAvLyAgICAgdGl0bGU6ICdJbWFnZSAyIChyZXNvdXJjZXMgZm9sZGVyKScsXHJcbiAgICAvLyAgICAgLy8gICAgIGZpbGU6ICdyZXM6Ly9tb3VudGFpbidcclxuICAgIC8vICAgICAvLyB9LFxyXG4gICAgLy8gICAgIC8vIHtcclxuICAgIC8vICAgICAvLyAgICAgdGl0bGU6ICdJbWFnZSAzIChhc3NldHMgZm9sZGVyKScsXHJcbiAgICAvLyAgICAgLy8gICAgIGZpbGU6ICd+L2Fzc2V0cy9zZWEtc3VucmlzZS5qcGcnXHJcbiAgICAvLyAgICAgLy8gfSxcclxuICAgIC8vICAgICB7XHJcbiAgICAvLyAgICAgICAgIHRpdGxlOiAnSW1hZ2UgNCAoVVJMKScsXHJcbiAgICAvLyAgICAgICAgIHVybDogJ2h0dHA6Ly8xOTIuMTY4LjguMTAwOjMwMDAvYWRzL09ubGluZWFkcy5wbmcnXHJcbiAgICAvLyAgICAgfSxcclxuICAgIC8vICAgICB7XHJcbiAgICAvLyAgICAgICAgIHRpdGxlOiAnSW1hZ2UgNSAoVVJMKScsXHJcbiAgICAvLyAgICAgICAgIHVybDogJ2h0dHA6Ly8xOTIuMTY4LjguMTAwOjMwMDAvYWRzL3lvdXR1YmUucG5nJ1xyXG4gICAgLy8gICAgIH0sXHJcbiAgICAvLyAgICAge1xyXG4gICAgLy8gICAgICAgICB0aXRsZTogJ0ltYWdlIDYgKFVSTCknLFxyXG4gICAgLy8gICAgICAgICB1cmw6ICdodHRwOi8vMTkyLjE2OC44LjEwMDozMDAwL2Fkcy9jb2ZmZWUuanBnJ1xyXG4gICAgLy8gICAgIH0sXHJcbiAgICAvLyBdO1xyXG4gICAgICAgIFxyXG4gICAvLyB0aGlzLnNsaWRlcy5uYXRpdmVFbGVtZW50Lk5leHRTbGlkZSgpO1xyXG5cclxuIFxyXG4gICBcclxuICAgICAgIFxyXG4gICB9XHJcblxyXG4gICBuZ09uRGVzdHJveSgpe1xyXG4gICAgdGhpcy5zdWIudW5zdWJzY3JpYmUoKTtcclxuICAgfVxyXG5cclxuICAgYm90dG9tTmF2aWdhdGlvbkxvYWRlZChhcmdzOiBPblRhYlNlbGVjdGVkRXZlbnREYXRhKVxyXG4gICB7XHJcbiAgICAvL3RoaXMuYm90dG9tQmFyLm5hdGl2ZUVsZW1lbnQub24oJ3RhYlNlbGVjdGVkJywgMik7XHJcbiAgICB0aGlzLmJvdHRvbUJhci5uYXRpdmVFbGVtZW50LnNlbGVjdFRhYigyKTtcclxuXHJcbiAgICAvL3RoaXMuZ2V0UHJvZHVjdEJ5Q2F0ZWdvcnlJZCh0aGlzLmNhdGVnb3J5SWQpO1xyXG4gICB9XHJcbiAgICBwdWJsaWMgcmVnaXN0ZXIoKSB7XHJcbiAgICAgICAgLy8gaWYodGhpcy5pbnB1dC5maXJzdG5hbWUgJiYgdGhpcy5pbnB1dC5sYXN0bmFtZSAmJiB0aGlzLmlucHV0LmVtYWlsICYmIHRoaXMuaW5wdXQucGFzc3dvcmQpIHtcclxuICAgICAgICAvLyAgICAgQXBwbGljYXRpb25TZXR0aW5ncy5zZXRTdHJpbmcoXCJhY2NvdW50XCIsIEpTT04uc3RyaW5naWZ5KHRoaXMuaW5wdXQpKTtcclxuICAgICAgICAvLyAgICAgdGhpcy5sb2NhdGlvbi5iYWNrKCk7XHJcbiAgICAgICAgLy8gfSBlbHNlIHtcclxuICAgICAgICAvLyAgICAgKG5ldyBTbmFja0JhcigpKS5zaW1wbGUoXCJBbGwgRmllbGRzIFJlcXVpcmVkIVwiKTtcclxuICAgICAgICAvLyB9XHJcblxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiUmVhY2hpbmcgUmVnaXN0ZXIgXCIpO1xyXG5cclxuICAgICAgICB0aGlzLmdldENvb3BlcmF0aXZlU3RhZmYodGhpcy5zdGFmZklkLCB0aGlzLnNlbGVjdGVkQ29vcGVyYXRpdmUpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uTmF2QnRuVGFwKCkge1xyXG4gICAgICAgIC8vIFRoaXMgY29kZSB3aWxsIGJlIGNhbGxlZCBvbmx5IGluIEFuZHJvaWQuXHJcbiAgICAgICAgY29uc29sZS5sb2coXCJOYXZpZ2F0aW9uIGJ1dHRvbiB0YXBwZWQhXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnb0JhY2soKSB7XHJcbiAgICAgICAgdGhpcy5sb2NhdGlvbi5iYWNrKCk7XHJcbiAgICB9XHJcbiAgICBzdGFydEJhY2tncm91bmRBbmltYXRpb24oYmFja2dyb3VuZCkge1xyXG4gICAgICAgIGJhY2tncm91bmQuYW5pbWF0ZSh7XHJcbiAgICAgICAgICAgIHNjYWxlOiB7IHg6IDEuMCwgeTogMS4wIH0sXHJcbiAgICAgICAgICAgIGR1cmF0aW9uOiAxMDAwMFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgbmF2aWdhdGVCYWNrKCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiR28gQmFjayBCdXR0b24gQ2xpY2tlZFwiICk7XHJcbiAgICAgICAgdGhpcy5yb3V0ZXJFeHRlbnNpb25zLmJhY2tUb1ByZXZpb3VzUGFnZSgpO1xyXG4gICAgfVxyXG4gICAgb25Cb3R0b21OYXZpZ2F0aW9uVGFiU2VsZWN0ZWQoYXJnczogT25UYWJTZWxlY3RlZEV2ZW50RGF0YSk6IHZvaWQge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGBUYWIgc2VsZWN0ZWQ6ICAke2FyZ3Mub2xkSW5kZXh9YCk7XHJcblxyXG4gICAgICAgIGlmKGFyZ3MubmV3SW5kZXggPT0gMClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW1wiXCJdKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZihhcmdzLm5ld0luZGV4ID09IDEpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFtcIi9hcHByb3ZlXCJdKTtcclxuICAgICAgICB9XHJcbiAgICAgICBcclxuICAgICAgICBlbHNlIGlmKGFyZ3MubmV3SW5kZXggPT0gMylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW1wiL2FjY291bnRcIl0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgcHVibGljIG9uY29vcGVyYXRpdmVjaGFuZ2UoYXJnczogU2VsZWN0ZWRJbmRleENoYW5nZWRFdmVudERhdGEpIHtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhgRHJvcCBEb3duIHNlbGVjdGVkIGluZGV4IGNoYW5nZWQgICR7YXJncy5vbGRJbmRleH0gdG8gJHthcmdzLm5ld0luZGV4fS4gTmV3IHZhbHVlIGlzIFwiJHt0aGlzLnNlc3Npb25pdGVtcy5nZXRWYWx1ZShcclxuICAgICAgICAvLyAgICAgYXJncy5uZXdJbmRleCl9XCJgKTtcclxuXHJcbiAgICAgICAgY29uc29sZS5sb2coXCJTZWxlY3RlZCBJRCBcIiArIGFyZ3MubmV3SW5kZXgpO1xyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRDb29wZXJhdGl2ZSA9IHRoaXMuY29vcGVyYXRpdmVMaXN0LmdldFZhbHVlKGFyZ3MubmV3SW5kZXgpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiU2VsZWN0ZWQgSWQgVmFsdWUgIFwiICsgdGhpcy5zZWxlY3RlZENvb3BlcmF0aXZlKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG9uY2F0ZWdvcnljaGFuZ2UoYXJnczogU2VsZWN0ZWRJbmRleENoYW5nZWRFdmVudERhdGEpIHtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhgRHJvcCBEb3duIHNlbGVjdGVkIGluZGV4IGNoYW5nZWQgICR7YXJncy5vbGRJbmRleH0gdG8gJHthcmdzLm5ld0luZGV4fS4gTmV3IHZhbHVlIGlzIFwiJHt0aGlzLnNlc3Npb25pdGVtcy5nZXRWYWx1ZShcclxuICAgICAgICAvLyAgICAgYXJncy5uZXdJbmRleCl9XCJgKTtcclxuXHJcbiAgICAgICAgY29uc29sZS5sb2coXCJTZWxlY3RlZCBJRCBcIiArIGFyZ3MubmV3SW5kZXgpO1xyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRDYXRlZ29yeSA9IHRoaXMuY2F0ZWdvcmllc0Ryb3AuZ2V0VmFsdWUoYXJncy5uZXdJbmRleCk7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJTZWxlY3RlZCBJZCBWYWx1ZSAgXCIgKyB0aGlzLnNlbGVjdGVkQ2F0ZWdvcnkpO1xyXG4gICAgICAgIHRoaXMuY2F0ZWdvcnlJZCA9IHRoaXMuc2VsZWN0ZWRDYXRlZ29yeTtcclxuXHJcbiAgICAgICAvLyB0aGlzLmdldFByb2R1Y3RCeUNhdGVnb3J5SWQodGhpcy5zZWxlY3RlZENhdGVnb3J5KTtcclxuICAgICAgICB0aGlzLl9jaGFuZ2VEZXRlY3Rpb25SZWYuZGV0ZWN0Q2hhbmdlcygpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBvbnNvcnRjaGFuZ2UoYXJnczogU2VsZWN0ZWRJbmRleENoYW5nZWRFdmVudERhdGEpIHtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhgRHJvcCBEb3duIHNlbGVjdGVkIGluZGV4IGNoYW5nZWQgICR7YXJncy5vbGRJbmRleH0gdG8gJHthcmdzLm5ld0luZGV4fS4gTmV3IHZhbHVlIGlzIFwiJHt0aGlzLnNlc3Npb25pdGVtcy5nZXRWYWx1ZShcclxuICAgICAgICAvLyAgICAgYXJncy5uZXdJbmRleCl9XCJgKTtcclxuXHJcbiAgICAgICAgY29uc29sZS5sb2coXCJTZWxlY3RlZCBJRCBcIiArIGFyZ3MubmV3SW5kZXgpO1xyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRTb3J0ID0gdGhpcy5zb3J0TGlzdC5nZXRWYWx1ZShhcmdzLm5ld0luZGV4KTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIlNlbGVjdGVkIElkIFZhbHVlICBcIiArIHRoaXMuc2VsZWN0ZWRTb3J0KTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG9uZmlsdGVyY2hhbmdlKGFyZ3M6IFNlbGVjdGVkSW5kZXhDaGFuZ2VkRXZlbnREYXRhKSB7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coYERyb3AgRG93biBzZWxlY3RlZCBpbmRleCBjaGFuZ2VkICAke2FyZ3Mub2xkSW5kZXh9IHRvICR7YXJncy5uZXdJbmRleH0uIE5ldyB2YWx1ZSBpcyBcIiR7dGhpcy5zZXNzaW9uaXRlbXMuZ2V0VmFsdWUoXHJcbiAgICAgICAgLy8gICAgIGFyZ3MubmV3SW5kZXgpfVwiYCk7XHJcblxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiU2VsZWN0ZWQgSUQgXCIgKyBhcmdzLm5ld0luZGV4KTtcclxuICAgICAgICB0aGlzLnNlbGVjdGVkRmlsdGVyID0gdGhpcy5maWx0ZXJMaXN0LmdldFZhbHVlKGFyZ3MubmV3SW5kZXgpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiU2VsZWN0ZWQgSWQgVmFsdWUgIFwiICsgdGhpcy5zZWxlY3RlZEZpbHRlcik7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIFxyXG5cclxuXHJcblxyXG4gICAgXHJcblxyXG4gICAgZ2V0Q29vcGVyYXRpdmUoKSB7XHJcbiAgICAgICAgdGhpcy5jb29wZXJhdGl2ZVNlcnZpY2UuZ2V0QWxsQ29vcGVyYXRpdmUoKS5zdWJzY3JpYmUoXHJcbiAgICAgICAgICAgIGRhdGEgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJDb29wZXJhdGl2ZSBMaXN0IFwiICsgSlNPTi5zdHJpbmdpZnkoZGF0YVtcImRhdGFcIl0pKTtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvb3BlcmF0aXZlID0gZGF0YVtcImRhdGFcIl07XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5jb29wZXJhdGl2ZUxpc3QgPSBuZXcgVmFsdWVMaXN0PHN0cmluZz4oKTtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGxvb3AgPSAwOyBsb29wIDwgdGhpcy5jb29wZXJhdGl2ZS5sZW5ndGg7IGxvb3ArKykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29vcGVyYXRpdmVMaXN0LnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogYCR7dGhpcy5jb29wZXJhdGl2ZVtsb29wXS5jb29wZXJhdGl2ZUlkfWAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6IGAke3RoaXMuY29vcGVyYXRpdmVbbG9vcF0uZmlyc3RfbmFtZX1gLFxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuXHJcblxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBlcnIgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIGdldENvb3BlcmF0aXZlU3RhZmYoc3RhZmZJZDogU3RyaW5nLCBjb29wZXJhdGl2ZUlkOiBTdHJpbmcpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIlN0YWZmIGFuZCBDb29wZXJhdGl2ZUlkIFwiICsgc3RhZmZJZCArIFwiIC0gXCIgKyBjb29wZXJhdGl2ZUlkKTtcclxuXHJcblxyXG4gICAgICAgIHRoaXMuY29vcGVyYXRpdmVTdGFmZlNlcnZpY2UuZ2V0Q29vcGVyYXRpdmVTdGFmZihzdGFmZklkLCBjb29wZXJhdGl2ZUlkKS5zdWJzY3JpYmUoXHJcbiAgICAgICAgICAgIGRhdGEgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJDb29wZXJhdGl2ZSBTdGFmZiBcIiArIEpTT04uc3RyaW5naWZ5KGRhdGFbXCJkYXRhXCJdKSk7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5jb29wZXJhdGl2ZVN0YWZmID0gZGF0YVtcImRhdGFcIl07XHJcblxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJWZXJpZnlpbmcgU3RhZmYgb3V0IHNpZGUgXCIgKyB0aGlzLmNvb3BlcmF0aXZlU3RhZmYuc3RhZmZJZCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlbmRWZXJpZnlBdXRoKHRoaXMuY29vcGVyYXRpdmVTdGFmZik7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGVyciA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgc2VuZFZlcmlmeUF1dGgodmVyaWZ5QXV0aDogQ29vcGVyYXRpdmVTdGFmZikge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiVmVyaWZ5IFwiICsgdmVyaWZ5QXV0aC5zdGFmZklkKTtcclxuXHJcblxyXG4gICAgICAgIHRoaXMuY29vcGVyYXRpdmVTdGFmZlNlcnZpY2UudmVyaWZ5QXV0aFRvQ3JlYXRMYXRlcih2ZXJpZnlBdXRoKS5zdWJzY3JpYmUoXHJcbiAgICAgICAgICAgIGRhdGEgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJWZXJ5IEF1dGggXCIgKyBKU09OLnN0cmluZ2lmeShkYXRhW1wiZGF0YVwiXSkpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBlcnIgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBnZXRQcm9kdWN0QnlDYXRlZ29yeUlkKGNhdGVnb3J5SWQ6IFN0cmluZykge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiQ2F0ZWdvcnkgSWQgXCIgKyBjYXRlZ29yeUlkKTtcclxuICAgICAgICB0aGlzLnByb2R1Y3RzID0gW107XHJcblxyXG4gICAgICAgIGxvYWRlci5zaG93KG9wdGlvbnMpO1xyXG5cclxuICAgICAgICB0aGlzLnByb2R1Y3RTZXJ2aWNlLmdldGFsbHByb2R1Y3RCeUNhdGVnb3J5KGNhdGVnb3J5SWQpLnN1YnNjcmliZShcclxuICAgICAgICAgICAgZGF0YSA9PiB7XHJcbiAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcIlByb2R1Y3RzICBcIiArIEpTT04uc3RyaW5naWZ5KGRhdGFbXCJkYXRhXCJdKSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnByb2R1Y3RzID0gZGF0YVtcImRhdGFcIl07XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5zZWFyY2hlZFByb2R1Y3RzID0gW107XHJcblxyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaXRlbSBvZiB0aGlzLnByb2R1Y3RzKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VhcmNoZWRQcm9kdWN0cy5wdXNoKGl0ZW0ucHJvZHVjdCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5zdi5uYXRpdmVFbGVtZW50LnNjcm9sbFRvVmVydGljYWxPZmZzZXQoMCwgdHJ1ZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5fY2hhbmdlRGV0ZWN0aW9uUmVmLmRldGVjdENoYW5nZXMoKTtcclxuICAgICAgICAgICAgICAgIGxvYWRlci5oaWRlKCk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGVyciA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0Q2F0ZWdvcnkoICl7XHJcbiAgICAgICBcclxuICAgIFxyXG5cclxuICAgICAgICB0aGlzLmNhdGVnb3J5U2VydmljZS5nZXRBbGxDYXRlZ29yeSgpLnN1YnNjcmliZShcclxuICAgICAgICAgICAgZGF0YSA9PiB7IFxyXG4gICAgXHJcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIkFjY291bnQgQmFsYW5jZXMgZnJvbSBEQiBcIiArIEpTT04uc3RyaW5naWZ5KGRhdGFbXCJkYXRhXCJdKSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNhdGVnb3JpZXMgPSBkYXRhW1wiZGF0YVwiXTtcclxuICAgICAgICAgICAgICB0aGlzLmdldEFkdmVydHMoKTtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLmNhdGVnb3JpZXNEcm9wID0gbmV3IFZhbHVlTGlzdDxzdHJpbmc+KCk7XHJcbiAgICAgICAgICAgICAgICBmb3IgKCBsZXQgbG9vcCA9IDA7IGxvb3AgPCB0aGlzLmNhdGVnb3JpZXMubGVuZ3RoOyBsb29wKysgKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNhdGVnb3JpZXNEcm9wLnB1c2goeyB2YWx1ZTogICBgJHt0aGlzLmNhdGVnb3JpZXNbbG9vcF0uX2lkfWAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6IGAke3RoaXMuY2F0ZWdvcmllc1tsb29wXS5jYXRlZ29yeU5hbWV9YCxcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICBcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiU2hvcCBDYXRlZ29yaWVzIFwiICsgSlNPTi5zdHJpbmdpZnkodGhpcy5jYXRlZ29yaWVzRHJvcCkpO1xyXG4gICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIHRoaXMuX2NoYW5nZURldGVjdGlvblJlZi5kZXRlY3RDaGFuZ2VzKCk7XHJcbiAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgIGVyciA9PiB7XHJcbiAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KGVycikpO1xyXG4gICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICk7XHQgIFxyXG4gICAgfVxyXG5cclxuICAgIGdldEFkdmVydHMoICl7XHJcbiAgICAgICBcclxuICAgIFxyXG5cclxuICAgICAgICB0aGlzLmFkdmVydFNlcnZpY2UuZ2V0YWxsQWR2ZXJ0cygpLnN1YnNjcmliZShcclxuICAgICAgICAgICAgZGF0YSA9PiB7IFxyXG4gICAgXHJcbiAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiQWR2ZXJ0cyBmcm9tIERCIFwiICsgSlNPTi5zdHJpbmdpZnkoZGF0YVtcImRhdGFcIl0pKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWR2ZXJ0cyA9IGRhdGFbXCJkYXRhXCJdO1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuem9uZS5ydW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pbWFnZXMgPSBbXTtcclxuXHJcbiAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgZm9yICggbGV0IGxvb3AgPSAwOyBsb29wIDwgdGhpcy5hZHZlcnRzLmxlbmd0aDsgbG9vcCsrICkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW1hZ2VzLnB1c2goeyB0aXRsZTogICBgJHt0aGlzLmFkdmVydHNbbG9vcF0ub3duZXJOYW1lfWAsXHJcbiAgICAgICAgICAgICAgICAgICAgdXJsOiBgJHt0aGlzLmFkc1VSTCArICB0aGlzLmFkdmVydHNbbG9vcF0uYWR2ZXJ0SW1hZ2VQYXRofWAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJBZHZlcnQgSW1hZ2VzIFwiICsgSlNPTi5zdHJpbmdpZnkodGhpcy5pbWFnZXMpKTtcclxuICAgICAgICAgICAgICAgICAgIHRoaXMuYnVpbGRDYXJvdXNlbCgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9jaGFuZ2VEZXRlY3Rpb25SZWYuZGV0ZWN0Q2hhbmdlcygpO1xyXG5cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJJbWFnZSBMaXN0IFwiICsgSlNPTi5zdHJpbmdpZnkodGhpcy5pbWFnZXMpKTtcclxuICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgZXJyID0+IHtcclxuICAgICAgICAgICAgICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkoZXJyKSk7XHJcbiAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgKTtcdCAgXHJcbiAgICB9XHJcblxyXG4gICAgb25Ub3VjaChhcmdzOiBUb3VjaEdlc3R1cmVFdmVudERhdGEpIHtcclxuXHJcbiAgICAgICAgY29uc29sZS5sb2coXCJQYWdlIGlzIHRvdWNoZWRcIik7XHJcbiAgICAgICB0aGlzLmF1dG9Mb2dvdXRTZXJ2aWNlLnJlc2V0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG9uU3VibWl0KGFyZ3MpIHtcclxuICAgICAgICBsZXQgc2VhcmNoQmFyID0gPFNlYXJjaEJhcj5hcmdzLm9iamVjdDtcclxuICAgICAgICBsZXQgc2VhcmNoVmFsdWUgPSBzZWFyY2hCYXIudGV4dC50b0xvd2VyQ2FzZSgpO1xyXG4gICAgXHJcbiAgICAgICAgdGhpcy5zZWFyY2hQcm9kdWN0cyhzZWFyY2hWYWx1ZSwwLDUpO1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwdWJsaWMgb25DbGVhcihhcmdzKSB7XHJcbiAgICAgICAgbGV0IHNlYXJjaEJhciA9IDxTZWFyY2hCYXI+YXJncy5vYmplY3Q7XHJcbiAgICAgICAgc2VhcmNoQmFyLnRleHQgPSBcIlwiO1xyXG4gICAgICAgIHNlYXJjaEJhci5oaW50ID0gXCJTZWFyY2ggZm9yIHByb2R1Y3RzXCI7XHJcbiAgICBcclxuICAgICAgICB0aGlzLnNlYXJjaGVkUHJvZHVjdHMgPSBbXTtcclxuICAgICAgICB0aGlzLl9jaGFuZ2VEZXRlY3Rpb25SZWYuZGV0ZWN0Q2hhbmdlcygpO1xyXG4gICAgfVxyXG4gICAgXHJcblxyXG4gICAgcHVibGljIHNCTG9hZGVkKGFyZ3Mpe1xyXG4gICAgICAgIHZhciBzZWFyY2hiYXI6U2VhcmNoQmFyID0gPFNlYXJjaEJhcj5hcmdzLm9iamVjdDtcclxuICAgICAgICBpZihpc0FuZHJvaWQpe1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgc2VhcmNoYmFyLmFuZHJvaWQuY2xlYXJGb2N1cygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBcclxuc2VhcmNoUHJvZHVjdHMoc2VhcmNoVmFsdWU6IFN0cmluZywgc2tpcFZhbHVlOiBudW1iZXIsIGxpbWl0VmFsdWU6IG51bWJlciApe1xyXG4gICAgICAgXHJcbiAgICBsb2FkZXIuc2hvdyhvcHRpb25zKTtcclxuXHJcbiAgICB0aGlzLnByb2R1Y3RTZXJ2aWNlLnNlYXJjaFByb2R1Y3RzKHNlYXJjaFZhbHVlLHNraXBWYWx1ZSxsaW1pdFZhbHVlKS5zdWJzY3JpYmUoXHJcbiAgICAgICAgZGF0YSA9PiB7IFxyXG5cclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJUcmFuc2FjdGlvbiBmcm9tIERCIFwiICsgSlNPTi5zdHJpbmdpZnkoZGF0YVtcImRhdGFcIl0pKTtcclxuICAgICAgICAgICAgdGhpcy5zZWFyY2hlZFByb2R1Y3RzID0gZGF0YVtcImRhdGFcIl07XHJcblxyXG4gICAgICAgICAgIHRoaXMuX2NoYW5nZURldGVjdGlvblJlZi5kZXRlY3RDaGFuZ2VzKCk7XHJcbiAgICAgICAgICAgbG9hZGVyLmhpZGUoKTtcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBlcnIgPT4ge1xyXG4gICAgICAgICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KGVycikpO1xyXG4gICAgICAgICAgIFxyXG4gICAgICAgICAgXHJcbiAgICAgICAgICAgICB9XHJcbiAgICAgICAgKTtcdCAgXHJcbn1cclxuXHJcbm9uVGFwKCkge1xyXG4gICAgYWxlcnQoXCJjbGlja2VkIGFuIGl0ZW1cIik7XHJcbn1cclxub3Blbk1vZGFsKCkge1xyXG4gICAgdGhpcy5tb2RhbC5zaG93KCk7XHJcbn1cclxuXHJcbmNsb3NlTW9kYWwoKSB7XHJcbiAgICB0aGlzLm1vZGFsLmhpZGUoKTtcclxufVxyXG5cclxub25PcGVuTW9kYWwoKSB7XHJcbiAgICBjb25zb2xlLmxvZyhcIm9wZW5lZCBtb2RhbFwiKTtcclxufVxyXG5cclxub25DbG9zZU1vZGFsKCkge1xyXG4gICAgY29uc29sZS5sb2coXCJjbG9zZWQgbW9kYWxcIik7XHJcbn1cclxuXHJcbn0iXX0=