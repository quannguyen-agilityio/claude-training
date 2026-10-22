import RegexValue from '@constants/RegexValue';
import { ErrorMsgs } from '@enums/ErrorMsg';

export interface FieldRule {
  // Shown when the value is blank or fails the pattern or check
  message: ErrorMsgs;
  pattern?: RegExp;
  isValid?: (value: string) => boolean;
}

/**
 * Check that the value is a whole http(s) link with a dotted host
 */
export const isHttpUrl = (value: string): boolean => {
  try {
    const { protocol, hostname } = new URL(value);

    return (protocol === 'http:' || protocol === 'https:') && RegexValue.HOSTNAME.test(hostname);
  } catch {
    return false;
  }
};

/**
 * Validate one required field
 * @returns the error message, or '' when the value is valid
 */
const validateInput = (value: string, { message, pattern, isValid }: FieldRule): string => {
  const trimmed = value.trim();

  if (!trimmed || (pattern && !pattern.test(trimmed)) || (isValid && !isValid(trimmed))) {
    return message;
  }

  return '';
};

export default validateInput;
