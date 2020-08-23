/** @jsx jsx */
import { jsx } from '@emotion/core';
import Modal from '../common/Modal';
import useLoadFromApi from '../../hooks/useLoadFromApi';
import puzzleApi from '../../api/puzzle';
import Select from '../common/Select';
import { useState, useEffect } from 'react';
import VList from '../common/VList';
import HList from '../common/HList';
import Button from '../common/Button';

type Props = {
    isOpen: boolean,
    onTeleport: (slug: string) => void,
    onClose: () => void,
};

const TeleportModal: React.FunctionComponent<Props> = ({ isOpen, onTeleport, onClose }) => {
    const [getPuzzleList, puzzleList] = useLoadFromApi(puzzleApi.list);
    const [selectedSlug, setSelectedSlug] = useState('');

    useEffect(() => { getPuzzleList(); }, [getPuzzleList, isOpen]);

    const options = puzzleList?.map(puzzle => ({
        label: `${puzzle.name} (${puzzle.slug})`,
        value: puzzle.slug
    })) ?? [];

    const teleport = () => {
        if (selectedSlug == null) {
            return;
        }

        onTeleport(selectedSlug);
        onClose();
    };

    return (
        <Modal title="Vote on a Puzzle" isOpen={isOpen} onClose={onClose}>
            <VList>
                <div>Select a puzzle to teleport to.  Please note that any puzzles after your most recently completed one may be unsolvable.</div>
                <Select options={options} onSelectChange={setSelectedSlug} />
                <HList>
                    <Button theme="link" onClick={onClose}>Cancel</Button>
                    <Button onClick={teleport}>Teleport</Button>
                </HList>
            </VList>
        </Modal>
    )
};

export default TeleportModal;