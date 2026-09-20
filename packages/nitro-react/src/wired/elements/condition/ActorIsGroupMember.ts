/**
 * `conditions/ActorIsGroupMember` (`wf_cnd_actor_in_group`) - the user is a member of a group;
 * inverted (`NOT_ACTOR_IS_GROUP_MEMBER`, `wf_cnd_not_in_group`), is not.
 *
 * String param: the group id, or empty for the room's own group (`grouptype.0`). No int params.
 * The group dropdown lists the editing user's groups: the element asks for them with
 * `GetGuildMembershipsComposer` when the edit starts, at most every `REQUEST_TIMEOUT` seconds
 * (`requestWiredGuildMemberships`), and reads the answer from `ctx.guildMemberships` (Flash's
 * `onGuildMemberships`).
 *
 * Flash rebuilds the dropdown with the box's group preselected (`reinit(options, §_-W5§)`), so a
 * group the user is not in any more shows as no selection and saves as empty: `readStringParam`
 * sends the id only while it is one of `ctx.guildMemberships` (`_groupDropdown.selected`).
 */
import { WIRED_DROPDOWN_NO_SELECTION } from '../../common/expandableDropdown';
import type { WiredElementDefinition } from '../../WiredElement';
import { ConditionCodes } from './conditionCodes';

/** `ActorIsGroupMember.REQUEST_TIMEOUT` - seconds between two group list requests. */
export const ACTOR_IS_GROUP_MEMBER_REQUEST_TIMEOUT = 5;
/** The `groupselection` radio: the room's group, or the one picked in the dropdown. */
export const ACTOR_IS_GROUP_MEMBER_ROOM_GROUP = 0;
export const ACTOR_IS_GROUP_MEMBER_PICKED_GROUP = 1;

export interface ActorIsGroupMemberConditionForm {
    /** `ACTOR_IS_GROUP_MEMBER_ROOM_GROUP` or `ACTOR_IS_GROUP_MEMBER_PICKED_GROUP`. */
    groupType: number;
    /** The dropdown's `selectedId`: a group id, or `WIRED_DROPDOWN_NO_SELECTION`. */
    groupId: number;
}

export const actorIsGroupMemberCondition: WiredElementDefinition<ActorIsGroupMemberConditionForm> = {
    holder: 'condition',
    code: ConditionCodes.ACTOR_IS_GROUP_MEMBER,
    negativeCode: ConditionCodes.NOT_ACTOR_IS_GROUP_MEMBER,
    createForm: triggerable => ({
        groupType: (triggerable.stringParam !== '') ? ACTOR_IS_GROUP_MEMBER_PICKED_GROUP : ACTOR_IS_GROUP_MEMBER_ROOM_GROUP,
        // `int(stringParam)`: anything that is not a number is 0.
        groupId: (triggerable.stringParam === '') ? WIRED_DROPDOWN_NO_SELECTION : ((Number(triggerable.stringParam) | 0)),
    }),
    readStringParam: (form, ctx) => {
        if (form.groupType !== ACTOR_IS_GROUP_MEMBER_PICKED_GROUP) return '';

        if (!ctx.guildMemberships.some(guild => guild.groupId === form.groupId)) return '';

        return form.groupId.toString();
    },
};
