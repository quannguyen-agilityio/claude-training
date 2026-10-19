import React from 'react';

interface BookDetailsProps {
  title?: string;
  thumbnail?: string;
  description?: string;
}

const BookDetails: React.FC<BookDetailsProps> = ({ title, thumbnail, description }) => {
  return (
    <section className="w-full sm:w-[calc(100%-268px)] lg:min-w-[640px] xl:min-w-[992px] p-10 sm:border-r border-athens-gray bg-white dark:bg-black overflow-y-auto">
      <h2 className="text-2xl font-medium dark:text-white">{title}</h2>
      <figure className="w-full h-full max-h-[45%] my-8 sm:px-[20%] rounded-[5px] flex justify-center items-center">
        <img src={thumbnail} alt="Book Thumbnail" className="w-full h-full object-cover" />
      </figure>
      <p className="text-base leading-relaxed text-justify dark:text-white">{description}</p>
    </section>
  );
};

export default BookDetails;
