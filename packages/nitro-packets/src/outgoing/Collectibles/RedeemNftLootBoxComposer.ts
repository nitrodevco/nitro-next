// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

/**
 * Flash `RedeemNftLootBoxMessageComposer` (header 3624, which the tool still calls
 * `UnknownOutgoing_41HComposer`): open the NFT reward box standing in the room with this id.
 * `RoomObjectEventHandler.useObject` sends it once the user confirms; the result comes back as
 * `RedeemNftLootBoxStateMessage` / `RedeemNftLootBoxResultMessage`.
 */
export type RedeemNftLootBoxComposerType = {
    objectId: number;
};

export class RedeemNftLootBoxComposer implements IOutgoingPacket<RedeemNftLootBoxComposerType> {
    public constructor(private params: RedeemNftLootBoxComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.objectId,
        ];
    }
}
