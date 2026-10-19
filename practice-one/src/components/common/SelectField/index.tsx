import React, { SelectHTMLAttributes, useId } from 'react';
import clsx from 'clsx';
import { IconNames } from '@enums/Icon';
import { FIELD_STYLES } from '@constants/Styles';
import Field, { FieldMessageProps, getControlProps } from '@components/common/Field';
import Icon from '@components/common/Icon';

type SelectFieldProps = SelectHTMLAttributes<HTMLSelectElement> & FieldMessageProps;

const SelectField: React.FC<SelectFieldProps> = ({ label, hint, error, id, className, children, ...rest }) => {
  const generatedId = useId();
  const fieldId = id ?? generatedId;

  return (
    <Field id={fieldId} label={label} hint={hint} error={error} className={className}>
      <div className="relative">
        <select
          className={clsx(FIELD_STYLES.base, error ? FIELD_STYLES.error : FIELD_STYLES.ok, 'h-11 appearance-none pr-10')}
          {...getControlProps(fieldId, { hint, error })}
          {...rest}
        >
          {children}
        </select>
        <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-muted">
          <Icon name={IconNames.CHEVRON_DOWN} />
        </span>
      </div>
    </Field>
  );
};

export default SelectField;
