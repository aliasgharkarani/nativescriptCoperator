import { Component, OnInit, AfterViewInit } from "@angular/core";
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

import { ValueList, DropDown } from "nativescript-drop-down";
import { SelectedIndexChangedEventData } from "nativescript-drop-down";
import { Cooperative } from '../../models/index';


import { AuthService } from "../../services/auth.service";
import { MemberService } from "../../services/member.service";

import { CooperativeStaff, VerifyAuth } from "../../models/index";
let LS = require( "nativescript-localstorage" );

import { TNSFancyAlert } from "nativescript-fancyalert";

import { RouterExtensions } from "nativescript-angular/router";

@Component({
    moduleId: module.id,
    selector: "ns-settransaction",
    templateUrl: "./settransaction.component.html",
    styleUrls: ["./settransaction-common.css", "./settransaction.component.css"],
})


export class SetTransactionComponent {

    public input: any;
    selectedCooperativeIndex: number;
    selectedCooperative: string;
    staffId: String;
    cooperative: Array<Cooperative> = [];
    hint: string = "Select Cooperative";
    public cooperativeList: ValueList<string>;
    public cssClass: string = "default";
    cooperativeStaff: CooperativeStaff;
    verifyAuth: VerifyAuth;
    pin: String;
    cpin: String;
    userId: String;
    userMode: String;

    public constructor(private page:Page,private location: Location, private authService:AuthService, private memberService:MemberService,private router: Router, private activatedRoute: ActivatedRoute,
        private routerExtensions: RouterExtensions) {
        this.input = {
            "firstname": "",
            "lastname": "",
            "email": "",
            "password": ""
        }
    }

    ngAfterViewInit() {
       
    }

    public ngOnInit() {
        this.page.actionBarHidden = true;
        var dataObject = JSON.parse(LS.getItem('currentUser'));

        console.log("User ID  on TransPIN " + dataObject._id);
          if(dataObject._id)
          {
              this.userId = dataObject._id;
              this.userMode = dataObject.userMode;
             
          }


    }
    public register() {
        
        console.log("Reaching Register ");

      
    }

    onNavBtnTap() {
        // This code will be called only in Android.
        console.log("Navigation button tapped!");
    }

    next(){

        if(this.pin.length < 4 )
        {
            TNSFancyAlert.showError("Error!", "The minimum length of Trans Pin is 4 digit", "Ok") ;
           return; 
        }

       

        console.log("User Id for setPin " + this.userId)
        this.setPin(this.userId,this.pin,this.pin);
    }

    nextpre(){

        if(this.pin.length < 4 || this.cpin.length < 4 )
        {
            TNSFancyAlert.showError("Error!", "The minimum length of Trans Pin is 4 digit", "Ok") ;
           return; 
        }

        if(this.pin != this.cpin)
        {
            TNSFancyAlert.showError("Error!", "Your transaction did not match", "Ok") ;
           return; 
        }

        console.log("User Id for setPin " + this.userId)
        this.setPin(this.userId,this.pin,this.cpin);
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

    setPin(userId:String, pin: String, confirmPin:String){
        console.log("Set Pin Id "+  userId);
       

        this.memberService.changePin(userId,pin,confirmPin).subscribe(
            data => { 
             console.log("Change Pin "+ JSON.stringify(data["data"]) );

             //send OTP
              this.sendOTP(userId);

              console.log("Set Pin User Mode "+ this.userMode);
             if(this.userMode == "TransPin")
             {
                 LS.removeItem('currentUser');

                 LS.setItem('currentUser', JSON.stringify(data["data"]));

                 this.router.navigate(['/otp']);
             }

             if(this.userMode == "Confirm")
             {
                 LS.removeItem('currentUser');

                 LS.setItem('currentUser', JSON.stringify(data["data"]));

                 this.router.navigate(['/otp']);
             }

              },
              err => {
               console.log(err);

               TNSFancyAlert.showError("Error!", err.error.message, "Ok") .then( () => { /* user pressed the button */
            
                
               });
              
                 }
            );	  
    }
    

    sendOTP(userId:String){
        console.log("Sent Trans Pin OTp "+  userId);
       

        this.authService.sendToken(userId).subscribe(
            data => { 
             console.log("OTP Send"+ JSON.stringify(data["data"]) );

             //send OTP
       
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