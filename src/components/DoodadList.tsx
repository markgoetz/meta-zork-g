/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import Doodad from '../definitions/Doodad'
import Button from './Button';
import { SIZES } from '../styling/variables';
import List from './List';

type Props = {
    doodads: Doodad[],
    onGet?: (slug: string) => void,
    onInspect: (slug: string) => void,
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

const DoodadList: React.FunctionComponent<Props> = ({ doodads, onGet, onInspect }) => (
    <List>
        {doodads.map(
            doodad => (
                <li key={doodad.slug}>
                    <div css={itemStyle}>
                        <div css={bulletStyle}>{doodad.lookMessage} ({doodad.slug})</div>
                        <Button type="button" onClick={() => onInspect(doodad.slug)}>Inspect</Button>
                        {onGet && (
                            <Button type="button" onClick={() => onGet(doodad.slug)}>Get</Button>
                        )}
                    </div>
                </li>
            )
        )}
    </List>
);

export default DoodadList;
