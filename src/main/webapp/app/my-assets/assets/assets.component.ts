import { Component, OnInit } from '@angular/core';
import { Principal } from 'app/shared';
import { Stocks } from 'app/my-assets/assets/stocks.model';
import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { MutualFundService } from 'app/my-assets/assets/mutual-fund.service';
import { StocksService } from 'app/my-assets/assets/stocks.service';
import { MutualFund } from 'app/my-assets/assets/mutual-fund.model';
import { AssetsService } from 'app/my-assets/assets/assets.service';
import { FAO, SavingScheme, AltInvest, Cash, Property, ChitFund } from 'app/my-assets/assets/assets.model';

@Component({
    selector: 'jhi-assets',
    templateUrl: './assets.component.html'
})
export class AssetsComponent implements OnInit {
    account: Account;
    stocks: Stocks = new Stocks();
    isSaving: boolean;
    mutualfund: MutualFund = new MutualFund();
    fao: FAO = new FAO();
    savingScheme: SavingScheme = new SavingScheme();
    altInvest: AltInvest = new AltInvest();
    cash: Cash = new Cash();
    prop: Property = new Property();
    chit: ChitFund = new ChitFund();
    mutualfundArray = [];
    stocksArray = [];
    faoArray = [];
    altInvestArray = [];
    cashArray = [];
    propArray = [];
    chitArray = [];
  fieldArray = [];
   savingArray = [];

  constructor(private principal: Principal,
        public activeModal: NgbActiveModal,
        private stocksService: StocksService,
        private eventManager: JhiEventManager,
        private mutualFundService: MutualFundService,
        private assetsService: AssetsService,
         ) {}

    ngOnInit() {
        this.isSaving = false;
        this.principal.identity().then((account) => {
            this.account = account;
        });
    }
     saveStocks() {
        this.stocksArray.push({
            // id: this.id,
            company_name: this.stocks.company_name,
             investor_name: this.stocks.investor_name,
             no_of_shares: this.stocks.no_of_shares,
             share_price: this.stocks.share_price,
             notes: this.stocks.notes
            });

       this.stocksService.SaveStocks(this.stocks)
       .subscribe( (data) => {
        alert ('Added new stocks details');
       });
    }
    SaveFAO() {
        this.faoArray.push({
            // id: this.id,
             id: this.fao.id,
            investment_type: this.fao.investment_type,
             asset_type: this.fao.asset_type,
            investor_name: this.fao.investor_name,
            asset_name: this.fao.asset_name,
             no_of_contracts: this.fao.no_of_contracts,
             p_date: this.fao.p_date,
            contract_p_value: this.fao.contract_p_value,
             contract_m_value: this.fao.contract_m_value,
             as_of_date: this.fao.as_of_date,
             notes: this.fao.notes
            });

       this.assetsService.SaveFAO(this.fao)
       .subscribe( (data) => {
        alert ('Added new Future and objective details');
       });
    }
    SavingScheme() {
         this.savingArray.push({
             id: this.savingScheme.id,
             organisation_name: this.savingScheme.organisation_name,
             investor_name: this.savingScheme.investor_name,
             dividend_type: this.savingScheme.dividend_type,
             amount_invested: this.savingScheme.amount_invested,
             rate_of_interest: this.savingScheme.rate_of_interest,
             tenure: this.savingScheme.tenure,
             start_date: this.savingScheme.start_date,
             end_date: this.savingScheme.end_date,
             fund_value: this.savingScheme.fund_value,
             as_of_date: this.savingScheme.as_of_date,
             notes: this.savingScheme.notes
            });

       this.assetsService.SavingSchemeDetails(this.savingScheme)
       .subscribe( (data) => {
        alert ('Added new Future and objective details');
       });
    }
    AltInvestment() {
        this.altInvestArray.push({
            id: this.altInvest.id,
            investor_name: this.altInvest.investor_name,
            amount_invested: this.altInvest.amount_invested,
            market_value: this.altInvest.market_value,
            notes: this.altInvest.notes
            });

       this.assetsService.AltInvestDetails(this.altInvest)
       .subscribe( (data) => {
        alert ('Added new Future and objective details');
       });
    }
    saveCashDetails() {
        this.cashArray.push({
            cash_source: this.cash.cash_source,
            amount: this.cash.amount,
            notes: this.cash.notes
            });

       this.assetsService.CashDetails(this.cash)
       .subscribe( (data) => {
        alert ('Added new Future and objective details');
       });
    }
    saveProperty() {
        this.propArray.push({
            prop_name: this.prop.prop_name,
            prop_type: this.prop.prop_type,
            prop_details: this.prop.prop_details,
            current_m_value: this.prop.current_m_value,
            as_of_date: this.prop.as_of_date,
            notes: this.cash.notes
            });

       this.assetsService.PropertyDetails(this.cash)
       .subscribe( (data) => {
        alert ('Added new Future and objective details');
       });
    }
    saveChit() {
        this.chitArray.push({
            chit_name: this.chit.chit_name,
            chit_holder_name: this.chit.chit_holder_name,
            chit_start_date: this.chit.chit_start_date,
            chit_value: this.chit.chit_value,
            tenure: this.chit.tenure,
            m_payment: this.chit.m_payment,
            current_value: this.chit.current_value,
            isCashed: this.chit.isCashed,
            notes: this.chit.notes
            });

       this.assetsService.ChitFundDetails(this.chit)
       .subscribe( (data) => {
        alert ('Added new Future and objective details');
       });
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }
    deleteFieldValue(index) {
        this.fieldArray.splice(index, 1);
    }
    resetFieldValue() {
        this.stocks.company_name = '';
        this.stocks.investor_name = '';
        this.stocks.no_of_shares = 0 ;
        this.stocks.share_price = 0;
        this.stocks.notes = '';
       }

    SubmitUser(): void {
    //      console.log(this.id);
    //   console.log(this.mutualfund.fund_name);
    //   console.log(this.investor_name);
    //   console.log(this.p_date);
    //   console.log(this.no_of_units);
    //   console.log(this.nav);
    this.mutualfundArray.push({
            // id: this.id,
            fund_name: this.mutualfund.fund_name,
             investor_name: this.mutualfund.investor_name,
             p_date: this.mutualfund.p_date,
             no_of_units: this.mutualfund.no_of_units,
             nav: this.mutualfund.nav
            });

       this.mutualFundService.SubmitUser(this.mutualfund)
       .subscribe( (data) => {
        alert ('Added new MF details');
       });
    }
}
