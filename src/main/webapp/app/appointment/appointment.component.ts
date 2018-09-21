import { Component, OnInit } from "@angular/core";

@Component({
  selector: "jhi-appointment",
  templateUrl: "./appointment.component.html",
  styleUrls: ["./appointment.component.css"]
})
export class AppointmentComponent implements OnInit {
  form: any;
  submitted: boolean = false;

  constructor() {}

  onSubmit(form: any) {
    this.submitted = true;
    this.form = form;
  }

  ngOnInit() {}
}
