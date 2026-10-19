import { ComponentMeta, ComponentStory } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import { BookProvider } from '@stores/book';
import DeleteDialog from '.';

export default {
  title: 'components/DeleteDialog',
  component: DeleteDialog,
  decorators: [
    Story => (
      <MemoryRouter>
        <BookProvider>
          <Story />
        </BookProvider>
      </MemoryRouter>
    ),
  ],
} as ComponentMeta<typeof DeleteDialog>;

const Template: ComponentStory<typeof DeleteDialog> = args => <DeleteDialog {...args} />;

export const Default = Template.bind({});
Default.args = {
  book: { id: '54a7e10e-f3f7-48b7-85a4-92b6363ad7aa', title: 'Treasure Island' },
};
