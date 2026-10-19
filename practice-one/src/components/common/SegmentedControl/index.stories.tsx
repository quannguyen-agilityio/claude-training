import { useState } from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { DisplayTypes } from '@enums/Filter';
import { IconNames } from '@enums/Icon';
import SegmentedControl from '.';

export default {
  title: 'common/SegmentedControl',
  component: SegmentedControl,
} as ComponentMeta<typeof SegmentedControl>;

export const Layout: ComponentStory<typeof SegmentedControl> = () => {
  const [value, setValue] = useState<DisplayTypes>(DisplayTypes.GRID);

  return (
    <SegmentedControl
      label="Layout"
      value={value}
      onChange={setValue}
      options={[
        { value: DisplayTypes.GRID, label: 'Grid view', icon: IconNames.GRID },
        { value: DisplayTypes.LIST, label: 'List view', icon: IconNames.LIST },
      ]}
    />
  );
};
