import React from "react";
import { TextField } from "@mui/material";

interface SelectionFieldProps {
  label: string;
  options: string[];
  value: string;
  setValue: (value: string) => void;
}

const SelectionField = ({
  label,
  options,
  value,
  setValue,
}: SelectionFieldProps) => {
  return (
    <div>
      <div>{label}</div>
      <TextField />
    </div>
  );
};

export default SelectionField;
