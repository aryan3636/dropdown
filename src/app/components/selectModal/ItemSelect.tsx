import { ReactNode, useEffect, useState } from "react";

interface Props {
  shouldShow: boolean;
  onRequestClose: () => void;
  children: ReactNode;
}

export const SelectModal = ({
  shouldShow,
  onRequestClose,
  children,
}: Props) => {
  const [visible, setVisibility] = useState(false);

  useEffect(() => {
    if (shouldShow) {
      setVisibility(true);
    } else {
      const timeout = setTimeout(() => setVisibility(false), 400);
      return () => clearTimeout(timeout);
    }
  }, [shouldShow]);
  return (
    visible && (
      <div
        className={`${shouldShow ? "modal-content" : "close-modal-content"}`}
      >
        <div className="modal-body">
          {children}
          <button
            className="close-button text-xl cursor-pointer"
            onClick={onRequestClose}
          >
            Close
          </button>
        </div>
      </div>
    )
  );
};
