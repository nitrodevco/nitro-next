/**
 * The wired setup dialog's controller - Flash's `wired_setup/UserDefinedRoomEventsCtrl`, with the
 * parts of `HabboUserDefinedRoomEvents` that feed it (`stuffSelected`, `userSelected`). Every
 * public method of the Flash class is a function here, named for what it does; the state they
 * share is `WiredSetupSlice` / `WiredClipboardSlice`.
 *
 * What Flash did to widgets is done to data: `onEditStart` is the element's `createForm`, the
 * common widgets (delay slider, selector options, quantifier radio, source pickers) edit the
 * triggerable copy in the store, and `save` reads both back. `WiredConfigurationCache` is not
 * ported: Flash cached each built window tree per box type because building one was slow, and a
 * React tree needs no such cache. The one thing the cache let leak from edit to edit - which
 * sections of a box type were left collapsed - is therefore not carried over either.
 */
import { RoomObjectCategoryEnum, RoomObjectVariableEnum } from '@nitrodevco/nitro-api';
import type { IWiredVariable } from '@nitrodevco/nitro-packets';
import { ApplySnapshotComposer, GetGuildMembershipsComposer, ProgressTreasureHuntComposer, UpdateActionComposer, UpdateAddonComposer, UpdateConditionComposer, UpdateSelectorComposer, UpdateTriggerComposer, UpdateVariableComposer, WiredClickUserComposer } from '@nitrodevco/nitro-packets';

import { WebSocketConnection } from '#base/context/communication';
import { notificationStore } from '#base/context/notifications';
import { getRoom, roomStore } from '#base/context/room';
import { systemStore } from '#base/context/system';
import { userStore } from '#base/context/user';
import { getWiredElementMemory, getWiredHasWritePermission, getWiredMenuEnabled, WIRED_FURNI_PICKS_1, WIRED_UPDATE_MODE_NORMAL, WIRED_UPDATE_MODE_SAVE_INTO_OTHER, WIRED_UPDATE_MODE_SAVE_WITHOUT_CLOSING, WiredClipboardEntry, wiredClipboardKey, WiredSetupSession, wiredStore } from '#base/context/wired';
import { allowFurniSelection, forcesFurniSelection, getWiredRoomVariables, isDualFurniPickingMode, rememberPickedVariables, stepInputSource, switchMergedSourceType, usingCustomInputSources, WIRED_QUANTIFIER_NONE, wiredConfigString, WiredElementContext, WiredHolderKey, WiredTriggerable } from '#base/wired';
import { getWiredElementByCode } from '#base/wired/WiredElementRegistry';

import { openClientLink } from './clientLinkCommands';
import { wiredMenuFurniSelected, wiredMenuUserSelected } from './wiredMenuInspectionCommands';
import { getAllWiredVariables, removeWiredVariablesListener } from './wiredSynchronizerCommands';

type Send = WebSocketConnection['send'];

/** `time_display` of the copy / paste / save bubbles. */
const NOTIFICATION_TIME_DISPLAY_MS = 2500;

const notifyWired = (text: string) => notificationStore.getState().addNotification(text, 'wired', undefined, undefined, { timeDisplay: NOTIFICATION_TIME_DISPLAY_MS });

/** What an element may ask of its surroundings - built when it is needed, so it is never a packet behind. */
export const getWiredElementContext = (): WiredElementContext => {
    const { getLocalizationValue, config } = systemStore.getState();
    const { guildMemberships, wiredAchievements, elementMemory } = wiredStore.getState();

    return {
        localize: (key, replacements) => getLocalizationValue(key, key, replacements),
        configBoolean: key => config[key] === true,
        configString: key => wiredConfigString(config[key]),
        menuEnabled: getWiredMenuEnabled(),
        hasWritePermission: getWiredHasWritePermission(),
        userId: userStore.getState().userId,
        roomId: getRoom()?.roomId ?? 0,
        guildMemberships,
        achievementsInRoom: wiredAchievements,
        elementMemory: (holder, code) => getWiredElementMemory(elementMemory, holder, code),
    };
};

/** `isStuffSelectionMode` - room clicks pick furni for this box. */
export const isWiredStuffSelectionMode = (setup: WiredSetupSession): boolean =>
    allowFurniSelection(setup.triggerable.inputSourcesConf) || forcesFurniSelection(setup.entry.definition, setup.form);

