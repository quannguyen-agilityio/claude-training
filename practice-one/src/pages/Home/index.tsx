import React, { ReactNode, useContext, useEffect, useMemo, useState } from 'react';
import { ApiRequest } from '@services/api-request';
import { BookContext } from '@stores/book';
import { CategoryTitle } from '@enums/Category';
import { ButtonVariants } from '@enums/Button';
import { IconNames } from '@enums/Icon';
import { LoadStatus } from '@enums/LoadStatus';
import { CATEGORIES } from '@constants/Category';
import { BUTTON_STYLES } from '@constants/Styles';
import Container from '@layouts/Container';
import Header from '@components/Header';
import CategoryNav from '@components/CategoryNav';
import BookToolbar from '@components/BookToolbar';
import BookList, { BookListSkeleton } from '@components/BookList';
import Alert from '@components/common/Alert';
import EmptyState from '@components/common/EmptyState';
import Icon from '@components/common/Icon';
import LinkButton from '@components/common/LinkButton';
import ConfirmBox from '@components/ConfirmBox';

const formatCount = (count: number) => `${count} ${count === 1 ? 'book' : 'books'}`;

function Home() {
  const {
    books,
    currentBooks,
    getAllBooks,
    setCurrentBooks,
    currentCategory,
    setCurrentCategory,
    currentSortType,
    setCurrentSortType,
    displayType,
    setDisplayType,
    searchInput,
    setSearchInput,
    showConfirmBox,
  } = useContext(BookContext);

  // Books already in the store (coming back from another page) show right away while they refresh
  const [status, setStatus] = useState<LoadStatus>(books.length ? LoadStatus.READY : LoadStatus.LOADING);
  const [reloadKey, setReloadKey] = useState<number>(0);

  useEffect(() => {
    let ignore = false;

    const fetchBooks = async () => {
      try {
        // All books for the category counts, plus the filtered and sorted list
        const [allBooks, filteredBooks] = await Promise.all([
          ApiRequest.getAllBooks(),
          ApiRequest.getBooksBySpecificFields(currentCategory, currentSortType, searchInput),
        ]);

        if (ignore) return;

        getAllBooks(allBooks);
        setCurrentBooks(filteredBooks);
        setStatus(LoadStatus.READY);
      } catch {
        if (!ignore) setStatus(LoadStatus.ERROR);
      }
    };

    fetchBooks();

    return () => {
      ignore = true;
    };
  }, [currentCategory, currentSortType, searchInput, reloadKey, getAllBooks, setCurrentBooks]);

  const counts = useMemo(() => {
    const result = { [CategoryTitle.ALL]: books.length } as Record<CategoryTitle, number>;

    CATEGORIES.forEach(category => {
      result[category] = books.filter(book => book.category === category).length;
    });

    return result;
  }, [books]);

  const handleRetry = () => {
    setStatus(LoadStatus.LOADING);
    setReloadKey(key => key + 1);
  };

  const title = currentCategory === CategoryTitle.ALL ? 'All books' : currentCategory;
  const query = searchInput.trim();

  const countTexts: Record<LoadStatus, string> = {
    [LoadStatus.LOADING]: 'Loading books…',
    [LoadStatus.ERROR]: '',
    [LoadStatus.READY]: formatCount(currentBooks.length),
  };

  const renderContent = (): ReactNode => {
    if (status === LoadStatus.ERROR) {
      return (
        <Alert
          title="We couldn't load your books."
          text="Check your connection and try again."
          actionLabel="Try again"
          onAction={handleRetry}
        />
      );
    }

    if (status === LoadStatus.LOADING) return <BookListSkeleton />;

    if (!books.length) {
      return (
        <EmptyState
          title="No books yet"
          text="Add your first book to start your shelf."
          actions={(
            <LinkButton to="/add-new-book" icon={IconNames.PLUS}>
              Add a book
            </LinkButton>
          )}
        />
      );
    }

    if (!currentBooks.length && query) {
      return (
        <EmptyState
          icon={IconNames.SEARCH}
          title={`No books match "${query}"`}
          text="Check the spelling, or search for a different title."
          actions={(
            <button
              type="button"
              className={BUTTON_STYLES[ButtonVariants.SECONDARY]}
              onClick={() => setSearchInput('')}
            >
              <Icon name={IconNames.X} />
              Clear search
            </button>
          )}
        />
      );
    }

    if (!currentBooks.length) {
      return (
        <EmptyState
          title={`No ${title} books`}
          text="There are no books in this category yet."
          actions={(
            <button
              type="button"
              className={BUTTON_STYLES[ButtonVariants.SECONDARY]}
              onClick={() => setCurrentCategory(CategoryTitle.ALL)}
            >
              Show all books
            </button>
          )}
        />
      );
    }

    return <BookList books={currentBooks} displayType={displayType} />;
  };

  return (
    <>
      <Header showSearch />
      <Container className="py-6 sm:py-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:gap-10">
          <CategoryNav
            selected={currentCategory}
            counts={status === LoadStatus.READY ? counts : undefined}
            onSelect={setCurrentCategory}
          />
          <main className="min-w-0 flex-1">
            <BookToolbar
              title={title}
              countText={countTexts[status]}
              displayType={displayType}
              onDisplayTypeChange={setDisplayType}
              sortType={currentSortType}
              onSortTypeChange={setCurrentSortType}
            />
            <div className="mt-6">{renderContent()}</div>
          </main>
        </div>
      </Container>
      {showConfirmBox ? <ConfirmBox /> : null}
    </>
  );
}

export default Home;
