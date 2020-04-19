import React from 'react';

import { AppState, AppAction } from 'reducer/app';

export const fetchInitialState: AppState = {
  loading: false,
  error: '',
  fromCurrency: '',
  toCurrency: '',
  amount: '',
  quotes: {},
};

export interface ContextProps {
  state: typeof fetchInitialState;
  dispatch: (action: AppAction) => void;
}

export const GlobalContext = React.createContext<ContextProps>({
  state: fetchInitialState,
  dispatch: () => {},
});
