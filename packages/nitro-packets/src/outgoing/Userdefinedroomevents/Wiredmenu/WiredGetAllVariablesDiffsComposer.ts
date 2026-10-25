// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type WiredGetAllVariablesDiffsComposerType = {
    /** The hash the client holds for every variable it has cached, by `WiredVariable.variableId`; empty when it has none. */
    variableIdToHash: Map<string, number>;
};

/**
 * Flash `WiredGetAllVariablesDiffsMessageComposer`, sent by `WiredVariablesSynchronizer` when the
 * hash in `WiredAllVariablesHashMessage` differs from the cached one: a count, then a variable id
 * and its hash per entry. A null dictionary goes out as the bare count 0, which an empty map also gives.
 */
export class WiredGetAllVariablesDiffsComposer implements IOutgoingPacket<WiredGetAllVariablesDiffsComposerType> {
    public constructor(private params: WiredGetAllVariablesDiffsComposerType) { }

    public compose(): (number | string | boolean)[] {
        const data: (number | string | boolean)[] = [];
        data.push(this.params.variableIdToHash.size);
        for (const [ variableId, hash ] of this.params.variableIdToHash) {
            data.push(variableId);
            data.push(hash);
        }
        return data;
    }
}
