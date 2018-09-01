import { Component, OnInit,ViewContainerRef } from "@angular/core";

import { Router, ActivatedRoute } from "@angular/router";
import { Color } from "color";
import { isAndroid,isIOS, device, screen  } from "platform";

import { connectionType, getConnectionType } from "connectivity";
import { Animation } from "ui/animation";
import { View } from "ui/core/view";
import { prompt } from "ui/dialogs";
import { Page } from "ui/page";
import { TextField } from "ui/text-field";


import { alert } from "../../shared";

import {AuditTrail, Cooperative } from '../../models/index';
import {CooperativeService} from "../../services/cooperative.service";
import {AuthService} from "../../services/auth.service";
import { AuditTrailService } from "../../services/audittrail.service";

import { TNSFancyAlert } from "nativescript-fancyalert";

 import {LoadingIndicator} from "nativescript-loading-indicator";
 import {SystemConfiguration} from "../../models/index";

var loader = new LoadingIndicator();


import * as application from "application";
import { AndroidApplication, AndroidActivityBackPressedEventData } from "application";





// import * as dialogs from "ui/dialogs";
// import { ModalDialogService,ModalDialogOptions } from "nativescript-angular/directives/dialogs";
// import { ModalComponent } from "../../app.modal";
var options = {
    message: 'Loading...',
    progress: 0.65,
    android: {
      indeterminate: true,
      cancelable: true,
      cancelListener: function(dialog) { console.log("Loading cancelled") },
      max: 100,
      progressNumberFormat: "%1d/%2d",
      progressPercentFormat: 0.53,
      progressStyle: 1,
      secondaryProgress: 1,
      color: "#4B9ED6", // color of indicator and labels
    },
    ios: {
      details: "Additional detail note!",
      margin: 10,
      dimBackground: true,
      color: "#4B9ED6", // color of indicator and labels
      // background box around indicator
      // hideBezel will override this if true
      backgroundColor: "yellow",
      userInteractionEnabled: false, // default true. Set false so that the touches will fall through it.
      hideBezel: true, // default false, can hide the surrounding bezel
    //   view: UIView, // Target view to show on top of (Defaults to entire window)
    //   mode: // see iOS specific options below
    }
  };

  class DeviceInfo {
    constructor(
        public model: string,
        public deviceType: string,
        public os: string,
        public osVersion: string,
        public sdkVersion: string,
        public language: string,
        public manufacturer: string,
        public uuid: string
    ) { }
}

class ScreenInfo {
  constructor(
      public heightDIPs: number,
      public heightPixels: number,
      public scale: number,
      public widthDIPs: number,
      public widthPixels: number
  ) { }
}

@Component({
    moduleId: module.id,
    selector: "ns-login",
    templateUrl: "./login.component.html",
    styleUrls: ["./login-common.css", "./login.component.css"],
})


export class LoginComponent implements OnInit {

    public input: any;
    returnUrl: string;
    username: string;
    password: string;
    systemConfig: SystemConfiguration;

    public deviceInformation: DeviceInfo = {"model":"","deviceType":"","os":"","osVersion":"","sdkVersion":"","language":"","manufacturer":"","uuid":""};
  
    public screenInformation: ScreenInfo = {"heightDIPs":0,"heightPixels":0,"scale":0,"widthDIPs":0,"widthPixels":0};

    auditTrail: AuditTrail = {"cooperId":"","ipAddress":"", "loginTime":"","sessionTime":"","location":"","model":"","deviceType":"","os":"","osVersion":"","sdkVersion":"","language":"","manufacturer":"","uuid":"","heightDIPs":0,"heightPixels":0,"scale":0,"widthDIPs":0,"widthPixels":0};
  

    

    // private modal: ModalDialogService, private vcRef: ViewContainerRef 

    public constructor(private route: ActivatedRoute,private router: Router,private page: Page, private cooperativeService: CooperativeService, private authService:AuthService,
       
       private auditTrailService:AuditTrailService 
       ) {
       
        this.deviceInformation = new DeviceInfo(
          device.model,
          device.deviceType,
          device.os,
          device.osVersion,
          device.sdkVersion,
          device.language,
          device.manufacturer,
          device.uuid);

          this.screenInformation = new ScreenInfo(
            screen.mainScreen.heightDIPs,
            screen.mainScreen.heightPixels,
            screen.mainScreen.scale,
            screen.mainScreen.widthDIPs,
            screen.mainScreen.widthPixels);
    

         // console.log("Device UUID " + this.deviceInformation.model);


          // this.auditTrail.model = this.deviceInformation.model;
          // this.auditTrail.os = this.deviceInformation.os;
          // this.auditTrail.osVersion = this.deviceInformation.osVersion;
          // this.auditTrail.sdkVersion = this.deviceInformation.sdkVersion;
          // this.auditTrail.language = this.deviceInformation.language;
          // this.auditTrail.manufacturer = this.deviceInformation.manufacturer;
          // this.auditTrail.uuid = this.deviceInformation.uuid;
          // this.auditTrail.heightDIPs = this.screenInformation.heightDIPs;
          // this.auditTrail.heightPixels = this.screenInformation.heightPixels;
          // this.auditTrail.scale = this.screenInformation.scale;
          // this.auditTrail.widthDIPs = this.screenInformation.widthDIPs;
          // this.auditTrail.widthPixels = this.screenInformation.widthPixels;

    }


