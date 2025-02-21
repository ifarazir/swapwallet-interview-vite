import React, { useEffect, useState } from "react";
import styles from "../styles/swap.module.css";
import { Token } from "../types/token";
import { ArrowLeftRight, XIcon } from "lucide-react";
import { number_format } from "../utils/tools";

interface SwapCardProps {
    tokens: Token[];
    onSwap: (source: Token, destination: Token, amount: number) => void;
}

const SwapCard: React.FC<SwapCardProps> = ({ tokens, onSwap }) => {
    const [sourceToken, setSourceToken] = useState<Token>();
    const [destToken, setDestToken] = useState<Token>();
    const [amount, setAmount] = useState("");
    const [showCoinSelector, setShowCoinSelector] = useState<"source" | "dest" | null>(null);

    useEffect(() => {
        if (!sourceToken) {
            setSourceToken(tokens.find((t) => t.name === "USDT"));
        }
        if (!destToken) {
            setDestToken(tokens.find((t) => t.name === "TON"));
        }
    }, []);

    // Example function to open coin selector
    const handleOpenCoinSelector = (type: "source" | "dest") => {
        setShowCoinSelector(type);
    };

    // Example function called when a coin is selected in the modal
    const handleCoinSelected = (token: Token) => {
        if (showCoinSelector === "source") {
            setSourceToken(token);
        } else if (showCoinSelector === "dest") {
            setDestToken(token);
        }
        setShowCoinSelector(null);
    };

    const handleSwap = () => {
        if (!sourceToken || !destToken) {
            alert("Please select both tokens.");
            return;
        }
        const numericAmount = parseFloat(amount);
        if (numericAmount > parseFloat(sourceToken.available.amount.number)) {
            alert("Insufficient balance.");
            return;
        }
        onSwap(sourceToken, destToken, numericAmount);
    };

    return (
        <div className={styles.swapContainer}>
            <div className={styles.swapHeader}>
                <h3>Quick Swap</h3>
            </div>

            <div className={styles.swapContent}>
                <div className={styles.tokenRow + " " + styles.sourceTokenRow}>
                    <div className={styles.tokenField}>
                        <span className={styles.label}>You Pay</span>

                        <input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="0.0"
                        />

                        <div className={styles.balance}>
                            Balance: {sourceToken ? number_format(sourceToken.available.amount.number.toLocaleString()) : "0"} <span>{sourceToken ? sourceToken.name : ""}</span>
                        </div>
                    </div>
                    <div className={styles.tokenSelector}>
                        <button onClick={() => handleOpenCoinSelector("source")}>
                            <img
                                src={`https://cryptofonts.com/img/SVG/${sourceToken?.name.toLowerCase()}.svg`}
                                alt={sourceToken?.name}
                            />

                            <span>
                                {sourceToken ? sourceToken.name : "Select Coin"}
                            </span>
                        </button>
                    </div>

                </div>

                <hr />

                <div className={styles.tokenRow + " " + styles.destTokenRow}>
                    <div className={styles.tokenField}>
                        <span className={styles.label}>You Receive</span>

                        <input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="0.0"
                        />

                        <div className={styles.balance}>
                            Balance: {destToken ? number_format(destToken.available.amount.number.toLocaleString()) : "0"} <span>{destToken ? destToken.name : ""}</span>
                        </div>
                    </div>
                    <div className={styles.tokenSelector}>
                        <button onClick={() => handleOpenCoinSelector("source")}>
                            <img
                                src={`https://cryptofonts.com/img/SVG/${destToken?.name.toLowerCase()}.svg`}
                                alt={destToken?.name}
                            />

                            <span>
                                {destToken ? destToken.name : "Select Coin"}
                            </span>
                        </button>
                    </div>

                </div>
            </div>

            {/* Display Source Token Info */}
            {/* <div className={styles.tokenRow}>
                <span className={styles.label}>From</span>
                <button onClick={() => handleOpenCoinSelector("source")}>
                    {sourceToken ? sourceToken.name : "Select Coin"}
                </button>
                <div className={styles.balance}>
                    Balance: {sourceToken ? sourceToken.available.amount.number : "0"}
                </div>
            </div>

            <div className={styles.amountRow}>
                <label>You Pay</label>
                <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0.0"
                />
            </div> */}

            {/* Display Destination Token Info */}
            {/* <div className={styles.tokenRow}>
                <span className={styles.label}>To</span>
                <button onClick={() => handleOpenCoinSelector("dest")}>
                    {destToken ? destToken.name : "Select Coin"}
                </button>
                <div className={styles.balance}>
                    Balance: {destToken ? destToken.available.amount.number : "0"}
                </div>
            </div>

            <div className={styles.amountRow}>
                <label>You Receive</label>
                <input
                    type="text"
                    value="0.0"
                    placeholder="Calculated automatically"
                    disabled
                />
            </div> */}

            {/* Example fee info row */}
            <div className={styles.feeRow}>
                <span>Fee: 0.32% | 8.45 TRX ≈ 1USDT</span>
            </div>

            {/* Swap button */}
            <button
                className={styles.swapButton}
                onClick={handleSwap}
                disabled={!sourceToken || !destToken || !amount}
            >
                <ArrowLeftRight size={14} />
                Swap
            </button>

            {showCoinSelector && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modalContent}>
                        <div style={{ display: "flex", justifyContent: "start", alignItems: "center", borderBottom: "0.75px solid #4b5563", padding: "0.75rem 0.5rem 0.5rem 0.75rem" }}>
                            <button onClick={() => setShowCoinSelector(null)} style={{ backgroundColor: "transparent", border: "none", padding: "0 10px" }}>
                                <XIcon size={24} color="#d1d5db" strokeWidth={"0.75px"} />
                            </button>
                            <h4 style={{ marginBottom: "3px", fontWeight: 600, fontSize: "1rem" }}>Please select a coin</h4>
                        </div>
                        {tokens.map((token) => (
                            <div
                                key={token.name}
                                className={styles.coinItem}
                                onClick={() => handleCoinSelected(token)}
                            >
                                {token.name}
                                <span className={styles.coinBalance}>{token.available.amount.number}</span>
                            </div>
                        ))}
                        <button onClick={() => setShowCoinSelector(null)}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SwapCard;
