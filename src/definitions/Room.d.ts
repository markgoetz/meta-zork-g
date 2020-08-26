import Doodad from './Doodad';

type Room = {
    description: string,
    doodads: Doodad[],
    notes: Doodad[],
    corpses: Doodad[],
    exits: string[],
    slug: string,
    puzzleSlug: string,
};

export default Room;
