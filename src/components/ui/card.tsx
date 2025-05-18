import { Card as MuiCard, CardContent as MuiCardContent, CardHeader as MuiCardHeader, CardProps, Typography } from '@mui/material';

export interface CustomCardProps extends CardProps {
  title?: string;
  children: React.ReactNode;
}

export function Card({ title, children, ...props }: CustomCardProps) {
  return (
    <MuiCard {...props}>
      {title && (
        <MuiCardHeader
          title={<Typography variant="h6">{title}</Typography>}
        />
      )}
      <MuiCardContent>{children}</MuiCardContent>
    </MuiCard>
  );
}

export { MuiCardContent as CardContent, MuiCardHeader as CardHeader };