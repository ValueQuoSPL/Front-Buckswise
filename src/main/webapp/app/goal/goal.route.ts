import { Route } from '@angular/router';
import { UserRouteAccessService } from 'app/shared';
import { GoalComponent } from 'app/goal';
// import { GoalSelectComponent } from './Goal-select/goalselect.component';

export const goalRoot: Route = {
  path: 'goal',
  component: GoalComponent,
  data: {
    authorities: [],
    pageTitle: 'goal.title'
  }
};
// import { Routes } from '@angular/router';

// import {
//     goalSelectRoute, GoalComponent,
//     } from './';

// const ACCOUNT_ROUTES = [
//     goalSelectRoute,
//     ];

// export const accountState: Routes = [{
//     path: 'goal',
//     component: GoalComponent,
//     children: ACCOUNT_ROUTES
// }];
