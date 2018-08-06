import { Routes } from '@angular/router';

import { howRoute, SpendRoute, subRoute} from 'app/pratik';

const PRATIK_ROUTES = [
    howRoute, SpendRoute, subRoute
];

export const pratikState: Routes = [{
    path: '',
    children: PRATIK_ROUTES
}];
