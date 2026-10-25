// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

/** The three constants on Flash `WiredSetObjectVariableValueMessageComposer`, named by how `WiredMenuInspectionTab` uses them. */
export enum WiredSetObjectVariableValueOperation {
    /** `_-B23`: a value cell was edited. */
    SetValue = 0,
    /** `_-An`: the variable is given to the object, with `value` when it has one. */
    Create = 1,
    /** `_-d10`: the variable is taken away from the object; `value` is 0. */
    Delete = 2,
}

export type WiredSetObjectVariableValueComposerType = {
    /** `WiredVariable.variableTarget`: furni 0, user 1, global -10, context -20. */
    variableTarget: number;
    /** The furni's object id or the user's room index; 0 for a global variable. */
    objectId: number;
    /** `WiredVariable.variableId`. */
    variableId: string;
    value: number;
    operation: WiredSetObjectVariableValueOperation;
};

/** Flash `WiredSetObjectVariableValueMessageComposer`, sent by `WiredMenuInspectionTab`. */
export class WiredSetObjectVariableValueComposer implements IOutgoingPacket<WiredSetObjectVariableValueComposerType> {
    public constructor(private params: WiredSetObjectVariableValueComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.variableTarget,
            this.params.objectId,
            this.params.variableId,
            this.params.value,
            this.params.operation,
        ];
    }
}
