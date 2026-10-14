import React, { InputHTMLAttributes } from 'react';

interface SelectProps extends InputHTMLAttributes<HTMLSelectElement> {
  label?: string;
}

const Select: React.FC<SelectProps> = ({ children, label, name, onChange, onBlur }) => {
  return (
    <div className="relative w-full">
      <label htmlFor={name} className="block text-primary font-medium mb-1.5 dark:text-white">
        {label}
        <select
          name={name}
          id={name}
          className="block w-full h-[45px] mb-8 mt-1.5 text-primary bg-link-water px-[15px] rounded-[30px] hover:bg-slate-200
        border border-athens-gray focus:outline-none dark:text-white dark:border-blue-yonder dark:bg-bluewood
      dark:hover:bg-blue-yonder dark:placeholder:text-white"
          onChange={onChange}
          onBlur={onBlur}
        >
          {children}
        </select>
      </label>
    </div>
  );
};

export default Select;
