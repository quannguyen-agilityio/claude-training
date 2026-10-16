import { ComponentMeta, ComponentStory } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import { BookProvider } from '@stores/book';
import { CategoryTitle } from '@enums/Category';
import { DisplayTypes } from '@enums/Filter';
import { Book } from './BookCard';
import BookList, { BookListSkeleton } from '.';

// From src/data/books.json, plus one book without a cover
const BOOKS: Book[] = [
  {
    id: '54a7e10e-f3f7-48b7-85a4-92b6363ad7aa',
    title: 'Treasure Island',
    thumbnail: 'https://covers.openlibrary.org/b/isbn/9780141321004-L.jpg',
    author: 'Robert Louis Stevenson',
    published: 1883,
    category: CategoryTitle.ADVENTURE,
  },
  {
    id: 'b5ecd37f-51b4-4062-9d6a-e3d46a4ea700',
    title: 'Around the World in Eighty Days',
    thumbnail: 'https://covers.openlibrary.org/b/isbn/9780140449068-L.jpg',
    author: 'Jules Verne',
    published: 1872,
    category: CategoryTitle.ADVENTURE,
  },
  {
    id: '991f1c19-2d5c-47ad-98f2-a11d2a800d0d',
    title: 'Jane Eyre',
    thumbnail: '',
    author: 'Charlotte Brontë',
    published: 1847,
    category: CategoryTitle.ROMANCE,
  },
  {
    id: '0670d435-acf2-404a-9631-d81ae59ed032',
    title: 'The Hobbit',
    thumbnail: 'https://covers.openlibrary.org/b/isbn/9780547928227-L.jpg',
    author: 'J. R. R. Tolkien',
    published: 1937,
    category: CategoryTitle.FANTASY,
  },
];

export default {
  title: 'components/BookList',
  component: BookList,
  decorators: [
    Story => (
      <MemoryRouter>
        <BookProvider>
          <div className="max-w-5xl">
            <Story />
          </div>
        </BookProvider>
      </MemoryRouter>
    ),
  ],
} as ComponentMeta<typeof BookList>;

const Template: ComponentStory<typeof BookList> = args => <BookList {...args} />;

export const Grid = Template.bind({});
Grid.args = {
  books: BOOKS,
  displayType: DisplayTypes.GRID,
};

export const List = Template.bind({});
List.args = {
  books: BOOKS,
  displayType: DisplayTypes.LIST,
};

export const Loading: ComponentStory<typeof BookList> = () => <BookListSkeleton />;
