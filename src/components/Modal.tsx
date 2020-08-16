/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import Box from './Box';
import { COLORS } from '../styling/variables';

type Props = {
    isOpen: boolean,
    title: string,
    onClose: () => void,
};

const backdropStyle = css({
    position: 'fixed',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
    backgroundColor: COLORS.DARK_TRANSLUCENT,
});

const containerStyle = css({
    margin: 'auto',
    zIndex: 2,
});

const Modal: React.FunctionComponent<Props> = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) {
        return null;
    }

    const onBodyClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();
        return;
    };

    return (
        <div css={backdropStyle} onClick={onClose}>
            <div css={containerStyle} onClick={onBodyClick}>
                <Box title={title}>
                    {children}
                </Box>
            </div>
        </div>
    );
};

export default Modal;
