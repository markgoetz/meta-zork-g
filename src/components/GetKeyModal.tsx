/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { useState } from 'react';
import Button from './Button';
import Input from './Input';
import Box from './Box';

type Props = {
    onKeySubmit: (key: string) => void,
}

const containerStyle = css({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
});

const fieldStyle = css({
    width: '100%',
    display: 'grid',
    gridTemplateColumns: 'auto auto',
    gridColumnGap: '8px',
});

const GetKeyModal: React.FunctionComponent<Props> = (props) => {
    const [value, setValue] = useState('');
    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        props.onKeySubmit(value);
    };

    const onValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    };

    return (
        <div css={containerStyle}>
            <Box title="API Key">
                <form onSubmit={onSubmit}>
                    <label>
                        <div>Please enter your API key.</div>
                        <div css={fieldStyle}>
                            <Input size={40} type="text" value={value} onChange={onValueChange} />
                            <Button type="submit">Enter</Button>
                        </div>
                    </label>
                </form>
            </Box>
        </div>
    );
};

export default GetKeyModal;