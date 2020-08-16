/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { BORDERS, FONTS, SHADOWS, COLORS, SIZES } from '../styling/variables';

type Option = {
    label: string,
    value: string,
}

type Props = React.HTMLProps<HTMLSelectElement> & {
    options: Option[],
    onSelectChange: (value: string) => void,
};

const containerStyle = css({
    '::after': {
        content: '""',
        borderStyle: 'solid',
        borderTopWidth: SIZES.QUARTER,
        borderLeftWidth: SIZES.QUARTER,
        borderRightWidth: SIZES.QUARTER,
        borderColor: 'transparent',
        borderTopColor: COLORS.PRIMARY,
        pointerEvents: 'none',
        outline: SHADOWS.PRIMARY_GLOW,
        position: 'relative',
        top: SIZES.QUARTER + SIZES.HALF,
        right: SIZES.HALF + SIZES.STANDARD,
    }
});

const selectStyle = css({
    ...BORDERS.PRIMARY,
    backgroundColor: 'transparent',
    color: COLORS.PRIMARY,
    padding: SIZES.HALF,
    paddingRight: SIZES.DOUBLE,
    fontFamily: FONTS.PRIMARY,
    fontSize: SIZES.STANDARD,
    boxShadow: `${SHADOWS.PRIMARY_GLOW}, inset ${SHADOWS.PRIMARY_GLOW}`,
    textShadow: SHADOWS.PRIMARY_GLOW,
    appearance: 'none',
    cursor: 'pointer',
    backgroundImage: ''
});

const optionStyle = css({
    backgroundColor: COLORS.DARK,
});

const Select: React.FunctionComponent<Props> = (props) => {
    const { children, options, onSelectChange, ...selectProps } = props;

    const onItemChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        onSelectChange(e.target.value);
    };

    return (
        <div css={containerStyle}>
            <select {...selectProps} css={selectStyle} onChange={onItemChange}>
                {options.map(option => (
                    <option css={optionStyle} key={option.value} value={option.value}>{option.label}</option>
                ))}
            </select>
        </div>
    )
};

export default Select;
