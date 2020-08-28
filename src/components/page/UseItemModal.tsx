import React, { useState, useEffect } from 'react';
import InventoryItem from '../../definitions/InventoryItem';
import Doodad from '../../definitions/Doodad';
import Modal from '../common/Modal';
import Button from '../common/Button';
import Select from '../common/Select';
import HList from '../common/HList';
import VList from '../common/VList';
import CheckBox from '../common/Checkbox';

type Props = {
    slugToUse?: string;
    puzzleSlug?: string,
    doodads: Doodad[];
    inventory: InventoryItem[];
    onSelectItem: (otherSlug: string) => void,
    onClose: () => void,
};

const UseItemModal: React.FunctionComponent<Props> = (props) => {
    const { onSelectItem, puzzleSlug, inventory, doodads, slugToUse, onClose } = props;
    const [showUsedItems, setShowUsedItems] = useState(false);
    const [showOtherItems, setShowOtherItems] = useState(false);
    const [otherSlug, setOtherSlug] = useState('');
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

    const mostRecentInventory = [...inventory];
    mostRecentInventory.reverse();
    const sourceInventory = mostRecentInventory.filter(
        item => {
            if (!showUsedItems && !item.neverUsed) {
                return false;
            } else if (!showOtherItems && item.puzzleSlug !== puzzleSlug) {
                return false;
            }
            return true;
        }
    );

    const options = [
        ...doodads.map(doodad => ({ value: doodad.slug, label: `${doodad.lookMessage} (${doodad.slug})` })),
        ...sourceInventory.map(item => ({ value: item.slug, label: `${item.inventoryMessage} (${item.slug})` })),
    ];

    return (
        <Modal title="Use Item" isOpen={slugToUse != null} onClose={onClose}>
            <VList>
                <label htmlFor="item-to-use">
                    <div>Select an item to use {slugToUse} on.</div>
                    <Select id="item-to-use" onSelectChange={setOtherSlug} value={otherSlug} options={options} />
                </label>
                <HList>
                    <CheckBox
                        id="use-item-show-used-items"
                        label="Show used items"
                        selected={showUsedItems}
                        onToggle={setShowUsedItems}
                    />
                    <CheckBox
                        id="use-item-other-puzzles"
                        label="Show items from other puzzles"
                        selected={showOtherItems}
                        onToggle={setShowOtherItems}
                    />
                </HList>
                <HList>
                    <Button type="button" theme="link" onClick={onClose}>Cancel</Button>
                    <Button onClick={onSubmit}>Use it</Button>
                </HList>
            </VList>
        </Modal>
    );
};

export default UseItemModal;
