export class Stocks {
  public id?: number;
  public company_name?: string;
  public investor_name?: string;
  public no_of_shares?: number;
  public share_price?: number;
  public notes?: string;
}
export class FAO {
  public id: number;
  public investment_type: string;
  public asset_type: string;
  public investor_name: string;
  public asset_name: string;
  public no_of_contracts: number;
  public p_date: string;
  public contract_p_value: number;
  public contract_m_value: number;
  public as_of_date: string;
  public notes: string;
}
export class SavingScheme {
  investment_type: any;
  public id: number;
  public organisation_name: string;
  public investor_name: string;
  public dividend_type: string;
  public scheme_type: string;
  public amount_invested: number;
  public rate_of_interest: number;
  public tenure: number;
  public start_date: string;
  public end_date: string;
  public fund_value: number;
  public as_of_date: string;
  public notes: string;
}
export class AltInvest {
  public id: number;
  public investor_name: string;
  public amount_invested: number;
  public fund_name: String;
  public p_date: string;
  public market_value: number;
  public as_of_date: string;
  public notes: string;
  public investment_type: string;
}
export class Cash {
  public cash_source: string;
  public amount: number;
  public notes: string;
}
export class Property {
  public prop_name: string;
  public prop_type: string;
  public prop_details: string;
  public current_m_value: number;
  public as_of_date: string;
  public notes: string;
}
export class ChitFund {
  public chit_name: string;
  public chit_holder_name: string;
  public chit_start_date: string;
  public chit_value: number;
  public tenure: number;
  public m_payment: number;
  public current_value: number;
  public isCashed: string;
  public notes: string;
}
