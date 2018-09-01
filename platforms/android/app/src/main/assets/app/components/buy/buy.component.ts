import { Component, OnInit, AfterViewInit,  ChangeDetectionStrategy,ChangeDetectorRef,Input,NgZone,ViewChild,ElementRef, OnDestroy } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import * as application from "tns-core-modules/application";

import { RouterExtensions } from "nativescript-angular/router";
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
import { Cooperative } from '../../models/index';
import { CooperativeService } from "../../services/cooperative.service";
import { CooperativeStaffService } from "../../services/cooperativeStaff.service";
import { ProductService } from "../../services/product.service";


import { CooperativeStaff, VerifyAuth, Product,ProductCart } from "../../models/index";

import { Config } from "../../shared/config";
let LS = require( "nativescript-localstorage" );

import { TNSFancyAlert, TNSFancyAlertButton } from "nativescript-fancyalert";

import { TouchGestureEventData } from "ui/gestures";

import * as dialogs from "ui/dialogs";

import { AutoLogoutService } from '../../services/autologout.service';


import { AndroidApplication, AndroidActivityBackPressedEventData } from "application";
import { isAndroid } from "platform";
@Component({
    moduleId: module.id,
    selector: "ns-buy",
    templateUrl: "./buy.component.html",
    styleUrls: ["./buy-common.css", "./buy.component.css"],
    changeDetection: ChangeDetectionStrategy.OnPush,
  
})


export class BuyComponent implements OnInit, OnDestroy  {
    productImageUrl: string  = Config.productImageURL;
    public input: any;
    selectedCooperativeIndex: number;
    selectedCooperative: string;
    staffId: String;
    cooperative: Array<Cooperative> = [];
    hint: string = " 1";
    public cooperativeList: ValueList<string>;
    public cssClass: string = "default";
    cooperativeStaff: CooperativeStaff;
    verifyAuth: VerifyAuth;
    productId: String;
    product: ProductCart;
    userId: String;
    cooperId: String;
    likedThisProduct: boolean = false;
    likeLabelClass = "fa notlike";
    likeObject: any;
    myLikeCount: Number = 0;
    likeTotalCount: Number = 0;
    canViewDetails: Boolean = false;

    cartProducts: Array<ProductCart> = [];

     notification: String = "You can access your personal offer, updates and price drop here";
    public images: Array<any> = [];
   


     
    public constructor(private location: Location, private cooperativeService: CooperativeService, private cooperativeStaffService: CooperativeStaffService,
    private productService:ProductService, private router: Router, private activatedRoute: ActivatedRoute,
    private _changeDetectionRef: ChangeDetectorRef,
    private zone: NgZone,private routerExtensions: RouterExtensions,private autoLogoutService: AutoLogoutService
  ) {
      

       
    
    }

  

    public ngOnInit() {


        this.productId = this.activatedRoute.snapshot.params["id"];

        var dataObject = JSON.parse(LS.getItem('currentUser'));

       

        
          if(dataObject._id)
          {
              this.userId = dataObject._id;
              this.cooperId = dataObject.cooperId;
             
          }
        this.getProductById(this.productId,this.userId);

        //console.log("Current URL " + this.router.url);

       
       

    }
    

    ngOnDestroy()
    {
     //this.sendLikeToDB();
     // this.router.navigate(["/"]);
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

        //this.router.navigate(["/]"]);
    }
    startBackgroundAnimation(background) {
        background.animate({
            scale: { x: 1.0, y: 1.0 },
            duration: 10000
        });
    }

