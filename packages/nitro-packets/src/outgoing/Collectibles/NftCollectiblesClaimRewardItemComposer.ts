import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type NftCollectiblesClaimRewardItemComposerType = object;

export class NftCollectiblesClaimRewardItemComposer implements IOutgoingPacket<NftCollectiblesClaimRewardItemComposerType> {
    public constructor(private params: NftCollectiblesClaimRewardItemComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
        ];
    }
}
