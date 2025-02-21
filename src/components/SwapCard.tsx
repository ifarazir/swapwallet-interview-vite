import React, { useState } from "react";
import styles from "../styles/swap.module.css";
import { Token } from "../types/token";
import { ArrowDownUp, ArrowLeftRight, Loader } from "lucide-react";
import SwapInput from "./SwapInput.tsx";
import usePersistedState from "../hooks/usePersistedStat.ts";
import { sleep } from "../utils/tools.ts";

interface SwapCardProps {
    tokens: Token[];
    onSwap: (source: Token, destination: Token, amount: number) => void;
}

const SwapCard: React.FC<SwapCardProps> = ({ tokens, onSwap }) => {
    console.log({ tokens })
    const defaultSourceToken = tokens.find((t) => t.name === "USDT");
    const defaultDestToken = tokens.find((t) => t.name === "TON");
    const [sourceToken, setSourceToken] = usePersistedState<Token | undefined>("sourceToken", defaultSourceToken);
    const [destToken, setDestToken] = usePersistedState<Token | undefined>("destToken", defaultDestToken);
    const [sourceAmount, setSourceAmount] = useState<string>("");
    const [destAmount, setDestAmount] = useState<string>("");
    const [isFetchingTokenPrice, setIsFetchingTokenPrice] = useState<boolean>(false);
    const handleSwap = () => {
        if (!sourceToken || !destToken) {
            alert("Please select both tokens.");
            return;
        }
        const numericAmount = parseFloat(sourceAmount);
        if (numericAmount > parseFloat(sourceToken.available.amount.number)) {
            alert("Insufficient balance.");
            return;
        }
        onSwap(sourceToken, destToken, numericAmount);
        localStorage.removeItem("sourceToken");
        localStorage.removeItem("destToken");
        localStorage.removeItem("sourceAmount");
        localStorage.removeItem("destAmount");
    };

    const handleTokenChange = (side: "source" | "destination", token: Token) => {
        setDestAmount("0");
        setSourceAmount("0");
        if (side === "source") {
            setSourceToken(token);
        } else {
            setDestToken(token);
        }
    };

    const handleChangeCoins = () => {
        setSourceToken(destToken);
        setDestToken(sourceToken);
        setSourceAmount(destAmount);
        setDestAmount(sourceAmount);
    };

    const handleAmountChange = async (side: "source" | "destination", amount: string) => {
        setIsFetchingTokenPrice(true)
        await sleep(300);

        const sourceUSDTPrice = parseFloat(sourceToken?.marketData.find((m) => m.destination === "USDT")?.marketData.latestPrice || "1");
        const destUSDTPrice = parseFloat(destToken?.marketData.find((m) => m.destination === "USDT")?.marketData.latestPrice || "1");
        const price = destUSDTPrice / sourceUSDTPrice;

        const changeAmount = side === "source" ? (parseFloat(amount) * price).toFixed(2) : (parseFloat(amount) / price).toFixed(2);
        setIsFetchingTokenPrice(false)
        if (side === "source") {
            setSourceAmount(amount);
            setDestAmount(changeAmount)
        } else {
            setDestAmount(amount);
            setSourceAmount(changeAmount)
        }
    }

    return (
        <div className={styles.swapContainer}>
            <div className={styles.swapHeader}>
                <h3>Quick Swap</h3>
            </div>

            <div className={styles.swapContent}>
                <SwapInput
                    side={"source"}
                    tokens={tokens}
                    amount={sourceAmount}
                    onAmountChange={(amount) => handleAmountChange('source', amount)}
                    onTokenSelect={(token) => handleTokenChange("source", token)}
                    currency={sourceToken}
                />
                <div style={{ position: "relative", padding: "50px 0" }}>
                    <button style={{ position: "absolute", borderRadius: "100px", right: "20px", height: "42px", width: "42px", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", top: "50%", transform: "translateY(-50%)", outline: "10px solid #333333" }} onClick={handleChangeCoins}><ArrowDownUp size={"24"} color="#3e67d8" /></button>
                    <div style={{ width: "100%", height: "2px", backgroundColor: "#404040" }}></div>
                </div>
                <SwapInput
                    side={"destination"}
                    tokens={tokens}
                    amount={destAmount}
                    onAmountChange={(amount) => handleAmountChange('destination', amount)}
                    onTokenSelect={(token) => handleTokenChange("destination", token)}
                    currency={destToken}
                />
            </div>

            <div className={styles.feeRow}>
                <span>Fee: 0.32% | 8.45 TRX ≈ 1USDT</span>
            </div>

            {/* Swap button */}
            <button
                className={styles.swapButton}
                onClick={handleSwap}
                disabled={!sourceToken || !destToken || !sourceAmount}
            >{isFetchingTokenPrice ? <Loader /> : <>
                <ArrowLeftRight size={14} />
                Swap
            </>
                }</button>
        </div>
    );
};

export default SwapCard;
