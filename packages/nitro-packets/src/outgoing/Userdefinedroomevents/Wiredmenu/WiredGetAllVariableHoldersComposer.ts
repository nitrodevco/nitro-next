// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type WiredGetAllVariableHoldersComposerType = {
    /** `WiredVariable.variableId` of the variable selected in the overview tab. */
    variableId: string;
};

/** Flash `WiredGetAllVariableHoldersMessageComposer`, sent by `WiredMenuOverviewTab`; answered by `WiredAllVariableHoldersMessage`. */
export class WiredGetAllVariableHoldersComposer implements IOutgoingPacket<WiredGetAllVariableHoldersComposerType> {
    public constructor(private params: WiredGetAllVariableHoldersComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.variableId,
        ];
    }
}
