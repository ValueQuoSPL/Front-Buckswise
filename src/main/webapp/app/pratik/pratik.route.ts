import { Routes } from "@angular/router";

import { howRoute, SpendRoute, subRoute, IncomeRoute } from "app/pratik";

const PRATIK_ROUTES = [howRoute, SpendRoute, subRoute, IncomeRoute];

export const pratikState: Routes = [
  {
    path: "",
    children: PRATIK_ROUTES
  }
];
