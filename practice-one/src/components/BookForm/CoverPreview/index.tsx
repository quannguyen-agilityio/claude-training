import React from 'react';
import BookCover from '@components/BookList/BookCover';

interface CoverPreviewProps {
  title: string;
  // The last valid cover URL. Empty shows the fallback tile
  thumbnail: string;
}

// Beside the form on desktop, above it on phones
const CoverPreview: React.FC<CoverPreviewProps> = ({ title, thumbnail }) => (
  <aside className="flex items-center gap-4 lg:order-last lg:block lg:w-56">
    <div className="w-32 shrink-0 lg:w-full">
      <BookCover title={title || 'No cover yet'} thumbnail={thumbnail} />
    </div>
    <div className="lg:mt-3">
      <p className="text-sm font-semibold text-ink">Cover preview</p>
      <p className="mt-1 text-sm text-muted">Updates when you leave the Cover image URL field.</p>
    </div>
  </aside>
);

export default CoverPreview;
