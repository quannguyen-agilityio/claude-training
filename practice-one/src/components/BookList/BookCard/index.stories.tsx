import { ComponentMeta, ComponentStory } from '@storybook/react';
import BookCard from '.';

export default {
  title: 'components/BookCard',
  component: BookCard,
  parameters: {
    actions: {
      handles: ['click'],
    },
  },
} as ComponentMeta<typeof BookCard>;

export const Template: ComponentStory<typeof BookCard> = args => <BookCard {...args} />;
Template.args = {
  ...Template.args,
  id: '1',
  title: 'Riding Bike',
  thumbnail:
    'https://images.thdstatic.com/productImages/72a48193-777e-41c2-ae7a-22971fe19b56/svn/multi-colored-stupell-industries-art-prints-mwp-535-cn-24x30-64_600.jpg',
  author: 'Stuart Matt',
  published: 1999,
};
