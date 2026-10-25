import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type SynchronizeSharedAddonsComposerType = {
    /** The share add-on open in the wired editor (`getCurrentWiredId`). */
    wiredId: number;
};

/**
 * Flash `SynchronizeSharedAddonsMessageComposer` (WIN63-202610201032): the "Synchronize" button
 * of the variable share add-on (`VariableAddonShareAddon.synchronize`).
 */
export class SynchronizeSharedAddonsComposer implements IOutgoingPacket<SynchronizeSharedAddonsComposerType> {
    public constructor(private params: SynchronizeSharedAddonsComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [ this.params.wiredId ];
    }
}
