import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Family } from 'app/entities/family/family.model';
import { FamilyPopupService } from 'app/entities/family/family-popup.service';
import { FamilyService } from 'app/entities/family/family.service';

@Component({
    selector: 'jhi-family-dialog',
    templateUrl: './family-dialog.component.html'
})
export class FamilyDialogComponent implements OnInit {

    family: Family;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private familyService: FamilyService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.family.id !== undefined) {
            this.subscribeToSaveResponse(
                this.familyService.update(this.family));
        } else {
            this.subscribeToSaveResponse(
                this.familyService.create(this.family));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Family>>) {
        result.subscribe((res: HttpResponse<Family>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Family) {
        this.eventManager.broadcast({ name: 'familyListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-family-popup',
    template: ''
})
export class FamilyPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private familyPopupService: FamilyPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.familyPopupService
                    .open(FamilyDialogComponent as Component, params['id']);
            } else {
                this.familyPopupService
                    .open(FamilyDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
