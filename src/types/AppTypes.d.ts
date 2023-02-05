type SymbolsProps = {
  allowTrailingStop: boolean;
  allowedSelfTradePreventionModes: string[];
  baseAsset: string;
  baseAssetPrecision: number;
  baseCommissionPrecision: number;
  cancelReplaceAllowed: boolean;
  defaultSelfTradePreventionMode: string;
  filters: any[];
  icebergAllowed: boolean;
  isMarginTradingAllowed: boolean;
  isSpotTradingAllowed: boolean;
  ocoAllowed: boolean;
  orderTypes: string[];
  permissions: string[];
  quoteAsset: string;
  quoteAssetPrecision: number;
  quoteCommissionPrecision: number;
  quoteOrderQtyMarketAllowed: boolean;
  quotePrecision: number;
  status: string;
  symbol: string;
};