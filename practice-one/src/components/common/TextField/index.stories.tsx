import { ComponentMeta, ComponentStory } from '@storybook/react';
import TextField from '.';

export default {
  title: 'common/TextField',
  component: TextField,
  decorators: [
    Story => (
      <div className="max-w-sm">
        <Story />
      </div>
    ),
  ],
} as ComponentMeta<typeof TextField>;

const Template: ComponentStory<typeof TextField> = args => <TextField {...args} />;

export const Default = Template.bind({});
Default.args = {
  label: 'Title',
  placeholder: 'e.g. Treasure Island',
};

export const Filled = Template.bind({});
Filled.args = {
  label: 'Title',
  defaultValue: 'Treasure Island',
};

export const WithHint = Template.bind({});
WithHint.args = {
  label: 'Release year',
  type: 'number',
  placeholder: 'e.g. 1883',
  hint: 'The year it was first published.',
};

export const WithError = Template.bind({});
WithError.args = {
  label: 'Title',
  error: 'Enter a title.',
};

export const Disabled = Template.bind({});
Disabled.args = {
  label: 'Title',
  defaultValue: 'Treasure Island',
  disabled: true,
};
