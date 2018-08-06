import { Component, OnInit } from '@angular/core';
import { User } from 'app/shared';
import { ContactService } from 'app/sheetal/contactus/contact.service';
import * as $ from 'jQuery';

@Component({
  selector: 'jhi-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css']
})
export class ContactusComponent implements OnInit {
user: User = new User();
  constructor(private contactService: ContactService) { }
  submitUser(): void {
    this.contactService.submitUser(this.user)
    .subscribe(data => {
      alert('successfully');
    });
  }

  ngOnInit() {
    //    Validation for name
    $('#name').bind('keypress', function(event) {
      const charCode = event.which;
      if (charCode === 8 || charCode === 0) {
          return;
      } else {
          const keyChar = String.fromCharCode(charCode);
          return /[a-zA-Z\s]/.test(keyChar);
      }
  });
//    Validation for name
//    Validation for email
$('#email').focusout(function() {
  const email_regex = /^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,4}$/;
  const email = $('#email').val();
  const elem = ($('#email').val());
  if (elem.length === 0) {
      alert('This field cannot be left blank.');
  } else {
      if ((!email.match(email_regex))) {
          alert('Enter valid email address.');
          return false;
      }
  }
});

//    Validation for mobile
  $('#phone').keydown(function(e) {
      if ($.inArray(e.keyCode, [46, 8, 9, 27, 13]) !== -1 ||
              (e.keyCode === 65 && (e.ctrlKey === true || e.metaKey === true)) ||
              (e.keyCode >= 35 && e.keyCode <= 40)) {
          return;
      }
      if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
          e.preventDefault();
      }
  });
  }

  }
