/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { INPUT } from '../styling/common';

type Props = React.HTMLProps<HTMLInputElement>;

const inputStyle = css(INPUT);

const Input: React.FunctionComponent<Props> = (props) => {
    return <input {...props} css ={inputStyle} />
};

export default Input;
