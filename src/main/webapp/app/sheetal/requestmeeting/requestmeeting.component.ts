import { Component, OnInit } from '@angular/core';
import { User } from 'app/shared';
import { MeetService } from 'app/sheetal/requestmeeting/meet.service';
@Component({
  selector: 'jhi-requestmeeting',
  templateUrl: './requestmeeting.component.html',
  styleUrls: ['./requestmeeting.component.css']
})
export class RequestmeetingComponent implements OnInit {
  user: User = new User ();
    constructor(private meetService: MeetService) { }
    submitUser(): void {
      this.meetService.submitUser(this.user)
      .subscribe( data => {
        alert('successfully');
      });
    }
  ngOnInit() {
  }
}
