import { Component, OnInit } from '@angular/core';
import { Eightyd } from './eightyd.model';
import { EightydService } from './eightyd.service';
import { AccountService } from 'app/shared';
import {
  NgbModalRef,
  NgbModal,
  ModalDismissReasons
} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'jhi-eightyd',
  templateUrl: './eightyd.component.html',
  styles: []
})
export class EightydComponent implements OnInit {
  user: any;
  uid: any;
  eightydout: any;
  eightyd: Eightyd = new Eightyd();
  uid1: any;
  constructor(
    private modalService: NgbModal,
    private eightydService: EightydService,
    private account: AccountService
  ) {}

  ngOnInit() {
    this.eightyd.medself = 0;
    this.eightyd.medparents = 0;
    this.eightyd.healthcheck = 0;

    this.FetchID();
  }
  onEightydGet(uid) {
    console.log('in main ts', uid);
    this.eightydService.geteightyd(uid).subscribe(res => {
      console.log(res);
      this.eightydout = res;
      console.log('onEightydGet response ', this.eightydout);
    });
  }
  onEightydSave() {
    this.eightydService
      .save(this.eightyd)
      .subscribe(response => console.log(response));
  }
  FetchID(): Promise<any> {
    return this.account
      .get()
      .toPromise()
      .then(response => {
        this.user = response.body;
        console.log('user info', this.user);
        this.eightyd.uid = this.user.id;
        this.uid = this.eightyd.uid;
        this.onEightydGet(this.uid);
      });
  }
}
