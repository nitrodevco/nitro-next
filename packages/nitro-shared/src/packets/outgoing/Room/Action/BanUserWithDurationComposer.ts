import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type BanUserWithDurationComposerType = object;

export class BanUserWithDurationComposer implements IOutgoingPacket<BanUserWithDurationComposerType> {
    public constructor(private params: BanUserWithDurationComposerType) { }

    public compose(): (number | string)[] {
        return [
        ];
    }
}
