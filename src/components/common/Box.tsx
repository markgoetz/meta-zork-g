/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { BORDER } from '../../styling/common';
import { SIZES, COLORS } from '../../styling/variables';

const boxStyle = css({
    ...BORDER,
    padding: SIZES.STANDARD,
    minHeight: 144,
    height: '100%',
    maxHeight: '100%',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: COLORS.PRIMARY_TRANSLUCENT,
});

const titleStyle = css({
    flexGrow: 0,
    flexShrink: 0,
    textAlign: 'center',
    fontSize: SIZES.ONEPOINTFIVE,
    marginBottom: SIZES.STANDARD,
});

const contentsStyle = css({
    flexGrow: 1,
    flexShrink: 1,
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
