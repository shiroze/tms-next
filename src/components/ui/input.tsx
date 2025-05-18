import { TextField, TextFieldProps } from '@mui/material';

export interface InputProps extends Omit<TextFieldProps, 'variant'> {
  variant?: 'outlined' | 'filled' | 'standard';
}

export function Input(props: InputProps) {
  return <TextField fullWidth variant="outlined" size="small" {...props} />;
}