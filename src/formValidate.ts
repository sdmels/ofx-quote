import { stringRex, numberRex, emailRex, camel2title } from 'utils';

interface ValidationResult {
  valid: boolean;
  message: string;
}

export const validateInput = (e: any): ValidationResult => {
  const { type, name, value } = e.target;

  if (value === null || value === '') {
    return {
      valid: false,
      message: 'Field is required',
    };
  }

  switch (type) {
    case 'text':
      const stringRexResult = stringRex.test(value);
      return {
        valid: stringRexResult,
        message: stringRexResult ? '' : `Enter a valid ${camel2title(name)}`,
      };
    case 'email':
      const emailRexResult = emailRex.test(value);
      return {
        valid: emailRexResult,
        message: emailRexResult ? '' : 'Enter an valid email',
      };
    case 'number':
      const numberRexResult = numberRex.test(value);
      return {
        valid: numberRexResult,
        message: numberRexResult ? '' : 'Enter number only',
      };
    case 'select':
    case 'select-one':
      return {
        valid: true,
        message: '',
      };
    default:
      return {
        valid: false,
        message: 'Field is required',
      };
  }
};
