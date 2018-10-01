import { Component, OnInit } from "@angular/core";
import { Stocks } from "app/my-assets/stocks/stocks.modal";
import { StockService } from "app/my-assets/stocks/stocks.service";
import { AccountService } from "../../shared";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
// import {MutualFundService} from './mutual.service';

@Component({
  selector: "jhi-stock",
  templateUrl: "./stocks.component.html",
  styles: []
})
export class StockComponent implements OnInit {
  user: any;
  closeResult: string;
  commonid: number;
  conformkey: boolean;
  uid: any;
  out: any;
  getid: any;
  stocks: Stocks = new Stocks();
  isSaving;
  totalshareprice: any;

  constructor(
    private stockService: StockService,
    private account: AccountService,
    private modalService: NgbModal,
    public activeModal: NgbActiveModal
  ) {}

  ngOnInit() {
    this.FetchId();
  }
  resetFieldValue() {
    this.stocks.company_name = "";
    this.stocks.id = null;
    this.stocks.investor_name = "";
    this.stocks.no_of_shares = null;
    this.stocks.notes = "";
    this.stocks.share_price = null;
  }
  FetchId(): Promise<any> {
    return this.account
      .get()
      .toPromise()
      .then(response => {
        this.user = response.body;
        console.log("user info of stock", this.user);
        this.stocks.userid = this.user.id;
        console.log("in fetchid method", this.stocks.userid);
        this.uid = this.stocks.userid;
        // this.getMyProfilebyid(this.uid);
        this.getStockById(this.uid);
      });
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return "by pressing ESC";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return "by clicking on a backdrop";
    } else {
      return `with: ${reason}`;
    }
  }
  // stocks
  openStocks(stocksModal) {
    console.log("openStocks modal open");
    this.modalService
      .open(stocksModal, { ariaLabelledBy: "stocksModal" })
      .result.then(
        result => {
          this.closeResult = `Closed with: ${result}`;
          this.saveStocks();
        },
        reason => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }
  openEditStocks(editStocksModal, id) {
    this.commonid = id;
    console.log("editStocksModal common id is", this.commonid);
    console.log("editStocksModal modal open", id);
    this.getStockId(this.commonid);
    this.modalService
      .open(editStocksModal, { ariaLabelledBy: "editStocksModal" })
      .result.then(
        result => {
          this.closeResult = `Closed with: ${result}`;
          this.update(this.commonid);
        },
        reason => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }
  opendeleteStocks(id) {
    this.commonid = id;
    console.log("opendeleteStocks common id is", this.commonid);
    console.log("opendeleteStocks modal open", id);
    this.delete(this.commonid);
  }
  getStockById(uid) {
    this.stockService.getStockById(this.uid).subscribe(res => {
      console.log("this is responce of stack", res);
      this.out = res;
      // console.log('responce of stocks service', this.out);
      // for (let index = 0; index < this.out.length; index++) {
      //   const element = this.out[index];
      //    this.totalshareprice += element.share_price;
      //    console.log("total share price is" , this.totalshareprice);
      // }
      // this.totalshareprice = 0;
      // for (let j = 0; j < this.out.length; j++) {

      //     // // console.log(this.IncomeArray[j].name, this.IncomeArray[j].amount);
      //     console.log("total share price is" , this.totalshareprice);
      //     this.totalshareprice = +this.totalshareprice + +this.out[j].share_price;
      //       console.log("total share price is" , this.totalshareprice);
      // }

      // this.out.forEach(element => {
      //   console.log("share price is",element.share_price);

      // this.totalshareprice = +this.totalshareprice + +element.share_price;
      // console.log("total share price is" , this.totalshareprice);

      // });
    });
    // this.getMutualFundByUid(this.uid1);
  }
  saveStocks() {
    this.stockService.SaveStocks(this.stocks).subscribe(data => {
      alert("Added new stocks details");
      this.getStockById(this.uid);
    });
  }
  getStockId(commonid) {
    this.stockService.getStockId(this.commonid).subscribe(res => {
      console.log("this is responce of getStockId ", res);
      this.getid = res;
      console.log("this is responce of getStockId ", this.getid);
      this.stocks.id = this.getid.id;
      this.stocks.company_name = this.getid.company_name;
      this.stocks.investor_name = this.getid.investor_name;
      this.stocks.no_of_shares = this.getid.no_of_shares;
      this.stocks.share_price = this.getid.share_price;
      this.stocks.notes = this.getid.notes;
    });
  }
  update(commonid) {
    console.log("inside update id is ", this.commonid);
    // this.getStockId(this.id)
    this.stocks.id = this.commonid;
    // this.newid= this.stocks.id;
    // this.getStockId(this.newid);
    console.log("inside update", this.stocks);
    this.stockService.UpdateStock(this.stocks).subscribe(data => {
      alert("Added new stocks details");
      this.getStockById(this.uid);
    });
  }
  delete(commonid) {
    this.conformkey = confirm("really Want to delete?");
    if (this.conformkey === true) {
      // this.conformkey = 'You pressed OK!';
      console.log("inside delete id is ", this.commonid);
      // this.getStockId(this.id)
      this.stocks.id = this.commonid;
      console.log("inside delete", this.stocks);
      this.stockService.DeleteStock(this.stocks.id).subscribe(data => {
        confirm("delete stocks details");
        this.getStockById(this.uid);
      });
    } else {
      this.getStockById(this.uid);
    }
  }
}
