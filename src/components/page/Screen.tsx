/** @jsx jsx */
import { jsx, css } from '@emotion/core';

import { SIZES } from '../../styling/variables';
import GameState from './GameState';
import ResponseModal from './ResponseModal';
import RoomDescription from './RoomDescription';
import Sidebar from './Sidebar';

const screenStyle = css({
    display: 'grid',
    gridGap: SIZES.STANDARD,
    gridTemplateRows: `calc(100vh - ${SIZES.DOUBLE})`,
    gridTemplateColumns: '2fr 1fr',
    gridTemplateAreas: '"main sidebar"',
    width: '100%',
    minHeight: '100vh',
    maxHeight: '100vh',
    padding: SIZES.STANDARD,
});

const Screen: React.FunctionComponent<{}> = () => {
    return (
        <GameState>
            {(room, inventory, exitDescriptions, actions, response, descriptionFlag) => {
                return (
                    <div css={screenStyle}>
                        <RoomDescription
                            room={room}
                            exitDescriptions={exitDescriptions}
                            descriptionFlag={descriptionFlag}
                            actions={actions}
                        />
                        <Sidebar room={room} inventory={inventory} actions={actions} />
                        <ResponseModal response={response} onClose={actions.clearResponse} />
                    </div>
                );
            }
        }
        </GameState>
    );
};

export default Screen;
