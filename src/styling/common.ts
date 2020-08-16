import { COLORS, BORDERS, SHADOWS, FONTS, SIZES } from './variables';

export const INPUT = {
    backgroundColor: 'transparent',
    color: COLORS.PRIMARY,
    ...BORDERS.PRIMARY,
    boxShadow: `${SHADOWS.PRIMARY_GLOW}, inset ${SHADOWS.PRIMARY_GLOW}`,
    textShadow: SHADOWS.PRIMARY_GLOW,
    fontFamily: FONTS.PRIMARY,
    fontSize: SIZES.STANDARD,
    padding: `${SIZES.HALF}px ${SIZES.STANDARD}px`,
    cursor: 'pointer',
    transition: 'background-color .25s',
    '&:hover, &:focus': {
        backgroundColor: COLORS.PRIMARY_TRANSLUCENT,
    }
};
