import { Component, AfterViewInit, Renderer, ElementRef } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

import { PromoCodeService } from './promo-code.service';

@Component({
    selector: 'jhi-promo-code',
    templateUrl: './promo-code.html'
})
export class PromoCodeComponent implements AfterViewInit {
    promocodeError: boolean;
    promocode: string;
    credentials: any;
    clicked;

    constructor(
        private promoCodeService: PromoCodeService,
        private elementRef: ElementRef,
        private renderer: Renderer,
        public activeModal: NgbActiveModal
    ) {
        this.credentials = {};
    }

    ngAfterViewInit() {
        this.renderer.invokeElementMethod(this.elementRef.nativeElement.querySelector('#promocode'), 'focus', []);
    }

    cancel() {
        this.credentials = null;
        this.activeModal.dismiss('cancel');
    }

    apply() {
        this.clicked = true;
        const response = this.promoCodeService.apply(this.promocode);
        console.log(response);
        if (response) {
            this.promocodeError = true;
            this.activeModal.dismiss('promocode success');
        } else {
            this.promocode = null;
            this.promocodeError = true;
        }
    }
}
