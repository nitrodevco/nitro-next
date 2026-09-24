/**
 * The inventory's bots - Flash `inventory/bots/BotsModel` and the `BotGridItem` thumbs its
 * `BotsView` draws: every bot the user owns, which one is selected, and whether the list has
 * arrived (`isListInitialized`, which `HabboInventory` also keeps as the bots category's init
 * flag).
 *
 * - `updateBots` is `BotsModel.updateItems` with a complete list: bots gone are removed, new ones
 *   added, the rest left as they are.
 * - `addBot` / `removeBot` are `BotAddedToInventory` / `BotRemovedFromInventory`. Adding a bot id
 *   the list already holds changes nothing, as Flash's `Map.add` does.
 *
 * The bots tab shows at all only with `inventory.bots.enabled`, as it does in Flash.
 */
import { IBotData } from '@nitrodevco/nitro-packets';
import { StateCreator } from 'zustand';

/** Flash `BotData`, as the grid and the preview read it. */
export type InventoryBot = IBotData;

type State = {
    /** The owned bots in grid order. */
    bots: InventoryBot[];
    /** The selected bot's id, -1 for none. */
    botSelectedId: number;
    /** `isListInitialized`: the list has arrived. */
    botListInitialized: boolean;
};

type Actions = {
    /** `BotsModel.updateItems` with a complete list. */
    updateBots: (bots: Map<number, InventoryBot>) => void;
    /** `BotsModel.addItem`: a bot id already held is left as it is. */
    addBot: (bot: InventoryBot) => void;
    /** `BotsModel.removeItem`. */
    removeBot: (botId: number) => void;
    selectBot: (botId: number) => void;
};

export const InventoryBotsSliceInitialState: State = {
    bots: [],
    botSelectedId: -1,
    botListInitialized: false,
};

export type InventoryBotsSlice = State & Actions;

/** `BotsView.updateState`'s selection: the one held while it is still in the list, else the first bot. */
const keepSelection = (bots: readonly InventoryBot[], selectedId: number): number => {
    if (bots.some(bot => bot.id === selectedId)) return selectedId;

    return bots[0]?.id ?? -1;
};

export const createInventoryBotsSlice: StateCreator<InventoryBotsSlice, [], [], InventoryBotsSlice> = set => ({
    ...InventoryBotsSliceInitialState,
    updateBots: incoming => set((x) => {
        const kept = x.bots.filter(bot => incoming.has(bot.id));
        const held = new Set(kept.map(bot => bot.id));
        const bots = [ ...kept, ...[ ...incoming.values() ].filter(bot => !held.has(bot.id)) ];

        return { bots, botSelectedId: keepSelection(bots, x.botSelectedId), botListInitialized: true };
    }),
    addBot: bot => set((x) => {
        if (x.bots.some(held => held.id === bot.id)) return x;

        const bots = [ ...x.bots, bot ];

        return { bots, botSelectedId: keepSelection(bots, x.botSelectedId) };
    }),
    removeBot: botId => set((x) => {
        if (!x.bots.some(bot => bot.id === botId)) return x;

        const bots = x.bots.filter(bot => bot.id !== botId);

        return { bots, botSelectedId: keepSelection(bots, x.botSelectedId) };
    }),
    selectBot: botSelectedId => set({ botSelectedId }),
});
