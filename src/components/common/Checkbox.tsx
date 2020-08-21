/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { BORDER } from '../../styling/common';
import { SIZES, COLORS } from '../../styling/variables';
import HList from './HList';

type Props = React.HTMLProps<HTMLInputElement> & {
    id: string,
    label: React.ReactNode,
    selected: boolean,
    onToggle: (value: boolean) => void,
};

const labelStyle = css({
    cursor: 'pointer',
    padding: SIZES.QUARTER,
    transition: 'background-color .25s',
    '&:hover,&:focus': {
        backgroundColor: COLORS.PRIMARY_TRANSLUCENT,
    }
})

const inputStyle = css({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    whiteSpace: 'nowrap',
    width: 1,
    marginLeft: 0,
});

const iconStyle = css({
    ...BORDER,
    height: SIZES.STANDARD,
    width: SIZES.STANDARD,
    padding: 0,
});

const filledIconStyle = css({
    backgroundColor: COLORS.PRIMARY,
});

const CheckBox: React.FunctionComponent<Props> = ({ id, label, selected, onToggle }) => {
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onToggle(e.target.checked);
    };

    return (
        <label htmlFor={id} css={labelStyle}>
            <HList>
                <div css={selected ? [iconStyle, filledIconStyle] : iconStyle} />
                <input css={inputStyle} id={id} type="checkbox" checked={selected} onChange={onChange} />
                <span>{label}</span>
            </HList>
        </label>
    );
};

export default CheckBox;
