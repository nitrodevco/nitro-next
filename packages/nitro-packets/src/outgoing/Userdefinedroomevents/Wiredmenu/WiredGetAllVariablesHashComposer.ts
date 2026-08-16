import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type WiredGetAllVariablesHashComposerType = object;

export class WiredGetAllVariablesHashComposer implements IOutgoingPacket<WiredGetAllVariablesHashComposerType> {
    public constructor(private params: WiredGetAllVariablesHashComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
        ];
    }
}
