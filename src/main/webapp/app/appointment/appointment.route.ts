import { Route } from "@angular/router";
import { UserRouteAccessService } from "../shared";
import { AppointmentComponent } from "./appointment.component";

export const appointRoot: Route = {
  path: "appointment",
  component: AppointmentComponent,
  data: {
    authorities: [],
    pageTitle: "appointment.title"
  }
};
