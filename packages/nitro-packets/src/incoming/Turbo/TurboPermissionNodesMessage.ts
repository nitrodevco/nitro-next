import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type TurboPermissionNodesMessageType = {
    /** Every client-facing permission node the user holds: the whole set, replacing the last. */
    nodes: string[];
};

/**
 * Not Habbo's: Turbo's `permission.nodes` extension, sent only after the client asked for it.
 * See Turbo's `docs/client-capabilities.md`.
 */
export class TurboPermissionNodesMessage implements IIncomingPacket<TurboPermissionNodesMessageType> {
    public parse(wrapper: IMessageDataWrapper): TurboPermissionNodesMessageType {
        const nodes: string[] = [];

        for (let count = wrapper.readInt(); count > 0; count--) nodes.push(wrapper.readString());

        return { nodes };
    }
}
