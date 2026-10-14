import React, { ButtonHTMLAttributes } from 'react';
import clsx from 'clsx';
import { ButtonTypes } from '@enums/Button';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: ButtonTypes;
  children?: string;
  iconUrl?: string;
  hasBorder?: boolean;
}

const buttonStyles: { [index: string]: string } = {
  primary: 'bg-azure-radiance text-white',
  secondary: 'bg-link-water text-comet',
  tertiary: 'bg-white text-comet',
  warning: 'bg-warning text-white',
  circle: `w-10 h-10 rounded-full flex justify-center items-center hover:bg-slate-200 
  aria-checked:bg-link-water aria-checked:border-none dark:bg-link-water dark:hover:bg-blue-yonder dark:aria-checked:bg-blue-yonder`,
};

const Button: React.FC<ButtonProps> = ({ children, onClick, iconUrl, variant, hasBorder, type, ...rest }) => {
  const commonStyle = `min-w-[116px] h-[45px] rounded-[30px] text-primary flex justify-center items-center 
  gap-2.5 p-4 hover:opacity-80 active:translate-y-px`;

  const checkBorder = () => {
    return hasBorder ? 'border border-athens-gray' : null;
  };

  const classFilter = (type: typeof variant) => {
    if (type === ButtonTypes.CIRCLE) {
      return buttonStyles[type];
    }

    return clsx(commonStyle, buttonStyles[type]);
  };

  return (
    <button type={type} className={clsx(checkBorder(), classFilter(variant))} onClick={onClick} {...rest}>
      {iconUrl && <img src={iconUrl} alt="Icon" />}
      {children}
    </button>
  );
};

export default Button;
