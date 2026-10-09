// Body filled by hand from the AS3 (the user NFT wardrobe parser: a count, then `NftWardrobeItem`s) - the generator has no preserve step, so re-apply after a regeneration.
import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

import { INftWardrobeItem, NftWardrobeItemParser } from '../Data/NftWardrobeItemParser';

export type UserNftWardrobeMessageType = {
    nftAvatars: INftWardrobeItem[];
};

export class UserNftWardrobeMessage implements IIncomingPacket<UserNftWardrobeMessageType> {
    public parse(wrapper: IMessageDataWrapper): UserNftWardrobeMessageType {
        const nftAvatars: INftWardrobeItem[] = [];
        let count = wrapper.readInt();

        while (count-- > 0) nftAvatars.push(NftWardrobeItemParser(wrapper));

        return { nftAvatars };
    }
}
