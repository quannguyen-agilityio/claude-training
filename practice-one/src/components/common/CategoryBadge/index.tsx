import React from 'react';
import clsx from 'clsx';
import { CategoryTitle } from '@enums/Category';
import { CATEGORY_DOT_STYLES } from '@constants/Category';

interface CategoryBadgeProps {
  category: CategoryTitle;
}

const CategoryBadge: React.FC<CategoryBadgeProps> = ({ category }) => (
  <span className="inline-flex min-w-0 items-center gap-1.5 rounded-full border border-line bg-surface px-2.5 py-0.5 text-xs font-semibold text-ink">
    <span className={clsx('h-2 w-2 shrink-0 rounded-full', CATEGORY_DOT_STYLES[category])} />
    <span className="truncate">{category}</span>
  </span>
);

export default CategoryBadge;
