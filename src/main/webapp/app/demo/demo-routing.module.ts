import { NgModule } from "@angular/core";
import { Routes, RouterModule, Router } from "@angular/router";
import { DemoComponent } from "app/demo/demo.component";
import { GridComponent } from "app/demo/widget/grid/grid.component";
import { MaterialComponent } from "app/demo/material/material.component";
import { NgBootstrapComponent } from "app/demo/ng-bootstrap/ng-bootstrap.component";
import { SimpleComponent } from "app/demo/simple/simple.component";
import { MobileOtpComponent } from "app/demo/mobile-otp/mobile-otp.component";

const MyRoute: Routes = [
  {
    path: "demo",
    component: DemoComponent,
    children: [
      { path: "grid", component: GridComponent },
      { path: "material", component: MaterialComponent },
      { path: "ngb", component: NgBootstrapComponent },
      { path: "simple", component: SimpleComponent },
      { path: "otp", component: MobileOtpComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(MyRoute)],
  exports: [RouterModule]
})
export class DemoRoutingModule {}
