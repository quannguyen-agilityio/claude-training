import React, { ReactNode, useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ApiRequest } from '@services/api-request';
import { BookContext } from '@stores/book';
import { ButtonVariants } from '@enums/Button';
import { IconNames } from '@enums/Icon';
import { LoadStatus } from '@enums/LoadStatus';
import Container from '@layouts/Container';
import Header from '@components/Header';
import { Book } from '@components/BookList/BookCard';
import BookDetail from '@components/BookDetail';
import BookDetailSkeleton from '@components/BookDetail/BookDetailSkeleton';
import BackLink from '@components/common/BackLink';
import EmptyState from '@components/common/EmptyState';
import LinkButton from '@components/common/LinkButton';
import DeleteDialog from '@components/DeleteDialog';

const BookPage: React.FC = () => {
  const { bookId } = useParams();
  const { bookToDelete, setBookToDelete } = useContext(BookContext);

  const [book, setBook] = useState<Book>();
  const [status, setStatus] = useState<LoadStatus>(LoadStatus.LOADING);

  // Close the delete dialog when leaving the page (e.g. browser back), so it doesn't reopen on the next page
  useEffect(() => () => setBookToDelete(undefined), [setBookToDelete]);

  useEffect(() => {
    let ignore = false;

    const fetchBook = async () => {
      setStatus(LoadStatus.LOADING);

      try {
        const result = await ApiRequest.getBookById(bookId);

        if (ignore) return;

        setBook(result);
        setStatus(LoadStatus.READY);
      } catch {
        // The only failure is an unknown id ("Book not found")
        if (!ignore) setStatus(LoadStatus.ERROR);
      }
    };

    fetchBook();

    return () => {
      ignore = true;
    };
  }, [bookId]);

  const renderContent = (): ReactNode => {
    if (status === LoadStatus.LOADING) return <BookDetailSkeleton />;

    if (status === LoadStatus.ERROR || !book) {
      return (
        <EmptyState
          icon={IconNames.SEARCH}
          title="We couldn't find that book"
          text="It may have been deleted, or the link is wrong."
          actions={(
            <LinkButton to="/" variant={ButtonVariants.SECONDARY} icon={IconNames.BACK}>
              Back to all books
            </LinkButton>
          )}
        />
      );
    }

    return <BookDetail book={book} onDelete={() => setBookToDelete({ id: book.id, title: book.title })} />;
  };

  return (
    <>
      <Header />
      <Container className="pb-16 pt-4 sm:pt-6">
        <BackLink to="/">All books</BackLink>
        <main className="mt-4" aria-busy={status === LoadStatus.LOADING || undefined}>
          {renderContent()}
        </main>
      </Container>
      {bookToDelete ? <DeleteDialog book={bookToDelete} /> : null}
    </>
  );
};

export default BookPage;
