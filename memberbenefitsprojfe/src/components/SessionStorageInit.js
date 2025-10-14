import { useState, useEffect } from 'react';

function useSessionStorage(key, initialValue) {
    const [value, setValue] = useState(() => {
        // Check if window is defined to handle server-side rendering
        if (typeof window !== 'undefined') {
            try {
                const item = window.sessionStorage.getItem(key);
                return item ? JSON.parse(item) : initialValue;
            } catch (error) {
                console.error(error);
                return initialValue;
            }
        }
        return initialValue;
    });

    useEffect(() => {
        if (typeof window !== 'undefined') {
            window.sessionStorage.setItem(key, JSON.stringify(value));
        }
    }, [key, value]);

    return [value, setValue];
}

export default useSessionStorage;