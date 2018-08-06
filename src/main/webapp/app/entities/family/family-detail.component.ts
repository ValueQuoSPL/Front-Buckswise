import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Family } from 'app/entities/family/family.model';
import { FamilyService } from 'app/entities/family/family.service';

@Component({
    selector: 'jhi-family-detail',
    templateUrl: './family-detail.component.html'
})
export class FamilyDetailComponent implements OnInit, OnDestroy {

    family: Family;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private familyService: FamilyService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInFamilies();
    }

    load(id) {
        this.familyService.find(id)
            .subscribe((familyResponse: HttpResponse<Family>) => {
                this.family = familyResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInFamilies() {
        this.eventSubscriber = this.eventManager.subscribe(
            'familyListModification',
            (response) => this.load(this.family.id)
        );
    }
}
