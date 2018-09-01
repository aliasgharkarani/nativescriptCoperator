import { Component, OnInit,AfterViewInit,ChangeDetectorRef,Input,ChangeDetectionStrategy,NgZone,ViewChild,ElementRef,OnDestroy } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";
import { SnackBar } from "nativescript-snackbar";
import * as ApplicationSettings from "application-settings";
import { connectionType, getConnectionType } from "connectivity";
import { Animation } from "ui/animation";
import { View } from "ui/core/view";
import { prompt } from "ui/dialogs";
import { Page } from "ui/page";
import { TextField } from "ui/text-field";
import { TextView } from "ui/text-view";
import { isAndroid } from "platform";

import {AuthService} from "../../services/auth.service";

import {CooperCooperativeService} from "../../services/coopercooperative.service";
import {CategoryService} from "../../services/category.service";
import {SponsorProductService} from "../../services/sponsorproduct.service";
import {TransactionService} from "../../services/transaction.service";
import {ProductViewService} from "../../services/productview.service";
import {AdvertService} from "../../services/advert.service";
import {ProductService} from "../../services/product.service";
import {ComplaintService} from "../../services/complaints.service";

import { registerElement } from 'nativescript-angular';

import { CooperativeStaff, VerifyAuth, CooperativeStaffAccount, Advert,Category,Product,SponsorProduct,Transaction } from "../../models/index";
import { BottomBar, BottomBarItem, TITLE_STATE, SelectedIndexChangedEventData, Notification, } from 'nativescript-bottombar';
//import {TITLE_STATE} from 'nativescript-bottombar/index';
registerElement('BottomBar', () => BottomBar);


registerElement("Fab", () => require("nativescript-floatingactionbutton").Fab);
// registerElement("coopershop", () => require("../../components/shop/shop.component").ShopComponent);
//registerElement('BottomBar', () => BottomBar);
//registerElement("BottomBar", () => require("nativescript-bottombar").BottomBar);


import { CardView } from "nativescript-cardview";

import {
    SwipeLayout,
    ANIMATION_STATE,
    GESTURE_MODE,
    SwipeLeftEventData,
    SwipeRightEventData,
    SwipeUpEventData,
    SwipeDownEventData
} from 'nativescript-swipe-layout';
import { ANIMATION_PROPERTIES } from "tns-core-modules/ui/animation/keyframe-animation";


registerElement('SwipeLayout', () => SwipeLayout);



import { TNSFontIconService } from 'nativescript-ngx-fonticon';
// import { SelectedIndexChangedEventData } from "nativescript-drop-down";
import { TabView, TabViewItem } from "ui/tab-view";
import { ValueList } from "nativescript-drop-down";

let LS = require( "nativescript-localstorage" );

import { Config } from "../../shared/config";


import {LoadingIndicator} from "nativescript-loading-indicator";
import { BottomNavigation, BottomNavigationTab, OnTabSelectedEventData } from 'nativescript-bottom-navigation';

var loader = new LoadingIndicator();

import { AutoLogoutService } from '../../services/autologout.service';

import { GestureEventData } from "ui/gestures";

import { TouchGestureEventData } from "ui/gestures";

import * as elementRegistryModule from 'nativescript-angular/element-registry';
import * as LabelModule from "tns-core-modules/ui/label";
elementRegistryModule.registerElement("CardView", () => require("nativescript-cardview").CardView);


elementRegistryModule.registerElement("Carousel", () => require("nativescript-carousel").Carousel);
elementRegistryModule.registerElement("CarouselItem", () => require("nativescript-carousel").CarouselItem);

import { SearchBar } from "ui/search-bar";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { forkJoin } from "rxjs/observable/forkJoin";




import 'rxjs/add/observable/interval';



import { Image } from 'tns-core-modules/ui/image';
const CarouselItem = require('nativescript-carousel').CarouselItem;


import * as imagepicker from "nativescript-ssi-imagepicker";





import { ImageSource } from "image-source";

import * as bgHttp from "nativescript-background-http";



import { isIOS } from "platform";
import { ObservableArray } from "data/observable-array";

import { TNSFancyAlert, TNSFancyAlertButton } from "nativescript-fancyalert";

