import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type RoomUsersClassificationComposerType = object;

export class RoomUsersClassificationComposer implements IOutgoingPacket<RoomUsersClassificationComposerType> {
    public constructor(private params: RoomUsersClassificationComposerType) { }

    public compose(): (number | string)[] {
        return [
        ];
    }
}
