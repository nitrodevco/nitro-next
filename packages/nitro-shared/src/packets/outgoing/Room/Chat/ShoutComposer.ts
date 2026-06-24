import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type ShoutComposerType = object;

export class ShoutComposer implements IOutgoingPacket<ShoutComposerType> {
    public constructor(private params: ShoutComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
        ];
    }
}
