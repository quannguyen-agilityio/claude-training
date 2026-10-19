import { ComponentMeta, ComponentStory } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import BookForm from '.';

export default {
  title: 'components/BookForm',
  component: BookForm,
  decorators: [
    Story => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
} as ComponentMeta<typeof BookForm>;

const Template: ComponentStory<typeof BookForm> = args => <BookForm {...args} />;

// Submit it empty to see every error
export const Add = Template.bind({});

// Loads Treasure Island from the mock data
export const Edit = Template.bind({});
Edit.args = {
  bookId: '54a7e10e-f3f7-48b7-85a4-92b6363ad7aa',
};

export const NotFound = Template.bind({});
NotFound.args = {
  bookId: 'missing-book',
};
