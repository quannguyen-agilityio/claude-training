import { ComponentMeta, ComponentStory } from '@storybook/react';
import { CategoryTitle } from '@enums/Category';
import CategoryNav from '.';

export default {
  title: 'components/CategoryNav',
  component: CategoryNav,
} as ComponentMeta<typeof CategoryNav>;

const Template: ComponentStory<typeof CategoryNav> = args => <CategoryNav {...args} />;

export const AllSelected = Template.bind({});
AllSelected.args = {
  selected: CategoryTitle.ALL,
  counts: {
    [CategoryTitle.ALL]: 12,
    [CategoryTitle.ADVENTURE]: 2,
    [CategoryTitle.CONTEMPORARY]: 2,
    [CategoryTitle.ROMANCE]: 2,
    [CategoryTitle.FANTASY]: 2,
    [CategoryTitle.DYSTOPIAN]: 2,
    [CategoryTitle.MYSTERY]: 2,
  },
};

export const AdventureSelected = Template.bind({});
AdventureSelected.args = {
  ...AllSelected.args,
  selected: CategoryTitle.ADVENTURE,
};
