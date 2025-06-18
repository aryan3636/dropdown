export const showAllContainerBox = {
  maxHeight: {
    xs: "100%",
    sm: "60%",
    md: "40%",
  },
  overflowY: "auto",
  position: "relative",
  marginRight: {
    xs: 0,
    md: "-38em",
  },
};

export const itemsGrid = {
  maxWidth: "50em",
};

export const itemsTitle = {
  color: "#8ab4f8",
  fontSize: "1.5rem",
  display: "inline-block",
  mb: "0.25rem",
  textDecoration: "none",
  cursor: "pointer",
  "&:hover": { textDecoration: "underline" },
};

export const itemsBody = {
  textOverflow: "ellipsis",
  mb: 1.5,
  wordBreak: "break-word",
};

export const pagination = {
  mt: 3,
  mx: "auto",
  color: "#fff",
  width: {
    xs: "100%",
    sm: "60%",
    md: "40%",
  },
  display: "flex",
  justifyContent: "center",
  button: {
    border: "1px solid #fff ",
  },
  "& .MuiPaginationItem-root": {
    color: "#fff",
  },
  "& .Mui-selected": {
    backgroundColor: "#8ab4f8",
  },
  "& .Mui-selected:hover": {
    backgroundColor: "#d55e5e",
  },
};
