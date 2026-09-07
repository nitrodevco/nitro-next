import { IIncomingPacket, IMessageDataWrapper, ParseStrings } from '@nitrodevco/nitro-api';

export type RoomFilterSettingsMessageType = {
    badWords: string[];
};

export class RoomFilterSettingsMessage implements IIncomingPacket<RoomFilterSettingsMessageType> {
    public parse(wrapper: IMessageDataWrapper): RoomFilterSettingsMessageType {
        const packet: RoomFilterSettingsMessageType = {
            badWords: ParseStrings(wrapper),
        };

        return packet;
    }
}
