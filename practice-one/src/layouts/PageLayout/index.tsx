import React, { ReactNode, useContext } from 'react';
import Header from '@components/Header';
import clsx from 'clsx';
import DeleteDialog from '@components/DeleteDialog';
import { BookContext } from '@stores/book';

interface LayoutProps {
  children: ReactNode | ReactNode[];
  navBar?: ReactNode;
}

const PageLayout: React.FC<LayoutProps> = ({ children, navBar }) => {
  const { bookToDelete } = useContext(BookContext);

  return (
    <>
      <Header />
      {navBar}
      <main
        className={clsx(
          'relative max-w-[1260px] my-0 mx-auto flex justify-center',
          navBar ? 'h-[calc(100%-135px)]' : 'h-[calc(100%-79px)]',
        )}
      >
        {children}
      </main>
      {bookToDelete ? <DeleteDialog book={bookToDelete} /> : null}
    </>
  );
};

export default PageLayout;
