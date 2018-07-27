import { DemoComponent } from 'app/demo/demo.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { errorRoute, navbarRoute} from 'app/layouts';
import {registerRoute} from 'app/account';
import { DEBUG_INFO_ENABLED } from 'app/app.constants';
 import { GoalComponent } from 'app/goal/goal.component';
import { GoalSelectComponent } from 'app/goal';
import { GoalAddButtonComponent} from 'app/goal';
import { SubscribeComponent } from 'app/subscribe/subscribe.component';
import { SuccessComponent } from 'app/success/success.component';
import { LifeInsuranceComponent } from 'app/risk/life-insurance/life-insurance.component';
import { lifeRoute } from 'app/risk/life-insurance/life-insurance.route';
import { medicalRoute, MedicalInsuranceComponent, questionnaireRoute } from 'app/risk';

const LAYOUT_ROUTES = [
    navbarRoute,
    registerRoute,
    lifeRoute,
    medicalRoute,
    questionnaireRoute,
    ...errorRoute,
    {path: 'goalselect', component: GoalSelectComponent },
    {path: 'goalAdd', component: GoalAddButtonComponent}
];

@NgModule({
    imports: [
        RouterModule.forRoot(LAYOUT_ROUTES, { useHash: false , enableTracing: DEBUG_INFO_ENABLED })
    ],
    exports: [
        RouterModule
    ]
})
export class BuckswiseFrontEndAppRoutingModule {}
export const routingComponents = [ LifeInsuranceComponent, MedicalInsuranceComponent,
];
