import { Component, OnInit, Input } from "@angular/core";
import { ActivatedRoute } from "../../../../../node_modules/@angular/router";

@Component({
  selector: "jhi-success",
  templateUrl: "./success.component.html",
  styles: []
})
export class SuccessComponent implements OnInit {
  tnxid: any;
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.tnxid = params["txnid"];
      console.log(this.tnxid);
    });
  }
}
