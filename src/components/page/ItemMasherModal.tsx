/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useState, useEffect } from 'react';
import InventoryItem from '../../definitions/InventoryItem';
import Modal from '../common/Modal';
import VList from '../common/VList';
import Select from '../common/Select';
import HList from '../common/HList';
import Button from '../common/Button';

type Props = {
    isOpen: boolean,
    onClose: () => void,
    inventory: InventoryItem[],
    onMashInventory: (slug1: string, slug2: string) => void,
};

const ItemMasherModal: React.FunctionComponent<Props> = (props) => {
    const { isOpen, onClose, inventory, onMashInventory } = props;

    const [masher1Slug, setMasher1Slug] = useState('');
    const [masher2Slug, setMasher2Slug] = useState('');

    const masherOptions = inventory.map(item => ({
        label: `${item.inventoryMessage} (${item.slug})`,
        value: item.slug,
    }));

    useEffect(
        () => {
            if (inventory.length > 0) {
                setMasher1Slug('');
                setMasher2Slug('');
            }
        },
        [isOpen, inventory],
    );

    const mashSubmit = () => {
        onMashInventory(masher1Slug, masher2Slug);
        onClose();
    };

    const masher1Index = inventory.findIndex(item => item.slug === masher1Slug);
    const masher2Index = inventory.findIndex(item => item.slug === masher2Slug);

    const range = Math.abs(masher1Index - masher2Index) + 1;

    return (
        <Modal title="Inventory Masher" isOpen={isOpen} onClose={onClose}>
            <VList>
                <div>Use this modal to forcibly mash all of your items within a certain range together.</div>
                <label>Start from:</label>
                <Select options={masherOptions} onSelectChange={setMasher1Slug} />
                <label>End at:</label>
                <Select options={masherOptions} onSelectChange={setMasher2Slug} />

                {masher1Index !== -1 && masher2Index !== -1 && (
                    <span>{range} items = {range * range} combinations</span>
                )}

                <HList>
                    <Button theme="link" onClick={onClose}>Cancel</Button>
                    <Button onClick={mashSubmit}>Mash</Button>
                </HList>
            </VList>
        </Modal>
    );
};

export default ItemMasherModal;
