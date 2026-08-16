import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type WiredGetAllVariableHoldersComposerType = object;

export class WiredGetAllVariableHoldersComposer implements IOutgoingPacket<WiredGetAllVariableHoldersComposerType> {
    public constructor(private params: WiredGetAllVariableHoldersComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
        ];
    }
}
