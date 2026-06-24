import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type WiredGetVariablesForObjectComposerType = object;

export class WiredGetVariablesForObjectComposer implements IOutgoingPacket<WiredGetVariablesForObjectComposerType> {
    public constructor(private params: WiredGetVariablesForObjectComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
        ];
    }
}
