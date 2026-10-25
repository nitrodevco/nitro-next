// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type WiredGetVariableOwnersPageComposerType = {
    /** `IWiredVariable.variableId` of a permanent user variable. */
    variableId: string;
    /** 1-based. */
    page: number;
    /** Flash sends `VariableManagementConfig.PAGE_SIZE`. */
    pageSize: number;
    /** The sort dropdown's selection; 0 when the overview tab opens the list. */
    sortType: number;
    /** The user type to narrow to, -1 for all. */
    userTypeFilter: number;
};

/**
 * Flash `_-Ye.WiredGetVariableOwnersPageComposer`, sent by `WiredMenuOverviewTab` as
 * `(variableId, 1, PAGE_SIZE, 0, -1)` and by `VariableManagementOverviewView` when paging or
 * filtering; answered by `WiredUserVariablesListMessage`. The sort type goes out before the user
 * type, the other way round from how the page reads them back.
 */
export class WiredGetVariableOwnersPageComposer implements IOutgoingPacket<WiredGetVariableOwnersPageComposerType> {
    public constructor(private params: WiredGetVariableOwnersPageComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.variableId,
            this.params.page,
            this.params.pageSize,
            this.params.sortType,
            this.params.userTypeFilter,
        ];
    }
}
