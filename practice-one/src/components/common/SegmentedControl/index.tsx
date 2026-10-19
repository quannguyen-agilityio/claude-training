import React from 'react';
import clsx from 'clsx';
import { IconNames } from '@enums/Icon';
import { FOCUS_RING } from '@constants/Styles';
import Icon from '@components/common/Icon';

export interface SegmentOption<T extends string> {
  value: T;
  label: string;
  icon: IconNames;
}

interface SegmentedControlProps<T extends string> {
  label: string;
  options: SegmentOption<T>[];
  value: T;
  onChange: (value: T) => void;
}

const SegmentedControl = <T extends string>({ label, options, value, onChange }: SegmentedControlProps<T>) => (
  <div role="group" aria-label={label} className="inline-flex gap-0.5 rounded-lg border border-line bg-surface p-0.5">
    {options.map(option => {
      const pressed = option.value === value;

      return (
        <button
          key={option.value}
          type="button"
          aria-pressed={pressed}
          aria-label={option.label}
          onClick={() => onChange(option.value)}
          className={clsx(
            'inline-flex h-10 w-11 items-center justify-center rounded-md transition-colors',
            pressed ? 'bg-accent-soft text-accent-ink' : 'text-muted hover:bg-raised hover:text-ink',
            FOCUS_RING,
          )}
        >
          <Icon name={option.icon} />
        </button>
      );
    })}
  </div>
);

export default SegmentedControl;
