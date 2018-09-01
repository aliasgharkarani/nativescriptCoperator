import { Injectable } from "@angular/core";
import { Router } from '@angular/router'
// import {} from ''
// const store = require('store');

import { TNSFancyAlert } from "nativescript-fancyalert";
import { AuthService } from "../services/auth.service";
import { SystemConfiguration } from '../models/index';
var MINUTES_UNITL_AUTO_LOGOUT = 5 // in mins
const CHECK_INTERVAL = 15000 // in ms
const STORE_KEY =  'lastAction';
@Injectable()
export class AutoLogoutService {
sysConfig: Array<SystemConfiguration>;
 public getLastAction() {
    return parseInt(localStorage.getItem(STORE_KEY));
  }
 public setLastAction(lastAction: number) {
    localStorage.setItem(STORE_KEY, lastAction.toString());
  }

  constructor(private router: Router, private  authService: AuthService) {
    console.log('object created');
    // this.auth = authService;
    this.check();
    //this.initListener();
    this.initInterval();

    this.getSystemConfig();
    // localStorage.setItem(STORE_KEY,Date.now().toString());
  }

  initListener() {
    document.body.addEventListener('click', () => this.reset());
    document.body.addEventListener('mouseover',()=> this.reset());
    document.body.addEventListener('mouseout',() => this.reset());
    document.body.addEventListener('keydown',() => this.reset());
    document.body.addEventListener('keyup',() => this.reset());
    document.body.addEventListener('keypress',() => this.reset());
    document.body.addEventListener('tap',() => this.reset());
  }

  reset() {
    this.setLastAction(Date.now());
  }

  initInterval() {
    setInterval(() => {
      this.check();
    }, CHECK_INTERVAL);
  }

  check() {
    const now = Date.now();
    const timeleft = this.getLastAction() + MINUTES_UNITL_AUTO_LOGOUT * 60 * 1000;
    const diff = timeleft - now;
    const isTimeout = diff < 0;

    // if (isTimeout && this.auth.loggedIn)
    if (isTimeout)  {
      // alert('logout');
      //localStorage.clear();
      localStorage.removeItem('lastAction');

      TNSFancyAlert.showWarning("Session!", "Your session has expired, please login to continue. ", "Ok") .then( () => { /* user pressed the button */
        
      
   });

   localStorage.removeItem('currentUser');
   localStorage.removeItem('currentUserToken');
      this.router.navigate(['./login']);
    }
  }


  getSystemConfig() {
   


    this.authService.systemconfig().subscribe(
        data => {
           
            console.log("System Config Data  " + JSON.stringify(data["data"]));
            this.sysConfig = data["data"];
            
            if(this.sysConfig.length > 0)
            {
              MINUTES_UNITL_AUTO_LOGOUT = +this.sysConfig[0].sessionTime;
            }
           


           
            

        },
        err => {
            console.log(err);

        }
    );
}
}