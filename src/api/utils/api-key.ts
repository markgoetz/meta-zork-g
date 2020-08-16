const KEY_NAME = 'API_KEY';

export const getApiKey = () => {
    return localStorage.getItem(KEY_NAME);
};

export const setApiKey = (key: string) => {
    localStorage.setItem(KEY_NAME, key);
};

