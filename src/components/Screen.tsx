/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import Box from './Box';

import { SIZES } from '../styling/variables';

const screenStyle = css({
    display: 'grid',
    gridGap: SIZES.STANDARD,
    gridTemplateRows: '100%',
    gridTemplateColumns: '3fr 1fr',
    gridTemplateAreas: '"main sidebar"',
    minHeight: '100vh',
    padding: SIZES.STANDARD,
});

const mainStyle = css({
    display: 'grid',
    gridGap: SIZES.STANDARD,
    gridArea: 'main',
    gridTemplateRows: '2fr 1fr 1fr 1fr',
    gridTemplateColumns: '1fr 1fr',
    gridTemplateAreas: `
        "description description"
        "description description"
        "description description"
        "doodads     exits"
        "notes       exits"
        "corpses     exits"
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
        <div css={screenStyle}>
            <main css={mainStyle}>
                <div css={descriptionStyle}>
                    <Box title="Current Room">description</Box>
                </div>
                <div css={doodadsStyle}>
                    <Box title="Doodads">Doodads</Box>
                </div>
                <div css={notesStyle}>
                    <Box title="Notes">Notes</Box>
                </div>
                <div css={corpsesStyle}>
                    <Box title="Corpses">Corpses</Box>
                </div>
                <div css={exitsStyle}>
                    <Box title="Exits">Exits</Box>
                </div>
            </main>
            <aside css={sidebarStyle}>
                <div css={inventoryStyle}>
                    <Box title="inventory">Inventory</Box>
                </div>
                <div css={leaderboardStyle}>
                    <Box title="Leaderboard">Leaderboard</Box>
                </div>
                <div css={activityStyle}>
                    <Box title="Activity">Activity</Box>
                </div>
                <div css={deathwarpStyle}>
                    <Box title="Deathwarp">Deathwarp</Box>
                </div>
            </aside>
        </div>
    );
};

export default Screen;