import React from 'react';
import { ButtonVariants } from '@enums/Button';
import { IconNames } from '@enums/Icon';
import { BUTTON_STYLES } from '@constants/Styles';
import Icon from '@components/common/Icon';

interface AlertProps {
  title: string;
  text?: string;
  actionLabel?: string;
  onAction?: () => void;
}

const Alert: React.FC<AlertProps> = ({ title, text, actionLabel, onAction }) => (
  <div role="alert" className="flex flex-wrap items-start gap-3 rounded-xl border border-danger/40 bg-danger-soft p-4 text-ink">
    <span className="mt-0.5 text-danger">
      <Icon name={IconNames.ALERT} />
    </span>
    <div className="min-w-0 flex-1 basis-48">
      <p className="font-bold">{title}</p>
      {text ? <p className="mt-0.5 text-sm">{text}</p> : null}
    </div>
    {actionLabel && onAction ? (
      <button type="button" className={`${BUTTON_STYLES[ButtonVariants.SECONDARY]} h-9`} onClick={onAction}>
        {actionLabel}
      </button>
    ) : null}
  </div>
);

export default Alert;
