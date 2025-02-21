import React from "react";
import SwapCard from "./components/SwapCard";
import { useTokens } from "./hooks/useTokens";
import { Token } from "./types/token";

const App: React.FC = () => {
  const { tokens, loading, error, setTokens } = useTokens();

  if (loading) return <p>Loading tokens...</p>;
  if (error) return <p>{error}</p>;

  const handleSwap = (source: Token, destination: Token, amount: number) => {
    if (source.name === destination.name) {
      console.warn("Source and destination tokens are the same, no swap performed.");
      alert("Source and destination tokens are the same, no swap performed.");
      return;
    }
    // alert(`Swapped ${amount} ${source.name} to ${destination.name}`);

    // Update the token balance
    const newSourceToken = { ...source };
    const newDestToken = { ...destination };

    const sourceBaseUSDTPrice = parseFloat(newSourceToken.marketData.find((m) => m.destination === "USDT")?.marketData.latestPrice || "1");
    const destBaseUSDTPrice = parseFloat(newDestToken.marketData.find((m) => m.destination === "USDT")?.marketData.latestPrice || "1");

    // Calculating the ratio of source to destination currencies based on their USDT price
    const price = destBaseUSDTPrice / sourceBaseUSDTPrice;

    console.table({ sourceBaseUSDTPrice, destBaseUSDTPrice, price });
    
    // Update the source and destination token balances
    newSourceToken.available.amount.number = (parseFloat(newSourceToken.available.amount.number) - amount).toFixed(2);
    newDestToken.available.amount.number = (parseFloat(newDestToken.available.amount.number) + amount * price).toFixed(2);

    const newTokens = tokens.map((token) => {
      if (token.name === source.name) {
        return newSourceToken;
      }
      if (token.name === destination.name) {
        return newDestToken;
      }
      return token;
    });

    setTokens(newTokens);

    // Persist the changes
    localStorage.setItem("tokens", JSON.stringify(newTokens));
  };

  return (

      <SwapCard tokens={tokens} onSwap={handleSwap} />

  );
};

export default App;
