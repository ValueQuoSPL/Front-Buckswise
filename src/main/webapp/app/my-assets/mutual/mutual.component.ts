import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../shared';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { MutualFund } from 'app/my-assets/mutual/mutual.modal';
import { MutualfundService } from './mutual.service';

@Component({
  selector: 'jhi-mutualfund',
  templateUrl: './mutual.component.html',
  styles: []
})
export class MutualComponent implements OnInit {
  user: any;
  uid: any;
  output: any;
  getdata: any;
  commonid: any;
  conformkey: any;
  closeResult: any;
  mutualfund: MutualFund = new MutualFund();

  constructor(
    private account: AccountService,
    private modalService: NgbModal,
    public activeModal: NgbActiveModal,
    public mutualFundService: MutualfundService
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
        console.log('user info mutualfund', this.user);
        this.mutualfund.userid = this.user.id;
        this.uid = this.mutualfund.userid;
        console.log('in fetchid method', this.uid);

        // this.getMyProfilebyid(this.uid);
        // this.getStockById(this.uid)
        this.getMutualFundByUid(this.uid);
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
  openMutual(mutualModel) {
    console.log('mutual modal open');
    this.modalService
      .open(mutualModel, { ariaLabelledBy: 'mutualModal' })
      .result.then(
        result => {
          this.closeResult = `Closed with: ${result}`;
          this.saveMutual();
          // console.log('add income success');
        },
        reason => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }
  openEditMutual(editMutualModal, id) {
    this.commonid = id;
    console.log('editMutualModal common id is', this.commonid);
    console.log('editMutualModal modal open', id);
    this.getMutualFundByid(this.commonid);
    this.modalService
      .open(editMutualModal, { ariaLabelledBy: 'editMutualModal' })
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
  saveMutual(): void {
    this.mutualFundService.SubmitUser(this.mutualfund).subscribe(data => {
      alert('Added new MF details');
      this.getMutualFundByUid(this.uid);
    });
  }
  getMutualFundByUid(uid) {
    this.mutualFundService.getMutualFund(this.uid).subscribe(res => {
      console.log('this is responce of mufund', res);
      this.output = res;
      console.log('responce of getMutualFundByUid service', this.output);
    });
    // this.getSavingSchemeUid(this.uid2);
  }
  getMutualFundByid(commonid) {
    this.mutualFundService.getMutualFundByid(this.commonid).subscribe(res => {
      console.log('this is responce of getMutualFundByid', res);
      this.getdata = res;
      console.log(
        'this is responce of getMutualFundByid getdata',
        this.getdata
      );
      this.mutualfund.id = this.getdata[0].id;
      this.mutualfund.mfscheme = this.getdata[0].mfscheme;
      this.mutualfund.folionumber = this.getdata[0].folionumber;
      this.mutualfund.holdingdays = this.getdata[0].holdingdays;
      console.log(
        'this is responce of getMutualFundByid holidays',
        this.mutualfund.holdingdays
      );
      this.mutualfund.purchesprice = this.getdata[0].purchesprice;
      this.mutualfund.currentvalue = this.getdata[0].currentvalue;
      this.mutualfund.gainloss = this.getdata[0].gainloss;
      this.mutualfund.absolutereturn = this.getdata[0].absolutereturn;
      this.mutualfund.cagr = this.getdata[0].cagr;
      this.mutualfund.userid = this.getdata[0].userid;
    });
  }
  opendeleteStocks(id) {
    this.commonid = id;
    console.log('opendeleteStocks common id is', this.commonid);
    console.log('opendeleteStocks modal open', id);
    this.delete(this.commonid);
  }
  update(commonid) {
    console.log('inside update id is ', this.commonid);
    // this.getStockId(this.id)
    this.mutualfund.id = this.commonid;
    // this.newid= this.stocks.id;
    // this.getStockId(this.newid);
    console.log('inside update', this.mutualfund);
    this.mutualFundService.UpdateMutualFund(this.mutualfund).subscribe(data => {
      alert('Added new mutualfund details');
      this.getMutualFundByUid(this.uid);
    });
  }
  delete(commonid) {
    this.conformkey = confirm('really Want to delete?');
    if (this.conformkey === true) {
      // this.conformkey = 'You pressed OK!';
      console.log('inside delete id is ', this.commonid);
      // this.getStockId(this.id)
      this.mutualfund.id = this.commonid;
      console.log('inside delete', this.mutualfund);
      this.mutualFundService
        .DeleteMutualFund(this.mutualfund.id)
        .subscribe(data => {
          confirm('delete mutualfund details');
          this.getMutualFundByUid(this.uid);
        });
    } else {
      this.getMutualFundByUid(this.uid);
    }
  }
}
