import { ComponentMeta, ComponentStory } from '@storybook/react';
import { CATEGORIES } from '@constants/Category';
import SelectField from '.';

export default {
  title: 'common/SelectField',
  component: SelectField,
  decorators: [
    Story => (
      <div className="max-w-sm">
        <Story />
      </div>
    ),
  ],
} as ComponentMeta<typeof SelectField>;

const Template: ComponentStory<typeof SelectField> = args => (
  <SelectField {...args}>
    {CATEGORIES.map(category => (
      <option key={category} value={category}>
        {category}
      </option>
    ))}
  </SelectField>
);

export const Default = Template.bind({});
Default.args = {
  label: 'Category',
};

export const WithHint = Template.bind({});
WithHint.args = {
  label: 'Category',
  hint: 'Shown as a colored dot on the book card.',
};

export const WithError = Template.bind({});
WithError.args = {
  label: 'Category',
  error: 'Choose a category.',
};

export const Disabled = Template.bind({});
Disabled.args = {
  label: 'Category',
  disabled: true,
};
