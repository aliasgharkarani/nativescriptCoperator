import { Component, OnInit, AfterViewInit, OnDestroy, Input, ChangeDetectorRef,ChangeDetectionStrategy,NgZone,ViewChild,ElementRef } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";


import { Image } from 'tns-core-modules/ui/image';
const CarouselItem = require('nativescript-carousel').CarouselItem;



import {RouterExtensions} from "nativescript-angular/router";
import { Location } from "@angular/common";
import { SnackBar } from "nativescript-snackbar";
import * as ApplicationSettings from "application-settings";
import { connectionType, getConnectionType } from "connectivity";
import { Animation } from "ui/animation";
import { View } from "ui/core/view";
import { prompt } from "ui/dialogs";
import { Page, isIOS } from 'tns-core-modules/ui/page';
import { TextField } from "ui/text-field";
import * as textViewModule from "tns-core-modules/ui/text-view";



import { ValueList, DropDown } from "nativescript-drop-down";
import { SelectedIndexChangedEventData } from "nativescript-drop-down";
import { Cooperative, Product,SponsorProduct, Advert } from '../../models/index';
import { CooperativeService } from "../../services/cooperative.service";
import { ProductService } from "../../services/product.service";
import {CategoryService} from "../../services/category.service";
import {AdvertService} from "../../services/advert.service";

import { CooperativeStaffService } from "../../services/cooperativeStaff.service";

import { CooperativeStaff, VerifyAuth,Category } from "../../models/index";
import { Config } from "../../shared/config";

import {LoadingIndicator} from "nativescript-loading-indicator";
import { BottomNavigation, BottomNavigationTab, OnTabSelectedEventData } from 'nativescript-bottom-navigation';

var loader = new LoadingIndicator();

import { AutoLogoutService } from '../../services/autologout.service';

import { GestureEventData } from "ui/gestures";

import { TouchGestureEventData } from "ui/gestures";

import * as application from "application";
import { AndroidApplication, AndroidActivityBackPressedEventData } from "application";
import { isAndroid } from "platform";

import * as elementRegistryModule from 'nativescript-angular/element-registry';


import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/interval';

import { SearchBar } from "ui/search-bar";
import { ModalComponent } from "../modal";
import { HttpClient } from '@angular/common/http';

import { forkJoin } from "rxjs/observable/forkJoin";
import {SponsorProductService} from "../../services/sponsorproduct.service";
import { ScrollView, ScrollEventData } from "ui/scroll-view";
import { Button } from "ui/button";


import { GridLayout, GridUnitType, ItemSpec } from "ui/layouts/grid-layout";
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

@Component({
    moduleId: module.id,
    selector: "coopershop",
    templateUrl: "./shop.component.html",
    styleUrls: ["./shop-common.css", "./shop.component.css"],
    changeDetection: ChangeDetectionStrategy.OnPush
  
})


export class ShopComponent implements OnInit, AfterViewInit,OnDestroy  {
    productImageUrl: string  = Config.productImageURL;
    adsURL: string  = Config.adsURL;
    
    public input: any;
    selectedCooperativeIndex: number;
    selectedCooperative: string;
    staffId: String;
    cooperative: Array<Cooperative> = [];
    hint: string = " ";
    selectedCategory: String;
    selectedCategoryIndex: Number;

    public categoriesDrop: ValueList<string>;
    public sortList: ValueList<string>;
    selectedSort: String;
    selectedSortIndex: Number;
    sorthint: String = "Sort";

    public filterList: ValueList<string>;
    selectedFilter: String;
    selectedFilterIndex: Number;
    filterhint: String = "Filter";
    public cooperativeList: ValueList<string>;
    public cssClass: string = "default";
    categoryhint: String = "Category";
    cooperativeStaff: CooperativeStaff;
    verifyAuth: VerifyAuth;
    categoryId: String;
    categories: Array<Category> = [];
    products: Array<SponsorProduct> = [];
    adverts: Array<Advert> = [];
    private _bottomNavigation: BottomNavigation;
    sub: any;
    searchedProducts: Array<Product> = [] ;
    sponsorproducts: Array<SponsorProduct> ;

