import { Route } from '@angular/router';
import { UserRouteAccessService } from 'app/shared';

import { MedicalInsuranceComponent } from 'app/risk/medical-insurance/medical-insurance.component';

export const medicalRoute: Route = {
    path: 'medical',
    component:  MedicalInsuranceComponent,
    data: {
        authorities: [],
        pageTitle: 'medical-insurance'
    }
};
