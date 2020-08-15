/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import Box from './Box';

import { SIZES } from '../styling/variables';

const screenStyle = css({
    display: 'grid',
    gridGap: SIZES.PADDING,
    gridTemplateRows: '100%',
    gridTemplateColumns: '3fr 1fr',
    gridTemplateAreas: '"main sidebar"',
    minHeight: '100vh',
    padding: SIZES.PADDING,
});

const mainStyle = css({
    display: 'grid',
    gridGap: SIZES.PADDING,
    gridArea: 'main',
    gridTemplateRows: '3fr 1fr 1fr 1fr',
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
    gridGap: SIZES.PADDING,
    gridArea: 'sidebar',
    gridTemplateRows: '2fr 1fr 1fr 1fr',
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
                    <Box>description</Box>
                </div>
                <div css={doodadsStyle}>
                    <Box>Doodads</Box>
                </div>
                <div css={notesStyle}>
                    <Box>Notes</Box>
                </div>
                <div css={corpsesStyle}>
                    <Box>Corpses</Box>
                </div>
                <div css={exitsStyle}>
                    <Box>Exits</Box>
                </div>
            </main>
            <aside css={sidebarStyle}>
                <div css={inventoryStyle}><Box>Inventory</Box></div>
                <div css={leaderboardStyle}><Box>Leaderboard</Box></div>
                <div css={activityStyle}><Box>Activity</Box></div>
                <div css={deathwarpStyle}><Box>Deathwarp</Box></div>
            </aside>
        </div>
    );
};

export default Screen;