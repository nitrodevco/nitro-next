import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type ModeratorToolPreferencesEventMessageType = object;

export class ModeratorToolPreferencesEventMessage implements IIncomingPacket<ModeratorToolPreferencesEventMessageType> {
    public parse(wrapper: IMessageDataWrapper): ModeratorToolPreferencesEventMessageType {
        const packet: ModeratorToolPreferencesEventMessageType = {
        };

        return packet;
    }
}
