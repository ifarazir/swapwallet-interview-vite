import React from "react";
import SwapCard from "./components/SwapCard";
import { useTokens } from "./hooks/useTokens";
import { Token } from "./types/token";

const App: React.FC = () => {
  const { tokens, loading, error } = useTokens();

  if (loading) return <p>Loading tokens...</p>;
  if (error) return <p>{error}</p>;

  const handleSwap = (source: Token, destination: Token, amount: number) => {
    alert(`Swapped ${amount} ${source.name} to ${destination.name}`);
    // ... update balances, localStorage, etc.
  };

  return (
    <div>
      <SwapCard tokens={tokens} onSwap={handleSwap} />
    </div>
  );
};

export default App;
