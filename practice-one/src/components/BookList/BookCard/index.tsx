import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import BookActions from '@components/BookActions';
import { CategoryTitle } from '@enums/Category';
import { BookContext } from '@stores/book';
import { DisplayTypes } from '@enums/Filter';
import clsx from 'clsx';

export interface Book {
  id: string;
  title: string;
  thumbnail: string;
  author: string;
  published: number;
  description?: string;
  category?: CategoryTitle;
  publishers?: string;
  country?: string;
}

const specificStyles: { [index: string]: string } = {
  gridBook: 'w-[282px] flex-col',
  listBook: 'w-full max-w-[924px] h-[213px] gap-[27px]',
  gridThumbnail: 'w-full max-w-[249px] h-[238px]',
  listThumbnail:
    'w-full max-w-[100px] sm:max-w-[150px] md:max-width[180px] lg:max-w-[300px] xl:max-w-[396px] h-[178px]',
  gridImage: 'w-[202px] h-[202px]',
  listImage: 'w-[353px] h-[144px]',
  listInfo: 'flex flex-col justify-center min-w-[100px]',
};

const BookCard: React.FC<Book> = ({ id, title, thumbnail, author, published, ...rest }) => {
  const { displayType } = useContext(BookContext);

  const { gridBook, listBook, gridThumbnail, listThumbnail, gridImage, listImage, listInfo } = specificStyles;

  const handleSpecificStyles = (gridStyle: string, listStyle: string) => {
    return displayType === DisplayTypes.GRID ? gridStyle : listStyle;
  };

  return (
    <div
      className={clsx(
        'relative group hover:-translate-y-1 hover:shadow-md dark:hover:shadow-link-water',
        handleSpecificStyles('', 'mb-5'),
      )}
    >
      <Link to={`/${id}`}>
        <article
          className={clsx(
            'flex rounded-[5px] p-4 bg-white border border-athens-gray cursor-pointer dark:border-link-water dark:bg-blue-bayoux',
            handleSpecificStyles(gridBook, listBook),
          )}
          {...rest}
        >
          <figure
            className={clsx(
              'rounded-[5px] bg-link-water flex justify-center items-center',
              handleSpecificStyles(gridThumbnail, listThumbnail),
            )}
          >
            <img
              src={thumbnail}
              alt="Book Thumbnail"
              className={clsx('object-cover', handleSpecificStyles(gridImage, listImage))}
            />
          </figure>
          <div className={handleSpecificStyles('', listInfo)}>
            <p
              className={clsx(
                'font-medium mt-[19px] dark:text-white',
                handleSpecificStyles('text-lg', 'text-xl xl:text-2xl'),
              )}
            >
              {title}
            </p>
            <p
              className={clsx(
                'font-secondary text-storm-gray font-semibold mt-[3px] max-w-[150px] dark:text-link-water',
                handleSpecificStyles('text-paragraph', 'text-lg'),
              )}
            >
              {author}
            </p>
            <p
              className={clsx(
                'font-secondary text-storm-gray font-semibold dark:text-link-water',
                handleSpecificStyles('text-secondary', 'text-lg'),
              )}
            >
              {published}
            </p>
          </div>
        </article>
      </Link>
      <div className="absolute hidden group-hover:flex gap-2 right-4 bottom-4">
        <BookActions bookId={id} />
      </div>
    </div>
  );
};

export default BookCard;
