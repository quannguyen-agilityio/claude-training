import React from 'react';
import clsx from 'clsx';
import { CategoryTitle } from '@enums/Category';
import { CATEGORIES, CATEGORY_DOT_STYLES } from '@constants/Category';
import { FOCUS_RING } from '@constants/Styles';

interface CategoryNavProps {
  selected: CategoryTitle;
  // Left out while the books are loading
  counts?: Record<CategoryTitle, number>;
  onSelect: (category: CategoryTitle) => void;
}

const ITEMS = [CategoryTitle.ALL, ...CATEGORIES];

// A list in a left column on desktop, a scrolling chip row on tablet and phone
const CategoryNav: React.FC<CategoryNavProps> = ({ selected, counts, onSelect }) => (
  <nav aria-label="Categories" className="lg:w-60 lg:shrink-0">
    <h2 className="mb-2 hidden px-3 text-xs font-bold uppercase tracking-wider text-muted lg:block">Categories</h2>
    <ul className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:-mx-6 sm:px-6 lg:mx-0 lg:flex-col lg:gap-0.5 lg:overflow-visible lg:px-0 lg:pb-0">
      {ITEMS.map(category => {
        const isSelected = category === selected;

        return (
          <li key={category} className="shrink-0">
            <button
              type="button"
              aria-pressed={isSelected}
              onClick={() => onSelect(category)}
              className={clsx(
                'flex h-11 w-full items-center gap-3 rounded-full border px-4 text-left text-sm transition-colors lg:rounded-lg lg:border-0 lg:px-3',
                isSelected
                  ? 'border-transparent bg-accent-soft font-bold text-accent-ink'
                  : 'border-line bg-surface font-medium text-ink hover:bg-raised lg:bg-transparent',
                FOCUS_RING,
              )}
            >
              <span className={clsx('h-2.5 w-2.5 shrink-0 rounded-full', CATEGORY_DOT_STYLES[category])} />
              <span className="whitespace-nowrap lg:flex-1">
                {category === CategoryTitle.ALL ? 'All books' : category}
              </span>
              {counts ? <span className="text-xs font-semibold text-muted">{counts[category]}</span> : null}
            </button>
          </li>
        );
      })}
    </ul>
  </nav>
);

export default CategoryNav;
