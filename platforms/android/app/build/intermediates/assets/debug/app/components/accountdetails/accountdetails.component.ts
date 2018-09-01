import { Component, OnInit, AfterViewInit, ChangeDetectionStrategy  } from "@angular/core";
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
import { BankService } from "../../services/bank.service";

import { MemberService } from "../../services/member.service";

import { TNSFancyAlert } from "nativescript-fancyalert";

import { CooperativeStaff, VerifyAuth,Bank } from "../../models/index";
let LS = require( "nativescript-localstorage" );

import { Router, ActivatedRoute } from "@angular/router";

@Component({
    moduleId: module.id,
    selector: "ns-accountdetails",
    templateUrl: "./accountdetails.component.html",
    styleUrls: ["./accountdetails-common.css", "./accountdetails.component.css"],
    changeDetection: ChangeDetectionStrategy.OnPush,
  
})


export class AccountDetailsComponent {

    public input: any;
    selectedBankIndex: number;
    selectedBank: string;
    staffId: String;
    cooperative: Array<Cooperative> = [];
    hint: string = " 1";
    public cooperativeList: ValueList<string>;
    public cssClass: string = "default";
    cooperativeStaff: CooperativeStaff;
    verifyAuth: VerifyAuth;
    accountName: String;
    accountNo: String;
    banks: Array<Bank> = [];
    public bankDrop: ValueList<string>;

    userId: String;
    cooperId: String;

     notification: String = "You can access your personal offer, updates and price drop here";


     
    public constructor(private location: Location, private cooperativeService: CooperativeService, private cooperativeStaffService: CooperativeStaffService,
    private bankService:BankService, private memberService: MemberService,private router: Router, private activatedRoute: ActivatedRoute) {
       
    }

    ngAfterViewInit() {
        //this.getCooperative();
        
    }

    public ngOnInit() {
        var dataObject = JSON.parse(LS.getItem('currentUser'));

       
        console.log("User ID " + dataObject._id);
          if(dataObject._id)
          {
              this.userId = dataObject._id;
              this.cooperId = dataObject.cooperId;
             
          }
          this.getBanks();
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

    updateAccount()
    {
        this.setAccountDetails(this.userId,this.accountNo,this.accountName,this.selectedBank);
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

    public onBankChange(args: SelectedIndexChangedEventData) {
        // console.log(`Drop Down selected index changed  ${args.oldIndex} to ${args.newIndex}. New value is "${this.sessionitems.getValue(
        //     args.newIndex)}"`);

        console.log("Selected ID " + args.newIndex);
        this.selectedBank = this.bankDrop.getValue(args.newIndex);
        console.log("Selected Id Value  " + this.selectedBank);

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


    
    getBanks( ){
       
    

        this.bankService.getAllBanks().subscribe(
            data => { 
    
                // console.log("Account Balances from DB " + JSON.stringify(data["data"]));
                this.banks = data["data"];

                this.bankDrop = new ValueList<string>();
                for ( let loop = 0; loop < this.banks.length; loop++ ) {
                this.bankDrop.push({ value:   `${this.banks[loop]._id}`,
                        display: `${this.banks[loop].bankName}`,
                    });
                }
     
                console.log("Banks " + JSON.stringify(this.bankDrop));
             
       
             
              },
              err => {
               console.log(JSON.stringify(err));
               
              
                 }
            );	  
    }


    setAccountDetails(userId:String, accountnumber: String, accountname:String, bankId: String){
        console.log("Set Pin Id "+  userId);
       

        this.memberService.setAccountDetails(userId,accountnumber,accountname,bankId).subscribe(
            data => { 
             console.log("Change Pin "+ JSON.stringify(data["data"]) );

             //send OTP
               

                 TNSFancyAlert.showSuccess("Success!", "Account Details was added successfuly", "Ok")
                 .then( () => { /* user pressed the button */ 
                    this.router.navigate(['/']);


                });

              },
              err => {
               console.log(err);

               TNSFancyAlert.showError("Error!", err.error.message, "Ok") .then( () => { /* user pressed the button */
            
                
               });
              
                 }
            );	  
    }
    

    

}