import React, { useContext } from 'react';
import { BookContext } from '@stores/book';
import { IconButtonVariants } from '@enums/Button';
import { IconNames } from '@enums/Icon';
import IconButton from '@components/common/IconButton';

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
      <IconButton
        variant={IconButtonVariants.SECONDARY}
        icon={IconNames.EDIT}
        label="Edit this book"
        to={`/edit-book/${bookId}`}
      />
      <IconButton
        variant={IconButtonVariants.SECONDARY}
        icon={IconNames.TRASH}
        label="Delete this book"
        onClick={handleClick}
      />
    </>
  );
};

export default BookActions;
