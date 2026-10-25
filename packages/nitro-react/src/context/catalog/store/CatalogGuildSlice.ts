/**
 * The catalogue's side of the user's groups - Flash's `GuildMembershipsController`, which
 * `HabboCatalog` creates once and hands to the guild widgets.
 *
 * The one guild selector on show registers itself (`registerGuildSelectorWidget` in
 * `commands/catalog/catalogGuildCommands`, which also asks for the memberships), and
 * `GuildMembershipsMessage` is handed to it (`onGuildMembershipsMessageEvent`, in
 * `handlers/catalog/registerCatalogGuildHandlers`): it fills its list and selects the favourite
 * group, then the page's first offer. A widget that unmounts unregisters, and an answer with no
 * widget registered goes nowhere, as in Flash. `onGuildVisualSettingsChanged` (the group
 * management window saved a group's look) asks again while a widget is registered
 * (`commands/catalog/catalogGuildCommands`).
 */
import type { IHabboGroupEntryData } from '@nitrodevco/nitro-packets';
import { StateCreator } from 'zustand';

/** What the controller calls on the registered `GuildSelectorCatalogWidget`. */
export interface CatalogGuildSelector {
    populateAndSelectFavorite: (guilds: IHabboGroupEntryData[]) => void;
    selectFirstOffer: () => void;
}

type State = {
    guildSelectorWidget: CatalogGuildSelector | undefined;
};

type Actions = {
    setGuildSelectorWidget: (guildSelectorWidget: CatalogGuildSelector) => void;
    /** `unregisterGuildSelectorWidget`: only the widget that is registered can unregister. */
    unregisterGuildSelectorWidget: (guildSelectorWidget: CatalogGuildSelector) => void;
};

export const CatalogGuildSliceInitialState: State = {
    guildSelectorWidget: undefined,
};

export type CatalogGuildSlice = State & Actions;

export const createCatalogGuildSlice: StateCreator<CatalogGuildSlice, [], [], CatalogGuildSlice> = set => ({
    ...CatalogGuildSliceInitialState,
    setGuildSelectorWidget: guildSelectorWidget => set({ guildSelectorWidget }),
    unregisterGuildSelectorWidget: guildSelectorWidget => set(x => ((x.guildSelectorWidget === guildSelectorWidget) ? { guildSelectorWidget: undefined } : x)),
});
