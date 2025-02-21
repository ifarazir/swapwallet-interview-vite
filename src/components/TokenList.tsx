// /src/components/TokenList.tsx
import React from "react";
import { Token } from "../types/token";
import TokenItem from "./TokenItem";

interface TokenListProps {
    tokens: Token[];
    onSelect: (token: Token) => void;
}

const TokenList: React.FC<TokenListProps> = ({ tokens, onSelect }) => {
    return (
        <div className="token-list">
            {tokens.map((token) => (
                <TokenItem key={token.name} token={token} onSelect={onSelect} />
            ))}
        </div>
    );
};

export default TokenList;
