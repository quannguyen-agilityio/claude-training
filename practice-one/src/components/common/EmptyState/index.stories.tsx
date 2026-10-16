import { ComponentMeta, ComponentStory } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import { IconNames } from '@enums/Icon';
import LinkButton from '@components/common/LinkButton';
import EmptyState from '.';

export default {
  title: 'common/EmptyState',
  component: EmptyState,
  decorators: [
    Story => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
} as ComponentMeta<typeof EmptyState>;

const Template: ComponentStory<typeof EmptyState> = args => <EmptyState {...args} />;

export const NoBooks = Template.bind({});
NoBooks.args = {
  title: 'No books yet',
  text: 'Add your first book to start your shelf.',
  actions: (
    <LinkButton to="/add-new-book" icon={IconNames.PLUS}>
      Add a book
    </LinkButton>
  ),
};

export const NoResults = Template.bind({});
NoResults.args = {
  icon: IconNames.SEARCH,
  title: 'No books match "dune"',
  text: 'Check the spelling, or search for a different title.',
};
