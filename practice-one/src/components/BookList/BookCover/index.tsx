import React, { useState } from 'react';
import clsx from 'clsx';
import { IconNames } from '@enums/Icon';
import Icon from '@components/common/Icon';

interface BookCoverProps {
  title: string;
  thumbnail?: string;
  // Small covers (list rows) show only the icon in the fallback tile
  compact?: boolean;
}

// Always the cover's real 2:3 shape. Falls back to a tile when the image is missing or fails to load
const BookCover: React.FC<BookCoverProps> = ({ title, thumbnail, compact }) => {
  const [failedSrc, setFailedSrc] = useState<string>();

  if (!thumbnail || failedSrc === thumbnail) {
    return (
      <div
        aria-hidden="true"
        className={clsx(
          'flex aspect-cover w-full flex-col rounded-md border border-line bg-raised text-muted',
          compact ? 'items-center justify-center' : 'justify-between p-3',
        )}
      >
        <Icon name={IconNames.BOOK} className="h-6 w-6" />
        {compact ? null : <span className="line-clamp-4 text-sm font-bold leading-snug">{title}</span>}
      </div>
    );
  }

  return (
    <img
      src={thumbnail}
      alt=""
      loading="lazy"
      onError={() => setFailedSrc(thumbnail)}
      className="block aspect-cover w-full rounded-md bg-raised object-cover shadow-cover transition-shadow group-hover:shadow-cover-lg"
    />
  );
};

export default BookCover;
