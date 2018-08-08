import { Component, OnInit } from '@angular/core';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { Principal, LoginService, LoginModalService } from 'app/shared';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ProfileService } from 'app/layouts/profiles/profile.service';
import { Router } from '@angular/router';
import { VERSION } from 'app/app.constants';

@Component({
  selector: 'jhi-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  coffee = faCoffee;
  inProduction: boolean;
  isNavbarCollapsed: boolean;
  languages: any[];
  swaggerEnabled: boolean;
  modalRef: NgbModalRef;
  version: string;

  constructor(private loginService: LoginService,
    private principal: Principal,
    private loginModalService: LoginModalService,
    private profileService: ProfileService,
    private router: Router) {
      this.version = VERSION ? 'v' + VERSION : '';
        this.isNavbarCollapsed = true;
     }

  ngOnInit() {
  }

  showsidebar() {
    console.log('hi');
    // this.element.nativeElement.sidebar = 'sidebar;'
    // $.getElementById('sidebar').classList.toggle('visible');
    document.getElementById('sidebar').classList.toggle('visible');
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
  this.router.navigate(['']);
}

toggleNavbar() {
  this.isNavbarCollapsed = !this.isNavbarCollapsed;
}

getImageUrl() {
  return this.isAuthenticated() ? this.principal.getImageUrl() : null;
}

}
