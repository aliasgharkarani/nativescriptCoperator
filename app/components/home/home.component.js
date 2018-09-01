"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var platform_1 = require("platform");
var auth_service_1 = require("../../services/auth.service");
var coopercooperative_service_1 = require("../../services/coopercooperative.service");
var category_service_1 = require("../../services/category.service");
var sponsorproduct_service_1 = require("../../services/sponsorproduct.service");
var transaction_service_1 = require("../../services/transaction.service");
var productview_service_1 = require("../../services/productview.service");
var advert_service_1 = require("../../services/advert.service");
var product_service_1 = require("../../services/product.service");
var complaints_service_1 = require("../../services/complaints.service");
var nativescript_angular_1 = require("nativescript-angular");
var nativescript_bottombar_1 = require("nativescript-bottombar");
//import {TITLE_STATE} from 'nativescript-bottombar/index';
nativescript_angular_1.registerElement('BottomBar', function () { return nativescript_bottombar_1.BottomBar; });
nativescript_angular_1.registerElement("Fab", function () { return require("nativescript-floatingactionbutton").Fab; });
var nativescript_swipe_layout_1 = require("nativescript-swipe-layout");
nativescript_angular_1.registerElement('SwipeLayout', function () { return nativescript_swipe_layout_1.SwipeLayout; });
var nativescript_ngx_fonticon_1 = require("nativescript-ngx-fonticon");
var nativescript_drop_down_1 = require("nativescript-drop-down");
var LS = require("nativescript-localstorage");
var config_1 = require("../../shared/config");
var nativescript_loading_indicator_1 = require("nativescript-loading-indicator");
var loader = new nativescript_loading_indicator_1.LoadingIndicator();
var autologout_service_1 = require("../../services/autologout.service");
var elementRegistryModule = require("nativescript-angular/element-registry");
elementRegistryModule.registerElement("CardView", function () { return require("nativescript-cardview").CardView; });
elementRegistryModule.registerElement("Carousel", function () { return require("nativescript-carousel").Carousel; });
elementRegistryModule.registerElement("CarouselItem", function () { return require("nativescript-carousel").CarouselItem; });
var http_1 = require("@angular/common/http");
var Observable_1 = require("rxjs/Observable");
var forkJoin_1 = require("rxjs/observable/forkJoin");
require("rxjs/add/observable/interval");
var image_1 = require("tns-core-modules/ui/image");
var CarouselItem = require('nativescript-carousel').CarouselItem;
var imagepicker = require("nativescript-ssi-imagepicker");
var bgHttp = require("nativescript-background-http");
var nativescript_fancyalert_1 = require("nativescript-fancyalert");
var modal_1 = require("../modal");
// import * as dialogs from "ui/dialogs";
// import { ModalDialogService,ModalDialogOptions } from "nativescript-angular/directives/dialogs";
// import { ModalComponent } from "../../app.modal";
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
var AccountBalance = /** @class */ (function () {
    function AccountBalance(cooperativeName, accountBalance, bookBalance, selectedIndex, otherAccountsDropDown, otherAccounts) {
        this.cooperativeName = cooperativeName;
        this.accountBalance = accountBalance;
        this.bookBalance = bookBalance;
        this.selectedIndex = selectedIndex;
        this.otherAccountsDropDown = otherAccountsDropDown;
        this.otherAccounts = otherAccounts;
    }
    return AccountBalance;
}());
var HomeComponent = /** @class */ (function () {
    // This pattern makes use of Angular’s dependency injection implementation to inject an instance of the ItemService service into this class. 
    // Angular knows about this service because it is included in your app’s main NgModule, defined in app.module.ts.
    function HomeComponent(fonticon, authService, router, activatedRoute, cooperCooperativeService, categoryService, sponsorProductService, transactionService, productViewService, autoLogoutService, advertService, httpClient, _changeDetectionRef, zone, productService, complaintService) {
        this.fonticon = fonticon;
        this.authService = authService;
        this.router = router;
        this.activatedRoute = activatedRoute;
        this.cooperCooperativeService = cooperCooperativeService;
        this.categoryService = categoryService;
        this.sponsorProductService = sponsorProductService;
        this.transactionService = transactionService;
        this.productViewService = productViewService;
        this.autoLogoutService = autoLogoutService;
        this.advertService = advertService;
        this.httpClient = httpClient;
        this._changeDetectionRef = _changeDetectionRef;
        this.zone = zone;
        this.productService = productService;
        this.complaintService = complaintService;
        this.adsURL = config_1.Config.adsURL;
        this.apiUrl = config_1.Config.apiUrl;
        this.productImageUrl = config_1.Config.productImageURL;
        this.tvtext = "";
        this.accentColor = "rgb(254, 204, 22)";
        this.cssClass = "default";
        this.tabSelectedIndex = 0;
        this.mainAccountBalances = [{ "cooperativeName": "", "accountBalance": 0, "bookBalance": 0, "selectedIndex": 0, "otherAccountsDropDown": new nativescript_drop_down_1.ValueList(), "otherAccounts": [{ "cooperativeId": "",
                        "staffId": "",
                        "accountType": "",
                        "accountBalance": "",
                        "bookBalance": "", "cooperative": { "cooperativeId": "COOP102", "first_name": "CoopEast", "last_name": "CooPEast", "status": "Active" } }] }];
        this.mainAccountBalance = { "cooperativeName": "", "accountBalance": 0, "bookBalance": 0, "selectedIndex": 0, "otherAccountsDropDown": new nativescript_drop_down_1.ValueList(), "otherAccounts": [{ "cooperativeId": "",
                    "staffId": "",
                    "accountType": "",
                    "accountBalance": "",
                    "bookBalance": "", "cooperative": { "cooperativeId": "", "first_name": "C", "last_name": "", "status": "" } }] };
        this.searchedProducts = [];
        this.products = [];
        this.pagenumber = 0;
        this.newProducts = [];
        this.selectedIndex = 1;
        this.UserTypes = new nativescript_drop_down_1.ValueList([
            { value: "Vendor", display: "Vendor" },
            { value: "Customer", display: "Customer" }
        ]);
        this.hint = "Vendor";
        this.adverts = [];
        this.issuesImages = [];
        this.tasks = [];
        this.events = [];
        this.counter = 0;
        this.session = bgHttp.session("image-upload");
        this.categoriesFilterOn = false;
        this.sortFilterOn = false;
        this.mainFilterOn = false;
        this.listLabel = "'fa-th' | fonticon";
        this.isSquareList = true;
        this.cards = [{
                img: "https://img.youtube.com/vi/GGhKPm18E48/mqdefault.jpg",
                test: "Batman is pretty cool right?"
            },
            {
                img: "https://img.youtube.com/vi/GGhKPm18E48/mqdefault.jpg",
                test: "Batman is pretty cool right?"
            }, {
                img: "https://img.youtube.com/vi/GGhKPm18E48/mqdefault.jpg",
                test: "Batman is pretty cool right?"
            }, {
                img: "https://img.youtube.com/vi/GGhKPm18E48/mqdefault.jpg",
                test: "Batman is pretty cool right?"
            }, {
                img: "https://img.youtube.com/vi/GGhKPm18E48/mqdefault.jpg",
                test: "Batman is pretty cool right?"
            }, {
                img: "https://img.youtube.com/vi/GGhKPm18E48/mqdefault.jpg",
                test: "Batman is pretty cool right?"
            }];
        // new BottomBarItem(3, "Account", "ic_collaborator", "green", new Notification("green", "red", "1"))
        this.itemsMenu = [
            new nativescript_bottombar_1.BottomBarItem(0, "Home", "ic_home_black_24dp", "#9A9999"),
            new nativescript_bottombar_1.BottomBarItem(1, "Shop", "ic_calendar", "#9A9999"),
            new nativescript_bottombar_1.BottomBarItem(2, "Approve/Dismiss", "ic_paperplane", "#9A9999"),
            new nativescript_bottombar_1.BottomBarItem(3, "Account", "ic_collaborator", "#9A9999")
        ];
        this.items = [];
        for (var i = 0; i < 5; i++) {
            this.items.push("data item " + i);
        }
        LS.setItem('lastAction', Date.now().toString());
        this.file = __dirname + "/infinixb.jpg";
        this.session = bgHttp.session("image-upload");
        this.url = this.apiUrl + "complaints";
    }
    HomeComponent.prototype.buildCarousel = function () {
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
    HomeComponent.prototype.changeImage = function () {
        var slides = this.carousel.nativeElement;
        if (this.pagenumber === this.images.length) {
            this.pagenumber = 0;
        }
        slides.selectedPage = this.pagenumber;
        this.pagenumber += 1;
        this._changeDetectionRef.detectChanges();
    };
    HomeComponent.prototype.onTouch = function (args) {
        console.log("Page is touched");
        this.autoLogoutService.reset();
    };
    HomeComponent.prototype.ngOnInit = function () {
        var _this = this;
        // this.router.navigate(["/shopcategory"]);
        this.categoryId = this.activatedRoute.snapshot.params["id"];
        var dataObject = JSON.parse(LS.getItem('currentUser'));
        console.log("User ID " + dataObject._id);
        if (dataObject._id) {
            this.userId = dataObject._id;
            this.cooperId = dataObject.cooperId;
        }
        loader.show(options);
        forkJoin_1.forkJoin([
            this.sponsorProductService.getallSponsorProducts(),
            this.advertService.getallAdverts(),
            this.categoryService.getAllCategory()
        ]).subscribe(function (response) {
            _this.sponsorproducts = response[0]["data"];
            _this.adverts = response[1]["data"];
            _this.categories = response[2]["data"];
            //   let distinctAccountBalanceArray: Array<any> = [];
            //   for(let bal of this.accountBalances)
            //   {
            //       if(distinctAccountBalanceArray.length === 0)
            //       {
            //         distinctAccountBalanceArray.push(bal);
            //       }else{
            //         var checkIfExist = distinctAccountBalanceArray.filter(n => n.cooperativeId === bal.cooperativeId );
            //         if(checkIfExist.length > 0)
            //         {
            //             continue;
            //         }else{
            //             distinctAccountBalanceArray.push(bal);
            //         }
            //       }
            // }
            // this.mainAccountBalances = [];
            // for( let filtered of distinctAccountBalanceArray)
            // {
            //     this.mainAccountBalance = {"cooperativeName":"","accountBalance":0,"bookBalance":0,"selectedIndex":0,"otherAccountsDropDown": new ValueList<string>(),"otherAccounts":[{ "cooperativeId": "",
            //     "staffId": "",
            //     "accountType": "",
            //     "accountBalance": "",
            //     "bookBalance": "", "cooperative":{"cooperativeId":"","first_name":"C","last_name":"","status":""}}] };;
            //      let getOtherAccounts = this.accountBalances.filter(n => n.cooperativeId === filtered.cooperativeId );
            //      let defaultAccount = getOtherAccounts.filter(n => n.accountType === "Savings");
            //     this.mainAccountBalance.accountBalance = + defaultAccount[0].accountBalance;
            //     this.mainAccountBalance.bookBalance = + defaultAccount[0].bookBalance;
            //     this.mainAccountBalance.cooperativeName = defaultAccount[0].cooperative.first_name;
            //     this.mainAccountBalance.otherAccounts = getOtherAccounts;
            //     this.mainAccountBalance.selectedIndex = 0;
            //     for ( let loop = 0; loop < getOtherAccounts.length; loop++ ) {
            //         this.mainAccountBalance.otherAccountsDropDown.push({ value:   `${getOtherAccounts[loop].accountType}`,
            //                 display: `${getOtherAccounts[loop].accountType}`,
            //             });
            //         }
            //       this.mainAccountBalances.push(this.mainAccountBalance);
            // }
            loader.hide();
            //   for (let loop = 0; loop < this.accountBalances.l; loop++) {
            //     if(loop > 0)
            //     {
            //      this.product.qtyList.push({
            //          value: loop.toString(),
            //          display: loop.toString(),
            //      });
            //     }
            //  }
            // console.log("Group Balance " + JSON.stringify(groupBy(this.accountBalances, 'cooperativeId')));
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
            // for ( let loop = 0; loop < this.categories.length; loop++ ) {
            //     this.accordionCat.push({ value:   `${this.categories[loop]._id}`,
            //             display: `${this.categories[loop].categoryName}`,
            //         });
            //     }
            // this.accordionItems = [
            //     { title: "Category", footer: "10", headerText: "Category", footerText: "4", items: [ { value: "PU", display: "Price Up" },
            //     { value: "PD", display: "Price Down" },
            //     { value: "P", display: "Popularity" },
            //     { value: "BR", display: "Best Rating" }]},
            //     { title: "Sort", footer: "20", headerText: "Sort", footerText: "5", items: [{ value: "NA", display: "New Arrival" }, 
            //     { value: "PU", display: "Price Up" },
            //     { value: "PD", display: "Price Down" },
            //     { value: "P", display: "Popularity" },
            //     { value: "BR", display: "Best Rating" }] },
            //     { title: "Filter", footer: "30", headerText: "Filter", footerText: "6", items: [ { value: "Color", display: "Color" }, 
            //     { value: "Size", display: "Size" },
            //     { value: "Price", display: "Price" },
            //     { value: "Brand", display: "Brand" }] }
            // ];
            _this._changeDetectionRef.detectChanges();
        }, function (err) {
            console.log("Error from FolkJoin + " + JSON.stringify(err));
        });
        // if (!isAndroid) {
        //     return;
        //   }
        // application.android.on(AndroidApplication.activityBackPressedEvent, (data: AndroidActivityBackPressedEventData) => {
        //     if (this.router.isActive("/buy", false)) {
        //       data.cancel = true; // prevents default back button behavior
        //       //this.logout();
        //       //this.router.navigate(["/login"]);
        //     }
        //   });
    };
    HomeComponent.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
    };
    HomeComponent.prototype.ngAfterViewInit = function () {
        // this.getBalances(this.cooperId);
        var _this = this;
        this.sub = Observable_1.Observable.interval(5000)
            .subscribe(function (val) {
            _this.changeImage();
        });
        this.buildCarousel();
        // this.currentSwipeLayout = this._swipeLayouts[this._swipeLayouts.length - 1];
        this._changeDetectionRef.detectChanges();
    };
    HomeComponent.prototype.tabLoaded = function (event) {
        this._bar = event.object;
        this.hidden = false;
        this.titleState = 0 /* SHOW_WHEN_ACTIVE */;
        this.inactiveColor = "white";
        this.accentColor = "rgb(254, 204, 22)";
    };
    HomeComponent.prototype.tabSelected = function (args) {
        // only triggered when a different tab is tapped
        console.log(args.newIndex);
        if (args.newIndex == 3) {
            this.router.navigate(["/account"]);
        }
    };
    HomeComponent.prototype.onchange = function (args) {
        console.log("Drop Down selected index changed from " + args.oldIndex + " to " + args.newIndex);
    };
    HomeComponent.prototype.onopen = function () {
        console.log("Drop Down opened.");
    };
    HomeComponent.prototype.onclose = function () {
        console.log("Drop Down closed.");
    };
    HomeComponent.prototype.mainTabonIndexChanged = function (args) {
        var tabView = args.object;
        if (tabView.selectedIndex == 5) {
        }
        else {
            //this.canViewNotice = false;
        }
    };
    HomeComponent.prototype.onBottomNavigationTabSelected = function (args) {
        console.log("Tab selected:  " + args.oldIndex);
        if (args.newIndex == 0) {
            // this.router.navigate([""]);
            this.maintab.nativeElement.selectedIndex = 0;
        }
        else if (args.newIndex == 1) {
            this.router.navigate(["/approve"]);
        }
        else if (args.newIndex == 2) {
            this.maintab.nativeElement.selectedIndex = 1;
            //this.router.navigate(["/shop"]);
        }
        else if (args.newIndex == 3) {
            this.router.navigate(["/account"]);
        }
    };
    HomeComponent.prototype.getBalances = function (cooperId) {
        var _this = this;
        loader.show(options);
        console.log("Reaching balances  " + cooperId);
        this.cooperCooperativeService.getCooperCooporatorBalances(cooperId).subscribe(function (data) {
            console.log("Account Balances from DB " + JSON.stringify(data["data"]));
            _this.accountBalances = data["data"];
            console.log("Account Balances from DB 2" + JSON.stringify(_this.accountBalances));
            loader.hide();
            _this.getCategory();
        }, function (err) {
            console.log(JSON.stringify(err));
        });
    };
    HomeComponent.prototype.getCategory = function () {
        var _this = this;
        this.categoryService.getAllCategory().subscribe(function (data) {
            //console.log("Category from DB " + JSON.stringify(data["data"]));
            _this.categories = data["data"];
            for (var loop = 0; loop < _this.categories.length; loop++) {
                _this.accordionCat.push({ value: "" + _this.categories[loop]._id,
                    display: "" + _this.categories[loop].categoryName,
                });
            }
            _this.accordionItems = [
                { title: "Category", footer: "10", headerText: "Category", footerText: "4", items: _this.accordionCat },
                { title: "Sort", footer: "20", headerText: "Sort", footerText: "5", items: [{ value: "NA", display: "New Arrival" },
                        { value: "PU", display: "Price Up" },
                        { value: "PD", display: "Price Down" },
                        { value: "P", display: "Popularity" },
                        { value: "BR", display: "Best Rating" }] },
                { title: "Filter", footer: "30", headerText: "Filter", footerText: "6", items: [{ value: "Color", display: "Color" },
                        { value: "Size", display: "Size" },
                        { value: "Price", display: "Price" },
                        { value: "Brand", display: "Brand" }] }
            ];
            _this._changeDetectionRef.detectChanges();
            _this.getSponsorProducts();
        }, function (err) {
            console.log(JSON.stringify(err));
        });
    };
    HomeComponent.prototype.getSponsorProducts = function () {
        var _this = this;
        this.sponsorProductService.getallSponsorProducts().subscribe(function (data) {
            // console.log("Sponsor Products from DB " + JSON.stringify(data["data"]));
            _this.sponsorproducts = data["data"];
            _this.getTransactions(_this.cooperId);
        }, function (err) {
            console.log(JSON.stringify(err));
        });
    };
    HomeComponent.prototype.getViewedProducts = function (userId) {
        var _this = this;
        this.productViewService.getallViewedProducts(userId).subscribe(function (data) {
            //console.log("Viewed Products from DB " + JSON.stringify(data["data"]));
            _this.viewproducts = data["data"];
            //this.getTransactions(this.cooperId);
        }, function (err) {
            console.log(JSON.stringify(err));
        });
    };
    HomeComponent.prototype.getTransactions = function (cooperId) {
        var _this = this;
        this.transactionService.getAllTransactions(cooperId).subscribe(function (data) {
            // console.log("Transaction from DB " + JSON.stringify(data["data"]));
            _this.transactions = data["data"];
            _this.getViewedProducts(_this.userId);
        }, function (err) {
            console.log(JSON.stringify(err));
        });
    };
    HomeComponent.prototype.searchProducts = function (searchValue, skipValue, limitValue) {
        var _this = this;
        this.productService.searchProducts(searchValue, skipValue, limitValue).subscribe(function (data) {
            console.log("Search from DB " + JSON.stringify(data["data"]));
            _this.searchedProducts = data["data"];
            _this._changeDetectionRef.detectChanges();
        }, function (err) {
            console.log(JSON.stringify(err));
        });
    };
    HomeComponent.prototype.logOut = function () {
        this.authService.logout();
    };
    HomeComponent.prototype.onSubmit = function (args) {
        var searchBar = args.object;
        var searchValue = searchBar.text.toLowerCase();
        this.searchProducts(searchValue, 0, 5);
    };
    HomeComponent.prototype.onClear = function (args) {
        var searchBar = args.object;
        searchBar.text = "";
        searchBar.hint = "Search for products";
        this.searchedProducts = [];
        this._changeDetectionRef.detectChanges();
    };
    HomeComponent.prototype.sBLoaded = function (args) {
        var searchbar = args.object;
        if (platform_1.isAndroid) {
            searchbar.android.clearFocus();
        }
    };
    HomeComponent.prototype.getAdverts = function () {
        var _this = this;
        this.advertService.getallAdverts().subscribe(function (data) {
            // console.log("Adverts from DB " + JSON.stringify(data["data"]));
            _this.adverts = data["data"];
            _this.images = [];
            for (var loop = 0; loop < _this.adverts.length; loop++) {
                _this.images.push({ title: "" + _this.adverts[loop].ownerName,
                    url: "" + (_this.adsURL + _this.adverts[loop].advertImagePath),
                });
            }
            console.log("Advert Images " + JSON.stringify(_this.images));
            // this.buildCarousel();
            _this._changeDetectionRef.detectChanges();
            // console.log("Image List " + JSON.stringify(this.images));
        }, function (err) {
            console.log(JSON.stringify(err));
        });
    };
    HomeComponent.prototype.addComplaint = function (image) {
        this.complaintService.addComplaint(image).subscribe(function (data) {
            // console.log("Adverts from DB " + JSON.stringify(data["data"]));
            // console.log("Image List " + JSON.stringify(this.images));
        }, function (err) {
            console.log(JSON.stringify(err));
        });
    };
    HomeComponent.prototype.onSelectMultipleTap = function () {
        var context = imagepicker.create({
            mode: "multiple"
        });
        this.startSelection(context);
    };
    HomeComponent.prototype.onSelectSingleTap = function () {
        var context = imagepicker.create({
            mode: "single"
        });
        this.startSelection(context);
    };
    HomeComponent.prototype.startSelection = function (context) {
        var _that = this;
        context
            .authorize()
            .then(function () {
            _that.items = [];
            return context.present();
        })
            .then(function (selection) {
            console.log("Selection done:");
            selection.forEach(function (selected) {
                console.log("----------------");
                console.log("uri: " + selected.uri);
                console.log("fileUri: " + selected.fileUri);
                _that.file = selected.fileUri;
            });
            _that.issuesImages = selection;
            _that._changeDetectionRef.detectChanges();
        }).catch(function (e) {
            console.log(e);
        });
    };
    HomeComponent.prototype.uploadFile = function () {
        // const filepath: string = this.issuesImages[0].fileUri //"/data/user/0/org.nativescript.Groceries/cache/img_by_sj_1493113215112.jpg";
        // const filename: string = "img_by_sj_1493113215112.jpg";
        // let fileExist = fs.File.exists(filepath);
        // // confirm file exists.
        // console.log("file exist? ", fileExist);
        // let request = {
        //     url: "http://192.168.8.101:3000/v1/complaints",
        //     method: "post",
        //     headers: {
        //         "Content-Type": "application/octet-stream",
        //         "File-name": filename
        //     },
        //     description: "{ 'uploading': '" + filename + "' }"
        // }
        // let task = this.session.uploadFile(filepath, request);
        // task.on("progress", this.logEvent);
        // task.on("error", this.logEvent);
        // task.on("complete", this.logEvent);
    };
    HomeComponent.prototype.logEvent = function (e) {
        console.log(e);
    };
    HomeComponent.prototype.sendIssues = function () {
        //this.addComplaint(this.issuesImages[0]);
    };
    HomeComponent.prototype.upload = function (args) {
        this.start_upload(false, false);
    };
    HomeComponent.prototype.upload_error = function (args) {
        this.start_upload(true, false);
    };
    HomeComponent.prototype.upload_multi = function (args) {
        this.start_upload(false, true);
    };
    HomeComponent.prototype.start_upload = function (should_fail, isMulti) {
        console.log((should_fail ? "Testing error during upload of " : "Uploading file: ") + this.file + (isMulti ? " using multipart." : ""));
        var _that2 = this;
        var name = this.file.substr(this.file.lastIndexOf("/") + 1);
        var description = name + " (" + ++this.counter + ")";
        var request = {
            url: this.url,
            method: "POST",
            headers: {
                "Content-Type": "application/octet-stream",
                "File-Name": name
            },
            description: description,
            androidAutoDeleteAfterUpload: false
        };
        if (should_fail) {
            request.headers["Should-Fail"] = true;
        }
        var task;
        var lastEvent = "";
        if (isMulti) {
            var params = [
                { key: "message", name: "message", value: this.complaintMessage },
                { key: "image", name: "image", filename: this.file, mimeType: 'image/jpeg' },
                { key: "name", name: "name", value: this.complaintName },
                { key: "email", name: "email", value: this.complaintEmail },
                { key: "vendor", name: "vendor", value: this.complaintVendor },
                { key: "copperId", name: "copperId", value: this.cooperId }
            ];
            task = this.session.multipartUpload(params, request);
        }
        else {
            task = this.session.uploadFile(this.file, request);
        }
        function onEvent(e) {
            if (lastEvent !== e.eventName) {
                // suppress all repeating progress events and only show the first one
                lastEvent = e.eventName;
            }
            else {
                return;
            }
            this.events.push({
                eventTitle: e.eventName + " " + e.object.description,
                eventData: JSON.stringify({
                    error: e.error ? e.error.toString() : e.error,
                    currentBytes: e.currentBytes,
                    totalBytes: e.totalBytes,
                    body: e.data
                })
            });
        }
        task.on("progress", onEvent.bind(this));
        task.on("error", onEvent.bind(this));
        task.on("responded", onEvent.bind(this));
        //task.on("complete", onEvent.bind(this));
        task.on("complete", uploadComplete);
        function uploadComplete() {
            console.log('Upload complete');
            _that2.complaintEmail = "";
            _that2.complaintMessage = "";
            _that2.complaintName = "";
            _that2.complaintVendor = "";
            _that2.file = "";
            _that2.issuesImages = [];
            nativescript_fancyalert_1.TNSFancyAlert.showSuccess("Success!", " Complaint sent, support team will respond shortly", "Ok")
                .then(function () {
            });
            _that2._changeDetectionRef.detectChanges();
        }
        lastEvent = "";
        this.tasks.push(task);
    };
    HomeComponent.prototype.onTap = function () {
        alert("clicked an item");
    };
    HomeComponent.prototype.openModal = function () {
        this.modal.show();
    };
    HomeComponent.prototype.closeModal = function () {
        this.modal.hide();
    };
    HomeComponent.prototype.onOpenModal = function () {
        console.log("opened modal");
    };
    HomeComponent.prototype.onCloseModal = function () {
        console.log("closed modal");
    };
    HomeComponent.prototype.onaccountchange = function (args, bal) {
        // console.log(`Drop Down selected index changed  ${args.oldIndex} to ${args.newIndex}. New value is "${this.sessionitems.getValue(
        //     args.newIndex)}"`);
        console.log("Selected ID " + args.newIndex);
        var selectedAccount = bal.otherAccountsDropDown.getValue(args.newIndex);
        for (var _i = 0, _a = this.mainAccountBalances; _i < _a.length; _i++) {
            var mainBal = _a[_i];
            if (mainBal.cooperativeName === bal.cooperativeName) {
                var defaultAccount = mainBal.otherAccounts.filter(function (n) { return n.accountType === selectedAccount; });
                console.log("Default Account " + JSON.stringify(defaultAccount));
                this.mainAccountBalance.accountBalance = +defaultAccount[0].accountBalance;
                this.mainAccountBalance.bookBalance = +defaultAccount[0].bookBalance;
                this.mainAccountBalance.cooperativeName = defaultAccount[0].cooperative.first_name;
            }
        }
        this._changeDetectionRef.detectChanges();
    };
    HomeComponent.prototype.swipeLayoutLoaded = function (event) {
        this._swipeLayouts.push(event.object);
    };
    HomeComponent.prototype.swipeLeftCallback = function (swipeLeftEvent) {
        console.log('swipeLeft');
        this.next();
    };
    HomeComponent.prototype.next = function () {
        //this._swipeLayouts.pop();
        //this.currentSwipeLayout = this._swipeLayouts[this._swipeLayouts.length - 1];
    };
    HomeComponent.prototype.swipeRightCallback = function (swipeRightEvent) {
        console.log('swipeRight');
        this.next();
    };
    HomeComponent.prototype.swipeUpCallback = function (swipeUpEvent) {
        console.log('swipeUp');
        this.next();
    };
    HomeComponent.prototype.swipeDownCallback = function (swipeDownEvent) {
        console.log('swipeDown');
        this.next();
    };
    HomeComponent.prototype.goAway = function () {
        var that = this;
        this.currentSwipeLayout.animateSwipeRight().then(function () {
            that.next();
            console.log('swipeLeft done');
        });
    };
    HomeComponent.prototype.comeHere = function () {
        var that = this;
        this.currentSwipeLayout.animateSwipeLeft().then(function () {
            that.next();
            console.log('swipeRight done');
        });
    };
    HomeComponent.prototype.super = function () {
        var that = this;
        this.currentSwipeLayout.animateSwipeUp().then(function () {
            that.next();
            console.log("swipeUp done");
        });
    };
    HomeComponent.prototype.getProductByCategoryId = function (categoryId) {
        var _this = this;
        console.log("Category Id " + categoryId);
        //  this.products = [];
        loader.show(options);
        this.productService.getallproductByCategory(categoryId).subscribe(function (data) {
            //console.log("Category Products  " + JSON.stringify(data["data"]));
            _this.products = data["data"];
            for (var _i = 0, _a = _this.products; _i < _a.length; _i++) {
                var item = _a[_i];
                console.log("Category Products loop  " + item.product.productId);
                _this.product = { "_id": item.product._id, "productId": item.product.productId, "vendorId": item.product.vendorId,
                    "productName": item.product.productName, "productBriefDesc": item.product.productBriefDesc,
                    "productDetailDesc": item.product.productDetailDesc, "productSpec": item.product.productSpec,
                    "productImage": item.product.productImage, "productBackImage": item.product.productBackImage,
                    "productLeftImage": item.product.productLeftImage, "productRightImage": item.product.productRightImage,
                    "brand": item.product.brand, "location": item.product.location, "quantity": item.product.quantity,
                    "price": item.product.price, "status": item.product.status, "expires": item.product.expires,
                    "dateCreated": item.product.dateCreated, "dateModified": item.product.dateModified,
                    "likes": item.product.likes, "rates": item.product.rates
                };
                _this.newProducts.push(_this.product);
            }
            console.log("Category Products Outside  " + JSON.stringify(_this.newProducts));
            //this.newProducts = this.searchedProducts;
            //this.searchedProducts = this.newProducts;
            _this.sv.nativeElement.scrollToVerticalOffset(0, true);
            _this.modal.hide();
            // this._changeDetectionRef.detectChanges();
            loader.hide();
        }, function (err) {
            console.log(err);
        });
    };
    HomeComponent.prototype.categoryFilTap = function () {
        this.categoriesFilterOn = !this.categoriesFilterOn;
        this.togleFilter();
    };
    HomeComponent.prototype.sortFilTap = function () {
        this.sortFilterOn = !this.sortFilterOn;
        this.togleFilter();
    };
    HomeComponent.prototype.mainFilterFilTap = function () {
        this.mainFilterOn = !this.mainFilterOn;
        this.togleFilter();
    };
    HomeComponent.prototype.togleFilter = function () {
        if (this.categoriesFilterOn) {
            this.sortFilterOn = false;
            this.mainFilterOn = false;
        }
        if (this.sortFilterOn) {
            this.categoriesFilterOn = false;
            this.mainFilterOn = false;
        }
        if (this.mainFilterOn) {
            this.categoriesFilterOn = false;
            this.sortFilterOn = false;
        }
        //   this._changeDetectionRef.detectChanges();
    };
    HomeComponent.prototype.toggleSearchList = function () {
        this.isSquareList = !this.isSquareList;
        if (this.isSquareList) {
            this.listLabel = "'fa-th' | fonticon";
        }
        else {
            this.listLabel = "'fa-th-list' | fonticon";
        }
    };
    HomeComponent.prototype.navigateToBuy = function () {
        this.router.navigate(["/buy"]);
    };
    __decorate([
        core_1.ViewChild(modal_1.ModalComponent),
        __metadata("design:type", modal_1.ModalComponent)
    ], HomeComponent.prototype, "modal", void 0);
    __decorate([
        core_1.ViewChild('carousel'),
        __metadata("design:type", core_1.ElementRef)
    ], HomeComponent.prototype, "carousel", void 0);
    __decorate([
        core_1.ViewChild('maintab'),
        __metadata("design:type", core_1.ElementRef)
    ], HomeComponent.prototype, "maintab", void 0);
    __decorate([
        core_1.ViewChild("myScroller"),
        __metadata("design:type", core_1.ElementRef)
    ], HomeComponent.prototype, "sv", void 0);
    __decorate([
        core_1.ViewChild("btn"),
        __metadata("design:type", core_1.ElementRef)
    ], HomeComponent.prototype, "btn", void 0);
    __decorate([
        core_1.ViewChild("grid"),
        __metadata("design:type", core_1.ElementRef)
    ], HomeComponent.prototype, "gr", void 0);
    HomeComponent = __decorate([
        core_1.Component({
            selector: "ns-home",
            moduleId: module.id,
            templateUrl: "./home.component.html",
            styleUrls: ["./home.component.css"],
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [nativescript_ngx_fonticon_1.TNSFontIconService, auth_service_1.AuthService, router_1.Router, router_1.ActivatedRoute,
            coopercooperative_service_1.CooperCooperativeService, category_service_1.CategoryService,
            sponsorproduct_service_1.SponsorProductService, transaction_service_1.TransactionService,
            productview_service_1.ProductViewService, autologout_service_1.AutoLogoutService, advert_service_1.AdvertService, http_1.HttpClient, core_1.ChangeDetectorRef,
            core_1.NgZone, product_service_1.ProductService, complaints_service_1.ComplaintService])
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9tZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJob21lLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFzSjtBQUN0SiwwQ0FBeUQ7QUFXekQscUNBQXFDO0FBRXJDLDREQUF3RDtBQUV4RCxzRkFBa0Y7QUFDbEYsb0VBQWdFO0FBQ2hFLGdGQUE0RTtBQUM1RSwwRUFBc0U7QUFDdEUsMEVBQXNFO0FBQ3RFLGdFQUE0RDtBQUM1RCxrRUFBOEQ7QUFDOUQsd0VBQW1FO0FBRW5FLDZEQUF1RDtBQUd2RCxpRUFBNkg7QUFDN0gsMkRBQTJEO0FBQzNELHNDQUFlLENBQUMsV0FBVyxFQUFFLGNBQU0sT0FBQSxrQ0FBUyxFQUFULENBQVMsQ0FBQyxDQUFDO0FBRzlDLHNDQUFlLENBQUMsS0FBSyxFQUFFLGNBQU0sT0FBQSxPQUFPLENBQUMsbUNBQW1DLENBQUMsQ0FBQyxHQUFHLEVBQWhELENBQWdELENBQUMsQ0FBQztBQVEvRSx1RUFRbUM7QUFJbkMsc0NBQWUsQ0FBQyxhQUFhLEVBQUUsY0FBTSxPQUFBLHVDQUFXLEVBQVgsQ0FBVyxDQUFDLENBQUM7QUFJbEQsdUVBQStEO0FBRy9ELGlFQUFtRDtBQUVuRCxJQUFJLEVBQUUsR0FBRyxPQUFPLENBQUUsMkJBQTJCLENBQUUsQ0FBQztBQUVoRCw4Q0FBNkM7QUFHN0MsaUZBQWdFO0FBR2hFLElBQUksTUFBTSxHQUFHLElBQUksaURBQWdCLEVBQUUsQ0FBQztBQUVwQyx3RUFBc0U7QUFNdEUsNkVBQStFO0FBRS9FLHFCQUFxQixDQUFDLGVBQWUsQ0FBQyxVQUFVLEVBQUUsY0FBTSxPQUFBLE9BQU8sQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDLFFBQVEsRUFBekMsQ0FBeUMsQ0FBQyxDQUFDO0FBR25HLHFCQUFxQixDQUFDLGVBQWUsQ0FBQyxVQUFVLEVBQUUsY0FBTSxPQUFBLE9BQU8sQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDLFFBQVEsRUFBekMsQ0FBeUMs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QixnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLFNBQVM7WUFDbkIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFdBQVcsRUFBRSx1QkFBdUI7WUFDcEMsU0FBUyxFQUFFLENBQUMsc0JBQXNCLENBQUM7WUFDbkMsZUFBZSxFQUFFLDhCQUF1QixDQUFDLE1BQU07U0FDbEQsQ0FBQzt5Q0E4SGdDLDhDQUFrQixFQUFxQiwwQkFBVyxFQUFpQixlQUFNLEVBQTBCLHVCQUFjO1lBQzdHLG9EQUF3QixFQUEyQixrQ0FBZTtZQUN0RSw4Q0FBcUIsRUFBNkIsd0NBQWtCO1lBQzNFLHdDQUFrQixFQUEyQixzQ0FBaUIsRUFBdUIsOEJBQWEsRUFBcUIsaUJBQVUsRUFBOEIsd0JBQWlCO1lBQzdMLGFBQU0sRUFBeUIsZ0NBQWMsRUFBMEIscUNBQWdCO09Bakl4RixhQUFhLENBcW5DekI7SUFBRCxvQkFBQztDQUFBLEFBcm5DRCxJQXFuQ0M7QUFybkNZLHNDQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsQWZ0ZXJWaWV3SW5pdCxDaGFuZ2VEZXRlY3RvclJlZixJbnB1dCxDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxOZ1pvbmUsVmlld0NoaWxkLEVsZW1lbnRSZWYsT25EZXN0cm95IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgUm91dGVyLCBBY3RpdmF0ZWRSb3V0ZSB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcclxuaW1wb3J0IHsgTG9jYXRpb24gfSBmcm9tIFwiQGFuZ3VsYXIvY29tbW9uXCI7XHJcbmltcG9ydCB7IFNuYWNrQmFyIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1zbmFja2JhclwiO1xyXG5pbXBvcnQgKiBhcyBBcHBsaWNhdGlvblNldHRpbmdzIGZyb20gXCJhcHBsaWNhdGlvbi1zZXR0aW5nc1wiO1xyXG5pbXBvcnQgeyBjb25uZWN0aW9uVHlwZSwgZ2V0Q29ubmVjdGlvblR5cGUgfSBmcm9tIFwiY29ubmVjdGl2aXR5XCI7XHJcbmltcG9ydCB7IEFuaW1hdGlvbiB9IGZyb20gXCJ1aS9hbmltYXRpb25cIjtcclxuaW1wb3J0IHsgVmlldyB9IGZyb20gXCJ1aS9jb3JlL3ZpZXdcIjtcclxuaW1wb3J0IHsgcHJvbXB0IH0gZnJvbSBcInVpL2RpYWxvZ3NcIjtcclxuaW1wb3J0IHsgUGFnZSB9IGZyb20gXCJ1aS9wYWdlXCI7XHJcbmltcG9ydCB7IFRleHRGaWVsZCB9IGZyb20gXCJ1aS90ZXh0LWZpZWxkXCI7XHJcbmltcG9ydCB7IFRleHRWaWV3IH0gZnJvbSBcInVpL3RleHQtdmlld1wiO1xyXG5pbXBvcnQgeyBpc0FuZHJvaWQgfSBmcm9tIFwicGxhdGZvcm1cIjtcclxuXHJcbmltcG9ydCB7QXV0aFNlcnZpY2V9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9hdXRoLnNlcnZpY2VcIjtcclxuXHJcbmltcG9ydCB7Q29vcGVyQ29vcGVyYXRpdmVTZXJ2aWNlfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvY29vcGVyY29vcGVyYXRpdmUuc2VydmljZVwiO1xyXG5pbXBvcnQge0NhdGVnb3J5U2VydmljZX0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL2NhdGVnb3J5LnNlcnZpY2VcIjtcclxuaW1wb3J0IHtTcG9uc29yUHJvZHVjdFNlcnZpY2V9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9zcG9uc29ycHJvZHVjdC5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7VHJhbnNhY3Rpb25TZXJ2aWNlfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvdHJhbnNhY3Rpb24uc2VydmljZVwiO1xyXG5pbXBvcnQge1Byb2R1Y3RWaWV3U2VydmljZX0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL3Byb2R1Y3R2aWV3LnNlcnZpY2VcIjtcclxuaW1wb3J0IHtBZHZlcnRTZXJ2aWNlfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvYWR2ZXJ0LnNlcnZpY2VcIjtcclxuaW1wb3J0IHtQcm9kdWN0U2VydmljZX0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL3Byb2R1Y3Quc2VydmljZVwiO1xyXG5pbXBvcnQge0NvbXBsYWludFNlcnZpY2V9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9jb21wbGFpbnRzLnNlcnZpY2VcIjtcclxuXHJcbmltcG9ydCB7IHJlZ2lzdGVyRWxlbWVudCB9IGZyb20gJ25hdGl2ZXNjcmlwdC1hbmd1bGFyJztcclxuXHJcbmltcG9ydCB7IENvb3BlcmF0aXZlU3RhZmYsIFZlcmlmeUF1dGgsIENvb3BlcmF0aXZlU3RhZmZBY2NvdW50LCBBZHZlcnQsQ2F0ZWdvcnksUHJvZHVjdCxTcG9uc29yUHJvZHVjdCxUcmFuc2FjdGlvbiB9IGZyb20gXCIuLi8uLi9tb2RlbHMvaW5kZXhcIjtcclxuaW1wb3J0IHsgQm90dG9tQmFyLCBCb3R0b21CYXJJdGVtLCBUSVRMRV9TVEFURSwgU2VsZWN0ZWRJbmRleENoYW5nZWRFdmVudERhdGEsIE5vdGlmaWNhdGlvbiwgfSBmcm9tICduYXRpdmVzY3JpcHQtYm90dG9tYmFyJztcclxuLy9pbXBvcnQge1RJVExFX1NUQVRFfSBmcm9tICduYXRpdmVzY3JpcHQtYm90dG9tYmFyL2luZGV4JztcclxucmVnaXN0ZXJFbGVtZW50KCdCb3R0b21CYXInLCAoKSA9PiBCb3R0b21CYXIpO1xyXG5cclxuXHJcbnJlZ2lzdGVyRWxlbWVudChcIkZhYlwiLCAoKSA9PiByZXF1aXJlKFwibmF0aXZlc2NyaXB0LWZsb2F0aW5nYWN0aW9uYnV0dG9uXCIpLkZhYik7XHJcbi8vIHJlZ2lzdGVyRWxlbWVudChcImNvb3BlcnNob3BcIiwgKCkgPT4gcmVxdWlyZShcIi4uLy4uL2NvbXBvbmVudHMvc2hvcC9zaG9wLmNvbXBvbmVudFwiKS5TaG9wQ29tcG9uZW50KTtcclxuLy9yZWdpc3RlckVsZW1lbnQoJ0JvdHRvbUJhcicsICgpID0+IEJvdHRvbUJhcik7XHJcbi8vcmVnaXN0ZXJFbGVtZW50KFwiQm90dG9tQmFyXCIsICgpID0+IHJlcXVpcmUoXCJuYXRpdmVzY3JpcHQtYm90dG9tYmFyXCIpLkJvdHRvbUJhcik7XHJcblxyXG5cclxuaW1wb3J0IHsgQ2FyZFZpZXcgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWNhcmR2aWV3XCI7XHJcblxyXG5pbXBvcnQge1xyXG4gICAgU3dpcGVMYXlvdXQsXHJcbiAgICBBTklNQVRJT05fU1RBVEUsXHJcbiAgICBHRVNUVVJFX01PREUsXHJcbiAgICBTd2lwZUxlZnRFdmVudERhdGEsXHJcbiAgICBTd2lwZVJpZ2h0RXZlbnREYXRhLFxyXG4gICAgU3dpcGVVcEV2ZW50RGF0YSxcclxuICAgIFN3aXBlRG93bkV2ZW50RGF0YVxyXG59IGZyb20gJ25hdGl2ZXNjcmlwdC1zd2lwZS1sYXlvdXQnO1xyXG5pbXBvcnQgeyBBTklNQVRJT05fUFJPUEVSVElFUyB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2FuaW1hdGlvbi9rZXlmcmFtZS1hbmltYXRpb25cIjtcclxuXHJcblxyXG5yZWdpc3RlckVsZW1lbnQoJ1N3aXBlTGF5b3V0JywgKCkgPT4gU3dpcGVMYXlvdXQpO1xyXG5cclxuXHJcblxyXG5pbXBvcnQgeyBUTlNGb250SWNvblNlcnZpY2UgfSBmcm9tICduYXRpdmVzY3JpcHQtbmd4LWZvbnRpY29uJztcclxuLy8gaW1wb3J0IHsgU2VsZWN0ZWRJbmRleENoYW5nZWRFdmVudERhdGEgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWRyb3AtZG93blwiO1xyXG5pbXBvcnQgeyBUYWJWaWV3LCBUYWJWaWV3SXRlbSB9IGZyb20gXCJ1aS90YWItdmlld1wiO1xyXG5pbXBvcnQgeyBWYWx1ZUxpc3QgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWRyb3AtZG93blwiO1xyXG5cclxubGV0IExTID0gcmVxdWlyZSggXCJuYXRpdmVzY3JpcHQtbG9jYWxzdG9yYWdlXCIgKTtcclxuXHJcbmltcG9ydCB7IENvbmZpZyB9IGZyb20gXCIuLi8uLi9zaGFyZWQvY29uZmlnXCI7XHJcblxyXG5cclxuaW1wb3J0IHtMb2FkaW5nSW5kaWNhdG9yfSBmcm9tIFwibmF0aXZlc2NyaXB0LWxvYWRpbmctaW5kaWNhdG9yXCI7XHJcbmltcG9ydCB7IEJvdHRvbU5hdmlnYXRpb24sIEJvdHRvbU5hdmlnYXRpb25UYWIsIE9uVGFiU2VsZWN0ZWRFdmVudERhdGEgfSBmcm9tICduYXRpdmVzY3JpcHQtYm90dG9tLW5hdmlnYXRpb24nO1xyXG5cclxudmFyIGxvYWRlciA9IG5ldyBMb2FkaW5nSW5kaWNhdG9yKCk7XHJcblxyXG5pbXBvcnQgeyBBdXRvTG9nb3V0U2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2F1dG9sb2dvdXQuc2VydmljZSc7XHJcblxyXG5pbXBvcnQgeyBHZXN0dXJlRXZlbnREYXRhIH0gZnJvbSBcInVpL2dlc3R1cmVzXCI7XHJcblxyXG5pbXBvcnQgeyBUb3VjaEdlc3R1cmVFdmVudERhdGEgfSBmcm9tIFwidWkvZ2VzdHVyZXNcIjtcclxuXHJcbmltcG9ydCAqIGFzIGVsZW1lbnRSZWdpc3RyeU1vZHVsZSBmcm9tICduYXRpdmVzY3JpcHQtYW5ndWxhci9lbGVtZW50LXJlZ2lzdHJ5JztcclxuaW1wb3J0ICogYXMgTGFiZWxNb2R1bGUgZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvbGFiZWxcIjtcclxuZWxlbWVudFJlZ2lzdHJ5TW9kdWxlLnJlZ2lzdGVyRWxlbWVudChcIkNhcmRWaWV3XCIsICgpID0+IHJlcXVpcmUoXCJuYXRpdmVzY3JpcHQtY2FyZHZpZXdcIikuQ2FyZFZpZXcpO1xyXG5cclxuXHJcbmVsZW1lbnRSZWdpc3RyeU1vZHVsZS5yZWdpc3RlckVsZW1lbnQoXCJDYXJvdXNlbFwiLCAoKSA9PiByZXF1aXJlKFwibmF0aXZlc2NyaXB0LWNhcm91c2VsXCIpLkNhcm91c2VsKTtcclxuZWxlbWVudFJlZ2lzdHJ5TW9kdWxlLnJlZ2lzdGVyRWxlbWVudChcIkNhcm91c2VsSXRlbVwiLCAoKSA9PiByZXF1aXJlKFwibmF0aXZlc2NyaXB0LWNhcm91c2VsXCIpLkNhcm91c2VsSXRlbSk7XHJcblxyXG5pbXBvcnQgeyBTZWFyY2hCYXIgfSBmcm9tIFwidWkvc2VhcmNoLWJhclwiO1xyXG5pbXBvcnQgeyBIdHRwQ2xpZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcclxuaW1wb3J0IHsgZm9ya0pvaW4gfSBmcm9tIFwicnhqcy9vYnNlcnZhYmxlL2ZvcmtKb2luXCI7XHJcblxyXG5cclxuXHJcblxyXG5pbXBvcnQgJ3J4anMvYWRkL29ic2VydmFibGUvaW50ZXJ2YWwnO1xyXG5cclxuXHJcblxyXG5pbXBvcnQgeyBJbWFnZSB9IGZyb20gJ3Rucy1jb3JlLW1vZHVsZXMvdWkvaW1hZ2UnO1xyXG5jb25zdCBDYXJvdXNlbEl0ZW0gPSByZXF1aXJlKCduYXRpdmVzY3JpcHQtY2Fyb3VzZWwnKS5DYXJvdXNlbEl0ZW07XHJcblxyXG5cclxuaW1wb3J0ICogYXMgaW1hZ2VwaWNrZXIgZnJvbSBcIm5hdGl2ZXNjcmlwdC1zc2ktaW1hZ2VwaWNrZXJcIjtcclxuXHJcblxyXG5cclxuXHJcblxyXG5pbXBvcnQgeyBJbWFnZVNvdXJjZSB9IGZyb20gXCJpbWFnZS1zb3VyY2VcIjtcclxuXHJcbmltcG9ydCAqIGFzIGJnSHR0cCBmcm9tIFwibmF0aXZlc2NyaXB0LWJhY2tncm91bmQtaHR0cFwiO1xyXG5cclxuXHJcblxyXG5pbXBvcnQgeyBpc0lPUyB9IGZyb20gXCJwbGF0Zm9ybVwiO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlQXJyYXkgfSBmcm9tIFwiZGF0YS9vYnNlcnZhYmxlLWFycmF5XCI7XHJcblxyXG5pbXBvcnQgeyBUTlNGYW5jeUFsZXJ0LCBUTlNGYW5jeUFsZXJ0QnV0dG9uIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1mYW5jeWFsZXJ0XCI7XHJcblxyXG5pbXBvcnQgeyBNb2RhbENvbXBvbmVudCB9IGZyb20gXCIuLi9tb2RhbFwiO1xyXG5cclxuaW1wb3J0IHsgQW5kcm9pZEFwcGxpY2F0aW9uLCBBbmRyb2lkQWN0aXZpdHlCYWNrUHJlc3NlZEV2ZW50RGF0YSB9IGZyb20gXCJhcHBsaWNhdGlvblwiO1xyXG5cclxuaW1wb3J0IHsgU2Nyb2xsVmlldywgU2Nyb2xsRXZlbnREYXRhIH0gZnJvbSBcInVpL3Njcm9sbC12aWV3XCI7XHJcbmltcG9ydCB7IEJ1dHRvbiB9IGZyb20gXCJ1aS9idXR0b25cIjtcclxuXHJcblxyXG5pbXBvcnQgeyBHcmlkTGF5b3V0LCBHcmlkVW5pdFR5cGUsIEl0ZW1TcGVjIH0gZnJvbSBcInVpL2xheW91dHMvZ3JpZC1sYXlvdXRcIjtcclxuLy8gaW1wb3J0ICogYXMgZGlhbG9ncyBmcm9tIFwidWkvZGlhbG9nc1wiO1xyXG4vLyBpbXBvcnQgeyBNb2RhbERpYWxvZ1NlcnZpY2UsTW9kYWxEaWFsb2dPcHRpb25zIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL2RpcmVjdGl2ZXMvZGlhbG9nc1wiO1xyXG4vLyBpbXBvcnQgeyBNb2RhbENvbXBvbmVudCB9IGZyb20gXCIuLi8uLi9hcHAubW9kYWxcIjtcclxudmFyIG9wdGlvbnMgPSB7XHJcbiAgICBtZXNzYWdlOiAnTG9hZGluZy4uLicsXHJcbiAgICBwcm9ncmVzczogMC42NSxcclxuICAgIGFuZHJvaWQ6IHtcclxuICAgICAgaW5kZXRlcm1pbmF0ZTogdHJ1ZSxcclxuICAgICAgY2FuY2VsYWJsZTogdHJ1ZSxcclxuICAgICAgY2FuY2VsTGlzdGVuZXI6IGZ1bmN0aW9uKGRpYWxvZykgeyBjb25zb2xlLmxvZyhcIkxvYWRpbmcgY2FuY2VsbGVkXCIpIH0sXHJcbiAgICAgIG1heDogMTAwLFxyXG4gICAgICBwcm9ncmVzc051bWJlckZvcm1hdDogXCIlMWQvJTJkXCIsXHJcbiAgICAgIHByb2dyZXNzUGVyY2VudEZvcm1hdDogMC41MyxcclxuICAgICAgcHJvZ3Jlc3NTdHlsZTogMSxcclxuICAgICAgc2Vjb25kYXJ5UHJvZ3Jlc3M6IDEsXHJcbiAgICAgIGNvbG9yOiBcIiM0QjlFRDZcIiwgLy8gY29sb3Igb2YgaW5kaWNhdG9yIGFuZCBsYWJlbHNcclxuICAgIH0sXHJcbiAgICBpb3M6IHtcclxuICAgICAgZGV0YWlsczogXCJBZGRpdGlvbmFsIGRldGFpbCBub3RlIVwiLFxyXG4gICAgICBtYXJnaW46IDEwLFxyXG4gICAgICBkaW1CYWNrZ3JvdW5kOiB0cnVlLFxyXG4gICAgICBjb2xvcjogXCIjNEI5RUQ2XCIsIC8vIGNvbG9yIG9mIGluZGljYXRvciBhbmQgbGFiZWxzXHJcbiAgICAgIC8vIGJhY2tncm91bmQgYm94IGFyb3VuZCBpbmRpY2F0b3JcclxuICAgICAgLy8gaGlkZUJlemVsIHdpbGwgb3ZlcnJpZGUgdGhpcyBpZiB0cnVlXHJcbiAgICAgIGJhY2tncm91bmRDb2xvcjogXCJ5ZWxsb3dcIixcclxuICAgICAgdXNlckludGVyYWN0aW9uRW5hYmxlZDogZmFsc2UsIC8vIGRlZmF1bHQgdHJ1ZS4gU2V0IGZhbHNlIHNvIHRoYXQgdGhlIHRvdWNoZXMgd2lsbCBmYWxsIHRocm91Z2ggaXQuXHJcbiAgICAgIGhpZGVCZXplbDogdHJ1ZSwgLy8gZGVmYXVsdCBmYWxzZSwgY2FuIGhpZGUgdGhlIHN1cnJvdW5kaW5nIGJlemVsXHJcbiAgICAvLyAgIHZpZXc6IFVJVmlldywgLy8gVGFyZ2V0IHZpZXcgdG8gc2hvdyBvbiB0b3Agb2YgKERlZmF1bHRzIHRvIGVudGlyZSB3aW5kb3cpXHJcbiAgICAvLyAgIG1vZGU6IC8vIHNlZSBpT1Mgc3BlY2lmaWMgb3B0aW9ucyBiZWxvd1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG5cclxuICBjbGFzcyBBY2NvdW50QmFsYW5jZSB7XHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwdWJsaWMgY29vcGVyYXRpdmVOYW1lOiBTdHJpbmcsXHJcbiAgICAgICAgcHVibGljIGFjY291bnRCYWxhbmNlOiBudW1iZXIsXHJcbiAgICAgICAgcHVibGljIGJvb2tCYWxhbmNlOiBudW1iZXIsXHJcbiAgICAgICAgcHVibGljIHNlbGVjdGVkSW5kZXg6IG51bWJlcixcclxuICAgICAgICBwdWJsaWMgb3RoZXJBY2NvdW50c0Ryb3BEb3duOiBWYWx1ZUxpc3Q8c3RyaW5nPixcclxuICAgICAgICBwdWJsaWMgb3RoZXJBY2NvdW50czogQXJyYXk8Q29vcGVyYXRpdmVTdGFmZkFjY291bnQ+IFxyXG4gICAgXHJcbiAgICApIHsgfVxyXG59XHJcblxyXG5cclxuIFxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiBcIm5zLWhvbWVcIixcclxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXHJcbiAgICB0ZW1wbGF0ZVVybDogXCIuL2hvbWUuY29tcG9uZW50Lmh0bWxcIixcclxuICAgIHN0eWxlVXJsczogW1wiLi9ob21lLmNvbXBvbmVudC5jc3NcIl0sXHJcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxyXG59KVxyXG5leHBvcnQgY2xhc3MgSG9tZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95IHtcclxuICAgIEBWaWV3Q2hpbGQoTW9kYWxDb21wb25lbnQpIG1vZGFsOiBNb2RhbENvbXBvbmVudDtcclxuICAgIGFkc1VSTDogc3RyaW5nICA9IENvbmZpZy5hZHNVUkw7XHJcbiAgICBhcGlVcmw6IHN0cmluZyA9IENvbmZpZy5hcGlVcmw7XHJcbiAgICBwcm9kdWN0SW1hZ2VVcmw6IHN0cmluZyAgPSBDb25maWcucHJvZHVjdEltYWdlVVJMO1xyXG4gICAgcHVibGljIGhpZGRlbjogYm9vbGVhbjtcclxuICAgIHB1YmxpYyB0dnRleHQgPSBcIlwiO1xyXG4gICAgcHVibGljIHRpdGxlU3RhdGU6IFRJVExFX1NUQVRFO1xyXG4gICAgcHVibGljIF9iYXI6IEJvdHRvbUJhcjtcclxuICAgIHB1YmxpYyBpbmFjdGl2ZUNvbG9yOiBzdHJpbmc7XHJcbiAgICBwdWJsaWMgYWNjZW50Q29sb3I6IHN0cmluZyA9IFwicmdiKDI1NCwgMjA0LCAyMilcIjtcclxuICAgIHB1YmxpYyBjc3NDbGFzczogc3RyaW5nICAgICAgPSBcImRlZmF1bHRcIjtcclxuICAgIHRhYlNlbGVjdGVkSW5kZXg6IG51bWJlciA9IDA7XHJcbiAgICBhY2NvdW50QmFsYW5jZXM6IEFycmF5PENvb3BlcmF0aXZlU3RhZmZBY2NvdW50PiA7XHJcbiAgICBtYWluQWNjb3VudEJhbGFuY2VzOiBBcnJheTxBY2NvdW50QmFsYW5jZT4gPSBbe1wiY29vcGVyYXRpdmVOYW1lXCI6XCJcIixcImFjY291bnRCYWxhbmNlXCI6MCxcImJvb2tCYWxhbmNlXCI6MCxcInNlbGVjdGVkSW5kZXhcIjowLFwib3RoZXJBY2NvdW50c0Ryb3BEb3duXCI6IG5ldyBWYWx1ZUxpc3Q8c3RyaW5nPigpLFwib3RoZXJBY2NvdW50c1wiOlt7IFwiY29vcGVyYXRpdmVJZFwiOiBcIlwiLFxyXG4gICAgXCJzdGFmZklkXCI6IFwiXCIsXHJcbiAgICBcImFjY291bnRUeXBlXCI6IFwiXCIsXHJcbiAgICBcImFjY291bnRCYWxhbmNlXCI6IFwiXCIsXHJcbiAgICBcImJvb2tCYWxhbmNlXCI6IFwiXCIsIFwiY29vcGVyYXRpdmVcIjp7XCJjb29wZXJhdGl2ZUlkXCI6XCJDT09QMTAyXCIsXCJmaXJzdF9uYW1lXCI6XCJDb29wRWFzdFwiLFwibGFzdF9uYW1lXCI6XCJDb29QRWFzdFwiLFwic3RhdHVzXCI6XCJBY3RpdmVcIn19XSB9XTtcclxuICAgIG1haW5BY2NvdW50QmFsYW5jZTogQWNjb3VudEJhbGFuY2UgPSB7XCJjb29wZXJhdGl2ZU5hbWVcIjpcIlwiLFwiYWNjb3VudEJhbGFuY2VcIjowLFwiYm9va0JhbGFuY2VcIjowLFwic2VsZWN0ZWRJbmRleFwiOjAsXCJvdGhlckFjY291bnRzRHJvcERvd25cIjogbmV3IFZhbHVlTGlzdDxzdHJpbmc+KCksXCJvdGhlckFjY291bnRzXCI6W3sgXCJjb29wZXJhdGl2ZUlkXCI6IFwiXCIsXHJcbiAgICAgICAgXCJzdGFmZklkXCI6IFwiXCIsXHJcbiAgICAgICAgXCJhY2NvdW50VHlwZVwiOiBcIlwiLFxyXG4gICAgICAgIFwiYWNjb3VudEJhbGFuY2VcIjogXCJcIixcclxuICAgICAgICBcImJvb2tCYWxhbmNlXCI6IFwiXCIsIFwiY29vcGVyYXRpdmVcIjp7XCJjb29wZXJhdGl2ZUlkXCI6XCJcIixcImZpcnN0X25hbWVcIjpcIkNcIixcImxhc3RfbmFtZVwiOlwiXCIsXCJzdGF0dXNcIjpcIlwifX1dIH07XHJcblxyXG4gICAgY2F0ZWdvcmllczogQXJyYXk8Q2F0ZWdvcnk+IDtcclxuICAgIHVzZXJJZDogU3RyaW5nO1xyXG4gICAgY29vcGVySWQ6IFN0cmluZztcclxuICAgIHNwb25zb3Jwcm9kdWN0czogQXJyYXk8U3BvbnNvclByb2R1Y3Q+IDtcclxuICAgIHZpZXdwcm9kdWN0czogQXJyYXk8UHJvZHVjdD4gO1xyXG4gICAgc2VhcmNoZWRQcm9kdWN0czogQXJyYXk8UHJvZHVjdD4gPSBbXSA7XHJcbiAgICB0cmFuc2FjdGlvbnM6IEFycmF5PFRyYW5zYWN0aW9uPjtcclxuICAgIHByb2R1Y3RzOiBBcnJheTxTcG9uc29yUHJvZHVjdD4gPSBbXTtcclxuXHJcbiAgICBwcm90ZWN0ZWQgaW1hZ2VzOiBBcnJheTxhbnk+IDtcclxuXHJcbiAgICBwYWdlbnVtYmVyOiBudW1iZXIgPSAwO1xyXG5cclxuICAgIGFjY29yZGlvbkl0ZW1zOiBhbnlbXTtcclxuICAgIGFjY29yZGlvbkNhdDogYW55W107XHJcbiAgICBuZXdQcm9kdWN0cyA6IEFycmF5PFByb2R1Y3Q+ID0gW10gO1xyXG4gICAgcHJvZHVjdCA6IFByb2R1Y3Q7XHJcblxyXG5cclxuICAgIHB1YmxpYyBzZWxlY3RlZEluZGV4ID0gMTtcclxuICAgIHB1YmxpYyBVc2VyVHlwZXM6IFZhbHVlTGlzdDxzdHJpbmc+ID0gbmV3IFZhbHVlTGlzdDxzdHJpbmc+KFtcclxuICAgICAgICB7IHZhbHVlOiBcIlZlbmRvclwiLCBkaXNwbGF5OiBcIlZlbmRvclwiIH0sIFxyXG4gICAgICAgIHsgdmFsdWU6IFwiQ3VzdG9tZXJcIiwgZGlzcGxheTogXCJDdXN0b21lclwiIH1cclxuICAgIF0pO1xyXG5cclxuICAgIHB1YmxpYyBoaW50ICAgICAgICAgICAgICAgICAgPSBcIlZlbmRvclwiO1xyXG5cclxuICBcclxuXHJcbiAgICBwdWJsaWMgaXRlbXM6IEFycmF5PHN0cmluZz47XHJcbiAgICBhZHZlcnRzOiBBcnJheTxBZHZlcnQ+ID0gW107XHJcbiAgICBzdWI6IGFueTtcclxuXHJcbiAgICBsb2FkZWRDaGFyYWN0ZXI6IHt9O1xyXG4gICAgaXNzdWVzSW1hZ2VzID0gW107XHJcblxyXG4gICAgQFZpZXdDaGlsZCgnY2Fyb3VzZWwnKSBjYXJvdXNlbDogRWxlbWVudFJlZjtcclxuICAgIEBWaWV3Q2hpbGQoJ21haW50YWInKSBtYWludGFiOiBFbGVtZW50UmVmO1xyXG5cclxuICAgIGNvbXBsYWludE1lc3NhZ2U6IHN0cmluZztcclxuICAgIGNvbXBsYWludFZlbmRvcjogc3RyaW5nO1xyXG4gICAgY29tcGxhaW50RW1haWw6IHN0cmluZztcclxuICAgIGNvbXBsYWludE5hbWU6IHN0cmluZztcclxuICAgIGNvbXBsYWludENhdGVnb3J5OiBzdHJpbmc7XHJcbiAgICBjYXRlZ29yeUlkOiBTdHJpbmc7XHJcblxyXG5cclxuXHJcbiAgXHJcbiAgICBwcml2YXRlIHRhc2tzOiBiZ0h0dHAuVGFza1tdID0gW107XHJcbiAgICBwcml2YXRlIGV2ZW50czogeyBldmVudFRpdGxlOiBzdHJpbmcsIGV2ZW50RGF0YTogYW55IH1bXSA9IFtdO1xyXG4gICAgcHJpdmF0ZSBmaWxlOiBzdHJpbmc7XHJcbiAgICBwcml2YXRlIHVybDogc3RyaW5nO1xyXG4gICAgcHJpdmF0ZSBjb3VudGVyOiBudW1iZXIgPSAwO1xyXG4gICAgcHVibGljIHNlc3Npb24gPSBiZ0h0dHAuc2Vzc2lvbihcImltYWdlLXVwbG9hZFwiKTtcclxuXHJcbiAgICBjYXRlZ29yaWVzRmlsdGVyT246IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHNvcnRGaWx0ZXJPbjogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgbWFpbkZpbHRlck9uOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBsaXN0TGFiZWwgOiBTdHJpbmcgPSBcIidmYS10aCcgfCBmb250aWNvblwiO1xyXG4gICAgaXNTcXVhcmVMaXN0IDogYm9vbGVhbiA9IHRydWU7XHJcblxyXG5cclxuXHJcbiAgICBwcml2YXRlIF9zd2lwZUxheW91dHM6IEFycmF5PFN3aXBlTGF5b3V0PjtcclxuICAgIHByaXZhdGUgY3VycmVudFN3aXBlTGF5b3V0OiBTd2lwZUxheW91dDtcclxuICAgIHB1YmxpYyBzd2lwZUxheW91dEFuaW1hdGVkOiBBTklNQVRJT05fU1RBVEU7XHJcbiAgICBwdWJsaWMgZ2VzdHVyZU1vZGU6IEdFU1RVUkVfTU9ERTtcclxuXHJcbiAgICBAVmlld0NoaWxkKFwibXlTY3JvbGxlclwiKSBzdjogRWxlbWVudFJlZjtcclxuICAgIEBWaWV3Q2hpbGQoXCJidG5cIikgYnRuOiBFbGVtZW50UmVmO1xyXG4gICAgQFZpZXdDaGlsZChcImdyaWRcIikgZ3I6IEVsZW1lbnRSZWY7XHJcblxyXG4gICAgc2Nyb2xsTGF5b3V0OiBTY3JvbGxWaWV3O1xyXG4gICAgYnV0dG9uOiBCdXR0b247XHJcbiAgICBncmlkOiBHcmlkTGF5b3V0O1xyXG4gICAgcHVibGljIGNhcmRzOiBBcnJheTxhbnk+ID0gW3tcclxuICAgICAgICBpbWc6IFwiaHR0cHM6Ly9pbWcueW91dHViZS5jb20vdmkvR0doS1BtMThFNDgvbXFkZWZhdWx0LmpwZ1wiLFxyXG4gICAgICAgIHRlc3Q6IFwiQmF0bWFuIGlzIHByZXR0eSBjb29sIHJpZ2h0P1wiXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIGltZzogXCJodHRwczovL2ltZy55b3V0dWJlLmNvbS92aS9HR2hLUG0xOEU0OC9tcWRlZmF1bHQuanBnXCIsXHJcbiAgICAgICAgdGVzdDogXCJCYXRtYW4gaXMgcHJldHR5IGNvb2wgcmlnaHQ/XCJcclxuICAgIH0sIHtcclxuICAgICAgICBpbWc6IFwiaHR0cHM6Ly9pbWcueW91dHViZS5jb20vdmkvR0doS1BtMThFNDgvbXFkZWZhdWx0LmpwZ1wiLFxyXG4gICAgICAgIHRlc3Q6IFwiQmF0bWFuIGlzIHByZXR0eSBjb29sIHJpZ2h0P1wiXHJcbiAgICB9LCB7XHJcbiAgICAgICAgaW1nOiBcImh0dHBzOi8vaW1nLnlvdXR1YmUuY29tL3ZpL0dHaEtQbTE4RTQ4L21xZGVmYXVsdC5qcGdcIixcclxuICAgICAgICB0ZXN0OiBcIkJhdG1hbiBpcyBwcmV0dHkgY29vbCByaWdodD9cIlxyXG4gICAgfSwge1xyXG4gICAgICAgIGltZzogXCJodHRwczovL2ltZy55b3V0dWJlLmNvbS92aS9HR2hLUG0xOEU0OC9tcWRlZmF1bHQuanBnXCIsXHJcbiAgICAgICAgdGVzdDogXCJCYXRtYW4gaXMgcHJldHR5IGNvb2wgcmlnaHQ/XCJcclxuICAgIH0sIHtcclxuICAgICAgICBpbWc6IFwiaHR0cHM6Ly9pbWcueW91dHViZS5jb20vdmkvR0doS1BtMThFNDgvbXFkZWZhdWx0LmpwZ1wiLFxyXG4gICAgICAgIHRlc3Q6IFwiQmF0bWFuIGlzIHByZXR0eSBjb29sIHJpZ2h0P1wiXHJcbiAgICB9XVxyXG5cclxuXHJcbiAgICAvLyBUaGlzIHBhdHRlcm4gbWFrZXMgdXNlIG9mIEFuZ3VsYXLigJlzIGRlcGVuZGVuY3kgaW5qZWN0aW9uIGltcGxlbWVudGF0aW9uIHRvIGluamVjdCBhbiBpbnN0YW5jZSBvZiB0aGUgSXRlbVNlcnZpY2Ugc2VydmljZSBpbnRvIHRoaXMgY2xhc3MuIFxyXG4gICAgLy8gQW5ndWxhciBrbm93cyBhYm91dCB0aGlzIHNlcnZpY2UgYmVjYXVzZSBpdCBpcyBpbmNsdWRlZCBpbiB5b3VyIGFwcOKAmXMgbWFpbiBOZ01vZHVsZSwgZGVmaW5lZCBpbiBhcHAubW9kdWxlLnRzLlxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBmb250aWNvbjogVE5TRm9udEljb25TZXJ2aWNlLHByaXZhdGUgYXV0aFNlcnZpY2U6QXV0aFNlcnZpY2UscHJpdmF0ZSByb3V0ZXI6IFJvdXRlciwgcHJpdmF0ZSBhY3RpdmF0ZWRSb3V0ZTogQWN0aXZhdGVkUm91dGVcclxuICAgICxwcml2YXRlIGNvb3BlckNvb3BlcmF0aXZlU2VydmljZTpDb29wZXJDb29wZXJhdGl2ZVNlcnZpY2UsIHByaXZhdGUgY2F0ZWdvcnlTZXJ2aWNlOiBDYXRlZ29yeVNlcnZpY2UsXHJcbiAgICBwcml2YXRlIHNwb25zb3JQcm9kdWN0U2VydmljZTpTcG9uc29yUHJvZHVjdFNlcnZpY2UsIHByaXZhdGUgdHJhbnNhY3Rpb25TZXJ2aWNlOlRyYW5zYWN0aW9uU2VydmljZSxcclxucHJpdmF0ZSBwcm9kdWN0Vmlld1NlcnZpY2U6UHJvZHVjdFZpZXdTZXJ2aWNlLHByaXZhdGUgYXV0b0xvZ291dFNlcnZpY2U6QXV0b0xvZ291dFNlcnZpY2UscHJpdmF0ZSBhZHZlcnRTZXJ2aWNlOkFkdmVydFNlcnZpY2UscHJpdmF0ZSBodHRwQ2xpZW50OiBIdHRwQ2xpZW50LHByaXZhdGUgX2NoYW5nZURldGVjdGlvblJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXHJcbnByaXZhdGUgem9uZTogTmdab25lLCBwcml2YXRlIHByb2R1Y3RTZXJ2aWNlOlByb2R1Y3RTZXJ2aWNlLHByaXZhdGUgY29tcGxhaW50U2VydmljZTpDb21wbGFpbnRTZXJ2aWNlICkge1xyXG5cclxuICAgICAgXHJcbiAgICAgICAgdGhpcy5pdGVtcyA9IFtdO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgNTsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaXRlbXMucHVzaChcImRhdGEgaXRlbSBcIiArIGkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgTFMuc2V0SXRlbSgnbGFzdEFjdGlvbicsRGF0ZS5ub3coKS50b1N0cmluZygpKTtcclxuXHJcbiAgICAgICAgdGhpcy5maWxlID0gX19kaXJuYW1lICsgXCIvaW5maW5peGIuanBnXCI7XHJcbiAgICAgICAgdGhpcy5zZXNzaW9uID0gYmdIdHRwLnNlc3Npb24oXCJpbWFnZS11cGxvYWRcIik7XHJcbiAgICAgICAgdGhpcy51cmwgPSB0aGlzLmFwaVVybCArIFwiY29tcGxhaW50c1wiO1xyXG5cclxuXHJcbiAgICAgIFxyXG4gICAgICBcclxuICAgICB9XHJcblxyXG5cclxuICAgICBwcml2YXRlIGJ1aWxkQ2Fyb3VzZWwoKTogdm9pZCB7XHJcbiAgICAgIFxyXG4gICAgICAgIGxldCBjb3VudCA9IDA7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGltYWdlRGF0YSBvZiB0aGlzLmltYWdlcykge1xyXG5cclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCIgSW1hZ2UgUGF0aCBcIiArIGltYWdlRGF0YS51cmwpO1xyXG4gICAgICAgICAgICBjb25zdCBpbWFnZSA9IG5ldyBJbWFnZSgpO1xyXG4gICAgICAgICAgXHJcbiAgICAgICAgICAgIGltYWdlLmhlaWdodCA9IDIwMDtcclxuICAgICAgICAgICAgaW1hZ2Uuc3JjID0gaW1hZ2VEYXRhLnVybDtcclxuICAgICAgICAgICAgaW1hZ2UuY2xhc3NOYW1lID0gXCJpbWFnZVwiO1xyXG4gICAgICAgICAgICBpbWFnZS5zdHJldGNoID0gXCJhc3BlY3RGaWxsXCI7XHJcbiAgICAgICAgICAgIGltYWdlLmxvYWRNb2RlID0gXCJhc3luY1wiO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgaXRlbSA9IG5ldyBDYXJvdXNlbEl0ZW0oKTtcclxuICAgICAgICAgICAgaXRlbS5hZGRDaGlsZChpbWFnZSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmNhcm91c2VsLm5hdGl2ZUVsZW1lbnQuYWRkQ2hpbGQoaXRlbSk7XHJcbiAgICAgICAgICAgIGNvdW50Kys7XHJcblxyXG4gICAgICAgICAgICBpZiAoaXNBbmRyb2lkKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBhZGFwdGVyID0gdGhpcy5jYXJvdXNlbC5uYXRpdmVFbGVtZW50LmFuZHJvaWQuZ2V0QWRhcHRlcigpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChhZGFwdGVyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWRhcHRlci5ub3RpZnlEYXRhU2V0Q2hhbmdlZCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2Fyb3VzZWwubmF0aXZlRWxlbWVudC5fcGFnZUluZGljYXRvclZpZXcuc2V0Q291bnQoY291bnQpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoY291bnQgPT09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jYXJvdXNlbC5uYXRpdmVFbGVtZW50Ll9wYWdlSW5kaWNhdG9yVmlldy5zZXRTZWxlY3Rpb24oaXRlbS5hbmRyb2lkKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuY2Fyb3VzZWwubmF0aXZlRWxlbWVudC5yZWZyZXNoKCk7XHJcblxyXG4gICAgICAgIHRoaXMucGFnZW51bWJlciA9IDE7XHJcbiAgICB9XHJcblxyXG4gICAgY2hhbmdlSW1hZ2UoKVxyXG4gICAge1xyXG4gICAgICAgXHJcbiAgICAgICAgbGV0IHNsaWRlcyA9IHRoaXMuY2Fyb3VzZWwubmF0aXZlRWxlbWVudDtcclxuICAgICAgICAgaWYodGhpcy5wYWdlbnVtYmVyID09PSB0aGlzLmltYWdlcy5sZW5ndGgpXHJcbiAgICAgICAgIHtcclxuICAgICAgICAgICAgIHRoaXMucGFnZW51bWJlciA9IDA7XHJcbiAgICAgICAgIH1cclxuICAgICAgIFxyXG4gICAgICAgIHNsaWRlcy5zZWxlY3RlZFBhZ2UgPSB0aGlzLnBhZ2VudW1iZXI7XHJcblxyXG4gICAgICAgIHRoaXMucGFnZW51bWJlciArPSAxO1xyXG5cclxuICAgICBcclxuICAgICAgICB0aGlzLl9jaGFuZ2VEZXRlY3Rpb25SZWYuZGV0ZWN0Q2hhbmdlcygpO1xyXG4gICAgfVxyXG4gICAgIG9uVG91Y2goYXJnczogVG91Y2hHZXN0dXJlRXZlbnREYXRhKSB7XHJcblxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiUGFnZSBpcyB0b3VjaGVkXCIpO1xyXG4gICAgICAgdGhpcy5hdXRvTG9nb3V0U2VydmljZS5yZXNldCgpO1xyXG4gICAgfVxyXG5cclxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xyXG4gICAgICBcclxuICAgICAgIC8vIHRoaXMucm91dGVyLm5hdmlnYXRlKFtcIi9zaG9wY2F0ZWdvcnlcIl0pO1xyXG4gICAgICAgdGhpcy5jYXRlZ29yeUlkID0gdGhpcy5hY3RpdmF0ZWRSb3V0ZS5zbmFwc2hvdC5wYXJhbXNbXCJpZFwiXTtcclxuICAgICAgICB2YXIgZGF0YU9iamVjdCA9IEpTT04ucGFyc2UoTFMuZ2V0SXRlbSgnY3VycmVudFVzZXInKSk7XHJcblxyXG4gICAgICAgXHJcblxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiVXNlciBJRCBcIiArIGRhdGFPYmplY3QuX2lkKTtcclxuICAgICAgICAgIGlmKGRhdGFPYmplY3QuX2lkKVxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICAgIHRoaXMudXNlcklkID0gZGF0YU9iamVjdC5faWQ7XHJcbiAgICAgICAgICAgICAgdGhpcy5jb29wZXJJZCA9IGRhdGFPYmplY3QuY29vcGVySWQ7XHJcbiAgICAgICAgICAgICBcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgXHJcblxyXG4gICAgICAgIGxvYWRlci5zaG93KG9wdGlvbnMpO1xyXG4gICAgICAgXHJcblxyXG4gICAgICAgIGZvcmtKb2luKFtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgIFxyXG4gICAgICAgICAgIFxyXG4gICAgICAgICAgIFxyXG4gICAgICAgICAgICB0aGlzLnNwb25zb3JQcm9kdWN0U2VydmljZS5nZXRhbGxTcG9uc29yUHJvZHVjdHMoKSxcclxuICAgICAgICB0aGlzLmFkdmVydFNlcnZpY2UuZ2V0YWxsQWR2ZXJ0cygpLFxyXG4gICAgICAgIHRoaXMuY2F0ZWdvcnlTZXJ2aWNlLmdldEFsbENhdGVnb3J5KClcclxuICAgICAgICAgIFxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgXSkuc3Vic2NyaWJlKChyZXNwb25zZSkgPT4ge1xyXG4gICAgICAgICAgXHJcblxyXG4gICAgICAgICAgIFxyXG4gICAgICAgICAgIFxyXG4gICAgICAgICAgICB0aGlzLnNwb25zb3Jwcm9kdWN0cyA9IHJlc3BvbnNlWzBdW1wiZGF0YVwiXTtcclxuICAgICAgICAgICAgdGhpcy5hZHZlcnRzID0gcmVzcG9uc2VbMV1bXCJkYXRhXCJdO1xyXG4gICAgICAgICAgICB0aGlzLmNhdGVnb3JpZXMgPSByZXNwb25zZVsyXVtcImRhdGFcIl07XHJcblxyXG4gICAgICAgICAgXHJcblxyXG4gICAgICAgICAgICAvLyAgIGxldCBkaXN0aW5jdEFjY291bnRCYWxhbmNlQXJyYXk6IEFycmF5PGFueT4gPSBbXTtcclxuXHJcbiAgICAgICAgICAgIC8vICAgZm9yKGxldCBiYWwgb2YgdGhpcy5hY2NvdW50QmFsYW5jZXMpXHJcbiAgICAgICAgICAgIC8vICAge1xyXG4gICAgICAgICAgICAvLyAgICAgICBpZihkaXN0aW5jdEFjY291bnRCYWxhbmNlQXJyYXkubGVuZ3RoID09PSAwKVxyXG4gICAgICAgICAgICAvLyAgICAgICB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgZGlzdGluY3RBY2NvdW50QmFsYW5jZUFycmF5LnB1c2goYmFsKTtcclxuICAgICAgICAgICAgLy8gICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgdmFyIGNoZWNrSWZFeGlzdCA9IGRpc3RpbmN0QWNjb3VudEJhbGFuY2VBcnJheS5maWx0ZXIobiA9PiBuLmNvb3BlcmF0aXZlSWQgPT09IGJhbC5jb29wZXJhdGl2ZUlkICk7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgaWYoY2hlY2tJZkV4aXN0Lmxlbmd0aCA+IDApXHJcbiAgICAgICAgICAgIC8vICAgICAgICAge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgLy8gICAgICAgICB9ZWxzZXtcclxuICAgIFxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICBkaXN0aW5jdEFjY291bnRCYWxhbmNlQXJyYXkucHVzaChiYWwpO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gICAgICAgfVxyXG4gICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvLyB9XHJcblxyXG4gICAgICAgICAgIFxyXG5cclxuICAgICAgICAgICAgLy8gdGhpcy5tYWluQWNjb3VudEJhbGFuY2VzID0gW107XHJcbiAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vIGZvciggbGV0IGZpbHRlcmVkIG9mIGRpc3RpbmN0QWNjb3VudEJhbGFuY2VBcnJheSlcclxuICAgICAgICAgICAgLy8ge1xyXG4gICAgICAgICAgICAvLyAgICAgdGhpcy5tYWluQWNjb3VudEJhbGFuY2UgPSB7XCJjb29wZXJhdGl2ZU5hbWVcIjpcIlwiLFwiYWNjb3VudEJhbGFuY2VcIjowLFwiYm9va0JhbGFuY2VcIjowLFwic2VsZWN0ZWRJbmRleFwiOjAsXCJvdGhlckFjY291bnRzRHJvcERvd25cIjogbmV3IFZhbHVlTGlzdDxzdHJpbmc+KCksXCJvdGhlckFjY291bnRzXCI6W3sgXCJjb29wZXJhdGl2ZUlkXCI6IFwiXCIsXHJcbiAgICAgICAgICAgIC8vICAgICBcInN0YWZmSWRcIjogXCJcIixcclxuICAgICAgICAgICAgLy8gICAgIFwiYWNjb3VudFR5cGVcIjogXCJcIixcclxuICAgICAgICAgICAgLy8gICAgIFwiYWNjb3VudEJhbGFuY2VcIjogXCJcIixcclxuICAgICAgICAgICAgLy8gICAgIFwiYm9va0JhbGFuY2VcIjogXCJcIiwgXCJjb29wZXJhdGl2ZVwiOntcImNvb3BlcmF0aXZlSWRcIjpcIlwiLFwiZmlyc3RfbmFtZVwiOlwiQ1wiLFwibGFzdF9uYW1lXCI6XCJcIixcInN0YXR1c1wiOlwiXCJ9fV0gfTs7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgLy8gICAgICBsZXQgZ2V0T3RoZXJBY2NvdW50cyA9IHRoaXMuYWNjb3VudEJhbGFuY2VzLmZpbHRlcihuID0+IG4uY29vcGVyYXRpdmVJZCA9PT0gZmlsdGVyZWQuY29vcGVyYXRpdmVJZCApO1xyXG5cclxuICAgICAgICAgICAgLy8gICAgICBsZXQgZGVmYXVsdEFjY291bnQgPSBnZXRPdGhlckFjY291bnRzLmZpbHRlcihuID0+IG4uYWNjb3VudFR5cGUgPT09IFwiU2F2aW5nc1wiKTtcclxuXHJcbiAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vICAgICB0aGlzLm1haW5BY2NvdW50QmFsYW5jZS5hY2NvdW50QmFsYW5jZSA9ICsgZGVmYXVsdEFjY291bnRbMF0uYWNjb3VudEJhbGFuY2U7XHJcbiAgICAgICAgICAgIC8vICAgICB0aGlzLm1haW5BY2NvdW50QmFsYW5jZS5ib29rQmFsYW5jZSA9ICsgZGVmYXVsdEFjY291bnRbMF0uYm9va0JhbGFuY2U7XHJcbiAgICAgICAgICAgIC8vICAgICB0aGlzLm1haW5BY2NvdW50QmFsYW5jZS5jb29wZXJhdGl2ZU5hbWUgPSBkZWZhdWx0QWNjb3VudFswXS5jb29wZXJhdGl2ZS5maXJzdF9uYW1lO1xyXG4gICAgICAgICAgICAvLyAgICAgdGhpcy5tYWluQWNjb3VudEJhbGFuY2Uub3RoZXJBY2NvdW50cyA9IGdldE90aGVyQWNjb3VudHM7XHJcbiAgICAgICAgICAgIC8vICAgICB0aGlzLm1haW5BY2NvdW50QmFsYW5jZS5zZWxlY3RlZEluZGV4ID0gMDtcclxuICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vICAgICBmb3IgKCBsZXQgbG9vcCA9IDA7IGxvb3AgPCBnZXRPdGhlckFjY291bnRzLmxlbmd0aDsgbG9vcCsrICkge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgIHRoaXMubWFpbkFjY291bnRCYWxhbmNlLm90aGVyQWNjb3VudHNEcm9wRG93bi5wdXNoKHsgdmFsdWU6ICAgYCR7Z2V0T3RoZXJBY2NvdW50c1tsb29wXS5hY2NvdW50VHlwZX1gLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgZGlzcGxheTogYCR7Z2V0T3RoZXJBY2NvdW50c1tsb29wXS5hY2NvdW50VHlwZX1gLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgLy8gICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvLyAgICAgICB0aGlzLm1haW5BY2NvdW50QmFsYW5jZXMucHVzaCh0aGlzLm1haW5BY2NvdW50QmFsYW5jZSk7XHJcblxyXG4gICAgICAgICAgICAvLyB9XHJcblxyXG4gICAgICAgICAgICBsb2FkZXIuaGlkZSgpO1xyXG4gICAgICAgICAgICAvLyAgIGZvciAobGV0IGxvb3AgPSAwOyBsb29wIDwgdGhpcy5hY2NvdW50QmFsYW5jZXMubDsgbG9vcCsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvLyAgICAgaWYobG9vcCA+IDApXHJcbiAgICAgICAgICAgIC8vICAgICB7XHJcbiAgICAgICAgICAgIC8vICAgICAgdGhpcy5wcm9kdWN0LnF0eUxpc3QucHVzaCh7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgIHZhbHVlOiBsb29wLnRvU3RyaW5nKCksXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgIGRpc3BsYXk6IGxvb3AudG9TdHJpbmcoKSxcclxuICAgICAgICAgICAgLy8gICAgICB9KTtcclxuICAgICAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAgICAgLy8gIH1cclxuXHJcbiAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIkdyb3VwIEJhbGFuY2UgXCIgKyBKU09OLnN0cmluZ2lmeShncm91cEJ5KHRoaXMuYWNjb3VudEJhbGFuY2VzLCAnY29vcGVyYXRpdmVJZCcpKSk7XHJcblxyXG4gICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmKHRoaXMuYWR2ZXJ0cy5sZW5ndGggPiAwKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgXHJcblxyXG4gICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pbWFnZXMgPSBbXTtcclxuICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yICggbGV0IGxvb3AgPSAwOyBsb29wIDwgdGhpcy5hZHZlcnRzLmxlbmd0aDsgbG9vcCsrICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pbWFnZXMucHVzaCh7IHRpdGxlOiAgIGAke3RoaXMuYWR2ZXJ0c1tsb29wXS5vd25lck5hbWV9YCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVybDogYCR7dGhpcy5hZHNVUkwgKyAgdGhpcy5hZHZlcnRzW2xvb3BdLmFkdmVydEltYWdlUGF0aH1gLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQWR2ZXJ0IEltYWdlcyBcIiArIEpTT04uc3RyaW5naWZ5KHRoaXMuaW1hZ2VzKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5idWlsZENhcm91c2VsKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vIGZvciAoIGxldCBsb29wID0gMDsgbG9vcCA8IHRoaXMuY2F0ZWdvcmllcy5sZW5ndGg7IGxvb3ArKyApIHtcclxuICAgICAgICAgICAgLy8gICAgIHRoaXMuYWNjb3JkaW9uQ2F0LnB1c2goeyB2YWx1ZTogICBgJHt0aGlzLmNhdGVnb3JpZXNbbG9vcF0uX2lkfWAsXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgIGRpc3BsYXk6IGAke3RoaXMuY2F0ZWdvcmllc1tsb29wXS5jYXRlZ29yeU5hbWV9YCxcclxuICAgICAgICAgICAgLy8gICAgICAgICB9KTtcclxuICAgICAgICAgICAgLy8gICAgIH1cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgLy8gdGhpcy5hY2NvcmRpb25JdGVtcyA9IFtcclxuICAgICAgICAgICAgICAgIC8vICAgICB7IHRpdGxlOiBcIkNhdGVnb3J5XCIsIGZvb3RlcjogXCIxMFwiLCBoZWFkZXJUZXh0OiBcIkNhdGVnb3J5XCIsIGZvb3RlclRleHQ6IFwiNFwiLCBpdGVtczogWyB7IHZhbHVlOiBcIlBVXCIsIGRpc3BsYXk6IFwiUHJpY2UgVXBcIiB9LFxyXG4gICAgICAgICAgICAgICAgLy8gICAgIHsgdmFsdWU6IFwiUERcIiwgZGlzcGxheTogXCJQcmljZSBEb3duXCIgfSxcclxuICAgICAgICAgICAgICAgIC8vICAgICB7IHZhbHVlOiBcIlBcIiwgZGlzcGxheTogXCJQb3B1bGFyaXR5XCIgfSxcclxuICAgICAgICAgICAgICAgIC8vICAgICB7IHZhbHVlOiBcIkJSXCIsIGRpc3BsYXk6IFwiQmVzdCBSYXRpbmdcIiB9XX0sXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgeyB0aXRsZTogXCJTb3J0XCIsIGZvb3RlcjogXCIyMFwiLCBoZWFkZXJUZXh0OiBcIlNvcnRcIiwgZm9vdGVyVGV4dDogXCI1XCIsIGl0ZW1zOiBbeyB2YWx1ZTogXCJOQVwiLCBkaXNwbGF5OiBcIk5ldyBBcnJpdmFsXCIgfSwgXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgeyB2YWx1ZTogXCJQVVwiLCBkaXNwbGF5OiBcIlByaWNlIFVwXCIgfSxcclxuICAgICAgICAgICAgICAgIC8vICAgICB7IHZhbHVlOiBcIlBEXCIsIGRpc3BsYXk6IFwiUHJpY2UgRG93blwiIH0sXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgeyB2YWx1ZTogXCJQXCIsIGRpc3BsYXk6IFwiUG9wdWxhcml0eVwiIH0sXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgeyB2YWx1ZTogXCJCUlwiLCBkaXNwbGF5OiBcIkJlc3QgUmF0aW5nXCIgfV0gfSxcclxuICAgICAgICAgICAgICAgIC8vICAgICB7IHRpdGxlOiBcIkZpbHRlclwiLCBmb290ZXI6IFwiMzBcIiwgaGVhZGVyVGV4dDogXCJGaWx0ZXJcIiwgZm9vdGVyVGV4dDogXCI2XCIsIGl0ZW1zOiBbIHsgdmFsdWU6IFwiQ29sb3JcIiwgZGlzcGxheTogXCJDb2xvclwiIH0sIFxyXG4gICAgICAgICAgICAgICAgLy8gICAgIHsgdmFsdWU6IFwiU2l6ZVwiLCBkaXNwbGF5OiBcIlNpemVcIiB9LFxyXG4gICAgICAgICAgICAgICAgLy8gICAgIHsgdmFsdWU6IFwiUHJpY2VcIiwgZGlzcGxheTogXCJQcmljZVwiIH0sXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgeyB2YWx1ZTogXCJCcmFuZFwiLCBkaXNwbGF5OiBcIkJyYW5kXCIgfV0gfVxyXG4gICAgICAgICAgICAgICAgLy8gXTtcclxuXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgIHRoaXMuX2NoYW5nZURldGVjdGlvblJlZi5kZXRlY3RDaGFuZ2VzKCk7XHJcblxyXG4gICAgICAgICAgXHJcbiAgICAgICAgXHJcbiAgICAgICAgXHJcbiAgICAgICAgfSxcclxuICAgICAgICAgICAgZXJyID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yIGZyb20gRm9sa0pvaW4gKyBcIiArIEpTT04uc3RyaW5naWZ5KGVycikpO1xyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgKTtcclxuICAgICAgICAvLyBpZiAoIWlzQW5kcm9pZCkge1xyXG4gICAgICAgIC8vICAgICByZXR1cm47XHJcbiAgICAgICAgLy8gICB9XHJcblxyXG4gICAgICAgIC8vIGFwcGxpY2F0aW9uLmFuZHJvaWQub24oQW5kcm9pZEFwcGxpY2F0aW9uLmFjdGl2aXR5QmFja1ByZXNzZWRFdmVudCwgKGRhdGE6IEFuZHJvaWRBY3Rpdml0eUJhY2tQcmVzc2VkRXZlbnREYXRhKSA9PiB7XHJcbiAgICAgICAgICBcclxuICAgICAgICAvLyAgICAgaWYgKHRoaXMucm91dGVyLmlzQWN0aXZlKFwiL2J1eVwiLCBmYWxzZSkpIHtcclxuICAgICAgICAvLyAgICAgICBkYXRhLmNhbmNlbCA9IHRydWU7IC8vIHByZXZlbnRzIGRlZmF1bHQgYmFjayBidXR0b24gYmVoYXZpb3JcclxuICAgICAgICAvLyAgICAgICAvL3RoaXMubG9nb3V0KCk7XHJcblxyXG4gICAgICAgIC8vICAgICAgIC8vdGhpcy5yb3V0ZXIubmF2aWdhdGUoW1wiL2xvZ2luXCJdKTtcclxuXHJcbiAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAgICBcclxuICAgICAgICAvLyAgIH0pO1xyXG4gIFxyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIG5nT25EZXN0cm95KCl7XHJcbiAgICAgICAgdGhpcy5zdWIudW5zdWJzY3JpYmUoKTtcclxuICAgICAgIH1cclxuXHJcbiAgICBuZ0FmdGVyVmlld0luaXQoKSB7XHJcbiAgICAgLy8gdGhpcy5nZXRCYWxhbmNlcyh0aGlzLmNvb3BlcklkKTtcclxuXHJcbiAgICAgdGhpcy5zdWIgPSBPYnNlcnZhYmxlLmludGVydmFsKDUwMDApXHJcbiAgICAgLnN1YnNjcmliZSgodmFsKSA9PiB7IFxyXG4gICAgICAgICBcclxuICAgICAgICB0aGlzLmNoYW5nZUltYWdlKCk7XHJcbiBcclxuICAgICAgICAgXHJcbiAgICAgXHJcbiAgICAgfSlcclxuXHJcbiAgICAgdGhpcy5idWlsZENhcm91c2VsKCk7XHJcblxyXG4gICAgLy8gdGhpcy5jdXJyZW50U3dpcGVMYXlvdXQgPSB0aGlzLl9zd2lwZUxheW91dHNbdGhpcy5fc3dpcGVMYXlvdXRzLmxlbmd0aCAtIDFdO1xyXG4gICAgICAgIFxyXG4gICAgIHRoaXMuX2NoYW5nZURldGVjdGlvblJlZi5kZXRlY3RDaGFuZ2VzKCk7XHJcbiAgIH1cclxuICAgIC8vIG5ldyBCb3R0b21CYXJJdGVtKDMsIFwiQWNjb3VudFwiLCBcImljX2NvbGxhYm9yYXRvclwiLCBcImdyZWVuXCIsIG5ldyBOb3RpZmljYXRpb24oXCJncmVlblwiLCBcInJlZFwiLCBcIjFcIikpXHJcbiAgICBwdWJsaWMgaXRlbXNNZW51OiBBcnJheTxCb3R0b21CYXJJdGVtPiA9IFtcclxuICAgICAgICBuZXcgQm90dG9tQmFySXRlbSgwLCBcIkhvbWVcIiwgXCJpY19ob21lX2JsYWNrXzI0ZHBcIiwgXCIjOUE5OTk5XCIpLFxyXG4gICAgICAgIG5ldyBCb3R0b21CYXJJdGVtKDEsIFwiU2hvcFwiLCBcImljX2NhbGVuZGFyXCIsIFwiIzlBOTk5OVwiKSxcclxuICAgICAgICBuZXcgQm90dG9tQmFySXRlbSgyLCBcIkFwcHJvdmUvRGlzbWlzc1wiLCBcImljX3BhcGVycGxhbmVcIiwgXCIjOUE5OTk5XCIpLFxyXG4gICAgICAgIG5ldyBCb3R0b21CYXJJdGVtKDMsIFwiQWNjb3VudFwiLCBcImljX2NvbGxhYm9yYXRvclwiLCBcIiM5QTk5OTlcIilcclxuICAgIF07XHJcbiBcclxuICAgIHRhYkxvYWRlZChldmVudCkge1xyXG4gICAgICAgIHRoaXMuX2JhciA9IDxCb3R0b21CYXI+ZXZlbnQub2JqZWN0O1xyXG4gICAgICAgIHRoaXMuaGlkZGVuID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy50aXRsZVN0YXRlID0gVElUTEVfU1RBVEUuU0hPV19XSEVOX0FDVElWRTtcclxuICAgICAgICB0aGlzLmluYWN0aXZlQ29sb3IgPSBcIndoaXRlXCI7XHJcbiAgICAgICAgdGhpcy5hY2NlbnRDb2xvciA9IFwicmdiKDI1NCwgMjA0LCAyMilcIjtcclxuICAgIH1cclxuICAgIFxyXG4gICAgIHRhYlNlbGVjdGVkKGFyZ3M6IFNlbGVjdGVkSW5kZXhDaGFuZ2VkRXZlbnREYXRhKSB7XHJcbiAgICAgICAgIC8vIG9ubHkgdHJpZ2dlcmVkIHdoZW4gYSBkaWZmZXJlbnQgdGFiIGlzIHRhcHBlZFxyXG4gICAgICAgICBjb25zb2xlLmxvZyhhcmdzLm5ld0luZGV4KTtcclxuXHJcbiAgICAgICAgIGlmKGFyZ3MubmV3SW5kZXggPT0gMylcclxuICAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbXCIvYWNjb3VudFwiXSk7XHJcbiAgICAgICAgIH1cclxuICAgICB9XHJcblxyXG4gICAgIHB1YmxpYyBvbmNoYW5nZShhcmdzOiBTZWxlY3RlZEluZGV4Q2hhbmdlZEV2ZW50RGF0YSkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGBEcm9wIERvd24gc2VsZWN0ZWQgaW5kZXggY2hhbmdlZCBmcm9tICR7YXJncy5vbGRJbmRleH0gdG8gJHthcmdzLm5ld0luZGV4fWApO1xyXG4gICAgfVxyXG4gXHJcbiAgICBwdWJsaWMgb25vcGVuKCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiRHJvcCBEb3duIG9wZW5lZC5cIik7XHJcbiAgICB9XHJcbiBcclxuICAgIHB1YmxpYyBvbmNsb3NlKCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiRHJvcCBEb3duIGNsb3NlZC5cIik7XHJcbiAgICB9XHJcblxyXG5cclxucHVibGljIG1haW5UYWJvbkluZGV4Q2hhbmdlZChhcmdzKSB7XHJcbiAgICBsZXQgdGFiVmlldyA9IDxUYWJWaWV3PmFyZ3Mub2JqZWN0O1xyXG4gICAgaWYodGFiVmlldy5zZWxlY3RlZEluZGV4ID09IDUpXHJcbiAgICB7XHJcbiAgICAgXHJcbiAgICAgXHJcbiAgICB9ZWxzZXtcclxuICAgICAgLy90aGlzLmNhblZpZXdOb3RpY2UgPSBmYWxzZTtcclxuICAgIH1cclxuICB9XHJcblxyXG5cclxuICBvbkJvdHRvbU5hdmlnYXRpb25UYWJTZWxlY3RlZChhcmdzOiBPblRhYlNlbGVjdGVkRXZlbnREYXRhKTogdm9pZCB7XHJcbiAgICBjb25zb2xlLmxvZyhgVGFiIHNlbGVjdGVkOiAgJHthcmdzLm9sZEluZGV4fWApO1xyXG5cclxuICBcclxuICAgIGlmKGFyZ3MubmV3SW5kZXggPT0gMClcclxuICAgIHtcclxuICAgICAgLy8gdGhpcy5yb3V0ZXIubmF2aWdhdGUoW1wiXCJdKTtcclxuICAgICAgdGhpcy5tYWludGFiLm5hdGl2ZUVsZW1lbnQuc2VsZWN0ZWRJbmRleCAgPSAwO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZihhcmdzLm5ld0luZGV4ID09IDEpXHJcbiAgICB7XHJcbiAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbXCIvYXBwcm92ZVwiXSk7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmKGFyZ3MubmV3SW5kZXggPT0gMilcclxuICAgIHtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLm1haW50YWIubmF0aXZlRWxlbWVudC5zZWxlY3RlZEluZGV4ICA9IDE7XHJcbiAgICAgICAvL3RoaXMucm91dGVyLm5hdmlnYXRlKFtcIi9zaG9wXCJdKTtcclxuICAgIH1cclxuICAgIGVsc2UgaWYoYXJncy5uZXdJbmRleCA9PSAzKVxyXG4gICAge1xyXG4gICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW1wiL2FjY291bnRcIl0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcblxyXG4gZ2V0QmFsYW5jZXMoIGNvb3BlcklkOiBTdHJpbmcgKXtcclxuICAgICAgIFxyXG4gICAgbG9hZGVyLnNob3cob3B0aW9ucyk7XHJcbiAgICBjb25zb2xlLmxvZyhcIlJlYWNoaW5nIGJhbGFuY2VzICBcIiArIGNvb3BlcklkICk7XHJcblxyXG4gICAgdGhpcy5jb29wZXJDb29wZXJhdGl2ZVNlcnZpY2UuZ2V0Q29vcGVyQ29vcG9yYXRvckJhbGFuY2VzKGNvb3BlcklkKS5zdWJzY3JpYmUoXHJcbiAgICAgICAgZGF0YSA9PiB7IFxyXG5cclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJBY2NvdW50IEJhbGFuY2VzIGZyb20gREIgXCIgKyBKU09OLnN0cmluZ2lmeShkYXRhW1wiZGF0YVwiXSkpO1xyXG4gICAgICAgICAgICB0aGlzLmFjY291bnRCYWxhbmNlcyA9IGRhdGFbXCJkYXRhXCJdO1xyXG5cclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJBY2NvdW50IEJhbGFuY2VzIGZyb20gREIgMlwiICsgSlNPTi5zdHJpbmdpZnkodGhpcy5hY2NvdW50QmFsYW5jZXMpKTtcclxuICAgICAgICAgICAgbG9hZGVyLmhpZGUoKTtcclxuICAgICAgICAgICAgdGhpcy5nZXRDYXRlZ29yeSgpO1xyXG4gICAgICAgICBcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBlcnIgPT4ge1xyXG4gICAgICAgICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KGVycikpO1xyXG4gICAgICAgICAgIFxyXG4gICAgICAgICAgXHJcbiAgICAgICAgICAgICB9XHJcbiAgICAgICAgKTtcdCAgXHJcbn1cclxuXHJcblxyXG5nZXRDYXRlZ29yeSggKXtcclxuICAgICAgIFxyXG4gICAgXHJcblxyXG4gICAgdGhpcy5jYXRlZ29yeVNlcnZpY2UuZ2V0QWxsQ2F0ZWdvcnkoKS5zdWJzY3JpYmUoXHJcbiAgICAgICAgZGF0YSA9PiB7IFxyXG5cclxuICAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJDYXRlZ29yeSBmcm9tIERCIFwiICsgSlNPTi5zdHJpbmdpZnkoZGF0YVtcImRhdGFcIl0pKTtcclxuICAgICAgICAgICAgdGhpcy5jYXRlZ29yaWVzID0gZGF0YVtcImRhdGFcIl07XHJcblxyXG4gICAgICAgICAgICBmb3IgKCBsZXQgbG9vcCA9IDA7IGxvb3AgPCB0aGlzLmNhdGVnb3JpZXMubGVuZ3RoOyBsb29wKysgKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFjY29yZGlvbkNhdC5wdXNoKHsgdmFsdWU6ICAgYCR7dGhpcy5jYXRlZ29yaWVzW2xvb3BdLl9pZH1gLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiBgJHt0aGlzLmNhdGVnb3JpZXNbbG9vcF0uY2F0ZWdvcnlOYW1lfWAsXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuYWNjb3JkaW9uSXRlbXMgPSBbXHJcbiAgICAgICAgICAgICAgICAgICAgeyB0aXRsZTogXCJDYXRlZ29yeVwiLCBmb290ZXI6IFwiMTBcIiwgaGVhZGVyVGV4dDogXCJDYXRlZ29yeVwiLCBmb290ZXJUZXh0OiBcIjRcIiwgaXRlbXM6IHRoaXMuYWNjb3JkaW9uQ2F0IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgeyB0aXRsZTogXCJTb3J0XCIsIGZvb3RlcjogXCIyMFwiLCBoZWFkZXJUZXh0OiBcIlNvcnRcIiwgZm9vdGVyVGV4dDogXCI1XCIsIGl0ZW1zOiBbeyB2YWx1ZTogXCJOQVwiLCBkaXNwbGF5OiBcIk5ldyBBcnJpdmFsXCIgfSwgXHJcbiAgICAgICAgICAgICAgICAgICAgeyB2YWx1ZTogXCJQVVwiLCBkaXNwbGF5OiBcIlByaWNlIFVwXCIgfSxcclxuICAgICAgICAgICAgICAgICAgICB7IHZhbHVlOiBcIlBEXCIsIGRpc3BsYXk6IFwiUHJpY2UgRG93blwiIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgeyB2YWx1ZTogXCJQXCIsIGRpc3BsYXk6IFwiUG9wdWxhcml0eVwiIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgeyB2YWx1ZTogXCJCUlwiLCBkaXNwbGF5OiBcIkJlc3QgUmF0aW5nXCIgfV0gfSxcclxuICAgICAgICAgICAgICAgICAgICB7IHRpdGxlOiBcIkZpbHRlclwiLCBmb290ZXI6IFwiMzBcIiwgaGVhZGVyVGV4dDogXCJGaWx0ZXJcIiwgZm9vdGVyVGV4dDogXCI2XCIsIGl0ZW1zOiBbIHsgdmFsdWU6IFwiQ29sb3JcIiwgZGlzcGxheTogXCJDb2xvclwiIH0sIFxyXG4gICAgICAgICAgICAgICAgICAgIHsgdmFsdWU6IFwiU2l6ZVwiLCBkaXNwbGF5OiBcIlNpemVcIiB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHsgdmFsdWU6IFwiUHJpY2VcIiwgZGlzcGxheTogXCJQcmljZVwiIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgeyB2YWx1ZTogXCJCcmFuZFwiLCBkaXNwbGF5OiBcIkJyYW5kXCIgfV0gfVxyXG4gICAgICAgICAgICAgICAgXTtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9jaGFuZ2VEZXRlY3Rpb25SZWYuZGV0ZWN0Q2hhbmdlcygpO1xyXG5cclxuXHJcbiAgICAgICAgICAgIHRoaXMuZ2V0U3BvbnNvclByb2R1Y3RzKCk7XHJcblxyXG4gICAgICAgICAgXHJcbiAgICAgICAgIFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIGVyciA9PiB7XHJcbiAgICAgICAgICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkoZXJyKSk7XHJcbiAgICAgICAgICAgXHJcbiAgICAgICAgICBcclxuICAgICAgICAgICAgIH1cclxuICAgICAgICApO1x0ICBcclxufVxyXG5cclxuZ2V0U3BvbnNvclByb2R1Y3RzKCApe1xyXG4gICAgICAgXHJcbiAgICBcclxuXHJcbiAgICB0aGlzLnNwb25zb3JQcm9kdWN0U2VydmljZS5nZXRhbGxTcG9uc29yUHJvZHVjdHMoKS5zdWJzY3JpYmUoXHJcbiAgICAgICAgZGF0YSA9PiB7IFxyXG5cclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJTcG9uc29yIFByb2R1Y3RzIGZyb20gREIgXCIgKyBKU09OLnN0cmluZ2lmeShkYXRhW1wiZGF0YVwiXSkpO1xyXG4gICAgICAgICAgICB0aGlzLnNwb25zb3Jwcm9kdWN0cyA9IGRhdGFbXCJkYXRhXCJdO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5nZXRUcmFuc2FjdGlvbnModGhpcy5jb29wZXJJZCk7XHJcbiAgICAgICAgIFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIGVyciA9PiB7XHJcbiAgICAgICAgICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkoZXJyKSk7XHJcbiAgICAgICAgICAgXHJcbiAgICAgICAgICBcclxuICAgICAgICAgICAgIH1cclxuICAgICAgICApO1x0ICBcclxufVxyXG5cclxuXHJcblxyXG5nZXRWaWV3ZWRQcm9kdWN0cyh1c2VySWQ6IFN0cmluZyApe1xyXG4gICAgICAgXHJcbiAgICBcclxuXHJcbiAgICB0aGlzLnByb2R1Y3RWaWV3U2VydmljZS5nZXRhbGxWaWV3ZWRQcm9kdWN0cyh1c2VySWQpLnN1YnNjcmliZShcclxuICAgICAgICBkYXRhID0+IHsgXHJcblxyXG4gICAgICAgICAvL2NvbnNvbGUubG9nKFwiVmlld2VkIFByb2R1Y3RzIGZyb20gREIgXCIgKyBKU09OLnN0cmluZ2lmeShkYXRhW1wiZGF0YVwiXSkpO1xyXG4gICAgICAgICAgICB0aGlzLnZpZXdwcm9kdWN0cyA9IGRhdGFbXCJkYXRhXCJdO1xyXG5cclxuICAgICAgICAgICAgLy90aGlzLmdldFRyYW5zYWN0aW9ucyh0aGlzLmNvb3BlcklkKTtcclxuICAgICAgICAgXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgZXJyID0+IHtcclxuICAgICAgICAgICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShlcnIpKTtcclxuICAgICAgICAgICBcclxuICAgICAgICAgIFxyXG4gICAgICAgICAgICAgfVxyXG4gICAgICAgICk7XHQgIFxyXG59XHJcblxyXG5cclxuZ2V0VHJhbnNhY3Rpb25zKGNvb3BlcklkOiBTdHJpbmcgKXtcclxuICAgICAgIFxyXG4gICAgXHJcblxyXG4gICAgdGhpcy50cmFuc2FjdGlvblNlcnZpY2UuZ2V0QWxsVHJhbnNhY3Rpb25zKGNvb3BlcklkKS5zdWJzY3JpYmUoXHJcbiAgICAgICAgZGF0YSA9PiB7IFxyXG5cclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJUcmFuc2FjdGlvbiBmcm9tIERCIFwiICsgSlNPTi5zdHJpbmdpZnkoZGF0YVtcImRhdGFcIl0pKTtcclxuICAgICAgICAgICAgdGhpcy50cmFuc2FjdGlvbnMgPSBkYXRhW1wiZGF0YVwiXTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuZ2V0Vmlld2VkUHJvZHVjdHModGhpcy51c2VySWQpO1xyXG4gICAgICAgICBcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBlcnIgPT4ge1xyXG4gICAgICAgICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KGVycikpO1xyXG4gICAgICAgICAgIFxyXG4gICAgICAgICAgXHJcbiAgICAgICAgICAgICB9XHJcbiAgICAgICAgKTtcdCAgXHJcbn1cclxuXHJcblxyXG5cclxuc2VhcmNoUHJvZHVjdHMoc2VhcmNoVmFsdWU6IFN0cmluZywgc2tpcFZhbHVlOiBudW1iZXIsIGxpbWl0VmFsdWU6IG51bWJlciApe1xyXG4gICAgICAgXHJcbiAgICBcclxuXHJcbiAgICB0aGlzLnByb2R1Y3RTZXJ2aWNlLnNlYXJjaFByb2R1Y3RzKHNlYXJjaFZhbHVlLHNraXBWYWx1ZSxsaW1pdFZhbHVlKS5zdWJzY3JpYmUoXHJcbiAgICAgICAgZGF0YSA9PiB7IFxyXG5cclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJTZWFyY2ggZnJvbSBEQiBcIiArIEpTT04uc3RyaW5naWZ5KGRhdGFbXCJkYXRhXCJdKSk7XHJcbiAgICAgICAgICAgIHRoaXMuc2VhcmNoZWRQcm9kdWN0cyA9IGRhdGFbXCJkYXRhXCJdO1xyXG5cclxuICAgICAgICAgICB0aGlzLl9jaGFuZ2VEZXRlY3Rpb25SZWYuZGV0ZWN0Q2hhbmdlcygpO1xyXG4gICAgICAgICBcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBlcnIgPT4ge1xyXG4gICAgICAgICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KGVycikpO1xyXG4gICAgICAgICAgIFxyXG4gICAgICAgICAgXHJcbiAgICAgICAgICAgICB9XHJcbiAgICAgICAgKTtcdCAgXHJcbn1cclxuXHJcbiAgbG9nT3V0KCl7XHJcbiAgICB0aGlzLmF1dGhTZXJ2aWNlLmxvZ291dCgpO1xyXG4gIH1cclxuXHJcblxyXG4gIHB1YmxpYyBvblN1Ym1pdChhcmdzKSB7XHJcbiAgICBsZXQgc2VhcmNoQmFyID0gPFNlYXJjaEJhcj5hcmdzLm9iamVjdDtcclxuICAgIGxldCBzZWFyY2hWYWx1ZSA9IHNlYXJjaEJhci50ZXh0LnRvTG93ZXJDYXNlKCk7XHJcblxyXG4gICAgdGhpcy5zZWFyY2hQcm9kdWN0cyhzZWFyY2hWYWx1ZSwwLDUpO1xyXG4gICAgXHJcbn1cclxuXHJcbnB1YmxpYyBvbkNsZWFyKGFyZ3MpIHtcclxuICAgIGxldCBzZWFyY2hCYXIgPSA8U2VhcmNoQmFyPmFyZ3Mub2JqZWN0O1xyXG4gICAgc2VhcmNoQmFyLnRleHQgPSBcIlwiO1xyXG4gICAgc2VhcmNoQmFyLmhpbnQgPSBcIlNlYXJjaCBmb3IgcHJvZHVjdHNcIjtcclxuXHJcbiAgICB0aGlzLnNlYXJjaGVkUHJvZHVjdHMgPSBbXTtcclxuICAgIHRoaXMuX2NoYW5nZURldGVjdGlvblJlZi5kZXRlY3RDaGFuZ2VzKCk7XHJcbn1cclxuXHJcbnB1YmxpYyBzQkxvYWRlZChhcmdzKXtcclxuICAgIHZhciBzZWFyY2hiYXI6U2VhcmNoQmFyID0gPFNlYXJjaEJhcj5hcmdzLm9iamVjdDtcclxuICAgIGlmKGlzQW5kcm9pZCl7XHJcbiAgICAgICAgXHJcbiAgICAgICAgc2VhcmNoYmFyLmFuZHJvaWQuY2xlYXJGb2N1cygpO1xyXG4gICAgfVxyXG59XHJcblxyXG5nZXRBZHZlcnRzKCApe1xyXG4gICAgICAgXHJcbiAgICBcclxuXHJcbiAgICB0aGlzLmFkdmVydFNlcnZpY2UuZ2V0YWxsQWR2ZXJ0cygpLnN1YnNjcmliZShcclxuICAgICAgICBkYXRhID0+IHsgXHJcblxyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIkFkdmVydHMgZnJvbSBEQiBcIiArIEpTT04uc3RyaW5naWZ5KGRhdGFbXCJkYXRhXCJdKSk7XHJcbiAgICAgICAgICAgIHRoaXMuYWR2ZXJ0cyA9IGRhdGFbXCJkYXRhXCJdO1xyXG4gICAgICAgICAgICB0aGlzLmltYWdlcyA9IFtdO1xyXG5cclxuICAgICAgICAgICBcclxuICAgICAgICAgICAgZm9yICggbGV0IGxvb3AgPSAwOyBsb29wIDwgdGhpcy5hZHZlcnRzLmxlbmd0aDsgbG9vcCsrICkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pbWFnZXMucHVzaCh7IHRpdGxlOiAgIGAke3RoaXMuYWR2ZXJ0c1tsb29wXS5vd25lck5hbWV9YCxcclxuICAgICAgICAgICAgICAgIHVybDogYCR7dGhpcy5hZHNVUkwgKyAgdGhpcy5hZHZlcnRzW2xvb3BdLmFkdmVydEltYWdlUGF0aH1gLFxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQWR2ZXJ0IEltYWdlcyBcIiArIEpTT04uc3RyaW5naWZ5KHRoaXMuaW1hZ2VzKSk7XHJcbiAgICAgICAgICAgICAgIC8vIHRoaXMuYnVpbGRDYXJvdXNlbCgpO1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuX2NoYW5nZURldGVjdGlvblJlZi5kZXRlY3RDaGFuZ2VzKCk7XHJcbiAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiSW1hZ2UgTGlzdCBcIiArIEpTT04uc3RyaW5naWZ5KHRoaXMuaW1hZ2VzKSk7XHJcbiAgICAgICAgIFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIGVyciA9PiB7XHJcbiAgICAgICAgICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkoZXJyKSk7XHJcbiAgICAgICAgICAgXHJcbiAgICAgICAgICBcclxuICAgICAgICAgICAgIH1cclxuICAgICAgICApO1x0ICBcclxufVxyXG5cclxuXHJcbmFkZENvbXBsYWludChpbWFnZTogYW55ICl7XHJcbiAgICAgICBcclxuICAgIFxyXG5cclxuICAgIHRoaXMuY29tcGxhaW50U2VydmljZS5hZGRDb21wbGFpbnQoaW1hZ2UpLnN1YnNjcmliZShcclxuICAgICAgICBkYXRhID0+IHsgXHJcblxyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIkFkdmVydHMgZnJvbSBEQiBcIiArIEpTT04uc3RyaW5naWZ5KGRhdGFbXCJkYXRhXCJdKSk7XHJcbiAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiSW1hZ2UgTGlzdCBcIiArIEpTT04uc3RyaW5naWZ5KHRoaXMuaW1hZ2VzKSk7XHJcbiAgICAgICAgIFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIGVyciA9PiB7XHJcbiAgICAgICAgICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkoZXJyKSk7XHJcbiAgICAgICAgICAgXHJcbiAgICAgICAgICBcclxuICAgICAgICAgICAgIH1cclxuICAgICAgICApO1x0ICBcclxufVxyXG5cclxuXHJcblxyXG5cclxub25TZWxlY3RNdWx0aXBsZVRhcCgpIHtcclxuICAgIGxldCBjb250ZXh0ID0gaW1hZ2VwaWNrZXIuY3JlYXRlKHtcclxuICAgICAgICBtb2RlOiBcIm11bHRpcGxlXCJcclxuICAgIH0pO1xyXG4gICAgdGhpcy5zdGFydFNlbGVjdGlvbihjb250ZXh0KTtcclxufVxyXG5cclxub25TZWxlY3RTaW5nbGVUYXAoKSB7XHJcbiAgICBsZXQgY29udGV4dCA9IGltYWdlcGlja2VyLmNyZWF0ZSh7XHJcbiAgICAgICAgbW9kZTogXCJzaW5nbGVcIlxyXG4gICAgfSk7XHJcbiAgICB0aGlzLnN0YXJ0U2VsZWN0aW9uKGNvbnRleHQpO1xyXG59XHJcblxyXG5zdGFydFNlbGVjdGlvbihjb250ZXh0KSB7XHJcbiAgICBsZXQgX3RoYXQgPSB0aGlzO1xyXG5cclxuICAgIGNvbnRleHRcclxuICAgIC5hdXRob3JpemUoKVxyXG4gICAgLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgIF90aGF0Lml0ZW1zID0gW107XHJcbiAgICAgICAgcmV0dXJuIGNvbnRleHQucHJlc2VudCgpO1xyXG4gICAgfSlcclxuICAgIC50aGVuKChzZWxlY3Rpb24pID0+IHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIlNlbGVjdGlvbiBkb25lOlwiKTtcclxuICAgICAgICBzZWxlY3Rpb24uZm9yRWFjaChmdW5jdGlvbiAoc2VsZWN0ZWQpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCItLS0tLS0tLS0tLS0tLS0tXCIpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcInVyaTogXCIgKyBzZWxlY3RlZC51cmkpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImZpbGVVcmk6IFwiICsgc2VsZWN0ZWQuZmlsZVVyaSk7XHJcbiAgICAgICAgICAgIF90aGF0LmZpbGUgPSBzZWxlY3RlZC5maWxlVXJpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIF90aGF0Lmlzc3Vlc0ltYWdlcyA9IHNlbGVjdGlvbjtcclxuICAgICAgXHJcblxyXG4gICAgICBcclxuXHJcbiAgICAgICAgX3RoYXQuX2NoYW5nZURldGVjdGlvblJlZi5kZXRlY3RDaGFuZ2VzKCk7XHJcbiAgICB9KS5jYXRjaChmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGUpO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbnVwbG9hZEZpbGUoKSB7XHJcbiAgICAvLyBjb25zdCBmaWxlcGF0aDogc3RyaW5nID0gdGhpcy5pc3N1ZXNJbWFnZXNbMF0uZmlsZVVyaSAvL1wiL2RhdGEvdXNlci8wL29yZy5uYXRpdmVzY3JpcHQuR3JvY2VyaWVzL2NhY2hlL2ltZ19ieV9zal8xNDkzMTEzMjE1MTEyLmpwZ1wiO1xyXG4gICAgLy8gY29uc3QgZmlsZW5hbWU6IHN0cmluZyA9IFwiaW1nX2J5X3NqXzE0OTMxMTMyMTUxMTIuanBnXCI7XHJcblxyXG4gICAgIFxyXG4gICAgLy8gbGV0IGZpbGVFeGlzdCA9IGZzLkZpbGUuZXhpc3RzKGZpbGVwYXRoKTtcclxuICAgIC8vIC8vIGNvbmZpcm0gZmlsZSBleGlzdHMuXHJcbiAgICAvLyBjb25zb2xlLmxvZyhcImZpbGUgZXhpc3Q/IFwiLCBmaWxlRXhpc3QpO1xyXG4gICAgLy8gbGV0IHJlcXVlc3QgPSB7XHJcbiAgICAvLyAgICAgdXJsOiBcImh0dHA6Ly8xOTIuMTY4LjguMTAxOjMwMDAvdjEvY29tcGxhaW50c1wiLFxyXG4gICAgLy8gICAgIG1ldGhvZDogXCJwb3N0XCIsXHJcbiAgICAvLyAgICAgaGVhZGVyczoge1xyXG4gICAgLy8gICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL29jdGV0LXN0cmVhbVwiLFxyXG4gICAgLy8gICAgICAgICBcIkZpbGUtbmFtZVwiOiBmaWxlbmFtZVxyXG4gICAgLy8gICAgIH0sXHJcbiAgICAvLyAgICAgZGVzY3JpcHRpb246IFwieyAndXBsb2FkaW5nJzogJ1wiICsgZmlsZW5hbWUgKyBcIicgfVwiXHJcbiAgICAvLyB9XHJcblxyXG4gICAgLy8gbGV0IHRhc2sgPSB0aGlzLnNlc3Npb24udXBsb2FkRmlsZShmaWxlcGF0aCwgcmVxdWVzdCk7XHJcbiAgICAvLyB0YXNrLm9uKFwicHJvZ3Jlc3NcIiwgdGhpcy5sb2dFdmVudCk7XHJcbiAgICAvLyB0YXNrLm9uKFwiZXJyb3JcIiwgdGhpcy5sb2dFdmVudCk7XHJcbiAgICAvLyB0YXNrLm9uKFwiY29tcGxldGVcIiwgdGhpcy5sb2dFdmVudCk7XHJcblxyXG59XHJcblxyXG5sb2dFdmVudChlKSB7XHJcbiAgICBjb25zb2xlLmxvZyhlKTtcclxufVxyXG5cclxuc2VuZElzc3Vlcygpe1xyXG4gICAgLy90aGlzLmFkZENvbXBsYWludCh0aGlzLmlzc3Vlc0ltYWdlc1swXSk7XHJcblxyXG4gICBcclxufVxyXG5cclxuXHJcbnVwbG9hZChhcmdzKSB7XHJcbiAgICB0aGlzLnN0YXJ0X3VwbG9hZChmYWxzZSwgZmFsc2UpO1xyXG59XHJcblxyXG51cGxvYWRfZXJyb3IoYXJncykge1xyXG4gICAgdGhpcy5zdGFydF91cGxvYWQodHJ1ZSwgZmFsc2UpO1xyXG59XHJcblxyXG51cGxvYWRfbXVsdGkoYXJncykge1xyXG4gICAgdGhpcy5zdGFydF91cGxvYWQoZmFsc2UsIHRydWUpO1xyXG59XHJcblxyXG5zdGFydF91cGxvYWQoc2hvdWxkX2ZhaWwsIGlzTXVsdGkpIHtcclxuICAgIGNvbnNvbGUubG9nKChzaG91bGRfZmFpbCA/IFwiVGVzdGluZyBlcnJvciBkdXJpbmcgdXBsb2FkIG9mIFwiIDogXCJVcGxvYWRpbmcgZmlsZTogXCIpICsgdGhpcy5maWxlICsgKGlzTXVsdGkgPyBcIiB1c2luZyBtdWx0aXBhcnQuXCIgOiBcIlwiKSk7XHJcblxyXG4gICAgbGV0IF90aGF0MiA9IHRoaXM7XHJcbiAgICBjb25zdCBuYW1lID0gdGhpcy5maWxlLnN1YnN0cih0aGlzLmZpbGUubGFzdEluZGV4T2YoXCIvXCIpICsgMSk7XHJcbiAgICBjb25zdCBkZXNjcmlwdGlvbiA9IGAke25hbWV9ICgkeysrdGhpcy5jb3VudGVyfSlgO1xyXG4gICAgY29uc3QgcmVxdWVzdCA9IHtcclxuICAgICAgICB1cmw6IHRoaXMudXJsLFxyXG4gICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXHJcbiAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL29jdGV0LXN0cmVhbVwiLFxyXG4gICAgICAgICAgICBcIkZpbGUtTmFtZVwiOiBuYW1lXHJcbiAgICAgICAgfSxcclxuICAgICAgICBkZXNjcmlwdGlvbjogZGVzY3JpcHRpb24sXHJcbiAgICAgICAgYW5kcm9pZEF1dG9EZWxldGVBZnRlclVwbG9hZDogZmFsc2VcclxuICAgIH07XHJcblxyXG4gICAgaWYgKHNob3VsZF9mYWlsKSB7XHJcbiAgICAgICAgcmVxdWVzdC5oZWFkZXJzW1wiU2hvdWxkLUZhaWxcIl0gPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCB0YXNrOiBiZ0h0dHAuVGFzaztcclxuICAgIGxldCBsYXN0RXZlbnQgPSBcIlwiO1xyXG4gICAgaWYgKGlzTXVsdGkpIHtcclxuICAgICAgICB2YXIgcGFyYW1zID0gW1xyXG4gICAgICAgICAgICB7IGtleTogXCJtZXNzYWdlXCIsIG5hbWU6IFwibWVzc2FnZVwiLCB2YWx1ZTogdGhpcy5jb21wbGFpbnRNZXNzYWdlIH0sXHJcbiAgICAgICAgICAgIHtrZXk6XCJpbWFnZVwiLCBuYW1lOiBcImltYWdlXCIsIGZpbGVuYW1lOiB0aGlzLmZpbGUsIG1pbWVUeXBlOiAnaW1hZ2UvanBlZycgfSxcclxuICAgICAgICAgICAgeyBrZXk6IFwibmFtZVwiLCBuYW1lOiBcIm5hbWVcIiwgdmFsdWU6IHRoaXMuY29tcGxhaW50TmFtZSB9LFxyXG4gICAgICAgICAgICB7IGtleTogXCJlbWFpbFwiLCBuYW1lOiBcImVtYWlsXCIsIHZhbHVlOiB0aGlzLmNvbXBsYWludEVtYWlsIH0sXHJcbiAgICAgICAgICAgIHsga2V5OiBcInZlbmRvclwiLCBuYW1lOiBcInZlbmRvclwiLCB2YWx1ZTogdGhpcy5jb21wbGFpbnRWZW5kb3IgfSxcclxuICAgICAgICAgICAgeyBrZXk6IFwiY29wcGVySWRcIiwgbmFtZTogXCJjb3BwZXJJZFwiLCB2YWx1ZTogdGhpcy5jb29wZXJJZCB9XHJcbiAgICAgICAgXTtcclxuICAgICAgICB0YXNrID0gdGhpcy5zZXNzaW9uLm11bHRpcGFydFVwbG9hZChwYXJhbXMsIHJlcXVlc3QpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICB0YXNrID0gdGhpcy5zZXNzaW9uLnVwbG9hZEZpbGUodGhpcy5maWxlLCByZXF1ZXN0KTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBvbkV2ZW50KGUpIHtcclxuICAgICAgICBpZiAobGFzdEV2ZW50ICE9PSBlLmV2ZW50TmFtZSkge1xyXG4gICAgICAgICAgICAvLyBzdXBwcmVzcyBhbGwgcmVwZWF0aW5nIHByb2dyZXNzIGV2ZW50cyBhbmQgb25seSBzaG93IHRoZSBmaXJzdCBvbmVcclxuICAgICAgICAgICAgbGFzdEV2ZW50ID0gZS5ldmVudE5hbWU7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5ldmVudHMucHVzaCh7XHJcbiAgICAgICAgICAgIGV2ZW50VGl0bGU6IGUuZXZlbnROYW1lICsgXCIgXCIgKyBlLm9iamVjdC5kZXNjcmlwdGlvbixcclxuICAgICAgICAgICAgZXZlbnREYXRhOiBKU09OLnN0cmluZ2lmeSh7XHJcbiAgICAgICAgICAgICAgICBlcnJvcjogZS5lcnJvciA/IGUuZXJyb3IudG9TdHJpbmcoKSA6IGUuZXJyb3IsXHJcbiAgICAgICAgICAgICAgICBjdXJyZW50Qnl0ZXM6IGUuY3VycmVudEJ5dGVzLFxyXG4gICAgICAgICAgICAgICAgdG90YWxCeXRlczogZS50b3RhbEJ5dGVzLFxyXG4gICAgICAgICAgICAgICAgYm9keTogZS5kYXRhXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgdGFzay5vbihcInByb2dyZXNzXCIsIG9uRXZlbnQuYmluZCh0aGlzKSk7XHJcbiAgICB0YXNrLm9uKFwiZXJyb3JcIiwgb25FdmVudC5iaW5kKHRoaXMpKTtcclxuICAgIHRhc2sub24oXCJyZXNwb25kZWRcIiwgb25FdmVudC5iaW5kKHRoaXMpKTtcclxuICAgIC8vdGFzay5vbihcImNvbXBsZXRlXCIsIG9uRXZlbnQuYmluZCh0aGlzKSk7XHJcbiAgICB0YXNrLm9uKFwiY29tcGxldGVcIiwgdXBsb2FkQ29tcGxldGUpO1xyXG5cclxuXHJcbiAgICBmdW5jdGlvbiB1cGxvYWRDb21wbGV0ZSgpIHtcclxuICAgICAgICBjb25zb2xlLmxvZygnVXBsb2FkIGNvbXBsZXRlJyk7XHJcbiAgICAgICAgX3RoYXQyLmNvbXBsYWludEVtYWlsID0gXCJcIjtcclxuICAgICAgICBfdGhhdDIuY29tcGxhaW50TWVzc2FnZSA9IFwiXCI7XHJcbiAgICAgICAgX3RoYXQyLmNvbXBsYWludE5hbWUgPSBcIlwiO1xyXG4gICAgICAgIF90aGF0Mi5jb21wbGFpbnRWZW5kb3IgPSBcIlwiO1xyXG4gICAgICAgIF90aGF0Mi5maWxlID0gXCJcIjtcclxuICAgICAgICBfdGhhdDIuaXNzdWVzSW1hZ2VzID0gW107XHJcblxyXG4gICAgICAgIFxyXG4gICAgICAgICAgICAgICAgVE5TRmFuY3lBbGVydC5zaG93U3VjY2VzcyhcIlN1Y2Nlc3MhXCIsIFwiIENvbXBsYWludCBzZW50LCBzdXBwb3J0IHRlYW0gd2lsbCByZXNwb25kIHNob3J0bHlcIiwgXCJPa1wiKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oICgpID0+IHsgLyogdXNlciBwcmVzc2VkIHRoZSBidXR0b24gKi9cclxuICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgX3RoYXQyLl9jaGFuZ2VEZXRlY3Rpb25SZWYuZGV0ZWN0Q2hhbmdlcygpO1xyXG4gICAgfVxyXG4gICAgbGFzdEV2ZW50ID0gXCJcIjtcclxuICAgIHRoaXMudGFza3MucHVzaCh0YXNrKTtcclxufVxyXG5cclxub25UYXAoKSB7XHJcbiAgICBhbGVydChcImNsaWNrZWQgYW4gaXRlbVwiKTtcclxufVxyXG5cclxub3Blbk1vZGFsKCkge1xyXG4gICAgdGhpcy5tb2RhbC5zaG93KCk7XHJcbn1cclxuXHJcbmNsb3NlTW9kYWwoKSB7XHJcbiAgICB0aGlzLm1vZGFsLmhpZGUoKTtcclxufVxyXG5cclxub25PcGVuTW9kYWwoKSB7XHJcbiAgICBjb25zb2xlLmxvZyhcIm9wZW5lZCBtb2RhbFwiKTtcclxufVxyXG5cclxub25DbG9zZU1vZGFsKCkge1xyXG4gICAgY29uc29sZS5sb2coXCJjbG9zZWQgbW9kYWxcIik7XHJcbn1cclxuXHJcbnB1YmxpYyBvbmFjY291bnRjaGFuZ2UoYXJnczogU2VsZWN0ZWRJbmRleENoYW5nZWRFdmVudERhdGEsIGJhbDogQWNjb3VudEJhbGFuY2UpIHtcclxuICAgIC8vIGNvbnNvbGUubG9nKGBEcm9wIERvd24gc2VsZWN0ZWQgaW5kZXggY2hhbmdlZCAgJHthcmdzLm9sZEluZGV4fSB0byAke2FyZ3MubmV3SW5kZXh9LiBOZXcgdmFsdWUgaXMgXCIke3RoaXMuc2Vzc2lvbml0ZW1zLmdldFZhbHVlKFxyXG4gICAgLy8gICAgIGFyZ3MubmV3SW5kZXgpfVwiYCk7XHJcblxyXG4gICAgY29uc29sZS5sb2coXCJTZWxlY3RlZCBJRCBcIiArIGFyZ3MubmV3SW5kZXgpO1xyXG4gICAgbGV0IHNlbGVjdGVkQWNjb3VudCA9IGJhbC5vdGhlckFjY291bnRzRHJvcERvd24uZ2V0VmFsdWUoYXJncy5uZXdJbmRleCk7XHJcbiAgXHJcbiAgZm9yKGxldCBtYWluQmFsIG9mIHRoaXMubWFpbkFjY291bnRCYWxhbmNlcylcclxuICB7XHJcbiAgICAgIGlmKG1haW5CYWwuY29vcGVyYXRpdmVOYW1lID09PSBiYWwuY29vcGVyYXRpdmVOYW1lKVxyXG4gICAgICB7XHJcbiAgICAgICAgbGV0IGRlZmF1bHRBY2NvdW50ID0gbWFpbkJhbC5vdGhlckFjY291bnRzLmZpbHRlcihuID0+IG4uYWNjb3VudFR5cGUgPT09IHNlbGVjdGVkQWNjb3VudCk7XHJcblxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiRGVmYXVsdCBBY2NvdW50IFwiICsgSlNPTi5zdHJpbmdpZnkoZGVmYXVsdEFjY291bnQpKTtcclxuXHJcbiAgICAgICAgdGhpcy5tYWluQWNjb3VudEJhbGFuY2UuYWNjb3VudEJhbGFuY2UgPSArIGRlZmF1bHRBY2NvdW50WzBdLmFjY291bnRCYWxhbmNlO1xyXG4gICAgICAgIHRoaXMubWFpbkFjY291bnRCYWxhbmNlLmJvb2tCYWxhbmNlID0gKyBkZWZhdWx0QWNjb3VudFswXS5ib29rQmFsYW5jZTtcclxuICAgICAgICB0aGlzLm1haW5BY2NvdW50QmFsYW5jZS5jb29wZXJhdGl2ZU5hbWUgPSBkZWZhdWx0QWNjb3VudFswXS5jb29wZXJhdGl2ZS5maXJzdF9uYW1lO1xyXG4gICAgICAgIFxyXG4gICAgICB9XHJcbiAgfVxyXG5cclxuICAgXHJcbiAgICB0aGlzLl9jaGFuZ2VEZXRlY3Rpb25SZWYuZGV0ZWN0Q2hhbmdlcygpO1xyXG59XHJcblxyXG5cclxuXHJcblxyXG5zd2lwZUxheW91dExvYWRlZChldmVudCkge1xyXG4gICAgdGhpcy5fc3dpcGVMYXlvdXRzLnB1c2goPFN3aXBlTGF5b3V0PmV2ZW50Lm9iamVjdCk7XHJcbn1cclxuXHJcblxyXG5cclxuc3dpcGVMZWZ0Q2FsbGJhY2soc3dpcGVMZWZ0RXZlbnQ6IFN3aXBlTGVmdEV2ZW50RGF0YSkge1xyXG4gICAgY29uc29sZS5sb2coJ3N3aXBlTGVmdCcpO1xyXG4gICAgdGhpcy5uZXh0KCk7XHJcbn1cclxuXHJcbnByaXZhdGUgbmV4dCgpIHtcclxuICAgIC8vdGhpcy5fc3dpcGVMYXlvdXRzLnBvcCgpO1xyXG4gICAgLy90aGlzLmN1cnJlbnRTd2lwZUxheW91dCA9IHRoaXMuX3N3aXBlTGF5b3V0c1t0aGlzLl9zd2lwZUxheW91dHMubGVuZ3RoIC0gMV07XHJcbn1cclxuXHJcbnN3aXBlUmlnaHRDYWxsYmFjayhzd2lwZVJpZ2h0RXZlbnQ6IFN3aXBlUmlnaHRFdmVudERhdGEpIHtcclxuICAgIGNvbnNvbGUubG9nKCdzd2lwZVJpZ2h0Jyk7XHJcbiAgICB0aGlzLm5leHQoKTtcclxufVxyXG5zd2lwZVVwQ2FsbGJhY2soc3dpcGVVcEV2ZW50OiBTd2lwZVVwRXZlbnREYXRhKSB7XHJcbiAgICBjb25zb2xlLmxvZygnc3dpcGVVcCcpO1xyXG4gICAgdGhpcy5uZXh0KCk7XHJcbn1cclxuc3dpcGVEb3duQ2FsbGJhY2soc3dpcGVEb3duRXZlbnQ6IFN3aXBlRG93bkV2ZW50RGF0YSkge1xyXG4gICAgY29uc29sZS5sb2coJ3N3aXBlRG93bicpO1xyXG4gICAgdGhpcy5uZXh0KCk7XHJcbn1cclxuXHJcbmdvQXdheSgpIHtcclxuICAgIGxldCB0aGF0ID0gdGhpcztcclxuICAgIHRoaXMuY3VycmVudFN3aXBlTGF5b3V0LmFuaW1hdGVTd2lwZVJpZ2h0KCkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgdGhhdC5uZXh0KCk7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ3N3aXBlTGVmdCBkb25lJyk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuXHJcbmNvbWVIZXJlKCkge1xyXG4gICAgbGV0IHRoYXQgPSB0aGlzO1xyXG4gICAgdGhpcy5jdXJyZW50U3dpcGVMYXlvdXQuYW5pbWF0ZVN3aXBlTGVmdCgpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgIHRoYXQubmV4dCgpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdzd2lwZVJpZ2h0IGRvbmUnKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5zdXBlcigpIHtcclxuICAgIGxldCB0aGF0ID0gdGhpcztcclxuICAgIHRoaXMuY3VycmVudFN3aXBlTGF5b3V0LmFuaW1hdGVTd2lwZVVwKCkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgdGhhdC5uZXh0KCk7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJzd2lwZVVwIGRvbmVcIik7XHJcbiAgICB9KTtcclxufVxyXG5cclxuXHJcbmdldFByb2R1Y3RCeUNhdGVnb3J5SWQoY2F0ZWdvcnlJZDogU3RyaW5nKSB7XHJcbiAgICBjb25zb2xlLmxvZyhcIkNhdGVnb3J5IElkIFwiICsgY2F0ZWdvcnlJZCk7XHJcbiAgLy8gIHRoaXMucHJvZHVjdHMgPSBbXTtcclxuXHJcbiAgICBcclxuICAgIGxvYWRlci5zaG93KG9wdGlvbnMpO1xyXG5cclxuICAgIHRoaXMucHJvZHVjdFNlcnZpY2UuZ2V0YWxscHJvZHVjdEJ5Q2F0ZWdvcnkoY2F0ZWdvcnlJZCkuc3Vic2NyaWJlKFxyXG4gICAgICAgIGRhdGEgPT4ge1xyXG4gICAgICAgICAgIFxyXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiQ2F0ZWdvcnkgUHJvZHVjdHMgIFwiICsgSlNPTi5zdHJpbmdpZnkoZGF0YVtcImRhdGFcIl0pKTtcclxuICAgICAgICAgICAgdGhpcy5wcm9kdWN0cyA9IGRhdGFbXCJkYXRhXCJdO1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBcclxuXHJcbiAgICAgICAgICAgIGZvciAobGV0IGl0ZW0gb2YgdGhpcy5wcm9kdWN0cylcclxuICAgICAgICAgICAge1xyXG5cclxuICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJDYXRlZ29yeSBQcm9kdWN0cyBsb29wICBcIiArIGl0ZW0ucHJvZHVjdC5wcm9kdWN0SWQpO1xyXG4gICAgICAgICAgICAgICB0aGlzLnByb2R1Y3QgPSB7XCJfaWRcIjppdGVtLnByb2R1Y3QuX2lkLFwicHJvZHVjdElkXCI6aXRlbS5wcm9kdWN0LnByb2R1Y3RJZCxcInZlbmRvcklkXCI6aXRlbS5wcm9kdWN0LnZlbmRvcklkLFxyXG4gICAgICAgICAgICAgICBcInByb2R1Y3ROYW1lXCI6aXRlbS5wcm9kdWN0LnByb2R1Y3ROYW1lLFwicHJvZHVjdEJyaWVmRGVzY1wiOml0ZW0ucHJvZHVjdC5wcm9kdWN0QnJpZWZEZXNjLFxyXG4gICAgICAgICAgICAgICBcInByb2R1Y3REZXRhaWxEZXNjXCI6aXRlbS5wcm9kdWN0LnByb2R1Y3REZXRhaWxEZXNjLFwicHJvZHVjdFNwZWNcIjppdGVtLnByb2R1Y3QucHJvZHVjdFNwZWMsXHJcbiAgICAgICAgICAgICAgIFwicHJvZHVjdEltYWdlXCI6aXRlbS5wcm9kdWN0LnByb2R1Y3RJbWFnZSxcInByb2R1Y3RCYWNrSW1hZ2VcIjppdGVtLnByb2R1Y3QucHJvZHVjdEJhY2tJbWFnZSxcclxuICAgICAgICAgICAgICAgXCJwcm9kdWN0TGVmdEltYWdlXCI6aXRlbS5wcm9kdWN0LnByb2R1Y3RMZWZ0SW1hZ2UsXCJwcm9kdWN0UmlnaHRJbWFnZVwiOml0ZW0ucHJvZHVjdC5wcm9kdWN0UmlnaHRJbWFnZSxcclxuICAgICAgICAgICAgICAgXCJicmFuZFwiOml0ZW0ucHJvZHVjdC5icmFuZCxcImxvY2F0aW9uXCI6aXRlbS5wcm9kdWN0LmxvY2F0aW9uLFwicXVhbnRpdHlcIjppdGVtLnByb2R1Y3QucXVhbnRpdHksXHJcbiAgICAgICAgICAgICAgIFwicHJpY2VcIjppdGVtLnByb2R1Y3QucHJpY2UsXCJzdGF0dXNcIjppdGVtLnByb2R1Y3Quc3RhdHVzLFwiZXhwaXJlc1wiOml0ZW0ucHJvZHVjdC5leHBpcmVzLFxyXG4gICAgICAgICAgICAgICBcImRhdGVDcmVhdGVkXCI6aXRlbS5wcm9kdWN0LmRhdGVDcmVhdGVkLFwiZGF0ZU1vZGlmaWVkXCI6aXRlbS5wcm9kdWN0LmRhdGVNb2RpZmllZCxcclxuICAgICAgICAgICAgICAgXCJsaWtlc1wiOml0ZW0ucHJvZHVjdC5saWtlcyxcInJhdGVzXCI6aXRlbS5wcm9kdWN0LnJhdGVzXHJcbiAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5ld1Byb2R1Y3RzLnB1c2goIHRoaXMucHJvZHVjdCk7XHJcblxyXG4gICAgICAgICAgICAgICAgXHJcbiBcclxuICAgIFxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgIGNvbnNvbGUubG9nKFwiQ2F0ZWdvcnkgUHJvZHVjdHMgT3V0c2lkZSAgXCIgKyBKU09OLnN0cmluZ2lmeSh0aGlzLm5ld1Byb2R1Y3RzKSk7XHJcbiAgICAgICAgICAgLy90aGlzLm5ld1Byb2R1Y3RzID0gdGhpcy5zZWFyY2hlZFByb2R1Y3RzO1xyXG4gICAgICAgICAgIC8vdGhpcy5zZWFyY2hlZFByb2R1Y3RzID0gdGhpcy5uZXdQcm9kdWN0cztcclxuICAgICAgICAgICB0aGlzLnN2Lm5hdGl2ZUVsZW1lbnQuc2Nyb2xsVG9WZXJ0aWNhbE9mZnNldCgwLCB0cnVlKTtcclxuICAgICAgICAgICB0aGlzLm1vZGFsLmhpZGUoKTtcclxuICAgICAgICAgICAvLyB0aGlzLl9jaGFuZ2VEZXRlY3Rpb25SZWYuZGV0ZWN0Q2hhbmdlcygpO1xyXG4gICAgICAgICAgICBsb2FkZXIuaGlkZSgpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZXJyID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgKTtcclxufVxyXG5cclxuY2F0ZWdvcnlGaWxUYXAoKVxyXG57XHJcbiAgICB0aGlzLmNhdGVnb3JpZXNGaWx0ZXJPbiA9ICF0aGlzLmNhdGVnb3JpZXNGaWx0ZXJPbjtcclxuICAgIHRoaXMudG9nbGVGaWx0ZXIoKTtcclxufVxyXG5cclxuc29ydEZpbFRhcCgpXHJcbntcclxuICAgIHRoaXMuc29ydEZpbHRlck9uID0gIXRoaXMuc29ydEZpbHRlck9uO1xyXG4gICAgdGhpcy50b2dsZUZpbHRlcigpO1xyXG59XHJcblxyXG5tYWluRmlsdGVyRmlsVGFwKClcclxue1xyXG4gICAgdGhpcy5tYWluRmlsdGVyT24gPSAhdGhpcy5tYWluRmlsdGVyT247XHJcbiAgICB0aGlzLnRvZ2xlRmlsdGVyKCk7XHJcbn1cclxuXHJcbiB0b2dsZUZpbHRlcigpe1xyXG4gICBpZih0aGlzLmNhdGVnb3JpZXNGaWx0ZXJPbilcclxuICAge1xyXG4gICAgIHRoaXMuc29ydEZpbHRlck9uID0gZmFsc2U7XHJcbiAgICAgdGhpcy5tYWluRmlsdGVyT24gPSBmYWxzZTtcclxuICAgfVxyXG5cclxuICAgaWYodGhpcy5zb3J0RmlsdGVyT24pXHJcbiAgIHtcclxuICAgICB0aGlzLmNhdGVnb3JpZXNGaWx0ZXJPbiA9IGZhbHNlO1xyXG4gICAgIHRoaXMubWFpbkZpbHRlck9uID0gZmFsc2U7XHJcbiAgIH1cclxuXHJcbiAgIGlmKHRoaXMubWFpbkZpbHRlck9uKVxyXG4gICB7XHJcbiAgICAgdGhpcy5jYXRlZ29yaWVzRmlsdGVyT24gPSBmYWxzZTtcclxuICAgICB0aGlzLnNvcnRGaWx0ZXJPbiA9IGZhbHNlO1xyXG4gICB9XHJcblxyXG5cclxuXHJcblxyXG5cclxuLy8gICB0aGlzLl9jaGFuZ2VEZXRlY3Rpb25SZWYuZGV0ZWN0Q2hhbmdlcygpO1xyXG4gfVxyXG5cclxuIHRvZ2dsZVNlYXJjaExpc3QoKXtcclxuICAgICB0aGlzLmlzU3F1YXJlTGlzdCA9ICF0aGlzLmlzU3F1YXJlTGlzdDtcclxuXHJcbiAgICAgaWYodGhpcy5pc1NxdWFyZUxpc3QpXHJcbiAgICAge1xyXG4gICAgICAgIHRoaXMubGlzdExhYmVsID0gXCInZmEtdGgnIHwgZm9udGljb25cIjtcclxuICAgICB9ZWxzZXtcclxuICAgICAgICB0aGlzLmxpc3RMYWJlbCA9IFwiJ2ZhLXRoLWxpc3QnIHwgZm9udGljb25cIjtcclxuICAgICB9XHJcbiAgICBcclxuICAgXHJcbiB9XHJcblxyXG4gbmF2aWdhdGVUb0J1eSgpe1xyXG4gICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFtcIi9idXlcIl0pO1xyXG4gfVxyXG4gICAgXHJcbn0iXX0=