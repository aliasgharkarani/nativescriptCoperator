import { Component, OnInit,ViewContainerRef } from "@angular/core";

import { Router, ActivatedRoute } from "@angular/router";
import { Color } from "color";

import { connectionType, getConnectionType } from "connectivity";
import { Animation } from "ui/animation";
import { View } from "ui/core/view";
import { prompt } from "ui/dialogs";
import { Page } from "ui/page";
import { TextField } from "ui/text-field";


//import { alert } from "../../shared";

//import { Cooperative } from '../../models/index';
import {CooperativeService} from "../../services/cooperative.service";
import {AuthService} from "../../services/auth.service";

// import { TNSFancyAlert } from "nativescript-fancyalert";

//  import {LoadingIndicator} from "nativescript-loading-indicator";

// var loader = new LoadingIndicator();

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

@Component({
  moduleId: module.id,
  selector: "ns-landpage",
  templateUrl: "./landpage.component.html",
  styleUrls: ["./landpage-common.css", "./landpage.component.css"]
})
export class LandpageComponent implements OnInit {
  // public input: any;
  // returnUrl: string;
  // username: string;
  // password: string;

  // private modal: ModalDialogService, private vcRef: ViewContainerRef

  public constructor(
    private route: ActivatedRoute,
    private router: Router,
    private page: Page,
    private cooperativeService: CooperativeService,
    private authService: AuthService,
    private _page: Page,
  ) {
    // this.input = {
    //     "email": "",
    //     "password": ""
    // }
  }

  public ngOnInit() {
    this._page.actionBarHidden = true;
    // this.page.actionBarHidden = true;
    // // if(ApplicationSettings.getBoolean("authenticated", false)) {
    // //     this.router.navigate(["/secure"], { clearHistory: true });
    // // }

    // // this.getCooperative();
    // //this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

    // this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

    // console.log("Routing to page " +  this.returnUrl);
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

  // login() {
  //     if (getConnectionType() === connectionType.none) {
  //      // alert("Cooper Switch requires an internet connection to log in.");

  //       TNSFancyAlert.showError("Error!", "Cooper Switch requires an internet connection to log in.", "Ok");
  //       return;
  //     }
  //     //this.loading = true;
  //     loader.show(options);
  //     console.log("Login Reaching " + this.username + " Password" + this.password);
  //     this.authService.login(this.username, this.password)
  //         .subscribe(
  //             data => {
  //               //this.isAuthenticating = false;
  //              // console.log("login data " + data);
  //               this.router.navigate([this.returnUrl]);
  //               loader.hide();
  //             },
  //             error => {
  //                 //this.alertService.error(error);

  //                 TNSFancyAlert.showError("Error!", error.error.message, "Ok");

  //                 console.log("Error " + JSON.stringify(error) );
  //                 loader.hide();
  //                 //  this.isAuthenticating = false;
  //                 // this.loading = false;
  //             });
  // }

  // getCooperative(){
  //     this.cooperativeService.getAllCooperative().subscribe(
  //         data => {
  //          console.log("Cooperative List "+ JSON.stringify(data["data"]) );

  //           },
  //           err => {
  //            console.log(err);

  //              }
  //         );
  // }

  startBackgroundAnimation(background) {
    background.animate({
      scale: { x: 1.0, y: 1.0 },
      duration: 10000
    });
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

