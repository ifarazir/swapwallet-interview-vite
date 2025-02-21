// /src/services/tokenService.ts
import { CoinsData } from "../types/token";

import coinsData from "../data/data.json"; // adjust the path as needed

export const fetchTokens = async (): Promise<CoinsData> => {
    // simulate network delay
    return new Promise((resolve) => {
        setTimeout(() => {
            const olderData = localStorage.getItem("tokens");
            const jsonParsed = JSON.parse(olderData || "null");

            if (jsonParsed !== null && jsonParsed !== undefined) {
                resolve({
                    status: "OK",
                    result: {
                        totalValue: coinsData.result.totalValue,
                        tokens: jsonParsed,
                    }
                } as CoinsData);
            }
            else {
                localStorage.setItem("tokens", JSON.stringify(coinsData.result.tokens));
                resolve(coinsData);
            }
        }, 500);
    });
};
