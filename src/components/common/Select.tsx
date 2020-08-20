/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { SHADOWS, COLORS, SIZES } from '../../styling/variables';
import { INPUT } from '../../styling/common';

type Option = {
    label: string,
    value: string,
}

type Props = React.HTMLProps<HTMLSelectElement> & {
    options: Option[],
    onSelectChange: (value: string) => void,
};

const containerStyle = css({
    position: 'relative',
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
        position: 'absolute',
        top: '50%',
        bottom: '50%',
        right: SIZES.STANDARD,
    }
});

const selectStyle = css({
    ...INPUT,
    paddingRight: SIZES.DOUBLE,
    appearance: 'none',
    width: '100%',
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
