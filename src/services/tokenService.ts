// /src/services/tokenService.ts
import { CoinsData } from "../types/token";

import coinsData from "../data/data.json"; // adjust the path as needed

export const fetchTokens = async (): Promise<CoinsData> => {
    // simulate network delay
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(coinsData);
        }, 500);
    });
};
