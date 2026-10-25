import { IMessageDataWrapper } from '@nitrodevco/nitro-api';

/** One link network of the player's, as the WIRED Link window lists it. Flash `WiredLinkNetwork`. */
export type WiredLinkNetworkType = {
    /** The network's id; `"0"` is no network. */
    id: string;
    name: string;
    /** How many Links are connected to it. */
    connectionCount: number;
    /** Whether a Link in the current room is connected to it. */
    linkedInCurrentRoom: boolean;
};

/** Flash `new WiredLinkNetwork(wrapper)`. */
export const parseWiredLinkNetwork = (wrapper: IMessageDataWrapper): WiredLinkNetworkType => ({
    id: wrapper.readString(),
    name: wrapper.readString(),
    connectionCount: wrapper.readInt(),
    linkedInCurrentRoom: wrapper.readBoolean(),
});

/** A count-prefixed list of networks, as every link message that carries them writes it. */
export const parseWiredLinkNetworks = (wrapper: IMessageDataWrapper): WiredLinkNetworkType[] => {
    const networks: WiredLinkNetworkType[] = [];

    let count = wrapper.readInt();

    while (count-- > 0) networks.push(parseWiredLinkNetwork(wrapper));

    return networks;
};
