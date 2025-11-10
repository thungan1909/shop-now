import { IconButton, InputAdornment, TextField } from "@mui/material";
import { forwardRef, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import type { ITextField } from "./types";

const CTextField = forwardRef<HTMLInputElement | null, ITextField>(
  (
    {
      type = "text",
      disabled = false,
      className,
      customStyle = {},
      label,
      placeholder,
      value,
      maxLength = 1024,
      onChange,
      onKeyDown,
      startIcon,
      sx = {},
      required = false,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPasswordField = type === "password";

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (onChange) onChange(e);
    };

    return (
      <TextField
        {...props}
        ref={ref}
        label={label}
        placeholder={placeholder}
        // type={isPasswordField && !showPassword ? "password" : type}
        type={isPasswordField ? (showPassword ? "text" : "password") : type}
        className={className}
        disabled={disabled}
        value={value}
        onChange={handleChange}
        required={required}
        slotProps={{
          input: {
            inputProps: { maxLength, style: { ...customStyle } },
            startAdornment: (
              <InputAdornment position="start">{startIcon}</InputAdornment>
            ),
            endAdornment: isPasswordField ? (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword((prev) => !prev)}
                  edge="end"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </IconButton>
              </InputAdornment>
            ) : null,
          },
        }}
        onInput={(e) => {
          const target = e.target as HTMLInputElement;
          if (target.value.length > maxLength) {
            target.value = target.value.slice(0, maxLength);
          }
        }}
        sx={{
          ...sx,
          "& .MuiOutlinedInput-input, & .MuiOutlinedInput-root, & .MuiOutlinedInput-root fieldset":
            {
              fontFamily: "inherit",
            },
          "& .MuiOutlinedInput-root": {
            transition: "all 0.3s ease",
            "& fieldset": { borderColor: "gray" },
            "&:hover fieldset, &.Mui-focused fieldset": {
              borderColor: "var(--main-color)",
            },
          },
          "& .MuiInputLabel-root": {
            fontFamily: "inherit",
            "&.Mui-focused": { color: "var(--main-color)" },
          },
          "& input[type='number']": {
            MozAppearance: "textfield",
            "&::-webkit-inner-spin-button, &::-webkit-outer-spin-button": {
              WebkitAppearance: "none",
              margin: 0,
            },
          },
        }}
        onKeyDown={(e) =>
          onKeyDown && onKeyDown(e as React.KeyboardEvent<HTMLInputElement>)
        }
      />
    );
  }
);

export default CTextField;
