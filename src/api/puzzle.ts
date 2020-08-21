import getClient from './utils/client';
import Response from '../definitions/Response';
import { PUZZLE } from './utils/endpoints';
import Puzzle from '../definitions/Puzzle';

const list = async() => {
    const client = getClient();
    const response = await client.get(PUZZLE.LIST) as Response<Puzzle[]>;
    return response.data.response;
};

const getCurrentPuzzle = async() => {
    const client = getClient();
    const response = await client.get(PUZZLE.PUZZLE) as Response<Puzzle>;
    return response.data.response;
};

const upVote = async(slug: string) => {
    const client = getClient();
    const response = await client.post(PUZZLE.VOTE, { a: 'Up', slug }) as Response<string>;
    return response.data.response;
};

const downVote = async(slug: string) => {
    const client = getClient();
    const response = await client.post(PUZZLE.VOTE, { a: 'Down', slug }) as Response<string>;
    return response.data.response;
};

export default {
    list,
    getCurrentPuzzle,
    upVote,
    downVote,
};
