import { ComponentMeta, ComponentStory } from '@storybook/react';
import BookDetails from '.';

export default {
  title: 'components/BookDetails',
  component: BookDetails,
  parameters: {
    actions: {
      handles: ['click'],
    },
  },
} as ComponentMeta<typeof BookDetails>;

export const Template: ComponentStory<typeof BookDetails> = args => <BookDetails {...args} />;
Template.args = {
  ...Template.args,
  title: 'Angels and Demons',
  thumbnail:
    'https://images.thdstatic.com/productImages/72a48193-777e-41c2-ae7a-22971fe19b56/svn/multi-colored-stupell-industries-art-prints-mwp-535-cn-24x30-64_600.jpg',
  description:
    'Culpa nulla pariatur cupidatat nisi incididunt ea do ipsum. Incididunt quis mollit elit commodo cillum eiusmod reprehenderit labore irure. Cillum et incididunt et nostrud exercitation quis aute laboris non ut adipisicing. Laboris ad minim aute nulla proident deserunt velit anim sunt aliquip ut sit. Exercitation aliquip ullamco officia non aliqua. Sint deserunt aliquip veniam id eiusmod sit consectetur mollit ea aliqua officia consequat. Magna non mollit nisi est commodo voluptate aute id. Deserunt nostrud id do in nisi mollit deserunt non. Pariatur fugiat cillum irure elit sint nisi ad ipsum culpa deserunt cupidatat esse consequat laboris. Id aliquip non consectetur esse proident duis Lorem.',
};
