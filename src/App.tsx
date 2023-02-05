import { useState } from "react";
import axios, { AxiosResponse } from "axios";
import { useQuery } from "react-query";
import { Formik, Form } from "formik";

import { TextField, Autocomplete, Button } from "@mui/material";
import { TradesTable } from "./components/Table";

const App = () => {
  const [ticker, setTicker] = useState("");
  const [ticker_24h, setTicker_24h] = useState("");
  const [recentTrades, setRecentTrades] = useState([]);

  const { isLoading, error, data } = useQuery(
    "pairs",
    async () => await axios("https://data.binance.com/api/v3/exchangeInfo")
  );

  const currencyPairs = data?.data.symbols.map(
    (symbol: SymbolsProps) => symbol.symbol
  );

  const initialValues = {
    pairs: currencyPairs,
  };

  const getPairData = async (value: string) => {
    const params = { symbol: value };

    const recentTrades = await axios.get(
      `https://data.binance.com/api/v3/trades`,
      {
        params: { limit: 10, ...params },
      }
    );

    const ticker_24h = await axios.get(
      `https://data.binance.com/api/v3/ticker/24hr`,
      {
        params,
      }
    );

    const ticker = await axios.get(
      `https://data.binance.com/api/v3/ticker/price`,
      {
        params,
      }
    );

    setTicker(ticker.data);
    setTicker_24h(ticker_24h.data);
    setRecentTrades(recentTrades.data);

    console.log("recentTrades", recentTrades.data);
    console.log("ticker_24h", ticker_24h.data);
    console.log("ticker", ticker.data);
  };

  const submit = ({ pairs }: string) => {
    getPairData(pairs);
  };

  return (
    <>
      {error && <p>Something went wrong...</p>}
      <div className="font-alliance m-6">{isLoading && <p>Fetching</p>}</div>
      <div>
        <Formik initialValues={initialValues} onSubmit={submit}>
          {({ handleChange, values, setFieldValue }) => (
            <Form>
              <Autocomplete
                disablePortal
                id="pairs"
                options={currencyPairs}
                value={values.pair}
                onChange={(e, value) => {
                  console.log(value);
                  setFieldValue(
                    "pairs",
                    value !== null ? value : initialValues.pairs
                  );
                }}
                sx={{ width: 300 }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Please select a currency pair"
                  />
                )}
              />
              <Button
                className="bg-pink"
                variant="contained"
                color="primary"
                type="submit"
              >
                Fetch data for this pair
              </Button>
            </Form>
          )}
        </Formik>
      </div>

      <div>
        {recentTrades.length && (
          <TradesTable trades={recentTrades}></TradesTable>
        )}
      </div>
    </>
  );
};

export default App;
