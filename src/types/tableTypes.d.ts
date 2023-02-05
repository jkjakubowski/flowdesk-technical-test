type Order = "asc" | "desc";

type TradeData = {
  id: number;
  price: string;
  qty: string;
  time: number;
};

type Trades = { trades: TradeData[] };

type HeadCell = {
  id: string;
  label: string;
};

type TableProps = {
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof TradesData
  ) => void;
  order: Order;
  orderBy: string;
};
