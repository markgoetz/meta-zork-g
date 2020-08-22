import React, { useEffect, useState, useCallback } from 'react';
import Room from '../../definitions/Room';
import InventoryItem from '../../definitions/InventoryItem';
import useLoadFromApi from '../../hooks/useLoadFromApi';
import roomApi from '../../api/room';
import characterApi from '../../api/character';
import doodadApi from '../../api/doodad';
import puzzleApi from '../../api/puzzle';
import sleep from '../../lib/sleep';
import GameActions from '../../definitions/GameActions';
import uniqueSlugs from '../../lib/uniqueSlugs';
import Puzzle from '../../definitions/Puzzle';

type Props = {
    children: (
        room: Room | null,
        puzzle: Puzzle | null,
        inventory: InventoryItem[] | null,
        exitDescriptions: { [key: string]: string },
        actions: GameActions,
        response: string | undefined,
        descriptionFlag: boolean,
        mashSettings: { mashCount: number | undefined, totalMashItems: number | undefined },
    ) => JSX.Element,
};

type DescriptionMap = {[description: string]: string};

const GameState: React.FunctionComponent<Props> = (props) => {
    const [response, setResponse] = useState<string>();
    const [exitDescriptions, setExitDescriptions] = useState<DescriptionMap>({});
    const [descriptionFlag, setDescriptionFlag] = useState(true);
    const [mashCount, setMashCount] = useState<number>();
    const [totalMashItems, setTotalMashItems] = useState<number>();

    const [getRoom, room] = useLoadFromApi(roomApi.lookRoom);
    const [getInventory, inventory] = useLoadFromApi(characterApi.inventory);
    const [getPuzzle, puzzle] = useLoadFromApi(puzzleApi.getCurrentPuzzle);
    const fixedInventory = inventory != null ? uniqueSlugs(inventory) : null;
    
    const inspect = async(slug: string) => {
        const description = await doodadApi.inspect(slug);
        setResponse(description);
    };

    const get = async(slug: string) => {
        const responseFromGet = await doodadApi.get(slug);
        setResponse(responseFromGet);
        getRoom();
        getInventory();
    };

    const move = async(direction: string) => {
        const responseFromMove = await roomApi.move(direction);
        setResponse(responseFromMove);
        getRoom();
    };

    const useOnSelf = async(slug: string) => {
        const responseFromUse = await doodadApi.useOnSelf(slug);
        setResponse(responseFromUse);
        getInventory();
        getRoom();
    };

    const useOnOther = async(slug: string, otherSlug: string) => {
        const responseFromUse = await doodadApi.useOnOther(slug, otherSlug);
        setResponse(responseFromUse);
        getInventory();
        getRoom();
    };

    const deathwarp = async() => {
        const responseFromDeathwarp = await characterApi.recall();
        setResponse(responseFromDeathwarp);
        getInventory();
        getRoom();
    };

    const writeNote = async(contents: string) => {
        const responseFromNoteWrite = await roomApi.note(contents);
        setResponse(responseFromNoteWrite);
    };

    const upVote = async() => {
        if (puzzle != null) {
            const responseFromUpvote = await puzzleApi.upVote(puzzle.slug);
            setResponse(responseFromUpvote);
        }
    };

    const downVote = async() => {
        if (puzzle != null) {
            const responseFromDownvote = await puzzleApi.downVote(puzzle.slug);
            setResponse(responseFromDownvote);
        }
    };

    const mashInventory = async(slug1: string, slug2: string, mashUsedItems: boolean) => {
        if (fixedInventory == null) {
            return;
        }

        const sourceInventory = mashUsedItems ? fixedInventory : fixedInventory.filter(item => item.neverUsed);

        const index1 = sourceInventory.findIndex(item => item.slug === slug1);
        const index2 = sourceInventory.findIndex(item => item.slug === slug2);

        if (index1 === -1 || index2 === -1) {
            throw new Error('Cannot find index.');
        }

        const [startIndex, endIndex] = (index1 < index2) ? [index1, index2] : [index2, index1];

        const mashRange = endIndex - startIndex + 1;
        setTotalMashItems(mashRange * mashRange);

        let count = 0;

        for (let i = startIndex; i <= endIndex; i++) {
            for (let j = startIndex; j <= endIndex; j++) {

                count++;
                setMashCount(count);

                const slugA = sourceInventory[i].slug;
                const slugB = sourceInventory[j].slug;

                if (slugA !== slugB) {
                    await doodadApi.useOnOther(slugA, slugB);
                } else {
                    await doodadApi.useOnSelf(slugA);
                }

                await sleep(700);
            }
        }

        setTotalMashItems(undefined);
        setMashCount(undefined);

        setResponse('Mashing completed.');
        getInventory();
    };

    const updateExits = useCallback(
        async () => {
            if (room != null) {
                setExitDescriptions({});
                if (descriptionFlag) {
                    const tempDescriptions: DescriptionMap = {};

                    for (let i = 0; i < room.exits.length; i++) {
                        if (!descriptionFlag) {
                            setExitDescriptions({});
                            break;
                        }

                        const exit = room.exits[i];
                        const description = await roomApi.lookDirection(exit);
                        tempDescriptions[exit] = description;
                        setExitDescriptions({...tempDescriptions});
                    }
                }
            }
        },
        [room, descriptionFlag],
    );

    const actions = {
        move,
        inspect,
        get,
        useOnSelf,
        useOnOther,
        deathwarp,
        writeNote,
        getPuzzle,
        upVote,
        downVote,
        mashInventory,
        clearResponse: () => { setResponse(undefined); },
        setDescriptionFlag,
    };

    useEffect(
        () => {
            getRoom();
        },
        [getRoom]
    );

    useEffect(
        () => {
            getInventory();
        },
        [getInventory],
    );

    useEffect(
        () => { updateExits(); },
        [updateExits]
    );

    return props.children(room, puzzle, fixedInventory, exitDescriptions, actions, response, descriptionFlag, { totalMashItems, mashCount });
};

export default GameState;
