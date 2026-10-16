import React, { useId } from 'react';
import clsx from 'clsx';
import { IconNames } from '@enums/Icon';
import { FIELD_STYLES } from '@constants/Styles';
import Icon from '@components/common/Icon';
import IconButton from '@components/common/IconButton';

interface SearchFieldProps {
  value: string;
  onChange: (value: string) => void;
  label: string;
  placeholder?: string;
}

const SearchField: React.FC<SearchFieldProps> = ({ value, onChange, label, placeholder }) => {
  const id = useId();

  return (
    <form role="search" className="relative" onSubmit={event => event.preventDefault()}>
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-muted">
        <Icon name={IconNames.SEARCH} />
      </span>
      <input
        id={id}
        type="search"
        value={value}
        placeholder={placeholder}
        onChange={event => onChange(event.target.value)}
        className={clsx(FIELD_STYLES, 'h-11 pl-10 [&::-webkit-search-cancel-button]:appearance-none', value && 'pr-12')}
      />
      {value ? (
        <span className="absolute inset-y-0 right-0 flex items-center">
          <IconButton label="Clear search" icon={IconNames.X} onClick={() => onChange('')} />
        </span>
      ) : null}
    </form>
  );
};

export default SearchField;
