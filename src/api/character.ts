import getClient from './utils/client';
import { CHARACTER } from './utils/endpoints';
import Response from '../definitions/Response';
import Adventurer from '../definitions/Adventurer';
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

const recall = async () => {
    const client = getClient();
    const response = await client.get(CHARACTER.RECALL) as Response<string>;
    return response.data.response;
};

const rename = async (name: string) => {
    const client = getClient();
    const response = await client.post(CHARACTER.RENAME, { name }) as Response<string>;
    return response.data.response;
};


export default {
    me,
    inventory,
    recall,
    rename,
};
