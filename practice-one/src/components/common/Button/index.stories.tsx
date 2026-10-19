import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ButtonVariants } from '@enums/Button';
import { IconNames } from '@enums/Icon';
import Button from '.';

export default {
  title: 'common/Button',
  component: Button,
  argTypes: {
    variant: {
      control: { type: 'inline-radio', options: Object.values(ButtonVariants) },
    },
    icon: {
      control: { type: 'select', options: [undefined, ...Object.values(IconNames)] },
    },
  },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = args => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  children: 'Add book',
  icon: IconNames.PLUS,
};

export const Secondary = Template.bind({});
Secondary.args = {
  children: 'Cancel',
  variant: ButtonVariants.SECONDARY,
};

export const Ghost = Template.bind({});
Ghost.args = {
  children: 'Clear',
  icon: IconNames.X,
  variant: ButtonVariants.GHOST,
};

export const Danger = Template.bind({});
Danger.args = {
  children: 'Delete book',
  icon: IconNames.TRASH,
  variant: ButtonVariants.DANGER,
};

export const DangerSecondary = Template.bind({});
DangerSecondary.args = {
  children: 'Delete',
  icon: IconNames.TRASH,
  variant: ButtonVariants.DANGER_SECONDARY,
};

export const Disabled = Template.bind({});
Disabled.args = {
  ...Primary.args,
  disabled: true,
};

export const Loading = Template.bind({});
Loading.args = {
  children: 'Save changes',
  loading: true,
  loadingLabel: 'Saving…',
};

// Every variant in its default, disabled and loading state, like state 3 of design/cards/foundations.html
const VARIANTS: [ButtonVariants, string, IconNames | undefined, string][] = [
  [ButtonVariants.PRIMARY, 'Add book', IconNames.PLUS, 'Saving…'],
  [ButtonVariants.SECONDARY, 'Cancel', undefined, 'Saving…'],
  [ButtonVariants.GHOST, 'Clear', IconNames.X, 'Saving…'],
  [ButtonVariants.DANGER, 'Delete book', IconNames.TRASH, 'Deleting…'],
  [ButtonVariants.DANGER_SECONDARY, 'Delete', IconNames.TRASH, 'Deleting…'],
];

export const AllVariants: ComponentStory<typeof Button> = () => (
  <table className="text-left">
    <thead>
      <tr>
        {['', 'default', 'disabled', 'loading'].map(state => (
          <th key={state} className="pb-3 pr-4 text-xs font-bold uppercase tracking-wider text-muted">
            {state}
          </th>
        ))}
      </tr>
    </thead>
    <tbody>
      {VARIANTS.map(([variant, label, icon, loadingLabel]) => (
        <tr key={variant}>
          <th className="py-2 pr-4 font-mono text-xs font-normal text-muted">{variant}</th>
          <td className="py-2 pr-4">
            <Button variant={variant} icon={icon}>
              {label}
            </Button>
          </td>
          <td className="py-2 pr-4">
            <Button variant={variant} icon={icon} disabled>
              {label}
            </Button>
          </td>
          <td className="py-2 pr-4">
            <Button variant={variant} icon={icon} loading loadingLabel={loadingLabel}>
              {label}
            </Button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);
