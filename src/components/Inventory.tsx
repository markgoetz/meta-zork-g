/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import InventoryItem from '../definitions/InventoryItem'
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

const Inventory: React.FunctionComponent<Props> = ({ inventory, onUseSelf, onUseOther }) => (
    <List>
        {inventory.map(
            item => (
                <li key={item.slug}>
                    <div css={itemStyle}>
                        <div css={bulletStyle}>{item.inventoryMessage} ({item.slug})</div>
                        <Button type="button" onClick={() => onUseSelf(item.slug)}>Use Self</Button>
                        <Button type="button" onClick={() => onUseOther(item.slug)}>Use Other</Button>
                    </div>
                </li>
            )
        )}
    </List>
);

export default Inventory;
