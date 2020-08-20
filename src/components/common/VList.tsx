/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { SIZES } from '../../styling/variables';

type Props = {};

const listStyle = css({
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'column',
    '& > * + *': {
        marginTop: SIZES.STANDARD,
    },
});

const VList: React.FunctionComponent<Props> = ({ children }) => {
    return (
        <div css={listStyle}>
            { children }
        </div>
    );
};

export default VList;