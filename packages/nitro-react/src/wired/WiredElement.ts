/**
 * The contract every wired box type is ported against - Flash's element interface
 * (`com.sulake.habbo.roomevents.wired_setup.§_-P2f§`, implemented by `DefaultElement`) and its
 * per-holder extensions (`ActionType.allowDelaying`, the variable element's `initialVariableName`,
 * the header source type selector of `§_-J2U§`).
 *
 * Flash elements are stateful widget trees: `buildInputs` creates presets, `onEditStart` pushes
 * the triggerable into them and `read*FromForm` pulls the values back out. Here the widget state
 * is a plain **form** object instead:
 *
 * - `createForm` is `onEditStart` - the triggerable's params decoded into named fields;
 * - `readIntParams` / `readVariableIds` / `readStringParam` are `read*FromForm` - pure functions of
 *   the form;
 * - the element's view (`views/wired-setup/elements/**`) is `buildInputs` - it renders the form
 *   with the wired kit and edits it through `setForm`.
 *
 * The form lives in the wired store while a box is being edited, so copy/paste, reset and the
 * save path read it without reaching into a component. Everything Flash exposed as a getter that
 * could depend on the element's state is a function of the form here.
 */
import type { FC } from 'react';

import type { WiredTriggerable } from './WiredTriggerable';

/** `§_-L1T§.getKey()` - which of the six element holders a box belongs to. */
export type WiredHolderKey = 'trigger' | 'action' | 'condition' | 'addon' | 'selector' | 'variable';

/** `WiredInputSourcePicker.§_-Y2L§` / `USER_SOURCE` / `MERGED_SOURCE` - what an input source section selects. */
export const WIRED_SOURCE_FURNI = 0;
export const WIRED_SOURCE_USER = 1;
export const WIRED_SOURCE_MERGED = 2;

/**
 * What one element instance remembers between edits - the fields a Flash element keeps and
 * `onEditStart` does not reset (see `WiredElementMemorySlice`). Each element reads its own
 * entries and names them itself.
 */
export type WiredElementMemory = Readonly<Record<string, unknown>>;

/** `HabboGroupEntryData`'s fields an element's group dropdown lists (`GuildMembershipsMessageEvent.guilds`). */
export interface WiredGuildMembership {
    groupId: number;
    groupName: string;
}

/** What an element may ask of its surroundings without importing a store. */
export interface WiredElementContext {
    /** `localization.getLocalization(key, key)` with optional `%param%` replacements. */
    localize: (key: string, replacements?: Record<string, string>) => string;
    /** `getBoolean(key)` on the component context. */
    configBoolean: (key: string) => boolean;
    /** `getProperty(key)` on the component context. */
    configString: (key: string) => string;
    /** `wiredMenu.isEnabled`. */
    menuEnabled: boolean;
    /** `wiredMenu.hasWritePermission`. */
    hasWritePermission: boolean;
    /** `sessionDataManager.userId`. */
    userId: number;
    roomId: number;
    /** The user's groups from the last `GuildMemberships` - what `onGuildMemberships` handed the group elements (`initGuilds`). */
    guildMemberships: readonly WiredGuildMembership[];
    /** `roomEvents.achievementsInRoom` - the room's achievements from `WiredEnvironment`. */
    achievementsInRoom: readonly string[];
    /** The memory of the element instance serving `holder` / `code` - `{}` until it remembers something. */
    elementMemory: (holder: WiredHolderKey, code: number) => WiredElementMemory;
}

/** `getProperty(key)`'s answer from the client config: a configured string, number or flag as text, `''` for anything else. */
export const wiredConfigString = (value: unknown): string =>
    (((typeof value === 'string') || (typeof value === 'number') || (typeof value === 'boolean')) ? String(value) : '');

/** The header button `UserDefinedRoomEventsCtrl.createHeader` picks by the element's class. */
export type WiredHeaderButton = 'none' | 'snapshot' | 'variable' | 'logs' | 'apiDocs';

/** `§_-J2U§` - an element with a source type selector in the frame header. */
export interface WiredHeaderSourceTypeSelector<F> {
    /** `getHeaderSourceTypeSelectorParam(triggerable)`'s option ids. */
    options: (triggerable: WiredTriggerable, ctx: WiredElementContext) => number[];
    /** `headerSourceType`. */
    get: (form: F) => number;
    set: (form: F, sourceType: number) => F;
}

export interface WiredElementDefinition<F> {
    holder: WiredHolderKey;
    /** `code` - the box type the server sends in the triggerable. */
    code: number;
    /** `negativeCode` - the inverted twin served by the same element (conditions, selectors). */
    negativeCode?: number;

