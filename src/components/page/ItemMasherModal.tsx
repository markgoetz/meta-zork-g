/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useState } from 'react';
import InventoryItem from '../../definitions/InventoryItem';
import Modal from '../common/Modal';
import VList from '../common/VList';
import Select from '../common/Select';
import HList from '../common/HList';
import Button from '../common/Button';

type Props = {
    isOpen: boolean,
    onClose: () => void,
    sourceInventory: InventoryItem[],
    onMashInventory: (slug1: string, slug2: string) => void,
};

const ItemMasherModal: React.FunctionComponent<Props> = (props) => {
    const { isOpen, onClose, sourceInventory, onMashInventory } = props;

    const [masher1Slug, setMasher1Slug] = useState('');
    const [masher2Slug, setMasher2Slug] = useState('');

    const masherOptions = sourceInventory.map(item => ({
        label: item.inventoryMessage,
        value: item.slug,
    }));

    const mashSubmit = () => {
        onMashInventory(masher1Slug, masher2Slug);
        onClose();
    };

    return (
        <Modal title="Inventory Masher" isOpen={isOpen} onClose={onClose}>
            <VList>
                <div>Use this modal to forcibly mash all of your items within a certain range together.</div>
                <label>Start from:</label>
                <Select options={masherOptions} onSelectChange={setMasher1Slug} />
                <label>End at:</label>
                <Select options={masherOptions} onSelectChange={setMasher2Slug} />
                <HList>
                    <Button theme="link" onClick={onClose}>Cancel</Button>
                    <Button onClick={mashSubmit}>Mash</Button>
                </HList>
            </VList>
        </Modal>
    );
};

export default ItemMasherModal;
