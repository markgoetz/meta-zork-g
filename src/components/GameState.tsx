import React, { useEffect, useState, useCallback } from 'react';
import Room from '../definitions/Room';
import InventoryItem from '../definitions/InventoryItem';
import useLoadFromApi from '../hooks/useLoadFromApi';
import roomApi from '../api/room';
import characterApi from '../api/character';
import doodadApi from '../api/doodad';
import sleep from '../lib/sleep';

type Props = {
    children: (
        room: Room | null,
        inventory: InventoryItem[] | null,
        exitDescriptions: { [key: string]: string },
        actions: { 
            move: (direction: string) => void,
            inspect: (slug: string) => void,
            get: (slug: string) => void,
            useOnSelf: (slug: string) => void,
            useOnOther: (slug: string, otherSlug: string) => void,
            deathwarp: () => void,
            writeNote: (contents: string) => void,
            mashInventory: (slug1: string, slug2: string) => void,
            clearResponse: () => void,
            setDescriptionFlag: (flag: boolean) => void,
        },
        response: string | undefined,
        descriptionFlag: boolean,
    ) => JSX.Element,
};

type DescriptionMap = {[description: string]: string};

const GameState: React.FunctionComponent<Props> = (props) => {
    const [response, setResponse] = useState<string>();
    const [exitDescriptions, setExitDescriptions] = useState<DescriptionMap>({});
    const [descriptionFlag, setDescriptionFlag] = useState(true);

    const [getRoom, room] = useLoadFromApi(roomApi.lookRoom);
    const [getInventory, inventory] = useLoadFromApi(characterApi.inventory);
    
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

    const mashInventory = async(slug1: string, slug2: string) => {
        if (inventory == null) {
            return;
        }

        const index1 = inventory.findIndex(item => item.slug === slug1);
        const index2 = inventory.findIndex(item => item.slug === slug2);

        if (index1 == null || index2 == null) {
            throw new Error('Cannot find index.');
        }

        const [startIndex, endIndex] = (index1 < index2) ? [index1, index2] : [index2, index1];

        for (let i = startIndex; i <= endIndex; i++) {
            for (let j = startIndex; j <= endIndex; j++) {
                if (i === j) { continue; }

                const slugA = inventory[i].slug;
                const slugB = inventory[j].slug;
                await doodadApi.useOnOther(slugA, slugB);

                await sleep(700);
            }
        }

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

    return props.children(room, inventory, exitDescriptions, actions, response, descriptionFlag);
};

export default GameState;
