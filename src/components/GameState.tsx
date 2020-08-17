import React, { useEffect, useState } from 'react';
import Room from '../definitions/Room';
import InventoryItem from '../definitions/InventoryItem';
import useLoadFromApi from '../hooks/useLoadFromApi';
import roomApi from '../api/room';
import characterApi from '../api/character';

type Props = {
    children: (
        room: Room | null,
        inventory: InventoryItem[] | null,
        exitDescriptions: { [key: string]: string },
        actions: { 
            onMove: (direction: string) => void,
            onInspect: (slug: string) => void,
            onGet: (slug: string) => void,
            onUseSelf: (slug: string) => void,
            onUseOther: (slug: string, otherSlug: string) => void,
            onDeathWarp: () => void,
            onClearResponse: () => void,
        },
        response: string | undefined,
    ) => JSX.Element,
}

const GameState: React.FunctionComponent<Props> = (props) => {
    const [response, setResponse] = useState<string>();

    const actions = {
        onMove: console.log,
        onInspect: console.log,
        onGet: console.log,
        onUseSelf: console.log,
        onUseOther: console.log,
        onDeathWarp: console.log,
        onClearResponse: () => { setResponse(undefined); },
    };
    
    const [getRoom, room] = useLoadFromApi(roomApi.lookRoom);
    const [getInventory, inventory] = useLoadFromApi(characterApi.inventory);

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
    )

    const exitDescriptions = {
        south: 'You see a path to the south',
        left: 'Which way is left again?',
    };

    return props.children(room, inventory, exitDescriptions, actions, response);
};

export default GameState;
