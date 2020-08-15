/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { COLORS, SIZES, SHADOWS } from '../styling/variables';

const BoxStyle = css({
    borderColor: COLORS.PRIMARY,
    borderWidth: '2px',
    borderStyle: 'solid',
    padding: SIZES.PADDING,
    height: '100%',
    boxShadow: `${SHADOWS.GLOW}, inset ${SHADOWS.GLOW}`,
});

type Props = {};

const Box: React.FunctionComponent<Props> = props => (
    <div css={BoxStyle}>
        {props.children}
    </div>
);

export default Box;
