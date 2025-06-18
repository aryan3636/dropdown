import { Button, Grid } from "@mui/material";
import { ReactNode, useEffect, useState } from "react";
import { closeButton, modalBodyGrid, modalContainerGrid } from "./ModalStyles";

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
      <Grid spacing={{ xs: 2, md: 3 }} sx={modalContainerGrid}>
        <Grid spacing={{ xs: 2, md: 3 }} sx={modalBodyGrid}>
          {children}
          <Button sx={closeButton} onClick={onRequestClose}>
            Close
          </Button>
        </Grid>
      </Grid>
    )
  );
};
