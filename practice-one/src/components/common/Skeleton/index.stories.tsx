import { ComponentMeta, ComponentStory } from '@storybook/react';
import Skeleton from '.';

export default {
  title: 'common/Skeleton',
  component: Skeleton,
} as ComponentMeta<typeof Skeleton>;

export const BookCard: ComponentStory<typeof Skeleton> = () => (
  <div className="flex w-40 flex-col">
    <Skeleton className="aspect-cover w-full rounded-md" />
    <Skeleton className="mt-3 h-4 w-4/5" />
    <Skeleton className="mt-2 h-3 w-3/5" />
    <Skeleton className="mt-2 h-3 w-1/4" />
  </div>
);
