import React from 'react';
import Container from '@layouts/Container';
import Header from '@components/Header';
import BookForm from '@components/BookForm';

const AddPage: React.FC = () => (
  <>
    <Header />
    <Container className="pb-16 pt-4 sm:pt-6">
      <main>
        <BookForm />
      </main>
    </Container>
  </>
);

export default AddPage;
