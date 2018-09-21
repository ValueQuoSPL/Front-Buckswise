import { FutureOptionService } from "./../../my-assets/future-option/futureoption.service";
import { PropertyService } from "./../../my-assets/property/property.service";
import { ChitFundService } from "./../../my-assets/chit-funds/chitfund.service";
import { CashService } from "./../../my-assets/cash/cash.service";
import { AlternateService } from "./../../my-assets/alternate-investment/alternateinvest.service";
import { StockService } from "./../../my-assets/stocks/stocks.service";
import { MutualfundService } from "app/my-assets/mutual/mutual.service";
import { SavingSchemeService } from "app/my-assets/saving-scheme/savingscheme.service";
import { Component, OnInit } from "@angular/core";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { AccountService } from "../../shared";

@Component({
  selector: "jhi-goal-add-button",
  templateUrl: "./goal-add-button.component.html",
  styles: []
})
export class GoalAddButtonComponent implements OnInit {
  assettype: any;
  out: Object;
  user: any;
  uid: any;
  onNoClick() {
    console.log("inside onNoClick");
    this.dialogRef.close();
  }
  dialogRef;
  constructor(
    private ActiveModal: NgbActiveModal,
    private modalService: NgbModal,
    public dialog: MatDialog,
    private account: AccountService,
    public stockService: StockService,
    public mutualfundService: MutualfundService,
    public savingSchemeService: SavingSchemeService,
    public alternateService: AlternateService,
    public cashService: CashService,
    public chitFundService: ChitFundService,
    public propertyService: PropertyService,
    public futureOptionService: FutureOptionService
  ) {}

  ngOnInit() {
    this.FetchId();
  }
  openDialog(): void {
    this.dialogRef = this.dialog.open(GoalAddButtonComponent, {
      width: "550px"
      // data: {name: this.name, animal: this.animal}
    });

    this.dialogRef.afterClosed().subscribe(result => {
      console.log("The dialog was closed");
      // this.animal = result;
    });
  }
  //   onNoClick(){
  //   console.log('inside onNoClick');
  //   this.dialogRef.close();
  // }
  getAsset() {
    console.log(this.assettype);
    if (this.assettype === "stocks") {
      console.log(this.assettype);
      this.getStockById(this.uid);
    } else if (this.assettype === "mutual") {
      console.log(this.assettype);
      this.getMutualFundByUid(this.uid);
    }
    // if (this.assettype='ChitFund') {
    //   this.getChitByuid(this.uid);
    // }
    // if (this.assettype ='FutureandOption') {
    //   this.getFAOByUid(this.uid);
    // }
  }
  sub() {
    console.log("inside sub");
  }

  getStockById(uid) {
    this.stockService.getStockById(this.uid).subscribe(res => {
      console.log("this is responce of stack", res);
      this.out = res;
      console.log("responce of stocks service", this.out);
    });
    // this.getMutualFundByUid(this.uid1);
  }
  getMutualFundByUid(uid) {
    this.mutualfundService.getMutualFund(this.uid).subscribe(res => {
      console.log("this is responce of mufund", res);
      this.out = res;
      console.log("responce of getMutualFundByUid service", this.out);
    });
  }
  getSavingSchemeUid(uid) {
    this.savingSchemeService.getSavingScheme(this.uid).subscribe(res => {
      console.log("this is responce of SavingScheme", res);
      this.out = res;
      console.log("responce of SavingScheme service", this.out);
    });
    // this.getAltInvestment(this.uid3);
  }
  getCashDetailsByuid(uid) {
    this.cashService.getCashDetailsByuid(this.uid).subscribe(res => {
      console.log("this is responce of getCashDetailsByuid", res);
      this.out = res;
      console.log("responce of getCashDetailsByuid service", this.out);
    });
    // this.getsavePropertyByuid(this.uid5);
  }
  getChitByuid(uid) {
    this.chitFundService.getChitByuid(this.uid).subscribe(res => {
      console.log("this is responce of getChitByuid", res);
      this.out = res;
      console.log("responce of getChitByuid service", this.out);
    });
    // this.getFAOByUid(this.uid7)
  }
  getsavePropertyByuid(uid) {
    this.propertyService.getsavePropertyByuid(this.uid).subscribe(res => {
      console.log("this is responce of getsavePropertyByuid", res);
      this.out = res;
      console.log("responce of getsavePropertyByuid service", this.out);
    });
  }
  getFAOByUid(uid) {
    this.futureOptionService.getFAOByUid(this.uid).subscribe(res => {
      console.log("this is responce of getFAOByUid", res);
      this.out = res;
      console.log("responce of getFAOByUid service", this.out);
    });
    // this.getSavingSchemeUid(this.uid);
  }
  FetchId(): Promise<any> {
    return this.account
      .get()
      .toPromise()
      .then(response => {
        this.user = response.body;
        console.log("user info of stock", this.user);
        this.uid = this.user.id;
        // this.getMyProfilebyid(this.uid);
      });
  }
}
