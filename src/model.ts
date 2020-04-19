export interface QuoteObject {
  CustomerRate: number;
  CustomerRateInverse: number;
  CustomerAmount: number;
  InterbankAmount: number;
  DefaultFee: number;
  Fee: number;
  FeeFreeThreshold: number;
  InterbankRate: number;
  InverseInterbankRate: number;
  DeliveryCountry: string;
  DeliveryTime: number;
  ComparisonRate: number;
  ComparisonAmount: number;
  Message: string;
}

export interface FormControl {
  value: string;
  valid: boolean;
  touched: boolean;
  errorMessage: string;
}
