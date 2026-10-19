import React from 'react';
import { ButtonVariants } from '@enums/Button';
import { IconNames } from '@enums/Icon';
import LinkButton from '@components/common/LinkButton';
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
          <LinkButton to="/" variant={ButtonVariants.SECONDARY} icon={IconNames.BACK}>
            Back
          </LinkButton>
          <BookActions bookId={bookId} />
        </div>
      </div>
    </div>
  );
};

export default BookBar;
