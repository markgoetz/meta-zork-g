/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import InventoryItem from '../definitions/InventoryItem';
import Button from './Button';
import { SIZES } from '../styling/variables';
import List from './List';
import uniqueSlugs from '../lib/uniqueSlugs';
import sortUsedInventory from '../lib/sortUsedInventory';
import { useState } from 'react';
import VList from './VList';
import Modal from './Modal';
import Select from './Select';
import HList from './HList';

type Props = {
    inventory: InventoryItem[],
    onInspect: (slug: string) => void,
    onUseSelf: (slug: string) => void,
    onUseOther: (slug: string) => void,
    onMashInventory: (slug1: string, slug2: string) => void,
};

const itemStyle = css({
    display: 'grid',
    gridTemplateColumns: '1fr auto auto',
    width: '100%',
    gridGap: SIZES.HALF,
    paddingBottom: SIZES.HALF,
    alignItems: 'center',
});

const usedItemStyle = css({
    textDecoration: 'line-through',
});

const Inventory: React.FunctionComponent<Props> = ({ inventory, onInspect, onUseSelf, onUseOther, onMashInventory }) => {
    const [showUsedItems, setShowUsedItems] = useState(false);
    const [showMasher, setShowMasher] = useState(false);
    const [masher1Slug, setMasher1Slug] = useState('');
    const [masher2Slug, setMasher2Slug] = useState('');

    const sourceInventory = showUsedItems ? inventory : inventory.filter(item => item.neverUsed);
    const fixedInventory = uniqueSlugs(sourceInventory);
    const sortedInventory = fixedInventory.sort(sortUsedInventory);
    const mostRecentInventory = sortedInventory.reverse();

    const masherOptions = mostRecentInventory.map(item => ({
        label: item.inventoryMessage, value: item.slug,
    }));

    const mashSubmit = () => {
        onMashInventory(masher1Slug, masher2Slug);
        setShowMasher(false);
    };

    return (
        <VList>
            <Button onClick={() => { setShowMasher(true); }}>
                Inventory Masher
            </Button>
            <List>
                {mostRecentInventory.map(
                    item => (
                        <li key={item.slug}>
                            <div css={itemStyle}>
                                <div css={item.neverUsed ? [] : [usedItemStyle]}>
                                    <Button theme="link" onClick={() => onInspect(item.slug)}>
                                        {item.inventoryMessage} ({item.slug})
                                    </Button>
                                </div>
                                <Button type="button" onClick={() => onUseSelf(item.slug)}>Use Self</Button>
                                <Button type="button" onClick={() => onUseOther(item.slug)}>Use Other</Button>
                            </div>
                        </li>
                    )
                )}
            </List>
            <Button onClick={() => setShowUsedItems(!showUsedItems)}>
                Toggle Used Items
            </Button>
            <Modal title="Inventory Masher" isOpen={showMasher} onClose={() => { setShowMasher(false); }}>
                <VList>
                    <label>Start from:</label>
                    <Select options={masherOptions} onSelectChange={setMasher1Slug} />
                    <label>End at:</label>
                    <Select options={masherOptions} onSelectChange={setMasher2Slug} />
                    <HList>
                        <Button theme="link" onClick={() => { setShowMasher(false); }}>Cancel</Button>
                        <Button onClick={mashSubmit}>Mash</Button>
                    </HList>
                </VList>
            </Modal>
        </VList>
    );
};

export default Inventory;
