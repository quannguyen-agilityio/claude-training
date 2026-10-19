import { ComponentMeta, ComponentStory } from '@storybook/react';
import TextAreaField from '.';

export default {
  title: 'common/TextAreaField',
  component: TextAreaField,
  decorators: [
    Story => (
      <div className="max-w-sm">
        <Story />
      </div>
    ),
  ],
} as ComponentMeta<typeof TextAreaField>;

const Template: ComponentStory<typeof TextAreaField> = args => <TextAreaField {...args} />;

export const Default = Template.bind({});
Default.args = {
  label: 'Description',
  placeholder: 'What is the book about?',
};

export const Filled = Template.bind({});
Filled.args = {
  label: 'Description',
  rows: 3,
  defaultValue:
    'Young Jim Hawkins finds a treasure map and sails with the cunning Long John Silver in search of buried pirate gold.',
};

export const WithError = Template.bind({});
WithError.args = {
  label: 'Description',
  error: 'Enter a description.',
};

export const Disabled = Template.bind({});
Disabled.args = {
  ...Filled.args,
  disabled: true,
};
