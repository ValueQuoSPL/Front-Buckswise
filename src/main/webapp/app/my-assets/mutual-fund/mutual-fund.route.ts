import { Route } from '@angular/router';

import { MutualFundComponent } from 'app/my-assets/mutual-fund/mutual-fund.component';

export const mutualRoute: Route = {
    path: 'mutual-fund',
    component: MutualFundComponent,
    data: {
        authorities: [],
        pageTitle: 'Mutual-Fund'
    }
};
