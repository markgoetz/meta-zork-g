/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { Fragment } from 'react';
import Puzzle from '../../definitions/Puzzle';
import Modal from '../common/Modal';
import VList from '../common/VList';
import HList from '../common/HList';
import Button from '../common/Button';
import { SIZES, COLORS, SHADOWS } from '../../styling/variables';
import UpvoteIcon from '../../images/upvote.svg';
import DownvoteIcon from '../../images/downvote.svg';

type Props = {
    puzzle: Puzzle | null,
    isOpen: boolean,
    onClose: () => void,
};

const voteStyle = {
    paddingLeft: SIZES.STANDARD + SIZES.QUARTER,
    backgroundRepeat: 'no-repeat',
    backgroundPositionY: 'center',
};

const upVoteStyle = css({
    ...voteStyle,
    backgroundImage: `url('${UpvoteIcon}')`,
});

const downVoteStyle = css({
    ...voteStyle,
    backgroundImage: `url('${DownvoteIcon}')`,
    color: COLORS.SECONDARY,
    textShadow: SHADOWS.SECONDARY_GLOW,
});

const PuzzleModal: React.FunctionComponent<Props> = ({ puzzle, isOpen, onClose }) => {
    return (
        <Modal title="About This Puzzle" isOpen={isOpen} onClose={onClose}>
            <VList>
                {puzzle != null ? (
                    <Fragment>
                        <span>{puzzle.name} by {puzzle.createdBy}</span>
                        <span>{puzzle.description}</span>
                        <HList>
                            <span css={upVoteStyle}>{puzzle.upVotes}</span>
                            <span css={downVoteStyle}>{puzzle.downVotes}</span>
                        </HList>
                    </Fragment>
                ) : (<div>Loading...</div>)}
                <Button onClick={onClose}>Okay</Button>
            </VList>
        </Modal>
    )
};

export default PuzzleModal;
