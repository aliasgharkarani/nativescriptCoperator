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
import {CooperativeService} from "../../services/cooperative.service";
import {CooperativeStaffService} from "../../services/cooperativeStaff.service";

import {CooperativeStaff,VerifyAuth} from "../../models/index";

@Component({
    moduleId: module.id,
    selector: "ns-payment",
    templateUrl: "payment.component.html",
    styleUrls: ["./payment.component.css"],
})

export class PaymentComponent {

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

    public constructor(private location: Location, private cooperativeService:CooperativeService, private cooperativeStaffService:CooperativeStaffService) {
        this.input = {
            "firstname": "",
            "lastname": "",
            "email": "",
            "password": ""
        }
    }

    ngAfterViewInit() {
        this.getCooperative();
   }
   
     public ngOnInit() {

     }
    public register() {
        // if(this.input.firstname && this.input.lastname && this.input.email && this.input.password) {
        //     ApplicationSettings.setString("account", JSON.stringify(this.input));
        //     this.location.back();
        // } else {
        //     (new SnackBar()).simple("All Fields Required!");
        // }

        console.log("Reaching Register " );

        this.getCooperativeStaff(this.staffId,this.selectedCooperative);
    }

    onNavBtnTap(){
        // This code will be called only in Android.
        console.log("Navigation button tapped!");
    }

    pay(){
        
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

      getCooperative(){
        this.cooperativeService.getAllCooperative().subscribe(
            data => { 
             console.log("Cooperative List "+ JSON.stringify(data["data"]) );
       
             this.cooperative = data["data"];

             this.cooperativeList = new ValueList<string>();
             for ( let loop = 0; loop < this.cooperative.length; loop++ ) {
               this.cooperativeList.push({ value:   `${this.cooperative[loop].cooperativeId}`,
                     display: `${this.cooperative[loop].first_name}`,
                 });
             }
         
              
               
              },
              err => {
               console.log(err);
              
                 }
            );	  
    }

    getCooperativeStaff(staffId:String,cooperativeId:String){
        console.log("Staff and CooperativeId "+  staffId + " - " + cooperativeId);
       

        this.cooperativeStaffService.getCooperativeStaff(staffId,cooperativeId).subscribe(
            data => { 
             console.log("Cooperative Staff "+ JSON.stringify(data["data"]) );
       
             this.cooperativeStaff = data["data"];

             console.log("Verifying Staff out side " + this.cooperativeStaff.staffId);
             this.sendVerifyAuth(this.cooperativeStaff);

          
             
              },
              err => {
               console.log(err);
              
                 }
            );	  
    }

    sendVerifyAuth(verifyAuth: CooperativeStaff){
        console.log("Verify "+  verifyAuth.staffId);
       

        this.cooperativeStaffService.verifyAuthToCreatLater(verifyAuth).subscribe(
            data => { 
             console.log("Very Auth "+ JSON.stringify(data["data"]) );
       
             

              },
              err => {
               console.log(err);
              
                 }
            );	  
    }
      

}