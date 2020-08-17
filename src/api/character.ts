import getClient from './utils/client';
import { CHARACTER } from './utils/endpoints';
import Response from '../definitions/Response';
import Score from '../definitions/Score';
import Adventurer from '../definitions/Adventurer';
import Activity from '../definitions/Activity';
import InventoryItem from '../definitions/InventoryItem';

type AdventurerObject = {
    adventurer: Adventurer,
};

const me = async () => {
    const client = getClient();
    const response = await client.get(CHARACTER.ME) as Response<AdventurerObject>;
    return response.data.response.adventurer;
};

const inventory = async () => {
    const client = getClient();
    const response = await(client.get(CHARACTER.INVENTORY)) as Response<InventoryItem[]>;
    return response.data.response;
};

const origin = async () => {
    const client = getClient();
    const response = await client.get(CHARACTER.ORIGIN) as Response<string>;
    return response.data.response;
};

const rename = async (name: string) => {
    const client = getClient();
    const response = await client.post(CHARACTER.RENAME, { name }) as Response<string>;
    return response.data.response;
};

const leaderboard = async () => {
    const client = getClient();
    const response = await client.get(CHARACTER.LEADERBOARD) as Response<Score[]>;
    return response.data.response;
};

const loserboard = async () => {
    const client = getClient();
    const response = await client.get(CHARACTER.LOSERBOARD) as Response<Score[]>;
    return response.data.response;
};

const activity = async () => {
    const client = getClient();
    const response = await client.get(CHARACTER.ACTIVITY) as Response<Activity[]>;
    return response.data.response;
};

export default {
    me,
    inventory,
    origin,
    rename,
    leaderboard,
    loserboard,
    activity,
};
