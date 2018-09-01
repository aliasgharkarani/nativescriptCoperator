import { Component, OnInit, AfterViewInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";
import { SnackBar } from "nativescript-snackbar";
import * as ApplicationSettings from "application-settings";
import { connectionType, getConnectionType } from "connectivity";
import { Animation } from "ui/animation";
import { View } from "ui/core/view";
import { prompt } from "ui/dialogs";
import { Page } from "ui/page";
import { TextField } from "ui/text-field";

import { ValueList, DropDown } from "nativescript-drop-down";
import { SelectedIndexChangedEventData } from "nativescript-drop-down";
import { Cooperative, User } from "../../models/index";
import { CooperativeService } from "../../services/cooperative.service";
import { CooperativeStaffService } from "../../services/cooperativeStaff.service";

import { MemberService } from "../../services/member.service";

import { CooperativeStaff, VerifyAuth } from "../../models/index";

import { TNSFancyAlert } from "nativescript-fancyalert";

import {
  BottomNavigation,
  BottomNavigationTab,
  OnTabSelectedEventData
} from "nativescript-bottom-navigation";
import {
  AndroidData,
  Elevation,
  Shape,
  ShapeEnum
} from "nativescript-ng-shadow";

// import { registerElement } from "nativescript-angular/element-registry";
// registerElement("Fab", () => require("nativescript-floatingactionbutton").Fab);
//import { registerElement } from "nativescript-angular/element-registry";
//import { CardView } from "nativescript-cardview";
//registerElement("CardView", () => CardView);

// import * as elementRegistryModule from "nativescript-angular/element-registry";
// import * as LabelModule from "tns-core-modules/ui/label";
// elementRegistryModule.registerElement(
//   "CardView",
//   () => require("nativescript-cardview").CardView
// );


@Component({
  moduleId: module.id,
  selector: "ns-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile-common.css", "./profile.component.css"],
})


export class ProfileComponent {


  public selectedTab: number = 0;
  public tabs: BottomNavigationTab[] = [
    new BottomNavigationTab('First', 'shop'),
    new BottomNavigationTab('Second', 'box', false),
    new BottomNavigationTab('Third', 'accept'),
    new BottomNavigationTab('Fourth', 'user')
  ];

  private _bottomNavigation: BottomNavigation;

  constructor(private page: Page) { }

  ngOnInit(): void {
    this._bottomNavigation = this.page.getViewById('bottomNavigation');
  }

  onBottomNavigationTabSelected(args: OnTabSelectedEventData): void {
    this.selectedTab = args.newIndex;
    if (this.selectedTab === 1) {
      alert('This item has selectable: false, and should be used to perform actions');
    }
    console.log(`old tab index:  ${args.oldIndex}`);
    console.log(`selected tab index:  ${args.newIndex}`);
  }







}