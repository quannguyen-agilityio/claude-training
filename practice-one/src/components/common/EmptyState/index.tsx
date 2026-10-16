import React, { ReactNode } from 'react';
import { IconNames } from '@enums/Icon';
import Icon from '@components/common/Icon';

interface EmptyStateProps {
  title: string;
  text: string;
  icon?: IconNames;
  // Up to two buttons or links
  actions?: ReactNode;
}

const EmptyState: React.FC<EmptyStateProps> = ({ title, text, icon = IconNames.BOOK, actions }) => (
  <div className="mx-auto flex max-w-md flex-col items-center px-4 py-16 text-center">
    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-raised text-muted">
      <Icon name={icon} className="h-6 w-6" />
    </div>
    <h2 className="mt-4 text-xl font-extrabold text-ink">{title}</h2>
    <p className="mt-2 text-base text-muted">{text}</p>
    {actions ? <div className="mt-6 flex flex-wrap justify-center gap-3">{actions}</div> : null}
  </div>
);

export default EmptyState;
