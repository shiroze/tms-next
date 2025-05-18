import { Select as MuiSelect, MenuItem, FormControl, InputLabel, SelectProps as MuiSelectProps } from '@mui/material';

export interface SelectProps extends MuiSelectProps {
  label?: string;
  options: Array<{ value: string | number; label: string }>;
}

export function Select({ label, options, ...props }: SelectProps) {
  return (
    <FormControl fullWidth size="small">
      {label && <InputLabel>{label}</InputLabel>}
      <MuiSelect label={label} {...props}>
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </MuiSelect>
    </FormControl>
  );
}