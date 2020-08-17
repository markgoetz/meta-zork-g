import axios from 'axios';
import axiosRetry from 'axios-retry';
import { getApiKey } from './api-key';
import sleep from '../../lib/sleep';

const LIMIT_DELAY = 1000;
let lastRequestTime = Date.now();
let concurrentRequests = 0;

const getClient = () => {
    const apiKey = getApiKey();
    const client = axios.create({
        headers: {
            'X-API-KEY': apiKey,
        },
        transformResponse: [
            function(data: any) {
                console.log(data);
                return data;
            },
            function(data: any) {
                return JSON.parse(data);
            },
        ],
        baseURL: 'https://nerdzork.nerderylabs.com/api/',
    });

    axiosRetry(client, { retries: 10, retryDelay: () => LIMIT_DELAY, retryCondition: response => response.code === '429' });

    client.interceptors.request.use(async (config) => {
        concurrentRequests++;
        if (lastRequestTime + LIMIT_DELAY > Date.now()) {
            await sleep(LIMIT_DELAY * concurrentRequests);
        }
        lastRequestTime = Date.now();
        return config;
    });

    client.interceptors.response.use(config => {
        concurrentRequests--;
        return config;
    });

    return client;
};

export default getClient;
