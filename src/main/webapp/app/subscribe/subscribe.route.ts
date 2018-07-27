import { Route } from '@angular/router';
import { UserRouteAccessService } from 'app/shared';
import { SubscribeComponent } from 'app/subscribe/subscribe.component';

export const subscribeRoute: Route = {
    path: 'subscribe',
    component: SubscribeComponent,
    data: {
        authorities: [],
        pageTitle: 'subscribe.title'
    }
};
