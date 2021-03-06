import { Route } from '@angular/router';

import { UserRouteAccessService } from 'app/shared';
import { ActivateComponent } from 'app/account/activate/activate.component';

export const activateRoute: Route = {
    path: 'activate',
    component: ActivateComponent,
    data: {
        authorities: [],
        pageTitle: 'Activation'
    },
    canActivate: [UserRouteAccessService]
};
