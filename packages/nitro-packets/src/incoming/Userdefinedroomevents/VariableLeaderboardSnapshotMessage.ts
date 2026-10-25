import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

import { IVariableLeaderboardDescriptor } from './Data/IVariableLeaderboard';
import { VariableLeaderboardDescriptorParser } from './Data/VariableLeaderboardParsers';

export type VariableLeaderboardSnapshotMessageType = {
    /** False when Flash's parser refuses the message (a count out of range): the client ignores it. */
    valid: boolean;
    descriptors: IVariableLeaderboardDescriptor[];
};

/**
 * Every published leaderboard in the room (Flash `VariableLeaderboardSnapshotMessageParser`: int n
 * 0..4, n descriptors). The answer to the room open `VariableLeaderboardReplaceSubscription`; Habbo
 * sends it, empty when there is none, on every room entry.
 */
export class VariableLeaderboardSnapshotMessage implements IIncomingPacket<VariableLeaderboardSnapshotMessageType> {
    public parse(wrapper: IMessageDataWrapper): VariableLeaderboardSnapshotMessageType {
        const count = wrapper.readInt();
        const descriptors: IVariableLeaderboardDescriptor[] = [];

        if ((count < 0) || (count > 4)) return { valid: false, descriptors };

        for (let i = 0; i < count; i++) {
            const descriptor = VariableLeaderboardDescriptorParser(wrapper);

            if (!descriptor) return { valid: false, descriptors: [] };

            descriptors.push(descriptor);
        }

        return { valid: true, descriptors };
    }
}
