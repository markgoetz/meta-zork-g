import axios from 'axios';
import { getApiKey } from './api-key';

const getClient = () => {
    const apiKey = getApiKey();
    const client = axios.create({
        headers: {
            'X-API-KEY': apiKey,
        },
        transformResponse: [
            function(data: any) {
                console.log(data);
            }
        ],
        baseURL: 'https://nerdzork.nerderylabs.com/api/',
    });

    return client;
};

export default getClient;
