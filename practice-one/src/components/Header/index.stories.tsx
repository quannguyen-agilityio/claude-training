import { ComponentMeta, ComponentStory } from '@storybook/react';
import Header from '.';

export default {
  title: 'components/Header',
  component: Header,
  parameters: {
    actions: {
      handles: ['click'],
    },
  },
} as ComponentMeta<typeof Header>;

export const Template: ComponentStory<typeof Header> = args => <Header {...args} />;
