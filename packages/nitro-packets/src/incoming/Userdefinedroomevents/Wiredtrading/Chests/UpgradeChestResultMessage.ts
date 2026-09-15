import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type UpgradeChestResultMessageType = {
    chestId: number;
    /** 0 is success (`UpgradeChestResultMessageParser.SUCCESS`). */
    resultCode: number;
};

export class UpgradeChestResultMessage implements IIncomingPacket<UpgradeChestResultMessageType> {
    public parse(wrapper: IMessageDataWrapper): UpgradeChestResultMessageType {
        const packet: UpgradeChestResultMessageType = {
            chestId: wrapper.readInt(),
            resultCode: wrapper.readInt(),
        };

        return packet;
    }
}
