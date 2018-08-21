import { Route } from "@angular/router";
import { IncomeComponent } from "app/pratik/income/income.component";

export const IncomeRoute: Route = {
  path: "income",
  component: IncomeComponent,
  data: {
    authorities: [],
    pageTitle: "Income"
  }
};
