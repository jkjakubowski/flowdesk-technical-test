import axios from "axios";
import { useQuery } from "react-query";

import { TextField, Autocomplete } from "@mui/material";

const App = () => {
  const { isLoading, error, data } = useQuery(
    "pairs",
    async () => await axios("https://data.binance.com/api/v3/exchangeInfo")
  );

  const pairs = data?.data.symbols.map((symbol: SymbolsProps) => symbol.symbol);
  console.log(data?.data.symbols);

  return (
    <>
      {error && <p>error</p>}
      <div className="font-alliance m-6">{isLoading && <p>Fetching</p>}</div>
      <div>
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={pairs}
          sx={{ width: 300 }}
          renderInput={(params) => (
            <TextField {...params} label="Please select a pair" />
          )}
        />
      </div>
    </>
  );
};

export default App;
