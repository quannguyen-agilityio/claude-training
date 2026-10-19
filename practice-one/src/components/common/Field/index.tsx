import React, { ReactNode } from 'react';
import { IconNames } from '@enums/Icon';
import { FIELD_STYLES } from '@constants/Styles';
import Icon from '@components/common/Icon';

export interface FieldMessageProps {
  label: string;
  // Help text under the control, hidden while there is an error
  hint?: string;
  error?: string;
}

interface FieldProps extends FieldMessageProps {
  id: string;
  children: ReactNode;
  className?: string;
}

// Props that tie a control to its label and message (design/specs/foundations.md, Fields)
export const getControlProps = (id: string, { hint, error }: Omit<FieldMessageProps, 'label'>) => {
  let describedBy: string | undefined;

  if (error) {
    describedBy = `${id}-error`;
  } else if (hint) {
    describedBy = `${id}-hint`;
  }

  return {
    id,
    'aria-invalid': error ? true : undefined,
    'aria-describedby': describedBy,
  };
};

// Label above, hint or error below in normal flow, so a message never covers the next field
const Field: React.FC<FieldProps> = ({ id, label, hint, error, children, className }) => (
  <div className={className}>
    <label htmlFor={id} className={FIELD_STYLES.label}>
      {label}
    </label>
    {children}
    {hint && !error ? (
      <p id={`${id}-hint`} className="mt-1.5 text-sm text-muted">
        {hint}
      </p>
    ) : null}
    {error ? (
      <p id={`${id}-error`} className="mt-1.5 flex items-start gap-1.5 text-sm font-medium text-danger">
        <Icon name={IconNames.ALERT} className="mt-px h-4 w-4" />
        <span>{error}</span>
      </p>
    ) : null}
  </div>
);

export default Field;
