import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Button from '@components/common/Button';
import { ButtonTypes } from '@enums/Button';
import { BookContext } from '@stores/book';
import FilterButton from './FilterButton';
import FilterResult from './FilterResult';

const FeaturesBar: React.FC = () => {
  const { currentBooks, currentCategory } = useContext(BookContext);

  return (
    <div className="w-full h-[56px] border-b border-athens-gray flex items-center justify-center bg-white dark:bg-black">
      <div className="relative w-[1260px] pl-11 pr-5 xl:pr-0 flex justify-between items-center">
        <h2 className="text-lg hidden lg:block dark:text-white">Categories</h2>
        <FilterResult category={currentCategory} results={currentBooks.length} />
        <div className="absolute flex gap-2 right-[35px] top-14 sm:relative sm:top-0 sm:right-0">
          <Link to="/add-new-book">
            <Button variant={ButtonTypes.PRIMARY}>+ Add Book</Button>
          </Link>
          <FilterButton />
        </div>
      </div>
    </div>
  );
};

export default FeaturesBar;
