import numeral from 'numeral';
export const isEmpty = (obj: any) => Object.keys(obj).length === 0;

export const stringRex = /^[a-zA-Z\s]+$/;
export const numberRex = /^[0-9]+$/;
export const emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const camel2title = (camelCase: string) =>
  camelCase
    .replace(/([A-Z])/g, (match) => ` ${match}`)
    .replace(/^./, (match) => match.toUpperCase());

export const formatCurrencyAsString = (value: string) => numeral(value).format('$0,0.00');
