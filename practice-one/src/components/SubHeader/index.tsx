import React from 'react';

const SubHeader: React.FC = () => {
  return (
    <div className="relative w-full flex justify-between items-center">
      <div className="flex gap-32">
        <h2 className="text-lg dark:text-white">Book Details</h2>
      </div>
    </div>
  );
};

export default SubHeader;
