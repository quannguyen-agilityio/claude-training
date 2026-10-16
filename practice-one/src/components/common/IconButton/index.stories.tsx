import { ComponentMeta, ComponentStory } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import { IconButtonVariants } from '@enums/Button';
import { IconNames } from '@enums/Icon';
import IconButton from '.';

export default {
  title: 'common/IconButton',
  component: IconButton,
  decorators: [
    Story => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
  argTypes: {
    variant: {
      control: { type: 'inline-radio', options: Object.values(IconButtonVariants) },
    },
  },
} as ComponentMeta<typeof IconButton>;

const Template: ComponentStory<typeof IconButton> = args => <IconButton {...args} />;

export const Ghost = Template.bind({});
Ghost.args = {
  label: 'Delete Treasure Island',
  icon: IconNames.TRASH,
  variant: IconButtonVariants.GHOST,
};

export const Secondary = Template.bind({});
Secondary.args = {
  label: 'Switch to dark theme',
  icon: IconNames.MOON,
  variant: IconButtonVariants.SECONDARY,
};

export const AsLink = Template.bind({});
AsLink.args = {
  label: 'Edit Treasure Island',
  icon: IconNames.EDIT,
  to: '/edit-book/1',
};

export const Disabled = Template.bind({});
Disabled.args = {
  ...Ghost.args,
  disabled: true,
};
