/** @jsx jsx */
import { jsx } from '@emotion/core';
import Modal from '../common/Modal';

type Props = {
    mashCount: number | undefined,
    totalMashItems: number | undefined,
};

const MashStatusModal: React.FunctionComponent<Props> = ({mashCount, totalMashItems}) => (
    <Modal isOpen={mashCount != null && totalMashItems != null} onClose={() => null} title="Mash Status">
        Mashing item {mashCount} of {totalMashItems}...
    </Modal>
);

export default MashStatusModal;
