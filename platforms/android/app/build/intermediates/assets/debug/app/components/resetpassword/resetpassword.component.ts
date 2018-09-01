import { Component, OnInit } from "@angular/core";
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


import { alert } from "../../shared";

import { Cooperative } from '../../models/index';
import {CooperativeService} from "../../services/cooperative.service";
import {AuthService} from "../../services/auth.service";


@Component({
    moduleId: module.id,
    selector: "app-resetpassword",
    templateUrl: "./resetpassword.component.html",
    styleUrls: ["./resetpassword-common.css", "./resetpassword.component.css"],
})


export class ResetPasswordComponent implements OnInit {

    public input: any;
    returnUrl: string;
    username: string;
    password: string;
    confirm: string;

    public constructor(private router: RouterExtensions,private page: Page, private cooperativeService: CooperativeService, private authService:AuthService,
        private route: ActivatedRoute,
        
       ) {
        this.input = {
            "email": "",
            "password": ""
        }
    }


    public ngOnInit() {
        this.page.actionBarHidden = true;
        // if(ApplicationSettings.getBoolean("authenticated", false)) {
        //     this.router.navigate(["/secure"], { clearHistory: true });
        // }

        // this.getCooperative();
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';


    }

    resetPassword(){
        this.forgetPassword(this.username);
    }

    forgetPassword(username: string){
        console.log("User Email "+  username);
       

        this.authService.forgetPassword(username).subscribe(
            data => { 
             console.log("User name "+ JSON.stringify(data["data"]) );
       
              // Redirect to OTP
              this.router.navigate(["/otp"]);
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

}

