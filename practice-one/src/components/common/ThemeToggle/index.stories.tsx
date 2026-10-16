import { ComponentMeta, ComponentStory } from '@storybook/react';
import ThemeToggle from '.';

export default {
  title: 'common/ThemeToggle',
  component: ThemeToggle,
} as ComponentMeta<typeof ThemeToggle>;

export const Default: ComponentStory<typeof ThemeToggle> = () => <ThemeToggle />;
