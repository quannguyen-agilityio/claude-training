import React from 'react';
import clsx from 'clsx';
import { CategoryTitle } from '@enums/Category';

export interface CategoryProps {
  title: CategoryTitle;
  quantity: number;
  bgColor: string;
  onClick?: () => void;
}

const bgColors: { [index: string]: string } = {
  orange: 'bg-[#FF6231]',
  blue: 'bg-[#0DA8FF]',
  pink: 'bg-[#F388B5]',
  violet: 'bg-[#770DFF]',
  cyan: 'bg-[#4F85AC]',
  black: 'bg-[#14282F]',
};

const Category: React.FC<CategoryProps> = ({ title, quantity, bgColor, onClick, ...rest }) => {
  return (
    <button
      type="button"
      className={`flex items-center justify-between w-[236px] h-14 px-6 py-2 rounded-[10px] hover:bg-slate-200 
      aria-checked:bg-link-water dark:bg-black dark:hover:bg-blue-yonder dark:aria-checked:bg-blue-yonder`}
      onClick={onClick}
      {...rest}
    >
      <div className="flex items-center gap-[11px]">
        <span
          className={clsx(
            'text-white text-md font-bold w-10 h-10 rounded-full flex justify-center items-center',
            bgColors[bgColor],
          )}
        >
          {title.substring(0, 2)}
        </span>
        <p className="text-secondary font-normal dark:text-white">{title}</p>
      </div>
      <p className="text-tertiary text-comet dark:text-link-water">{quantity}</p>
    </button>
  );
};

export default Category;
