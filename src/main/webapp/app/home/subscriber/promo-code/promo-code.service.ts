import { Injectable } from '@angular/core';

@Injectable()
export class PromoCodeService {

    constructor() {}

    apply(promocode) {
        console.log('applying Promo-Code', promocode);
        if (promocode === 'buckswise') {
            return true;
        } else {
            return false;
        }
    }

}
