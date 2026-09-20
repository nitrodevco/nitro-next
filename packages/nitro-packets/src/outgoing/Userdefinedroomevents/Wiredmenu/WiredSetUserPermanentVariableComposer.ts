// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

import { WiredSetObjectVariableValueOperation } from './WiredSetObjectVariableValueComposer';

export type WiredSetUserPermanentVariableComposerType = {
    /** `RoomObjectUserType` as a number: 1 user, 2 pet, 4 bot. */
    entityType: number;
    entityId: number;
    /** `IWiredVariable.variableId`. */
    variableId: string;
    /** 0 for a delete, and for a variable without a value. */
    value: number;
    /** `VariableManagementDetailView` sends the literals 0, 1 and 2 exactly where `WiredMenuInspectionTab` uses the named constants. */
    operation: WiredSetObjectVariableValueOperation;
};

/** Flash `_-Ye.WiredSetUserPermanentVariableComposer`, sent by `VariableManagementDetailView`; answered by `WiredSetUserPermanentVariableResultMessage`. */
export class WiredSetUserPermanentVariableComposer implements IOutgoingPacket<WiredSetUserPermanentVariableComposerType> {
    public constructor(private params: WiredSetUserPermanentVariableComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.entityType,
            this.params.entityId,
            this.params.variableId,
            this.params.value,
            this.params.operation,
        ];
    }
}
