import { Component, OnInit, AfterViewInit, ChangeDetectionStrategy  } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { RouterExtensions } from "nativescript-angular/router";
import { Location } from "@angular/common";
import { SnackBar } from "nativescript-snackbar";
import * as ApplicationSettings from "application-settings";
import { connectionType, getConnectionType } from "connectivity";
import { Animation } from "ui/animation";
import { View } from "ui/core/view";
import { prompt,PromptResult, inputType } from "ui/dialogs";
import { Page } from "ui/page";
import { TextField } from "ui/text-field";
import * as textViewModule from "tns-core-modules/ui/text-view";
import { TouchGestureEventData } from "ui/gestures";


import { ValueList, DropDown } from "nativescript-drop-down";
import { SelectedIndexChangedEventData } from "nativescript-drop-down";
import { Cooperative } from '../../models/index';
import { CooperativeService } from "../../services/cooperative.service";
import { CooperativeStaffService } from "../../services/cooperativeStaff.service";
import { CooperCooperativeService } from "../../services/coopercooperative.service";
import { AuthService } from "../../services/auth.service";
import { ProductService } from "../../services/product.service";
import { CooperativeStaffAccountService } from "../../services/cooperativestaffaccount.service";


import { CooperativeStaff, VerifyAuth,ProductCart } from "../../models/index";

let LS = require( "nativescript-localstorage" );
import { TNSFancyAlert, TNSFancyAlertButton } from "nativescript-fancyalert";

import { Config } from "../../shared/config";
import { AutoLogoutService } from '../../services/autologout.service';


@Component({
    moduleId: module.id,
    selector: "ns-pay",
    templateUrl: "./pay.component.html",
    styleUrls: ["./pay-common.css", "./pay.component.css"],
    changeDetection: ChangeDetectionStrategy.OnPush,
  
})


export class PayComponent {
    productImageUrl: string  = Config.productImageURL;
    public input: any;
    selectedCooperativeIndex: number;
    selectedCooperative: string = "";
    staffId: String;
    cooperative: Array<Cooperative> = [];
    assignedcooperatives: Array<any> = [];
    hint: string = " 1";
    public cooperativeList: ValueList<string>;
    public cssClass: string = "default";
    cooperativeStaff: CooperativeStaff;
    verifyAuth: VerifyAuth;
    cartProducts: Array<ProductCart> = [];
    totalSelectedAmount: number;
    totalSelectedItem: number;
    userId: String;
    cooperId: String;


     notification: String = "You can access your personal offer, updates and price drop here";



     
    public constructor(private location: Location, private cooperativeService: CooperativeService, private cooperativeStaffService: CooperativeStaffService,
    private cooperCooperativeService:CooperCooperativeService, private authService:AuthService, private productService:ProductService,
    private cooperativeStaffAccountService:CooperativeStaffAccountService, private router: Router, private activatedRoute: ActivatedRoute,
    private routerExtensions: RouterExtensions,private autoLogoutService:AutoLogoutService
) {
        // this.input = {
        //     "firstname": "",
        //     "lastname": "",
        //     "email": "",
        //     "password": ""
        // }
    }

    ngAfterViewInit() {
        this.getCooperative();
    }

