import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from 'app/shared';
import { FamilyComponent } from 'app/entities/family/family.component';
import { FamilyDetailComponent } from 'app/entities/family/family-detail.component';
import { FamilyPopupComponent } from 'app/entities/family/family-dialog.component';
import { FamilyDeletePopupComponent } from 'app/entities/family/family-delete-dialog.component';

@Injectable()
export class FamilyResolvePagingParams implements Resolve<any> {

    constructor(private paginationUtil: JhiPaginationUtil) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,asc';
        return {
            page: this.paginationUtil.parsePage(page),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort)
      };
    }
}

export const familyRoute: Routes = [
    {
        path: 'family',
        component: FamilyComponent,
        resolve: {
            'pagingParams': FamilyResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Families'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'family/:id',
        component: FamilyDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Families'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const familyPopupRoute: Routes = [
    {
        path: 'family-new',
        component: FamilyPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Families'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'family/:id/edit',
        component: FamilyPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Families'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'family/:id/delete',
        component: FamilyDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Families'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
