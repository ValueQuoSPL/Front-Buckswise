import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router, NavigationEnd, ActivatedRouteSnapshot } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'jhi-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css',
'../../css/animate.css'],
})
export class SidenavComponent implements OnInit {
  events: string[] = [];
  opened: boolean;
  toggler = false;
  slide = 'slideInLeft';

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );
  constructor(private breakpointObserver: BreakpointObserver, private router: Router,
    private titleService: Title,
  ) {}

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
          this.titleService.setTitle(this.getPageTitle(this.router.routerState.snapshot.root));
      }
  });
  }

  private getPageTitle(routeSnapshot: ActivatedRouteSnapshot) {
    let title: string = (routeSnapshot.data && routeSnapshot.data['pageTitle']) ? routeSnapshot.data['pageTitle'] : 'buckswiseFrontEndApp';
    if (routeSnapshot.firstChild) {
        title = this.getPageTitle(routeSnapshot.firstChild) || title;
    }
    return title;
  }

  show() {
    console.log('hi');
    let x ;
    x = document.getElementById('desktop');

    if (!this.toggler) {
      this.toggler = true;
      x.style = 'margin-left: 5px;';
      this.slide = 'slideInLeft';
    } else {
      this.toggler = false;
      x.style = 'margin-left: 15%;';
      this.slide = 'slideInRight';

    }
  }

}
