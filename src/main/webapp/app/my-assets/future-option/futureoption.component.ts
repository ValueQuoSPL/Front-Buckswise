import { Component, OnInit } from '@angular/core';
import { FAO } from './futureoption.modal';
import { AccountService } from '../../shared';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FutureOptionService } from './futureoption.service';

@Component({
  selector: 'jhi-futureoption',
  templateUrl: './futureoption.component.html',
  styles: []
})
export class FutureOptionComponent implements OnInit {
  user: any;
  closeResult: string;
  commonid: number;
  conformkey: boolean;
  uid: any;
  getdata: any;
  out: any;
  FutureOptionDetails: any;
  fao: FAO = new FAO();
  isSaving;

  constructor(
    private account: AccountService,
    private modalService: NgbModal,
    public activeModal: NgbActiveModal,
    public futureOptionService: FutureOptionService
  ) {}

  ngOnInit() {
    this.FetchId();
  }
  FetchId(): Promise<any> {
    return this.account
      .get()
      .toPromise()
      .then(response => {
        this.user = response.body;
        console.log('user info of fao', this.user);
        this.fao.userid = this.user.id;
        console.log('in fetchid method', this.fao.userid);
        this.uid = this.fao.userid;
        // this.getMyProfilebyid(this.uid);
        // this. getAltInvestment(this.uid)
        // this.getCashDetailsByuid(this.uid);
        this.getFAOByUid(this.uid);
      });
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  openFuture(content) {
    console.log('future modal open');
    this.modalService
      .open(content, { ariaLabelledBy: 'futureModal' })
      .result.then(
        result => {
          this.closeResult = `Closed with: ${result}`;
          this.SaveFAO();
          // console.log('add income success');
        },
        reason => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }
  openEditFuture(editfutureModal, id) {
    this.commonid = id;
    console.log('editChitModal common id is', this.commonid);
    console.log('editChitModal modal open', id);
    this.getFutureById(this.commonid);
    this.modalService
      .open(editfutureModal, { ariaLabelledBy: 'editfutureModal' })
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
  opendeleteFuture(id) {
    this.commonid = id;
    console.log('opendeleteStocks common id is', this.commonid);
    console.log('opendeleteStocks modal open', id);
    this.delete(this.commonid);
  }
  getFutureById(commonid) {
    this.futureOptionService.getFutureById(this.commonid).subscribe(res => {
      console.log('this is responce of getStockId ', res);
      this.getdata = res;
      this.fao.num = this.getdata.num;
      this.fao.investment_type = this.getdata.investment_type;
      this.fao.asset_type = this.getdata.asset_type;
      this.fao.investor_name = this.getdata.investor_name;
      this.fao.asset_name = this.getdata.asset_name;
      this.fao.no_of_contracts = this.getdata.tenure;
      this.fao.p_date = this.getdata.p_date;
      this.fao.contract_p_value = this.getdata.contract_p_value;
      this.fao.contract_m_value = this.getdata.contract_m_value;
      this.fao.as_of_date = this.getdata.as_of_date;
      this.fao.notes = this.getdata.notes;
    });
  }
  SaveFAO() {
    this.futureOptionService.SaveFAO(this.fao).subscribe(data => {
      alert('Added new Future and objective details');
      this.getFAOByUid(this.uid);
    });
  }
  getFAOByUid(uid) {
    this.futureOptionService.getFAOByUid(this.uid).subscribe(res => {
      console.log('this is responce of getFAOByUid', res);
      this.FutureOptionDetails = res;
      console.log('responce of getFAOByUid service', this.FutureOptionDetails);
    });
    // this.getSavingSchemeUid(this.uid);
  }
  update(commonid) {
    console.log('inside update id is ', this.commonid);
    // this.getStockId(this.id)
    this.fao.id = this.commonid;
    // this.newid= this.stocks.id;
    // this.getStockId(this.newid);
    console.log('inside update', this.fao);
    this.futureOptionService.UpdateFuture(this.fao).subscribe(data => {
      alert('Added new chit details');
      this.getFAOByUid(this.uid);
    });
  }
  delete(commonid) {
    this.conformkey = confirm('really Want to delete?');
    if (this.conformkey === true) {
      // this.conformkey = 'You pressed OK!';
      console.log('inside delete id is ', this.commonid);
      // this.getStockId(this.id)
      this.fao.id = this.commonid;
      console.log('inside delete', this.fao);
      this.futureOptionService.DeleteFuture(this.fao.id).subscribe(data => {
        confirm('delete chit details');
        this.getFAOByUid(this.uid);
      });
    } else {
      this.getFAOByUid(this.uid);
    }
  }
}
