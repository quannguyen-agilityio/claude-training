import { ComponentMeta, ComponentStory } from '@storybook/react';
import FeaturesBar from '.';

export default {
  title: 'components/FeaturesBar',
  component: FeaturesBar,
  parameters: {
    actions: {
      handles: ['click'],
    },
  },
} as ComponentMeta<typeof FeaturesBar>;

export const Template: ComponentStory<typeof FeaturesBar> = args => <FeaturesBar {...args} />;
