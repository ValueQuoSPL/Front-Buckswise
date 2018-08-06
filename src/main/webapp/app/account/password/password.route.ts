import { Route } from '@angular/router';

import { UserRouteAccessService } from 'app/shared';
import { PasswordComponent } from 'app/account/password/password.component';

export const passwordRoute: Route = {
    path: 'password',
    component: PasswordComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'Password'
    },
    canActivate: [UserRouteAccessService]
};
