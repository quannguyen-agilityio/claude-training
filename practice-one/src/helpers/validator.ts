import { ErrorMsgs } from '@enums/ErrorMsg';

export interface FieldRule {
  // Shown when the value is blank or doesn't match the pattern
  message: ErrorMsgs;
  pattern?: RegExp;
}

/**
 * Validate one required field
 * @returns the error message, or '' when the value is valid
 */
const validateInput = (value: string, { message, pattern }: FieldRule): string => {
  const trimmed = value.trim();

  if (!trimmed || (pattern && !pattern.test(trimmed))) {
    return message;
  }

  return '';
};

export default validateInput;
