import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type GetClubGiftInfoComposerType = object;

export class GetClubGiftInfoComposer implements IOutgoingPacket<GetClubGiftInfoComposerType> {
    public constructor(private params: GetClubGiftInfoComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
        ];
    }
}
