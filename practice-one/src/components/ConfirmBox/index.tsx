import React, { useContext, useState } from 'react';
import Modal from '@components/common/Modal';
import Button from '@components/common/Button';
import { ButtonTypes } from '@enums/Button';
import { BookContext } from '@stores/book';
import warningIcon from '@assets/images/icons/warning.svg';
import { ApiRequest } from '@services/api-request';
import Loading from '@components/common/Loading';

const ConfirmBox: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { setShowConfirmBox, currentBookId } = useContext(BookContext);

  const handleClick = () => {
    (async () => {
      try {
        setLoading(true);

        if (currentBookId) {
          await ApiRequest.deleteBook(currentBookId);
          window.location.assign('/');
        }

        setLoading(false);
      } catch (error) {
        alert(error);
      }
    })();
  };

  return (
    <>
      {loading ? <Loading /> : null}
      <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm z-10 flex items-center justify-center">
        <Modal title="Are you sure to delete this book?" iconUrl={warningIcon}>
          <p>You will not be able to recover this action!</p>
          <div className="flex gap-[50px]">
            <Button variant={ButtonTypes.SECONDARY} onClick={() => setShowConfirmBox(false)}>
              Cancel
            </Button>
            <Button variant={ButtonTypes.WARNING} onClick={handleClick}>
              Delete
            </Button>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default ConfirmBox;
