/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { COLORS, BORDERS, SHADOWS, FONTS, SIZES } from '../styling/variables';

const buttonStyle = css({
    backgroundColor: 'transparent',
    color: COLORS.PRIMARY,
    ...BORDERS.PRIMARY,
    boxShadow: `${SHADOWS.PRIMARY_GLOW}, inset ${SHADOWS.PRIMARY_GLOW}`,
    textShadow: SHADOWS.PRIMARY_GLOW,
    fontFamily: FONTS.PRIMARY,
    fontSize: SIZES.STANDARD,
    padding: `${SIZES.HALF}px ${SIZES.STANDARD}px`,
    cursor: 'pointer',
    transition: 'background-color .25s, color .25s',
    '&:hover, &:focus': {
        backgroundColor: COLORS.PRIMARY,
        color: COLORS.DARK,
    }
});

const secondaryStyle = css({
    ...BORDERS.SECONDARY,
    boxShadow: `${SHADOWS.SECONDARY_GLOW}, inset ${SHADOWS.SECONDARY_GLOW}`,
    color: COLORS.SECONDARY,
    textShadow: SHADOWS.SECONDARY_GLOW,
    '&:hover, &:focus': {
        backgroundColor: COLORS.SECONDARY,
    }
});

type Props = React.HTMLProps<HTMLButtonElement> & {
    theme?: 'primary' | 'secondary',
    type?: 'submit' | 'button' | 'reset',
};

const Button: React.FunctionComponent<Props> = (props) => {
    const { children, theme, ...buttonProps } = props;

    const style = (theme === 'primary') ? buttonStyle : [buttonStyle, secondaryStyle];

    return (
        <button {...buttonProps} css={style}>
            {children}
        </button>
    );
};

Button.defaultProps = {
    theme: 'primary',
};

export default Button;
