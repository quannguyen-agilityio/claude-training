import { createContext, ReactElement, ReactNode, useCallback, useMemo, useReducer } from 'react';
import { DisplayTypes, SortType } from '@enums/Filter';
import { Book } from '@components/BookList/BookCard';
import { CategoryTitle } from '@enums/Category';
import { BookReducer, BookReducerState, initValue } from './reducer';
import { BookActionsType, BookToDelete } from './actions';

export interface BookContextType extends BookReducerState {
  getAllBooks: (bookList: Book[]) => void;
  setDisplayType: (type: DisplayTypes) => void;
  setCurrentCategory: (category: CategoryTitle) => void;
  setCurrentBooks: (bookList: Book[]) => void;
  setCurrentSortType: (type: SortType) => void;
  setBookToDelete: (book?: BookToDelete) => void;
  setSearchInput: (value: string) => void;
}

const BookContext = createContext<BookContextType>(initValue);

const BookProvider = ({ children }: { children: ReactNode }): ReactElement => {
  const [state, dispatch] = useReducer(BookReducer, initValue);

  const getAllBooks = useCallback((bookList: Book[]): void => {
    dispatch({
      type: BookActionsType.GET_ALL_BOOKS,
      books: bookList,
    });
  }, []);

  const setDisplayType = useCallback((type: DisplayTypes): void => {
    dispatch({
      type: BookActionsType.SET_DISPLAY_TYPE,
      displayType: type,
    });
  }, []);

  const setCurrentCategory = useCallback((category: CategoryTitle): void => {
    dispatch({
      type: BookActionsType.SET_CURRENT_CATEGORY,
      currentCategory: category,
    });
  }, []);

  const setCurrentBooks = useCallback((bookList: Book[]): void => {
    dispatch({
      type: BookActionsType.SET_CURRENT_BOOKS,
      currentBooks: bookList,
    });
  }, []);

  const setCurrentSortType = useCallback((type: SortType): void => {
    dispatch({
      type: BookActionsType.SET_CURRENT_SORT_TYPE,
      currentSortType: type,
    });
  }, []);

  const setBookToDelete = useCallback((book?: BookToDelete): void => {
    dispatch({
      type: BookActionsType.SET_BOOK_TO_DELETE,
      bookToDelete: book,
    });
  }, []);

  const setSearchInput = useCallback((value: string): void => {
    dispatch({
      type: BookActionsType.SET_SEARCH_INPUT,
      searchInput: value,
    });
  }, []);

  const value: BookContextType = useMemo(
    () => ({
      books: state.books,
      getAllBooks,
      displayType: state.displayType,
      setDisplayType,
      currentCategory: state.currentCategory,
      setCurrentCategory,
      currentBooks: state.currentBooks,
      setCurrentBooks,
      currentSortType: state.currentSortType,
      setCurrentSortType,
      searchInput: state.searchInput,
      setSearchInput,
      bookToDelete: state.bookToDelete,
      setBookToDelete,
    }),
    [
      state.books,
      getAllBooks,
      state.displayType,
      setDisplayType,
      state.currentCategory,
      setCurrentCategory,
      state.currentBooks,
      setCurrentBooks,
      state.currentSortType,
      setCurrentSortType,
      state.searchInput,
      setSearchInput,
      state.bookToDelete,
      setBookToDelete,
    ],
  );

  return <BookContext.Provider value={value}>{children}</BookContext.Provider>;
};

export { BookContext, BookProvider };
