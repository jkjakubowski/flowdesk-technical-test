import { useState } from "react";
import axios from "axios";
import { useQuery } from "react-query";
import { Formik, Form } from "formik";

import { TextField, Autocomplete, Button } from "@mui/material";
import { TradesTable } from "./components/molecules/table/Table";
import { Layout } from "./components/atoms/template/Layout";
import Title from "./components/atoms/typography/Title";
import Ticker from "./components/atoms/typography/Ticker";

const App = () => {
  const [ticker, setTicker] = useState("");
  const [ticker_24h, setTicker_24h] = useState({
    price: "",
    textColor: "",
  });
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

    let textColor;

    if (ticker_24h.data.priceChangePercent.includes("-")) {
      textColor = "text-red";
    } else {
      textColor = "text-green";
    }

    setTicker(ticker.data.price);
    setTicker_24h({
      price: ticker_24h.data.priceChangePercent,
      textColor: textColor,
    });
    setRecentTrades(recentTrades.data);
  };

  const submit = ({ pair }: any) => {
    getPairData(pair);
  };

  const style = {
    "& label.Mui-focused": {
      color: "#b053ab",
    },
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        borderColor: "#b053ab",
      },
    },
  };

  return (
    <>
      <Layout>
        <div>
          <Title>Flowdesk's public market data</Title>
          {error ? (
            <p className="text-pink">Something went wrong...</p>
          ) : (
            <>
              <div className="mt-8 flex justify-center">
                <Formik initialValues={initialValues} onSubmit={submit}>
                  {({ values, setFieldValue }) => (
                    <Form className="flex flex-col justify-center">
                      <Autocomplete
                        disablePortal
                        disabled={isLoading}
                        id="pair"
                        options={currencyPairs}
                        value={values.pairs}
                        className="bg-white font-sans focus-within:border-purple focus:outline-purple active:outline-purple"
                        onChange={(e, value) => {
                          setFieldValue(
                            "pair",
                            value !== null ? value : initialValues.pairs
                          );
                        }}
                        sx={{ width: 300 }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            sx={style}
                            label={
                              isLoading
                                ? "Data is loading"
                                : "Please select a currency pair"
                            }
                            className="bg-white font-sans"
                          />
                        )}
                      />
                      <Button
                        className="bg-purple hover:bg-pink mt-4 font-sans"
                        variant="contained"
                        color="primary"
                        type="submit"
                      >
                        Get data for this pair
                      </Button>
                    </Form>
                  )}
                </Formik>
              </div>

              <div>
                {ticker && (
                  <Ticker color="text-white">{`Current price: ${ticker}`}</Ticker>
                )}
                {ticker_24h && (
                  <Ticker color={`${ticker_24h.textColor}`}>
                    {`Last 24h variations: ${ticker_24h.price}`}
                  </Ticker>
                )}
                {!!recentTrades.length && <TradesTable trades={recentTrades} />}
              </div>
            </>
          )}
        </div>
      </Layout>
    </>
  );
};

export default App;
