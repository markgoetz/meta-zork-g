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
            onUseOther: (slug: string) => void,
            onDeathWarp: () => void,
        }
    ) => JSX.Element,
}

const GameState: React.FunctionComponent<Props> = (props) => {
    const [roomId, setRoomId] = useState(0);

    const actions = {
        onMove: console.log,
        onInspect: console.log,
        onGet: console.log,
        onUseSelf: console.log,
        onUseOther: console.log,
        onDeathWarp: console.log,
    }
    // const [getRoom, room] = useLoadFromApi(roomApi.lookRoom);
    // const [getInventory, inventory] = useLoadFromApi(characterApi.inventory);

    // useEffect(
    //     () => {
    //         getRoom();
    //     },
    //     [roomId, getRoom]
    // );

    // useEffect(
    //     () => {
    //         getInventory();
    //     },
    //     [getInventory],
    // )

    const room: Room = {
        description: 'Hello I am description',
        notes: [
            { slug: 'note-1', lookMessage: 'MASTER USING IT AND YOU CAN HAVE THIS' },
            { slug: 'note-2', lookMessage: 'IT\'S A SECRET TO EVERYONE' },
            { slug: 'note-3', lookMessage: 'GRUMBLE, GRUMBLE' },
            { slug: 'note-4', lookMessage: 'GO TO THE NEXT ROOM' },
        ],
        doodads: [
            { slug: '1-1', lookMessage: 'GRAPPLE BEAM' },
            { slug: '2-1', lookMessage: 'ICEROD' },
            { slug: '3-1', lookMessage: 'MORPH BALL' },
            { slug: '4-1', lookMessage: 'HOOKSHOT' },
        ],
        corpses: [
            { slug: '1', lookMessage: 'ZOMBIE' },
            { slug: '2', lookMessage: 'ZOMBIE' },
            { slug: '3', lookMessage: 'ZOMBIE' },
            { slug: '4', lookMessage: 'ZOMBIE' },
        ],
        exits: [
            'south',
            'left',
        ],
    };

    const inventory: InventoryItem[] = [
        { slug: '123', inventoryMessage: 'hello '},
        { slug: '1234', inventoryMessage: 'hello '},
        { slug: '1235', inventoryMessage: 'hello '},
        { slug: '1236', inventoryMessage: 'hello '},
    ];

    const exitDescriptions = {
        south: 'You see a path to the south',
        left: 'Which way is left again?',
    };

    return props.children(room, inventory, exitDescriptions, actions);
};

export default GameState;
