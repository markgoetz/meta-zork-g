import InventoryItem from "../definitions/InventoryItem";

const sortUsedInventory = (itemA: InventoryItem, itemB: InventoryItem) => {
    if (itemA.neverUsed && !itemB.neverUsed) {
        return -1;
    }
    if (!itemA.neverUsed && itemB.neverUsed) {
        return 1;
    }
    return 0;
};

export default sortUsedInventory;
