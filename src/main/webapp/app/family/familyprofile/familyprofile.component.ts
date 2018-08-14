import { Component, OnInit } from '@angular/core';
import { FamilyprofileService } from './familyprofile.service';

@Component({
  selector: 'jhi-familyprofile',
  templateUrl: './familyprofile.component.html',
  styles: ['./familyprofile.component.html']
})
export class FamilyprofileComponent implements OnInit {
  familyProfile: any;
  output: any;

  constructor(private Familypro: FamilyprofileService) {}

  ngOnInit() {
    this.familyProfile = {};
    // this.getFamilyProfile();
  }
  saveFamilyProfile() {
    this.Familypro.save(this.familyProfile).subscribe(
      responce => console.log(responce),
      error => console.log(error)
    );
  }
  getFamilyProfile() {
    this.Familypro.getFamilyProfile().subscribe(res => {
      console.log(res);
      this.output = res;
      console.log('responce of familyprofile service', this.output);
    });
  }
  clear() {
  }
}
