import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ButtonVariants } from '@enums/Button';
import { IconNames } from '@enums/Icon';
import Alert from '@components/common/Alert';
import Button from '@components/common/Button';
import Dialog from '.';

export default {
  title: 'common/Dialog',
  component: Dialog,
  argTypes: {
    onClose: { action: 'close' },
  },
} as ComponentMeta<typeof Dialog>;

// The states of design/cards/delete-dialog.html
interface DeleteStateArgs {
  bookTitle: string;
  deleting?: boolean;
  failed?: boolean;
  onClose: () => void;
}

const DeleteState: React.FC<DeleteStateArgs> = ({ bookTitle, deleting, failed, onClose }) => (
  <Dialog
    title={`Delete “${bookTitle}”?`}
    description="This removes the book from your library. You can't undo this."
    icon={IconNames.TRASH}
    onClose={onClose}
    dismissible={!deleting}
    actions={(
      <>
        <Button variant={ButtonVariants.SECONDARY} className="w-full sm:w-auto" disabled={deleting} onClick={onClose}>
          Cancel
        </Button>
        <Button variant={ButtonVariants.DANGER} className="w-full sm:w-auto" loading={deleting} loadingLabel="Deleting…">
          {failed ? 'Try again' : 'Delete book'}
        </Button>
      </>
    )}
  >
    {failed ? <Alert title="We couldn't delete this book." text="Try again in a moment." /> : null}
  </Dialog>
);

const Template: ComponentStory<typeof DeleteState> = args => <DeleteState {...args} />;

export const Default = Template.bind({});
Default.args = {
  bookTitle: 'Treasure Island',
};

export const LongTitle = Template.bind({});
LongTitle.args = {
  bookTitle: 'The Hound of the Baskervilles',
};

export const Deleting = Template.bind({});
Deleting.args = {
  ...Default.args,
  deleting: true,
};

export const DeleteFailed = Template.bind({});
DeleteFailed.args = {
  ...Default.args,
  failed: true,
};
