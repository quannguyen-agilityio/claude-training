import { Book } from '@components/BookList/BookCard';
import { CategoryTitle } from '@enums/Category';
import { SortType } from '@enums/Filter';
import { ApiService } from './api-service';
import { API_URLS } from './app-config';

export const ApiRequest = {
  async getAllBooks(): Promise<Book[]> {
    const books = await ApiService.getList<Book>(`${API_URLS.BOOKS}`);

    return books;
  },

  async getBookById(id: string | undefined): Promise<Book> {
    const book = await ApiService.getItemById<Book>(`${API_URLS.BOOKS}/${id}`);

    return book;
  },

  async getBooksBySpecificFields(category: CategoryTitle, sortType: SortType, searchText: string) {
    let apiPath = '';

    if (category === CategoryTitle.ALL && sortType === SortType.NONE && searchText.length === 0) {
      return this.getAllBooks();
    }

    if (category !== CategoryTitle.ALL && sortType !== SortType.NONE && searchText.length !== 0) {
      apiPath = `?category=${category}&_sort=${sortType}&title_like=${searchText}`;
    }

    if (category !== CategoryTitle.ALL && sortType !== SortType.NONE && searchText.length === 0) {
      apiPath = `?category=${category}&_sort=${sortType}`;
    }

    if (category !== CategoryTitle.ALL && sortType === SortType.NONE && searchText.length !== 0) {
      apiPath = `?category=${category}&title_like=${searchText}`;
    }

    if (category === CategoryTitle.ALL && sortType !== SortType.NONE && searchText.length !== 0) {
      apiPath = `?_sort=${sortType}&title_like=${searchText}`;
    }

    if (category !== CategoryTitle.ALL && sortType === SortType.NONE && searchText.length === 0) {
      apiPath = `?category=${category}`;
    }

    if (category === CategoryTitle.ALL && sortType !== SortType.NONE && searchText.length === 0) {
      apiPath = `?_sort=${sortType}`;
    }

    if (category === CategoryTitle.ALL && sortType === SortType.NONE && searchText.length !== 0) {
      apiPath = `?title_like=${searchText}`;
    }

    const books = await ApiService.getList<Book>(`${API_URLS.BOOKS}${apiPath}`);

    return books;
  },

  async addBook(data: Book): Promise<void> {
    await ApiService.create<Book>(`${API_URLS.BOOKS}`, data);
  },

  async updateBook(data: Book): Promise<void> {
    await ApiService.update<Book>(`${API_URLS.BOOKS}/${data.id}`, data);
  },

  async deleteBook(id: string): Promise<void> {
    await ApiService.delete<Book>(`${API_URLS.BOOKS}/${id}`);
  },
};
