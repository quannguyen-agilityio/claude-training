import React from 'react';
import { useParams } from 'react-router-dom';
import Container from '@layouts/Container';
import Header from '@components/Header';
import BookForm from '@components/BookForm';

const EditPage: React.FC = () => {
  const { bookId } = useParams();

  return (
    <>
      <Header />
      <Container className="pb-16 pt-4 sm:pt-6">
        <main>
          {/* A new key resets the form when the route moves to another book */}
          <BookForm key={bookId} bookId={bookId} />
        </main>
      </Container>
    </>
  );
};

export default EditPage;
