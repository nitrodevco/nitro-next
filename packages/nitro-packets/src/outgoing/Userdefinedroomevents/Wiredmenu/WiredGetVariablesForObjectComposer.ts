// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type WiredGetVariablesForObjectComposerType = {
    /**
     * What is being inspected: `WiredInputSourcePicker`'s furni source (0) or `USER_SOURCE` (1), or
     * `VariableExtraSourceTypes.GLOBAL_SOURCE` (-10) for the room's global variables.
     */
    sourceType: number;
    /** The furni's object id or the user's room index; 0 for the global source. */
    objectId: number;
};

/** Flash `WiredGetVariablesForObjectMessageComposer`, sent by `WiredMenuInspectionTab.requestVariablesForObject`; answered by `WiredVariablesForObjectMessage`. */
export class WiredGetVariablesForObjectComposer implements IOutgoingPacket<WiredGetVariablesForObjectComposerType> {
    public constructor(private params: WiredGetVariablesForObjectComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.sourceType,
            this.params.objectId,
        ];
    }
}
