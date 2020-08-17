/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import InventoryItem from '../definitions/InventoryItem';
import Button from './Button';
import { SIZES } from '../styling/variables';
import List from './List';
import uniqueSlugs from '../lib/uniqueSlugs';
import sortUsedInventory from '../lib/sortUsedInventory';

type Props = {
    inventory: InventoryItem[],
    onUseSelf: (slug: string) => void,
    onUseOther: (slug: string) => void,
};

const bulletStyle = css({
    '::before': {
        content: '"* "',
    }
});

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

const Inventory: React.FunctionComponent<Props> = ({ inventory, onUseSelf, onUseOther }) => {
    const fixedInventory = uniqueSlugs(inventory);
    const sortedInventory = fixedInventory.sort(sortUsedInventory);
    
    return (
        <List>
            {sortedInventory.map(
                item => (
                    <li key={item.slug}>
                        <div css={itemStyle}>
                            <div css={item.neverUsed ? bulletStyle : [bulletStyle, usedItemStyle]}>
                                {item.inventoryMessage} ({item.slug})
                            </div>
                            <Button type="button" onClick={() => onUseSelf(item.slug)}>Use Self</Button>
                            <Button type="button" onClick={() => onUseOther(item.slug)}>Use Other</Button>
                        </div>
                    </li>
                )
            )}
        </List>
    );
};

export default Inventory;
