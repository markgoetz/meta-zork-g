/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { SIZES } from '../../styling/variables';

type Props = {
    align?: 'left' | 'right' | 'center',
};

const listStyle = css({
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'column',
    '& > * + *': {
        marginTop: SIZES.STANDARD,
    },
});

const leftStyle = css({
    alignItems: 'flex-start',
});

const rightStyle = css({
    alignItems: 'flex-end',
});

const centerStyle = css({
    alignItems: 'center',
});

const VList: React.FunctionComponent<Props> = ({ align, children }) => {
    const styles = [listStyle];

    if (align === 'left') {
        styles.push(leftStyle);
    } else if (align === 'right') {
        styles.push(rightStyle);
    } else {
        styles.push(centerStyle);
    }

    return (
        <div css={styles}>
            { children }
        </div>
    );
};

VList.defaultProps = {
    align: 'center',
};

export default VList;