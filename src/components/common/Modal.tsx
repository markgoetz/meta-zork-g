/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { useRef } from 'react';
import Box from './Box';
import { COLORS } from '../../styling/variables';

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
    const modalBodyRef = useRef<HTMLDivElement>(null);

    if (!isOpen) {
        return null;
    }

    const onBackdropClick = (e: React.MouseEvent) => {
        if (modalBodyRef.current == null) {
            return;
        }

        const node = e.target as HTMLElement;

        if (!modalBodyRef.current.contains(node)) {
            onClose();
        }
    };

    return (
        <div css={backdropStyle} onClick={onBackdropClick}>
            <div css={containerStyle} ref={modalBodyRef}>
                <Box title={title}>
                    {children}
                </Box>
            </div>
        </div>
    );
};

export default Modal;
