const KEY_NAME = 'API_KEY';

const getApiKey = () => {
    return localStorage.getItem(KEY_NAME);
};

const setApiKey = (key: string) => {
    localStorage.setItem(KEY_NAME, key);
};

export default {
    getApiKey,
    setApiKey,
};