    /** `onEditStart` (+ `onEditInitialized`): the triggerable decoded into the form. */
    createForm: (triggerable: WiredTriggerable, ctx: WiredElementContext) => F;
    /** `readIntParamsFromForm`. Default `[]`. */
    readIntParams?: (form: F, ctx: WiredElementContext) => number[];
    /** `readVariableIdsFromForm`. Default `[]`. */
    readVariableIds?: (form: F, ctx: WiredElementContext) => string[];
    /** `readStringParamFromForm`. Default `''`. */
    readStringParam?: (form: F, ctx: WiredElementContext) => string;
    /** `validate` - a localized message when the form cannot be saved, otherwise `null`. */
    validate?: (form: F, ctx: WiredElementContext) => string | null;
    /** `requireConfirmation` - a confirm dialog to show before saving (texts localized). */
    requireConfirmation?: (form: F, ctx: WiredElementContext) => { title: string; body: string } | null;

    /** `hasStateSnapshot` - shows the header's "apply snapshot" button and forces furni picking. */
    hasStateSnapshot?: boolean;
    /** `ActionType.allowDelaying` - actions only, default `true`. */
    allowDelaying?: boolean;
    /** `forceFurniSelection`. Default `hasStateSnapshot`. */
    forceFurniSelection?: (form: F) => boolean;
    /** `forceHidePickFurniInstructions`. Default `false`. */
    forceHidePickFurniInstructions?: boolean;
    /** `advancedAlwaysVisible()`. Default `false`. */
    advancedAlwaysVisible?: boolean;
    /** `usingCustomAdvancedSettings`. Default `false`. */
    usingCustomAdvancedSettings?: (form: F) => boolean;
    /** `widthModifier`. Default `1`. A function of the form for an element whose width follows its state (`InNeighborhood`'s big mode). */
    widthModifier?: number | ((form: F) => number);
    /** `allowScrolling`. Default `false`. */
    allowScrolling?: boolean;

    /** `furniSelectionTitle(id)` localization key. Default `wiredfurni.params.sources.furni.title`. */
    furniSelectionTitle?: (id: number) => string;
    /** `userSelectionTitle(id)` localization key. Default `wiredfurni.params.sources.users.title`. */
    userSelectionTitle?: (id: number) => string;
    /** `mergedSelections()` - `[ furniSelectionId, userSelectionId ]` pairs shown as one section. */
    mergedSelections?: [ number, number ][];
    /** `mergedSelectionTitle(id)` localization key. Default `wiredfurni.params.sources.merged.title`. */
    mergedSelectionTitle?: (id: number) => string;
    /** `getMergedType(id)`. */
    getMergedType?: (form: F, id: number) => number;
    /** `setMergedType(id, type)`. */
    setMergedType?: (form: F, id: number, sourceType: number) => F;
    /** `getCustomSourcesForMergedType(id)` - extra source types (`VariableExtraSourceTypes`). */
    getCustomSourcesForMergedType?: (id: number) => number[];
    /** `hasCustomTypePicker(id)` - the element draws the merged type picker itself. */
    hasCustomTypePicker?: (id: number) => boolean;
    /** `isInputSourceDisabled(id, sourceType)`. */
    isInputSourceDisabled?: (form: F, id: number, sourceType: number) => boolean;

    /** `§_-J2U§`. */
    headerSourceTypeSelector?: WiredHeaderSourceTypeSelector<F>;
    /** `WriteToLogs` shows the logs button, `VariablesWebApiAddon` the api docs button. */
    headerButton?: Extract<WiredHeaderButton, 'logs' | 'apiDocs'>;
    /**
     * The element fields Flash changes while the widgets are edited and keeps for the next edit
     * (a grown option list, a captured figure, a preferred size), as this form holds them. The
     * core merges the answer into the element's memory after `createForm` and every form change.
     */
    rememberOnEdit?: (form: F) => WiredElementMemory | null;
    /**
     * The element fields Flash's `read*FromForm` set as a side effect (`§_-02a§.§_-V1A§`). The core
     * merges the answer into the element's memory whenever it reads the form - a save or a copy.
     */
    rememberOnRead?: (form: F) => WiredElementMemory | null;

    /** The variable element's (`§_-RF§`) `initialVariableName` - shows "view in menu" when not empty. */
    initialVariableName?: (form: F) => string;
}

export interface WiredElementViewProps<F> {
    form: F;
    /** Merge a patch into the form, or replace it through an updater. */
    setForm: (update: Partial<F> | ((form: F) => F)) => void;
    triggerable: WiredTriggerable;
    ctx: WiredElementContext;
}

/** `buildInputs` - an element with `INPUTS_TYPE_NONE` has no view. */
export type WiredElementView<F> = FC<WiredElementViewProps<F>>;

/** One registry entry: the form type is erased, the registry only ever hands a form back to the element that made it. */
export interface WiredElementEntry {
    definition: WiredElementDefinition<unknown>;
    View?: WiredElementView<unknown>;
}

/** Pairs a definition with its view and erases the form type for the registry. */
export const defineWiredElement = <F>(definition: WiredElementDefinition<F>, View?: WiredElementView<F>): WiredElementEntry => ({
    definition: definition,
    View: View,
});
