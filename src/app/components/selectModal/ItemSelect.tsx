import { Grid } from "@mui/material";
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
      setVisibility(false);
    }
  }, [shouldShow]);
  return (
    visible && (
      <Grid spacing={{ xs: 2, md: 3 }} className="modal-content">
        <Grid spacing={{ xs: 2, md: 3 }} className="modal-body">
          {children}
          <button
            className="close-button text-xl cursor-pointer"
            onClick={onRequestClose}
          >
            Close
          </button>
        </Grid>
      </Grid>
    )
  );
};
