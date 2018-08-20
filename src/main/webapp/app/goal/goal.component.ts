import { Component, OnInit } from '@angular/core';
import { Router, Route } from '@angular/router';
import { Principal } from '../shared';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { first } from 'rxjs/operator/first';

@Component({
  selector: 'jhi-goal',
  templateUrl: './goal.component.html',
  styles: []
})
export class GoalComponent implements OnInit {
  constructor(private router: Router) {}

  // fieldArray = [];
  // resource = '';
  // income ;

  // IncomeArray = [];
  // IncomeSalary; IncomeAward; IncomeBonus; IncomePension;
  // IncomeSaving; IncomeDeposit; IncomeRental;

  ngOnInit() {}

  selectgoals() {
    this.router.navigate(['goalselect']);
  }

  // btnClick = function() {
  //   this.router.navigateByUrl('how');
  // };

  // addFieldValue() {
  //     this.fieldArray.push({
  //       name: this.resource,
  //       value: this.income
  //     });
}
