import React, { useState } from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import warningIcon from '@assets/images/icons/warning.svg';
import { ButtonVariants } from '@enums/Button';
import Modal from '.';
import Button from '../Button';

export default {
  title: 'common/Modal',
  component: Modal,
  argTypes: {
    children: {
      defaultValue: 'Children',
      control: { type: 'text' },
    },
  },
  parameters: {
    actions: {
      handles: ['click'],
    },
  },
} as ComponentMeta<typeof Modal>;

export const ConfirmModal: ComponentStory<typeof Modal> = args => {
  const [showModal, setShowModal] = useState<boolean>(false);

  return (
    <>
      <Button variant={ButtonVariants.DANGER} onClick={() => setShowModal(true)}>
        Delete
      </Button>
      {showModal ? (
        <Modal {...args}>
          <p>You will not be able to recover this action!</p>
          <div className="flex gap-[50px]">
            <Button variant={ButtonVariants.SECONDARY} onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button variant={ButtonVariants.DANGER} onClick={() => alert('Confirm Delete')}>
              Delete
            </Button>
          </div>
        </Modal>
      ) : null}
    </>
  );
};
ConfirmModal.args = {
  ...ConfirmModal.args,
  title: 'Are you sure to delete?',
  iconUrl: warningIcon,
};
