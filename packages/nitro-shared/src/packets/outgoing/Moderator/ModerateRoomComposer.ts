import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type ModerateRoomComposerType = object;

export class ModerateRoomComposer implements IOutgoingPacket<ModerateRoomComposerType> {
    public constructor(private params: ModerateRoomComposerType) { }

    public compose(): (number | string)[] {
        return [
        ];
    }
}
