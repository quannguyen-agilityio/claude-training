import React, { HTMLInputTypeAttribute } from 'react';
import clsx from 'clsx';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  type: HTMLInputTypeAttribute;
  iconUrl?: string;
  label?: string;
  errorMsg?: string;
}

const Input: React.FC<InputProps> = ({
  type,
  label,
  errorMsg,
  iconUrl,
  onChange,
  onBlur,
  name,
  placeholder,
  ...rest
}) => {
  const inputStyles = `block w-full text-primary bg-link-water px-[15px] rounded-[30px] hover:bg-slate-200
  border border-athens-gray focus:outline-none dark:text-white dark:border-blue-yonder dark:bg-bluewood
  dark:hover:bg-blue-yonder dark:placeholder:text-white`;

  return (
    <div className="relative w-full">
      {label && (
        <label htmlFor={name} className="block text-primary font-medium mb-1.5 dark:text-white">
          {label}
        </label>
      )}
      <input
        type={type}
        id={name}
        name={name}
        className={clsx(inputStyles, iconUrl ? 'pl-12 h-[53px]' : 'h-[45px] mb-8')}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        {...rest}
      />
      {iconUrl && <img className="absolute left-4 top-4" src={iconUrl} alt="Icon" />}
      <p className="absolute bottom-[-22px] text-warning text-secondary italic">{errorMsg}</p>
    </div>
  );
};

export default Input;
