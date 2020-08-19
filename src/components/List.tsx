/** @jsx jsx */
import { jsx, css } from '@emotion/core';

const listStyle = css({
    listStyleType: 'none', 
    paddingLeft: 0,
    width: '100%',
});

type Props = React.HTMLProps<HTMLUListElement>;

const List: React.FunctionComponent<Props> = (props) => (
    <ul css={listStyle}>
        {props.children}
    </ul>
);

export default List;