     notification: String = "You can access your personal offer, updates and price drop here";
    //images: Array<any>;

   images: Array<any> = [];
   pagenumber: number = 0;

   
    @ViewChild('bottomNavigation') bottomBar: ElementRef;

    @ViewChild(ModalComponent) modal: ModalComponent;

    @Input() row = 0;

    @ViewChild('carousel') carousel: ElementRef;
    public imagesSlide: Array<any> = [];

    @ViewChild("slides") slides: ElementRef;

    @ViewChild("myScroller") sv: ElementRef;
    @ViewChild("btn") btn: ElementRef;
    @ViewChild("grid") gr: ElementRef;

    scrollLayout: ScrollView;
    button: Button;
    grid: GridLayout;



     
    public constructor(private location: Location, private cooperativeService: CooperativeService, private cooperativeStaffService: CooperativeStaffService,
    
     private router: Router, private activatedRoute: ActivatedRoute, private productService:ProductService,
    private categoryService:CategoryService, private advertService:AdvertService,private routerExtensions: RouterExtensions,
    private _changeDetectionRef: ChangeDetectorRef,
    private zone: NgZone,private page: Page,private autoLogoutService:AutoLogoutService, private sponsorProductService:SponsorProductService,
    ) {
        
       
        this.page.actionBarHidden = true;
    
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
  
    public scrollTo() {

        this.sv.nativeElement.scrollToVerticalOffset(0, true);
        //this.scrollLayout.scrollToVerticalOffset(this.grid.getLocationRelativeTo(this.button).y, false);   
    }

    public ngOnInit() {

        this.scrollLayout = this.sv.nativeElement;
        // this.button = this.btn.nativeElement; 
        // this.grid = this.gr.nativeElement;
        this.categoryId = this.activatedRoute.snapshot.params["id"];

        console.log("Selected Category " + this.categoryId);



        forkJoin([
            this.categoryService.getAllCategory(),

            this.sponsorProductService.getallSponsorProducts(),

            this.advertService.getallAdverts()
            
            
            ]).subscribe((response) => {
            // console.log("<<<<<<<<<<<<<<<<<<<<<<<<< first value>>>>>>>>>>>" + JSON.stringify(response[0]));
            // console.log("<<<<<<<<<<<<<<<<<<<<<<<<< second value>>>>>>>>>>>" + JSON.stringify(response[1]));
            // console.log("<<<<<<<<<<<<<<<<<<<<<<<<< third value>>>>>>>>>>>" + JSON.stringify(response[2]));
           
            this.categories = response[0]["data"];

           
            this.sponsorproducts = response[1]["data"];
            this.adverts = response[2]["data"];

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

            this._changeDetectionRef.detectChanges();
          


            }
            );

      
       // this.getProductByCategoryId(this.categoryId);

        this.sortList = new ValueList<string>([
            { value: "NA", display: "New Arrival" }, 
            { value: "PU", display: "Price Up" },
            { value: "PD", display: "Price Down" },
            { value: "P", display: "Popularity" },
            { value: "BR", display: "Best Rating" }
        ]);

        this.filterList = new ValueList<string>([
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
       
        if (!isAndroid) {
            return;
          }
        application.android.on(AndroidApplication.activityBackPressedEvent, (data: AndroidActivityBackPressedEventData) => {
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

    shuffle(array) {
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
      }

    ngAfterViewInit() {
        //this.getBalances(this.cooperId);

       

        //this._bottomNavigation = this.page.getViewById('bottomNavigation');

       //this._bottomNavigation.selectTab(2);
        //this.bottomBar.nativeElement.selectTab(2);
        //this.getCategory();
     


        this.sub = Observable.interval(5000)
    .subscribe((val) => { 
        
       this.changeImage();

        
    
    })


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

 
   
       
   }

   ngOnDestroy(){
    this.sub.unsubscribe();
   }

   bottomNavigationLoaded(args: OnTabSelectedEventData)
   {
    //this.bottomBar.nativeElement.on('tabSelected', 2);
    this.bottomBar.nativeElement.selectTab(2);

    //this.getProductByCategoryId(this.categoryId);
   }
    public register() {
        // if(this.input.firstname && this.input.lastname && this.input.email && this.input.password) {
        //     ApplicationSettings.setString("account", JSON.stringify(this.input));
        //     this.location.back();
        // } else {
        //     (new SnackBar()).simple("All Fields Required!");
        // }

        console.log("Reaching Register ");

        this.getCooperativeStaff(this.staffId, this.selectedCooperative);
    }

    onNavBtnTap() {
        // This code will be called only in Android.
        console.log("Navigation button tapped!");
    }

    public goBack() {
        this.location.back();
    }
    startBackgroundAnimation(background) {
        background.animate({
            scale: { x: 1.0, y: 1.0 },
            duration: 10000
        });
    }
    navigateBack() {
        console.log("Go Back Button Clicked" );
        this.routerExtensions.backToPreviousPage();
    }
    onBottomNavigationTabSelected(args: OnTabSelectedEventData): void {
        console.log(`Tab selected:  ${args.oldIndex}`);

        if(args.newIndex == 0)
        {
           this.router.navigate([""]);
        }
        else if(args.newIndex == 1)
        {
           this.router.navigate(["/approve"]);
        }
       
        else if(args.newIndex == 3)
        {
           this.router.navigate(["/account"]);
        }
      }
    public oncooperativechange(args: SelectedIndexChangedEventData) {
        // console.log(`Drop Down selected index changed  ${args.oldIndex} to ${args.newIndex}. New value is "${this.sessionitems.getValue(
        //     args.newIndex)}"`);

        console.log("Selected ID " + args.newIndex);
        this.selectedCooperative = this.cooperativeList.getValue(args.newIndex);
        console.log("Selected Id Value  " + this.selectedCooperative);

    }

    public oncategorychange(args: SelectedIndexChangedEventData) {
        // console.log(`Drop Down selected index changed  ${args.oldIndex} to ${args.newIndex}. New value is "${this.sessionitems.getValue(
        //     args.newIndex)}"`);

        console.log("Selected ID " + args.newIndex);
        this.selectedCategory = this.categoriesDrop.getValue(args.newIndex);
        console.log("Selected Id Value  " + this.selectedCategory);
        this.categoryId = this.selectedCategory;

       // this.getProductByCategoryId(this.selectedCategory);
        this._changeDetectionRef.detectChanges();
    }

    public onsortchange(args: SelectedIndexChangedEventData) {
        // console.log(`Drop Down selected index changed  ${args.oldIndex} to ${args.newIndex}. New value is "${this.sessionitems.getValue(
        //     args.newIndex)}"`);

        console.log("Selected ID " + args.newIndex);
        this.selectedSort = this.sortList.getValue(args.newIndex);
        console.log("Selected Id Value  " + this.selectedSort);

    }

    public onfilterchange(args: SelectedIndexChangedEventData) {
        // console.log(`Drop Down selected index changed  ${args.oldIndex} to ${args.newIndex}. New value is "${this.sessionitems.getValue(
        //     args.newIndex)}"`);

        console.log("Selected ID " + args.newIndex);
        this.selectedFilter = this.filterList.getValue(args.newIndex);
        console.log("Selected Id Value  " + this.selectedFilter);

    }

    



    

    getCooperative() {
        this.cooperativeService.getAllCooperative().subscribe(
            data => {
                console.log("Cooperative List " + JSON.stringify(data["data"]));

                this.cooperative = data["data"];

                this.cooperativeList = new ValueList<string>();
                for (let loop = 0; loop < this.cooperative.length; loop++) {
                    this.cooperativeList.push({
                        value: `${this.cooperative[loop].cooperativeId}`,
                        display: `${this.cooperative[loop].first_name}`,
                    });
                }



            },
            err => {
                console.log(err);

            }
        );
    }

    getCooperativeStaff(staffId: String, cooperativeId: String) {
        console.log("Staff and CooperativeId " + staffId + " - " + cooperativeId);


        this.cooperativeStaffService.getCooperativeStaff(staffId, cooperativeId).subscribe(
            data => {
                console.log("Cooperative Staff " + JSON.stringify(data["data"]));

                this.cooperativeStaff = data["data"];

                console.log("Verifying Staff out side " + this.cooperativeStaff.staffId);
                this.sendVerifyAuth(this.cooperativeStaff);



            },
            err => {
                console.log(err);

            }
        );
    }

    sendVerifyAuth(verifyAuth: CooperativeStaff) {
        console.log("Verify " + verifyAuth.staffId);


        this.cooperativeStaffService.verifyAuthToCreatLater(verifyAuth).subscribe(
            data => {
                console.log("Very Auth " + JSON.stringify(data["data"]));



            },
            err => {
                console.log(err);

            }
        );
    }


    getProductByCategoryId(categoryId: String) {
        console.log("Category Id " + categoryId);
        this.products = [];

        loader.show(options);

        this.productService.getallproductByCategory(categoryId).subscribe(
            data => {
               
                //console.log("Products  " + JSON.stringify(data["data"]));
                this.products = data["data"];

                this.searchedProducts = [];

                for (let item of this.products)
                {
                    this.searchedProducts.push(item.product);
                }

                this.sv.nativeElement.scrollToVerticalOffset(0, true);

                this._changeDetectionRef.detectChanges();
                loader.hide();
            },
            err => {
                console.log(err);

            }
        );
    }

    getCategory( ){
       
    

        this.categoryService.getAllCategory().subscribe(
            data => { 
    
                // console.log("Account Balances from DB " + JSON.stringify(data["data"]));
                this.categories = data["data"];
              this.getAdverts();

                this.categoriesDrop = new ValueList<string>();
                for ( let loop = 0; loop < this.categories.length; loop++ ) {
                this.categoriesDrop.push({ value:   `${this.categories[loop]._id}`,
                        display: `${this.categories[loop].categoryName}`,
                    });
                }
     
                console.log("Shop Categories " + JSON.stringify(this.categoriesDrop));
               
                this._changeDetectionRef.detectChanges();
             
              },
              err => {
               console.log(JSON.stringify(err));
               
              
                 }
            );	  
    }

    getAdverts( ){
       
    

        this.advertService.getallAdverts().subscribe(
            data => { 
    
               // console.log("Adverts from DB " + JSON.stringify(data["data"]));
                this.adverts = data["data"];

                this.zone.run(() => {
                this.images = [];

               
                for ( let loop = 0; loop < this.adverts.length; loop++ ) {
                    this.images.push({ title:   `${this.adverts[loop].ownerName}`,
                    url: `${this.adsURL +  this.adverts[loop].advertImagePath}`,
                        });
                    }

                

                    console.log("Advert Images " + JSON.stringify(this.images));
                   this.buildCarousel();

                    this._changeDetectionRef.detectChanges();

                });
                   // console.log("Image List " + JSON.stringify(this.images));
             
              },
              err => {
               console.log(JSON.stringify(err));
               
              
                 }
            );	  
    }

    onTouch(args: TouchGestureEventData) {

        console.log("Page is touched");
       this.autoLogoutService.reset();
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

    
searchProducts(searchValue: String, skipValue: number, limitValue: number ){
       
    loader.show(options);

    this.productService.searchProducts(searchValue,skipValue,limitValue).subscribe(
        data => { 

            // console.log("Transaction from DB " + JSON.stringify(data["data"]));
            this.searchedProducts = data["data"];

           this._changeDetectionRef.detectChanges();
           loader.hide();
          },
          err => {
           console.log(JSON.stringify(err));
           
          
             }
        );	  
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

}