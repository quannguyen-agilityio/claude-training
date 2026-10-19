import { ComponentMeta, ComponentStory } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import BackLink from '.';

export default {
  title: 'common/BackLink',
  component: BackLink,
  decorators: [
    Story => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
} as ComponentMeta<typeof BackLink>;

const Template: ComponentStory<typeof BackLink> = args => <BackLink {...args} />;

export const AllBooks = Template.bind({});
AllBooks.args = {
  to: '/',
  children: 'All books',
};

export const BackToBook = Template.bind({});
BackToBook.args = {
  to: '/1',
  children: 'Back to book',
};
