import { FamilyComponent } from "./family.component";
import { Route } from "@angular/router";
import { MyprofileComponent } from "../family/myprofile/myprofile.component";
import { FamilyprofileComponent } from "../family/familyprofile/familyyprofile.component";
import { AssumptionComponent } from "../family/assumption/assumption.component";
export const familyRoute: Route = {
  path: "familyroute",
  component: FamilyComponent,
  children: [
    { path: "familyroute/myprofile", component: MyprofileComponent },
    { path: "familyroute/familyprofile", component: FamilyprofileComponent },
    { path: "familyroute/assumption", component: AssumptionComponent }
  ]
};
