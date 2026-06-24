import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type MakeOfferComposerType = object;

export class MakeOfferComposer implements IOutgoingPacket<MakeOfferComposerType> {
    public constructor(private params: MakeOfferComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
        ];
    }
}
