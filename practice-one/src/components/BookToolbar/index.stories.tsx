import { ComponentMeta, ComponentStory } from '@storybook/react';
import { DisplayTypes, SortType } from '@enums/Filter';
import BookToolbar from '.';

export default {
  title: 'components/BookToolbar',
  component: BookToolbar,
} as ComponentMeta<typeof BookToolbar>;

const Template: ComponentStory<typeof BookToolbar> = args => <BookToolbar {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: 'All books',
  countText: '12 books',
  displayType: DisplayTypes.GRID,
  sortType: SortType.NONE,
};

export const CategoryAndSort = Template.bind({});
CategoryAndSort.args = {
  title: 'Adventure',
  countText: '2 books',
  displayType: DisplayTypes.LIST,
  sortType: SortType.RELEASE_YEAR,
};
