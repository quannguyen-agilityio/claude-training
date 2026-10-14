import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { CategoryTitle } from '@enums/Category';
import Category from '.';

export default {
  title: 'components/Category',
  component: Category,
  parameters: {
    actions: {
      handles: ['click'],
    },
  },
} as ComponentMeta<typeof Category>;

export const Template: ComponentStory<typeof Category> = args => <Category {...args} />;
Template.args = {
  ...Template.args,
  title: CategoryTitle.ADVENTURE,
  quantity: 20,
  bgColor: 'orange',
};
