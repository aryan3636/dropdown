export const textFieldStyles = {
  width: "100%",
  input: {
    padding: "1.5rem 2rem",
    backgroundColor: "#3c4043",
    color: "white",
    fontSize: "12px",
  },
};

export const boxContainer = {
  position: "relative",
  width: {
    xs: "100%",
    sm: "500px",
    md: "700px",
    lg: "900px",
    xl: "1024px",
  },
};

export const boxTitleDropdown = {
  position: "absolute",
  left: 0,
  right: 0,
  zIndex: 10,
  maxHeight: "300px",
  overflowY: "auto",
  bgcolor: "#000",
  color: "white",
  border: "1px solid #444",
  borderRadius: "0 0 8px 8px",
  mt: 1,
  boxShadow: 3,
};

export const searchingBox = {
  px: 2,
  py: 1,
  color: "#aaa",
};

export const noItemsFoundBox = {
  px: 2,
  py: 1,
  color: "#aaa",
};

export const titleBoxNames = {
  px: 2,
  py: 1,
  cursor: "pointer",
  textTransform: "capitalize",
  "&:hover": {
    backgroundColor: "#e0e0e0",
    color: "black",
  },
};

export const clearButton = {
  position: "absolute",
  top: "50%",
  right: {
    xs: "1rem",
    sm: "1rem",
    md: "1.5rem",
    lg: "1.75rem",
    xl: "2rem",
  },
  transform: "translateY(-50%)",
  color: "#dc2626",
  "&:hover": { color: "#ffffff" },
  minWidth: "auto",
  padding: 0,
  lineHeight: 1,
  fontSize: "1rem",
};
