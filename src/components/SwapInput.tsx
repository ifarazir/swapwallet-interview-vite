import React, { useState } from 'react';
import styles from "../styles/swap.module.css";
import { number_format } from "../utils/tools.ts";
import { Token } from "../types/token";
import CoinsListModal from "./CoinsListModal.tsx";
import { ChevronRight } from "lucide-react";

interface ISwapInput {
    side: 'source' | 'destination',
    onTokenSelect: (currency: Token) => void,
    onAmountChange: (amount: string) => void,
    currency?: Token,
    tokens: Token[],
    amount: string
}

const SwapInput = ({
    side,
    onTokenSelect,
    onAmountChange,
    tokens,
    currency,
    amount
}: ISwapInput) => {
    const [isTokensModalVisible, setIsTokensModalVisible] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const numericValue = parseFloat(value);

        if (numericValue < 0) {
            setError("Amount cannot be negative.");
            onAmountChange('');  // Prevent negative values
        } else if (numericValue > parseFloat(currency?.available.amount.number || "0")) {
            setError(`Insufficient balance. Max: ${currency?.available.amount.number}`);
            onAmountChange('');
        } else {
            setError("");
            const formattedValue = (value.indexOf('.') === -1 && value.startsWith('0') && value.length > 1)
                ? numericValue.toString()
                : value;
            onAmountChange(formattedValue);
        }
    };

    return (
        <>
            <div className={styles.tokenRow + " " + styles.sourceTokenRow}>
                <div className={styles.tokenField}>
                    <span className={styles.label}>You {side === 'source' ? 'Pay' : 'Receive'}</span>
                    <input
                        type="number"
                        value={amount}
                        onChange={handleAmountChange}
                        placeholder="0.0"
                        style={{width: "100%"}}
                    />
                    {error && <div className={styles.error}>{error}</div>}
                    <div className={styles.balance} onClick={() => onAmountChange(currency?.available.amount.number ?? '')}>
                        Balance: {currency ? number_format(currency.available.amount.number.toLocaleString()) : "0"}
                        <span>{currency ? currency.name : ""}</span>
                    </div>
                </div>
                <div className={styles.tokenSelector}>
                    <button onClick={() => setIsTokensModalVisible(true)} style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                        <img
                            src={`https://cryptofonts.com/img/SVG/${currency?.name.toLowerCase()}.svg`}
                            alt={currency?.name}
                        />
                        <span>{currency ? currency.name : "Select Coin"}</span>

                        <ChevronRight size={24} color="#d1d5db" strokeWidth={"0.75px"} />
                    </button>
                </div>
            </div>
            <div style={{ position: "relative", zIndex: 10 }}>
                <CoinsListModal onTokenSelect={onTokenSelect} tokens={tokens} isOpen={isTokensModalVisible} setIsOpen={setIsTokensModalVisible} />
            </div>
        </>
    );
};

export default SwapInput;