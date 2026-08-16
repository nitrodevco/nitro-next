import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type BanUserWithDurationComposerType = {
    userId: number;
    roomId: number;
    banType: string;
};

export class BanUserWithDurationComposer implements IOutgoingPacket<BanUserWithDurationComposerType> {
    public constructor(private params: BanUserWithDurationComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.userId, this.params.roomId, this.params.banType
        ];
    }
}
