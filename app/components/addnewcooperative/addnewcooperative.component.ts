import { Component, OnInit, AfterViewInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { Location } from "@angular/common";
import { Router, ActivatedRoute, CanActivate } from "@angular/router";
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
import { CooperativeService } from "../../services/cooperative.service";
import { CooperativeStaffService } from "../../services/cooperativeStaff.service";

import { CooperativeStaff, VerifyAuth } from "../../models/index";

import {MemberService} from "../../services/member.service";
import {CooperCooperativeService} from "../../services/coopercooperative.service"


import { TNSFancyAlert } from "nativescript-fancyalert";
let LS = require( "nativescript-localstorage" );
import { TouchGestureEventData } from "ui/gestures";
import { AutoLogoutService } from '../../services/autologout.service';
import { BottomNavigation, BottomNavigationTab, OnTabSelectedEventData } from 'nativescript-bottom-navigation';

@Component({
    moduleId: module.id,
    selector: "ns-addnewcooperative",
    templateUrl: "./addnewcooperative.component.html",
    styleUrls: ["./addnewcooperative-common.css", "./addnewcooperative.component.css"],
})


export class AddNewCooperativeComponent {

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
    cooperId : String = "";
    userId: String;

    public constructor(private location: Location, private cooperativeService: CooperativeService, private cooperativeStaffService: CooperativeStaffService,
    private memberService:MemberService, private router: Router, private canActivate: ActivatedRoute,private cooperCooperativeService:CooperCooperativeService,
    private routerExtensions: RouterExtensions, private autoLogoutService: AutoLogoutService) {
       
    }

    ngAfterViewInit() {
        this.getCooperative();
    }

    public ngOnInit() {

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

    public oncooperativechange(args: SelectedIndexChangedEventData) {
        // console.log(`Drop Down selected index changed  ${args.oldIndex} to ${args.newIndex}. New value is "${this.sessionitems.getValue(
        //     args.newIndex)}"`);

        console.log("Selected ID " + args.newIndex);
        this.selectedCooperative = this.cooperativeList.getValue(args.newIndex);
        console.log("Selected Id Value  " + this.selectedCooperative);

    }

    add()
    {

        this.getCooperativeStaff(this.staffId, this.selectedCooperative,"Additions");
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

    getCooperativeStaff(staffId:String,cooperativeId:String, mode: String ){
        console.log("Staff and CooperativeId "+  staffId + " - " + cooperativeId);
       

        this.memberService.getCooperativeStaff(staffId,cooperativeId,mode,"","cooperator").subscribe(
            data => { 
             console.log("Cooperative Staff "+ JSON.stringify(data["data"]) );
                this.addCooperCooperative(cooperativeId,staffId,this.cooperId);
              },
              err => {
               console.log(JSON.stringify(err));
               TNSFancyAlert.showError("Error!", err.error.message, "Ok") .then( () => { /* user pressed the button */
            
                
             });
              
                 }
            );	  
    }


    addCooperCooperative(cooperativeId:String,staffId:String, cooperId: String ){
       
       

        this.cooperCooperativeService.addCooperCooperative(cooperativeId,staffId,cooperId).subscribe(
            data => { 
             
            



             TNSFancyAlert.showSuccess("Success!", "Cooperative added successfuly", "Ok")
             .then( () => { /* user pressed the button */
            
                this.router.navigate(['/account']);
               
            });



          
             
              },
              err => {
               console.log(JSON.stringify(err));
               TNSFancyAlert.showError("Error!", err.error.message, "Ok") .then( () => { /* user pressed the button */
            
               
             });
              
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

    navigateBack() {
        console.log("Go Back Button Clicked" );
        this.routerExtensions.backToPreviousPage();
    }

    onTouch(args: TouchGestureEventData) {

        console.log("Page is touched");
       this.autoLogoutService.reset();
    }

    onBottomNavigationTabSelected(args: OnTabSelectedEventData): void {
        console.log(`Tab selected:  ${args.oldIndex}`);
    
      
        if(args.newIndex == 0)
        {
          // this.router.navigate([""]);
          //this.maintab.nativeElement.selectedIndex  = 0;
        }
        else if(args.newIndex == 1)
        {
           this.router.navigate(["/approve"]);
        }
        else if(args.newIndex == 2)
        {
            
           // this.maintab.nativeElement.selectedIndex  = 1;
           //this.router.navigate(["/shop"]);
        }
        else if(args.newIndex == 3)
        {
           this.router.navigate(["/account"]);
        }
      }

}