import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

import { parseWiredLinkNetworks, WiredLinkNetworkType } from './WiredLinkNetwork';

export type WiredLinkConfigurationMessageType = {
    roomId: number;
    furniId: number;
    /** The network the Link is connected to; `"0"` is none. */
    selectedNetworkId: string;
    /** "Receive messages sent by this room". */
    receiveLocal: boolean;
    networks: WiredLinkNetworkType[];
};

/** A WIRED Link's configuration and the player's networks - what the link window opens with. Flash parser `wiredlink._-e1E`. */
export class WiredLinkConfigurationMessage implements IIncomingPacket<WiredLinkConfigurationMessageType> {
    public parse(wrapper: IMessageDataWrapper): WiredLinkConfigurationMessageType {
        const roomId = wrapper.readInt();
        const furniId = wrapper.readInt();
        const selectedNetworkId = wrapper.readString();
        const receiveLocal = wrapper.readBoolean();
        const networks = parseWiredLinkNetworks(wrapper);

        return { roomId, furniId, selectedNetworkId, receiveLocal, networks };
    }
}
