import type { ChangeUserNameResultMessageCode, IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type ChangeUserNameResultMessageType = {
    resultCode: ChangeUserNameResultMessageCode;
    name: string;
    nameSuggestions: string[];
};

export class ChangeUserNameResultMessage implements IIncomingPacket<ChangeUserNameResultMessageType> {
    public parse(wrapper: IMessageDataWrapper): ChangeUserNameResultMessageType {
        const packet: ChangeUserNameResultMessageType = {
            resultCode: wrapper.readInt(),
            name: wrapper.readString(),
            nameSuggestions: [],
        };

        let count = wrapper.readInt();

        while (count > 0) {
            packet.nameSuggestions.push(wrapper.readString());

            count--;
        }

        return packet;
    }
}