/** `isUsingAdvancedSettings`. */
const isUsingAdvancedSettings = (triggerable: WiredTriggerable, setup: Pick<WiredSetupSession, 'entry' | 'form'>): boolean =>
    usingCustomInputSources(triggerable) || (setup.entry.definition.usingCustomAdvancedSettings?.(setup.form) ?? false);

/** `activeStuffsArray` - the pick list room clicks go to. */
const activeStuffsKey = (setup: WiredSetupSession): 'stuffIds1' | 'stuffIds2' =>
    ((!isDualFurniPickingMode(setup.triggerable.inputSourcesConf) || (setup.activeFurniPicks === WIRED_FURNI_PICKS_1)) ? 'stuffIds1' : 'stuffIds2');

/** `hideFurniHighlights`. */
const hideFurniHighlights = (setup: WiredSetupSession) => {
    const highLighter = getRoom()?.objectHighLighter;

    highLighter?.hideAll(setup.stuffIds1, true, 1);
    highLighter?.hideAll(setup.stuffIds2, true, 2);
};

/** `UserDefinedRoomEventsCtrl.close` - also Flash's answer to `CloseConnection` and `REE_DISPOSED`. */
export const closeWiredSetup = () => {
    const { setup, closeSetup, pendingVariablesListener, setPendingVariablesListener } = wiredStore.getState();

    if (setup) {
        getRoom()?.objectHighLighter.unhighlightActiveWired(setup.triggerable.id);

        hideFurniHighlights(setup);
        closeSetup();
    }

    if (pendingVariablesListener) {
        removeWiredVariablesListener(pendingVariablesListener);
        setPendingVariablesListener(undefined);
    }
};

/**
 * `synchronizeTriggerable` - a box whose context lists the room's variables carries only their
 * hash; the list comes from the synchronizer, and the dialog opens once it is there.
 */
const synchronizeTriggerable = (send: Send, triggerable: WiredTriggerable): boolean => {
    const variablesList = triggerable.wiredContext.roomVariablesList;

    if (!variablesList || variablesList.variables) return false;

    const { pendingVariablesListener, setPendingVariablesListener } = wiredStore.getState();

    if (pendingVariablesListener) removeWiredVariablesListener(pendingVariablesListener);

    const listener = (variables: IWiredVariable[]) => {
        wiredStore.getState().setPendingVariablesListener(undefined);

        prepareWiredForUpdate(send, {
            ...triggerable,
            wiredContext: { ...triggerable.wiredContext, roomVariablesList: { ...variablesList, variables } },
        });
    };

    // Set before asking: a fresh cache answers on the spot, and the listener clears what is set here.
    setPendingVariablesListener(listener);

    getAllWiredVariables(send, listener, true, variablesList.hash);

    return true;
};

/**
 * `UserDefinedRoomEventsCtrl.prepareForUpdate` - one of the six `WiredFurni*` packets arrived
 * (or the box is being re-opened after a paste or a reset). In "paste into" mode the box is not
 * opened: the form being edited is saved onto it, provided it is the same type of box.
 */
export const prepareWiredForUpdate = (send: Send, triggerable: WiredTriggerable) => {
    const open = wiredStore.getState().setup;

    if (open?.copyIntoMode) {
        if (getWiredElementByCode(triggerable.holder, triggerable.code) === open.entry) updateWired(send, WIRED_UPDATE_MODE_SAVE_INTO_OTHER, triggerable.id);
        else notifyWired('${notification.wired.pasted_into_fail}');

        return;
    }

    if (synchronizeTriggerable(send, triggerable)) return;

    if (open) closeWiredSetup();

    // `createWindow` returns false for a code no element serves, and nothing opens.
    const entry = getWiredElementByCode(triggerable.holder, triggerable.code);

    if (!entry) return;

    const highLighter = getRoom()?.objectHighLighter;
    const form = entry.definition.createForm(triggerable, getWiredElementContext());
    const stuffIds1 = [ ...triggerable.stuffIds ];
    const stuffIds2 = [ ...triggerable.stuffIds2 ];

    highLighter?.highlightActiveWired(triggerable.id);

    if (isDualFurniPickingMode(triggerable.inputSourcesConf)) {
        highLighter?.showAll(stuffIds1, true, 1);
        highLighter?.showAll(stuffIds2, true, 2);
    } else {
        highLighter?.showAll(stuffIds1, false, 0);
    }

    wiredStore.getState().openSetup({
        triggerable,
        entry,
        form,
        stuffIds1,
        stuffIds2,
        activeFurniPicks: WIRED_FURNI_PICKS_1,
        // `onEditStartUpdateCommonUI`: open when the box uses anything the advanced settings hold.
        advancedExpanded: triggerable.advancedMode && (isUsingAdvancedSettings(triggerable, { entry, form }) || (entry.definition.advancedAlwaysVisible ?? false)),
        copyIntoMode: false,
        mergedSelectionCache: {},
    });
};

