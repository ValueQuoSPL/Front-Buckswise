import { Component, OnInit } from '@angular/core';
import { Myprofile } from '../family.model';
import { MyprofileService } from './myprofile.service';
import { Principal } from '../../shared';
import { AccountService } from '../../shared';

@Component({
  selector: 'jhi-myprofile',
  templateUrl: './myprofile.component.html',
  styles: ['./myprofile.component.css']
})
export class MyprofileComponent implements OnInit {
  myProfile: any;
  output: any;
  user: any;
  uid: any;
  isValid: boolean;

  constructor(
    private principal: Principal,
    private MyProfileSer: MyprofileService,
    private account: AccountService
  ) {}
  ngOnInit() {
    this.myProfile = {};
    this.FetchId();
  }
  saveDetail() {
    this.myProfile.uid = this.uid;
    this.MyProfileSer.save(this.myProfile).subscribe(
      responce => console.log(responce),
      error => console.log(error)
    );
  }
  getMyProfile() {
    this.MyProfileSer.getMyProfile().subscribe(res => {
      console.log(res);
      this.output = res;
      console.log('responce of myprofile service', this.output);
    });
  }
  getMyProfilebyid(uid) {
    this.MyProfileSer.getMyProfileByUid(this.uid).subscribe(res => {
      console.log(res);
      this.output = res;
      console.log('responce of myprofile service', this.output);
      if (this.output.uid === null) {
        this.isValid = false;
        console.log(this.isValid);
      } else {
        this.isValid = true;
        console.log(this.isValid);
      }
    });
  }
  FetchId(): Promise<any> {
    return this.account
      .get()
      .toPromise()
      .then(response => {
        this.user = response.body;
        console.log('user info', this.user);
        this.uid = this.user.id;
        console.log('in fetchid method', this.uid);
        this.getMyProfilebyid(this.uid);
      });
  }
}
