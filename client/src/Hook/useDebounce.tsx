import { useState, useEffect } from 'react';

function useDebounce(value: any, delay: number) {
    const [debouncedValue, setDebouncedValue] = useState<any>(value);
    useEffect(() => {
        const handle = setTimeout(() => setDebouncedValue(value), delay);
        return () => clearTimeout(handle);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);

    return debouncedValue;
}

export default useDebounce;
