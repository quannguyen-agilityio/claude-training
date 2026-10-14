import { createContext, ReactElement, ReactNode, useCallback, useMemo, useReducer } from 'react';
import { DisplayTypes, SortType } from '@enums/Filter';
import { Book } from '@components/BookList/BookCard';
import { CategoryTitle } from '@enums/Category';
import { BookReducer, BookReducerState, initValue } from './reducer';
import { BookActionsType } from './actions';

export interface BookContextType extends BookReducerState {
  getAllBooks: (bookList: Book[]) => void;
  setDisplayType: (type: DisplayTypes) => void;
  setCurrentCategory: (category: CategoryTitle) => void;
  setCurrentBooks: (bookList: Book[]) => void;
  setCurrentSortType: (type: SortType) => void;
  setShowConfirmBox: (value: boolean) => void;
  setCurrentBookId: (id?: string) => void;
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

  const setDisplayType = (type: DisplayTypes): void => {
    dispatch({
      type: BookActionsType.SET_DISPLAY_TYPE,
      displayType: type,
    });
  };

  const setCurrentCategory = (category: CategoryTitle): void => {
    dispatch({
      type: BookActionsType.SET_CURRENT_CATEGORY,
      currentCategory: category,
    });
  };

  const setCurrentBooks = useCallback((bookList: Book[]): void => {
    dispatch({
      type: BookActionsType.SET_CURRENT_BOOKS,
      currentBooks: bookList,
    });
  }, []);

  const setCurrentSortType = (type: SortType): void => {
    dispatch({
      type: BookActionsType.SET_CURRENT_SORT_TYPE,
      currentSortType: type,
    });
  };

  const setShowConfirmBox = (value: boolean): void => {
    dispatch({
      type: BookActionsType.SET_SHOW_CONFIRM_BOX,
      showConfirmBox: value,
    });
  };

  const setCurrentBookId = (id?: string): void => {
    dispatch({
      type: BookActionsType.SET_CURRENT_BOOK_ID,
      currentBookId: id,
    });
  };

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
      showConfirmBox: state.showConfirmBox,
      setShowConfirmBox,
      currentBookId: state.currentBookId,
      setCurrentBookId,
    }),
    [
      state.books,
      getAllBooks,
      state.displayType,
      state.currentCategory,
      state.currentBooks,
      setCurrentBooks,
      state.currentSortType,
      state.searchInput,
      state.showConfirmBox,
      state.currentBookId,
    ],
  );

  return <BookContext.Provider value={value}>{children}</BookContext.Provider>;
};

export { BookContext, BookProvider };
