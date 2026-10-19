import React, { ChangeEvent, FocusEvent, FormEvent, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as generateUUID } from 'uuid';
import { ApiRequest } from '@services/api-request';
import { CategoryTitle } from '@enums/Category';
import { ButtonVariants } from '@enums/Button';
import { ErrorMsgs } from '@enums/ErrorMsg';
import { IconNames } from '@enums/Icon';
import { LoadStatus } from '@enums/LoadStatus';
import { CATEGORIES } from '@constants/Category';
import RegexValue from '@constants/RegexValue';
import validateInput, { FieldRule } from '@helpers/validator';
import { Book } from '@components/BookList/BookCard';
import Alert from '@components/common/Alert';
import BackLink from '@components/common/BackLink';
import Button from '@components/common/Button';
import EmptyState from '@components/common/EmptyState';
import LinkButton from '@components/common/LinkButton';
import SelectField from '@components/common/SelectField';
import TextAreaField from '@components/common/TextAreaField';
import TextField from '@components/common/TextField';
import CoverPreview from './CoverPreview';

type TextFieldName = 'title' | 'author' | 'thumbnail' | 'published' | 'publishers' | 'country' | 'description';

// Every value is a string while editing, so the release year can be blank
type BookFormValues = Record<TextFieldName, string> & { category: CategoryTitle };

type BookFormErrors = Partial<Record<TextFieldName, string>>;

// In the order the fields appear, so the first error found is the first invalid field on screen
const RULES: Record<TextFieldName, FieldRule> = {
  title: { message: ErrorMsgs.TITLE_REQUIRED },
  author: { message: ErrorMsgs.AUTHOR_REQUIRED },
  thumbnail: { message: ErrorMsgs.INVALID_URL, pattern: RegexValue.URL },
  published: { message: ErrorMsgs.INVALID_YEAR, pattern: RegexValue.POSITIVE_NUMBER },
  publishers: { message: ErrorMsgs.PUBLISHER_REQUIRED },
  country: { message: ErrorMsgs.COUNTRY_REQUIRED },
  description: { message: ErrorMsgs.DESCRIPTION_REQUIRED },
};

const FIELD_NAMES = Object.keys(RULES) as TextFieldName[];

const isTextField = (name: string): name is TextFieldName => name in RULES;

const EMPTY_VALUES: BookFormValues = {
  title: '',
  author: '',
  thumbnail: '',
  published: '',
  publishers: '',
  country: '',
  description: '',
  category: CategoryTitle.ADVENTURE,
};

const toFormValues = (book: Book): BookFormValues => ({
  title: book.title,
  author: book.author,
  thumbnail: book.thumbnail,
  published: String(book.published),
  publishers: book.publishers ?? '',
  country: book.country ?? '',
  description: book.description ?? '',
  category: book.category ?? CategoryTitle.ADVENTURE,
});

interface BookFormProps {
  // Edits this book when set, adds a new one otherwise
  bookId?: string;
}

