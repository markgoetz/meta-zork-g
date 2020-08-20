/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { INPUT } from '../../styling/common';
import { SIZES } from '../../styling/variables';

type Props = React.HTMLProps<HTMLTextAreaElement>;

const inputStyle = css({
    ...INPUT,
    padding: SIZES.HALF,
});

const Textarea: React.FunctionComponent<Props> = (props) => {
    return <textarea {...props} css ={inputStyle} />
};

export default Textarea;
