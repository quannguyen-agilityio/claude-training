import React, { useContext } from 'react';
import editIconUrl from '@assets/images/icons/edit.svg';
import deleteIconUrl from '@assets/images/icons/delete.svg';
import Button from '@components/common/Button';
import { ButtonTypes } from '@enums/Button';
import { Link } from 'react-router-dom';
import { BookContext } from '@stores/book';

interface BookActionsProp {
  bookId?: string;
}

const BookActions: React.FC<BookActionsProp> = ({ bookId }) => {
  const { setShowConfirmBox, setCurrentBookId } = useContext(BookContext);

  const handleClick = () => {
    setShowConfirmBox(true);
    setCurrentBookId(bookId);
  };

  return (
    <>
      <Link to={`/edit-book/${bookId}`}>
        <Button variant={ButtonTypes.CIRCLE} iconUrl={editIconUrl} hasBorder />
      </Link>
      <Button variant={ButtonTypes.CIRCLE} iconUrl={deleteIconUrl} hasBorder onClick={handleClick} />
    </>
  );
};

export default BookActions;
