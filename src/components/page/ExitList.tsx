/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { SIZES } from '../../styling/variables';
import Button from '../common/Button';
import List from '../common/List';
import VList from '../common/VList';
import Checkbox from '../common/Checkbox';

type Props = {
    exits: string[],
    exitDescriptions: { [key: string] : string },
    descriptionFlag: boolean,
    onMove: (direction: string) => void,
    setDescriptionFlag: (flag: boolean) => void,
};

const directionStyle = css({
    '::before': {
        content: '"* "',
    },
    gridArea: 'direction',
});

const buttonStyle = css({ gridArea: 'button' });
const descriptionStyle = css({ gridArea: 'description' });

const itemStyle = css({
    display: 'grid',
    gridTemplateColumns: '1fr auto',
    gridTemplateRows: 'auto auto',
    gridTemplateAreas: `
        "direction button"
        "description description"
    `,
    width: '100%',
    gridColumnGap: SIZES.HALF,
    paddingBottom: SIZES.STANDARD,
    alignItems: 'center',
});

const ExitList: React.FunctionComponent<Props> = (props) => {
    const { exits, exitDescriptions, onMove, setDescriptionFlag, descriptionFlag } = props;

    return (
        <VList>
            <Checkbox selected={descriptionFlag} onToggle={setDescriptionFlag} label="Show descriptions" id="show-descriptions" />
            <List>
                {exits.map(exit =>
                    <li key={exit}>
                        <div css={itemStyle}>
                            <div css={directionStyle}>{exit}</div>
                            <div css={buttonStyle}>
                                <Button type="button" onClick={() => onMove(exit)}>Go</Button>
                            </div>
                            <div css={descriptionStyle}>{exitDescriptions[exit]}</div>
                        </div>
                    </li>
                )}
            </List>
        </VList>
    )
};

export default ExitList;
