import { Component, OnInit, AfterViewInit,  ChangeDetectionStrategy,ChangeDetectorRef,NgZone } from "@angular/core";
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


@Component({
    moduleId: module.id,
    selector: "ns-shopcatalogue",
    templateUrl: "./shopcatalogue.component.html",
    styleUrls: ["./shopcatalogue-common.css", "./shopcatalogue.component.css"],
    changeDetection: ChangeDetectionStrategy.OnPush,
  
})


export class ShopCatalogueComponent  {
    productImageUrl: string  = Config.productImageURL;
    adsURL: string  = Config.adsURL;
    
    public input: any;
    selectedCooperativeIndex: number;
    selectedCooperative: string;
    staffId: String;

    categoryId: String;
    categories: Array<Category> = [];
    category: Category;
    products: Array<SponsorProduct> = [];
 
   


     
    public constructor(private location: Location, private cooperativeService: CooperativeService, private cooperativeStaffService: CooperativeStaffService,
    
     private router: Router, private activatedRoute: ActivatedRoute, private productService:ProductService,
    private categoryService:CategoryService, private advertService:AdvertService, private ngZone: NgZone,private _changeDetectionRef: ChangeDetectorRef) {
        
      
    
    
    }

  

    public ngOnInit() {

        this.categoryId = this.activatedRoute.snapshot.params["id"];

        console.log("Selected Category " + this.categoryId);
      // this.getProductByCategoryId(this.categoryId);

    }

    ngAfterViewInit() {
        //this.getBalances(this.cooperId);

    //  this.getCategory();

      this.getProductByCategoryId(this.categoryId);
       
   }
    public register() {
        // if(this.input.firstname && this.input.lastname && this.input.email && this.input.password) {
        //     ApplicationSettings.setString("account", JSON.stringify(this.input));
        //     this.location.back();
        // } else {
        //     (new SnackBar()).simple("All Fields Required!");
        // }

        console.log("Reaching Register ");

       
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



   

    getProductByCategoryId(categoryId: String) {
        console.log("Category Id " + categoryId);
        this.products = [];

        this.productService.getallproductByCategory(categoryId).subscribe(
            data => {
               
               // console.log("Products  " + JSON.stringify(data["data"]));
               
                this.ngZone.run(() => {
                    this.products = data["data"];

                });
                console.log("Products  " + JSON.stringify(this.products));
              
                this._changeDetectionRef.detectChanges();
                this.getCategory();
                

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
               
                  this.ngZone.run(() => {
                    this.categories = data["data"];

               
                  this.category =   this.categories.find(x => x._id === this.categoryId); 
                });

                this._changeDetectionRef.detectChanges();
              },
              err => {
               console.log(JSON.stringify(err));
               
              
                 }
            );	  
    }


   



}