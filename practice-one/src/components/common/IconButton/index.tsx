import React, { ButtonHTMLAttributes } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { IconButtonVariants } from '@enums/Button';
import { IconNames } from '@enums/Icon';
import { ICON_BUTTON_STYLES } from '@constants/Styles';
import Icon from '@components/common/Icon';

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  // Accessible name, required because the button only shows an icon
  label: string;
  icon: IconNames;
  variant?: IconButtonVariants;
  // Renders a link instead of a button
  to?: string;
}

const IconButton: React.FC<IconButtonProps> = ({
  label,
  icon,
  variant = IconButtonVariants.GHOST,
  to,
  className,
  type = 'button',
  ...rest
}) => {
  const classes = clsx(ICON_BUTTON_STYLES[variant], className);

  if (to) {
    return (
      <Link to={to} className={classes} aria-label={label}>
        <Icon name={icon} />
      </Link>
    );
  }

  return (
    <button type={type} className={classes} aria-label={label} {...rest}>
      <Icon name={icon} />
    </button>
  );
};

export default IconButton;
