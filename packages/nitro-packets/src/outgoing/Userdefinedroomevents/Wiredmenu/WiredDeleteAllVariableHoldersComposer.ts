// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type WiredDeleteAllVariableHoldersComposerType = {
    /** `WiredVariable.variableId` of the variable to take away from everything that holds it. */
    variableId: string;
};

/** Flash `WiredDeleteAllVariableHoldersMessageComposer`, sent by `WiredMenuOverviewTab` once the delete is confirmed. */
export class WiredDeleteAllVariableHoldersComposer implements IOutgoingPacket<WiredDeleteAllVariableHoldersComposerType> {
    public constructor(private params: WiredDeleteAllVariableHoldersComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.variableId,
        ];
    }
}