    addToCart(){

        // let buttons = [
        //     new TNSFancyAlertButton({ label: 'Continue Shopping', action: () => { console.log('One'); } }),
        //     new TNSFancyAlertButton({ label: 'Proceed to Checkout', action: () => { console.log('Two'); } })
           
        //   ];


        
       
        if(LS.getItem('mycartproducts'))
        {
            this.cartProducts = [];
            var mycartproducts2 = LS.getItem('mycartproducts');
            console.log("Product Id " + this.product._id);

            var mycartproducts: Array<ProductCart> = mycartproducts2;
            console.log("Cart Count "+ mycartproducts.length);

            var mainlength = mycartproducts.length;

            let itemExist : boolean = false;


            mycartproducts.forEach( (element) => {

                var newProduct = element;
                if(this.product == element)
                    {
                        element.qty +=  1;
                        element.amount = element.price * element.qty;
                        element.isSelected = false;
                        element.selectedQtyIndex = newProduct.qty - 1;
                        itemExist = true;

                    }

                   
            });


            if(!itemExist)
            {
                this.product.qty = 1;
                console.log("Qty When New " + this.product.qty);
                //console.log("New Qty " + this.product.qty);
                this.product.isSelected = false;
                this.product.amount =  this.product.price;
                this.product.selectedQtyIndex = this.product.qty - 1;

                this.product.qtyList = new ValueList<string>();
                        for (let loop = 0; loop < this.product.quantity; loop++) {
                           
                           if(loop > 0)
                           {
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

            LS.setItem('mycartproducts',this.cartProducts);

             //  console.log("Qty Array " + this.product.qtyList);
                
               
                //  TNSFancyAlert.showSuccess("Success!", this.product.productName + " was successfully added", "Ok")
                //  .then( () => { /* user pressed the button */
                
                    
                // });

                let parentContext = this;
                
                dialogs.confirm({
                    title: "Success",
                    message:` "A new Item has been added to your shopping cart. You now have ${this.cartProducts.length} item(s) in your shopping cart"`,
                    okButtonText: "Proceed to Checkout",
                    cancelButtonText: "Continue Shopping"
                    
                }).then(function (result) {
                    // result argument is boolean
                    console.log("Dialog result for shopping:   " + result);

                    if(result)
                    {
                        //Go to Cart

                        parentContext.router.navigate(["/mycart"]);
                    }else{
                        // Continuing Shopping

                        parentContext.router.navigate(["/shop"]);
                    }
                });



        }else{
            
            console.log("Cart is empty");
              this.product.qty = 1;
              this.product.isSelected = false;
              this.product.amount =  this.product.price;
              this.product.selectedQtyIndex = this.product.qty - 1;

            this.product.qtyList = new ValueList<string>();
              for (let loop = 0; loop < this.product.quantity; loop++) {
                 
                 if(loop > 0)
                 {
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
                 let parentContext = this;
               
                dialogs.confirm({
                    title: "Success",
                    message: `"A new Item has been added to your shopping cart. You now have ${this.cartProducts.length} item(s) in your shopping cart"`,
                    okButtonText: "Proceed to Checkout",
                    cancelButtonText: "Continue Shopping"
                    
                }).then(function (result) {
                    // result argument is boolean
                    console.log("Dialog result: " + result);

                    if(result)
                    {
                        //Go to Cart

                       // this.router.navigate(["/mycart"]);
                       parentContext.router.navigate(["/mycart"]);
                    }else{
                        // Continuing Shopping

                       // this.router.navigate(["/shop"]);
                       parentContext.router.navigate(["/shop"]);
                    }
                });


              

            //     TNSFancyAlert.showSuccess("Success!", this.product.productName + " was successfully added", "Ok")
            //     .then( () => { /* user pressed the button */
               
                   
            //    });

              //  TNSFancyAlert.showCustomButtons(buttons, undefined, undefined, 'Success!', `A new item has been added to your shopping cart. You now have 1 item(s) in your shopping cart`, 'Ok');
  

        }



        //



      
    
   
        
    

}

    findIndexToUpdate(newItem) { 
        return newItem.id === this;
  }

    public oncooperativechange(args: SelectedIndexChangedEventData) {
        // console.log(`Drop Down selected index changed  ${args.oldIndex} to ${args.newIndex}. New value is "${this.sessionitems.getValue(
        //     args.newIndex)}"`);

        console.log("Selected ID " + args.newIndex);
        this.selectedCooperative = this.cooperativeList.getValue(args.newIndex);
        console.log("Selected Id Value  " + this.selectedCooperative);

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

    getProductById(productId: String, userId: String) {
        console.log("Product Id Buy" + productId);
        this.product = null;

        this.productService.getproduct(productId,userId).subscribe(
            data => {
               
               // console.log("Single Product " + JSON.stringify(data["data"]));
                this.product = data["data"];
                if (this.product.likesCount) {

                
                } else {

                    this.product.likesCount = 0;
                }

                var checkIfLikeExist = this.product.likes.filter(n => n.cooperId === this.cooperId);

                if(checkIfLikeExist.length > 0)
                {
                    this.likedThisProduct = true;
                    this.likeLabelClass = "fa like";
                    this.likeTotalCount = this.product.likesCount ;
                  
                   
               }else{
                this.likedThisProduct = false;
                this.likeLabelClass = "fa notlike";
                this.likeTotalCount = this.product.likesCount ;
               }

              
                

            },
            err => {
                console.log(err);

            }
        );
    }

    sendLikeToDB(){

        if(this.likedThisProduct)
        {
            this.productService.likeProducts(this.product._id,this.product.productId, this.product.likes).subscribe(
                data => {
                   
                   // console.log("Single Product " + JSON.stringify(data["data"]));
    
                   this.product = null;
                   this.product = data["data"];
    
                   // alert success
    
                   //this._changeDetectionRef.detectChanges();
                   
                    
    
                },
                err => {
                    console.log(err);
    
                }
            );

        }else{
            //remove for database
        }
       
    }

    likeProduct() {

        

        this.likedThisProduct = !this.likedThisProduct;
        var checkIfLikeExist = this.product.likes.filter(n => n.cooperId === this.cooperId);
        if(this.likedThisProduct)
        {
           

            if(checkIfLikeExist.length === 0)
            {
               //this.product.likes.push({"cooperId":this.cooperId,"userId":this.userId,"user":this.userId,"dateCreated": new Date() })
               this.likeObject = {"cooperId":this.cooperId,"userId":this.userId,"user":this.userId,"dateCreated": new Date() };
              // this.product.likesCount +=1;
              this.likeTotalCount = this.product.likesCount + 1;
           }else{
   
               this.likeObject = checkIfLikeExist.find(n => n.cooperId === this.cooperId);
               this.likeTotalCount = this.product.likesCount ;
           }
            
            this.likeLabelClass = "fa like";
        }else{
            this.likeLabelClass = "fa notlike";


            if(checkIfLikeExist.length === 0)
            {
               //this.product.likes.push({"cooperId":this.cooperId,"userId":this.userId,"user":this.userId,"dateCreated": new Date() })
               this.likeObject = {"cooperId":this.cooperId,"userId":this.userId,"user":this.userId,"dateCreated": new Date() };
              // this.product.likesCount +=1;

              if(this.product.likesCount > 0)
              {
                this.likeTotalCount = this.product.likesCount - 1;
              }else{
                this.likeTotalCount = this.product.likesCount ;
              }
             
             
           }else{
   
               this.likeObject = checkIfLikeExist.find(n => n.cooperId === this.cooperId);
               if(this.product.likesCount > 0)
               {
                 this.likeTotalCount = this.product.likesCount - 1;
               }else{
                 this.likeTotalCount = this.product.likesCount ;
               }

               this.likeObject = checkIfLikeExist.find(n => n.cooperId === this.cooperId);
              
           }

           
            
        }

        console.log("Product Id Buy" + this.product.likesCount);
        
       

   
    }


    navigateBack() {
        console.log("Go Back Button Clicked" );
        this.routerExtensions.backToPreviousPage();
        //this.router.navigate(["/"]);
    }


    onTouch(args: TouchGestureEventData) {

       
        this.autoLogoutService.reset();
     }

     viewMore(){
         this.canViewDetails = !this.canViewDetails;
     }

}