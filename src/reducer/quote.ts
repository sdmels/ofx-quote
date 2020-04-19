import { FormControl } from 'model';

export const SET_STATE = 'SET_STATE';

export interface State {
  firstName: FormControl;
  lastName: FormControl;
  email: FormControl;
  countryCode: FormControl;
  contactNumber: FormControl;
  fromCurrency: FormControl;
  toCurrency: FormControl;
  amount: FormControl;
}

export interface Payload {
  name: string;
  value: string;
  valid: boolean;
  touched: boolean;
  errorMessage: string;
}

export interface Action {
  type: string;
  payload: Payload;
}

export const quoteInitialState: State = {
  firstName: {
    value: '',
    valid: false,
    touched: false,
    errorMessage: '',
  },
  lastName: {
    value: '',
    valid: false,
    touched: false,
    errorMessage: '',
  },
  email: {
    value: '',
    valid: false,
    touched: false,
    errorMessage: '',
  },
  countryCode: {
    value: '+61',
    valid: true,
    touched: true,
    errorMessage: '',
  },
  contactNumber: {
    value: '',
    valid: false,
    touched: false,
    errorMessage: '',
  },
  fromCurrency: {
    value: 'AUD',
    valid: true,
    touched: true,
    errorMessage: '',
  },
  toCurrency: {
    value: 'USD',
    valid: true,
    touched: true,
    errorMessage: '',
  },
  amount: {
    value: '',
    valid: false,
    touched: false,
    errorMessage: '',
  },
};

export const quoteReducer = (state: State, action: Action) => {
  switch (action.type) {
    case SET_STATE:
      const { payload } = action;
      return {
        ...state,
        [payload.name]: {
          value: payload.value,
          valid: payload.valid,
          touched: payload.touched,
          errorMessage: payload.errorMessage,
        },
      };

    default:
      return state;
  }
};
