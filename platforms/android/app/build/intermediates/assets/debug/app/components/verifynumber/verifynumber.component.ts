import { Component,OnInit,AfterViewInit } from "@angular/core";
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

import {MemberService} from "../../services/member.service";
import {AuthService} from "../../services/auth.service";

import {CooperativeStaff,VerifyAuth} from "../../models/index";
let LS = require( "nativescript-localstorage" );
@Component({
    moduleId: module.id,
    selector: "ns-verifynumber",
    templateUrl: "verifynumber.component.html",
    styleUrls: ["./verifynumber-common.css", "./verifynumber.component.css"],
})

export class VerifyNumberComponent {

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
    phoneNumber: String = "08060933727";
    isedit: boolean = false;
    userId: String;
    userMode: String;

    public constructor(private location: Location, private memberService:MemberService,private authService:AuthService,private router: Router, private activatedRoute: ActivatedRoute) {
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

     enablePhoneText()
     {
         this.isedit = !this.isedit;
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

   


    editPhoneNumber(userId:String, phoneNo: String){
        console.log("Edit Phone Number "+  userId);
       

        this.memberService.editPhoneNumber(userId,phoneNo).subscribe(
            data => { 
             console.log("Very Auth "+ JSON.stringify(data["data"]) );

             //send OTP
              this.sendOTP(userId);
             if(this.userMode == "PhoneVerify")
             {
                 LS.removeItem('currentUser');

                 LS.setItem('currentUser', JSON.stringify(data["data"]));

                 this.router.navigate(['/otp']);
             }

              },
              err => {
               console.log(err);
              
                 }
            );	  
    }
    

    sendOTP(userId:String){
        console.log("Edit Phone Number "+  userId);
       

        this.authService.sendToken(userId).subscribe(
            data => { 
             console.log("OTP Send"+ JSON.stringify(data["data"]) );

             //send OTP
       
              },
              err => {
               console.log(err);
              
                 }
            );	  
    }
    sendcode(){

        this.editPhoneNumber(this.userId,this.phoneNumber);
        
    }
      

}