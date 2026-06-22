import type { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type FurnitureAliasesMessageType = {
    aliases: { alias: string, original: string }[];
};

export class FurnitureAliasesMessage implements IIncomingPacket<FurnitureAliasesMessageType> {
    public parse(wrapper: IMessageDataWrapper): FurnitureAliasesMessageType {
        const packet: FurnitureAliasesMessageType = {
            aliases: []
        };

        let count = wrapper.readInt();

        while (count > 0) {
            packet.aliases.push({ alias: wrapper.readString(), original: wrapper.readString() });

            count--;
        }

        return packet;
    }
}
