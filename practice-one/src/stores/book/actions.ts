import { DisplayTypes, SortType } from '@enums/Filter';
import { Book } from '@components/BookList/BookCard';
import { CategoryTitle } from '@enums/Category';

export enum BookActionsType {
  GET_ALL_BOOKS = 'get_all_books',
  SET_DISPLAY_TYPE = 'set_display_type',
  SET_CURRENT_CATEGORY = 'set_current_category',
  SET_CURRENT_BOOKS = 'set_current_books',
  SET_CURRENT_SORT_TYPE = 'set_current_sort_type',
  SET_BOOK_TO_DELETE = 'set_book_to_delete',
  SET_SEARCH_INPUT = 'set_search_input',
}

interface BookActionGetAllBooks {
  type: typeof BookActionsType.GET_ALL_BOOKS;
  books: Book[];
}

interface BookActionSetDisplayType {
  type: typeof BookActionsType.SET_DISPLAY_TYPE;
  displayType: DisplayTypes;
}

interface BookActionSetCurrentCategory {
  type: typeof BookActionsType.SET_CURRENT_CATEGORY;
  currentCategory: CategoryTitle;
}

interface BookActionSetCurrentBooks {
  type: typeof BookActionsType.SET_CURRENT_BOOKS;
  currentBooks: Book[];
}

interface BookActionSetCurrentSortType {
  type: typeof BookActionsType.SET_CURRENT_SORT_TYPE;
  currentSortType: SortType;
}

// The delete dialog is open while this is set
export type BookToDelete = Pick<Book, 'id' | 'title'>;

interface BookActionSetBookToDelete {
  type: typeof BookActionsType.SET_BOOK_TO_DELETE;
  bookToDelete: BookToDelete | undefined;
}

interface BookActionSetSearchInput {
  type: typeof BookActionsType.SET_SEARCH_INPUT;
  searchInput: string;
}

export type BookActions =
  | BookActionGetAllBooks
  | BookActionSetDisplayType
  | BookActionSetCurrentCategory
  | BookActionSetCurrentBooks
  | BookActionSetCurrentSortType
  | BookActionSetBookToDelete
  | BookActionSetSearchInput;