/** `HabboUserDefinedRoomEvents.roomObjectAddedHandler` -> `stuffAdded`: a picked furni that (re)appears gets its look back. */
export const wiredStuffAdded = (stuffId: number) => {
    const setup = wiredStore.getState().setup;

    if (!setup || !setup[activeStuffsKey(setup)].includes(stuffId)) return;

    getRoom()?.objectHighLighter.show(stuffId, isDualFurniPickingMode(setup.triggerable.inputSourcesConf), setup.activeFurniPicks);
};

/** `UserDefinedRoomEventsCtrl.stuffSelected` - a room click picks or unpicks a furni for the box being edited. */
const pickWiredStuff = (stuffId: number) => {
    const { setup, patchSetup } = wiredStore.getState();

    if (!setup || setup.copyIntoMode) return;
    if (!isWiredStuffSelectionMode(setup) || (!setup.triggerable.allowWallFurni && (stuffId < 0))) return;

    const highLighter = getRoom()?.objectHighLighter;
    const dualPicking = isDualFurniPickingMode(setup.triggerable.inputSourcesConf);
    const key = activeStuffsKey(setup);
    const picked = setup[key];

    if (picked.includes(stuffId)) {
        patchSetup({ [key]: picked.filter(id => id !== stuffId) });
        highLighter?.hide(stuffId, dualPicking, setup.activeFurniPicks);
    } else if (picked.length < setup.triggerable.furniLimit) {
        patchSetup({ [key]: [ ...picked, stuffId ] });
        highLighter?.show(stuffId, dualPicking, setup.activeFurniPicks);
    }
};

/**
 * `HabboUserDefinedRoomEvents.stuffSelected` - a furni was selected in the room; wall items come
 * as negative ids. The selection the engine makes by itself of a furni that was just placed is
 * not a pick: it is swallowed once, together with the placed object data it came from. Otherwise
 * the setup dialog and then the wired menu (`WiredMenuController.furniSelected`) are told.
 */
export const wiredStuffSelected = (send: Send, stuffId: number) => {
    const { placedObject, setPlacedObject } = roomStore.getState();

    if (placedObject && (placedObject.objectId === -stuffId)) {
        setPlacedObject(undefined);

        return;
    }

    pickWiredStuff(stuffId);
    wiredMenuFurniSelected(send, stuffId);
};

/** `HabboUserDefinedRoomEvents.userSelected` - a user was selected in the room, by room index. */
export const wiredUserSelected = (send: Send, roomIndex: number) => {
    if (wiredStore.getState().hasClickUserWired) send(new WiredClickUserComposer({ userIndex: roomIndex }));

    wiredMenuUserSelected(send, roomIndex);
};

/** `UserDefinedRoomEventsCtrl.stuffRemoved` - `ObjectRemove`: the box itself going closes the dialog, a picked furni going leaves the picks. */
export const wiredStuffRemoved = (stuffId: number) => {
    const { setup, patchSetup } = wiredStore.getState();

    if (!setup) return;

    if (setup.triggerable.id === stuffId) {
        closeWiredSetup();

        return;
    }

    if (setup.stuffIds1.includes(stuffId) || setup.stuffIds2.includes(stuffId)) {
        patchSetup({ stuffIds1: setup.stuffIds1.filter(id => id !== stuffId), stuffIds2: setup.stuffIds2.filter(id => id !== stuffId) });
    }
};

/** `clearStuffPicks`. */
export const clearWiredStuffPicks = () => {
    const { setup, patchSetup } = wiredStore.getState();

    if (!setup) return;

    hideFurniHighlights(setup);
    patchSetup({ stuffIds1: [], stuffIds2: [] });
};

/** `resetToDefault` - the box as the server would hand out a new one, re-opened in place. */
export const resetWiredToDefault = (send: Send) => {
    const setup = wiredStore.getState().setup;

    if (!setup) return;

    const { triggerable } = setup;

    prepareWiredForUpdate(send, {
        ...triggerable,
        intParams: [ ...triggerable.defaultIntParams ],
        stringParam: '',
        // Flash means one 0 per variable slot (its loop compares the counter with the array itself, not its length).
        variableIds: triggerable.variableIds.map(() => '0'),
        stuffIds: [],
        stuffIds2: [],
        furniSourceTypes: [ ...triggerable.inputSourcesConf.defaultFurniSources ],
        userSourceTypes: [ ...triggerable.inputSourcesConf.defaultUserSources ],
        delayInPulses: 0,
        quantifierCode: 0,
        isFilter: false,
        isInvert: false,
    });
};

