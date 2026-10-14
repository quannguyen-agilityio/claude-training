import React, { InputHTMLAttributes } from 'react';

interface TextareaProps extends InputHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  errorMsg?: string;
}

const Textarea: React.FC<TextareaProps> = ({ label, errorMsg, name, onChange, onBlur, ...rest }) => {
  return (
    <div className="relative w-full">
      <label htmlFor={name} className="block text-primary font-medium mb-1.5 dark:text-white">
        {label}
      </label>
      <textarea
        id={name}
        name={name}
        onChange={onChange}
        onBlur={onBlur}
        className="block w-full text-primary bg-link-water p-[15px] rounded-[20px] hover:bg-slate-200
        border border-athens-gray focus:outline-none dark:text-white dark:border-blue-yonder dark:bg-bluewood
      dark:hover:bg-blue-yonder dark:placeholder:text-white h-[80px] mb-8 resize-none"
        {...rest}
      />
      <p className="absolute bottom-[-22px] text-warning text-secondary italic">{errorMsg}</p>
    </div>
  );
};

export default Textarea;
