/** @jsx jsx */
import { jsx, css, keyframes } from '@emotion/core';
import Modal from '../common/Modal';
import VList from '../common/VList';
import { SIZES, COLORS, SHADOWS } from '../../styling/variables';
import { BORDER } from '../../styling/common';


type Props = {
    mashCount: number | undefined,
    totalMashItems: number | undefined,
};

const fadeAnimation = keyframes`
    0% {
        opacity: 1;
    }

    50% {
        opacity: .25;
    }

    100% {
        opacity: 1;
    }
`;

const progressContainerStyle = css({
    ...BORDER,
    appearance: 'none',
    padding: SIZES.QUARTER,
    width: SIZES.STANDARD * 32,
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
});

const progressBarStyle = css({
    backgroundColor: COLORS.PRIMARY,
    height: SIZES.DOUBLE,
    animation: `width .25s, ${fadeAnimation} 2s infinite`,
    boxShadow: SHADOWS.PRIMARY_GLOW,
});

const MashStatusModal: React.FunctionComponent<Props> = ({mashCount, totalMashItems}) => {
    const percentage = mashCount != null && totalMashItems != null
        ? 100 * mashCount / totalMashItems
        : 0;

    return (
        <Modal isOpen={mashCount != null && totalMashItems != null} onClose={() => null} title="Mash Status">
            <VList>
                <span>Mashing item {mashCount} of {totalMashItems}...</span>
                <div css={progressContainerStyle}>
                    <div css={progressBarStyle} style={{width: `${percentage}%`}} />
                </div>
            </VList>
        </Modal>
    );
};

export default MashStatusModal;
