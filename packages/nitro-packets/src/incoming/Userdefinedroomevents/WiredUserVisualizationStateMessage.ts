import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

import { parseWiredVisualizationState, WiredVisualizationStateType } from './Data/WiredVisualizationStateParser';

export type WiredUserVisualizationStateMessageType = WiredVisualizationStateType;

/**
 * Flash `WiredUserVisualizationStateMessageParser` (WIN63-202610201032): the room's WIRED Set Visibility /
 * Set Highlight states on users, pets and bots (by room index), for a player walking in;
 * `RoomMessageHandler.onWiredUserVisualizationState` hands them to `RoomEngine.initializeWiredUserVisualizationStates`.
 */
export class WiredUserVisualizationStateMessage implements IIncomingPacket<WiredUserVisualizationStateMessageType> {
    public parse(wrapper: IMessageDataWrapper): WiredUserVisualizationStateMessageType {
        return parseWiredVisualizationState(wrapper);
    }
}
