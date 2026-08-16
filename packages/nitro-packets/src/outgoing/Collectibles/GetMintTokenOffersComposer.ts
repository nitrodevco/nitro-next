import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type GetMintTokenOffersComposerType = object;

export class GetMintTokenOffersComposer implements IOutgoingPacket<GetMintTokenOffersComposerType> {
    public constructor(private params: GetMintTokenOffersComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
        ];
    }
}
