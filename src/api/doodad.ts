import getClient from './utils/client';
import Response from '../definitions/Response';
import { DOODAD } from './utils/endpoints';

const inspect = async(slug: string) => {
    const client = getClient();
    const response = await client.post(DOODAD.INSPECT, { slug }) as Response<string>;
    return response.data.response;
};

const useOnSelf = async(slug: string) => {
    const client = getClient();
    const response = await client.post(DOODAD.USE, { slug }) as Response<string>;
    return response.data.response;
};

const useOnOther = async(slugToUse: string, otherDoodadSlug: string) => {
    const client = getClient();
    const response = await client.post(DOODAD.USE, { a: slugToUse, b: otherDoodadSlug }) as Response<string>;
    return response.data.response;
};

const get = async(slug: string) => {
    const client = getClient();
    const response = await client.post(DOODAD.GET, { slug }) as Response<string>;
    return response.data.response;
};

export default {
    inspect,
    useOnSelf,
    useOnOther,
    get,
};
