import { Component, OnInit,ChangeDetectorRef,ChangeDetectionStrategy,NgZone,ViewChild,ElementRef  } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { SnackBar } from "nativescript-snackbar";
import * as ApplicationSettings from "application-settings";

import { Router, ActivatedRoute } from "@angular/router";
import { Color } from "color";

import { connectionType, getConnectionType } from "connectivity";
import { Animation } from "ui/animation";
import { View } from "ui/core/view";
import { prompt } from "ui/dialogs";
import { Page } from "ui/page";
import { TextField } from "ui/text-field";
import { TouchGestureEventData } from "ui/gestures";

import { alert } from "../../shared";

import { Cooperative } from '../../models/index';
import {CooperativeService} from "../../services/cooperative.service";
import {AuthService} from "../../services/auth.service";
import { BottomNavigation, BottomNavigationTab, OnTabSelectedEventData } from 'nativescript-bottom-navigation';

import {LoadingIndicator} from "nativescript-loading-indicator";

var loader = new LoadingIndicator();
let LS = require( "nativescript-localstorage" );


import { TNSFancyAlert, TNSFancyAlertButton } from "nativescript-fancyalert";
import { AutoLogoutService } from '../../services/autologout.service';



@Component({
    moduleId: module.id,
    selector: "ns-account",
    templateUrl: "./account.component.html",
    styleUrls: ["./account-common.css", "./account.component.css"],
})


export class AccountComponent implements OnInit {

    public input: any;
    returnUrl: string;
    token: string;
    password: string;

    hasImage: boolean = false;
    loginImage64: String;
  
    currentUser: {"cooperId": "","phoneNo": "","firstName": "","lastName": "","email": "","profilePixURL":""};
    userId: String;
    cooperId: String;

    @ViewChild('bottomNavigation') bottomBar: ElementRef;

    public constructor(private router: RouterExtensions,private page: Page, private cooperativeService: CooperativeService, private authService:AuthService,
        private route: ActivatedRoute,private routerExtensions: RouterExtensions,
        private _changeDetectionRef: ChangeDetectorRef,
        private zone: NgZone, private autoLogoutService: AutoLogoutService
        
       ) {
      
    }


    public ngOnInit() {
        // this.page.actionBarHidden = true;
        // if(ApplicationSettings.getBoolean("authenticated", false)) {
        //     this.router.navigate(["/secure"], { clearHistory: true });
        // }

        // this.getCooperative();
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

        var dataObject = JSON.parse(LS.getItem('currentUser'));
        console.log("Profile log " + JSON.stringify(dataObject));
        if(dataObject._id)
          {
              this.userId = dataObject._id;
              this.cooperId = dataObject.cooperId;
              this.loginImage64 = dataObject.profilePixURL;

              if(this.loginImage64)
              {
                  this.hasImage = true;
              }
             
          }
        this.currentUser = dataObject;


    }

    

     startBackgroundAnimation(background) {
        background.animate({
          scale: { x: 1.0, y: 1.0 },
          duration: 10000
        });
      }

      bottomNavigationLoaded(args: OnTabSelectedEventData)
      {
       //this.bottomBar.nativeElement.on('tabSelected', 2);
       this.bottomBar.nativeElement.selectTab(3);
      }

      onBottomNavigationTabSelected(args: OnTabSelectedEventData): void {
        console.log(`Tab selected:  ${args.oldIndex}`);

        if(args.newIndex == 0)
        {
           this.router.navigate([""]);
        }
        else if(args.newIndex == 1)
        {
           this.router.navigate(["/approve"]);
        }
        else if(args.newIndex == 2)
        {
           this.router.navigate(["/shop"]);
        }
        else if(args.newIndex == 3)
        {
           this.router.navigate(["/account"]);
        }
      }

      navigateBack() {
        console.log("Go Back Button Clicked" );
        this.routerExtensions.backToPreviousPage();
    }

    logout(): void {
        // clear token remove user from local storage to log user out
        
        localStorage.removeItem('currentUser');
        localStorage.removeItem('currentUserToken');
        
        this.router.navigate(['/login']);
    
    }

    onTouch(args: TouchGestureEventData) {

        console.log("Page is touched");
       this.autoLogoutService.reset();
    }

}

