import Doodad from './Doodad';

type Room = {
    description: string,
    doodads: Doodad[],
    notes: Doodad[],
    corpses: Doodad[],
    exits: string[],
};

export default Room;
