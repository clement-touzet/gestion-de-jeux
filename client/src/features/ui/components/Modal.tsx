import { useEffect, useRef } from "react";

type Props = {
  visible: boolean;
  onClose?: () => void;
} & React.PropsWithChildren;

const Modal = ({ visible, onClose, children }: Props) => {
  const modalRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (!modalRef.current) {
      return;
    }

    // permet d'afficher ou de fermer la modale en fonction de l'état "visible"
    if (visible) {
      modalRef.current.showModal();
    } else {
      modalRef.current.close();
    }
  }, [visible]);

  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

  const handleESC = (event: React.ChangeEvent<HTMLDialogElement>) => {
    event?.preventDefault();
    handleClose();
  };

  const handleClickOutside = (event: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();
    handleClose();
  };

  return (
    <>
      <dialog
        ref={modalRef}
        id="my_modal_1"
        className="modal"
        onCancel={handleESC}
      >
        <div className="modal-box">{children}</div>
        {/* close the modal when clicked outside */}
        <form
          method="dialog"
          onSubmit={handleClickOutside}
          className="modal-backdrop"
        >
          <button>close</button>
        </form>
      </dialog>
    </>
  );
};

export default Modal;
