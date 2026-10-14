import { ComponentMeta, ComponentStory } from '@storybook/react';
import { CategoryTitle } from '@enums/Category';
import FilterResult from '.';

export default {
  title: 'components/FilterResult',
  component: FilterResult,
  parameters: {
    actions: {
      handles: ['click'],
    },
  },
} as ComponentMeta<typeof FilterResult>;

export const Template: ComponentStory<typeof FilterResult> = args => <FilterResult {...args} />;
Template.args = {
  ...Template.args,
  category: CategoryTitle.ADVENTURE,
  results: 20,
};
