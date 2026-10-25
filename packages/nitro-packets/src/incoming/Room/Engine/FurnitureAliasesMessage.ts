import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type FurnitureAliasesMessageType = {
    /** `FurnitureAliasesMessageParser`: each furni type name and the asset name it is drawn from. */
    aliases: { name: string; alias: string }[];
};

export class FurnitureAliasesMessage implements IIncomingPacket<FurnitureAliasesMessageType> {
    public parse(wrapper: IMessageDataWrapper): FurnitureAliasesMessageType {
        const packet: FurnitureAliasesMessageType = {
            aliases: [],
        };

        let count = wrapper.readInt();

        while (count > 0) {
            packet.aliases.push({ name: wrapper.readString(), alias: wrapper.readString() });

            count--;
        }

        return packet;
    }
}
