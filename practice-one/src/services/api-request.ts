import { Book } from '@components/BookList/BookCard';
import { CategoryTitle } from '@enums/Category';
import { SortType } from '@enums/Filter';
import { MockDb, wait } from './mock-db';

const compareBooks = (a: Book, b: Book, field: Exclude<SortType, SortType.NONE>) => {
  const x = a[field];
  const y = b[field];

  if (typeof x === 'number' && typeof y === 'number') {
    return x - y;
  }

  return String(x ?? '').localeCompare(String(y ?? ''));
};

export const ApiRequest = {
  async getAllBooks(): Promise<Book[]> {
    await wait();

    return MockDb.load();
  },

  async getBookById(id: string | undefined): Promise<Book> {
    await wait();
    const book = MockDb.load().find(item => item.id === id);

    if (!book) {
      throw new Error('Book not found');
    }

    return book;
  },

  async getBooksBySpecificFields(category: CategoryTitle, sortType: SortType, searchText: string): Promise<Book[]> {
    await wait();
    let books = MockDb.load();

    if (category !== CategoryTitle.ALL) {
      books = books.filter(book => book.category === category);
    }

    // Case-insensitive substring match, like json-server's `title_like`
    const query = searchText.trim().toLowerCase();

    if (query) {
      books = books.filter(book => book.title.toLowerCase().includes(query));
    }

    if (sortType !== SortType.NONE) {
      books = [...books].sort((a, b) => compareBooks(a, b, sortType));
    }

    return books;
  },

  async addBook(data: Book): Promise<void> {
    await wait();
    MockDb.save([...MockDb.load(), data]);
  },

  async updateBook(data: Book): Promise<void> {
    await wait();
    const books = MockDb.load();

    if (!books.some(book => book.id === data.id)) {
      throw new Error('Book not found');
    }

    // Merge like the previous PATCH request did
    MockDb.save(books.map(book => (book.id === data.id ? { ...book, ...data } : book)));
  },

  async deleteBook(id: string): Promise<void> {
    await wait();
    MockDb.save(MockDb.load().filter(book => book.id !== id));
  },
};
