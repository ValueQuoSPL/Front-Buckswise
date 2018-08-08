import { Route } from "@angular/router";

import { MainComponent } from "./main.component";

export const mainRoute: Route = {
  path: "main",
  component: MainComponent,
  data: {
    authorities: [],
    pageTitle: "Main Component"
  }
};
