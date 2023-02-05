import {
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Table,
  TableBody,
  TableContainer,
  TablePagination,
  Box,
  Paper,
} from "@mui/material";
import { visuallyHidden } from "@mui/utils";
import { useState } from "react";

interface Data {
  id: number;
  price: string;
  qty: string;
  time: number;
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = "asc" | "desc";

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(
  array: readonly T[],
  comparator: (a: T, b: T) => number
) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

interface HeadCell {
  id: string;
  label: string;
}

const headCells: HeadCell[] = [
  { id: "price", label: "Price" },
  { id: "qty", label: "Quantity" },
  { id: "time", label: "Time" },
];

interface EnhancedTableProps {
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => void;
  order: Order;
  orderBy: string;
}

const TableHeadCells = (props: EnhancedTableProps) => {
  const { order, orderBy, onRequestSort } = props;

  const createSortHandler =
    (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export const TradesTable = ({ trades }) => {
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<keyof Data>("price");

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <TableContainer>
          <Table sx={{ maxWidth: 1000 }}>
            <TableHeadCells
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {stableSort(trades, getComparator(order, orderBy)).map(
                (trade) => {
                  const tradeTime = new Date(trade.time);
                  const formattedTime = `${tradeTime.getDate()}/${tradeTime.getMonth()}/${tradeTime.getFullYear()} ${tradeTime.getHours()}:${tradeTime.getMinutes()}:${tradeTime.getSeconds()}`;

                  return (
                    <TableRow key={trade.id}>
                      <TableCell>{trade.price}</TableCell>
                      <TableCell>{trade.qty}</TableCell>
                      <TableCell>{formattedTime}</TableCell>
                    </TableRow>
                  );
                }
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};
