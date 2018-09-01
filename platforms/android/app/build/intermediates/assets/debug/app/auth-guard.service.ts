import { Injectable } from "@angular/core";

import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';


@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        console.log("Current User State " + localStorage.getItem('currentUser'));
        if (localStorage.getItem('currentUser')) {
            
    //         var dataObject = JSON.parse(localStorage.getItem('currentUser'));

    //   console.log("User has login " + dataObject);

        var dataObject = JSON.parse(localStorage.getItem('currentUser'));


            if(dataObject.userMode == "New")
            {
                //this.router.navigate(['/changepassword']);
                this.router.navigate(['/password']);
            }

            if(dataObject.userMode == "PhoneVerify")
            {
                this.router.navigate(['/verifyphone']);
            }

            if(dataObject.userMode == "OTPVerify")
            {
                this.router.navigate(['/otp']);
            }
            if(dataObject.userMode == "TransPin")
            {
                this.router.navigate(['/transpin']);
            }
            
            // logged in so return true
            return true;
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/landingpage'], { queryParams: { returnUrl: state.url }});
        return false;
    }



    
}



