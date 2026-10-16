import { ComponentMeta, ComponentStory } from '@storybook/react';
import { IconNames } from '@enums/Icon';
import Icon from '.';

export default {
  title: 'common/Icon',
  component: Icon,
  argTypes: {
    name: {
      control: { type: 'select', options: Object.values(IconNames) },
    },
  },
} as ComponentMeta<typeof Icon>;

const Template: ComponentStory<typeof Icon> = args => <Icon {...args} />;

export const Default = Template.bind({});
Default.args = {
  name: IconNames.SEARCH,
};

export const All: ComponentStory<typeof Icon> = () => (
  <div className="flex flex-wrap gap-4 text-ink">
    {Object.values(IconNames).map(name => (
      <Icon key={name} name={name} />
    ))}
  </div>
);
