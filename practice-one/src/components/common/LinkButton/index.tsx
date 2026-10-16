import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { ButtonVariants } from '@enums/Button';
import { IconNames } from '@enums/Icon';
import { BUTTON_STYLES } from '@constants/Styles';
import Icon from '@components/common/Icon';

interface LinkButtonProps {
  to: string;
  children: ReactNode;
  variant?: ButtonVariants;
  icon?: IconNames;
  className?: string;
}

// A link that looks like a button, so buttons are never nested inside links
const LinkButton: React.FC<LinkButtonProps> = ({ to, children, variant = ButtonVariants.PRIMARY, icon, className }) => (
  <Link to={to} className={clsx(BUTTON_STYLES[variant], className)}>
    {icon ? <Icon name={icon} /> : null}
    {children}
  </Link>
);

export default LinkButton;
