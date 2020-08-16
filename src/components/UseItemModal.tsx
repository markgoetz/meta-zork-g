/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import InventoryItem from '../definitions/InventoryItem';
import Doodad from '../definitions/Doodad';
import Modal from './Modal';
import { useState } from 'react';
import Button from './Button';
import Select from './Select';

type Props = {
    slugToUse?: string;
    doodads: Doodad[];
    inventory: InventoryItem[];
    onSelectItem: (otherSlug: string) => void,
    onClose: () => void,
};

const UseItemModal: React.FunctionComponent<Props> = (props) => {
    const { onSelectItem, inventory, doodads, slugToUse, onClose } = props;
    const [otherSlug, setOtherSlug] = useState<string>('');

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (otherSlug === '') {
            return;
        }

        onSelectItem(otherSlug);
    };

    const options = [
        { value: '', label: '-select an item-' },
        ...inventory.map(item => ({ value: item.slug, label: item.inventoryMessage })),
        ...doodads.map(doodad => ({ value: doodad.slug, label: doodad.lookMessage })),
    ];

    return (
        <Modal title="Use Item" isOpen={slugToUse != null} onClose={onClose}>
            <form onSubmit={onSubmit}>
                <label>
                    <div>Select an item to use {slugToUse} on.</div>
                    <Select onSelectChange={setOtherSlug} value={otherSlug} options={options} />
                </label>
                <Button type="submit">Use it</Button>
            </form>
        </Modal>
    );
};

export default UseItemModal;
