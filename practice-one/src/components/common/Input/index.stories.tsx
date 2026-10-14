import { ComponentMeta, ComponentStory } from '@storybook/react';
import searchIconUrl from '@assets/images/icons/search.svg';
import Input from '.';

export default {
  title: 'common/Input',
  component: Input,
} as ComponentMeta<typeof Input>;

const Template: ComponentStory<typeof Input> = args => <Input {...args} />;

export const Default = Template.bind({});
Default.args = {
  ...Default.args,
  type: 'text',
  label: 'Text Input',
  name: 'text-input',
  placeholder: 'Enter text here',
};

export const WithError = Template.bind({});
WithError.args = {
  ...WithError.args,
  type: 'password',
  label: 'Password Input',
  name: 'number-input',
  placeholder: 'Enter number here',
  errorMsg: 'Number Input Error Message',
};

export const WithIcon = Template.bind({});
WithIcon.args = {
  ...WithIcon.args,
  type: 'search',
  name: 'search-input',
  placeholder: 'Search here',
  iconUrl: searchIconUrl,
};
