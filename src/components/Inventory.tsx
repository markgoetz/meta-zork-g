/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import InventoryItem from '../definitions/InventoryItem';
import Button from './Button';
import { SIZES } from '../styling/variables';
import List from './List';

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
    const sortedInventory = inventory.sort(
        (itemA, itemB) => {
            if (itemA.neverUsed && !itemB.neverUsed) {
                return -1;
            }
            if (!itemA.neverUsed && itemB.neverUsed) {
                return 1;
            }
            return 0;
        }
    );
    
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
