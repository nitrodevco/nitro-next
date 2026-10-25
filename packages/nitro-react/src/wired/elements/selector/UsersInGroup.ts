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
import { ActorIsGroupMemberConditionForm, createGroupMembershipForm, readGroupMembershipStringParam } from '../condition/ActorIsGroupMember';
import { SelectorCodes } from './selectorCodes';

/** `REQUEST_TIMEOUT` - seconds between two `GetGuildMembershipsMessageComposer`. */
export const USERS_IN_GROUP_REQUEST_TIMEOUT = 5;

/** Its body is `conditions/ActorIsGroupMember`'s: the form, the param and the view are that condition's. */
export const usersInGroupSelector: WiredElementDefinition<ActorIsGroupMemberConditionForm> = {
    holder: 'selector',
    code: SelectorCodes.USERS_IN_GROUP,
    createForm: createGroupMembershipForm,
    readStringParam: readGroupMembershipStringParam,
};