import { ModalComponent } from "../modal";

import { AndroidApplication, AndroidActivityBackPressedEventData } from "application";

import { ScrollView, ScrollEventData } from "ui/scroll-view";
import { Button } from "ui/button";


import { GridLayout, GridUnitType, ItemSpec } from "ui/layouts/grid-layout";
// import * as dialogs from "ui/dialogs";
// import { ModalDialogService,ModalDialogOptions } from "nativescript-angular/directives/dialogs";
// import { ModalComponent } from "../../app.modal";
var options = {
    message: 'Loading...',
    progress: 0.65,
    android: {
      indeterminate: true,
      cancelable: true,
      cancelListener: function(dialog) { console.log("Loading cancelled") },
      max: 100,
      progressNumberFormat: "%1d/%2d",
      progressPercentFormat: 0.53,
      progressStyle: 1,
      secondaryProgress: 1,
      color: "#4B9ED6", // color of indicator and labels
    },
    ios: {
      details: "Additional detail note!",
      margin: 10,
      dimBackground: true,
      color: "#4B9ED6", // color of indicator and labels
      // background box around indicator
      // hideBezel will override this if true
      backgroundColor: "yellow",
      userInteractionEnabled: false, // default true. Set false so that the touches will fall through it.
      hideBezel: true, // default false, can hide the surrounding bezel
    //   view: UIView, // Target view to show on top of (Defaults to entire window)
    //   mode: // see iOS specific options below
    }
  };


  class AccountBalance {
    constructor(
        public cooperativeName: String,
        public accountBalance: number,
        public bookBalance: number,
        public selectedIndex: number,
        public otherAccountsDropDown: ValueList<string>,
        public otherAccounts: Array<CooperativeStaffAccount> 
    
    ) { }
}


 
@Component({
    selector: "ns-home",
    moduleId: module.id,
    templateUrl: "./home.component.html",
    styleUrls: ["./home.component.css"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
    @ViewChild(ModalComponent) modal: ModalComponent;
    adsURL: string  = Config.adsURL;
    apiUrl: string = Config.apiUrl;
    productImageUrl: string  = Config.productImageURL;
    public hidden: boolean;
    public tvtext = "";
    public titleState: TITLE_STATE;
    public _bar: BottomBar;
    public inactiveColor: string;
    public accentColor: string = "rgb(254, 204, 22)";
    public cssClass: string      = "default";
    tabSelectedIndex: number = 0;
    accountBalances: Array<CooperativeStaffAccount> ;
    mainAccountBalances: Array<AccountBalance> = [{"cooperativeName":"","accountBalance":0,"bookBalance":0,"selectedIndex":0,"otherAccountsDropDown": new ValueList<string>(),"otherAccounts":[{ "cooperativeId": "",
    "staffId": "",
    "accountType": "",
    "accountBalance": "",
    "bookBalance": "", "cooperative":{"cooperativeId":"COOP102","first_name":"CoopEast","last_name":"CooPEast","status":"Active"}}] }];
    mainAccountBalance: AccountBalance = {"cooperativeName":"","accountBalance":0,"bookBalance":0,"selectedIndex":0,"otherAccountsDropDown": new ValueList<string>(),"otherAccounts":[{ "cooperativeId": "",
        "staffId": "",
        "accountType": "",
        "accountBalance": "",
        "bookBalance": "", "cooperative":{"cooperativeId":"","first_name":"C","last_name":"","status":""}}] };

    categories: Array<Category> ;
    userId: String;
    cooperId: String;
    sponsorproducts: Array<SponsorProduct> ;
    viewproducts: Array<Product> ;
    searchedProducts: Array<Product> = [] ;
    transactions: Array<Transaction>;
    products: Array<SponsorProduct> = [];

    protected images: Array<any> ;

    pagenumber: number = 0;

    accordionItems: any[];
    accordionCat: any[];
    newProducts : Array<Product> = [] ;
    product : Product;


    public selectedIndex = 1;
    public UserTypes: ValueList<string> = new ValueList<string>([
        { value: "Vendor", display: "Vendor" }, 
        { value: "Customer", display: "Customer" }
    ]);

    public hint                  = "Vendor";

  

    public items: Array<string>;
    adverts: Array<Advert> = [];
    sub: any;

    loadedCharacter: {};
    issuesImages = [];

    @ViewChild('carousel') carousel: ElementRef;
    @ViewChild('maintab') maintab: ElementRef;

    complaintMessage: string;
    complaintVendor: string;
    complaintEmail: string;
    complaintName: string;
    complaintCategory: string;
    categoryId: String;



  
    private tasks: bgHttp.Task[] = [];
    private events: { eventTitle: string, eventData: any }[] = [];
    private file: string;
    private url: string;
    private counter: number = 0;
    public session = bgHttp.session("image-upload");

    categoriesFilterOn: boolean = false;
    sortFilterOn: boolean = false;
    mainFilterOn: boolean = false;
    listLabel : String = "'fa-th' | fonticon";
    isSquareList : boolean = true;



    private _swipeLayouts: Array<SwipeLayout>;
    private currentSwipeLayout: SwipeLayout;
    public swipeLayoutAnimated: ANIMATION_STATE;
    public gestureMode: GESTURE_MODE;

    @ViewChild("myScroller") sv: ElementRef;
    @ViewChild("btn") btn: ElementRef;
    @ViewChild("grid") gr: ElementRef;

    scrollLayout: ScrollView;
    button: Button;
    grid: GridLayout;
    public cards: Array<any> = [{
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
    }]


    // This pattern makes use of Angular’s dependency injection implementation to inject an instance of the ItemService service into this class. 
    // Angular knows about this service because it is included in your app’s main NgModule, defined in app.module.ts.
    constructor(private fonticon: TNSFontIconService,private authService:AuthService,private router: Router, private activatedRoute: ActivatedRoute
    ,private cooperCooperativeService:CooperCooperativeService, private categoryService: CategoryService,
    private sponsorProductService:SponsorProductService, private transactionService:TransactionService,
private productViewService:ProductViewService,private autoLogoutService:AutoLogoutService,private advertService:AdvertService,private httpClient: HttpClient,private _changeDetectionRef: ChangeDetectorRef,
private zone: NgZone, private productService:ProductService,private complaintService:ComplaintService ) {

      
        this.items = [];
        for (var i = 0; i < 5; i++) {
            this.items.push("data item " + i);
        }

        LS.setItem('lastAction',Date.now().toString());

        this.file = __dirname + "/infinixb.jpg";
        this.session = bgHttp.session("image-upload");
        this.url = this.apiUrl + "complaints";


      
      
     }


     private buildCarousel(): void {
      
        let count = 0;

        for (let imageData of this.images) {

            console.log(" Image Path " + imageData.url);
            const image = new Image();
          
            image.height = 200;
            image.src = imageData.url;
            image.className = "image";
            image.stretch = "aspectFill";
            image.loadMode = "async";

            const item = new CarouselItem();
            item.addChild(image);

            this.carousel.nativeElement.addChild(item);
            count++;

            if (isAndroid) {
                const adapter = this.carousel.nativeElement.android.getAdapter();

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
    }

    changeImage()
    {
       
        let slides = this.carousel.nativeElement;
         if(this.pagenumber === this.images.length)
         {
             this.pagenumber = 0;
         }
       
        slides.selectedPage = this.pagenumber;

        this.pagenumber += 1;

     
        this._changeDetectionRef.detectChanges();
    }
     onTouch(args: TouchGestureEventData) {

        console.log("Page is touched");
       this.autoLogoutService.reset();
    }

    ngOnInit(): void {
      
       // this.router.navigate(["/shopcategory"]);
       this.categoryId = this.activatedRoute.snapshot.params["id"];
        var dataObject = JSON.parse(LS.getItem('currentUser'));

       

        console.log("User ID " + dataObject._id);
          if(dataObject._id)
          {
              this.userId = dataObject._id;
              this.cooperId = dataObject.cooperId;
             
          }

     

        loader.show(options);
       

        forkJoin([
            
         
           
           
            this.sponsorProductService.getallSponsorProducts(),
        this.advertService.getallAdverts(),
        this.categoryService.getAllCategory()
          
            
            ]).subscribe((response) => {
          

           
           
            this.sponsorproducts = response[0]["data"];
            this.adverts = response[1]["data"];
            this.categories = response[2]["data"];

          

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

          
            if(this.adverts.length > 0)
            {
              

                  
                        this.images = [];
        
                       
                        for ( let loop = 0; loop < this.adverts.length; loop++ ) {
                            this.images.push({ title:   `${this.adverts[loop].ownerName}`,
                            url: `${this.adsURL +  this.adverts[loop].advertImagePath}`,
                                });
                            }
        
                        
        
                            console.log("Advert Images " + JSON.stringify(this.images));
                        
                            this.buildCarousel();
                      
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

            
           this._changeDetectionRef.detectChanges();

          
        
        
        },
            err => {
                    console.log("Error from FolkJoin + " + JSON.stringify(err));
                    
                   
                      }
        
        );
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
  
        
    }

    ngOnDestroy(){
        this.sub.unsubscribe();
       }

    ngAfterViewInit() {
     // this.getBalances(this.cooperId);

     this.sub = Observable.interval(5000)
     .subscribe((val) => { 
         
        this.changeImage();
 
         
     
     })

     this.buildCarousel();

    // this.currentSwipeLayout = this._swipeLayouts[this._swipeLayouts.length - 1];
        
     this._changeDetectionRef.detectChanges();
   }
    // new BottomBarItem(3, "Account", "ic_collaborator", "green", new Notification("green", "red", "1"))
    public itemsMenu: Array<BottomBarItem> = [
        new BottomBarItem(0, "Home", "ic_home_black_24dp", "#9A9999"),
        new BottomBarItem(1, "Shop", "ic_calendar", "#9A9999"),
        new BottomBarItem(2, "Approve/Dismiss", "ic_paperplane", "#9A9999"),
        new BottomBarItem(3, "Account", "ic_collaborator", "#9A9999")
    ];
 
    tabLoaded(event) {
        this._bar = <BottomBar>event.object;
        this.hidden = false;
        this.titleState = TITLE_STATE.SHOW_WHEN_ACTIVE;
        this.inactiveColor = "white";
        this.accentColor = "rgb(254, 204, 22)";
    }
    
     tabSelected(args: SelectedIndexChangedEventData) {
         // only triggered when a different tab is tapped
         console.log(args.newIndex);

         if(args.newIndex == 3)
         {
            this.router.navigate(["/account"]);
         }
     }

     public onchange(args: SelectedIndexChangedEventData) {
        console.log(`Drop Down selected index changed from ${args.oldIndex} to ${args.newIndex}`);
    }
 
    public onopen() {
        console.log("Drop Down opened.");
    }
 
    public onclose() {
        console.log("Drop Down closed.");
    }


public mainTabonIndexChanged(args) {
    let tabView = <TabView>args.object;
    if(tabView.selectedIndex == 5)
    {
     
     
    }else{
      //this.canViewNotice = false;
    }
  }


  onBottomNavigationTabSelected(args: OnTabSelectedEventData): void {
    console.log(`Tab selected:  ${args.oldIndex}`);

  
    if(args.newIndex == 0)
    {
      // this.router.navigate([""]);
      this.maintab.nativeElement.selectedIndex  = 0;
    }
    else if(args.newIndex == 1)
    {
       this.router.navigate(["/approve"]);
    }
    else if(args.newIndex == 2)
    {
        
        this.maintab.nativeElement.selectedIndex  = 1;
       //this.router.navigate(["/shop"]);
    }
    else if(args.newIndex == 3)
    {
       this.router.navigate(["/account"]);
    }
  }


 getBalances( cooperId: String ){
       
    loader.show(options);
    console.log("Reaching balances  " + cooperId );

    this.cooperCooperativeService.getCooperCooporatorBalances(cooperId).subscribe(
        data => { 

            console.log("Account Balances from DB " + JSON.stringify(data["data"]));
            this.accountBalances = data["data"];

            console.log("Account Balances from DB 2" + JSON.stringify(this.accountBalances));
            loader.hide();
            this.getCategory();
         
          },
          err => {
           console.log(JSON.stringify(err));
           
          
             }
        );	  
}


getCategory( ){
       
    

    this.categoryService.getAllCategory().subscribe(
        data => { 

             //console.log("Category from DB " + JSON.stringify(data["data"]));
            this.categories = data["data"];

            for ( let loop = 0; loop < this.categories.length; loop++ ) {
                this.accordionCat.push({ value:   `${this.categories[loop]._id}`,
                        display: `${this.categories[loop].categoryName}`,
                    });
                }


                this.accordionItems = [
                    { title: "Category", footer: "10", headerText: "Category", footerText: "4", items: this.accordionCat },
                    { title: "Sort", footer: "20", headerText: "Sort", footerText: "5", items: [{ value: "NA", display: "New Arrival" }, 
                    { value: "PU", display: "Price Up" },
                    { value: "PD", display: "Price Down" },
                    { value: "P", display: "Popularity" },
                    { value: "BR", display: "Best Rating" }] },
                    { title: "Filter", footer: "30", headerText: "Filter", footerText: "6", items: [ { value: "Color", display: "Color" }, 
                    { value: "Size", display: "Size" },
                    { value: "Price", display: "Price" },
                    { value: "Brand", display: "Brand" }] }
                ];

                this._changeDetectionRef.detectChanges();


            this.getSponsorProducts();

          
         
          },
          err => {
           console.log(JSON.stringify(err));
           
          
             }
        );	  
}

getSponsorProducts( ){
       
    

    this.sponsorProductService.getallSponsorProducts().subscribe(
        data => { 

            // console.log("Sponsor Products from DB " + JSON.stringify(data["data"]));
            this.sponsorproducts = data["data"];

            this.getTransactions(this.cooperId);
         
          },
          err => {
           console.log(JSON.stringify(err));
           
          
             }
        );	  
}



getViewedProducts(userId: String ){
       
    

    this.productViewService.getallViewedProducts(userId).subscribe(
        data => { 

         //console.log("Viewed Products from DB " + JSON.stringify(data["data"]));
            this.viewproducts = data["data"];

            //this.getTransactions(this.cooperId);
         
          },
          err => {
           console.log(JSON.stringify(err));
           
          
             }
        );	  
}


getTransactions(cooperId: String ){
       
    

    this.transactionService.getAllTransactions(cooperId).subscribe(
        data => { 

            // console.log("Transaction from DB " + JSON.stringify(data["data"]));
            this.transactions = data["data"];

            this.getViewedProducts(this.userId);
         
          },
          err => {
           console.log(JSON.stringify(err));
           
          
             }
        );	  
}



searchProducts(searchValue: String, skipValue: number, limitValue: number ){
       
    

    this.productService.searchProducts(searchValue,skipValue,limitValue).subscribe(
        data => { 

            console.log("Search from DB " + JSON.stringify(data["data"]));
            this.searchedProducts = data["data"];

           this._changeDetectionRef.detectChanges();
         
          },
          err => {
           console.log(JSON.stringify(err));
           
          
             }
        );	  
}

  logOut(){
    this.authService.logout();
  }


  public onSubmit(args) {
    let searchBar = <SearchBar>args.object;
    let searchValue = searchBar.text.toLowerCase();

    this.searchProducts(searchValue,0,5);
    
}

public onClear(args) {
    let searchBar = <SearchBar>args.object;
    searchBar.text = "";
    searchBar.hint = "Search for products";

    this.searchedProducts = [];
    this._changeDetectionRef.detectChanges();
}

public sBLoaded(args){
    var searchbar:SearchBar = <SearchBar>args.object;
    if(isAndroid){
        
        searchbar.android.clearFocus();
    }
}

getAdverts( ){
       
    

    this.advertService.getallAdverts().subscribe(
        data => { 

            // console.log("Adverts from DB " + JSON.stringify(data["data"]));
            this.adverts = data["data"];
            this.images = [];

           
            for ( let loop = 0; loop < this.adverts.length; loop++ ) {
                this.images.push({ title:   `${this.adverts[loop].ownerName}`,
                url: `${this.adsURL +  this.adverts[loop].advertImagePath}`,
                    });
                }

                console.log("Advert Images " + JSON.stringify(this.images));
               // this.buildCarousel();

                this._changeDetectionRef.detectChanges();
               // console.log("Image List " + JSON.stringify(this.images));
         
          },
          err => {
           console.log(JSON.stringify(err));
           
          
             }
        );	  
}


addComplaint(image: any ){
       
    

    this.complaintService.addComplaint(image).subscribe(
        data => { 

            // console.log("Adverts from DB " + JSON.stringify(data["data"]));
           
               // console.log("Image List " + JSON.stringify(this.images));
         
          },
          err => {
           console.log(JSON.stringify(err));
           
          
             }
        );	  
}




onSelectMultipleTap() {
    let context = imagepicker.create({
        mode: "multiple"
    });
    this.startSelection(context);
}

onSelectSingleTap() {
    let context = imagepicker.create({
        mode: "single"
    });
    this.startSelection(context);
}

startSelection(context) {
    let _that = this;

    context
    .authorize()
    .then(() => {
        _that.items = [];
        return context.present();
    })
    .then((selection) => {
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
}

uploadFile() {
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

}

logEvent(e) {
    console.log(e);
}

sendIssues(){
    //this.addComplaint(this.issuesImages[0]);

   
}


upload(args) {
    this.start_upload(false, false);
}

upload_error(args) {
    this.start_upload(true, false);
}

upload_multi(args) {
    this.start_upload(false, true);
}

start_upload(should_fail, isMulti) {
    console.log((should_fail ? "Testing error during upload of " : "Uploading file: ") + this.file + (isMulti ? " using multipart." : ""));

    let _that2 = this;
    const name = this.file.substr(this.file.lastIndexOf("/") + 1);
    const description = `${name} (${++this.counter})`;
    const request = {
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

    let task: bgHttp.Task;
    let lastEvent = "";
    if (isMulti) {
        var params = [
            { key: "message", name: "message", value: this.complaintMessage },
            {key:"image", name: "image", filename: this.file, mimeType: 'image/jpeg' },
            { key: "name", name: "name", value: this.complaintName },
            { key: "email", name: "email", value: this.complaintEmail },
            { key: "vendor", name: "vendor", value: this.complaintVendor },
            { key: "copperId", name: "copperId", value: this.cooperId }
        ];
        task = this.session.multipartUpload(params, request);
    } else {
        task = this.session.uploadFile(this.file, request);
    }

    function onEvent(e) {
        if (lastEvent !== e.eventName) {
            // suppress all repeating progress events and only show the first one
            lastEvent = e.eventName;
        } else {
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

        
                TNSFancyAlert.showSuccess("Success!", " Complaint sent, support team will respond shortly", "Ok")
                .then( () => { /* user pressed the button */
               
                   
               });
        _that2._changeDetectionRef.detectChanges();
    }
    lastEvent = "";
    this.tasks.push(task);
}

onTap() {
    alert("clicked an item");
}

openModal() {
    this.modal.show();
}

closeModal() {
    this.modal.hide();
}

onOpenModal() {
    console.log("opened modal");
}

onCloseModal() {
    console.log("closed modal");
}

public onaccountchange(args: SelectedIndexChangedEventData, bal: AccountBalance) {
    // console.log(`Drop Down selected index changed  ${args.oldIndex} to ${args.newIndex}. New value is "${this.sessionitems.getValue(
    //     args.newIndex)}"`);

    console.log("Selected ID " + args.newIndex);
    let selectedAccount = bal.otherAccountsDropDown.getValue(args.newIndex);
  
  for(let mainBal of this.mainAccountBalances)
  {
      if(mainBal.cooperativeName === bal.cooperativeName)
      {
        let defaultAccount = mainBal.otherAccounts.filter(n => n.accountType === selectedAccount);

        console.log("Default Account " + JSON.stringify(defaultAccount));

        this.mainAccountBalance.accountBalance = + defaultAccount[0].accountBalance;
        this.mainAccountBalance.bookBalance = + defaultAccount[0].bookBalance;
        this.mainAccountBalance.cooperativeName = defaultAccount[0].cooperative.first_name;
        
      }
  }

   
    this._changeDetectionRef.detectChanges();
}




swipeLayoutLoaded(event) {
    this._swipeLayouts.push(<SwipeLayout>event.object);
}



swipeLeftCallback(swipeLeftEvent: SwipeLeftEventData) {
    console.log('swipeLeft');
    this.next();
}

private next() {
    //this._swipeLayouts.pop();
    //this.currentSwipeLayout = this._swipeLayouts[this._swipeLayouts.length - 1];
}

swipeRightCallback(swipeRightEvent: SwipeRightEventData) {
    console.log('swipeRight');
    this.next();
}
swipeUpCallback(swipeUpEvent: SwipeUpEventData) {
    console.log('swipeUp');
    this.next();
}
swipeDownCallback(swipeDownEvent: SwipeDownEventData) {
    console.log('swipeDown');
    this.next();
}

goAway() {
    let that = this;
    this.currentSwipeLayout.animateSwipeRight().then(() => {
        that.next();
        console.log('swipeLeft done');
    });
}


comeHere() {
    let that = this;
    this.currentSwipeLayout.animateSwipeLeft().then(() => {
        that.next();
        console.log('swipeRight done');
    });
}

super() {
    let that = this;
    this.currentSwipeLayout.animateSwipeUp().then(() => {
        that.next();
        console.log("swipeUp done");
    });
}


getProductByCategoryId(categoryId: String) {
    console.log("Category Id " + categoryId);
  //  this.products = [];

    
    loader.show(options);

    this.productService.getallproductByCategory(categoryId).subscribe(
        data => {
           
            //console.log("Category Products  " + JSON.stringify(data["data"]));
            this.products = data["data"];


               
            

            for (let item of this.products)
            {

               console.log("Category Products loop  " + item.product.productId);
               this.product = {"_id":item.product._id,"productId":item.product.productId,"vendorId":item.product.vendorId,
               "productName":item.product.productName,"productBriefDesc":item.product.productBriefDesc,
               "productDetailDesc":item.product.productDetailDesc,"productSpec":item.product.productSpec,
               "productImage":item.product.productImage,"productBackImage":item.product.productBackImage,
               "productLeftImage":item.product.productLeftImage,"productRightImage":item.product.productRightImage,
               "brand":item.product.brand,"location":item.product.location,"quantity":item.product.quantity,
               "price":item.product.price,"status":item.product.status,"expires":item.product.expires,
               "dateCreated":item.product.dateCreated,"dateModified":item.product.dateModified,
               "likes":item.product.likes,"rates":item.product.rates
               };
                this.newProducts.push( this.product);

                
 
    
            }

           console.log("Category Products Outside  " + JSON.stringify(this.newProducts));
           //this.newProducts = this.searchedProducts;
           //this.searchedProducts = this.newProducts;
           this.sv.nativeElement.scrollToVerticalOffset(0, true);
           this.modal.hide();
           // this._changeDetectionRef.detectChanges();
            loader.hide();
        },
        err => {
            console.log(err);

        }
    );
}

categoryFilTap()
{
    this.categoriesFilterOn = !this.categoriesFilterOn;
    this.togleFilter();
}

sortFilTap()
{
    this.sortFilterOn = !this.sortFilterOn;
    this.togleFilter();
}

mainFilterFilTap()
{
    this.mainFilterOn = !this.mainFilterOn;
    this.togleFilter();
}

 togleFilter(){
   if(this.categoriesFilterOn)
   {
     this.sortFilterOn = false;
     this.mainFilterOn = false;
   }

   if(this.sortFilterOn)
   {
     this.categoriesFilterOn = false;
     this.mainFilterOn = false;
   }

   if(this.mainFilterOn)
   {
     this.categoriesFilterOn = false;
     this.sortFilterOn = false;
   }





//   this._changeDetectionRef.detectChanges();
 }

 toggleSearchList(){
     this.isSquareList = !this.isSquareList;

     if(this.isSquareList)
     {
        this.listLabel = "'fa-th' | fonticon";
     }else{
        this.listLabel = "'fa-th-list' | fonticon";
     }
    
   
 }

 navigateToBuy(){
     this.router.navigate(["/buy"]);
 }
    
}