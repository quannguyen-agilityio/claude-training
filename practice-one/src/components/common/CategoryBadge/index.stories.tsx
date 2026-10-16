import { ComponentMeta, ComponentStory } from '@storybook/react';
import { CATEGORIES } from '@constants/Category';
import CategoryBadge from '.';

export default {
  title: 'common/CategoryBadge',
  component: CategoryBadge,
  argTypes: {
    category: {
      control: { type: 'select', options: CATEGORIES },
    },
  },
} as ComponentMeta<typeof CategoryBadge>;

const Template: ComponentStory<typeof CategoryBadge> = args => <CategoryBadge {...args} />;

export const Default = Template.bind({});
Default.args = {
  category: CATEGORIES[0],
};

export const All: ComponentStory<typeof CategoryBadge> = () => (
  <div className="flex flex-wrap gap-2">
    {CATEGORIES.map(category => (
      <CategoryBadge key={category} category={category} />
    ))}
  </div>
);
