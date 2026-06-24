import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type WiredGetAllVariablesDiffsComposerType = object;

export class WiredGetAllVariablesDiffsComposer implements IOutgoingPacket<WiredGetAllVariablesDiffsComposerType> {
    public constructor(private params: WiredGetAllVariablesDiffsComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
        ];
    }
}
