import { Book } from '@components/BookList/BookCard';
import { CategoryTitle } from '@enums/Category';
import { DisplayTypes, SortType } from '@enums/Filter';
import { BookActions, BookActionsType } from './actions';
import { BookContextType } from '.';

export interface BookReducerState {
  books: Book[];
  displayType: DisplayTypes;
  currentCategory: CategoryTitle;
  currentBooks: Book[];
  currentSortType: SortType;
  searchInput: string;
  showConfirmBox: boolean;
  currentBookId?: string;
}

export const initValue: BookContextType = {
  books: [],
  displayType: DisplayTypes.GRID,
  currentCategory: CategoryTitle.ALL,
  currentBooks: [],
  currentSortType: SortType.NONE,
  searchInput: '',
  showConfirmBox: false,
  currentBookId: undefined,
} as unknown as BookContextType;

export const BookReducer = (state: BookReducerState, action: BookActions) => {
  switch (action.type) {
    case BookActionsType.GET_ALL_BOOKS: {
      return {
        ...state,
        books: action.books,
      };
    }
    case BookActionsType.SET_DISPLAY_TYPE: {
      return {
        ...state,
        displayType: action.displayType,
      };
    }
    case BookActionsType.SET_CURRENT_CATEGORY: {
      return {
        ...state,
        currentCategory: action.currentCategory,
      };
    }
    case BookActionsType.SET_CURRENT_BOOKS: {
      return {
        ...state,
        currentBooks: action.currentBooks,
      };
    }
    case BookActionsType.SET_CURRENT_SORT_TYPE: {
      return {
        ...state,
        currentSortType: action.currentSortType,
      };
    }
    case BookActionsType.SET_SHOW_CONFIRM_BOX: {
      return {
        ...state,
        showConfirmBox: action.showConfirmBox,
      };
    }
    case BookActionsType.SET_CURRENT_BOOK_ID: {
      return {
        ...state,
        currentBookId: action.currentBookId,
      };
    }
    case BookActionsType.SET_SEARCH_INPUT: {
      return {
        ...state,
        searchInput: action.searchInput,
      };
    }
  }
};
