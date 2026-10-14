import React, { useContext } from 'react';
import clsx from 'clsx';
import { BookContext } from '@stores/book';
import { DisplayTypes } from '@enums/Filter';
import BookCard from './BookCard';

const BookList: React.FC = () => {
  const { currentBooks, displayType } = useContext(BookContext);

  const gridStyle = 'grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 pr-5 gap-x-8 gap-y-10';
  const listStyle = 'pr-5 w-full';

  return (
    <section
      className={clsx(
        'max-h-full h-fit py-4 overflow-y-auto',
        displayType === DisplayTypes.GRID ? gridStyle : listStyle,
      )}
    >
      {currentBooks.map(book => {
        return (
          <BookCard
            key={book.id}
            id={book.id}
            title={book.title}
            thumbnail={book.thumbnail}
            author={book.author}
            published={book.published}
          />
        );
      })}
    </section>
  );
};

export default BookList;
