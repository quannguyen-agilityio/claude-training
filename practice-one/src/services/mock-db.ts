import { Book } from '@components/BookList/BookCard';
import { StorageKeys } from '@enums/StorageKey';
import { LocalStorage } from '@helpers/localStorage';
import seed from '../data/books.json';

// Simulated network latency so loading states stay visible. Set to 0 to disable
export const MOCK_DELAY_MS = 300;

// Deep copy so mutations never leak back into the imported seed module
const seedBooks = (): Book[] => structuredClone(seed.books) as Book[];

export const MockDb = {
  /**
   * Load books from local storage, or fall back to the seed data
   * when storage is empty, corrupted or holds an older seed version
   */
  load(): Book[] {
    try {
      const version = LocalStorage.get(StorageKeys.BOOKS_SEED_VERSION);
      const raw = LocalStorage.get(StorageKeys.BOOKS);

      if (raw && version === String(seed.version)) {
        return JSON.parse(raw) as Book[];
      }
    } catch {
      // Corrupted or unavailable storage, fall through to the seed
    }

    const books = seedBooks();
    MockDb.save(books);

    return books;
  },

  /**
   * Save books to local storage
   * @param books
   */
  save(books: Book[]): void {
    try {
      LocalStorage.set(StorageKeys.BOOKS, JSON.stringify(books));
      LocalStorage.set(StorageKeys.BOOKS_SEED_VERSION, String(seed.version));
    } catch {
      // Storage full or blocked, changes only live until the next reload
    }
  },

  /**
   * Restore the seed data
   */
  reset(): void {
    MockDb.save(seedBooks());
  },
};

export const wait = (ms = MOCK_DELAY_MS) => new Promise<void>(resolve => {
  setTimeout(resolve, ms);
});
