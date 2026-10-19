import React from 'react';

interface DetailGroupProps {
  title: string;
  content?: string;
}

const DetailGroup: React.FC<DetailGroupProps> = ({ title, content }) => {
  return (
    <p className="flex items-center text-sm mb-4 dark:text-white">
      {title}:{' '}
      <span className="px-[17px] py-[5px] ml-[9px] text-sm text-azure-radiance bg-link-water rounded-full">
        {content}
      </span>
    </p>
  );
};

export default DetailGroup;
