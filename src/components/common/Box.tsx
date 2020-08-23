/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { BORDER } from '../../styling/common';
import { SIZES, COLORS } from '../../styling/variables';
import HList from './HList';

const boxStyle = css({
    ...BORDER,
    padding: SIZES.STANDARD,
    minHeight: 0,
    height: '100%',
    maxHeight: '100%',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: COLORS.PRIMARY_TRANSLUCENT,
});

const headerStyle = {
    flexGrow: 0,
    flexShrink: 0,
    marginBottom: SIZES.STANDARD,
};

const titleStyle = css({
    fontSize: SIZES.ONEPOINTFIVE,
});

const contentsStyle = css({
    flexGrow: 1,
    flexShrink: 1,
    overflowY: 'auto',
});

type Props = {
    title: string,
    header?: React.ReactNode,
};

const Box: React.FunctionComponent<Props> = props => (
    <div css={boxStyle}>
        <div css={headerStyle}>
            <HList>
                <div css={titleStyle}>{props.title}</div>
                {props.header}
            </HList>
        </div>
        <div css={contentsStyle}>{props.children}</div>
    </div>
);

export default Box;
