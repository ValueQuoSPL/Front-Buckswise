import { Component, OnInit } from "@angular/core";
import { Other } from "./other.model";
import { OtherService } from "app/sheetal/tax/other/other.service";

@Component({
  selector: "jhi-other",
  providers: [OtherService],
  templateUrl: "./other.component.html",
  styles: []
})
export class OtherComponent implements OnInit {
  other: Other = new Other();
  constructor() {}

  ngOnInit() {}
}
