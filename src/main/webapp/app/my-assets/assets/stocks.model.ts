// import { BaseEntity } from './../../shared';

// export class Stocks implements BaseEntity {
//     constructor(
//         public id?: number,
//         public cName?: string,
//         public iName?: string,
//         public noOfShares?: number,
//         public sharePrice?: number,
//         public notes?: string,
//     ) {
//     }
// }

export class Stocks {
  public id?: number;
  public company_name?: string;
  public investor_name?: string;
  public no_of_shares?: number;
  public share_price?: number;
  public notes?: string;
  public userid?: Number;
}
