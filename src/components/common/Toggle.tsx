/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { useState } from 'react';
import Button from './Button';
import { COLORS, SIZES } from '../../styling/variables';
import { BORDER } from '../../styling/common';

type Props = {
    label: string,
};

const containerStyle = css({
    position: 'relative',
});

const bodyStyle = css({
    ...BORDER,
    backgroundColor: COLORS.DARK_TRANSLUCENT,
    position: 'absolute',
    top: '100%',
    right: 0,
    padding: SIZES.HALF,
});

const Toggle: React.FunctionComponent<Props> = ({ label, children }) => {
    const [isOpen, setIsOpen] = useState(false);

    const onClick = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div css={containerStyle}>
            <Button onClick={onClick}>{label}</Button>
            {isOpen && (
                <div css={bodyStyle}>{children}</div>
            )}
        </div>
    );
};

export default Toggle;
