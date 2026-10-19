import { ComponentMeta, ComponentStory } from '@storybook/react';
import CoverPreview from '.';

export default {
  title: 'components/BookForm/CoverPreview',
  component: CoverPreview,
} as ComponentMeta<typeof CoverPreview>;

const Template: ComponentStory<typeof CoverPreview> = args => <CoverPreview {...args} />;

export const Empty = Template.bind({});
Empty.args = {
  title: '',
  thumbnail: '',
};

export const WithCover = Template.bind({});
WithCover.args = {
  title: 'Treasure Island',
  thumbnail: 'https://covers.openlibrary.org/b/isbn/9780141321004-L.jpg',
};
