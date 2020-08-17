import getClient from './utils/client';
import Response from '../definitions/Response';
import { ROOM } from './utils/endpoints';
import Room from '../definitions/Room';

const lookRoom = async() => {
    const client = getClient();
    const response = await client.post(ROOM.LOOK, {}) as Response<Room>;
    return response.data.response;
};

const lookDirection = async(direction: string) => {
    const client = getClient();
    const response = await client.post(ROOM.LOOK, { direction }) as Response<string>;
    return response.data.response;
};

const move = async (direction: string) => {
    const client = getClient();
    const response = await client.post(ROOM.MOVE, { direction }) as Response<string>;
    return response.data.response;
};

const note = async(note: string) => {
    const client = getClient();
    const response = await client.post(ROOM.NOTE, { note }) as Response<string>;
    return response.data.response;
};

export default {
    lookRoom,
    lookDirection,
    move,
    note,
};
