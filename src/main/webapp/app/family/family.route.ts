import { FamilyComponent } from 'app/family/family.component';
import { Route } from '@angular/router';
import { MyprofileComponent } from 'app/family/myprofile/myprofile.component';
import { FamilyprofileComponent } from 'app/family/familyprofile/familyyprofile.component';
import { AssumptionComponent } from 'app/family/assumption/assumption.component';
export const familyRoute: Route = {
  path: 'familyroute',
  component: FamilyComponent,
  children: [
    { path: 'familyroute/myprofile', component: MyprofileComponent },
    { path: 'familyroute/familyprofile', component: FamilyprofileComponent },
    { path: 'familyroute/assumption', component: AssumptionComponent }
  ]
};
