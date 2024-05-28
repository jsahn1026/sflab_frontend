import React from 'react';
import { TextField, MenuItem } from '@mui/material';

interface SingleSelectOptionProps {
  options: string[];
  value: string;
  setState: (value: string) => void;
  placeholder?: string;
  title?: string;
}

const SingleSelectOption: React.FC<SingleSelectOptionProps> = ({ options, value, setState, placeholder, title }) => {
  return (
    <TextField
      select
      label={title || placeholder}
      value={value}
      onChange={(e) => setState(e.target.value)}
      fullWidth
    >
      {options.map((option) => (
        <MenuItem key={option} value={option}>
          {option}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default SingleSelectOption;