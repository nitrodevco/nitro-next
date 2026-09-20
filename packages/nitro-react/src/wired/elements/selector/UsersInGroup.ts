/**
 * `selectors/UsersInGroup` (USERS_IN_GROUP) - selects the members of the room's group
 * (`grouptype.0`) or of a chosen group of the user's own (`grouptype.1`, with the group dropdown).
 *
 * String param: the chosen group's id, or empty for the room's group. The dropdown lists the
 * user's groups from `GuildMemberships` (`ctx.guildMemberships`), which the view asks for when
 * the edit starts (at most once every `USERS_IN_GROUP_REQUEST_TIMEOUT` seconds,
 * `requestWiredGuildMemberships`).
 *
 * Flash sends the id only while the dropdown has it selected - that is, while the id is among the
 * listed groups (`_groupDropdown.selected` is null otherwise): a group the user has left, or a
 * save before `GuildMemberships` arrived, saves the room's group.
 */
import type { WiredElementDefinition } from '../../WiredElement';
import { SelectorCodes } from './selectorCodes';

/** `REQUEST_TIMEOUT` - seconds between two `GetGuildMembershipsMessageComposer`. */
export const USERS_IN_GROUP_REQUEST_TIMEOUT = 5;

export interface UsersInGroupSelectorForm {
    /** The radio: 0 the room's group, 1 the chosen group. */
    groupType: number;
    /** `§_-W5§` / `_groupDropdown.selectedId`, -1 none. */
    groupId: number;
}

/** ActionScript's `int(string)` for a group id. */
const parseGroupId = (text: string): number => {
    const value = Number(text);

    return Number.isNaN(value) ? 0 : (value | 0);
};

export const usersInGroupSelector: WiredElementDefinition<UsersInGroupSelectorForm> = {
    holder: 'selector',
    code: SelectorCodes.USERS_IN_GROUP,
    createForm: triggerable => ({
        groupType: (triggerable.stringParam !== '') ? 1 : 0,
        groupId: (triggerable.stringParam === '') ? -1 : parseGroupId(triggerable.stringParam),
    }),
    readStringParam: (form, ctx) => (((form.groupType !== 1) || !ctx.guildMemberships.some(guild => guild.groupId === form.groupId)) ? '' : form.groupId.toString()),
};
