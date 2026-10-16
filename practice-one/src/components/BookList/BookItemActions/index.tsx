import React, { useContext } from 'react';
import { BookContext } from '@stores/book';
import { IconNames } from '@enums/Icon';
import IconButton from '@components/common/IconButton';

interface BookItemActionsProps {
  id: string;
  title: string;
}

// Always visible (not only on hover), labeled with the book title
const BookItemActions: React.FC<BookItemActionsProps> = ({ id, title }) => {
  const { setShowConfirmBox, setCurrentBookId } = useContext(BookContext);

  const handleDelete = () => {
    setCurrentBookId(id);
    setShowConfirmBox(true);
  };

  return (
    <div className="-mr-2 flex shrink-0">
      <IconButton to={`/edit-book/${id}`} icon={IconNames.EDIT} label={`Edit ${title}`} />
      <IconButton icon={IconNames.TRASH} label={`Delete ${title}`} onClick={handleDelete} />
    </div>
  );
};

export default BookItemActions;