const BookForm: React.FC<BookFormProps> = ({ bookId }) => {
  const navigate = useNavigate();
  const formRef = useRef<HTMLFormElement>(null);
  const [newBookId] = useState<string>(() => generateUUID());

  const [values, setValues] = useState<BookFormValues>(EMPTY_VALUES);
  const [errors, setErrors] = useState<BookFormErrors>({});
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [loadStatus, setLoadStatus] = useState<LoadStatus>(bookId ? LoadStatus.LOADING : LoadStatus.READY);
  const [saving, setSaving] = useState<boolean>(false);
  const [saveFailed, setSaveFailed] = useState<boolean>(false);

  const isEdit = Boolean(bookId);
  const backTo = bookId ? `/${bookId}` : '/';

  useEffect(() => {
    let ignore = false;

    const fetchBook = async (id: string) => {
      try {
        const book = await ApiRequest.getBookById(id);

        if (ignore) return;

        setValues(toFormValues(book));
        setPreviewUrl(book.thumbnail);
        setLoadStatus(LoadStatus.READY);
      } catch {
        if (!ignore) setLoadStatus(LoadStatus.ERROR);
      }
    };

    if (bookId) fetchBook(bookId);

    return () => {
      ignore = true;
    };
  }, [bookId]);

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = event.currentTarget;

    setValues(prev => ({ ...prev, [name]: value }));
  };

  const handleBlur = (event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.currentTarget;

    if (!isTextField(name)) return;

    const error = validateInput(value, RULES[name]);

    setErrors(prev => ({ ...prev, [name]: error }));

    if (name === 'thumbnail') setPreviewUrl(error ? '' : value.trim());
  };

  const save = async () => {
    setSaving(true);
    setSaveFailed(false);

    const book: Book = { ...values, id: bookId ?? newBookId, published: Number(values.published) };

    try {
      if (bookId) {
        await ApiRequest.updateBook(book);
      } else {
        await ApiRequest.addBook(book);
      }
    } catch {
      // Keep the values on screen so nothing typed is lost
      setSaving(false);
      setSaveFailed(true);
      return;
    }

    navigate(backTo);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors: BookFormErrors = {};

    FIELD_NAMES.forEach(name => {
      const error = validateInput(values[name], RULES[name]);

      if (error) nextErrors[name] = error;
    });

    setErrors(nextErrors);

    const firstInvalid = FIELD_NAMES.find(name => nextErrors[name]);

    if (firstInvalid) {
      const field = formRef.current?.elements.namedItem(firstInvalid);

      if (field instanceof HTMLElement) field.focus();
      return;
    }

    save();
  };

  if (loadStatus === LoadStatus.ERROR) {
    return (
      <>
        <BackLink to="/">All books</BackLink>
        <EmptyState
          icon={IconNames.SEARCH}
          title="We couldn't find that book"
          text="It may have been deleted, or the link is wrong."
          actions={(
            <LinkButton to="/" variant={ButtonVariants.SECONDARY} icon={IconNames.BACK}>
              Back to all books
            </LinkButton>
          )}
        />
      </>
    );
  }

  const busy = saving || loadStatus === LoadStatus.LOADING;

  const fieldProps = (name: TextFieldName) => ({
    name,
    value: values[name],
    error: errors[name],
    onChange: handleChange,
    onBlur: handleBlur,
  });

  return (
    <>
      <BackLink to={backTo}>{isEdit ? 'Back to book' : 'All books'}</BackLink>
      <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-ink">{isEdit ? 'Edit book' : 'Add a book'}</h1>
      <p className="mt-1 text-sm text-muted">All fields are required.</p>
      {saveFailed ? (
        <div className="mt-6 max-w-2xl">
          <Alert
            title="We couldn't save this book."
            text="Your changes are still here."
            actionLabel="Try again"
            onAction={save}
          />
        </div>
      ) : null}
      <div className="mt-6 flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-10">
        <CoverPreview title={values.title} thumbnail={previewUrl} />
        <form
          ref={formRef}
          noValidate
          aria-busy={busy || undefined}
          onSubmit={handleSubmit}
          className="w-full max-w-2xl rounded-xl border border-line bg-surface p-5 sm:p-8"
        >
          <fieldset disabled={busy} className="grid min-w-0 gap-5 sm:grid-cols-2">
            <TextField label="Title" className="sm:col-span-2" {...fieldProps('title')} />
            <TextField label="Author" className="sm:col-span-2" {...fieldProps('author')} />
            <TextField
              type="url"
              label="Cover image URL"
              placeholder="https://"
              className="sm:col-span-2"
              {...fieldProps('thumbnail')}
            />
            <TextField
              type="number"
              inputMode="numeric"
              label="Release year"
              placeholder="e.g. 1883"
              {...fieldProps('published')}
            />
            <SelectField label="Category" name="category" value={values.category} onChange={handleChange}>
              {CATEGORIES.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </SelectField>
            <TextField label="Publisher" {...fieldProps('publishers')} />
            <TextField label="Country" {...fieldProps('country')} />
            <TextAreaField label="Description" className="sm:col-span-2" {...fieldProps('description')} />
          </fieldset>
          <div className="mt-8 flex flex-col-reverse gap-3 border-t border-line pt-6 sm:flex-row sm:justify-end">
            <LinkButton to={backTo} variant={ButtonVariants.SECONDARY} className="w-full sm:w-auto" disabled={saving}>
              Cancel
            </LinkButton>
            <Button
              type="submit"
              className="w-full sm:w-auto"
              loading={saving}
              loadingLabel="Saving…"
              disabled={loadStatus === LoadStatus.LOADING}
            >
              {isEdit ? 'Save changes' : 'Add book'}
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default BookForm;
