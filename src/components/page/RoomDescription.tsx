/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import Box from '../common/Box';
import VList from '../common/VList';import Button from '../common/Button';
import WriteNoteModal from './WriteNoteModal';
import DoodadList from './DoodadList';
import ExitList from './ExitList';
import { useState } from 'react';
import { SIZES } from '../../styling/variables';
import Room from '../../definitions/Room';
import GameActions from '../../definitions/GameActions';
import HList from '../common/HList';
import Puzzle from '../../definitions/Puzzle';
import PuzzleModal from './PuzzleModal';
import VoteModal from './VoteModal';

type Props = {
    exitDescriptions: { [key: string]: string },
    room: Room | null,
    puzzle: Puzzle | null,
    descriptionFlag: boolean,
    actions: GameActions,
};

const mainStyle = css({
    display: 'grid',
    gridGap: SIZES.STANDARD,
    gridTemplateRows: 'minmax(0, 2fr) minmax(0, 2fr) minmax(0, 1fr) minmax(0, 1fr)',
    gridTemplateColumns: '1fr 1fr',
    gridTemplateAreas: `
        "description description"
        "doodads     exits"
        "notes       exits"
        "notes       corpses"
    `,
    height: `calc(100vh - ${SIZES.DOUBLE}px)`,
    maxHeight: `calc(100vh - ${SIZES.DOUBLE}px)`,
    minHeight: `calc(100vh - ${SIZES.DOUBLE}px)`,
});

const OVERFLOW_MIXIN = {
    overflowY: 'auto',
    minHeight: 0,
    minWidth: 0,
    maxHeight: '100%',
} as { overflowY: 'auto', minHeight: 0, minWidth: 0, maxHeight: string };


const descriptionStyle = css({ gridArea: 'description' });
const doodadsStyle = css({ ...OVERFLOW_MIXIN, gridArea: 'doodads' });
const notesStyle = css({ ...OVERFLOW_MIXIN, gridArea: 'notes' });
const corpsesStyle = css({ ...OVERFLOW_MIXIN, gridArea: 'corpses' });
const exitsStyle = css({ ...OVERFLOW_MIXIN, gridArea: 'exits' });

const RoomDescription: React.FunctionComponent<Props> = (props) => {
    const { exitDescriptions, room, actions, descriptionFlag, puzzle } = props;

    const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);
    const [isPuzzleModalOpen, setIsPuzzleModalOpen] = useState(false);
    const [isVoteModalOpen, setIsVoteModalOpen] = useState(false);

    const openNoteModal = () => { setIsNoteModalOpen(true); };
    const closeNoteModal = () => { setIsNoteModalOpen(false); };
    
    const openPuzzleModal = () => {
        actions.getPuzzle();
        setIsPuzzleModalOpen(true);
    };
    const closePuzzleModal = () => { setIsPuzzleModalOpen(false); };

    const openVoteModal = () => { setIsVoteModalOpen(true); };
    const closeVoteModal = () => { setIsVoteModalOpen(false); };

    return (
        <div css={mainStyle}>
            <div css={descriptionStyle}>
                <Box title="Current Room">
                    <VList>
                        <div>{(room != null && room.description)}</div>
                        <HList>
                            <Button onClick={openNoteModal}>Write a Lovely Note</Button>
                            <Button onClick={openPuzzleModal}>About This Puzzle</Button>
                            <Button onClick={openVoteModal}>Vote for a Puzzle</Button>
                        </HList>
                    </VList>
                </Box>
                <WriteNoteModal
                    isOpen={isNoteModalOpen}
                    onClose={closeNoteModal}
                    onWrite={actions.writeNote}
                />
                <PuzzleModal
                    puzzle={puzzle}
                    isOpen={isPuzzleModalOpen}
                    onClose={closePuzzleModal}
                />
                <VoteModal actions={actions} isOpen={isVoteModalOpen} onClose={closeVoteModal} />
            </div>
            <div css={doodadsStyle}>
                <Box title="Doodads">
                    <DoodadList
                        doodads={room?.doodads ?? []}
                        onGet={actions.get}
                        onInspect={actions.inspect}
                    />
                </Box>
            </div>
            <div css={exitsStyle}>
                <Box title="Exits">
                    <ExitList
                        exits={room?.exits ?? []}
                        exitDescriptions={exitDescriptions}
                        onMove={actions.move}
                        setDescriptionFlag={actions.setDescriptionFlag}
                        descriptionFlag={descriptionFlag}
                    />
                </Box>
            </div>
            <div css={notesStyle}>
                <Box title="Notes">
                    <DoodadList doodads={room?.notes ?? []} onInspect={actions.inspect} />
                </Box>
            </div>
            <div css={corpsesStyle}>
                <Box title="Corpses">
                    <DoodadList doodads={room?.corpses ?? []} onInspect={actions.inspect} />
                </Box>
            </div>
        </div>
    );
};

export default RoomDescription;
