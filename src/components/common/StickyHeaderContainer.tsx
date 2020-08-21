/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { COLORS, SIZES } from '../../styling/variables';
import VList from './VList';

const rootStyle = css({
    position: 'relative',
});

const stickyHeaderStyle = css({
    position: 'sticky',
    top: 0,
    backgroundColor: COLORS.DARK_TRANSLUCENT,
    width: '100%',
    padding: SIZES.HALF,
});

type Props = {
    header: React.ReactNode,
};

const StickyHeaderContainer: React.FunctionComponent<Props> = ({ header, children }) => (
    <div css={rootStyle}>
        <VList>
            <div css={stickyHeaderStyle}>
                {header}
            </div>
            {children}
        </VList>
    </div>
);

export default StickyHeaderContainer;
