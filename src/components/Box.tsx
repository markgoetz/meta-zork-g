/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { SIZES, SHADOWS, BORDERS } from '../styling/variables';

const boxStyle = css({
    padding: SIZES.STANDARD,
    height: '100%',
    boxShadow: `${SHADOWS.PRIMARY_GLOW}, inset ${SHADOWS.PRIMARY_GLOW}`,
    display: 'flex',
    flexDirection: 'column',
    ...BORDERS.PRIMARY,
});

const titleStyle = css({
    flexGrow: 0,
    textAlign: 'center',
    fontSize: '20px',
    marginBottom: SIZES.STANDARD,
});

const contentsStyle = css({
    flexGrow: 1,
    overflowY: 'auto',
});

type Props = {
    title: string,
};

const Box: React.FunctionComponent<Props> = props => (
    <div css={boxStyle}>
        <div css={titleStyle}>{props.title}</div>
        <div css={contentsStyle}>{props.children}</div>
    </div>
);

export default Box;
