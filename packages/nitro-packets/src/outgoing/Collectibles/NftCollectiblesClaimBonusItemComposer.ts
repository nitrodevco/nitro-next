import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type NftCollectiblesClaimBonusItemComposerType = object;

export class NftCollectiblesClaimBonusItemComposer implements IOutgoingPacket<NftCollectiblesClaimBonusItemComposerType> {
    public constructor(private params: NftCollectiblesClaimBonusItemComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
        ];
    }
}
