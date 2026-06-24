import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type KickUserComposerType = object;

export class KickUserComposer implements IOutgoingPacket<KickUserComposerType> {
    public constructor(private params: KickUserComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
        ];
    }
}
