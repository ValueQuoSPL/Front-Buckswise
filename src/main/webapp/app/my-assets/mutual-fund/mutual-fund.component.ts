// import { Component, OnInit } from '@angular/core';
// import { Router, Route } from '@angular/router';
// import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
// import { JhiEventManager } from 'ng-jhipster';

import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { Stocks } from 'app/my-assets/mutual-fund/stocks.model';
import { StocksService } from 'app/my-assets/mutual-fund/stocks.service';
import { ITEMS_PER_PAGE, Principal } from 'app/shared';

@Component({
    selector: 'jhi-stocks',
    templateUrl: './mutual-fund.component.html'
})
export class StocksComponent implements OnInit, OnDestroy {

currentAccount: any;
    stocks: Stocks[];
    error: any;
    success: any;
    eventSubscriber: Subscription;
    routeData: any;
    links: any;
    totalItems: any;
    queryCount: any;
    itemsPerPage: any;
    page: any;
    predicate: any;
    previousPage: any;
    reverse: any;

    constructor(
        private stocksService: StocksService,
        private parseLinks: JhiParseLinks,
        private jhiAlertService: JhiAlertService,
        private principal: Principal,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private eventManager: JhiEventManager
    ) {
        this.itemsPerPage = ITEMS_PER_PAGE;
        this.routeData = this.activatedRoute.data.subscribe((data) => {
            this.page = data.pagingParams.page;
            this.previousPage = data.pagingParams.page;
            this.reverse = data.pagingParams.ascending;
            this.predicate = data.pagingParams.predicate;
        });
    }

    loadAll() {
        this.stocksService.query({
            page: this.page - 1,
            size: this.itemsPerPage,
            sort: this.sort()}).subscribe(
                (res: HttpResponse<Stocks[]>) => this.onSuccess(res.body, res.headers),
                (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    loadPage(page: number) {
        if (page !== this.previousPage) {
            this.previousPage = page;
            this.transition();
        }
    }
    transition() {
        this.router.navigate(['/stocks'], {queryParams:
            {
                page: this.page,
                size: this.itemsPerPage,
                sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
            }
        });
        this.loadAll();
    }

    clear() {
        this.page = 0;
        this.router.navigate(['/stocks', {
            page: this.page,
            sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
        }]);
        this.loadAll();
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInStocks();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Stocks) {
        return item.id;
    }
    registerChangeInStocks() {
        this.eventSubscriber = this.eventManager.subscribe('stocksListModification', (response) => this.loadAll());
    }

    sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
        if (this.predicate !== 'id') {
            result.push('id');
        }
        return result;
    }

    private onSuccess(data, headers) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = headers.get('X-Total-Count');
        this.queryCount = this.totalItems;
        // this.page = pagingParams.page;
        this.stocks = data;
    }
    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
    goBack() {
        this.router.navigate(['mutual-fund']);
    }
}
@Component({
  selector: 'jhi-mutual-fund',
 templateUrl: './mutual-fund.component.html',
 styles: []
})
export class MutualFundComponent implements OnInit {

  constructor(
   private router: Router) { }

 ngOnInit() {
  }

 clear() {
}

 gotoStocks() {
   this.router.navigate(['stocks'], {});
 }
 gotouser() {
   this.router.navigate(['userprofile']);
 }
}
