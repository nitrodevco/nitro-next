import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type GetRoomSettingsComposerType = {
    roomId: number;
};

export class GetRoomSettingsComposer implements IOutgoingPacket<GetRoomSettingsComposerType> {
    public constructor(private params: GetRoomSettingsComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.roomId,
        ];
    }
}
