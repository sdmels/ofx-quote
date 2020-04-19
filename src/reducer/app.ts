import { QuoteObject } from 'model';

export const FETCH_SUCCESS = 'FETCH_SUCCESS';
export const FETCH_ERROR = 'FETCH_ERROR';
export const SET_LOADING = 'SET_LOADING';
export const SET_REQUIRED_AMOUNT = 'SET_REQUIRED_AMOUNT';

export interface AppState {
  loading: boolean;
  error: string;
  fromCurrency: string;
  toCurrency: string;
  amount: string;
  quotes: QuoteObject | {};
}

// fix types for payload
export interface AppAction {
  type: string;
  payload: any;
}

export const fetchReducer = (state: AppState, action: AppAction) => {
  switch (action.type) {
    case FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        error: '',
        quotes: action.payload.quotes,
      };
    case FETCH_ERROR:
      debugger;
      return {
        ...state,
        loading: false,
        amount: '',
        error: action.payload.error.message,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    case SET_REQUIRED_AMOUNT:
      return {
        ...state,
        fromCurrency: action.payload.fromCurrency,
        toCurrency: action.payload.toCurrency,
        amount: action.payload.amount,
      };
    default:
      return state;
  }
};
