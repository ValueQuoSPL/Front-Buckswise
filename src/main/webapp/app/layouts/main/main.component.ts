import { Component, OnInit, HostListener, AfterViewInit } from "@angular/core";
import { Router, ActivatedRouteSnapshot, NavigationEnd } from "@angular/router";

import { Title } from "@angular/platform-browser";
import { Principal } from "app/shared";
import { ChangeDetectionStrategy } from "@angular/core";

@Component({
  selector: "jhi-main",
  templateUrl: "./main.component.html",
  styleUrls: ["main.css"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class JhiMainComponent implements OnInit, AfterViewInit {
  loginStatus = false;
  spinner = true;
  isSafari;

  @HostListener("window:mousemove", [])
  onMouseOver() {
    // console.log('change detected');
  }

  constructor(
    private titleService: Title,
    private router: Router,
    private principal: Principal
  ) {}

  private getPageTitle(routeSnapshot: ActivatedRouteSnapshot) {
    let title: string =
      routeSnapshot.data && routeSnapshot.data["pageTitle"]
        ? routeSnapshot.data["pageTitle"]
        : "buckswiseFrontEndApp";
    if (routeSnapshot.firstChild) {
      title = this.getPageTitle(routeSnapshot.firstChild) || title;
    }
    return title;
  }

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.titleService.setTitle(
          this.getPageTitle(this.router.routerState.snapshot.root)
        );
      }
      this.spinner = false;
    });

    // Opera 8.0+
    // tslint:disable-next-line:
    const isOpera =
      (!!window["opr"] && !!window["opr"].addons) ||
      !!window["opera"] ||
      navigator.userAgent.indexOf(" OPR/") >= 0;

    // Firefox 1.0+
    // tslint:disable-next-line:prefer-const
    let InstallTrigger: any;
    const isFirefox = typeof InstallTrigger !== "undefined";

    // Safari 3.0+ '[object HTMLElementConstructor]'
    // tslint:disable-next-line:max-line-length
    this.isSafari =
      /constructor/i.test(window["HTMLElement"]) ||
      (function(p) {
        return p.toString() === "[object SafariRemoteNotification]";
      })(!window["safari"] || window["safari"].pushNotification);

    // Internet Explorer 6-11
    const isIE = /*@cc_on!@*/ false || !!document["documentMode"];

    // Edge 20+
    const isEdge = !isIE && !!window["StyleMedia"];

    // Chrome 1+
    // const isChrome = !!window.chrome && !!window.chrome.webstore;
    // tslint:disable-next-line:no-unused-expression
    const isChrome = !!window["chrome"] && !!window["chrome"]["webstore"];

    // Blink engine detection
    const isBlink = (isChrome || isOpera) && !!window["CSS"];

    let output = "Detecting browsers by ducktyping:<hr>";
    output += " Firefox: " + isFirefox;
    output += " Chrome: " + isChrome;
    output += " Safari: " + this.isSafari;
    output += " Opera: " + isOpera;
    output += " IE: " + isIE;
    output += " Edge: " + isEdge;
    output += " Blink: " + isBlink;

    console.log("browser : ", output);
  }

  ngAfterViewInit() {
    document.getElementById("detect").focus();
  }
  isAuthenticated() {
    return this.principal.isAuthenticated();
  }
  login() {
    if (this.loginStatus === false) {
      this.loginStatus = true;
      return this.loginStatus;
    } else {
      this.loginStatus = false;
      return this.loginStatus;
    }
  }
}
