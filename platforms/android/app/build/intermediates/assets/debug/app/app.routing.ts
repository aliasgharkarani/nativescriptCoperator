import { NgModule } from "@angular/core";
import { ModuleWithProviders }  from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes ,RouterModule} from "@angular/router";



import {LoginComponent} from "./components/login/login.component";
import {RegisterComponent} from "./components/register/register.component";
import {HomeComponent} from "./components/home/home.component";
import {SecureComponent} from "./components/secure/secure.component";
import { AuthGuard } from "./auth-guard.service";
import {PasswordComponent} from "./components/password/password.component";
import {ChangePassword2Component} from "./components/changepassword2/changepassword2.component";
import {VerifyNumberComponent} from "./components/verifynumber/verifynumber.component";
import {OtpComponent} from "./components/otp/otp.component";
import {SetTransactionComponent} from "./components/settransaction/settransaction.component";
import {ResetPasswordComponent} from "./components/resetpassword/resetpassword.component";
import {AddNewCooperativeComponent} from "./components/addnewcooperative/addnewcooperative.component";
import {AccountComponent} from "./components/account/account.component";
import {BuyComponent} from "./components/buy/buy.component";
import {BuyNewComponent} from "./components/buynew/buynew.component";



import{ShopComponent} from "./components/shop/shop.component";
import{MyCartComponent} from "./components/mycart/mycart.component";
import{PayComponent} from "./components/pay/pay.component";
import {AccountDetailsComponent} from "./components/accountdetails/accountdetails.component";
import {ProfileComponent} from "./components/profile/profile.component";
import {Profile1Component} from "./components/profile1/profile1.component";

import {AddNewProductComponent} from "./components/addnewproduct/addnewproduct.component";
import {AddNewSeatComponent} from "./components/addnewseat/addnewseat.component";
import {PaymentComponent} from "./components/payment/payment.component";
import {ShopCategoryComponent} from "./components/shopcategory/shopcategory.component";
import {ShopCatalogueComponent} from "./components/shopcatalogue/shopcatalogue.component";

import {VendorRegisterComponent} from "./components/vendor/vendor.component";
import {PhoneVerifyComponent} from "./components/phoneverify/phoneverify.component";
import {LandpageComponent} from "./components/landpage/landpage.component";
import {SuccessTransComponent} from "./components/transactionsuccess/transactionsuccess.component";

// { path: "", redirectTo: "/login", pathMatch: "full" },
const routes: Routes = [
    { path: "", component: HomeComponent,canActivate: [AuthGuard], pathMatch: 'full' },

    { path: "login", component: ProfileComponent },
    { path: "landingpage", component: LandpageComponent },
    { path: "register", component: RegisterComponent },
    { path: "password", component: PasswordComponent },
   
    { path: "secure", component: SecureComponent,canActivate: [AuthGuard], },
    { path: "resetpassword", component: ResetPasswordComponent },
    { path: "changepassword", component: ChangePassword2Component },
    { path: "verifyphone", component: VerifyNumberComponent, },
    { path: "otp", component: OtpComponent },
    { path: "transpin", component: SetTransactionComponent},
    { path: "addcooperative", component: AddNewCooperativeComponent,canActivate: [AuthGuard], },
    { path: "account", component: AccountComponent,canActivate: [AuthGuard], },
  
    { path: "shop", component: ShopComponent,canActivate: [AuthGuard], },
    { path: "buy/:id", component: BuyComponent ,canActivate: [AuthGuard],},
    { path: "buynew", component: BuyNewComponent ,canActivate: [AuthGuard]},
    { path: "buy", component: BuyComponent ,canActivate: [AuthGuard],},
    { path: "mycart", component: MyCartComponent,canActivate: [AuthGuard], },
    { path: "pay", component: PayComponent,canActivate: [AuthGuard], },
    { path: "accountdetails", component: AccountDetailsComponent,canActivate: [AuthGuard], },
    { path: "addnewproduct", component: AddNewProductComponent ,canActivate: [AuthGuard],},
    { path: "addnewseat", component: AddNewSeatComponent,canActivate: [AuthGuard], },
    { path: "payment", component: PaymentComponent ,canActivate: [AuthGuard],},
    { path: "shopcategory", component: ShopCategoryComponent,canActivate: [AuthGuard], },
    { path: "shopcatalogue/:id", component: ShopCatalogueComponent,canActivate: [AuthGuard], },
    { path: "profile", component: ProfileComponent },
    { path: "vendor", component: VendorRegisterComponent },
    { path: "phoneverify", component: PhoneVerifyComponent },
    { path: "transactionsuccess", component: SuccessTransComponent },

    
    
    

    
    
    
    
    
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }