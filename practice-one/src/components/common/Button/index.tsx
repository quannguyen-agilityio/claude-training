import React, { ButtonHTMLAttributes, forwardRef, ReactNode } from 'react';
import clsx from 'clsx';
import { ButtonVariants } from '@enums/Button';
import { IconNames } from '@enums/Icon';
import { BUTTON_STYLES } from '@constants/Styles';
import Icon from '@components/common/Icon';
import Spinner from '@components/common/Spinner';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariants;
  icon?: IconNames;
  loading?: boolean;
  // Shown with the spinner while loading, e.g. "Saving…". Defaults to the children
  loadingLabel?: string;
}

const STACK = 'col-start-1 row-start-1 inline-flex items-center justify-center gap-2';

// Forwards its ref, so a dialog can move focus to a button
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { children, variant = ButtonVariants.PRIMARY, icon, loading = false, loadingLabel, disabled, className, type = 'button', ...rest },
    ref,
  ) => (
    <button
      ref={ref}
      type={type}
      className={clsx(BUTTON_STYLES[variant], className)}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...rest}
    >
      {/* Both contents share one grid cell, so the button keeps its width when it starts loading.
        The hidden one is visibility: hidden, which also hides it from screen readers */}
      <span className="grid">
        <span className={clsx(STACK, loading && 'invisible')}>
          {icon ? <Icon name={icon} /> : null}
          {children}
        </span>
        <span className={clsx(STACK, !loading && 'invisible')}>
          <Spinner />
          {loadingLabel ?? children}
        </span>
      </span>
    </button>
  ),
);

Button.displayName = 'Button';

export default Button;
