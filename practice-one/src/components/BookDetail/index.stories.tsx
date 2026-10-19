import { ComponentMeta, ComponentStory } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import { CategoryTitle } from '@enums/Category';
import { Book } from '@components/BookList/BookCard';
import BookDetailSkeleton from './BookDetailSkeleton';
import BookDetail from '.';

export default {
  title: 'components/BookDetail',
  component: BookDetail,
  decorators: [
    Story => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
} as ComponentMeta<typeof BookDetail>;

// From src/data/books.json
const TREASURE_ISLAND: Book = {
  id: '54a7e10e-f3f7-48b7-85a4-92b6363ad7aa',
  title: 'Treasure Island',
  thumbnail: 'https://covers.openlibrary.org/b/isbn/9780141321004-L.jpg',
  author: 'Robert Louis Stevenson',
  published: 1883,
  description:
    'Young Jim Hawkins finds a treasure map and sails with the cunning Long John Silver in search of buried pirate gold.',
  category: CategoryTitle.ADVENTURE,
  publishers: 'Cassell and Company',
  country: 'United Kingdom',
};

const Template: ComponentStory<typeof BookDetail> = args => <BookDetail {...args} />;

export const Default = Template.bind({});
Default.args = {
  book: TREASURE_ISLAND,
};

export const LongContent = Template.bind({});
LongContent.args = {
  book: {
    id: 'b5ecd37f-51b4-4062-9d6a-e3d46a4ea700',
    title: 'Around the World in Eighty Days',
    thumbnail: 'https://covers.openlibrary.org/b/isbn/9780140449068-L.jpg',
    author: 'Jules Verne',
    published: 1872,
    description:
      'Phileas Fogg wagers his fortune that he can circle the globe in eighty days, with his valet Passepartout at his side.',
    category: CategoryTitle.ADVENTURE,
    publishers: 'Pierre-Jules Hetzel',
    country: 'France',
  },
};

export const MissingCoverAndDescription = Template.bind({});
MissingCoverAndDescription.args = {
  book: { ...TREASURE_ISLAND, thumbnail: '', description: '' },
};

export const Loading: ComponentStory<typeof BookDetailSkeleton> = () => <BookDetailSkeleton />;
