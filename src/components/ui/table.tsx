import {
  Table as MuiTable,
  TableBody as MuiTableBody,
  TableCell as MuiTableCell,
  TableContainer as MuiTableContainer,
  TableHead as MuiTableHead,
  TableRow as MuiTableRow,
  Paper,
} from '@mui/material';

export const Table = MuiTable;
export const TableBody = MuiTableBody;
export const TableCell = MuiTableCell;
export const TableHead = MuiTableHead;
export const TableRow = MuiTableRow;

export function TableContainer({ children }: { children: React.ReactNode }) {
  return (
    <MuiTableContainer component={Paper}>
      {children}
    </MuiTableContainer>
  );
}