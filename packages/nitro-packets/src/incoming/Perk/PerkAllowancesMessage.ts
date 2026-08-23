import type { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

import type { IPerk } from '../Data/PerkParser';
import { PerkParser } from '../Data/PerkParser';

export type PerkAllowancesMessageType = {
    perks: IPerk[];
};

export class PerkAllowancesMessage implements IIncomingPacket<PerkAllowancesMessageType> {
    public parse(wrapper: IMessageDataWrapper): PerkAllowancesMessageType {
        const packet: PerkAllowancesMessageType = {
            perks: [],
        };

        let count = wrapper.readInt();

        while (count > 0) {
            packet.perks.push(PerkParser(wrapper));

            count--;
        }

        return packet;
    }
}
