/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { useState } from 'react';
import InventoryItem from '../../definitions/InventoryItem';
import { SIZES } from '../../styling/variables';
import ItemMasherModal from './ItemMasherModal';
import Button from '../common/Button';
import List from '../common/List';
import VList from '../common/VList';
import HList from '../common/HList';
import CheckBox from '../common/Checkbox';

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
    '& > button': {
        textDecoration: 'line-through',
    }
});

const Inventory: React.FunctionComponent<Props> = ({ inventory, onInspect, onUseSelf, onUseOther, onMashInventory }) => {
    const [showUsedItems, setShowUsedItems] = useState(false);
    const [showMasherModal, setShowMasherModal] = useState(false);

    const mostRecentInventory = [...inventory];
    mostRecentInventory.reverse();
    const sourceInventory = showUsedItems ? mostRecentInventory : mostRecentInventory.filter(item => item.neverUsed);

    return (
        <VList>
            <HList>
                <Button onClick={() => { setShowMasherModal(true); }}>
                    Inventory Masher
                </Button>
                <CheckBox
                    id="used-inventory"
                    selected={showUsedItems}
                    onToggle={setShowUsedItems}
                    label="Show used items"
                />
            </HList>
            <div>
                <List>
                    {sourceInventory.map(
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
            </div>
            <ItemMasherModal
                isOpen={showMasherModal}
                onClose={() => setShowMasherModal(false)}
                inventory={mostRecentInventory}
                onMashInventory={onMashInventory}
            />
        </VList>
    );
};

export default Inventory;
