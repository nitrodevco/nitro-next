import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type WiredLinkConfigurationInvalidatedMessageType = {
    roomId: number;
    furniId: number;
    /** The network that was deleted, which the Link's window drops. */
    deletedNetworkId: string;
};

/** A network the open link window shows was deleted elsewhere. Flash parser `WiredLinkConfigurationInvalidatedMessageParser`. */
export class WiredLinkConfigurationInvalidatedMessage implements IIncomingPacket<WiredLinkConfigurationInvalidatedMessageType> {
    public parse(wrapper: IMessageDataWrapper): WiredLinkConfigurationInvalidatedMessageType {
        const roomId = wrapper.readInt();
        const furniId = wrapper.readInt();
        const deletedNetworkId = wrapper.readString();

        return { roomId, furniId, deletedNetworkId };
    }
}
