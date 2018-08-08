import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRouteSnapshot, NavigationEnd } from '@angular/router';

import { Title } from '@angular/platform-browser';
import { Principal } from 'app/shared';

@Component({
    selector: 'jhi-main',
    templateUrl: './main.component.html',
    styleUrls: [
        'main.css'
    ]
})
export class JhiMainComponent implements OnInit {

    loginStatus = false;

    constructor(
        private titleService: Title,
        private router: Router,
        private principal: Principal,
    ) {}

    private getPageTitle(routeSnapshot: ActivatedRouteSnapshot) {
        let title: string = (routeSnapshot.data && routeSnapshot.data['pageTitle']) ? routeSnapshot.data['pageTitle'] : 'buckswiseFrontEndApp';
        if (routeSnapshot.firstChild) {
            title = this.getPageTitle(routeSnapshot.firstChild) || title;
        }
        return title;
    }

    ngOnInit() {
        this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                this.titleService.setTitle(this.getPageTitle(this.router.routerState.snapshot.root));
            }
        });
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
