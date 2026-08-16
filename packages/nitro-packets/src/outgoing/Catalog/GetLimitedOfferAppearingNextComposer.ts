import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type GetLimitedOfferAppearingNextComposerType = object;

export class GetLimitedOfferAppearingNextComposer implements IOutgoingPacket<GetLimitedOfferAppearingNextComposerType> {
    public constructor(private params: GetLimitedOfferAppearingNextComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
        ];
    }
}
