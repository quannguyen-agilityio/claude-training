import React, { TextareaHTMLAttributes, useId } from 'react';
import clsx from 'clsx';
import { FIELD_STYLES } from '@constants/Styles';
import Field, { FieldMessageProps, getControlProps } from '@components/common/Field';

type TextAreaFieldProps = TextareaHTMLAttributes<HTMLTextAreaElement> & FieldMessageProps;

const TextAreaField: React.FC<TextAreaFieldProps> = ({ label, hint, error, id, className, rows = 5, ...rest }) => {
  const generatedId = useId();
  const fieldId = id ?? generatedId;

  return (
    <Field id={fieldId} label={label} hint={hint} error={error} className={className}>
      <textarea
        rows={rows}
        className={clsx(
          FIELD_STYLES.base,
          error ? FIELD_STYLES.error : FIELD_STYLES.ok,
          'resize-y py-2.5 leading-relaxed',
        )}
        {...getControlProps(fieldId, { hint, error })}
        {...rest}
      />
    </Field>
  );
};

export default TextAreaField;
