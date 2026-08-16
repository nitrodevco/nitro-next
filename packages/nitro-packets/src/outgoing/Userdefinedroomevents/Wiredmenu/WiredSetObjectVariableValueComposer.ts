import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type WiredSetObjectVariableValueComposerType = object;

export class WiredSetObjectVariableValueComposer implements IOutgoingPacket<WiredSetObjectVariableValueComposerType> {
    public constructor(private params: WiredSetObjectVariableValueComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
        ];
    }
}
