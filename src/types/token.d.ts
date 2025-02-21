// /src/types/token.d.ts

export interface Amount {
    number: string;
    unit: string;
}

export interface MarketDataInfo {
    bestSell: string;
    bestBuy: string;
    latestPrice: string;
    dayChange: string;
}

export interface MarketData {
    source: string;
    destination: string;
    marketData: MarketDataInfo;
}

export interface Available {
    amount: Amount;
    values: Amount[];
}

export interface Token {
    name: string;
    available: Available;
    marketData: MarketData[];
}

export interface CoinsData {
    status: string;
    result: {
        totalValue: Amount[];
        tokens: Token[];
    };
}
