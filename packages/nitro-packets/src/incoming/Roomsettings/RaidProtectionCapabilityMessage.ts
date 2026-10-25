import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type RaidProtectionCapabilityMessageType = {
    roomId: number;
    canManage: boolean;
};

/** Whether the user may manage the room's raid protection. */
export class RaidProtectionCapabilityMessage implements IIncomingPacket<RaidProtectionCapabilityMessageType> {
    public parse(wrapper: IMessageDataWrapper): RaidProtectionCapabilityMessageType {
        const packet: RaidProtectionCapabilityMessageType = {
            roomId: wrapper.readInt(),
            canManage: wrapper.readBoolean(),
        };

        return packet;
    }
}
