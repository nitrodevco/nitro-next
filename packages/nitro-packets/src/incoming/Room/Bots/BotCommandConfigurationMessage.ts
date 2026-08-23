import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type BotCommandConfigurationMessageType = {
    botId: number;
    commandId: number;
    data: string;
};

export class BotCommandConfigurationMessage implements IIncomingPacket<BotCommandConfigurationMessageType> {
    public parse(wrapper: IMessageDataWrapper): BotCommandConfigurationMessageType {
        const packet: BotCommandConfigurationMessageType = {
            botId: wrapper.readInt(),
            commandId: wrapper.readInt(),
            data: wrapper.readString(),
        };

        return packet;
    }
}
