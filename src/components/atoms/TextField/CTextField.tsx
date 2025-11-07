import { forwardRef } from "react";
import type { ITextField } from "./types";
import { TextField } from "@mui/material";

const CTextField = forwardRef<HTMLInputElement | null, ITextField>(
  ({ value, type, placeholder, label, ...props }, ref) => {
    return (
      <TextField
        {...props}
        ref={ref}
        type={type}
        label={label}
        placeholder={placeholder}
      ></TextField>
    );
  }
);

export default CTextField;
