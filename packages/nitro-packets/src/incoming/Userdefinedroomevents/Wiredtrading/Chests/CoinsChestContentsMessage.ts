import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type CoinsChestContentsMessageType = {
    chestId: number;
    coins: number;
    /** A balance change to an already open chest rather than the initial contents. */
    isUpdate: boolean;
};

export class CoinsChestContentsMessage implements IIncomingPacket<CoinsChestContentsMessageType> {
    public parse(wrapper: IMessageDataWrapper): CoinsChestContentsMessageType {
        const packet: CoinsChestContentsMessageType = {
            chestId: wrapper.readInt(),
            coins: wrapper.readInt(),
            isUpdate: wrapper.readBoolean(),
        };

        return packet;
    }
}
