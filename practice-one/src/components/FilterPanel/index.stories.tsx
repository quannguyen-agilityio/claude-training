import { ComponentMeta, ComponentStory } from '@storybook/react';
import FilterPanel from '.';

export default {
  title: 'components/FilterPanel',
  component: FilterPanel,
  parameters: {
    actions: {
      handles: ['click'],
    },
  },
} as ComponentMeta<typeof FilterPanel>;

export const Template: ComponentStory<typeof FilterPanel> = args => <FilterPanel {...args} />;
