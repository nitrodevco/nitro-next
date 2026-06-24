import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type RoomNetworkOpenConnectionComposerType = object;

export class RoomNetworkOpenConnectionComposer implements IOutgoingPacket<RoomNetworkOpenConnectionComposerType> {
    public constructor(private params: RoomNetworkOpenConnectionComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
        ];
    }
}
