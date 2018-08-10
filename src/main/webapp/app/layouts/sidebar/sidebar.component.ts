import { Component, OnInit, Injectable } from '@angular/core';
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
@Injectable()
export class SidebarComponent implements OnInit {
  coffee = faCoffee;
  inProduction: boolean;
  isNavbarCollapsed: boolean;
  languages: any[];
  swaggerEnabled: boolean;
  modalRef: NgbModalRef;
  version: string;

  constructor() {}

  ngOnInit() {
  }

  showSidebar() {
    // console.log('inside sidebar');
    // this.element.nativeElement.sidebar = 'sidebar;'
    // $.getElementById('sidebar').classList.toggle('visible');
    document.getElementById('main-menu').classList.toggle('expanded');
    // document.getElementsByClassName('[main-menu]').classList.toggle('expanded');
  }

  collapseNavbar() {
    this.isNavbarCollapsed = true;
}

}
