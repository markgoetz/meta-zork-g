/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { COLORS } from '../styling/variables';

const ButtonStyle = css({
    backgroundColor: 'transparent',
    borderColor: COLORS.PRIMARY,
    color: COLORS.PRIMARY,
});

type Props = typeof HTMLButtonElement & {
    theme?: 'primary' | 'secondary',
};

const Button: React.FunctionComponent<Props> = (props) => {
    const { children, ...buttonProps } = props

    return (
        <button {...buttonProps}>
            {children}
        </button>
    );
};

Button.defaultProps = {
    theme: 'primary',
};

export default Button;
