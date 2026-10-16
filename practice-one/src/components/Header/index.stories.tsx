import { ComponentMeta, ComponentStory } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import { BookProvider } from '@stores/book';
import Header from '.';

export default {
  title: 'components/Header',
  component: Header,
  decorators: [
    Story => (
      <MemoryRouter>
        <BookProvider>
          <Story />
        </BookProvider>
      </MemoryRouter>
    ),
  ],
} as ComponentMeta<typeof Header>;

const Template: ComponentStory<typeof Header> = args => <Header {...args} />;

export const Home = Template.bind({});
Home.args = {
  showSearch: true,
};

export const WithoutSearch = Template.bind({});
WithoutSearch.args = {
  showSearch: false,
};
