import React from 'react';
import { DisplayTypes } from '@enums/Filter';
import BookCard, { Book } from './BookCard';
import BookRow from './BookRow';
import BookCardSkeleton from './BookCardSkeleton';

export const GRID_STYLES = 'grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-books sm:gap-x-6 sm:gap-y-9';

const SKELETON_COUNT = 10;

interface BookListProps {
  books: Book[];
  displayType: DisplayTypes;
}

const BookList: React.FC<BookListProps> = ({ books, displayType }) => {
  if (displayType === DisplayTypes.LIST) {
    return (
      <ul className="flex flex-col gap-3">
        {books.map(book => (
          <BookRow key={book.id} book={book} />
        ))}
      </ul>
    );
  }

  return (
    <ul className={GRID_STYLES}>
      {books.map(book => (
        <BookCard key={book.id} book={book} />
      ))}
    </ul>
  );
};

// Shown while the first load is in flight
export const BookListSkeleton: React.FC = () => (
  <ul className={GRID_STYLES} aria-busy="true">
    {Array.from({ length: SKELETON_COUNT }, (_, index) => (
      <BookCardSkeleton key={index} />
    ))}
  </ul>
);

export default BookList;
