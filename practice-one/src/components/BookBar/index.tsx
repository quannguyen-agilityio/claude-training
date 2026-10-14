import React from 'react';
import { Link } from 'react-router-dom';
import backIconUrl from '@assets/images/icons/back.svg';
import Button from '@components/common/Button';
import { ButtonTypes } from '@enums/Button';
import SubHeader from '@components/SubHeader';
import BookActions from '@components/BookActions';

interface BookBarProps {
  bookId?: string;
}

const BookBar: React.FC<BookBarProps> = ({ bookId }) => {
  return (
    <div className="h-[56px] border-y border-athens-gray flex justify-center bg-white dark:bg-black">
      <div className="relative w-full max-w-[1260px] flex justify-between items-center pl-10 pr-5 xl:pr-0">
        <SubHeader />
        <div className="flex gap-2">
          <Link to="/">
            <Button variant={ButtonTypes.SECONDARY} iconUrl={backIconUrl}>
              Back
            </Button>
          </Link>
          <BookActions bookId={bookId} />
        </div>
      </div>
    </div>
  );
};

export default BookBar;
