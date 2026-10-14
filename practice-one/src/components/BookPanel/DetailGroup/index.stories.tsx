import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import DetailGroup from '.';

export default {
  title: 'components/DetailInfo',
  component: DetailGroup,
  parameters: {
    actions: {
      handles: ['click'],
    },
  },
} as ComponentMeta<typeof DetailGroup>;

export const Template: ComponentStory<typeof DetailGroup> = args => <DetailGroup {...args} />;
Template.args = {
  ...Template.args,
  title: 'Author',
  content: 'Jamal Kasper',
};
