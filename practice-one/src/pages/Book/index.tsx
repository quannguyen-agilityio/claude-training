import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ApiRequest } from '@services/api-request';
import PageLayout from '@layouts/PageLayout';
import Loading from '@components/common/Loading';
import BookPanel from '@components/BookPanel';
import BookDetails from '@components/BookDetails';
import { Book } from '@components/BookList/BookCard';
import BookBar from '@components/BookBar';

const BookPage: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const [currentBook, setCurrentBook] = useState<Book>({} as Book);

  const { bookId } = useParams();

  useEffect(() => {
    let ignore = false;

    const fetchBook = async (bookId: string | undefined) => {
      try {
        setLoading(true);

        const result = await ApiRequest.getBookById(bookId);

        if (!ignore) setCurrentBook(result);

        setLoading(false);
      } catch (error) {
        alert(error);
      }
    };

    fetchBook(bookId);

    return () => {
      ignore = true;
    };
  }, [bookId]);

  if (!currentBook) return <Loading />;

  const { title, thumbnail, description, author, published, publishers, category, country } = currentBook;

  return (
    <>
      {loading ? <Loading /> : null}
      <PageLayout navBar={<BookBar bookId={bookId} />}>
        <div className="sm:flex overflow-y-auto">
          <BookPanel
            author={author}
            publishedYear={published}
            publishers={publishers}
            category={category}
            country={country}
          />
          <BookDetails title={title} thumbnail={thumbnail} description={description} />
        </div>
      </PageLayout>
    </>
  );
};

export default BookPage;
