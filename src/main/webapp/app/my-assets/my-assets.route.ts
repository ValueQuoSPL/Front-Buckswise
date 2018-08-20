import { Routes } from '@angular/router';

import { mutualRoute, upRoute } from 'app/my-assets';
import { LiabilitiesComponent } from 'app/my-assets/liabilities/liabilities.component';

const UP_ROUTES = [mutualRoute, upRoute];

export const userprofileState: Routes = [
  { path: '', children: UP_ROUTES },
  { path: 'liability', component: LiabilitiesComponent }
];
