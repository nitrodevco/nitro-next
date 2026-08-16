import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type GetRoomVisitsComposerType = object;

export class GetRoomVisitsComposer implements IOutgoingPacket<GetRoomVisitsComposerType> {
    public constructor(private params: GetRoomVisitsComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
        ];
    }
}
