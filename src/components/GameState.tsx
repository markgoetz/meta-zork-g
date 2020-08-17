import React, { useEffect, useState, useCallback } from 'react';
import Room from '../definitions/Room';
import InventoryItem from '../definitions/InventoryItem';
import useLoadFromApi from '../hooks/useLoadFromApi';
import roomApi from '../api/room';
import characterApi from '../api/character';
import doodadApi from '../api/doodad';

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
            clearResponse: () => void,
        },
        response: string | undefined,
    ) => JSX.Element,
};

type DescriptionMap = {[description: string]: string};

const GameState: React.FunctionComponent<Props> = (props) => {
    const [response, setResponse] = useState<string>();
    const [exitDescriptions, setExitDescriptions] = useState<DescriptionMap>({});

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
        const responseFromDeathwarp = await characterApi.origin();
        setResponse(responseFromDeathwarp);
        getInventory();
        getRoom();
    };

    const writeNote = async(contents: string) => {
        const responseFromNoteWrite = await roomApi.note(contents);
        setResponse(responseFromNoteWrite);
    };

    const updateExits = useCallback(
        async () => {
            if (room != null) {
                setExitDescriptions({});
                const tempDescriptions: DescriptionMap = {};

                for (let i = 0; i < room.exits.length; i++) {
                    const exit = room.exits[i];
                    const description = await roomApi.lookDirection(exit);
                    tempDescriptions[exit] = description;
                    setExitDescriptions({...tempDescriptions});
                }
            }
        },
        [room],
    );

    const actions = {
        move,
        inspect,
        get,
        useOnSelf,
        useOnOther,
        deathwarp,
        writeNote,
        clearResponse: () => { setResponse(undefined); },
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

    return props.children(room, inventory, exitDescriptions, actions, response);
};

export default GameState;
