/**
 * The selection the inventory's furni, pets and bots pages keep across a list update -
 * `FurniModel.selectFirstItem` when the selected group is gone, and the selection of
 * `PetsView.updateState` / `BotsView.updateState`: the one held while it is still in the list,
 * else the first entry, else none (-1).
 */
export const keepInventorySelection = (items: readonly { id: number }[], selectedId: number): number => {
    if (items.some(item => item.id === selectedId)) return selectedId;

    return items[0]?.id ?? -1;
};
