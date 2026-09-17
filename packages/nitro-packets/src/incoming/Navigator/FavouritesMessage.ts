// Body filled by hand from the 2026 client's own parser - the generator has no preserve step, so re-apply after a regeneration.
import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type FavouritesMessageType = {
    /** How many rooms may be favourited at once. */
    limit: number;
    favouriteRoomIds: number[];
};

export class FavouritesMessage implements IIncomingPacket<FavouritesMessageType> {
    public parse(wrapper: IMessageDataWrapper): FavouritesMessageType {
        const packet: FavouritesMessageType = {
            limit: wrapper.readInt(),
            favouriteRoomIds: [],
        };

        let count = wrapper.readInt();

        while (count > 0) {
            packet.favouriteRoomIds.push(wrapper.readInt());

            count--;
        }

        return packet;
    }
}
