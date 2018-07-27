import { Route } from '@angular/router';

import { UserRouteAccessService } from 'app/shared';
import { PasswordResetFinishComponent } from 'app/account/password-reset/finish/password-reset-finish.component';

export const passwordResetFinishRoute: Route = {
    path: 'reset/finish',
    component: PasswordResetFinishComponent,
    data: {
        authorities: [],
        pageTitle: 'Password'
    },
    canActivate: [UserRouteAccessService]
};
