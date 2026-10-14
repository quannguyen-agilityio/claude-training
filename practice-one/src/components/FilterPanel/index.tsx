import React, { useContext } from 'react';
import xmarkIconUrl from '@assets/images/icons/xmark.svg';
import { BookContext } from '@stores/book';
import { CategoryTitle } from '@enums/Category';
import Button from '@components/common/Button';
import { ButtonTypes } from '@enums/Button';
import Category, { CategoryProps } from './Category';

export const CATEGORIES: Omit<CategoryProps, 'quantity'>[] = [
  {
    title: CategoryTitle.ADVENTURE,
    bgColor: 'orange',
  },
  {
    title: CategoryTitle.CONTEMPORARY,
    bgColor: 'blue',
  },
  {
    title: CategoryTitle.ROMANCE,
    bgColor: 'pink',
  },
  {
    title: CategoryTitle.FANTASY,
    bgColor: 'violet',
  },
  {
    title: CategoryTitle.DYSTOPIAN,
    bgColor: 'cyan',
  },
  {
    title: CategoryTitle.MYSTERY,
    bgColor: 'black',
  },
];

const FilterPanel: React.FC = () => {
  const { books, currentCategory, setCurrentCategory } = useContext(BookContext);

  return (
    <aside className="w-[268px] h-full flex flex-col items-center pt-[19px] bg-white dark:bg-black border-x border-athens-gray">
      <h3 className="text-primary font-normal w-[177px] mb-[18px] dark:text-white">
        A curated list of every book ever written
      </h3>
      {CATEGORIES.map(category => {
        return (
          <Category
            key={category.title}
            title={category.title}
            quantity={books.filter(book => book.category === category.title).length}
            bgColor={category.bgColor}
            aria-checked={category.title === currentCategory}
            onClick={() => setCurrentCategory(category.title)}
          />
        );
      })}
      <div className="mt-3">
        <Button
          variant={ButtonTypes.CIRCLE}
          iconUrl={xmarkIconUrl}
          onClick={() => setCurrentCategory(CategoryTitle.ALL)}
        />
      </div>
    </aside>
  );
};

export default FilterPanel;
