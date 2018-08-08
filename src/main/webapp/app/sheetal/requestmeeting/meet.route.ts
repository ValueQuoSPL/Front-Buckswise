import { Route } from "@angular/router";

import { RequestmeetingComponent } from "./requestmeeting.component";

export const meetRoute: Route = {
  path: "meet",
  component: RequestmeetingComponent,
  data: {
    authorities: [],
    pageTitle: "Request Meeting"
  }
};
