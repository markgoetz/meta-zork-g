/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import Box from './Box';

import { SIZES } from '../styling/variables';
import GameState from './GameState';
import Button from './Button';
import DoodadList from './DoodadList';
import ExitList from './ExitList';
import Inventory from './Inventory';

const screenStyle = css({
    display: 'grid',
    gridGap: SIZES.STANDARD,
    gridTemplateRows: '100%',
    gridTemplateColumns: '2fr 1fr',
    gridTemplateAreas: '"main sidebar"',
    width: '100%',
    minHeight: '100vh',
    padding: SIZES.STANDARD,
});

const mainStyle = css({
    display: 'grid',
    gridGap: SIZES.STANDARD,
    gridArea: 'main',
    gridTemplateRows: '1fr 1fr 1fr',
    gridTemplateColumns: '1fr 1fr',
    gridTemplateAreas: `
        "description description"
        "doodads     exits"
        "notes       corpses"
    `,
});

const sidebarStyle = css({
    display: 'grid',
    gridGap: SIZES.STANDARD,
    gridArea: 'sidebar',
    gridTemplateRows: '2fr 1fr 1fr auto',
    gridTemplateAreas: `
        "inventory"
        "inventory"
        "leaderboard"
        "activity"
        "deathwarp"
    `
});

const descriptionStyle = css({ gridArea: 'description' });
const doodadsStyle = css({ gridArea: 'doodads' });
const notesStyle = css({ gridArea: 'notes' });
const corpsesStyle = css({ gridArea: 'corpses' });
const exitsStyle = css({ gridArea: 'exits' });
const inventoryStyle = css({ gridArea: 'inventory' });
const leaderboardStyle = css({ gridArea: 'leaderboard' });
const activityStyle = css({ gridArea: 'activity' });
const deathwarpStyle = css({ gridArea: 'deathwarp' });

const Screen: React.FunctionComponent<{}> = () => {
    return (
        <GameState>
            {(room, inventory, exitDescriptions, actions) => (
                <div css={screenStyle}>
                    <main css={mainStyle}>
                        <div css={descriptionStyle}>
                            <Box title="Current Room">{(room != null && room.description)}</Box>
                        </div>
                        <div css={doodadsStyle}>
                            <Box title="Doodads">
                                <DoodadList
                                    doodads={room?.doodads ?? []}
                                    onGet={actions.onGet}
                                    onInspect={actions.onInspect}
                                />
                            </Box>
                        </div>
                        <div css={exitsStyle}>
                            <Box title="Exits">
                                <ExitList
                                    exits={room?.exits ?? []}
                                    exitDescriptions={exitDescriptions}
                                    onMove={actions.onMove}
                                />
                            </Box>
                        </div>
                        <div css={notesStyle}>
                            <Box title="Notes">
                                <DoodadList doodads={room?.notes ?? []} onInspect={actions.onInspect} />
                            </Box>
                        </div>
                        <div css={corpsesStyle}>
                            <Box title="Corpses">
                                <DoodadList doodads={room?.corpses ?? []} onInspect={actions.onInspect} />
                            </Box>
                        </div>
                    </main>
                    <aside css={sidebarStyle}>
                        {/* TODO Your name and score? */}
                        <div css={inventoryStyle}>
                            <Box title="inventory">
                                <Inventory
                                    inventory={inventory ?? []}
                                    onUseSelf={actions.onUseSelf}
                                    onUseOther={actions.onUseOther}
                                />
                            </Box>
                        </div>
                        <div css={leaderboardStyle}>
                            <Box title="Leaderboard">Leaderboard</Box>
                            {/* TODO Leaderboard modal */}
                        </div>
                        <div css={activityStyle}>
                            <Box title="Activity">Activity</Box>
                            {/* TODO Activity modal */}
                        </div>
                        <div css={deathwarpStyle}>
                            <Box title="Deathwarp">
                                <div css={{ textAlign: 'center'}}>
                                    <Button theme="secondary" onClick={() => actions.onDeathWarp()}>
                                        Like this image to immediately die
                                    </Button>
                                </div>
                            </Box>
                        </div>
                    </aside>
                    {/* TODO Use Item on Other modal */}
                </div>
            )}
        </GameState>
    );
};

export default Screen;
