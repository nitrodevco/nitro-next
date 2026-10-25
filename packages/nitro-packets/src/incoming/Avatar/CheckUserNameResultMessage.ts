import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type CheckUserNameResultMessageType = {
    resultCode: number;
    name: string;
    nameSuggestions: string[];
};

export class CheckUserNameResultMessage implements IIncomingPacket<CheckUserNameResultMessageType> {
    public parse(wrapper: IMessageDataWrapper): CheckUserNameResultMessageType {
        const packet: CheckUserNameResultMessageType = {
            resultCode: 0,
            name: '',
            nameSuggestions: [],
        };

        packet.resultCode = wrapper.readInt();
        packet.name = wrapper.readString();
        let v1 = wrapper.readInt();
        while (v1 > 0) {
            packet.nameSuggestions.push(wrapper.readString());
            v1--;
        }

        return packet;
    }
}
