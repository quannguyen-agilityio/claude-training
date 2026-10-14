import React from 'react';
import PageLayout from '@layouts/PageLayout';
import BookForm from '@components/BookForm';

const AddPage: React.FC = () => {
  return (
    <PageLayout>
      <BookForm formTitle="Add New Book" />
    </PageLayout>
  );
};

export default AddPage;
