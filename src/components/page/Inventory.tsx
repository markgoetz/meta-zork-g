/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { useState } from 'react';
import InventoryItem from '../../definitions/InventoryItem';
import { SIZES } from '../../styling/variables';
import ItemMasherModal from './ItemMasherModal';
import Button from '../common/Button';
import List from '../common/List';
import HList from '../common/HList';
import CheckBox from '../common/Checkbox';
import StickyHeaderContainer from '../common/StickyHeaderContainer';
import Toggle from '../common/Toggle';
import VList from '../common/VList';

type Props = {
    inventory: InventoryItem[],
    currentPuzzleSlug: string,
    onInspect: (slug: string) => void,
    onUseSelf: (slug: string) => void,
    onUseOther: (slug: string) => void,
    onMashInventory: (slug1: string, slug2: string, mashUsedItems: boolean) => void,
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

const Inventory: React.FunctionComponent<Props> = (props) => {
    const { inventory, currentPuzzleSlug, onInspect, onUseSelf, onUseOther, onMashInventory } = props;

    const [showUsedItems, setShowUsedItems] = useState(false);
    const [showOtherPuzzleItems, setShowOtherPuzzleItems] = useState(false);
    const [showMasherModal, setShowMasherModal] = useState(false);

    const mostRecentInventory = [...inventory];
    mostRecentInventory.reverse();
    const sourceInventory = mostRecentInventory.filter(item => {
        if (!showUsedItems && !item.neverUsed) {
            return false;
        }

        if (!showOtherPuzzleItems && item.puzzleSlug !== currentPuzzleSlug) {
            return false;
        }

        return true;
    });

    return (
        <StickyHeaderContainer
            header={(
                <HList>
                    <Button onClick={() => { setShowMasherModal(true); }}>
                        Inventory Masher
                    </Button>
                    <Toggle label="Filter Inventory...">
                        <VList align="left">
                            <CheckBox
                                id="used-inventory"
                                selected={showUsedItems}
                                onToggle={setShowUsedItems}
                                label="Show used items"
                            />
                            <CheckBox
                                id="other-inventory"
                                selected={showOtherPuzzleItems}
                                onToggle={setShowOtherPuzzleItems}
                                label="Show items from other puzzles"
                            />
                        </VList>
                    </Toggle>
                    
                </HList>
            )}
        >
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
            <ItemMasherModal
                isOpen={showMasherModal}
                onClose={() => setShowMasherModal(false)}
                inventory={mostRecentInventory}
                onMashInventory={onMashInventory}
                puzzleSlug={currentPuzzleSlug}
            />
        </StickyHeaderContainer>
    );
};

export default Inventory;