/** `getActionDelay` - 0 for a box without a delay slider. */
const resolveActionDelay = ({ triggerable, entry }: WiredSetupSession): number =>
    (((triggerable.holder === 'action') && (entry.definition.allowDelaying ?? true)) ? triggerable.delayInPulses : 0);

/** `resolveQuantifier` - 0 for a box without the quantifier radio, which only advanced mode conditions with a quantifier have. */
const resolveQuantifier = ({ triggerable }: WiredSetupSession): number =>
    (((triggerable.holder === 'condition') && triggerable.advancedMode && (triggerable.quantifierType !== WIRED_QUANTIFIER_NONE)) ? triggerable.quantifierCode : 0);

/**
 * `resolveIntParams` / `resolveStringParam` / `resolveVariableIds` - the element's `read*FromForm`,
 * with the side effects Flash's reads had: the element remembers what `rememberOnRead` says
 * (`§_-02a§.§_-V1A§`), and every variable a picker's `finalizeSelection` returned goes to the top
 * of the picker's recent tab (`NewVariablePickerHelper.addToHistory`).
 */
const readWiredForm = ({ triggerable, entry: { definition }, form }: WiredSetupSession): Pick<WiredClipboardEntry, 'intParams' | 'stringParam' | 'variableIds'> => {
    const ctx = getWiredElementContext();
    const intParams = definition.readIntParams?.(form, ctx) ?? [];
    const stringParam = definition.readStringParam?.(form, ctx) ?? '';
    const variableIds = definition.readVariableIds?.(form, ctx) ?? [];

    wiredStore.getState().rememberWiredElement(definition, definition.rememberOnRead?.(form));
    rememberPickedVariables(ctx.roomId, variableIds, getWiredRoomVariables(triggerable));

    return { intParams, stringParam, variableIds };
};

/** `createClipboardCopy` - what a save would send, kept under the box type. */
export const copyWiredToClipboard = () => {
    const { setup, setClipboardEntry } = wiredStore.getState();

    if (!setup) return;

    const { triggerable, entry: { definition } } = setup;

    setClipboardEntry(wiredClipboardKey(definition.holder, definition.code), {
        ...readWiredForm(setup),
        stuffIds: [ ...setup.stuffIds1 ],
        stuffIds2: [ ...setup.stuffIds2 ],
        furniSourceTypes: [ ...triggerable.furniSourceTypes ],
        userSourceTypes: [ ...triggerable.userSourceTypes ],
        delayInPulses: resolveActionDelay(setup),
        quantifierCode: resolveQuantifier(setup),
        isFilter: (triggerable.holder === 'selector') && triggerable.isFilter,
        isInvert: (triggerable.holder === 'selector') && triggerable.isInvert,
    });

    notifyWired('${notification.wired.copied}');
};

/** `pasteFromClipboard` - the copy taken from a box of this type, re-opened in place. */
export const pasteWiredFromClipboard = (send: Send) => {
    const { setup, clipboard } = wiredStore.getState();

    if (!setup) return;

    const { triggerable, entry: { definition } } = setup;
    const copy = clipboard[wiredClipboardKey(definition.holder, definition.code)];

    if (!copy) return;

    prepareWiredForUpdate(send, {
        ...triggerable,
        intParams: [ ...copy.intParams ],
        stringParam: copy.stringParam,
        variableIds: [ ...copy.variableIds ],
        stuffIds: [ ...copy.stuffIds ],
        stuffIds2: [ ...copy.stuffIds2 ],
        furniSourceTypes: [ ...copy.furniSourceTypes ],
        userSourceTypes: [ ...copy.userSourceTypes ],
        delayInPulses: (triggerable.holder === 'action') ? copy.delayInPulses : triggerable.delayInPulses,
        quantifierCode: (triggerable.holder === 'condition') ? copy.quantifierCode : triggerable.quantifierCode,
        isFilter: (triggerable.holder === 'selector') ? copy.isFilter : triggerable.isFilter,
        isInvert: (triggerable.holder === 'selector') ? copy.isInvert : triggerable.isInvert,
    });
};

