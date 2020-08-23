/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import Box from '../common/Box';
import Inventory from './Inventory';
import Button from '../common/Button';
import InventoryItem from '../../definitions/InventoryItem';
import GameActions from '../../definitions/GameActions';
import { useState } from 'react';
import UseItemModal from './UseItemModal';
import { SIZES, COLORS, SHADOWS } from '../../styling/variables';
import { OVERFLOW } from '../../styling/common';
import Room from '../../definitions/Room';
import HList from '../common/HList';
import TeleportModal from './TeleportModal';
import VList from '../common/VList';

type Props = {
    inventory: InventoryItem[] | null,
    room: Room | null,
    actions: GameActions,
};
const sidebarStyle = css({
    display: 'grid',
    gridGap: SIZES.STANDARD,
    gridTemplateRows: `minmax(0, 7fr) minmax(180px, 1fr) 1fr`,
    gridTemplateAreas: `
        "inventory"
        "deathwarp"
        "credits"
    `,
    height: '100%',
    maxHeight: `calc(100vh - ${SIZES.DOUBLE}px)`,
});

const inventoryStyle = css({ ...OVERFLOW, gridArea: 'inventory' });
const creditsStyle = css({ gridArea: 'credits' });
const deathwarpStyle = css({ minHeight: 121, gridArea: 'deathwarp' });

const linkStyle = css({
    color: COLORS.PRIMARY,
    textShadow: SHADOWS.PRIMARY_GLOW,
    transition: 'background-color .25s',
    '&:hover, &:focus': {
        backgroundColor: COLORS.PRIMARY_TRANSLUCENT,
    },
    padding: SIZES.QUARTER,
});

const Sidebar: React.FunctionComponent<Props> = (props) => {
    const { inventory, actions, room } = props;
    const [slugToUse, setSlugToUse] = useState<string>();
    const [isTeleportModalOpen, setIsTeleportModalOpen] = useState(false);

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
                <Box title="Teleport">
                    <VList>
                        <span>Teleport to:</span>
                        <HList>
                            <Button theme="secondary" onClick={() => setIsTeleportModalOpen(true)}>
                                Another puzzle
                            </Button>
                            <Button theme="secondary" onClick={() => actions.deathwarp()}>
                                Puzzle start
                            </Button>
                            <Button theme="secondary" onClick={() => actions.resume()}>
                                Newest solved puzzle
                            </Button>
                        </HList>
                    </VList>
                </Box>
            </div>
            <div css={creditsStyle}>
                <Box title="Credits">
                    <HList>
                        <span>Copyright 2020, Mark Goetz</span>
                        <a
                            css={linkStyle}
                            href="https://github.com/markgoetz/meta-zork-g"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Repository
                        </a>
                    </HList>
                </Box>
            </div>
            <UseItemModal
                slugToUse={slugToUse}
                inventory={inventory ?? []}
                doodads={room?.doodads ?? []}
                onSelectItem={onSelectItem}
                onClose={() => setSlugToUse(undefined)}
            />
            <TeleportModal
                onTeleport={actions.teleport}
                isOpen={isTeleportModalOpen}
                onClose={() => setIsTeleportModalOpen(false)}
            />
        </div>
    );
};

export default Sidebar;