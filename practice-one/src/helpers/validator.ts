import { ErrorMsgs } from '@enums/ErrorMsg';

const isBlank = (value: string | number): boolean => {
  return !value;
};

const validateInput = (value: string, regex?: RegExp, message?: ErrorMsgs) => {
  if (isBlank(value.trim())) {
    return ErrorMsgs.EMPTY_FIELD;
  }

  if (regex && message) {
    if (!value.match(regex)) {
      return message;
    }
  }

  return '';
};

export default validateInput;
