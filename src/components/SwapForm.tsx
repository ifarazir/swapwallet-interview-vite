import React, { useState, useEffect } from "react";
import { Token } from "../types/token";

interface SwapFormProps {
    tokens: Token[];
    onSwap: (source: Token, destination: Token, amount: number) => void;
}

const SwapForm: React.FC<SwapFormProps> = ({ tokens, onSwap }) => {
    const [sourceTokenName, setSourceTokenName] = useState("");
    const [destTokenName, setDestTokenName] = useState("");
    const [amount, setAmount] = useState("");
    const [conversionInfo, setConversionInfo] = useState<{
        latestPrice: string;
        bestBuy: string;
        bestSell: string;
        dayChange: string;
    } | null>(null);

    // Update conversion information when both tokens are selected.
    useEffect(() => {
        if (sourceTokenName && destTokenName) {
            const sourceToken = tokens.find((t) => t.name === sourceTokenName);
            if (sourceToken) {
                const md = sourceToken.marketData.find(
                    (m) => m.destination === destTokenName
                );
                setConversionInfo(md ? md.marketData : null);
            } else {
                setConversionInfo(null);
            }
        } else {
            setConversionInfo(null);
        }
    }, [sourceTokenName, destTokenName, tokens]);

    const handleSwap = () => {
        const source = tokens.find((t) => t.name === sourceTokenName);
        const destination = tokens.find((t) => t.name === destTokenName);
        const numericAmount = parseFloat(amount);

        if (!source || !destination) {
            alert("Please select valid tokens.");
            return;
        }
        // Validate that amount does not exceed the available balance.
        if (numericAmount > parseFloat(source.available.amount.number)) {
            alert("Insufficient balance.");
            return;
        }
        onSwap(source, destination, numericAmount);
    };

    return (
        <div className="swap-form">
            <div>
                <label>From:</label>
                <select
                    value={sourceTokenName}
                    onChange={(e) => setSourceTokenName(e.target.value)}
                >
                    <option value="">Select token</option>
                    {tokens.map((token) => (
                        <option key={token.name} value={token.name}>
                            {token.name}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label>To:</label>
                <select
                    value={destTokenName}
                    onChange={(e) => setDestTokenName(e.target.value)}
                >
                    <option value="">Select token</option>
                    {tokens.map((token) => (
                        <option key={token.name} value={token.name}>
                            {token.name}
                        </option>
                    ))}
                </select>
            </div>

            {/* Display conversion information when both tokens are selected */}
            {conversionInfo && (
                <div className="conversion-info">
                    <p>
                        <strong>Conversion Rate:</strong> {conversionInfo.latestPrice}
                    </p>
                    <p>
                        <strong>Best Buy:</strong> {conversionInfo.bestBuy}
                    </p>
                    <p>
                        <strong>Best Sell:</strong> {conversionInfo.bestSell}
                    </p>
                    <p>
                        <strong>Day Change:</strong> {conversionInfo.dayChange}%
                    </p>
                </div>
            )}

            <div>
                <label>Amount:</label>
                <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Enter amount"
                />
            </div>
            <button onClick={handleSwap}>Swap</button>
        </div>
    );
};

export default SwapForm;
