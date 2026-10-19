import { ComponentMeta, ComponentStory } from '@storybook/react';
import Alert from '.';

export default {
  title: 'common/Alert',
  component: Alert,
} as ComponentMeta<typeof Alert>;

const Template: ComponentStory<typeof Alert> = args => <Alert {...args} />;

export const LoadError = Template.bind({});
LoadError.args = {
  title: "We couldn't load your books.",
  text: 'Check your connection and try again.',
  actionLabel: 'Try again',
};
