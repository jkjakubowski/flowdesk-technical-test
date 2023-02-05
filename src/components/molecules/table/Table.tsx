import { useState } from "react";
import {
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Table,
  TableBody,
  TableContainer,
  Box,
  Paper,
} from "@mui/material";
import { visuallyHidden } from "@mui/utils";

import { getComparator, stableSort } from "../../../utils/utils";
import { HEADCELLS } from "./table.constants";

const TableHeadCells = (props: TableProps) => {
  const { order, orderBy, onRequestSort } = props;

  const createSortHandler =
    (property: string) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        {HEADCELLS.map((headCell) => (
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

export const TradesTable: React.FC<Trades> = ({ trades }) => {
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<keyof TradeData>("price");

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof TradeData
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  return (
    <Box className="mt-6" sx={{ width: "100%" }}>
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
