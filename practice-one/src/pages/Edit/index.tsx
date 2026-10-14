import React from 'react';
import PageLayout from '@layouts/PageLayout';
import BookForm from '@components/BookForm';

const EditPage: React.FC = () => {
  return (
    <PageLayout>
      <BookForm formTitle="Edit Book" />
    </PageLayout>
  );
};

export default EditPage;
