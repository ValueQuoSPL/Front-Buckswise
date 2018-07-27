import { Route } from '@angular/router';

import { lifeRoute, LifeInsuranceComponent } from 'app/risk';
import { RiskComponent } from 'app/risk/risk.component';

// const RISK_ROUTES = [
//    lifeRoute
//   ];
export const riskRoute: Route = {
    path: 'risk',
    component: RiskComponent,
};
