// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

/**
 * What the room's wired configuration items switch on for everyone in it. Older servers send
 * fewer booleans, so every flag after the first is read only while bytes remain and is `false`
 * otherwise, as in the Flash parser.
 */
export type ConfigurationItemStatesMessageType = {
    isHanditemControlBlocked: boolean;
    chooserDisabled: boolean;
    freeFurniMovementsEnabled: boolean;
    invisibleFurni: boolean;
};

export class ConfigurationItemStatesMessage implements IIncomingPacket<ConfigurationItemStatesMessageType> {
    public parse(wrapper: IMessageDataWrapper): ConfigurationItemStatesMessageType {
        const packet: ConfigurationItemStatesMessageType = {
            isHanditemControlBlocked: wrapper.readBoolean(),
            chooserDisabled: false,
            freeFurniMovementsEnabled: false,
            invisibleFurni: false,
        };

        if (wrapper.bytesAvailable) packet.chooserDisabled = wrapper.readBoolean();
        if (wrapper.bytesAvailable) packet.freeFurniMovementsEnabled = wrapper.readBoolean();
        if (wrapper.bytesAvailable) packet.invisibleFurni = wrapper.readBoolean();

        return packet;
    }
}