/**
 * `UserDefinedRoomEventsCtrl.update` - validates the form and sends the save. `targetId` is the
 * box saved onto, the one being edited unless this is a "paste into".
 */
export const updateWired = (send: Send, updateMode: number = WIRED_UPDATE_MODE_NORMAL, targetId: number = -1) => {
    const { setup, setUpdateMode } = wiredStore.getState();

    if (!setup) return;

    const { triggerable, entry: { definition }, form } = setup;
    const ctx = getWiredElementContext();
    const error = definition.validate?.(form, ctx) ?? null;

    if (error !== null) {
        const { showAlert, interpolate } = systemStore.getState();

        showAlert(interpolate('${wiredfurni.error.title}'), interpolate(error));

        return;
    }

    setUpdateMode(updateMode);

    const params = {
        id: (targetId === -1) ? triggerable.id : targetId,
        ...readWiredForm(setup),
        stuffIds: setup.stuffIds1,
        stuffIds2: setup.stuffIds2,
        furniSourceTypes: triggerable.furniSourceTypes,
        userSourceTypes: triggerable.userSourceTypes,
    };

    switch (triggerable.holder) {
        case 'trigger': send(new UpdateTriggerComposer(params)); break;
        case 'action': send(new UpdateActionComposer({ ...params, delayInPulses: resolveActionDelay(setup) })); break;
        case 'condition': send(new UpdateConditionComposer({ ...params, quantifierCode: resolveQuantifier(setup) })); break;
        case 'addon': send(new UpdateAddonComposer(params)); break;
        case 'selector': send(new UpdateSelectorComposer({ ...params, isFilter: triggerable.isFilter, isInvert: triggerable.isInvert })); break;
        case 'variable': send(new UpdateVariableComposer(params)); break;
    }
};

/** `isOwner` - whether the box being saved belongs to this user. */
const isOwnWired = (stuffId: number): boolean => {
    const ownerId = getRoom()?.getRoomObject(stuffId, RoomObjectCategoryEnum.Floor)?.model.getValue<number>(RoomObjectVariableEnum.FurnitureOwnerId);

    return (ownerId !== undefined) && (Number(ownerId) === userStore.getState().userId);
};

/**
 * `UserDefinedRoomEventsCtrl.save` - the footer's save button. At most one confirmation is asked
 * for, in Flash's order: an inverted selector that does not filter selects "everything else in
 * the room"; someone else's wired, once per session; then whatever the element itself wants
 * confirmed. Confirming any of them also counts as the non-owner confirmation (`confirmCallback`).
 */
export const saveWired = (send: Send) => {
    const { setup, nonOwnerConfirmed, setNonOwnerConfirmed } = wiredStore.getState();

    if (!setup) return;

    const { triggerable, entry: { definition }, form } = setup;
    const { showConfirm, interpolate } = systemStore.getState();

    const confirm = (title: string, body: string) => showConfirm(interpolate(title), interpolate(body), () => {
        setNonOwnerConfirmed(true);

        // `isEditing()`: the dialog may have gone while the question was up.
        if (wiredStore.getState().setup) updateWired(send);
    });

    if ((triggerable.holder === 'selector') && triggerable.isInvert && !triggerable.isFilter) {
        confirm('${wiredfurni.danger.1.change.confirm.title}', '${wiredfurni.danger.1.change.confirm.body}');

        return;
    }

    if (!isOwnWired(triggerable.id) && !nonOwnerConfirmed) {
        confirm('${wiredfurni.nonowner.change.confirm.title}', '${wiredfurni.nonowner.change.confirm.body}');

        return;
    }

    const confirmation = definition.requireConfirmation?.(form, getWiredElementContext()) ?? null;

    if (confirmation) confirm(confirmation.title, confirmation.body);
    else updateWired(send);
};

/** The quick menu's "save": `update(1)`, which leaves the dialog open. */
export const saveWiredWithoutClosing = (send: Send) => updateWired(send, WIRED_UPDATE_MODE_SAVE_WITHOUT_CLOSING);

/** `onSaveSuccess` - `WiredSaveSuccess`. */
export const onWiredSaveSuccess = () => {
    const { updateMode, setUpdateMode } = wiredStore.getState();

    if (updateMode === WIRED_UPDATE_MODE_NORMAL) closeWiredSetup();
    else if (updateMode === WIRED_UPDATE_MODE_SAVE_WITHOUT_CLOSING) notifyWired('${notification.wired.saved}');
    else if (updateMode === WIRED_UPDATE_MODE_SAVE_INTO_OTHER) notifyWired('${notification.wired.pasted_into}');

    setUpdateMode(WIRED_UPDATE_MODE_NORMAL);
};

