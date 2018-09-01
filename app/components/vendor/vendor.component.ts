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
import { Cooperative, User } from '../../models/index';
import {CooperativeService} from "../../services/cooperative.service";
import {CooperativeStaffService} from "../../services/cooperativeStaff.service";

import {MemberService} from "../../services/member.service";

import {CooperativeStaff,VerifyAuth} from "../../models/index";

import { TNSFancyAlert } from "nativescript-fancyalert";
import { RouterExtensions } from "nativescript-angular/router";

@Component({
    moduleId: module.id,
    selector: "ns-vendor",
    templateUrl: "vendor.component.html",
    styleUrls: ["./vendor-common.css", "./vendor.component.css"],
})

export class VendorRegisterComponent {

    public input: any;
    selectedCooperativeIndex: number ;
    selectedCooperative : string;
    staffId: String;
    businessName: String;
    businessEmail: String;
    cooperative: Array<Cooperative> = [];
    hint: string = "Select Cooperative";
    public cooperativeList: ValueList<string>;
    public cssClass: string      = "default";
    cooperativeStaff: User;
    verifyAuth: VerifyAuth;
    public hidden: boolean;
    // public titleState: TITLE_STATE;
    // public _bar: BottomBar;
    public inactiveColor: string;
    public accentColor: string;

    public constructor(private location: Location, private cooperativeService:CooperativeService, private cooperativeStaffService:CooperativeStaffService,
        private memberService: MemberService, private route: ActivatedRoute, private router: Router, private _page: Page,
        private routerExtensions: RouterExtensions) {
        
    }

    ngAfterViewInit() {
        this.getCooperative();
   }
   
     public ngOnInit() {
         //this._page.actionBarHidden = true;
     }
    public register() {
        // if(this.input.firstname && this.input.lastname && this.input.email && this.input.password) {
        //     ApplicationSettings.setString("account", JSON.stringify(this.input));
        //     this.location.back();
        // } else {
        //     (new SnackBar()).simple("All Fields Required!");
        // }

        console.log("Reaching Register " );

        this.getCooperativeStaff(this.staffId,this.selectedCooperative,"","cooperator");
    }

    public registerVendor() {
        // if(this.input.firstname && this.input.lastname && this.input.email && this.input.password) {
        //     ApplicationSettings.setString("account", JSON.stringify(this.input));
        //     this.location.back();
        // } else {
        //     (new SnackBar()).simple("All Fields Required!");
        // }

        console.log("Reaching Register Vendor " );

        this.getCooperativeStaff(this.businessEmail,"0",this.businessName,"vendor");
    }

    onNavBtnTap(){
        // This code will be called only in Android.
        console.log("Navigation button tapped!");
    }

    public goBack() {
        this.location.back();
    }

    // tabLoaded(event) {
//     this._bar = <BottomBar>event.object;
//     this.hidden = false;
//     this.titleState = TITLE_STATE.SHOW_WHEN_ACTIVE;
//     this.inactiveColor = "white";
//     this.accentColor = "blue";
// }

//  tabSelected(args: SelectedIndexChangedEventData) {
//      // only triggered when a different tab is tapped
//      console.log(args.newIndex);
//  }

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

    getCooperativeStaff(staffId:String,cooperativeId:String,name:String, userType: String){
        console.log("Staff and CooperativeId "+  staffId + " - " + cooperativeId);
       

        this.memberService.getCooperativeStaff(staffId,cooperativeId,"New",name,userType).subscribe(
            data => { 
             console.log("Cooperative Staff "+ JSON.stringify(data["data"]) );
       
             this.cooperativeStaff = data["data"];

             TNSFancyAlert.showSuccess("Success!", "Check your email for temporary password", "Ok")
             .then( () => { /* user pressed the button */
            
                this.router.navigate(['/login']);
               console.log("Redirect to Change Password");
            });

             console.log("Verifying Staff out side " + this.cooperativeStaff._id);
           //  this.sendVerifyAuth(this.cooperativeStaff);

          
             
              },
              err => {
               console.log(JSON.stringify(err));
               TNSFancyAlert.showError("Error!", err.error.message, "Ok") .then( () => { /* user pressed the button */
            
                console.log("Redirect to Change Password");
             });
              
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

    public showSuccess() {
        TNSFancyAlert.showSuccess("Success!", "Something finished successfully.", "Ok");
    }

    public showError() {
        TNSFancyAlert.showError("Error!", "Oh no, something went wrong.", "Dismiss");
    }

    public showCustomImage() {
        TNSFancyAlert.showAnimationType = TNSFancyAlert.SHOW_ANIMATION_TYPES.SlideInFromBottom;
        TNSFancyAlert.hideAnimationType = TNSFancyAlert.HIDE_ANIMATION_TYPES.SlideOutToTop;
        TNSFancyAlert.showCustomImage("polyglot_developer.png", "#911E25", "Custom Image", "Use your own images in an alert!", "Dismiss");
    }

    navigateBack() {
        console.log("Go Back Button Clicked" );
        this.routerExtensions.backToPreviousPage();
        //this.router.navigate(["/"]);
    }
      

}