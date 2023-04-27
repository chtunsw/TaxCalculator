import React from "react";
import { TextField } from "@mui/material";

interface CurrencyFieldProps {
  label: string;
  value: string;
  setValue: (value: string) => void;
}

const CurrencyField = ({ label, value, setValue }: CurrencyFieldProps) => {
  return (
    <div>
      <div>{label}</div>
      <TextField />
    </div>
  );
};

export default CurrencyField;
