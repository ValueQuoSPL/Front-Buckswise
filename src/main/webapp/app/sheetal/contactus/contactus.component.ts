import { Component, OnInit } from "@angular/core";
import { User } from "../../shared";
import { ContactService } from "./contact.service";
import * as $ from "jQuery";
@Component({
  selector: "jhi-contactus",
  templateUrl: "./contactus.component.html",
  styleUrls: ["./contactus.component.css", "../../css/universal.css"]
})
export class ContactusComponent implements OnInit {
  user: User = new User();
  constructor(private contactService: ContactService) {}
  submitUser() {
    this.contactService
      .save(this.user)
      .subscribe(response => console.log(response));
  }
  // resetContact() {
  //   this.user.name = '';
  //  this.user.email = '';
  // this.user.phone = '';
  // this.user.message = '';
  //  }

  ngOnInit() {
    //    Validation for name
    //     $('#name').bind('keypress', function(event) {
    //       const charCode = event.which;
    //       if (charCode === 8 || charCode === 0) {
    //         return;
    //       } else {
    //         const keyChar = String.fromCharCode(charCode);
    //         return /[a-zA-Z\s]/.test(keyChar);
    //       }
    //     });
    //     //    Validation for name
    //     //    Validation for mobile
    //     $('#phone').keydown(function(e) {
    //       if (
    //         $.inArray(e.keyCode, [46, 8, 9, 27, 13]) !== -1 ||
    //         (e.keyCode === 65 && (e.ctrlKey === true || e.metaKey === true)) ||
    //         (e.keyCode >= 35 && e.keyCode <= 40)
    //       ) {
    //         return;
    //       }
    //       if (
    //         (e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) &&
    //         (e.keyCode < 96 || e.keyCode > 105)
    //       ) {
    //         e.preventDefault();
    //       }
    //     });
    //   }
    // }
  }
}
