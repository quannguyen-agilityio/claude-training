import React, { useContext, useState, useEffect } from 'react';
import { ApiRequest } from '@services/api-request';
import clsx from 'clsx';
import PageLayout from '@layouts/PageLayout';
import Loading from '@components/common/Loading';
import FeaturesBar from '@components/FeaturesBar';
import FilterPanel from '@components/FilterPanel';
import BookList from '@components/BookList';
import SearchBar from '@components/Header/SearchBar';
import FilterPanelBackdrop from '@components/FilterPanelBackdrop';
import { BookContext } from '@stores/book';

function Home() {
  const [loading, setLoading] = useState<boolean>(false);
  const [showSearchBar, setShowSearchBar] = useState<boolean>(false);
  const [showFilterPanel, setShowFilterPanel] = useState<boolean>(false);

  const { books, currentBooks, getAllBooks, currentSortType, setCurrentBooks, currentCategory, searchInput } = useContext(BookContext);

  useEffect(() => {
    let ignore = false;

    const fetchBooks = async () => {
      try {
        setLoading(true);

        const result = await ApiRequest.getAllBooks();

        if (!ignore) getAllBooks(result);

        setLoading(false);
      } catch (error) {
        alert(error);
      }
    };

    fetchBooks();

    return () => {
      ignore = true;
    };
  }, []);

  useEffect(() => {
    let ignore = false;

    const fetchBooks = async () => {
      try {
        setLoading(true);

        const result = await ApiRequest.getBooksBySpecificFields(currentCategory, currentSortType, searchInput);

        if (!ignore) setCurrentBooks(result);

        setLoading(false);
      } catch (error) {
        alert(error);
      }
    };

    fetchBooks();

    return () => {
      ignore = true;
    };
  }, [currentCategory, currentSortType, searchInput]);

  if (!books || !currentBooks) return <Loading />;

  return (
    <>
      {loading ? <Loading /> : null}
      <PageLayout
        isHome
        hasMenu
        onShowSearchBar={() => setShowSearchBar(!showSearchBar)}
        onShowMenu={() => setShowFilterPanel(true)}
        navBar={<FeaturesBar />}
      >
        {showSearchBar ? (
          <div className="w-full p-2 sm:hidden absolute top-16">
            <SearchBar />
          </div>
        ) : null}
        {showFilterPanel ? <FilterPanelBackdrop onCloseBackdrop={() => setShowFilterPanel(false)} /> : null}
        <div className="hidden sm:block">
          <FilterPanel />
        </div>
        <div
          className={clsx(
            'flex justify-center w-full px-5 py-16 sm:py-8 sm:pl-12 md:pt[33px]',
            showSearchBar ? 'pt-36' : '',
          )}
        >
          <BookList />
        </div>
      </PageLayout>
    </>
  );
}

export default Home;
