export const COLORS = {
    DARK: '#010C0A',
    PRIMARY: '#20E0C2',
    SECONDARY: '#F24541',
    PRIMARY_TRANSLUCENT: 'rgba(32, 224, 194, .3)',
}

export const SIZES = {
    HALF: 8,
    STANDARD: 16,
};

export const SHADOWS = {
    PRIMARY_GLOW: `0 0 4px ${COLORS.PRIMARY}`,
    SECONDARY_GLOW: `0 0 4px ${COLORS.SECONDARY}`,
};

export const FONTS = {
    PRIMARY: `'Fira Mono', monospace`,
};

export const BORDERS = {
    PRIMARY: {
        borderStyle: 'solid',
        borderWidth: '2px',
        borderColor: COLORS.PRIMARY,
    },
    SECONDARY: {
        borderStyle: 'solid',
        borderWidth: '2px',
        borderColor: COLORS.SECONDARY,
    }
};