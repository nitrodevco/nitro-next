import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type DisconnectComposerType = object;

export class DisconnectComposer implements IOutgoingPacket<DisconnectComposerType> {
    public constructor(private params: DisconnectComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
        ];
    }
}
