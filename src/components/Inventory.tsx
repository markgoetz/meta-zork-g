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

type Props = {
    inventory: InventoryItem[],
    onInspect: (slug: string) => void,
    onUseSelf: (slug: string) => void,
    onUseOther: (slug: string) => void,
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

const Inventory: React.FunctionComponent<Props> = ({ inventory, onInspect, onUseSelf, onUseOther }) => {
    const [showUsedItems, setShowUsedItems] = useState(false);

    const sourceInventory = showUsedItems ? inventory : inventory.filter(item => item.neverUsed);
    const fixedInventory = uniqueSlugs(sourceInventory);
    const sortedInventory = fixedInventory.sort(sortUsedInventory);
    
    return (
        <VList>
            <List>
                {sortedInventory.map(
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
        </VList>
    );
};

export default Inventory;
