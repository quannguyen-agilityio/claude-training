import { ComponentMeta, ComponentStory } from '@storybook/react';
import Loading from '.';

export default {
  title: 'common/Loading',
  component: Loading,
} as ComponentMeta<typeof Loading>;

export const Template: ComponentStory<typeof Loading> = args => <Loading {...args} />;
