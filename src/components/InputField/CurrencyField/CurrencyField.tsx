import React from "react";
import { TextField } from "@mui/material";
import "./CurrencyField.css";

interface CurrencyFieldProps {
  label: string;
  value: string;
  setValue: (value: string) => void;
  disabled?: boolean;
  error?: boolean;
}

const CurrencyField = ({
  label,
  value,
  setValue,
  disabled,
  error,
}: CurrencyFieldProps) => {
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };
  return (
    <div className="container">
      <div className="label">{label}</div>
      <TextField
        value={value}
        onChange={onChange}
        disabled={disabled}
        error={error}
        size="small"
        fullWidth
      />
    </div>
  );
};

export default CurrencyField;
