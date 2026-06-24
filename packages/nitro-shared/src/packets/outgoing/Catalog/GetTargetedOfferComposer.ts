import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type GetTargetedOfferComposerType = object;

export class GetTargetedOfferComposer implements IOutgoingPacket<GetTargetedOfferComposerType> {
    public constructor(private params: GetTargetedOfferComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
        ];
    }
}
