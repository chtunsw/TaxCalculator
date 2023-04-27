import React from "react";
import { Select, MenuItem, SelectChangeEvent } from "@mui/material";

interface SelectionFieldProps {
  label: string;
  options: string[];
  value: string;
  setValue: (value: string) => void;
  disabled?: boolean;
  error?: boolean;
}

const SelectionField = ({
  label,
  options,
  value,
  setValue,
  disabled,
  error,
}: SelectionFieldProps) => {
  const onChange = (event: SelectChangeEvent) => {
    setValue(event.target.value);
  };
  return (
    <div>
      <div>{label}</div>
      <Select
        value={value}
        onChange={onChange}
        disabled={disabled}
        error={error}
      >
        {options.map((op, index) => (
          <MenuItem key={op + index.toString()} value={op}>
            {op}
          </MenuItem>
        ))}
      </Select>
    </div>
  );
};

export default SelectionField;
