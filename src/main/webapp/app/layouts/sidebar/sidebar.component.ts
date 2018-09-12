import { Component, OnInit, Injectable } from '@angular/core';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { Principal, LoginService, LoginModalService } from 'app/shared';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProfileService } from 'app/layouts/profiles/profile.service';
import { Router } from '@angular/router';
import { VERSION } from 'app/app.constants';

@Component({
  selector: 'jhi-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css',
'../../css/fa/css/all.css']
})
@Injectable()
export class SidebarComponent implements OnInit {
  coffee = faCoffee;
  inProduction: boolean;
  isNavbarCollapsed: boolean;
  languages: any[];
  swaggerEnabled: boolean;
  modalRef: NgbModalRef;
  version: string;
  isLogin = false;
  account: Account;

  constructor(
    private principal: Principal,
    private modalService: NgbModal,
    private loginModalService: LoginModalService
  ) {}

  ngOnInit() {
    this.principal.identity().then(account => {
      this.account = account;
    });
  }

  isAuthenticated() {
    return this.principal.isAuthenticated();
  }

  showSidebar() {
    console.log('inside sidebar');
    // const x =  document.getElementById('main-menu').classList.toggle('expanded');
    const x = document.getElementById('main-menu');
    console.log(x);

    x.style.width = '-250px';
  }

  collapseNavbar() {
    this.isNavbarCollapsed = true;
  }

  Login() {
    // console.log(this.modalRef);
    this.modalRef = this.loginModalService.open();
    // console.log(this.modalRef);
  }
}
