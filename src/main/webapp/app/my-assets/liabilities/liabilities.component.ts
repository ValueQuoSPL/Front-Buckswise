import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'jhi-liabilities',
  templateUrl: './liabilities.component.html',
  styles: []
})
export class LiabilitiesComponent implements OnInit {
  steps = 0;
  closeResult: string;

  constructor(private modalService: NgbModal) {}

  ngOnInit() {}

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  // income
  openShortTerm(incomeContent) {
    console.log('income modal open');

    this.modalService
      .open(incomeContent, { ariaLabelledBy: 'incomeModal' })
      .result.then(
        result => {
          this.closeResult = `Closed with: ${result}`;
          this.saveShortTerm();
          // console.log('add income success');
        },
        reason => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  saveShortTerm() {}
}
