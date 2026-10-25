import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

/** One Link connected to a network. Flash `WiredLinkConnection`. */
export type WiredLinkConnectionType = {
    roomId: number;
    roomName: string;
    furniId: number;
    isBuildersClub: boolean;
    receiveLocal: boolean;
};

export type WiredLinkConnectionsMessageType = {
    roomId: number;
    furniId: number;
    networkId: string;
    connections: WiredLinkConnectionType[];
};

/** The Links connected to one network - the "Connected rooms" window. Flash parser `wiredlink._-7s`. */
export class WiredLinkConnectionsMessage implements IIncomingPacket<WiredLinkConnectionsMessageType> {
    public parse(wrapper: IMessageDataWrapper): WiredLinkConnectionsMessageType {
        const roomId = wrapper.readInt();
        const furniId = wrapper.readInt();
        const networkId = wrapper.readString();
        const connections: WiredLinkConnectionType[] = [];

        let count = wrapper.readInt();

        while (count-- > 0) {
            connections.push({
                roomId: wrapper.readInt(),
                roomName: wrapper.readString(),
                furniId: wrapper.readInt(),
                isBuildersClub: wrapper.readBoolean(),
                receiveLocal: wrapper.readBoolean(),
            });
        }

        return { roomId, furniId, networkId, connections };
    }
}
