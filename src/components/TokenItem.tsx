// /src/components/TokenItem.tsx
import React from "react";
import { Token } from "../types/token";

interface TokenItemProps {
    token: Token;
    onSelect: (token: Token) => void;
}

const TokenItem: React.FC<TokenItemProps> = ({ token, onSelect }) => {
    const balance = token.available.amount.number;
    return (
        <div className="token-item" onClick={() => onSelect(token)}>
            <h3>{token.name}</h3>
            <p>Balance: {balance} {token.available.amount.unit}</p>
            {/* Optionally show more market details */}
        </div>
    );
};

export default TokenItem;
