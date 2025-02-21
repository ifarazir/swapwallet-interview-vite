import styles from "../styles/swap.module.css";
import { XIcon } from "lucide-react";
import { Token } from "../types/token";
import { number_format } from "../utils/tools";
interface ICoinsListModal {
    isOpen: boolean,
    setIsOpen: (state: boolean) => void,
    tokens: Token[],
    onTokenSelect: (token: Token) => void,
}
const CoinsListModal = ({ isOpen, setIsOpen, tokens, onTokenSelect }: ICoinsListModal) => {
    if (!isOpen) {
        return null
    }

    const handleTokenSelect = (token: Token) => {
        onTokenSelect(token)
        setIsOpen(false)
    }
    return (
        <div className={styles.modalOverlay}>
            <div style={{ height: "100dvh", width: "100dvw", backgroundColor: "rgba(0, 0, 0, 0.5)", position: "absolute", top: 0, left: 0, backdropFilter: "blur(10px)", zIndex: "9" }} onClick={() => setIsOpen(false)}></div>
            <div className={styles.modalContent}>
                <div style={{display: "flex", justifyContent: "start", alignItems: "center"}}>
                    <button onClick={() => setIsOpen(false)}>
                        <XIcon size={24} color="#d1d5db" strokeWidth={"0.75px"} />
                    </button>
                    <h4 style={{marginBottom: 0}}>Please select a coin</h4>
                </div>
                <div className={styles.tokensList}>
                    {tokens.map((token) => {
                        const usdtBasePrice = token?.marketData.find((data) => data.destination === "USDT")?.marketData.latestPrice;

                        console.log(token.name, token.available.amount.number, usdtBasePrice);

                        return (
                            <div key={token.name} onClick={() => handleTokenSelect(token)} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: "1px solid rgba(64, 64, 64, 0.4)", cursor: "pointer" }}>
                                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                    <img
                                        src={`https://cryptofonts.com/img/SVG/${token?.name.toLowerCase()}.svg`}
                                        alt={token.name}
                                        style={{ width: "36px", height: "36px" }}
                                    />
                                    <div className="token-details">
                                        <div className="token-name">{token.name}</div>
                                    </div>
                                </div>
                                <div style={{ textAlign: "right" }}>
                                    <div style={{ fontSize: "14px" }}>
                                        {token.available.amount.number} {token.name}
                                    </div>
                                    <div style={{ color: "rgba(255,255,255,0.5)", fontSize: "12px" }}>
                                        ${number_format(parseFloat(token.available.amount.number) / parseFloat(usdtBasePrice || "1"))}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
                <button className={styles.submit} onClick={() => setIsOpen(false)}>Close</button>
            </div>
        </div>
    );
};

export default CoinsListModal;