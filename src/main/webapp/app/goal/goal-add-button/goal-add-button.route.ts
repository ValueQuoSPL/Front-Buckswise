import { Route } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
//import { GoalSelectComponent } from './goalselect.component';
import { GoalAddButtonComponent } from './goal-add-button.component';

export const goalAddRoute: Route = 
{
    path: 'goalAdd',
    component: GoalAddButtonComponent,
    data: {
        authorities: [],
        pageTitle: 'goal.title'
    }
};