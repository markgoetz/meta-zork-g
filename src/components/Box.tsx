/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { COLORS, SIZES } from '../styling/variables';

const BoxStyle = css({
    borderColor: COLORS.PRIMARY,
    borderWidth: '2px',
    borderStyle: 'solid',
    padding: SIZES.PADDING,
    height: '100%',
});

type Props = {};

const Box: React.FunctionComponent<Props> = props => (
    <div css={BoxStyle}>
        {props.children}
    </div>
);

export default Box;
