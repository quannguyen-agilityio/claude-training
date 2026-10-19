import React from 'react';

interface DetailItemProps {
  label: string;
  value?: string | number;
}

// One cell of the 2×2 facts grid
const DetailItem: React.FC<DetailItemProps> = ({ label, value }) => (
  <div className="min-w-0 bg-surface px-4 py-3">
    <dt className="text-xs font-bold uppercase tracking-wider text-muted">{label}</dt>
    <dd className="mt-1 break-words font-semibold text-ink">{value || '—'}</dd>
  </div>
);

export default DetailItem;
