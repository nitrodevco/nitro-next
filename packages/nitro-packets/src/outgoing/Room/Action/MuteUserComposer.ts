import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type MuteUserComposerType = {
    userId: number;
    roomId: number;
    durationInMinutes: number;
};

export class MuteUserComposer implements IOutgoingPacket<MuteUserComposerType> {
    public constructor(private params: MuteUserComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.userId, this.params.roomId, this.params.durationInMinutes
        ];
    }
}
