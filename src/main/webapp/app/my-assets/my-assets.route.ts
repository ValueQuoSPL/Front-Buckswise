import { Routes } from "@angular/router";
// import { mutualRoute, upRoute } from "app/my-assets";
import { MyAssetsComponent } from "./my-assets.component";
// import { LiabilitiesComponent } from "app/my-assets/liabilities/liabilities.component";

//  const UP_ROUTES = [mutualRoute, upRoute];

// export const userprofileState: Routes = [
//   { path: "", children: UP_ROUTES },
//   { path: "liability", component: LiabilitiesComponent }
// ];
import { Route } from "@angular/router";

// import { AssetsComponent } from 'app/my-assets/assets/assets.component';

export const myasstsRoute: Route = {
  path: "asstesroute",
  component: MyAssetsComponent
};
