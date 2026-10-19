import { ComponentMeta, ComponentStory } from '@storybook/react';
import Spinner from '.';

export default {
  title: 'common/Spinner',
  component: Spinner,
} as ComponentMeta<typeof Spinner>;

const Template: ComponentStory<typeof Spinner> = args => (
  <span className="text-accent">
    <Spinner {...args} />
  </span>
);

export const Default = Template.bind({});

export const Large = Template.bind({});
Large.args = {
  className: 'h-8 w-8',
};
