import { Route } from '@angular/router';
import { UserRouteAccessService } from 'app/shared';
import { SubscriberComponent } from 'app/home/subscriber/subscriber.component';

export const subscriberRoute: Route = {
    path: 'subscriber/:plan',
    component: SubscriberComponent,
    data: {
        authorities: [],
        pageTitle: 'subscriber.title'
    }
};
