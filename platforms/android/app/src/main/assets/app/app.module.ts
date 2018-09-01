import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { AppRoutingModule } from "./app.routing";

import { ReactiveFormsModule } from "@angular/forms";

import { NativeScriptHttpModule } from "nativescript-angular/http";
import { NativeScriptHttpClientModule } from "nativescript-angular/http-client";
import { HttpClientModule } from '@angular/common/http';
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { AppComponent } from "./app.component";


import {CooperativeService} from "./services/cooperative.service";
import {CooperativeStaffService} from "./services/cooperativeStaff.service";
import {AuthService} from "./services/auth.service";
import {AutoLogoutService} from "./services/autologout.service";

import {MemberService} from "./services/member.service";
import {CooperCooperativeService} from "./services/coopercooperative.service";
import {CategoryService} from "./services/category.service";




import { AuthGuard } from "./auth-guard.service";

import {LoginComponent} from "./components/login/login.component";
import {RegisterComponent} from "./components/register/register.component";
import {HomeComponent} from "./components/home/home.component";
import {SecureComponent} from "./components/secure/secure.component";
import {PasswordComponent} from "./components/password/password.component";

import {ResetPasswordComponent} from "./components/resetpassword/resetpassword.component";
import {ChangePassword2Component} from "./components/changepassword2/changepassword2.component";
import {ChangePasswordComponent} from "./components/changepassword/changepassword.component";
import {VerifyNumberComponent} from "./components/verifynumber/verifynumber.component";
import {OtpComponent} from "./components/otp/otp.component";
import {SetTransactionComponent} from "./components/settransaction/settransaction.component";
import {ProfileComponent} from "./components/profile/profile.component";
import {Profile1Component} from "./components/profile1/profile1.component";
import {AddNewCooperativeComponent} from "./components/addnewcooperative/addnewcooperative.component";
import {AccountComponent} from "./components/account/account.component";
import {MyCartComponent} from "./components/mycart/mycart.component";
import {PayComponent} from "./components/pay/pay.component";
import {BuyComponent} from "./components/buy/buy.component";
import {AccountDetailsComponent} from "./components/accountdetails/accountdetails.component";
import {AddNewProductComponent} from "./components/addnewproduct/addnewproduct.component";
import {AddNewSeatComponent} from "./components/addnewseat/addnewseat.component";
import {PaymentComponent} from "./components/payment/payment.component";
import {ShopCategoryComponent} from "./components/shopcategory/shopcategory.component";
import {ShopCatalogueComponent} from "./components/shopcatalogue/shopcatalogue.component";
import {VendorRegisterComponent} from "./components/vendor/vendor.component";




import { enableProdMode } from '@angular/core';
import { TNSFontIconModule,TNSFontIconService } from 'nativescript-ngx-fonticon';
import { DropDownModule } from "nativescript-drop-down/angular";
import { GridViewModule } from 'nativescript-grid-view/angular';
import { ModalDialogService } from "nativescript-angular/modal-dialog";
import{ShopComponent} from "./components/shop/shop.component";


import { ProductService } from "./services/product.service";
import { AuditTrailService } from "./services/audittrail.service";
import { SlidesModule } from 'nativescript-ngx-slides';
import {SponsorProductService} from "./services/sponsorproduct.service";
import {AdvertService} from "./services/advert.service";
import {ComplaintService} from "./services/complaints.service";

import { CooperativeStaffAccountService } from "./services/cooperativestaffaccount.service";
import { TransactionService } from "./services/transaction.service";
import {ProductViewService} from "./services/productview.service";
import {BankService} from "./services/bank.service";


import { TNSCheckBoxModule } from 'nativescript-checkbox/angular';
import { MinLengthDirective, IsEmailDirective } from "./input.directive";
import { NativescriptBottomNavigationModule} from "nativescript-bottom-navigation/angular";
import { ModalComponent } from "./components/modal";
import { AccordionModule } from "nativescript-accordion/angular";
import {BuyNewComponent} from "./components/buynew/buynew.component";
import {PhoneVerifyComponent} from "./components/phoneverify/phoneverify.component";
import {LandpageComponent} from "./components/landpage/landpage.component";
import {SuccessTransComponent} from "./components/transactionsuccess/transactionsuccess.component";





// turn debug on
TNSFontIconService.debug = true;

enableProdMode();

// Uncomment and add to NgModule imports if you need to use two-way binding
// import { NativeScriptFormsModule } from "nativescript-angular/forms";

// Uncomment and add to NgModule imports  if you need to use the HTTP wrapper
// import { NativeScriptHttpModule } from "nativescript-angular/http";

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptCommonModule, NativeScriptModule,NativeScriptHttpModule,NativeScriptHttpClientModule,NativeScriptFormsModule,
        AppRoutingModule,DropDownModule,GridViewModule,SlidesModule,TNSCheckBoxModule,ReactiveFormsModule,
        NativescriptBottomNavigationModule,HttpClientModule,AccordionModule,TNSFontIconModule.forRoot({
			'fa': './assets/font-awesome.css',
			'ion': './assets/ionicons.css'
		})
    ],
    declarations: [
        AppComponent,
        LoginComponent,
        RegisterComponent,
        SecureComponent,
        HomeComponent,
        PasswordComponent,
       
        ResetPasswordComponent,
        ModalComponent,
        ChangePassword2Component,
        VerifyNumberComponent,
        OtpComponent,
        SetTransactionComponent,
        ProfileComponent,
        Profile1Component,
        ChangePasswordComponent,
        AddNewCooperativeComponent,
        AccountComponent,
        BuyNewComponent,
        ShopComponent,
      
        MyCartComponent,
        PayComponent,
        BuyComponent,
        AccountDetailsComponent,MinLengthDirective, IsEmailDirective,
        AddNewProductComponent,AddNewSeatComponent,PaymentComponent,
        ShopCategoryComponent,ShopCatalogueComponent,VendorRegisterComponent,
        PhoneVerifyComponent,
        LandpageComponent,SuccessTransComponent
       
   
        
        
    ],
    entryComponents: [ModalComponent],
    providers: [
        AuthGuard,CooperativeService,CooperativeStaffService,AuthService,MemberService,ModalDialogService,CooperCooperativeService,
        CategoryService,ProductService,SponsorProductService,AdvertService,CooperativeStaffAccountService,TransactionService,
        ProductViewService,BankService,AutoLogoutService,ComplaintService,AuditTrailService
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
/*
Pass your application module to the bootstrapModule function located in main.ts to start your app
*/
export class AppModule { }
