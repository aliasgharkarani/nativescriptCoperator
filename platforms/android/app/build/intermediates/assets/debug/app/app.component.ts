import { Component,OnInit } from "@angular/core";
import { BottomNavigation, BottomNavigationTab, OnTabSelectedEventData } from 'nativescript-bottom-navigation';
import { AutoLogoutService } from './services/autologout.service';
import { TouchGestureEventData } from "ui/gestures";
@Component({
    selector: "ns-app",
    templateUrl: "app.component.html",
})

export class AppComponent {

     constructor(private autoLogoutService:AutoLogoutService){

     }
    onBottomNavigationTabSelected(args: OnTabSelectedEventData): void {
        console.log(`Tab selected:  ${args.oldIndex}`);
      }

      onTouch(args: TouchGestureEventData) {

        console.log("Page is touched");
       this.autoLogoutService.reset();
    }
 }
