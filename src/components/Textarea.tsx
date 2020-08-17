/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { INPUT } from '../styling/common';

type Props = React.HTMLProps<HTMLTextAreaElement>;

const inputStyle = css(INPUT);

const Textarea: React.FunctionComponent<Props> = (props) => {
    return <textarea {...props} css ={inputStyle} />
};

export default Textarea;
