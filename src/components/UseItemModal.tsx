import React, { useEffect } from 'react';
import InventoryItem from '../definitions/InventoryItem';
import Doodad from '../definitions/Doodad';
import Modal from './Modal';
import { useState } from 'react';
import Button from './Button';
import Select from './Select';
import HList from './HList';
import VList from './VList';
import uniqueSlugs from '../lib/uniqueSlugs';
import sortUsedInventory from '../lib/sortUsedInventory';

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
    useEffect(
        () => { setOtherSlug('') },
        [slugToUse],
    );

    const onSubmit = (e: React.MouseEvent) => {
        e.preventDefault();

        if (otherSlug === '') {
            return;
        }

        onSelectItem(otherSlug);
    };

    const fixedInventory = uniqueSlugs(inventory);
    const sortedInventory = fixedInventory.sort(sortUsedInventory);

    const options = [
        { value: '', label: '-select an item-' },
        ...sortedInventory.map(item => ({ value: item.slug, label: item.inventoryMessage })),
        ...doodads.map(doodad => ({ value: doodad.slug, label: doodad.lookMessage })),
    ];

    return (
        <Modal title="Use Item" isOpen={slugToUse != null} onClose={onClose}>
            <VList>
                <label>
                    <div>Select an item to use {slugToUse} on.</div>
                    <Select onSelectChange={setOtherSlug} value={otherSlug} options={options} />
                </label>
                <HList>
                    <Button type="button" theme="link" onClick={onClose}>Cancel</Button>
                    <Button onClick={onSubmit}>Use it</Button>
                </HList>
            </VList>
        </Modal>
    );
};

export default UseItemModal;
