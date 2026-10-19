import React from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { FOCUS_RING } from '@constants/Styles';
import CategoryBadge from '@components/common/CategoryBadge';
import { Book } from '../BookCard';
import BookCover from '../BookCover';
import BookItemActions from '../BookItemActions';

interface BookRowProps {
  book: Book;
}

// One book in the list view
const BookRow: React.FC<BookRowProps> = ({ book }) => {
  const { id, title, thumbnail, author, published, category } = book;

  return (
    <li className="flex items-center gap-3 rounded-xl border border-line bg-surface p-3 sm:gap-5 sm:p-4">
      <Link to={`/${id}`} className={clsx('group flex min-w-0 flex-1 items-center gap-4 rounded-lg sm:gap-5', FOCUS_RING)}>
        <div className="w-14 shrink-0 sm:w-16">
          <BookCover title={title} thumbnail={thumbnail} compact />
        </div>
        <div className="min-w-0">
          <h2 className="line-clamp-2 text-base font-bold leading-snug text-ink group-hover:underline sm:text-lg">
            {title}
          </h2>
          <p className="mt-0.5 truncate text-sm text-muted">
            {author} · {published}
          </p>
          {category ? (
            <div className="mt-2 flex">
              <CategoryBadge category={category} />
            </div>
          ) : null}
        </div>
      </Link>
      <BookItemActions id={id} title={title} />
    </li>
  );
};

export default BookRow;
