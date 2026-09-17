// Body filled by hand from the 2026 client's own parser - the generator has no preserve step, so re-apply after a regeneration.
import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

/** `RoomSessionQueueEvent`'s queue-set targets: which line of the room you are standing in. */
export enum RoomQueueTargetType {
    Spectator = 1,
    Visitor = 2,
}

/** `RoomSessionQueueEvent.QUEUE_TYPE_*` - each set is split into a club line and a normal one. */
export const ROOM_QUEUE_TYPE_CLUB = 'c';
export const ROOM_QUEUE_TYPE_NORMAL = 'd';

/** One line into the room, and how many are standing in each of its lanes. */
export interface IRoomQueueSet {
    name: string;
    target: RoomQueueTargetType;
    /** How many are ahead, by queue type. */
    queues: Record<string, number>;
}

export type RoomQueueStatusMessageType = {
    flatId: number;
    /** The set the user is actually in; the first one the server names. */
    activeTarget: number;
    queueSets: IRoomQueueSet[];
};

export class RoomQueueStatusMessage implements IIncomingPacket<RoomQueueStatusMessageType> {
    public parse(wrapper: IMessageDataWrapper): RoomQueueStatusMessageType {
        const packet: RoomQueueStatusMessageType = {
            flatId: wrapper.readInt(),
            activeTarget: 0,
            queueSets: [],
        };

        let count = wrapper.readInt();

        while (count > 0) {
            const set: IRoomQueueSet = {
                name: wrapper.readString(),
                target: wrapper.readInt(),
                queues: {},
            };

            if (!packet.queueSets.length) packet.activeTarget = set.target;

            let queues = wrapper.readInt();

            while (queues > 0) {
                const type = wrapper.readString();

                set.queues[type] = wrapper.readInt();

                queues--;
            }

            packet.queueSets.push(set);

            count--;
        }

        return packet;
    }
}
