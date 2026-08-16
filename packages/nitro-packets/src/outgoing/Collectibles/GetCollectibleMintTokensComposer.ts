import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type GetCollectibleMintTokensComposerType = object;

export class GetCollectibleMintTokensComposer implements IOutgoingPacket<GetCollectibleMintTokensComposerType> {
    public constructor(private params: GetCollectibleMintTokensComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
        ];
    }
}
