import { Route } from "@angular/router";
import { TaxComponent } from "./tax.component";

export const taxRoute: Route = {
  path: "tax",
  component: TaxComponent,
  data: {
    authorities: [],
    pageTitle: "Tax Component"
  }
};