    public ngOnInit() {
        if(LS.getItem('mycartproducts'))
        {
            this.cartProducts = [];
            var mycartproducts = LS.getItem('mycartproducts');
            mycartproducts.forEach( (element) => {
                   if(element.isSelected)
                   {
                       console.log("Product Image " + element.productImage)
                    this.cartProducts.push(element);
                   }

            });


            //this.cartProducts = mycartproducts;

            this.getTotalWeight();
            
        }

        var dataObject = JSON.parse(LS.getItem('currentUser'));

       

        console.log("User ID " + dataObject._id);
          if(dataObject._id)
          {
              this.userId = dataObject._id;
              this.cooperId = dataObject.cooperId;
             
          }

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

          //this.getTotalWeight();
      
      });


     

     
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
        // if(this.cartProducts.length == selectedCount )
        // {
        //     this.isSelectAll = true;
        // }else{
        //     this.isSelectAll = false;
        // }

        LS.removeItem('mycartproducts');

        LS.setItem('mycartproducts',this.cartProducts);
        return total;
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

             this.getAllCooperativesAssigned(this.cooperId);



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


    getAllCooperativesAssigned(cooperId: String) {
        console.log("Staff and CooperativeId " + cooperId );


        this.cooperCooperativeService.getAllCooperativesCooper(cooperId).subscribe(
            data => {
                console.log("Assigned Cooperative " + data["data"]);

               this.assignedcooperatives = data["data"];

               
               this.cooperativeList = new ValueList<string>();
            //    for (let loop = 0; loop < this.cooperative.length; loop++) {
                   
            //    }

               for (let loop = 0; loop < this.cooperative.length; loop++) {
                   
          

                        this.assignedcooperatives.forEach((element)=>{

                             if(this.cooperative[loop].cooperativeId == element.cooperativeId)
                             {
                                this.cooperativeList.push({
                                    value: `${this.cooperative[loop].cooperativeId}`,
                                    display: `${this.cooperative[loop].first_name}`,
                                });
                             }

                        });

                    }

                    if(this.assignedcooperatives.length == 1)
                    {
                        this.selectedCooperative = this.assignedcooperatives[0].cooperativeId;
                    }

                    this.staffId = this.assignedcooperatives[0].staffId;
              



            },
            err => {
                TNSFancyAlert.showError("Error!", err.error.message, "Ok");
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





    pay(){

        if(this.selectedCooperative == "")
        {
         TNSFancyAlert.showError("Error!", "Please Select a Cooperative to continue", "Ok");
         return;
        }
        let options = {
            title: "Transaction PIN",
            defaultText: "",
            inputType: inputType.password,
            okButtonText: "Confirm",
            cancelButtonText: "Cancel"
        };

        prompt(options).then((result: PromptResult) => {

            console.log("Hello, " + result.text);


            this.checkUserPIn(this.userId,result.text);

            console.log("Selected Id Value  " + this.selectedCooperative);


        });
    }


    displayPromptDialog() {
        // >> prompt-dialog-code
       
        // << prompt-dialog-code
    }

    reduceProduct(productId: String,quantity : String, batchNo: String,cooperId:String,cooperativeId:String,staffId: String,transAmount: String ) {
        console.log("Verify " + productId);


        this.productService.deductProduct(productId,quantity,batchNo,cooperId,cooperativeId,staffId,transAmount).subscribe(
            data => {
                console.log("Product " + JSON.stringify(data["data"]));

               

            },
            err => {
                TNSFancyAlert.showError("Error!", err.error.message, "Ok");
                console.log(err);

            }
        );
    }

   
    reduceStaffAccount(cooperativeId: String,staffId : String, amount: String) {
        console.log("Cooperative Id " + cooperativeId);


        this.cooperativeStaffAccountService.deductCooperativeAccount(cooperativeId,staffId,amount,"Savings").subscribe(
            data => {
                console.log("Staff Account " + JSON.stringify(data["data"]));


                //Generate Batch No 6 Digit
               // let batchNo = Math.floor(Math.random());

                let batchNo = Math.floor(100000 + Math.random() * 900000)

                this.cartProducts.forEach((element) => {

                    this.reduceProduct(element._id,element.qty.toString(),batchNo.toString(),this.cooperId,this.selectedCooperative,this.staffId,element.amount.toString());

                });

                // empty Cart 

                LS.removeItem('mycartproducts');

                 this.cartProducts = [];


                 TNSFancyAlert.showSuccess("Success!", " Your transaction was successful", "Ok")
                 .then( () => { /* user pressed the button */
                
                    this.router.navigate(["/"]);

                });
                // Redirect to Home
                
               

            },
            err => {
                TNSFancyAlert.showError("Error!", err.error.message, "Ok");
                console.log(err);

            }
        );
    }



    checkUserPIn(userId: String, pin: String) {
        console.log("Verify " + userId);


        this.authService.checkTransPin(userId,pin).subscribe(
            data => {
                console.log("User Found " + JSON.stringify(data["data"]));

                   if(this.selectedCooperative == "")
                   {
                    TNSFancyAlert.showError("Error!", "Please Select a Cooperative to continue", "Ok");
                   }else{


                    this.reduceStaffAccount(this.selectedCooperative,this.staffId,this.totalSelectedAmount.toString());
                       
   



                    //  
                   }

            },
            err => {
                TNSFancyAlert.showError("Error!", err.error.message, "Ok");
                console.log(err);

            }
        );
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