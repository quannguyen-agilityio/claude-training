import { ComponentMeta, ComponentStory } from '@storybook/react';
import listIconUrl from '@assets/images/icons/list.svg';
import { ButtonTypes } from '@enums/Button';
import Button from '.';

export default {
  title: 'common/Button',
  component: Button,
  argTypes: {
    variant: {
      control: {
        type: 'inline-radio',
        options: ['primary', 'secondary', 'tertiary', 'warning', 'circle'],
      },
    },
    hasBorder: {
      control: 'boolean',
    },
  },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = args => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  ...Primary.args,
  variant: ButtonTypes.PRIMARY,
  children: 'Primary',
};

export const Secondary = Template.bind({});
Secondary.args = {
  ...Secondary.args,
  variant: ButtonTypes.SECONDARY,
  children: 'Secondary',
};

export const Tertiary = Template.bind({});
Tertiary.args = {
  ...Tertiary.args,
  variant: ButtonTypes.TERTIARY,
  children: 'Tertiary',
};

export const Warning = Template.bind({});
Warning.args = {
  ...Warning.args,
  variant: ButtonTypes.WARNING,
  children: 'Warning',
};

export const Circle = Template.bind({});
Circle.args = {
  ...Circle.args,
  variant: ButtonTypes.CIRCLE,
  iconUrl: listIconUrl,
  hasBorder: true,
};
