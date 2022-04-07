import React from "react";
import Button from "@mui/material/Button";


export default function SubmitButton(props) {
  const { children, onClick, value } = props;
  return (
    <Button
      onClick={onClick}
      {...props}
      value={value}
      sx={{
        width: "250px",
        my: "30px",
        "&.MuiButton-root": {
          backgroundColor: "#78909c",
          color: "white",
        },
      }}
    >
      {children}
    </Button>
  );
}
