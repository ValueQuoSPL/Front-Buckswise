// import { Component, OnInit } from '@angular/core';
// import { User } from '../../shared';
// import { MeetService } from './meet.service';
// import {FormsModule} from '@angular/forms';
// import {FormGroup, FormBuilder, Validators} from '@angular/forms';
// import {FormControl, FormGroupDirective, NgForm} from '@angular/forms';
// import {ErrorStateMatcher} from '@angular/material/core';

// export class MyErrorStateMatcher implements ErrorStateMatcher {
//   isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
//     const isSubmitted = form && form.submitted;
//     return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
//   }
// }
// @Component({
//   selector: 'jhi-requestmeeting',
//   templateUrl: './requestmeeting.component.html',
//   styleUrls: ['./requestmeeting.component.css']
// })
// export class RequestmeetingComponent implements OnInit {
//   emailFormControl = new FormControl('', [
//     Validators.required,
//     Validators.email,
//   ]);

//   matcher = new MyErrorStateMatcher();
//   user: User = new User ();
//   mobileNumber: any;
//   // RequestmeetingForm: FormGroup;
//     constructor(private meetService: MeetService, ) { }
//     submitUser(): void {
//       this.meetService.submitUser(this.user)
//       .subscribe(data => {
//         alert('successfully');
//       });
//     }
//   ngOnInit() {
// this.RequestmeetingForm = this.Formbuilder.group({
//   'name': [ this.user.name, [
//     Validators.required,
//   ]],
//   'email': [this.user.email, [
//     Validators.required,
//     Validators.email
//   ]],
//   'phone': [ this.user.phone, [
//    Validators.required,
//    Validators.maxLength(10),

//   ]],

// });
import { Component } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";

/** @title Form field with error messages */
@Component({
  selector: "jhi-requestmeeting",
  templateUrl: "./requestmeeting.component.html",
  styleUrls: ["./requestmeeting.component.css"]
})
export class RequestmeetingComponent {
  // email = new FormControl('', [Validators.required, Validators.email]);
  // getErrorMessage() {
  //   return this.email.hasError('required')
  //     ? 'You must enter a value'
  //     : this.email.hasError('email') ? 'Not a valid email' : '';
  // }
}
