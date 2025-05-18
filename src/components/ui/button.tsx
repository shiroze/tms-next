import { Button as MuiButton, ButtonProps as MuiButtonProps } from '@mui/material';

export interface ButtonProps extends MuiButtonProps {
  variant?: 'text' | 'outlined' | 'contained';
  size?: 'small' | 'medium' | 'large';
}

export function Button({ children, ...props }: ButtonProps) {
  return <MuiButton {...props}>{children}</MuiButton>;
}