import { Route } from '@angular/router';

import { AssetsComponent } from 'app/my-assets/assets/assets.component';

export const upRoute: Route = {
    path: 'assets',
    component: AssetsComponent,
    data: {
        authorities: [],
        pageTitle: 'user-profile'
    }
};
