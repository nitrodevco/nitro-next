import { IOutgoingPacket } from '@nitrodevco/nitro-api';

// `GetRoomChatlogMessageComposer(roomType, flatId)`.
export type GetRoomChatlogComposerType = {
    /** 0 for a guest room, 1 for a public one (`StartPanelCtrl.as:142`). */
    roomType: number;
    roomId: number;
};

export class GetRoomChatlogComposer implements IOutgoingPacket<GetRoomChatlogComposerType> {
    public constructor(private params: GetRoomChatlogComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [ this.params.roomType, this.params.roomId ];
    }
}
