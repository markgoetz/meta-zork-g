import React, { useState, useEffect } from 'react';
import HList from './HList';
import Textarea from './Textarea';
import Modal from './Modal';
import VList from './VList';
import Button from './Button';

type Props = {
    isOpen: boolean,
    onClose: () => void,
    onWrite: (contents: string) => void,
};

const WriteNoteModal: React.FunctionComponent<Props> = (props) => {
    const { isOpen, onClose, onWrite } = props;
    const [contents, setContents] = useState('');

    useEffect(
        () => setContents(''),
        [isOpen],
    );

    const onClick = (e: React.MouseEvent) => {
        e.preventDefault();
        onClose();
        onWrite(contents);
    };

    const onTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setContents(e.target.value);
    };

    return (
        <Modal title="Use Item" isOpen={isOpen} onClose={onClose}>
            <VList>
                <label>
                    <div>Please enter the text for your lovely note.</div>
                </label>
                <Textarea value={contents} onChange={onTextChange} />
                <HList>
                    <Button type="button" theme="link" onClick={onClose}>Cancel</Button>
                    <Button type="button" onClick={onClick}>Write it!</Button>
                </HList>
            </VList>
        </Modal>
    );
};

export default WriteNoteModal;