    public ngOnInit() {
        this.page.actionBarHidden = true;
        // if(ApplicationSettings.getBoolean("authenticated", false)) {
        //     this.router.navigate(["/secure"], { clearHistory: true });
        // }

        // this.getCooperative();
        //this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

        console.log("Routing to page " +  this.returnUrl);

      
        if (!isAndroid) {
            return;
          }
          application.android.on(AndroidApplication.activityBackPressedEvent, (data: AndroidActivityBackPressedEventData) => {
            // if (this.router.isActive("/login", false)) {
            //   data.cancel = true; // prevents default back button behavior
            //   //this.logout();

            //   this.router.navigate(["/login"]);

            // }
            if (this.router.isActive("/", false)) {
              data.cancel = true; // prevents default back button behavior
              //this.logout();

              //this.router.navigate(["/login"]);

            }
            // if (this.router.isActive("/shop", false)) {
            //   data.cancel = true; // prevents default back button behavior
            //   //this.logout();

            //   //this.router.navigate(["/login"]);

            // }

            // if (this.router.isActive("/buy", false)) {
            //   data.cancel = true; // prevents default back button behavior
            //   this.router.navigate(["/"]);
            // }
          });

        
         // alert("Device Model " + this.deviceInformation.model);

         console.log("Device UUID " + this.auditTrail.model);

     
            this.auditTrail.model = device.model;

          this.auditTrail.deviceType = device.deviceType;
          this.auditTrail.os = device.os;
          this.auditTrail.osVersion = device.osVersion;
          this.auditTrail.sdkVersion = device.sdkVersion;
          this.auditTrail.language = device.language;
          this.auditTrail.manufacturer = device.manufacturer;
          this.auditTrail.uuid = device.uuid;
          this.auditTrail.heightDIPs = screen.mainScreen.heightDIPs;
          this.auditTrail.heightPixels = screen.mainScreen.heightPixels;
          this.auditTrail.scale = screen.mainScreen.scale;
          this.auditTrail.widthDIPs = screen.mainScreen.widthDIPs;
          this.auditTrail.widthPixels = screen.mainScreen.widthPixels;



        }
       

    // public login() {
    //     if(this.input.email && this.input.password) {
    //         let account = JSON.parse(ApplicationSettings.getString("account", "{}"));
    //         if(this.input.email == account.email && this.input.password == account.password) {
    //             ApplicationSettings.setBoolean("authenticated", true);
    //             this.router.navigate(["/secure"], { clearHistory: true });
    //         } else {
    //             (new SnackBar()).simple("Incorrect Credentials!");
    //         }
    //     } else {
    //         (new SnackBar()).simple("All Fields Required!");
    //     }
    // }

    login() {
        if (getConnectionType() === connectionType.none) {
         // alert("Cooper Switch requires an internet connection to log in.");

          TNSFancyAlert.showError("Error!", "Cooper Switch requires an internet connection to log in.", "Ok");
          return;
        }
        //this.loading = true;
        loader.show(options);
        console.log("Login Reaching " + this.username + " Password" + this.password);
        this.authService.login(this.username, this.password)
            .subscribe(
                data => {
                  //this.isAuthenticating = false;
                /// console.log("login data " + data);

                 this.auditTrail.cooperId = this.username;

                 this.createAuditTrail();
                 ///this.authService.checkRegistration();
                  this.router.navigate([this.returnUrl]);
                  loader.hide();
                },
                error => {
                    //this.alertService.error(error);

                    TNSFancyAlert.showError("Error!", error.error.message, "Ok");
            
                    console.log("Error " + JSON.stringify(error) );
                    loader.hide();
                    //  this.isAuthenticating = false;
                    // this.loading = false;
                });
    }
    

    getCooperative(){
        this.cooperativeService.getAllCooperative().subscribe(
            data => { 
             console.log("Cooperative List "+ JSON.stringify(data["data"]) );
       
        
              
               
              },
              err => {
               console.log(err);
              
                 }
            );	  
    }

    getSystemConfig(){
        this.authService.systemconfig().subscribe(
            data => { 
             console.log("System Config "+ JSON.stringify(data["data"]) );
       
             this.systemConfig = data["data"][0];
              
               
              },
              err => {
               console.log(err);
              
                 }
            );	  
    }
    startBackgroundAnimation(background) {
        background.animate({
          scale: { x: 1.0, y: 1.0 },
          duration: 10000
        });
      }


      createAuditTrail(){
        console.log("Reaching Audit Trail ");
        this.auditTrailService.createAuditTrail(this.auditTrail).subscribe(
            data => { 
             console.log("Audit Trail "+ JSON.stringify(data["data"]) );
       
        
              
               
              },
              err => {
               console.log(err);
              
                 }
            );	  
    }



    //   public showModal() {

    //     const options: ModalDialogOptions = {
    //         viewContainerRef: this.vcRef,
    //         context: {},
    //         fullscreen: false,
    //     };
    //     let options2 = {
    //         context: {},
          
    //         viewContainerRef: this.vcRef,
    //         fullscreen: false,
    //     };
    //     this.modal.showModal(ModalComponent, options).then(res => {
    //         console.log(res);
    //     });

    // }


    

}

