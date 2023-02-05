type TickerProps = {
  children: string;
  color: string;
};

const Ticker: React.FC<TickerProps> = ({ children, color }) => {
  return <h1 className={`text-2xl md:text-3xl mt-4 ${color}`}>{children}</h1>;
};

export default Ticker;
