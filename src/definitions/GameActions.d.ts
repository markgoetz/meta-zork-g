type GameActions = { 
    move: (direction: string) => void,
    inspect: (slug: string) => void,
    get: (slug: string) => void,
    useOnSelf: (slug: string) => void,
    useOnOther: (slug: string, otherSlug: string) => void,
    deathwarp: () => void,
    writeNote: (contents: string) => void,
    getPuzzle: () => void,
    upVote: () => void,
    downVote: () => void,
    mashInventory: (slug1: string, slug2: string, mashUsedItems: boolean) => void,
    clearResponse: () => void,
    setDescriptionFlag: (flag: boolean) => void,
};

export default GameActions;
