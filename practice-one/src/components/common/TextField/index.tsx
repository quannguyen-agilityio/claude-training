import React, { InputHTMLAttributes, useId } from 'react';
import clsx from 'clsx';
import { FIELD_STYLES } from '@constants/Styles';
import Field, { FieldMessageProps, getControlProps } from '@components/common/Field';

type TextFieldProps = InputHTMLAttributes<HTMLInputElement> & FieldMessageProps;

const TextField: React.FC<TextFieldProps> = ({ label, hint, error, id, className, type = 'text', ...rest }) => {
  const generatedId = useId();
  const fieldId = id ?? generatedId;

  return (
    <Field id={fieldId} label={label} hint={hint} error={error} className={className}>
      <input
        type={type}
        className={clsx(FIELD_STYLES.base, error ? FIELD_STYLES.error : FIELD_STYLES.ok, 'h-11')}
        {...getControlProps(fieldId, { hint, error })}
        {...rest}
      />
    </Field>
  );
};

export default TextField;
