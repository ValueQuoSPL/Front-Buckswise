import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { HostListener } from "@angular/core";
import { Inject } from "@angular/core";
import { DOCUMENT } from "@angular/platform-browser";
import { WINDOW } from "./window.service";

import { ProfileService } from "app/layouts/profiles/profile.service";
import { Principal, LoginModalService, LoginService } from "app/shared";

import { VERSION } from "app/app.constants";

@Component({
  selector: "jhi-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["navbar.scss"]
})
export class NavbarComponent implements OnInit {
  inProduction: boolean;
  isNavbarCollapsed: boolean;
  languages: any[];
  swaggerEnabled: boolean;
  modalRef: NgbModalRef;
  version: string;
  navIsFixed = false;

  constructor(
    private loginService: LoginService,
    private principal: Principal,
    private loginModalService: LoginModalService,
    private profileService: ProfileService,
    private router: Router,
    @Inject(DOCUMENT) private document: Document,
    @Inject(WINDOW) private window: Window
  ) {
    this.version = VERSION ? "v" + VERSION : "";
    this.isNavbarCollapsed = true;
  }

  @HostListener("window:scroll", [])
  onWindowScroll() {
    // we'll do some stuff here when the window is scrolled
    const number =
      this.window.pageYOffset ||
      this.document.documentElement.scrollTop ||
      this.document.body.scrollTop ||
      0;
    if (number > 100) {
      this.navIsFixed = true;
      // console.log("up 100 detected");
    } else if (this.navIsFixed && number < 10) {
      this.navIsFixed = false;
      // console.log("down detected");
    }
  }

  ngOnInit() {
    this.profileService.getProfileInfo().then(profileInfo => {
      this.inProduction = profileInfo.inProduction;
      this.swaggerEnabled = profileInfo.swaggerEnabled;
    });
  }

  collapseNavbar() {
    this.isNavbarCollapsed = true;
  }

  isAuthenticated() {
    return this.principal.isAuthenticated();
  }

  login() {
    this.modalRef = this.loginModalService.open();
  }

  logout() {
    this.collapseNavbar();
    this.loginService.logout();
    this.router.navigate([""]);
  }

  toggleNavbar() {
    this.isNavbarCollapsed = !this.isNavbarCollapsed;
  }

  getImageUrl() {
    return this.isAuthenticated() ? this.principal.getImageUrl() : null;
  }
  toggleSidebar() {
    // console.log('inside navbar');
    // this.sidebar.showSidebar();
  }
}
