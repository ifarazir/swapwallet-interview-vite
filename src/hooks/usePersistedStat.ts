import { useState, useEffect } from 'react';

function usePersistedState<T>(key: string, initialValue: T) {

    const [state, setState] = useState<T>(initialValue);
    useEffect(() => {
        const saved = localStorage.getItem(key);
        if (saved) {
            try {
                setState(JSON.parse(saved));
            } catch (error) {
                console.error('Error parsing JSON from localStorage', error);
                setState(initialValue);
            }
        }
    }, [key, initialValue]);

    useEffect(() => {
        if (state !== initialValue) {
            localStorage.setItem(key, JSON.stringify(state));
        }
    }, [state, initialValue]);

    return [state, setState] as const;
}

export default usePersistedState;
