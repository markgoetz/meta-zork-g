/** @jsx jsx */
import { jsx } from '@emotion/core';
import Modal from '../common/Modal';
import GameActions from '../../definitions/GameActions';
import useLoadFromApi from '../../hooks/useLoadFromApi';
import puzzleApi from '../../api/puzzle';
import Button from '../common/Button';
import VList from '../common/VList';
import Select from '../common/Select';
import { useState, useEffect } from 'react';
import HList from '../common/HList';

type Props = {
    isOpen: boolean,
    actions: GameActions,
    onClose: () => void,
};

const VoteModal: React.FunctionComponent<Props> = ({ isOpen, actions, onClose }) => {
    const [getPuzzleList, puzzleList] = useLoadFromApi(puzzleApi.list);
    const [selectedSlug, setSelectedSlug] = useState('');

    useEffect(() => { getPuzzleList(); }, [getPuzzleList, isOpen]);

    const options = puzzleList?.map(puzzle => ({
        label: `${puzzle.name} (${puzzle.slug})`,
        value: puzzle.slug
    })) ?? [];

    const upVote = () => {
        if (selectedSlug == null) {
            return;
        }

        actions.upVote(selectedSlug);
    };

    const downVote = () => {
        if (selectedSlug == null) {
            return;
        }

        actions.downVote(selectedSlug);
    };

    return (
        <Modal title="Vote on a Puzzle" isOpen={isOpen} onClose={onClose}>
            <VList>
                <div>Select a puzzle to vote on.  You can only vote for puzzles that you've completed.</div>
                <HList>
                    <Select options={options} onSelectChange={setSelectedSlug} />
                    <Button onClick={upVote}>Upvote</Button>
                    <Button theme="secondary" onClick={downVote}>Downvote</Button>
                </HList>
                <Button onClick={onClose}>Close</Button>
            </VList>
        </Modal>
    )
};

export default VoteModal;
