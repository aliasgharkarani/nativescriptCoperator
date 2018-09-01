"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("nativescript-angular/router");
var register_component_1 = require("./components/register/register.component");
var home_component_1 = require("./components/home/home.component");
var secure_component_1 = require("./components/secure/secure.component");
var auth_guard_service_1 = require("./auth-guard.service");
var password_component_1 = require("./components/password/password.component");
var changepassword2_component_1 = require("./components/changepassword2/changepassword2.component");
var verifynumber_component_1 = require("./components/verifynumber/verifynumber.component");
var otp_component_1 = require("./components/otp/otp.component");
var settransaction_component_1 = require("./components/settransaction/settransaction.component");
var resetpassword_component_1 = require("./components/resetpassword/resetpassword.component");
var addnewcooperative_component_1 = require("./components/addnewcooperative/addnewcooperative.component");
var account_component_1 = require("./components/account/account.component");
var buy_component_1 = require("./components/buy/buy.component");
var buynew_component_1 = require("./components/buynew/buynew.component");
var shop_component_1 = require("./components/shop/shop.component");
var mycart_component_1 = require("./components/mycart/mycart.component");
var pay_component_1 = require("./components/pay/pay.component");
var accountdetails_component_1 = require("./components/accountdetails/accountdetails.component");
var profile_component_1 = require("./components/profile/profile.component");
var addnewproduct_component_1 = require("./components/addnewproduct/addnewproduct.component");
var addnewseat_component_1 = require("./components/addnewseat/addnewseat.component");
var payment_component_1 = require("./components/payment/payment.component");
var shopcategory_component_1 = require("./components/shopcategory/shopcategory.component");
var shopcatalogue_component_1 = require("./components/shopcatalogue/shopcatalogue.component");
var vendor_component_1 = require("./components/vendor/vendor.component");
var phoneverify_component_1 = require("./components/phoneverify/phoneverify.component");
var landpage_component_1 = require("./components/landpage/landpage.component");
var transactionsuccess_component_1 = require("./components/transactionsuccess/transactionsuccess.component");
// { path: "", redirectTo: "/login", pathMatch: "full" },
var routes = [
    { path: "", component: home_component_1.HomeComponent, canActivate: [auth_guard_service_1.AuthGuard], pathMatch: 'full' },
    { path: "login", component: profile_component_1.ProfileComponent },
    { path: "landingpage", component: landpage_component_1.LandpageComponent },
    { path: "register", component: register_component_1.RegisterComponent },
    { path: "password", component: password_component_1.PasswordComponent },
    { path: "secure", component: secure_component_1.SecureComponent, canActivate: [auth_guard_service_1.AuthGuard], },
    { path: "resetpassword", component: resetpassword_component_1.ResetPasswordComponent },
    { path: "changepassword", component: changepassword2_component_1.ChangePassword2Component },
    { path: "verifyphone", component: verifynumber_component_1.VerifyNumberComponent, },
    { path: "otp", component: otp_component_1.OtpComponent },
    { path: "transpin", component: settransaction_component_1.SetTransactionComponent },
    { path: "addcooperative", component: addnewcooperative_component_1.AddNewCooperativeComponent, canActivate: [auth_guard_service_1.AuthGuard], },
    { path: "account", component: account_component_1.AccountComponent, canActivate: [auth_guard_service_1.AuthGuard], },
    { path: "shop", component: shop_component_1.ShopComponent, canActivate: [auth_guard_service_1.AuthGuard], },
    { path: "buy/:id", component: buy_component_1.BuyComponent, canActivate: [auth_guard_service_1.AuthGuard], },
    { path: "buynew", component: buynew_component_1.BuyNewComponent, canActivate: [auth_guard_service_1.AuthGuard] },
    { path: "buy", component: buy_component_1.BuyComponent, canActivate: [auth_guard_service_1.AuthGuard], },
    { path: "mycart", component: mycart_component_1.MyCartComponent, canActivate: [auth_guard_service_1.AuthGuard], },
    { path: "pay", component: pay_component_1.PayComponent, canActivate: [auth_guard_service_1.AuthGuard], },
    { path: "accountdetails", component: accountdetails_component_1.AccountDetailsComponent, canActivate: [auth_guard_service_1.AuthGuard], },
    { path: "addnewproduct", component: addnewproduct_component_1.AddNewProductComponent, canActivate: [auth_guard_service_1.AuthGuard], },
    { path: "addnewseat", component: addnewseat_component_1.AddNewSeatComponent, canActivate: [auth_guard_service_1.AuthGuard], },
    { path: "payment", component: payment_component_1.PaymentComponent, canActivate: [auth_guard_service_1.AuthGuard], },
    { path: "shopcategory", component: shopcategory_component_1.ShopCategoryComponent, canActivate: [auth_guard_service_1.AuthGuard], },
    { path: "shopcatalogue/:id", component: shopcatalogue_component_1.ShopCatalogueComponent, canActivate: [auth_guard_service_1.AuthGuard], },
    { path: "profile", component: profile_component_1.ProfileComponent },
    { path: "vendor", component: vendor_component_1.VendorRegisterComponent },
    { path: "phoneverify", component: phoneverify_component_1.PhoneVerifyComponent },
    { path: "transactionsuccess", component: transactionsuccess_component_1.SuccessTransComponent },
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.NativeScriptRouterModule.forRoot(routes)],
            exports: [router_1.NativeScriptRouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
exports.AppRoutingModule = AppRoutingModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLnJvdXRpbmcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhcHAucm91dGluZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUF5QztBQUV6QyxzREFBdUU7QUFNdkUsK0VBQTJFO0FBQzNFLG1FQUErRDtBQUMvRCx5RUFBcUU7QUFDckUsMkRBQWlEO0FBQ2pELCtFQUEyRTtBQUMzRSxvR0FBZ0c7QUFDaEcsMkZBQXVGO0FBQ3ZGLGdFQUE0RDtBQUM1RCxpR0FBNkY7QUFDN0YsOEZBQTBGO0FBQzFGLDBHQUFzRztBQUN0Ryw0RUFBd0U7QUFDeEUsZ0VBQTREO0FBQzVELHlFQUFxRTtBQUlyRSxtRUFBOEQ7QUFDOUQseUVBQW9FO0FBQ3BFLGdFQUEyRDtBQUMzRCxpR0FBNkY7QUFDN0YsNEVBQXdFO0FBR3hFLDhGQUEwRjtBQUMxRixxRkFBaUY7QUFDakYsNEVBQXdFO0FBQ3hFLDJGQUF1RjtBQUN2Riw4RkFBMEY7QUFFMUYseUVBQTZFO0FBQzdFLHdGQUFvRjtBQUNwRiwrRUFBMkU7QUFDM0UsNkdBQW1HO0FBRW5HLHlEQUF5RDtBQUN6RCxJQUFNLE1BQU0sR0FBVztJQUNuQixFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsU0FBUyxFQUFFLDhCQUFhLEVBQUMsV0FBVyxFQUFFLENBQUMsOEJBQVMsQ0FBQyxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUU7SUFFbEYsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBRSxvQ0FBZ0IsRUFBRTtJQUM5QyxFQUFFLElBQUksRUFBRSxhQUFhLEVBQUUsU0FBUyxFQUFFLHNDQUFpQixFQUFFO0lBQ3JELEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUUsc0NBQWlCLEVBQUU7SUFDbEQsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLFNBQVMsRUFBRSxzQ0FBaUIsRUFBRTtJQUVsRCxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLGtDQUFlLEVBQUMsV0FB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QztZQUNuRCxPQUFPLEVBQUUsQ0FBQyxpQ0FBd0IsQ0FBQztTQUN0QyxDQUFDO09BQ1csZ0JBQWdCLENBQUk7SUFBRCx1QkFBQztDQUFBLEFBQWpDLElBQWlDO0FBQXBCLDRDQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IE1vZHVsZVdpdGhQcm92aWRlcnMgfSAgZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdFJvdXRlck1vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXJcIjtcbmltcG9ydCB7IFJvdXRlcyAsUm91dGVyTW9kdWxlfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XG5cblxuXG5pbXBvcnQge0xvZ2luQ29tcG9uZW50fSBmcm9tIFwiLi9jb21wb25lbnRzL2xvZ2luL2xvZ2luLmNvbXBvbmVudFwiO1xuaW1wb3J0IHtSZWdpc3RlckNvbXBvbmVudH0gZnJvbSBcIi4vY29tcG9uZW50cy9yZWdpc3Rlci9yZWdpc3Rlci5jb21wb25lbnRcIjtcbmltcG9ydCB7SG9tZUNvbXBvbmVudH0gZnJvbSBcIi4vY29tcG9uZW50cy9ob21lL2hvbWUuY29tcG9uZW50XCI7XG5pbXBvcnQge1NlY3VyZUNvbXBvbmVudH0gZnJvbSBcIi4vY29tcG9uZW50cy9zZWN1cmUvc2VjdXJlLmNvbXBvbmVudFwiO1xuaW1wb3J0IHsgQXV0aEd1YXJkIH0gZnJvbSBcIi4vYXV0aC1ndWFyZC5zZXJ2aWNlXCI7XG5pbXBvcnQge1Bhc3N3b3JkQ29tcG9uZW50fSBmcm9tIFwiLi9jb21wb25lbnRzL3Bhc3N3b3JkL3Bhc3N3b3JkLmNvbXBvbmVudFwiO1xuaW1wb3J0IHtDaGFuZ2VQYXNzd29yZDJDb21wb25lbnR9IGZyb20gXCIuL2NvbXBvbmVudHMvY2hhbmdlcGFzc3dvcmQyL2NoYW5nZXBhc3N3b3JkMi5jb21wb25lbnRcIjtcbmltcG9ydCB7VmVyaWZ5TnVtYmVyQ29tcG9uZW50fSBmcm9tIFwiLi9jb21wb25lbnRzL3ZlcmlmeW51bWJlci92ZXJpZnludW1iZXIuY29tcG9uZW50XCI7XG5pbXBvcnQge090cENvbXBvbmVudH0gZnJvbSBcIi4vY29tcG9uZW50cy9vdHAvb3RwLmNvbXBvbmVudFwiO1xuaW1wb3J0IHtTZXRUcmFuc2FjdGlvbkNvbXBvbmVudH0gZnJvbSBcIi4vY29tcG9uZW50cy9zZXR0cmFuc2FjdGlvbi9zZXR0cmFuc2FjdGlvbi5jb21wb25lbnRcIjtcbmltcG9ydCB7UmVzZXRQYXNzd29yZENvbXBvbmVudH0gZnJvbSBcIi4vY29tcG9uZW50cy9yZXNldHBhc3N3b3JkL3Jlc2V0cGFzc3dvcmQuY29tcG9uZW50XCI7XG5pbXBvcnQge0FkZE5ld0Nvb3BlcmF0aXZlQ29tcG9uZW50fSBmcm9tIFwiLi9jb21wb25lbnRzL2FkZG5ld2Nvb3BlcmF0aXZlL2FkZG5ld2Nvb3BlcmF0aXZlLmNvbXBvbmVudFwiO1xuaW1wb3J0IHtBY2NvdW50Q29tcG9uZW50fSBmcm9tIFwiLi9jb21wb25lbnRzL2FjY291bnQvYWNjb3VudC5jb21wb25lbnRcIjtcbmltcG9ydCB7QnV5Q29tcG9uZW50fSBmcm9tIFwiLi9jb21wb25lbnRzL2J1eS9idXkuY29tcG9uZW50XCI7XG5pbXBvcnQge0J1eU5ld0NvbXBvbmVudH0gZnJvbSBcIi4vY29tcG9uZW50cy9idXluZXcvYnV5bmV3LmNvbXBvbmVudFwiO1xuXG5cblxuaW1wb3J0e1Nob3BDb21wb25lbnR9IGZyb20gXCIuL2NvbXBvbmVudHMvc2hvcC9zaG9wLmNvbXBvbmVudFwiO1xuaW1wb3J0e015Q2FydENvbXBvbmVudH0gZnJvbSBcIi4vY29tcG9uZW50cy9teWNhcnQvbXljYXJ0LmNvbXBvbmVudFwiO1xuaW1wb3J0e1BheUNvbXBvbmVudH0gZnJvbSBcIi4vY29tcG9uZW50cy9wYXkvcGF5LmNvbXBvbmVudFwiO1xuaW1wb3J0IHtBY2NvdW50RGV0YWlsc0NvbXBvbmVudH0gZnJvbSBcIi4vY29tcG9uZW50cy9hY2NvdW50ZGV0YWlscy9hY2NvdW50ZGV0YWlscy5jb21wb25lbnRcIjtcbmltcG9ydCB7UHJvZmlsZUNvbXBvbmVudH0gZnJvbSBcIi4vY29tcG9uZW50cy9wcm9maWxlL3Byb2ZpbGUuY29tcG9uZW50XCI7XG5pbXBvcnQge1Byb2ZpbGUxQ29tcG9uZW50fSBmcm9tIFwiLi9jb21wb25lbnRzL3Byb2ZpbGUxL3Byb2ZpbGUxLmNvbXBvbmVudFwiO1xuXG5pbXBvcnQge0FkZE5ld1Byb2R1Y3RDb21wb25lbnR9IGZyb20gXCIuL2NvbXBvbmVudHMvYWRkbmV3cHJvZHVjdC9hZGRuZXdwcm9kdWN0LmNvbXBvbmVudFwiO1xuaW1wb3J0IHtBZGROZXdTZWF0Q29tcG9uZW50fSBmcm9tIFwiLi9jb21wb25lbnRzL2FkZG5ld3NlYXQvYWRkbmV3c2VhdC5jb21wb25lbnRcIjtcbmltcG9ydCB7UGF5bWVudENvbXBvbmVudH0gZnJvbSBcIi4vY29tcG9uZW50cy9wYXltZW50L3BheW1lbnQuY29tcG9uZW50XCI7XG5pbXBvcnQge1Nob3BDYXRlZ29yeUNvbXBvbmVudH0gZnJvbSBcIi4vY29tcG9uZW50cy9zaG9wY2F0ZWdvcnkvc2hvcGNhdGVnb3J5LmNvbXBvbmVudFwiO1xuaW1wb3J0IHtTaG9wQ2F0YWxvZ3VlQ29tcG9uZW50fSBmcm9tIFwiLi9jb21wb25lbnRzL3Nob3BjYXRhbG9ndWUvc2hvcGNhdGFsb2d1ZS5jb21wb25lbnRcIjtcblxuaW1wb3J0IHtWZW5kb3JSZWdpc3RlckNvbXBvbmVudH0gZnJvbSBcIi4vY29tcG9uZW50cy92ZW5kb3IvdmVuZG9yLmNvbXBvbmVudFwiO1xuaW1wb3J0IHtQaG9uZVZlcmlmeUNvbXBvbmVudH0gZnJvbSBcIi4vY29tcG9uZW50cy9waG9uZXZlcmlmeS9waG9uZXZlcmlmeS5jb21wb25lbnRcIjtcbmltcG9ydCB7TGFuZHBhZ2VDb21wb25lbnR9IGZyb20gXCIuL2NvbXBvbmVudHMvbGFuZHBhZ2UvbGFuZHBhZ2UuY29tcG9uZW50XCI7XG5pbXBvcnQge1N1Y2Nlc3NUcmFuc0NvbXBvbmVudH0gZnJvbSBcIi4vY29tcG9uZW50cy90cmFuc2FjdGlvbnN1Y2Nlc3MvdHJhbnNhY3Rpb25zdWNjZXNzLmNvbXBvbmVudFwiO1xuXG4vLyB7IHBhdGg6IFwiXCIsIHJlZGlyZWN0VG86IFwiL2xvZ2luXCIsIHBhdGhNYXRjaDogXCJmdWxsXCIgfSxcbmNvbnN0IHJvdXRlczogUm91dGVzID0gW1xuICAgIHsgcGF0aDogXCJcIiwgY29tcG9uZW50OiBIb21lQ29tcG9uZW50LGNhbkFjdGl2YXRlOiBbQXV0aEd1YXJkXSwgcGF0aE1hdGNoOiAnZnVsbCcgfSxcblxuICAgIHsgcGF0aDogXCJsb2dpblwiLCBjb21wb25lbnQ6IFByb2ZpbGVDb21wb25lbnQgfSxcbiAgICB7IHBhdGg6IFwibGFuZGluZ3BhZ2VcIiwgY29tcG9uZW50OiBMYW5kcGFnZUNvbXBvbmVudCB9LFxuICAgIHsgcGF0aDogXCJyZWdpc3RlclwiLCBjb21wb25lbnQ6IFJlZ2lzdGVyQ29tcG9uZW50IH0sXG4gICAgeyBwYXRoOiBcInBhc3N3b3JkXCIsIGNvbXBvbmVudDogUGFzc3dvcmRDb21wb25lbnQgfSxcbiAgIFxuICAgIHsgcGF0aDogXCJzZWN1cmVcIiwgY29tcG9uZW50OiBTZWN1cmVDb21wb25lbnQsY2FuQWN0aXZhdGU6IFtBdXRoR3VhcmRdLCB9LFxuICAgIHsgcGF0aDogXCJyZXNldHBhc3N3b3JkXCIsIGNvbXBvbmVudDogUmVzZXRQYXNzd29yZENvbXBvbmVudCB9LFxuICAgIHsgcGF0aDogXCJjaGFuZ2VwYXNzd29yZFwiLCBjb21wb25lbnQ6IENoYW5nZVBhc3N3b3JkMkNvbXBvbmVudCB9LFxuICAgIHsgcGF0aDogXCJ2ZXJpZnlwaG9uZVwiLCBjb21wb25lbnQ6IFZlcmlmeU51bWJlckNvbXBvbmVudCwgfSxcbiAgICB7IHBhdGg6IFwib3RwXCIsIGNvbXBvbmVudDogT3RwQ29tcG9uZW50IH0sXG4gICAgeyBwYXRoOiBcInRyYW5zcGluXCIsIGNvbXBvbmVudDogU2V0VHJhbnNhY3Rpb25Db21wb25lbnR9LFxuICAgIHsgcGF0aDogXCJhZGRjb29wZXJhdGl2ZVwiLCBjb21wb25lbnQ6IEFkZE5ld0Nvb3BlcmF0aXZlQ29tcG9uZW50LGNhbkFjdGl2YXRlOiBbQXV0aEd1YXJkXSwgfSxcbiAgICB7IHBhdGg6IFwiYWNjb3VudFwiLCBjb21wb25lbnQ6IEFjY291bnRDb21wb25lbnQsY2FuQWN0aXZhdGU6IFtBdXRoR3VhcmRdLCB9LFxuICBcbiAgICB7IHBhdGg6IFwic2hvcFwiLCBjb21wb25lbnQ6IFNob3BDb21wb25lbnQsY2FuQWN0aXZhdGU6IFtBdXRoR3VhcmRdLCB9LFxuICAgIHsgcGF0aDogXCJidXkvOmlkXCIsIGNvbXBvbmVudDogQnV5Q29tcG9uZW50ICxjYW5BY3RpdmF0ZTogW0F1dGhHdWFyZF0sfSxcbiAgICB7IHBhdGg6IFwiYnV5bmV3XCIsIGNvbXBvbmVudDogQnV5TmV3Q29tcG9uZW50ICxjYW5BY3RpdmF0ZTogW0F1dGhHdWFyZF19LFxuICAgIHsgcGF0aDogXCJidXlcIiwgY29tcG9uZW50OiBCdXlDb21wb25lbnQgLGNhbkFjdGl2YXRlOiBbQXV0aEd1YXJkXSx9LFxuICAgIHsgcGF0aDogXCJteWNhcnRcIiwgY29tcG9uZW50OiBNeUNhcnRDb21wb25lbnQsY2FuQWN0aXZhdGU6IFtBdXRoR3VhcmRdLCB9LFxuICAgIHsgcGF0aDogXCJwYXlcIiwgY29tcG9uZW50OiBQYXlDb21wb25lbnQsY2FuQWN0aXZhdGU6IFtBdXRoR3VhcmRdLCB9LFxuICAgIHsgcGF0aDogXCJhY2NvdW50ZGV0YWlsc1wiLCBjb21wb25lbnQ6IEFjY291bnREZXRhaWxzQ29tcG9uZW50LGNhbkFjdGl2YXRlOiBbQXV0aEd1YXJkXSwgfSxcbiAgICB7IHBhdGg6IFwiYWRkbmV3cHJvZHVjdFwiLCBjb21wb25lbnQ6IEFkZE5ld1Byb2R1Y3RDb21wb25lbnQgLGNhbkFjdGl2YXRlOiBbQXV0aEd1YXJkXSx9LFxuICAgIHsgcGF0aDogXCJhZGRuZXdzZWF0XCIsIGNvbXBvbmVudDogQWRkTmV3U2VhdENvbXBvbmVudCxjYW5BY3RpdmF0ZTogW0F1dGhHdWFyZF0sIH0sXG4gICAgeyBwYXRoOiBcInBheW1lbnRcIiwgY29tcG9uZW50OiBQYXltZW50Q29tcG9uZW50ICxjYW5BY3RpdmF0ZTogW0F1dGhHdWFyZF0sfSxcbiAgICB7IHBhdGg6IFwic2hvcGNhdGVnb3J5XCIsIGNvbXBvbmVudDogU2hvcENhdGVnb3J5Q29tcG9uZW50LGNhbkFjdGl2YXRlOiBbQXV0aEd1YXJkXSwgfSxcbiAgICB7IHBhdGg6IFwic2hvcGNhdGFsb2d1ZS86aWRcIiwgY29tcG9uZW50OiBTaG9wQ2F0YWxvZ3VlQ29tcG9uZW50LGNhbkFjdGl2YXRlOiBbQXV0aEd1YXJkXSwgfSxcbiAgICB7IHBhdGg6IFwicHJvZmlsZVwiLCBjb21wb25lbnQ6IFByb2ZpbGVDb21wb25lbnQgfSxcbiAgICB7IHBhdGg6IFwidmVuZG9yXCIsIGNvbXBvbmVudDogVmVuZG9yUmVnaXN0ZXJDb21wb25lbnQgfSxcbiAgICB7IHBhdGg6IFwicGhvbmV2ZXJpZnlcIiwgY29tcG9uZW50OiBQaG9uZVZlcmlmeUNvbXBvbmVudCB9LFxuICAgIHsgcGF0aDogXCJ0cmFuc2FjdGlvbnN1Y2Nlc3NcIiwgY29tcG9uZW50OiBTdWNjZXNzVHJhbnNDb21wb25lbnQgfSxcblxuICAgIFxuICAgIFxuICAgIFxuXG4gICAgXG4gICAgXG4gICAgXG4gICAgXG4gICAgXG5dO1xuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtOYXRpdmVTY3JpcHRSb3V0ZXJNb2R1bGUuZm9yUm9vdChyb3V0ZXMpXSxcbiAgICBleHBvcnRzOiBbTmF0aXZlU2NyaXB0Um91dGVyTW9kdWxlXVxufSlcbmV4cG9ydCBjbGFzcyBBcHBSb3V0aW5nTW9kdWxlIHsgfSJdfQ==