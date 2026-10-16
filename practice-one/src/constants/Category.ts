import { CategoryTitle } from '@enums/Category';

// Every category except "All", in display order
export const CATEGORIES: Exclude<CategoryTitle, CategoryTitle.ALL>[] = [
  CategoryTitle.ADVENTURE,
  CategoryTitle.CONTEMPORARY,
  CategoryTitle.ROMANCE,
  CategoryTitle.FANTASY,
  CategoryTitle.DYSTOPIAN,
  CategoryTitle.MYSTERY,
];

// Full class names so Tailwind can find them. Decorative only, never the only signal
export const CATEGORY_DOT_STYLES: Record<CategoryTitle, string> = {
  [CategoryTitle.ALL]: 'bg-muted',
  [CategoryTitle.ADVENTURE]: 'bg-cat-adventure',
  [CategoryTitle.CONTEMPORARY]: 'bg-cat-contemporary',
  [CategoryTitle.ROMANCE]: 'bg-cat-romance',
  [CategoryTitle.FANTASY]: 'bg-cat-fantasy',
  [CategoryTitle.DYSTOPIAN]: 'bg-cat-dystopian',
  [CategoryTitle.MYSTERY]: 'bg-cat-mystery',
};
