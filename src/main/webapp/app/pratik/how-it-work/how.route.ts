import { Route } from '@angular/router';

import { HowItWorkComponent } from 'app/pratik/how-it-work/how-it-work.component';

export const howRoute: Route = {
    path: 'how',
    component: HowItWorkComponent,
    data: {
        authorities: [],
        pageTitle: 'How it works'
    }
};
