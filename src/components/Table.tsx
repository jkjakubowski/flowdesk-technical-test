import {
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Table,
  TableBody,
  TableContainer,
  TablePagination,
  Paper,
} from "@mui/material";

const headCells = ["Price", "Quantity", "Time"];

const TableHeadCells = () => {
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell key={headCell}>{headCell}</TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export const TradesTable = ({ trades }) => {
  console.log("trades", trades);
  return (
    <TableContainer component={Paper}>
      <Table sx={{ maxWidth: 1000 }}>
        <TableHeadCells />
        <TableBody>
          {trades.map((trade) => (
            <TableRow key={trade.id}>
              <TableCell>{trade.price}</TableCell>
              <TableCell>{trade.qty}</TableCell>
              <TableCell>{trade.time}</TableCell>
            </TableRow>
          ))}
          {/* {trades ? (
            trades.map((trade) => {
              <TableRow key={trade.id}>
                <TableCell>{trade.price}</TableCell>
                <TableCell>{trade.qty}</TableCell>
                <TableCell>{trade.time}</TableCell>
              </TableRow>;
            })
          ) : (
            <p>toto</p>
          )} */}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
