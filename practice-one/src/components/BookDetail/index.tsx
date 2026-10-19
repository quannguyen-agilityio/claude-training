import React from 'react';
import { ButtonVariants } from '@enums/Button';
import { IconNames } from '@enums/Icon';
import { Book } from '@components/BookList/BookCard';
import BookCover from '@components/BookList/BookCover';
import Button from '@components/common/Button';
import CategoryBadge from '@components/common/CategoryBadge';
import LinkButton from '@components/common/LinkButton';
import DetailItem from './DetailItem';

interface BookDetailProps {
  book: Book;
  onDelete: () => void;
}

// Cover on the left, everything about the book on the right (one column on phones)
const BookDetail: React.FC<BookDetailProps> = ({ book, onDelete }) => {
  const { id, title, thumbnail, author, description, category, published, country, publishers } = book;

  return (
    <div className="flex flex-col items-center gap-8 md:flex-row md:items-start md:gap-14">
      <div className="w-48 shrink-0 md:w-80">
        <BookCover title={title} thumbnail={thumbnail} alt={`Cover of ${title}`} />
      </div>
      <div className="w-full min-w-0 max-w-2xl">
        {category ? <CategoryBadge category={category} /> : null}
        <h1 className="mt-4 break-words text-4xl font-extrabold tracking-tight text-ink">{title}</h1>
        <p className="mt-2 text-lg text-muted">
          by <span className="font-semibold text-ink">{author}</span>
        </p>
        {description ? (
          <p className="mt-6 max-w-prose text-lg leading-relaxed text-ink">{description}</p>
        ) : (
          <p className="mt-6 text-lg text-muted">No description yet.</p>
        )}
        <dl className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line">
          <DetailItem label="Published" value={published} />
          <DetailItem label="Country" value={country} />
          <DetailItem label="Publisher" value={publishers} />
          <DetailItem label="Category" value={category} />
        </dl>
        <div className="mt-8 grid grid-cols-2 gap-3 sm:flex">
          <LinkButton to={`/edit-book/${id}`} icon={IconNames.EDIT}>
            Edit book
          </LinkButton>
          <Button variant={ButtonVariants.DANGER_SECONDARY} icon={IconNames.TRASH} aria-haspopup="dialog" onClick={onDelete}>
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;
