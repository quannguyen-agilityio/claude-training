import React, { useState, FormEvent, useEffect } from 'react';
import { ApiRequest } from '@services/api-request';
import { Link, useParams } from 'react-router-dom';
import { v4 as generateUUID } from 'uuid';
import { CategoryTitle } from '@enums/Category';
import { ButtonTypes } from '@enums/Button';
import { Book } from '@components/BookList/BookCard';
import { ErrorMsgs } from '@enums/ErrorMsg';
import { CATEGORIES } from '@constants/Category';
import RegexValue from '@constants/RegexValue';
import Button from '@components/common/Button';
import Input from '@components/common/Input';
import Textarea from '@components/common/Textarea';
import Loading from '@components/common/Loading';
import validateInput from '@helpers/validator';
import Select from '@components/common/Select';

interface BookFormProps {
  formTitle: string;
}

const BookForm: React.FC<BookFormProps> = ({ formTitle }) => {
  const [loading, setLoading] = useState<boolean>(false);

  const { bookId } = useParams();

  const [errors, setErrors] = useState({
    title: '',
    thumbnail: '',
    author: '',
    published: '',
    publishers: '',
    country: '',
    description: '',
  });

  const [formData, setFormData] = useState<Book>({
    id: bookId || generateUUID(),
    title: '',
    thumbnail: '',
    author: '',
    published: 0,
    publishers: '',
    category: CategoryTitle.ADVENTURE,
    country: '',
    description: '',
  });

  useEffect(() => {
    let ignore = false;

    const fetchBook = async (id: string | undefined) => {
      if (!id) return;

      try {
        setLoading(true);

        const result = await ApiRequest.getBookById(id);

        if (!ignore) setFormData(result);

        setLoading(false);
      } catch (error) {
        alert(error);
      }
    };

    fetchBook(bookId);

    return () => {
      ignore = true;
    };
  }, [bookId]);

  if (!formData) return <Loading />;

  const checkValidForm = () => {
    const isAllInputsValid = Object.values(formData).every(property => property.toString().length !== 0);
    const hasNoErrorMsgs = Object.values(errors).every(errorValue => !errorValue);

    return isAllInputsValid && hasNoErrorMsgs;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!checkValidForm()) {
      alert('Form is invalid');
      return;
    }
    // [TODO] Handle notify to fill in the form

    (async () => {
      try {
        setLoading(true);

        if (bookId) {
          await ApiRequest.updateBook(formData);
        } else {
          await ApiRequest.addBook(formData);
        }

        setLoading(false);
      } catch (error) {
        alert(error); // [TODO] Handle show error to UI
      }

      window.location.assign('/');
    })();
  };

  const handleChange = (
    e: FormEvent<HTMLInputElement> | FormEvent<HTMLSelectElement> | FormEvent<HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.currentTarget;
    setFormData({ ...formData, [name]: name === 'published' ? Number(value) : value });
  };

  const handleBlur = (
    e: FormEvent<HTMLInputElement> | FormEvent<HTMLSelectElement> | FormEvent<HTMLTextAreaElement>,
    regex?: RegExp,
    message?: ErrorMsgs,
  ) => {
    const { name, value } = e.currentTarget;
    setErrors({ ...errors, [name]: validateInput(value, regex, message) });
  };

  return (
    <>
      {loading ? <Loading /> : null}
      <form
        action="#"
        id="bookForm"
        className="w-full py-10 px-7 sm:px-32 border-x bg-white overflow-y-auto dark:bg-black"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl dark:text-white text-center mb-8">{formTitle}</h2>
        <Input
          type="text"
          value={formData.title}
          label="Title"
          name="title"
          errorMsg={errors.title}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <Input
          type="text"
          value={formData.thumbnail}
          label="Thumbnail URL"
          name="thumbnail"
          errorMsg={errors.thumbnail}
          onChange={handleChange}
          onBlur={e => handleBlur(e, RegexValue.URL, ErrorMsgs.INVALID_URL)}
        />
        <Input
          type="text"
          value={formData.author}
          label="Author"
          name="author"
          errorMsg={errors.author}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <Input
          type="number"
          value={formData.published}
          label="Release Year"
          name="published"
          errorMsg={errors.published}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <Input
          type="text"
          value={formData.publishers}
          label="Publishers"
          name="publishers"
          errorMsg={errors.publishers}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <Select value={formData.category} label="Category" name="category" onChange={handleChange}>
          {CATEGORIES.map(category => {
            return (
              <option key={category} value={category}>
                {category}
              </option>
            );
          })}
        </Select>
        <Input
          type="text"
          value={formData.country}
          label="Country"
          name="country"
          errorMsg={errors.country}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <Textarea
          value={formData.description}
          label="Description"
          name="description"
          errorMsg={errors.description}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <div className="w-full flex justify-center gap-2">
          <Button type="submit" variant={ButtonTypes.PRIMARY}>
            Submit
          </Button>
          <Link to="/">
            <Button variant={ButtonTypes.SECONDARY}>Cancel</Button>
          </Link>
        </div>
      </form>
    </>
  );
};

export default BookForm;
