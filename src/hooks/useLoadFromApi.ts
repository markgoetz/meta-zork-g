import { useState, useCallback } from 'react';

const useLoadFromApi = <T>(apiMethod: () => Promise<T>): [() => void, T | null] => {
    const [value, setValue] = useState<T | null>(null);

    const callApiMethod = useCallback(
        async() => {
            const response = await apiMethod();
            setValue(response);
        },
        [apiMethod],
    );

    return [callApiMethod, value];
};

export default useLoadFromApi;
