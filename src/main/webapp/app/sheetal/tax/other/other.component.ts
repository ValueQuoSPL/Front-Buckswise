import { Component, OnInit } from "@angular/core";
import { Other } from "./other.model";

@Component({
  selector: "jhi-other",
  templateUrl: "./other.component.html",
  styles: []
})
export class OtherComponent implements OnInit {
  other: Other = new Other();
  constructor() {}

  ngOnInit() {}
}