/** `onSaveFailure` - `WiredValidationError`. A failed "paste into" stays armed; Flash only resets the save-without-closing mode. */
export const onWiredSaveFailure = () => {
    const { updateMode, setUpdateMode } = wiredStore.getState();

    if (updateMode === WIRED_UPDATE_MODE_SAVE_WITHOUT_CLOSING) setUpdateMode(WIRED_UPDATE_MODE_NORMAL);
};

/** `applySnapshot` - the header button of a box with a state snapshot. */
export const applyWiredSnapshot = (send: Send) => {
    const setup = wiredStore.getState().setup;

    if (setup) send(new ApplySnapshotComposer({ id: setup.triggerable.id }));
};

/** `viewVariableInMenu` - the header button of a variable box that already has a name. */
export const viewWiredVariableInMenu = (send: Send) => {
    const setup = wiredStore.getState().setup;
    const variableName = setup?.entry.definition.initialVariableName?.(setup.form) ?? '';

    if (variableName.length) openClientLink(send, `wiredmenu/open/variable_overview/${variableName}`);
};

/**
 * `FramePreset.onEraseClick` - the RESET box's "Erase from existence" menu item: a step of the
 * `wf15` treasure hunt (the token is the box's holder key and code, `action1`), then the dialog
 * closes. Nothing is erased.
 */
export const eraseWiredFromExistence = (send: Send) => {
    const setup = wiredStore.getState().setup;

    if (!setup) return;

    send(new ProgressTreasureHuntComposer({ huntId: 'wf15', token: `${setup.entry.definition.holder}${setup.entry.definition.code}` }));

    closeWiredSetup();
};

/** `WiredInputSourcePicker.onChangeInputSource` - an input source section's arrows. */
export const stepWiredInputSource = (baseSourceType: number, id: number, forward: boolean) => {
    const { setup, patchSetupTriggerable } = wiredStore.getState();

    if (!setup) return;

    const patch = stepInputSource({ ...setup, definition: setup.entry.definition }, baseSourceType, id, forward);

    if (patch) patchSetupTriggerable(patch);
};

/**
 * `UserDefinedRoomEventsCtrl.setMergedSourceType` - a merged section (or an element drawing its
 * own type picker, through `WrappedSourceTypeListener`) switched between furni, users and the
 * element's custom sources.
 */
export const setWiredMergedSourceType = (id: number, sourceType: number) => {
    const { setup, patchSetup } = wiredStore.getState();

    if (!setup) return;

    const result = switchMergedSourceType({ ...setup, definition: setup.entry.definition }, id, sourceType, setup.mergedSelectionCache[id] ?? {});

    patchSetup({
        form: result.form,
        triggerable: { ...setup.triggerable, ...result.triggerable },
        mergedSelectionCache: { ...setup.mergedSelectionCache, [id]: result.cache },
    });
};

/** `viewLogs` - the header button of a `WriteToLogs` box. */
export const viewWiredLogs = (send: Send) => openClientLink(send, 'wiredmenu/logs');

/** `openApiDocs` - the header button of a `VariablesWebApiAddon` box: `HabboWebTools.openWebPageAndMinimizeClient(getProperty("wired.api.docs.link"))`. */
export const openWiredApiDocs = () => {
    const link = wiredConfigString(systemStore.getState().config['wired.api.docs.link']);

    if (link.length) window.open(link, '_blank', 'noopener');
};

/**
 * `maybeGetGuildMemberships` of `ActorIsGroupMember` / `UsersInGroup` - on each edit, ask for the
 * user's groups unless this element asked less than `timeoutSeconds` ago. When it last asked
 * (`§_-7g§`) is the element's own, so it lives in the element's memory.
 */
export const requestWiredGuildMemberships = (send: Send, definition: { holder: WiredHolderKey; code: number }, timeoutSeconds: number) => {
    const { elementMemory, rememberWiredElement } = wiredStore.getState();
    const requestedAt = getWiredElementMemory(elementMemory, definition.holder, definition.code).guildsRequestedAt;
    const now = Date.now();

    if ((typeof requestedAt === 'number') && (now <= (requestedAt + (1000 * timeoutSeconds)))) return;

    rememberWiredElement(definition, { guildsRequestedAt: now });

    send(new GetGuildMembershipsComposer({}));
};
