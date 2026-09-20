/**
 * `addons/GlobalPlaceholderAddon` (GLOBAL_PLACEHOLDER) - a `$(name)` placeholder with a fixed
 * text: typed (`from_value`, up to 100 characters) or taken from a placeholder another room
 * shares (`from_another_room`: a room, then one of its placeholders), the rooms and their
 * placeholders coming with the box (`wiredContext.referencePlaceholderList`).
 *
 * Int params: `[ mode, 0, room id ]` - the room id is 0 for a typed value. String param: the name,
 * `\t`, then the typed text or the shared placeholder's name.
 *
 * Without a shared placeholder list the "another room" option is disabled, and so is the typed
 * one when the box was saved with another room (`onEditStart`). Picking a shared placeholder
 * names this one after it while the name is empty or still the previous pick's name
 * (`onPlaceholderSelected`). A room pick rebuilds the placeholder drop-down with nothing selected
 * (`initPlaceholdersForRoom`).
 *
 * Flash sorts the rooms with a comparator typed for strings, which compares every option as the
 * same `[object ExpandableDropdownOption]` text and so leaves them in the order they came.
 */
import type { ISharedGlobalPlaceholderList } from '@nitrodevco/nitro-packets';

import type { WiredDropdownOption } from '../../common/expandableDropdown';
import { normalizeWiredVariableName } from '../../common/WiredVariableSections';
import type { WiredElementDefinition } from '../../WiredElement';
import { getWiredInt, getWiredString, type WiredTriggerable } from '../../WiredTriggerable';
import { AddonCodes } from './addonCodes';
import { readWiredDropdownSelectedId, reinitWiredDropdownSelection } from './addonShared';

/** The radio's ids. */
export const GLOBAL_PLACEHOLDER_FROM_VALUE = 0;
export const GLOBAL_PLACEHOLDER_FROM_ANOTHER_ROOM = 1;
/** `TextInputParam("", 100)`. */
export const GLOBAL_PLACEHOLDER_VALUE_MAX_LENGTH = 100;

export interface GlobalPlaceholderAddonForm {
    name: string;
    /** `§_-u1p§` - `GLOBAL_PLACEHOLDER_FROM_VALUE` or `_FROM_ANOTHER_ROOM`. */
    mode: number;
    /** `§_-GH§` - the typed text. */
    value: string;
    /** `setOptionDisabled(0, ...)` / `(1, ...)`, fixed when the edit starts. */
    valueOptionDisabled: boolean;
    anotherRoomOptionDisabled: boolean;
    roomOptions: WiredDropdownOption[];
    /** The room drop-down's selection - a room id. */
    roomId: number;
    /** The placeholder drop-down's options, ids being their index. */
    placeholderOptions: WiredDropdownOption[];
    placeholderId: number;
    /** `§_-T2V§` - the name of the shared placeholder picked last, `null` before one is. */
    previousPlaceholderName: string | null;
}

/** `findRooms` - every room with a shared placeholder, once. */
export const globalPlaceholderRooms = (list: ISharedGlobalPlaceholderList | undefined): WiredDropdownOption[] => {
    const rooms: WiredDropdownOption[] = [];

    for (const placeholder of list?.sharedPlaceholders ?? []) {
        if (!rooms.some(room => room.id === placeholder.roomId)) rooms.push({ id: placeholder.roomId, label: placeholder.roomName });
    }

    return rooms;
};

/** `initPlaceholdersForRoom` - the room's placeholders, and the index of the one named `selectedName`. */
const placeholdersForRoom = (list: ISharedGlobalPlaceholderList | undefined, roomId: number, selectedName: string | null): { options: WiredDropdownOption[]; selected: number } => {
    const options: WiredDropdownOption[] = [];
    let selected = -1;

    for (const placeholder of list?.sharedPlaceholders ?? []) {
        if (placeholder.roomId !== roomId) continue;

        if ((selectedName !== null) && (placeholder.placeholderName === selectedName)) selected = options.length;

        options.push({ id: options.length, label: placeholder.placeholderName });
    }

    return { options, selected: reinitWiredDropdownSelection(options.map(option => option.id), selected) };
};

/** The room drop-down's change callback. */
export const selectGlobalPlaceholderRoom = (form: GlobalPlaceholderAddonForm, list: ISharedGlobalPlaceholderList | undefined, roomId: number): GlobalPlaceholderAddonForm => {
    const { options, selected } = placeholdersForRoom(list, roomId, null);

    return { ...form, roomId, placeholderOptions: options, placeholderId: selected };
};

/** `onPlaceholderSelected`. */
export const selectGlobalPlaceholder = (form: GlobalPlaceholderAddonForm, placeholderId: number): GlobalPlaceholderAddonForm => {
    const pickedName = form.placeholderOptions.find(option => option.id === placeholderId)?.label ?? null;
    const renames = (form.name.length === 0) || ((form.previousPlaceholderName !== null) && (form.previousPlaceholderName === form.name));

    return {
        ...form,
        placeholderId,
        name: renames ? normalizeWiredVariableName(pickedName ?? '') : form.name,
        previousPlaceholderName: pickedName,
    };
};

const selectedPlaceholderName = (form: GlobalPlaceholderAddonForm): string | null =>
    form.placeholderOptions.find(option => option.id === form.placeholderId)?.label ?? null;

export const globalPlaceholderAddon: WiredElementDefinition<GlobalPlaceholderAddonForm> = {
    holder: 'addon',
    code: AddonCodes.GLOBAL_PLACEHOLDER,
    createForm: (triggerable: WiredTriggerable) => {
        const list = triggerable.wiredContext.referencePlaceholderList;
        const mode = getWiredInt(triggerable, 0);
        const form: GlobalPlaceholderAddonForm = {
            name: normalizeWiredVariableName(getWiredString(triggerable, 0)),
            mode,
            value: '',
            valueOptionDisabled: !list && (mode === GLOBAL_PLACEHOLDER_FROM_ANOTHER_ROOM),
            anotherRoomOptionDisabled: !list,
            roomOptions: [],
            roomId: -1,
            placeholderOptions: [],
            placeholderId: -1,
            previousPlaceholderName: null,
        };

        if (mode === GLOBAL_PLACEHOLDER_FROM_VALUE) {
            return { ...form, value: getWiredString(triggerable, 1), roomOptions: list ? globalPlaceholderRooms(list) : [] };
        }

        const roomOptions = globalPlaceholderRooms(list);
        const roomId = reinitWiredDropdownSelection(roomOptions.map(option => option.id), getWiredInt(triggerable, 2));

        if (!roomOptions.some(option => option.id === roomId)) return { ...form, roomOptions, roomId };

        const { options, selected } = placeholdersForRoom(list, roomId, getWiredString(triggerable, 1));
        const withPlaceholders = { ...form, roomOptions, roomId, placeholderOptions: options, placeholderId: selected };

        return { ...withPlaceholders, previousPlaceholderName: selectedPlaceholderName(withPlaceholders) };
    },
    readIntParams: form => [ form.mode, 0, (form.mode === GLOBAL_PLACEHOLDER_FROM_VALUE) ? 0 : readWiredDropdownSelectedId(form.roomId) ],
    readStringParam: (form) => {
        if (form.mode === GLOBAL_PLACEHOLDER_FROM_VALUE) return `${form.name}\t${form.value}`;

        return `${form.name}\t${selectedPlaceholderName(form) ?? ''}`;
    },
};
