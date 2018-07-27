import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Family } from 'app/entities/family/family.model';
import { FamilyPopupService } from 'app/entities/family/family-popup.service';
import { FamilyService } from 'app/entities/family/family.service';

@Component({
    selector: 'jhi-family-delete-dialog',
    templateUrl: './family-delete-dialog.component.html'
})
export class FamilyDeleteDialogComponent {

    family: Family;

    constructor(
        private familyService: FamilyService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.familyService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'familyListModification',
                content: 'Deleted an family'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-family-delete-popup',
    template: ''
})
export class FamilyDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private familyPopupService: FamilyPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.familyPopupService
                .open(FamilyDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
