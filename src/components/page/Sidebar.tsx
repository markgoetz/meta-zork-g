/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import Box from '../common/Box';
import Inventory from './Inventory';
import Button from '../common/Button';
import InventoryItem from '../../definitions/InventoryItem';
import GameActions from '../../definitions/GameActions';
import { useState } from 'react';
import UseItemModal from './UseItemModal';
import { SIZES } from '../../styling/variables';
import Room from '../../definitions/Room';

type Props = {
    inventory: InventoryItem[] | null,
    room: Room | null,
    actions: GameActions,
};

const OVERFLOW_MIXIN = {
    overflowY: 'auto',
    minHeight: 0,
    minWidth: 0,
    maxHeight: '100%',
} as { overflowY: 'auto', minHeight: 0, minWidth: 0, maxHeight: string };

const sidebarStyle = css({
    display: 'grid',
    gridGap: SIZES.STANDARD,
    gridTemplateRows: `calc(100vh - ${121 + SIZES.STANDARD * 3}px) 121px`,
    gridTemplateAreas: `
        "inventory"
        "deathwarp"
    `,
    height: '100%',
    maxHeight: '100%',
});

const inventoryStyle = css({ ...OVERFLOW_MIXIN, gridArea: 'inventory' });
const deathwarpStyle = css({ gridArea: 'deathwarp' });

const Sidebar: React.FunctionComponent<Props> = (props) => {
    const { inventory, actions, room } = props;
    const [slugToUse, setSlugToUse] = useState<string>();

    const onSelectItem = (otherSlug: string) => {
        if (slugToUse == null) {
            return;
        }

        actions.useOnOther(slugToUse, otherSlug);
        setSlugToUse(undefined);
    };

    return (
        <div css={sidebarStyle}>
            {/* TODO Your name and score? */}
            <div css={inventoryStyle}>
                <Box title="Inventory">
                    <Inventory
                        inventory={inventory ?? []}
                        onInspect={actions.inspect}
                        onUseSelf={actions.useOnSelf}
                        onUseOther={setSlugToUse}
                        onMashInventory={actions.mashInventory}
                    />
                </Box>
            </div>
            <div css={deathwarpStyle}>
                <Box title="Deathwarp">
                    <div css={{ textAlign: 'center'}}>
                        <Button theme="secondary" onClick={() => actions.deathwarp()}>
                            Click to instantly die
                        </Button>
                    </div>
                </Box>
            </div>
            <UseItemModal
                slugToUse={slugToUse}
                inventory={inventory ?? []}
                doodads={room?.doodads ?? []}
                onSelectItem={onSelectItem}
                onClose={() => setSlugToUse(undefined)}
            />
        </div>
    );
};

export default Sidebar;