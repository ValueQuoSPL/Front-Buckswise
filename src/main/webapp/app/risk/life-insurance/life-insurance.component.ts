import { Component, OnInit } from '@angular/core';
import { Principal } from 'app/shared';
import { Router } from '@angular/router';
import { LifeInsurance } from 'app/risk/risk.model';
import { RiskService } from 'app/risk/risk.service';

@Component({
  selector: 'jhi-life-insurance',
  templateUrl: './life-insurance.component.html'
})
export class LifeInsuranceComponent implements OnInit {

    account: Account;
lifeInsurance: LifeInsurance = new LifeInsurance();
lifeArray = [];
    constructor(private principal: Principal,
      private router: Router,
      private riskService: RiskService) {}

    ngOnInit() {
        this.principal.identity().then((account) => {
            this.account = account;
        });
      }

      saveLifeInsurance() {
                   this.lifeArray.push({
                // id: this.id,
               risk_coverage: this.lifeInsurance.risk_coverage,
               expense_cover: this.lifeInsurance.expense_cover,
               total_yearly_expenses: this.lifeInsurance.total_yearly_expenses,
            });
            this.riskService.SaveLifeInsurance(this.lifeInsurance)
           .subscribe( (data) => {
            alert ('Added new stocks details');
           });
        }
    }
