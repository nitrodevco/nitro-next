import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type GetRoomChatlogComposerType = object;

export class GetRoomChatlogComposer implements IOutgoingPacket<GetRoomChatlogComposerType> {
    public constructor(private params: GetRoomChatlogComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
        ];
    }
}
