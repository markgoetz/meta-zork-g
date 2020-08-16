import getClient from './utils/client';
import Response from '../definitions/Response';
import { ROOM } from './utils/endpoints';
import Room from '../definitions/Room';

const lookRoom = async() => {
    const client = getClient();
    const response = await client.post(ROOM.LOOK, {}) as Response<Room>;
    return response.response;
};

const lookDirection = async(direction: string) => {
    const client = getClient();
    const response = await client.post(ROOM.LOOK, { direction }) as Response<string>;
    return response.response;
};

const move = async (direction: string) => {
    const client = getClient();
    const response = await client.post(ROOM.MOVE, { direction }) as Response<string>;
    return response.response;
};

const note = async(note: string) => {
    const client = getClient();
    await client.post(ROOM.NOTE, { note });
};

export default {
    lookRoom,
    lookDirection,
    move,
    note,
};