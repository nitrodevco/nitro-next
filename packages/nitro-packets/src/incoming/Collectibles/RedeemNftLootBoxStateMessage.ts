// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

import { CollectibleBaseItemParser, ICollectibleBaseItem } from '../Data/CollectibleBaseItemParser';

/**
 * Flash `RedeemNftLootBoxStateMessageEvent`: an NFT reward box opening in the room - `state` 0 when it
 * starts, 1 when it has finished; who opened it, and what it gave.
 */
export type RedeemNftLootBoxStateMessageType = {
    state: number;
    openerAvatarId: number;
    reward: ICollectibleBaseItem;
};

export class RedeemNftLootBoxStateMessage implements IIncomingPacket<RedeemNftLootBoxStateMessageType> {
    public parse(wrapper: IMessageDataWrapper): RedeemNftLootBoxStateMessageType {
        const state = wrapper.readShort();
        const openerAvatarId = wrapper.readInt();
        const reward = CollectibleBaseItemParser(wrapper);

        return { state, openerAvatarId, reward };
    }
}
