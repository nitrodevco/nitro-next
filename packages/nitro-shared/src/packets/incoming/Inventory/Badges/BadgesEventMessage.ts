import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type BadgesEventMessageType = {
    totalFragments: number;
    fragmentNo: number;
    fragment: Map<number, string>;
};

export class BadgesEventMessage implements IIncomingPacket<BadgesEventMessageType> {
    public parse(wrapper: IMessageDataWrapper): BadgesEventMessageType {
        const packet: BadgesEventMessageType = {
            totalFragments: wrapper.readInt(),
            fragmentNo: wrapper.readInt(),
            fragment: new Map<number, string>(),
        };

        let count = wrapper.readInt();

        while (count > 0) {
            const badgeId = wrapper.readInt();
            const badgeCode = wrapper.readString();

            packet.fragment.set(badgeId, badgeCode);

            count--;
        }

        return packet;
    }
}
