import React from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { CategoryTitle } from '@enums/Category';
import { CATEGORY_DOT_STYLES } from '@constants/Category';
import { FOCUS_RING } from '@constants/Styles';
import BookCover from '../BookCover';
import BookItemActions from '../BookItemActions';

export interface Book {
  id: string;
  title: string;
  thumbnail: string;
  author: string;
  published: number;
  description?: string;
  category?: CategoryTitle;
  publishers?: string;
  country?: string;
}

interface BookCardProps {
  book: Book;
}

// One book in the grid view
const BookCard: React.FC<BookCardProps> = ({ book }) => {
  const { id, title, thumbnail, author, published, category } = book;

  return (
    <li className="flex min-w-0 flex-col">
      <Link to={`/${id}`} className={clsx('group block rounded-md', FOCUS_RING)}>
        <BookCover title={title} thumbnail={thumbnail} />
        <h2 className="mt-3 line-clamp-2 text-base font-bold leading-snug text-ink group-hover:underline">{title}</h2>
      </Link>
      <p className="mt-1 truncate text-sm text-muted">{author}</p>
      <p className="mt-0.5 flex min-w-0 items-center gap-1.5 text-sm text-muted">
        <span className={clsx('h-2 w-2 shrink-0 rounded-full', CATEGORY_DOT_STYLES[category ?? CategoryTitle.ALL])} />
        <span className="truncate">{category ? `${published} · ${category}` : published}</span>
      </p>
      <div className="mt-auto flex justify-end pt-1">
        <BookItemActions id={id} title={title} />
      </div>
    </li>
  );
};

export default BookCard;
