/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { COLORS, BORDERS, SHADOWS } from '../../styling/variables';
import { INPUT } from '../../styling/common';

const buttonStyle = css({
    ...INPUT,
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

const linkStyle = css({
    border: 'none',
    boxShadow: 'none',
    textAlign: 'left',
    '&:hover, &:focus': {
        backgroundColor: COLORS.PRIMARY_TRANSLUCENT,
        color: COLORS.PRIMARY,
    },
});

type Props = React.HTMLProps<HTMLButtonElement> & {
    theme?: 'primary' | 'secondary' | 'link',
    type?: 'submit' | 'button' | 'reset',
};

const Button: React.FunctionComponent<Props> = (props) => {
    const { children, theme, ...buttonProps } = props;

    const style = [buttonStyle];
    if (theme === 'secondary') {
        style.push(secondaryStyle);
    }
    if  (theme === 'link') {
        style.push(linkStyle);
    }

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
