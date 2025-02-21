// /src/hooks/useTokens.ts
import { useState, useEffect } from "react";
import { Token } from "../types/token";
import { fetchTokens } from "../services/tokenService";

export const useTokens = () => {
    const [tokens, setTokens] = useState<Token[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const loadTokens = async () => {
        setLoading(true);
        try {
            const data = await fetchTokens();
            setTokens(data.result.tokens);
        } catch (err) {
            setError("Failed to load tokens");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadTokens();
    }, []);

    return { tokens, loading, error, refresh: loadTokens, setTokens };
};
