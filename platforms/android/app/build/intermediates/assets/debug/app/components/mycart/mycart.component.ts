import { Component, OnInit, AfterViewInit, ChangeDetectionStrategy,ViewChild ,ElementRef } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
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

import { BottomBar, BottomBarItem, TITLE_STATE, Notification } from 'nativescript-bottombar';
  


import { ValueList, DropDown } from "nativescript-drop-down";
import { SelectedIndexChangedEventData } from "nativescript-drop-down";
import { Cooperative } from '../../models/index';
import { CooperativeService } from "../../services/cooperative.service";
import { CooperativeStaffService } from "../../services/cooperativeStaff.service";

import { CooperativeStaff, VerifyAuth,Product,ProductCart } from "../../models/index";
let LS = require( "nativescript-localstorage" );
import { Config } from "../../shared/config";

import { TNSFancyAlert } from "nativescript-fancyalert";
import { AutoLogoutService } from '../../services/autologout.service';
import { TouchGestureEventData } from "ui/gestures";

@Component({
    moduleId: module.id,
    selector: "ns-mycart",
    templateUrl: "./mycart.component.html",
    styleUrls: ["./mycart-common.css", "./mycart.component.css"],
    changeDetection: ChangeDetectionStrategy.OnPush,
  
})


export class MyCartComponent {
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
    cartProducts: Array<ProductCart> = [];
    cartSelectedProducts: Array<any> = [];
    totalSelectedAmount: number = 0;
    totalSelectedItem: number = 0;
    public hidden: boolean;

    isSelectAll: boolean = false;

    public titleState: TITLE_STATE;
    public _bar: BottomBar;
    public inactiveColor: string;
    public accentColor: string = "rgb(254, 204, 22)";

    formGroup: FormGroup;
  checkTest: boolean;

     notification: String = "You can access your personal offer, updates and price drop here";

     @ViewChild("CB1") FirstCheckBox: ElementRef;

     public itemsMenu: Array<BottomBarItem> = [
        new BottomBarItem(0, "Cart", "ic_home_black_24dp", "#9A9999")
      
    ];


     
    public constructor(private location: Location, private cooperativeService: CooperativeService, private cooperativeStaffService: CooperativeStaffService,
        private formBuilder: FormBuilder, private autoLogoutService: AutoLogoutService,
        private routerExtensions: RouterExtensions) {
      
    }

    ngAfterViewInit() {
        this.getCooperative();
    }

    public ngOnInit() {
        if(LS.getItem('mycartproducts'))
        {
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
              [Validators.required]
            ]
          });
    }

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
            //this.router.navigate(["/account"]);
         }
     }
    public toggleCheck() {
        this.FirstCheckBox.nativeElement.toggle();
    }
 
    public getCheckProp() {
        console.log('checked prop value = ' + this.FirstCheckBox.nativeElement.checked);
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

    productChecked(checkedProduct: Product,event)
    {
        console.log("Checked Product "+ checkedProduct);

        console.log("Event "+ event.checked);
    }

    public productcheckedChange(modelRef,productChecked:ProductCart) {
        //console.log("checkedChange: ", modelRef.checked);

        //console.log("Product Checked : ", JSON.stringify(productChecked));

       if(modelRef.checked)
       {

        for (let product of this.cartProducts) {
            // console.log(product); // 1, "string", false

            if(productChecked._id == product._id)
            {
                product.isSelected = true;
            }
           
         }
        //console.log("Product Checked : ", JSON.stringify(productChecked));
        
           //this.cartSelectedProducts.push(productChecked);

           //console.log("Items Selected: ", this.cartSelectedProducts);
       }else{
        //this.cartSelectedProducts.reduce(productChecked);

        // var index = this.cartSelectedProducts.indexOf(productChecked, 0);
        // if (index > -1) {
        //     this.cartSelectedProducts.splice(index, 1);
        // }

        //console.log("Items Selected remove: ", this.cartSelectedProducts);
        for (let product of this.cartProducts) {
            // console.log(product); // 1, "string", false

            if(productChecked._id == product._id)
            {
                product.isSelected = false;
            }
           
         }


       }

       
      this.getTotalWeight();
       
      }

      removefromCart( productChecked:ProductCart)
      {
          console.log("Selected Product Delete " + productChecked );
        TNSFancyAlert.showWarning("Warning!", "Are you sure you want to delete this item?", "Ok") .then( () => { /* user pressed the button */
             console.log("delete approved "+ productChecked)
            var index = this.cartProducts.indexOf(productChecked, 0);
            if (index > -1) {
                this.cartProducts.splice(index, 1);
            }

            LS.removeItem('mycartproducts');

        LS.setItem('mycartproducts',this.cartProducts);

            this.getTotalWeight();
        
        });


       

       
      }


      productcheckedAllChange(modelRef){

        console.log("Selected All " + modelRef);
         if(modelRef.checked)
         {
            
            for (let product of this.cartProducts) {
               // console.log(product); // 1, "string", false
               product.isSelected = true;
            }
         }else
         {
            // for (let product of this.cartProducts) {
            //     // console.log(product); // 1, "string", false
            //     product.isSelected = false;
            //  }
         }
         this.getTotalWeight();
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

    public oncooperativechange(args: SelectedIndexChangedEventData) {
        // console.log(`Drop Down selected index changed  ${args.oldIndex} to ${args.newIndex}. New value is "${this.sessionitems.getValue(
        //     args.newIndex)}"`);

        console.log("Selected ID " + args.newIndex);
        this.selectedCooperative = this.cooperativeList.getValue(args.newIndex);
        console.log("Selected Id Value  " + this.selectedCooperative);

    }


    public onqtychange(args: SelectedIndexChangedEventData,productChecked:ProductCart) {
        // console.log(`Drop Down selected index changed  ${args.oldIndex} to ${args.newIndex}. New value is "${this.sessionitems.getValue(
        //     args.newIndex)}"`);

        console.log("Selected ID " + args.newIndex);
        //this.selectedCooperative = this.productChecked.qtyList.getValue(args.newIndex);
        console.log("Selected Id Value  " + productChecked.qtyList.getValue(args.newIndex));
        let newqty = +productChecked.qtyList.getValue(args.newIndex);

        for (let product of this.cartProducts) {
            // console.log(product); // 1, "string", false

            if(productChecked._id == product._id)
            {
                product.qty = newqty;
                product.amount = product.price * newqty;
            }
           
         }
         
         this.getTotalWeight();


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

    getTotalWeight(): number {
        var total = 0;
        var selectedCount = 0;
        if (this.cartProducts != null && this.cartProducts.length > 0) {      
          this.cartProducts.forEach(x => {
              if(x.isSelected)
              {
                total += x.amount;
                selectedCount += 1;
              }
           
            
            });
        }

        this.totalSelectedAmount = total;
        this.totalSelectedItem = selectedCount;
        if(this.cartProducts.length == selectedCount )
        {
            this.isSelectAll = true;
        }else{
            this.isSelectAll = false;
        }

        LS.removeItem('mycartproducts');

        LS.setItem('mycartproducts',this.cartProducts);
        return total;
      }  

      
      navigateBack() {
        console.log("Go Back Button Clicked" );
        this.routerExtensions.backToPreviousPage();
    }

      onTouch(args: TouchGestureEventData) {

        console.log("Page is touched");
       this.autoLogoutService.reset();
    }

}