import { ComponentMeta, ComponentStory } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import { ButtonVariants } from '@enums/Button';
import { IconNames } from '@enums/Icon';
import LinkButton from '.';

export default {
  title: 'common/LinkButton',
  component: LinkButton,
  decorators: [
    Story => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
  argTypes: {
    variant: {
      control: { type: 'inline-radio', options: Object.values(ButtonVariants) },
    },
  },
} as ComponentMeta<typeof LinkButton>;

const Template: ComponentStory<typeof LinkButton> = args => <LinkButton {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  to: '/add-new-book',
  children: 'Add book',
  icon: IconNames.PLUS,
};

export const Secondary = Template.bind({});
Secondary.args = {
  to: '/',
  children: 'Show all books',
  variant: ButtonVariants.SECONDARY,
};
