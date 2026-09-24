// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

/**
 * `GetGuildMembersMessageComposer`'s own constants: which rows a page asks for. The members
 * window's type dropmenu passes its selection straight through, so these are its option order.
 */
export const GUILD_MEMBER_SEARCH_MEMBERS = 0;
export const GUILD_MEMBER_SEARCH_ADMINS = 1;
export const GUILD_MEMBER_SEARCH_PENDING = 2;
export const GUILD_MEMBER_SEARCH_BLOCKED = 3;

export type GetGuildMembersComposerType = {
    groupId: number;
    pageIndex: number;
    /** The user name filter the window's search box holds. */
    searchText: string;
    /** One of the `GUILD_MEMBER_SEARCH_*` values. */
    searchType: number;
};

export class GetGuildMembersComposer implements IOutgoingPacket<GetGuildMembersComposerType> {
    public constructor(private params: GetGuildMembersComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.groupId,
            this.params.pageIndex,
            this.params.searchText,
            this.params.searchType,
        ];
    }
}
