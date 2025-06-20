import classNames, { Argument } from "classnames";
import { useEffect, useRef } from "react";

type Props = {
  visible: boolean;
  onClose?: () => void;
  className?: Argument;
  modalBoxClassName?: Argument;
} & React.PropsWithChildren;

const Modal = ({
  visible,
  onClose,
  className,
  modalBoxClassName,
  children,
}: Props) => {
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
    event.stopPropagation();
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
        className={classNames("modal", className)}
        onCancel={handleESC}
      >
        <div className={classNames("modal-box", modalBoxClassName)}>
          {children}
        </div>
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
