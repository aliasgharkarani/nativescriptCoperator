import { Component,OnInit,AfterViewInit } from "@angular/core";
import { Location } from "@angular/common";
import { SnackBar } from "nativescript-snackbar";
import * as ApplicationSettings from "application-settings";
import { connectionType, getConnectionType } from "connectivity";
import { Animation } from "ui/animation";
import { View } from "ui/core/view";
import { prompt } from "ui/dialogs";
import { Page } from "ui/page";
import { TextField } from "ui/text-field";

import { ValueList, DropDown } from "nativescript-drop-down";
import { SelectedIndexChangedEventData } from "nativescript-drop-down";
import { Cooperative } from '../../models/index';

import {AuthService} from "../../services/auth.service";


import {CooperativeStaff,VerifyAuth} from "../../models/index";
let LS = require( "nativescript-localstorage" );

import { TNSFancyAlert } from "nativescript-fancyalert";

import { Router, ActivatedRoute } from "@angular/router";
import { RouterExtensions } from "nativescript-angular/router";

@Component({
    moduleId: module.id,
    selector: "ns-otp",
    templateUrl: "otp.component.html",
    styleUrls: ["./otp-common.css", "./otp.component.css"],
})

export class OtpComponent {

    public input: any;
    selectedCooperativeIndex: number ;
    selectedCooperative : string;
    staffId: String;
    cooperative: Array<Cooperative> = [];
    hint: string = "Select Cooperative";
    public cooperativeList: ValueList<string>;
    public cssClass: string      = "default";
    cooperativeStaff: CooperativeStaff;
    verifyAuth: VerifyAuth;
    userId: String;
    userMode: String;
    tpass: String;
    phoneNumber: String;

    public constructor(private page: Page,private location: Location, private authService: AuthService,private router: Router, private activatedRoute: ActivatedRoute,
        private routerExtensions: RouterExtensions) {
       
    }

    ngAfterViewInit() {
       
   }
   
     public ngOnInit() {

        this.page.actionBarHidden = true;

        var dataObject = JSON.parse(LS.getItem('currentUser'));

       

        console.log("User ID " + dataObject._id);
          if(dataObject._id)
          {
              this.userId = dataObject._id;
              this.userMode = dataObject.userMode;
             
          }

          if(dataObject.phoneNo)
          {
              this.phoneNumber = dataObject.phoneNo;
          }


     }
    public register() {
        // if(this.input.firstname && this.input.lastname && this.input.email && this.input.password) {
        //     ApplicationSettings.setString("account", JSON.stringify(this.input));
        //     this.location.back();
        // } else {
        //     (new SnackBar()).simple("All Fields Required!");
        // }

        console.log("Reaching Register " );

        
    }

    onNavBtnTap(){
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

      public oncooperativechange(args: SelectedIndexChangedEventData) {
        // console.log(`Drop Down selected index changed  ${args.oldIndex} to ${args.newIndex}. New value is "${this.sessionitems.getValue(
        //     args.newIndex)}"`);
      
        console.log("Selected ID " + args.newIndex );
            this.selectedCooperative = this.cooperativeList.getValue(args.newIndex);
            console.log("Selected Id Value  " +  this.selectedCooperative );
           
      }

      genarateNewToken(){
          this.sendOTP(this.userId);
      }


      verifyOTP(){
          this.getOTP(this.tpass, this.userId);
      }
     
      sendOTP(userId:String){
        console.log("Edit Phone Number "+  userId);
       

        this.authService.sendToken(userId).subscribe(
            data => { 
             console.log("OTP Send"+ JSON.stringify(data["data"]) );

             //send OTP

             TNSFancyAlert.showSuccess("Success!", "OTP sent", "Ok")
             .then( () => { /* user pressed the button */
            
                
            });
       
              },
              err => {
               console.log(err);

               TNSFancyAlert.showError("Error!", err.error.message, "Ok") .then( () => { /* user pressed the button */
            
                
             });
              
                 }
            );	  
    }

    getOTP(token:String,userId:String){
        console.log("Edit Phone Number "+  userId);
       

        this.authService.getToken(token,userId).subscribe(
            data => { 
             console.log("Get OTP Ok "+ JSON.stringify(data["data"]) );
            //    TNSFancyAlert.showSuccess("Success!", "Token Verified", "Ok")
            //  .then( () => { /* user pressed the button */ 
            // });
             //send OTP

             // Redirect to Change Pin

             var dataObject = JSON.parse(LS.getItem('currentUser'));

                console.log("User ID " + dataObject._id);
            if(dataObject.userTypeId === "Vendor")
            {
                if(this.userMode == "OTPVerify")
                {
                    LS.removeItem('currentUser');

                    LS.setItem('currentUser', JSON.stringify(data["data"]));


                    this.router.navigate(['/accountdetails']);
                }

                
            }else
            {

           



             if(this.userMode == "OTPVerify")
             {
                 LS.removeItem('currentUser');

                 LS.setItem('currentUser', JSON.stringify(data["data"]));

                 this.router.navigate(['/phoneverify']);
                // this.router.navigate(['/transpin']);
             }

             if(this.userMode == "TransPin")
             {
                 LS.removeItem('currentUser');

                 LS.setItem('currentUser', JSON.stringify(data["data"]));

                 this.router.navigate(['/']);
             }

            }

             if(this.userMode == "Confirm")
             {
                //  LS.removeItem('currentUser');

                //  LS.setItem('currentUser', JSON.stringify(data["data"]));

                 this.router.navigate(['/']);
             }


           
       
              },
              err => {
               console.log(err);

               TNSFancyAlert.showError("Error!", err.error.message, "Ok") .then( () => { /* user pressed the button */
            
                
             });
              
                 }
            );	  
    }

    navigateBack() {
        console.log("Go Back Button Clicked" );
        this.routerExtensions.backToPreviousPage();
        //this.router.navigate(["/"]);
    }
    
      

}