import React, { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ApiRequest } from '@services/api-request';
import { BookContext } from '@stores/book';
import { BookToDelete } from '@stores/book/actions';
import { ButtonVariants } from '@enums/Button';
import { IconNames } from '@enums/Icon';
import Alert from '@components/common/Alert';
import Button from '@components/common/Button';
import Dialog from '@components/common/Dialog';

interface DeleteDialogProps {
  book: BookToDelete;
}

// Asks before deleting a book. Render it only while the store has a book to delete, so it starts fresh each time
const DeleteDialog: React.FC<DeleteDialogProps> = ({ book }) => {
  const { books, getAllBooks, currentBooks, setCurrentBooks, setBookToDelete } = useContext(BookContext);
  const navigate = useNavigate();

  const [deleting, setDeleting] = useState<boolean>(false);
  const [failed, setFailed] = useState<boolean>(false);
  const deleteRef = useRef<HTMLButtonElement>(null);

  // After a failure, focus "Try again" (the buttons were disabled, so focus was lost)
  useEffect(() => {
    if (failed) deleteRef.current?.focus();
  }, [failed]);

  const handleClose = () => setBookToDelete(undefined);

  const handleDelete = async () => {
    setDeleting(true);
    setFailed(false);

    try {
      await ApiRequest.deleteBook(book.id);
    } catch {
      setDeleting(false);
      setFailed(true);
      return;
    }

    // Update the lists in place instead of reloading the page
    getAllBooks(books.filter(item => item.id !== book.id));
    setCurrentBooks(currentBooks.filter(item => item.id !== book.id));
    setBookToDelete(undefined);
    navigate('/');
  };

  return (
    <Dialog
      title={`Delete “${book.title}”?`}
      description="This removes the book from your library. You can't undo this."
      icon={IconNames.TRASH}
      onClose={handleClose}
      dismissible={!deleting}
      actions={(
        <>
          <Button variant={ButtonVariants.SECONDARY} className="w-full sm:w-auto" disabled={deleting} onClick={handleClose}>
            Cancel
          </Button>
          <Button
            ref={deleteRef}
            variant={ButtonVariants.DANGER}
            className="w-full sm:w-auto"
            loading={deleting}
            loadingLabel="Deleting…"
            onClick={handleDelete}
          >
            {failed ? 'Try again' : 'Delete book'}
          </Button>
        </>
      )}
    >
      {failed ? <Alert title="We couldn't delete this book." text="Try again in a moment." /> : null}
    </Dialog>
  );
};

export default DeleteDialog;
