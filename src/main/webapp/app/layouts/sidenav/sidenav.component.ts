import { Component, OnInit, AfterViewInit } from "@angular/core";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Router, NavigationEnd, ActivatedRouteSnapshot } from "@angular/router";
import { Title } from "@angular/platform-browser";

@Component({
  selector: "jhi-sidenav",
  templateUrl: "./sidenav.component.html",
  styleUrls: ["./sidenav.component.css", "../../css/animate.css"]
})
export class SidenavComponent implements OnInit, AfterViewInit {
  events: string[] = [];
  opened: boolean;
  toggler = false;
  slide = "slideInLeft";
  button: HTMLElement;
  flag = true;

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(map(result => result.matches));

  isSafari: boolean;
  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router,
    private titleService: Title
  ) {}

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.titleService.setTitle(
          this.getPageTitle(this.router.routerState.snapshot.root)
        );
      }
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
    let x;
    x = document.getElementById("desktop");

    if (this.isSafari === true) {
      this.flag = false;
      x.style = "margin-left: 16%;";
      console.log("safari left 16%");
    }
  }

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

  show() {
    let x;
    x = document.getElementById("desktop");

    if (this.flag === true) {
      this.flag = false;
      x.style = "margin-left: 16%;";
      console.log("left 16%");
    }

    if (!this.toggler) {
      this.toggler = true;
      x.style = "margin-left: 5px;";
      if (this.isSafari) {
        x.style = "margin-left: 0%;";
      }
      this.slide = "slideInRight";
      console.log("left");
    } else {
      this.toggler = false;
      if (this.isSafari) {
        x.style = "margin-left: 16%;";
      }
      this.slide = "slideInLeft";
      console.log("right");
    }
  }
}
