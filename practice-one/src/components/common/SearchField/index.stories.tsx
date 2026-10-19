import { ComponentProps, useState } from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import SearchField from '.';

export default {
  title: 'common/SearchField',
  component: SearchField,
} as ComponentMeta<typeof SearchField>;

// Keeps the value in state so typing and the clear button work in Storybook
const ControlledSearchField = ({ value: initialValue, ...rest }: ComponentProps<typeof SearchField>) => {
  const [value, setValue] = useState(initialValue);

  return <SearchField {...rest} value={value} onChange={setValue} />;
};

const Template: ComponentStory<typeof SearchField> = args => <ControlledSearchField {...args} />;

export const Empty = Template.bind({});
Empty.args = {
  value: '',
  label: 'Search books by title',
  placeholder: 'Search by title',
};

export const Filled = Template.bind({});
Filled.args = {
  ...Empty.args,
  value: 'dune',
};
